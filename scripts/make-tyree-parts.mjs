import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { TYREE_ID, tyreeGeometry } from '../dist/tyree-data.js';
import { frameRectangle } from '../dist/geometry.js';
const poly=p=>[p.map(p=>[p.x,p.z])];
const buffer=(points,width)=>{
  const pieces=[];
  for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],len=Math.hypot(b.x-a.x,b.z-a.z),nx=-(b.z-a.z)/len*width/2,nz=(b.x-a.x)/len*width/2;pieces.push([[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[b.x-nx,b.z-nz],[b.x+nx,b.z+nz]]]);}
  for(const p of points)pieces.push([Array.from({length:24},(_,i)=>[p.x+Math.cos(i*Math.PI/12)*width/2,p.z+Math.sin(i*Math.PI/12)*width/2])]);
  return clipping.union(...pieces);
};
const clean=r=>{
  const points=r.slice(0,-1).map(([x,z])=>({x,z}));let changed=true;
  while(changed&&points.length>3){changed=false;for(let i=0;i<points.length;i++){
    const a=points[(i+points.length-1)%points.length],p=points[i],c=points[(i+1)%points.length],len=Math.hypot(c.x-a.x,c.z-a.z);
    if(Math.hypot(p.x-a.x,p.z-a.z)<1e-8||Math.abs((p.x-a.x)*(c.z-a.z)-(p.z-a.z)*(c.x-a.x))<1e-8*Math.max(1,len)){points.splice(i,1);changed=true;break;}
  }}return points;
};




const b=CAMPUS.buildings.find(b=>b.id===TYREE_ID),g=tyreeGeometry(b),source=[poly(b.points)],parts=[],roofs=[],platform=[],steps=[],apron=[];
const emit=(dest,regions,props={})=>{for(const r of regions)dest.push({...props,points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});};
const ring=b.points.reduce((s,p,i)=>{const c=b.points[(i+1)%b.points.length];return s+p.x*c.z-c.x*p.z;},0)>0?b.points:[...b.points].reverse();
const west=ring.flatMap((a,i)=>{const c=ring[(i+1)%ring.length],len=Math.hypot(c.x-a.x,c.z-a.z),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});return n.x*g.frame.u.x+n.z*g.frame.u.z<-.25&&mid.u<-16?[buffer([a,c],6.5)]:[];});
const passage=clipping.intersection(source,buffer(g.route.points,g.passageWidth)),recess=clipping.difference(clipping.intersection(source,clipping.union(...west)),passage);
emit(parts,clipping.difference(source,passage,recess),{kind:'ground',minRL:0});emit(parts,passage,{kind:'covered-link',minRL:g.passageCeilingRL});emit(parts,recess,{kind:'west-recess',minRL:g.passageCeilingRL});
// Explicit phase cuts keep parabolic roof valleys from being interpolated
// across discontinuities by a single triangulated roof polygon.
let remaining=source;
for(let v=-33.6;v<8;v+=6){const cut=clipping.intersection(remaining,poly(frameRectangle(g.frame,150,Math.min(6,8-v),0,v+Math.min(6,8-v)/2)));emit(roofs,cut,{kind:'spoon'});remaining=clipping.difference(remaining,cut);}
emit(roofs,remaining,{kind:'pv',rl:g.report.pvRL});
emit(platform,clipping.difference(poly(g.platform.points),source),{rl:g.platform.rl});
for(const flight of g.flights)for(const step of flight.steps)emit(steps,clipping.difference(poly(step.points),source),{rl:step.rl,index:step.index});
const near=CAMPUS.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.frame.x,p.z-g.frame.z)<100));emit(apron,clipping.difference(poly(g.apron.points),clipping.union(...near.map(p=>buffer(p.points,(p.width||3)+.16)))));
fs.writeFileSync(new URL('../dist/tyree-parts.js',import.meta.url),'// Retained Tyree outline split into reconstructed outdoor routes and roof phases.\n// Regenerate with node scripts/make-tyree-parts.mjs.\nexport const TYREE_PARTS = '+JSON.stringify(parts,null,2)+';\nexport const TYREE_ROOFS = '+JSON.stringify(roofs,null,2)+';\nexport const TYREE_PLATFORM = '+JSON.stringify(platform,null,2)+';\nexport const TYREE_STEPS = '+JSON.stringify(steps,null,2)+';\nexport const TYREE_APRON = '+JSON.stringify(apron,null,2)+';\n');
console.log(parts.length+' Tyree lower regions, '+roofs.length+' roof regions, '+steps.length+' stair cells');
