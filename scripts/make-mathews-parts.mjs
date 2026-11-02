import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { mathewsGeometry, MATHEWS_SHARED_LANE } from '../dist/mathews-data.js';
import { sirfGeometry } from '../dist/eastern-landmarks-data.js';
const poly=p=>[p.map(p=>[p.x,p.z])];
const buffer=(points,width)=>{
  const pieces=[];
  for(let i=0;i<points.length-1;i++){const a=points[i],c=points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2;pieces.push([[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[c.x-nx,c.z-nz],[c.x+nx,c.z+nz]]]);}
  for(const p of points)pieces.push([Array.from({length:24},(_,i)=>[p.x+Math.cos(i*Math.PI/12)*width/2,p.z+Math.sin(i*Math.PI/12)*width/2])]);
  return clipping.union(...pieces);
};
const clean=r=>r.slice(0,-1).map(([x,z])=>({x,z}));
const b=CAMPUS.buildings.find(b=>b.id==='mathews'),g=mathewsGeometry(b),source=[poly(b.points)],tower=clipping.intersection(source,poly(g.tower.points)),plant=clipping.intersection(tower,poly(g.plant.points)),entry=clipping.intersection(source,poly(g.entry.points));
const roofs=[],lower=[],floor=[];
const emit=(out,regions,props)=>{for(const p of regions)out.push({...props,points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true});};
emit(roofs,clipping.difference(source,tower),{kind:'teaching-podium',height:g.podiumHeight});
emit(roofs,clipping.difference(tower,plant),{kind:'tower',height:g.tower.top});
emit(roofs,plant,{kind:'plant',height:g.plant.top});
emit(lower,clipping.difference(source,entry),{kind:'ground',bottom:0});
emit(lower,entry,{kind:'entry',bottom:g.entry.ceiling});
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const faces=[];
for(const part of roofs.filter(p=>p.kind==='teaching-podium'))for(const raw of [part.points,...part.holes]){
  const signed=raw.reduce((sum,p,i)=>{const q=raw[(i+1)%raw.length];return sum+p.x*q.z-q.x*p.z;},0),ring=(signed>0)===(raw===part.points)?raw:[...raw].reverse();
  for(let i=0;i<ring.length;i++){
    const a=ring[i],c=ring[(i+1)%ring.length],mid={x:(a.x+c.x)/2,z:(a.z+c.z)/2};
    if(b.points.some((p,j)=>distance(mid,p,b.points[(j+1)%b.points.length])<1e-7))faces.push({a,c});
  }
}
const nearby=CAMPUS.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.frame.x,p.z-g.frame.z)<85));
const entryPaving=clipping.union(entry,clipping.difference(poly(g.entryApron),source));
emit(floor,clipping.difference(entryPaving,clipping.union(...nearby.map(p=>buffer(p.points,(p.width||3)+.16)))),{});
const sirfPaving=[],sirf=sirfGeometry(CAMPUS.buildings.find(b=>b.id==='osm-way-45604880'));
emit(sirfPaving,clipping.difference(poly(sirf.paving),buffer(CAMPUS.paths.find(p=>p.id===MATHEWS_SHARED_LANE.id).points,MATHEWS_SHARED_LANE.renderWidth+.16)),{});
fs.writeFileSync(new URL('../dist/mathews-parts.js',import.meta.url),'// Photo-led Mathews volumes clipped to its unchanged source perimeter.\n// Regenerate with node scripts/make-mathews-parts.mjs.\nexport const MATHEWS_ROOFS = '+JSON.stringify(roofs,null,2)+';\nexport const MATHEWS_LOWER = '+JSON.stringify(lower,null,2)+';\nexport const MATHEWS_TOWER = '+JSON.stringify(tower.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true})),null,2)+';\nexport const MATHEWS_ENTRY_FLOOR = '+JSON.stringify(floor,null,2)+';\nexport const MATHEWS_PODIUM_FACES = '+JSON.stringify(faces,null,2)+';\nexport const MATHEWS_SIRF_PAVING = '+JSON.stringify(sirfPaving,null,2)+';\n');
console.log(`${roofs.length} Mathews roof regions, ${lower.length} lower regions`);
