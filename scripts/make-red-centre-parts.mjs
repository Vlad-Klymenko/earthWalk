import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { RED_CENTRE_IDS, redCentreGeometry } from '../dist/red-centre-data.js';
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

const output=[],roofs=[],paving=[];
for(const id of RED_CENTRE_IDS){
  const b=CAMPUS.buildings.find(b=>b.id===id),g=redCentreGeometry(b),r=g.recess;
  const recess=poly(frameRectangle(g.frame,r.u1-r.u0,r.v1-r.v0,(r.u0+r.u1)/2,(r.v0+r.v1)/2));
  // The path centrelines are source geometry; widths / overhead floors are
  // reconstructed. All cuts remain within the untouched mapped perimeter.
  const passages=clipping.union(...g.routes.map(p=>buffer(p.points,3.8)));
  let remaining=[poly(b.points)];
  const emit=(kind,m,min)=>{for(const r of m)output.push({building:id,kind,minHeight:min,points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});};
  for(const [kind,cut,min]of [['recess',recess,g.recess.ceiling],['covered-link',passages,g.passageCeiling]]){const region=clipping.intersection(remaining,cut);emit(kind,region,min);remaining=clipping.difference(remaining,region);}
  emit('ground',remaining,0);
  const front=clipping.intersection([poly(b.points)],poly(frameRectangle(g.frame,132,5,-0,-11.8)));
  const rear=clipping.difference([poly(b.points)],front);
  for(const [regions,height]of [[front,g.screenTop],[rear,g.bodyRoof]])for(const r of regions)roofs.push({building:id,height,points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});
  const x0=Math.min(...b.points.map(p=>p.x)),x1=Math.max(...b.points.map(p=>p.x)),z0=Math.min(...b.points.map(p=>p.z)),z1=Math.max(...b.points.map(p=>p.z));
  const near=CAMPUS.paths.filter(p=>p.points.slice(1).some((c,i)=>{const a=p.points[i],pad=(p.width||3)/2+.1;return Math.max(a.x,c.x)+pad>x0&&Math.min(a.x,c.x)-pad<x1&&Math.max(a.z,c.z)+pad>z0&&Math.min(a.z,c.z)-pad<z1;}));
  // Added forecourt paving must not coincide with the existing terrain-
  // following path meshes. Keep a narrow seam around the retained ribbons.
  const floor=clipping.union(...output.filter(p=>p.building===id&&p.kind!=='ground').map(p=>poly(p.points))),cut=clipping.union(...near.map(p=>buffer(p.points,(p.width||3)+.16)));
  for(const r of clipping.difference(floor,cut))paving.push({building:id,points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});
}
fs.writeFileSync(new URL('../dist/red-centre-parts.js',import.meta.url),'// Reconstructed ground-floor recesses and mapped covered routes partition the retained outlines.\n// Regenerate with node scripts/make-red-centre-parts.mjs.\nexport const RED_CENTRE_PARTS = '+JSON.stringify(output,null,2)+';\nexport const RED_CENTRE_ROOFS = '+JSON.stringify(roofs,null,2)+';\nexport const RED_CENTRE_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(`${output.length} Red Centre regions`);
