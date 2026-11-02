import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { MORVEN_ID, morvenGeometry } from '../dist/morven-brown-data.js';
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


const b=CAMPUS.buildings.find(b=>b.id===MORVEN_ID),g=morvenGeometry(b),shape=[b.points,...b.holes].map(r=>r.map(p=>[p.x,p.z])),parts=[],paving=[];
let remaining=[shape];
for(const route of g.routes){const cut=clipping.intersection(remaining,buffer(route.points,route.width));for(const r of cut)parts.push({kind:'covered-link',route:route.id,minHeight:route.ceiling,points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});remaining=clipping.difference(remaining,cut);}
for(const r of remaining)parts.push({kind:'ground',minHeight:0,points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});
const court=poly(b.holes[0]),lawn=poly(CAMPUS.greens.find(p=>p.id==='osm-way-45604250').points),near=CAMPUS.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.frame.x,p.z-g.frame.z)<75));
const open=clipping.union(court,...parts.filter(p=>p.kind==='covered-link').map(p=>[p.points,...p.holes].map(r=>r.map(p=>[p.x,p.z]))));
const floor=clipping.difference(open,lawn,clipping.union(...near.map(p=>buffer(p.points,(p.width||3)+.16))));
for(const r of floor)paving.push({points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});
fs.writeFileSync(new URL('../dist/morven-brown-parts.js',import.meta.url),'// Retained footprint / courtyard, cut only along mapped outdoor passages.\n// Regenerate with node scripts/make-morven-parts.mjs.\nexport const MORVEN_PARTS = '+JSON.stringify(parts,null,2)+';\nexport const MORVEN_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(parts.length+' Morven Brown regions');
