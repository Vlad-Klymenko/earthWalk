import {physicsServiceGeometry} from '../dist/physics-service-data.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { NEWTON_ID, KEITH_ID, PHYSICS_ID, newtonGeometry, keithGeometry, physicsGeometry } from '../dist/physics-precinct-data.js';
import { terrainHeight } from '../dist/terrain.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const n=r[(i+1)%r.length];return s+p[0]*n[1]-n[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];
const newton=CAMPUS.buildings.find(b=>b.id===NEWTON_ID),keith=CAMPUS.buildings.find(b=>b.id===KEITH_ID),physics=CAMPUS.buildings.find(b=>b.id===PHYSICS_ID);

test('physics precinct retains mapped outlines, heights and level evidence independently from photographed rows',()=>{
  for(const [b,height,levels] of [[newton,16,5],[physics,8,1]]){
    const raw=SOURCE.buildings.find(s=>s.id===b.id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,height);assert.equal(b.levels,levels);assert.equal(b.heightSource,'mapped');
  }
  assert.deepEqual(keith.points,SOURCE.buildings.find(b=>b.id===KEITH_ID).points);assert.equal(keith.mappedHeight,8);assert.equal(keith.height,11.18);assert.equal(keith.heightSource,'reported');assert.equal(keith.levels,1);assert.equal(keith.reportedLevels,3);
  assert.equal(newtonGeometry(newton).rows,4);
  const p=physicsServiceGeometry(physics);assert.ok(p.body<p.maximum);assert.equal(p.maximum,physics.height);for(const part of p.parts)assert.ok(area(clipping.difference(polygon(part),polygon(physics)))<1e-6,'roof regions remain within the source outline');
});

test('Newton reconstructed entrance stair, ramp and landing clear neighbouring building volumes',()=>{
  const g=newtonGeometry(newton),s=g.stair,r=g.ramp;
  assert.ok((s.highRL-s.lowRL)/s.count<.18);assert.equal(r.highRL,s.highRL);assert.ok(r.highRL>r.lowRL);
  for(const flight of [s,r])for(let k=0;k<=40;k++){
    const t=k/40,p={x:flight.a.x+(flight.b.x-flight.a.x)*t,z:flight.a.z+(flight.b.z-flight.a.z)*t};
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`entrance flight clears ${b.id}`);
  }
  for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(polygon({points:g.landing}),polygon(b)))<1e-6,`landing clears ${b.id}`);
  assert.ok(area(clipping.intersection(circle(s.b,.4),polygon({points:g.landing})))>.1,'stair reaches landing');
  assert.ok(area(clipping.intersection(circle(r.b,.4),polygon({points:g.landing})))>.1,'ramp reaches the same landing');
});

test('Keith Burrows lower inset fits the curved source volume and keeps standing clearance below its overhang',()=>{
  const g=keithGeometry(keith);assert.ok(area(clipping.difference(polygon({points:g.lower}),polygon(keith)))<1e-6);
  assert.ok(g.overhang<keith.height);assert.ok(g.overhang>3);
  for(const i of g.arcIndices){const p=keith.points[i];assert.ok(g.base+g.overhang-.14-terrainHeight(p.x,p.z)>2.1);assert.ok(Math.hypot(g.lower[i].x-p.x,g.lower[i].z-p.z)>1.2);}
  assert.ok(area([polygon(keith)])>area([polygon({points:g.lower})]));
});

test('physics precinct map arrivals clear every retained building footprint',()=>{
  for(const id of [NEWTON_ID,KEITH_ID,PHYSICS_ID,'newton-entry-stair']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);assert.ok(p.x>CAMPUS.bounds.minX&&p.x<CAMPUS.bounds.maxX&&p.z>CAMPUS.bounds.minZ&&p.z<CAMPUS.bounds.maxZ);
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`${id} arrival clears ${b.id}`);
  }
});
