import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {MORVEN_ID,morvenGeometry} from '../dist/morven-brown-data.js';
import {MORVEN_BENCHES,MORVEN_SHRUBS,MORVEN_GARDEN_VIEW,morvenBenchPoint,morvenShrubForm} from '../dist/morven-garden-data.js';
import {MORVEN_GARDEN_BEDS,MORVEN_BENCH_PADS,MORVEN_PAVING_BANDS} from '../dist/morven-garden-parts.js';
import {BOURKE_POOL} from '../dist/morven-fountain-data.js';
import {terrainHeight} from '../dist/terrain.js';
const poly=(r,h=[])=>[r,...h].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const b=RAW.buildings.find(b=>b.id===MORVEN_ID),court=[poly(b.holes[0])],lawn=[poly(RAW.greens.find(p=>p.id==='osm-way-45604250').points)],fountain=[poly(BOURKE_POOL.rim)];
test('Morven garden surfaces stay in the open court and preserve lawn and fountain outlines',()=>{
 for(const parts of [MORVEN_GARDEN_BEDS,MORVEN_BENCH_PADS,MORVEN_PAVING_BANDS])for(const p of parts){const shape=[poly(p.points,p.holes)];assert.ok(area(clip.difference(shape,court))<1e-7);assert.ok(area(clip.intersection(shape,lawn))<1e-7);assert.ok(area(clip.intersection(shape,fountain))<1e-7);}
 const union=parts=>clip.union(...parts.map(p=>poly(p.points,p.holes)));for(const [a,c] of [[MORVEN_GARDEN_BEDS,MORVEN_BENCH_PADS],[MORVEN_GARDEN_BEDS,MORVEN_PAVING_BANDS],[MORVEN_BENCH_PADS,MORVEN_PAVING_BANDS]])assert.ok(area(clip.intersection(union(a),union(c)))<1e-7);
 assert.ok(MORVEN_BENCH_PADS.length>=MORVEN_BENCHES.length);
});
test('reconstructed benches clear buildings, source routes, neighbouring benches and the fountain',()=>{
 for(let i=0;i<MORVEN_BENCHES.length;i++){
  const bench=MORVEN_BENCHES[i],shape=[poly(bench.points)];assert.ok(area(clip.difference(shape,court))<1e-7);assert.ok(area(clip.intersection(shape,lawn))<1e-7);assert.ok(area(clip.intersection(shape,fountain))<1e-7);
  for(let j=0;j<i;j++)assert.ok(area(clip.intersection(shape,[poly(MORVEN_BENCHES[j].points)]))<1e-7);
  for(const p of bench.points){const foot=terrainHeight(p.x,p.z)+.22;assert.ok(bench.baseRL+.46-foot>=.45);assert.ok(bench.baseRL+.46-foot<.7);}
  for(const path of RAW.paths)for(let k=1;k<path.points.length;k++){const a=path.points[k-1],c=path.points[k],len=Math.hypot(c.x-a.x,c.z-a.z),w=(path.width||3)/2,nx=-(c.z-a.z)/len*w,nz=(c.x-a.x)/len*w;if(len<1e-6)continue;assert.ok(area(clip.intersection(shape,[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}])]))<1e-7,path.id);}
 }
 for(let i=0;i<8;i+=2){const a=MORVEN_BENCHES[i],c=MORVEN_BENCHES[i+1];assert.equal(a.u,c.u);assert.ok(Math.abs(c.v-a.v-2.2)<1e-8);assert.equal(a.yaw,Math.PI);assert.equal(c.yaw,0);}
 assert.ok(MORVEN_BENCHES.slice(8,12).every(b=>b.yaw===Math.PI/2));
});
test('ornamental shrub forms remain deterministic, finite and distinct from inventory trees',()=>{
 for(const plant of MORVEN_SHRUBS){const form=morvenShrubForm(plant);assert.deepEqual(form,morvenShrubForm(plant));assert.equal(plant.inventoryTree,false);assert.equal(plant.reconstructed,true);assert.ok(plant.height<2.6);assert.ok(form.branches.every(s=>s.b[1]>s.a[1]));
  for(const p of [...form.leaves,...form.flowers]){assert.ok(Object.values(p).every(Number.isFinite));assert.ok(p.y>plant.height*.29&&p.y<plant.height);assert.ok(Math.hypot(p.x,p.z)<plant.radius*1.05);}
  if(plant.flowering){assert.equal(plant.side,'west');assert.ok(form.flowers.length>0);}else assert.equal(form.flowers.length,0);
 }
});
test('new garden arrival is a clear outdoor viewpoint and original Morven footprint remains',()=>{
 assert.ok(CAMPUS.landmarks.some(p=>p.id===MORVEN_GARDEN_VIEW.id));const a=MORVEN_GARDEN_VIEW,disc=Array.from({length:24},(_,i)=>({x:a.x+Math.cos(i*Math.PI/12)*.45,z:a.z+Math.sin(i*Math.PI/12)*.45}));
 for(const raw of RAW.buildings)assert.ok(area(clip.intersection([poly(disc)],[poly(raw.points,raw.holes)]))<1e-7);for(const bench of MORVEN_BENCHES)assert.ok(area(clip.intersection([poly(disc)],[poly(bench.points)]))<1e-7);
 const shown=CAMPUS.buildings.find(p=>p.id===MORVEN_ID);assert.deepEqual(shown.points,b.points);assert.deepEqual(shown.holes,b.holes);assert.deepEqual(shown.tags,b.tags);assert.equal(shown.height,18);
 assert.deepEqual(morvenBenchPoint(MORVEN_BENCHES[0],0,0),{x:MORVEN_BENCHES[0].x,z:MORVEN_BENCHES[0].z});assert.equal(morvenGeometry(b).routes.length,2);
});
