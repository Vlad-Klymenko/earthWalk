import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { MORVEN_ID, morvenGeometry } from '../dist/morven-brown-data.js';
import { MORVEN_PARTS, MORVEN_PAVING } from '../dist/morven-brown-parts.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { terrainHeight } from '../dist/terrain.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r})));
const raw=SOURCE.buildings.find(b=>b.id===MORVEN_ID),g=morvenGeometry(raw);
test('Morven Brown retains mapped dimensions and separates photo-led detail',()=>{
 const b=CAMPUS.buildings.find(b=>b.id===MORVEN_ID);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,18);assert.equal(b.levels,5);assert.equal(b.heightSource,'mapped');assert.equal(b.photoUpperRows,4);assert.match(b.heightNote,/reconstructed/);assert.equal(buildingAppearance(b).facade,'morven-brown');assert.equal(g.rows.length,5);assert.ok(g.roof<18);
});
test('lower regions partition the footprint while preserving the entire open courtyard',()=>{
 const union=clip.union(...MORVEN_PARTS.map(p=>poly(p.points,p.holes))),source=[poly(raw.points,raw.holes)];assert.ok(area(clip.difference(source,union))<1e-6);assert.ok(area(clip.difference(union,source))<1e-6);
 for(let i=0;i<MORVEN_PARTS.length;i++)for(let j=i+1;j<MORVEN_PARTS.length;j++)assert.ok(area(clip.intersection(poly(MORVEN_PARTS[i].points,MORVEN_PARTS[i].holes),poly(MORVEN_PARTS[j].points,MORVEN_PARTS[j].holes)))<1e-6);
});
test('both source courtyard passages clear ground collision and have headroom above sloping terrain',()=>{
 const occupied=MORVEN_PARTS.filter(p=>p.kind==='ground');for(const route of g.routes)for(let i=0;i<route.points.length-1;i++){const a=route.points[i],b=route.points[i+1];for(let k=0;k<=24;k++){
 const p={x:a.x+(b.x-a.x)*k/24,z:a.z+(b.z-a.z)*k/24};for(const part of occupied)assert.ok(area(clip.intersection([disc(p,.45)],[poly(part.points,part.holes)]))<1e-6);
 assert.ok(g.base+route.ceiling-terrainHeight(p.x,p.z)-.22>3,route.id+' has standing and jumping clearance');
 }}
});
test('added paving avoids the retained lawn and mapped path surfaces',()=>{
 const lawn=SOURCE.greens.find(p=>p.id==='osm-way-45604250');for(const floor of MORVEN_PAVING){const shape=[poly(floor.points,floor.holes)];assert.ok(area(clip.intersection(shape,[poly(lawn.points)]))<1e-6);
 for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*(path.width||3)/2,nz=(c.x-a.x)/len*(path.width||3)/2;assert.ok(area(clip.intersection(shape,[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}])]))<1e-6);}
 }
});
test('courtyard and passage arrivals are outside every mapped building',()=>{
 for(const a of [g.arrival,...g.passageViews.map(p=>p.arrival)])for(const b of SOURCE.buildings)assert.ok(area(clip.intersection([disc(a,.4)],[poly(b.points,b.holes)]))<1e-6,`arrival clears ${b.id}`);
});
