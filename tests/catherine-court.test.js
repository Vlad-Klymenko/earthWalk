import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TREE_INVENTORY as TREES} from '../dist/tree-inventory-data.js';
import {terrainHeight} from '../dist/terrain.js';
import {CATHERINE_SOURCE_ID as ID,CATHERINE_SOURCE as SOURCE,CATHERINE_PATTERN as P,CATHERINE_VIEW as VIEW,catherinePoint,catherineUV} from '../dist/catherine-court-data.js';
import {CATHERINE_GROUND as G,CATHERINE_PAVING as V,CATHERINE_PITS as PITS,CATHERINE_SOIL as SOIL,CATHERINE_CURBS as CURBS,CATHERINE_MESH as M,CATHERINE_BENCHES as B,CATHERINE_REMNANTS as REM} from '../dist/catherine-court-parts.js';
import {catherineCourtHeight as height,inCatherinePart as inside,inCatherineCourt} from '../dist/catherine-court-landscape.js';
import {pathGeometry} from '../dist/path-materials.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((s,p,j)=>{const q=r[(j+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2,0),0);
const union=ps=>clip.union(...ps.map(poly));
const circle=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i*Math.PI/16)*r,p.z+Math.sin(i*Math.PI/16)*r])];
test('current courtyard name preserves the raw OSM footprint / name and adds a searchable historical alias',()=>{
 const raw=RAW.plazas.find(p=>p.id===ID),shown=CAMPUS.plazas.find(p=>p.id===ID);assert.equal(raw.name,'Commerce Courtyard');assert.equal(shown.name,'Catherine Harris Courtyard');assert.equal(shown.mappedName,raw.name);assert.deepEqual(shown.points,raw.points);assert.deepEqual(SOURCE.points,raw.points);assert.ok(VIEW.aliases.includes(raw.name));assert.ok(CAMPUS.landmarks.some(p=>p.id===VIEW.id));
 assert.ok(area(clip.difference(union(G),poly(raw)))<1e-7);for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(union(G),poly(b)))<1e-7);
});
test('brick fields, soil and stone tree-pit edging partition every replacement floor without overlap',()=>{
 const shapes=[union(V),union(SOIL),union(CURBS)],all=clip.union(...shapes);assert.ok(area(clip.xor(all,union(G)))<1e-6);for(let i=0;i<shapes.length;i++)for(let j=i+1;j<shapes.length;j++)assert.ok(area(clip.intersection(shapes[i],shapes[j]))<1e-7);
 assert.ok(area(all)>1400);assert.ok(P.band<P.grid/10&&P.paverLength===P.paverWidth*2);
});
test('floor triangles retain the unchanged public DEM exactly at vertices and interior samples',()=>{
 const offsets={paving:P.pavingOffset,soil:P.soilOffset,curb:P.curbOffset};let sum=0;
 for(const tri of M){const [a,b,c]=tri.points;assert.ok(tri.points.every(p=>Number.isFinite(p.x+p.y+p.z)));const projected=Math.abs((b.x-a.x)*(c.z-a.z)-(c.x-a.x)*(b.z-a.z))/2;assert.ok(projected>1e-12);sum+=projected;
  for(const p of tri.points)assert.ok(Math.abs(p.y-terrainHeight(p.x,p.z)-offsets[tri.kind])<1e-7);
  for(const weights of [[1/3,1/3,1/3],[.2,.3,.5]]){const p=tri.points.reduce((p,v,i)=>({x:p.x+v.x*weights[i],y:p.y+v.y*weights[i],z:p.z+v.z*weights[i]}),{x:0,y:0,z:0});assert.ok(Math.abs(p.y-terrainHeight(p.x,p.z)-offsets[tri.kind])<1e-6,'no interpolation crosses a source DEM diagonal');assert.ok(Math.abs(height(p.x,p.z)-p.y)<1e-6);}
 }
 assert.ok(Math.abs(sum-area(union(G)))<1e-6);
 const uv0=catherineUV(catherinePoint(0,0)),uv1=catherineUV(catherinePoint(P.grid,0));assert.ok(Math.abs(uv1[0]-uv0[0]-1)<1e-8);
});
test('each tree pit uses its exact retained inventory coordinate and a bounded reconstructed soil opening',()=>{
 assert.ok(PITS.length>=15);const seen=new Set();for(const p of PITS){const t=TREES.find(t=>t.id===p.treeId);assert.ok(t);assert.equal(p.x,t.x);assert.equal(p.z,t.z);assert.ok(!seen.has(t.id));seen.add(t.id);assert.ok(p.reconstructed);assert.ok(area(union(p.outer))<=P.pitOuter**2+1e-7);assert.ok(area(union(p.inner))<=P.pitInner**2+1e-7);assert.ok(Math.abs(height(p.x,p.z)-terrainHeight(p.x,p.z)-P.soilOffset)<1e-7);}
});
test('fitted benches stay in the paved tree rows and preserve all mapped pedestrian widths',()=>{
 assert.ok(B.length>=8);for(const [i,b] of B.entries()){assert.ok(b.reconstructed);assert.ok(TREES.some(t=>t.id===b.treeId));assert.ok(area(clip.difference(poly(b),union(V)))<1e-7);for(const other of B.slice(i+1))assert.ok(area(clip.intersection(poly(b),poly(other)))<1e-7);
  for(const path of CAMPUS.paths)for(let j=1;j<path.points.length;j++){const a=path.points[j-1],c=path.points[j],l=Math.hypot(c.x-a.x,c.z-a.z);if(!l)continue;const w=(pathGeometry(path).width+.2)/2,nx=-(c.z-a.z)/l*w,nz=(c.x-a.x)/l*w,shape=[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[c.x-nx,c.z-nz],[c.x+nx,c.z+nz]];assert.ok(area(clip.intersection(poly(b),[shape]))<1e-6,'bench cannot narrow a source walking route');}
 }
});
test('seat / back / arm surfaces match their collision tops without raising the ground on approach',()=>{
 for(const b of B){assert.equal(b.surfaces.length,4);for(const s of b.surfaces){assert.ok(area(clip.difference(poly(s),poly(b)))<1e-7);assert.ok(s.height>s.minimumY&&s.minimumY>s.bottom);}
  assert.ok(Math.abs(height(b.x,b.z,b.floor)-b.floor)<1e-7);assert.ok(Math.abs(height(b.x,b.z,b.floor+.55)-(b.floor+.49))<1e-7);
  const back={x:b.x-b.n.x*.285,z:b.z-b.n.z*.285};assert.ok(Math.abs(height(back.x,back.z,b.floor+.95)-(b.floor+.925))<1e-7);
 }
});
test('replacement masks remove overlapping old surfaces while keeping the new arrival clear',()=>{
 assert.ok(Object.keys(REM.paths).length>=5);for(const p of Object.values(REM.paths))for(const part of [...p.edge,...p.surface])assert.ok(area(clip.intersection(poly(part),union(G)))<1e-7);for(const ps of Object.values(REM.plazas))for(const p of ps)assert.ok(area(clip.intersection(poly(p),union(G)))<1e-7);
 for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(circle(VIEW,.4),poly(b)))<1e-7);for(const b of B)assert.ok(area(clip.intersection(circle(VIEW,.4),poly(b)))<1e-7);for(const t of TREES)assert.ok(Math.hypot(t.x-VIEW.x,t.z-VIEW.z)>.9);assert.ok(Number.isFinite(height(VIEW.x,VIEW.z)));assert.ok(inCatherineCourt(VIEW.x,VIEW.z));for(const b of B)assert.ok(inCatherineCourt(b.x,b.z));assert.equal(inCatherineCourt(0,0),false);assert.equal(height(0,0),undefined);
});
