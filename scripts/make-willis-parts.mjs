import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { frameRectangle } from '../dist/geometry.js';
import { WILLIS_ID, willisGeometry } from '../dist/engineering-lane-data.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const clean=r=>(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-9?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const emit=m=>m.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true}));
const buffer=(points,width)=>{
 const pieces=[];for(let i=0;i<points.length-1;i++){const a=points[i],c=points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2;pieces.push([[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[c.x-nx,c.z-nz],[c.x+nx,c.z+nz]]]);}
 for(const p of points)pieces.push([Array.from({length:24},(_,i)=>[p.x+Math.cos(i*Math.PI/12)*width/2,p.z+Math.sin(i*Math.PI/12)*width/2])]);return clipping.union(...pieces);
};
const b=CAMPUS.buildings.find(b=>b.id===WILLIS_ID),g=willisGeometry(b),occupied=clipping.union(...CAMPUS.buildings.filter(b=>!b.walkableUnder).map(b=>poly(b.points,b.holes)));
const coverShape=clipping.difference(poly(g.cover.points),occupied),cover=emit(coverShape),members=[];
for(let v=g.cover.v0;v<=g.cover.v1+.001;v+=1.3)members.push(poly(frameRectangle(g.frame,6.5,.13,-19.35,v)));
for(const u of [g.cover.u0+.075,g.cover.u1-.075])members.push(poly(frameRectangle(g.frame,.15,39,u,-25)));
const frame=emit(clipping.intersection(coverShape,clipping.union(...members))),entry=emit(clipping.difference(poly(g.entryCanopy.points),occupied));
const paths=CAMPUS.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.entry.x,p.z-g.entry.z)<90)),paving=emit(clipping.difference(poly(g.apron),occupied,clipping.union(...paths.map(p=>buffer(p.points,(p.width||3)+.16)))));
fs.writeFileSync(new URL('../dist/willis-parts.js',import.meta.url),'// Photo-led Willis covers clipped away from retained occupied footprints.\n// Regenerate with node scripts/make-willis-parts.mjs.\nexport const WILLIS_LANE_COVER = '+JSON.stringify(cover,null,2)+';\nexport const WILLIS_LANE_PAVING = '+JSON.stringify(cover,null,2)+';\nexport const WILLIS_COVER_FRAME = '+JSON.stringify(frame,null,2)+';\nexport const WILLIS_ENTRY_CANOPY = '+JSON.stringify(entry,null,2)+';\nexport const WILLIS_ENTRY_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(`${cover.length} Willis lane cover regions, ${entry.length} entry cover regions, ${paving.length} paving regions`);
