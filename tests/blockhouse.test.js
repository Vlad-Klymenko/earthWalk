import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { BLOCKHOUSE_ID, blockhouseGeometry } from '../dist/blockhouse-data.js';
import { BLOCKHOUSE_PARTS, BLOCKHOUSE_ROOFS, BLOCKHOUSE_AWNING, BLOCKHOUSE_PAVING } from '../dist/blockhouse-parts.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { terrainHeight } from '../dist/terrain.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r})));
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const raw=SOURCE.buildings.find(b=>b.id===BLOCKHOUSE_ID),g=blockhouseGeometry(raw),src=[poly(raw.points,raw.holes)];
test('Blockhouse retains mapped dimensions separately from photo-led roof and façade subdivisions',()=>{
 const b=CAMPUS.buildings.find(b=>b.id===BLOCKHOUSE_ID);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);assert.equal(b.height,15);assert.equal(b.levels,3);assert.equal(b.heightSource,'mapped');assert.equal(b.photoUpperRows,2);assert.match(b.heightNote,/reconstructed/);assert.equal(buildingAppearance(b).facade,'blockhouse');assert.ok(g.roof<b.height);assert.equal(Math.max(...BLOCKHOUSE_ROOFS.map(p=>p.height)),b.height);
});
test('recesses and occupied ground exactly partition the retained stepped perimeter',()=>{
 const union=clip.union(...BLOCKHOUSE_PARTS.map(p=>poly(p.points,p.holes)));assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);
 for(let i=0;i<BLOCKHOUSE_PARTS.length;i++)for(let j=i+1;j<BLOCKHOUSE_PARTS.length;j++)assert.ok(area(clip.intersection(poly(BLOCKHOUSE_PARTS[i].points,BLOCKHOUSE_PARTS[i].holes),poly(BLOCKHOUSE_PARTS[j].points,BLOCKHOUSE_PARTS[j].holes)))<1e-6);
});
test('western mapped passage is clear with standing and jumping headroom',()=>{
 const occupied=BLOCKHOUSE_PARTS.filter(p=>p.kind==='ground');for(let i=0;i<g.route.points.length-1;i++){const a=g.route.points[i],b=g.route.points[i+1];for(let k=0;k<=32;k++){
  const p={x:a.x+(b.x-a.x)*k/32,z:a.z+(b.z-a.z)*k/32};for(const part of occupied){assert.ok(area(clip.intersection([disc(p,.45)],[poly(part.points,part.holes)]))<1e-6);for(let j=0;j<part.points.length;j++)assert.ok(distance(p,part.points[j],part.points[(j+1)%part.points.length])>.45,'collision ring has no zero-area path spur');}assert.ok(g.base+g.passageCeiling-terrainHeight(p.x,p.z)-.22>3.0);
 }}
});
test('tower and lower roof partition the footprint; external awning clears buildings and terrain',()=>{
 const union=clip.union(...BLOCKHOUSE_ROOFS.map(p=>poly(p.points,p.holes)));assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);assert.ok(BLOCKHOUSE_ROOFS.some(p=>p.kind==='core'&&p.height===15));
 for(const part of BLOCKHOUSE_AWNING){for(const b of SOURCE.buildings)assert.ok(area(clip.intersection([poly(part.points,part.holes)],[poly(b.points,b.holes)]))<1e-6);for(const p of part.points)assert.ok(g.base+part.bottom-terrainHeight(p.x,p.z)-.22>3);}
});
test('arrival points, hedges and reconstructed trees clear occupied footprints and source paths',()=>{
 for(const p of [g.arrival,g.northArrival,g.passageArrival,g.arcadeArrival,...g.trees])for(const b of SOURCE.buildings)assert.ok(area(clip.intersection([disc(p,.8)],[poly(b.points,b.holes)]))<1e-6,`arrival or tree clears ${b.id}`);
 for(const hedge of g.hedges)for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)for(const p of hedge.points)assert.ok(distance(p,path.points[i],path.points[i+1])>(path.width||3)/2+.4,`hedge clears ${path.id}`);
});
test('additional paving does not cover occupied ground or coincide with mapped path ribbons',()=>{
 for(const floor of BLOCKHOUSE_PAVING){const shape=[poly(floor.points,floor.holes)];for(const part of BLOCKHOUSE_PARTS.filter(p=>p.kind==='ground'))assert.ok(area(clip.intersection(shape,[poly(part.points,part.holes)]))<1e-6);
 for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*(path.width||3)/2,nz=(c.x-a.x)/len*(path.width||3)/2;assert.ok(area(clip.intersection(shape,[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}])]))<1e-6);}
 }
});
