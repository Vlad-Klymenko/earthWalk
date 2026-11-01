import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { POOL_ID, GYM_ID, poolGeometry, gymGeometry } from '../dist/aquatic-data.js';
const polygon=points=>[points.map(p=>[p.x,p.z])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const n=r[(i+1)%r.length];return s+p[0]*n[1]-n[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const pool=CAMPUS.buildings.find(b=>b.id===POOL_ID),gym=CAMPUS.buildings.find(b=>b.id===GYM_ID);

test('aquatic models preserve mapped perimeters, heights and independent level tags',()=>{
  for(const [b,levels] of [[pool,1],[gym,4]]){
    const raw=SOURCE.buildings.find(r=>r.id===b.id);
    assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,10);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,levels);
  }
});

test('pool reception and hall partition the entire source footprint without overlap',()=>{
  const g=poolGeometry(pool),union=clipping.union(polygon(g.hall),polygon(g.front));
  assert.ok(area(clipping.difference(polygon(pool.points),union))<1e-6,'no source footprint omitted');
  assert.ok(area(clipping.difference(union,polygon(pool.points)))<1e-6,'no invented perimeter extension');
  assert.ok(area(clipping.intersection(polygon(g.hall),polygon(g.front)))<1e-6,'no overlap');
  assert.ok(g.frontTop<g.eave&&g.eave<pool.height);
});

test('aquatic roof profiles stay below the mapped maximum and form lower eaves',()=>{
  for(const [b,g] of [[pool,poolGeometry(pool)],[gym,gymGeometry(gym)]]){
    for(const p of b.points){const y=g.roofHeight(p);assert.ok(y<=b.height+1e-9);assert.ok(y>=g.eave-1e-9);}
    const centre=b===pool?{x:g.frame.x,z:g.ridgeZ}:{x:g.frame.x,z:g.frame.z};
    assert.equal(g.roofHeight(centre),b.height);assert.ok(g.roofHeight(centre)>g.eave);
  }
});

test('aquatic map arrivals have player clearance from every mapped building',()=>{
  for(const id of [POOL_ID,GYM_ID]){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);
    const circle=[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*.4,p.z+Math.sin(i*Math.PI/24)*.4])];
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle,[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]))))<1e-6,`${id} arrival clears ${b.id}`);
  }
});

test('reconstructed aquatic entrance aprons stay outside all retained building footprints',()=>{
  for(const g of [poolGeometry(pool),gymGeometry(gym)]){
    assert.ok(g.paving.length>0);
    for(const apron of g.paving)for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(polygon(apron),[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]))))<1e-6,`entrance paving clears ${b.id}`);
  }
});
