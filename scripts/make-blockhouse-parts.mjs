import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { BLOCKHOUSE_ID, blockhouseGeometry } from '../dist/blockhouse-data.js';
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



const b=CAMPUS.buildings.find(b=>b.id===BLOCKHOUSE_ID),g=blockhouseGeometry(b),source=[poly(b.points)],parts=[],roofs=[],awning=[],paving=[];
const emit=(dest,regions,props={})=>{for(const r of regions)dest.push({...props,points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});};
let remaining=source;
for(const [kind,cut]of [['arcade',poly(g.southRecess.points)],['covered-link',buffer(g.route.points,g.passageWidth)]]){const region=clipping.intersection(remaining,cut);emit(parts,region,{kind,minHeight:g.passageCeiling});remaining=clipping.difference(remaining,region);}
emit(parts,remaining,{kind:'ground',minHeight:0});
const core=clipping.intersection(source,poly(g.core.points));emit(roofs,clipping.difference(source,core),{height:g.roof,kind:'body'});emit(roofs,core,{height:b.height,kind:'core'});
emit(awning,clipping.difference(poly(g.canopy.points),source),{bottom:g.canopy.bottom,top:g.canopy.top});
const open=clipping.union(poly(g.apron),...parts.filter(p=>p.kind!=='ground').map(p=>poly(p.points,p.holes)),...awning.map(p=>poly(p.points,p.holes)));
const near=CAMPUS.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.frame.x,p.z-g.frame.z)<90));
const floor=clipping.difference(open,...parts.filter(p=>p.kind==='ground').map(p=>poly(p.points,p.holes)),clipping.union(...near.map(p=>buffer(p.points,(p.width||3)+.16))));
emit(paving,floor);
fs.writeFileSync(new URL('../dist/blockhouse-parts.js',import.meta.url),'// Reconstructed lower recesses / roof levels partition the retained Blockhouse outline.\n// Regenerate with node scripts/make-blockhouse-parts.mjs.\nexport const BLOCKHOUSE_PARTS = '+JSON.stringify(parts,null,2)+';\nexport const BLOCKHOUSE_ROOFS = '+JSON.stringify(roofs,null,2)+';\nexport const BLOCKHOUSE_AWNING = '+JSON.stringify(awning,null,2)+';\nexport const BLOCKHOUSE_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(parts.length+' Blockhouse lower regions, '+roofs.length+' roof regions');
