import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { ELECTRICAL_ID, ELECTRICAL_LEVELS, electricalGeometry } from '../dist/electrical-data.js';
import { buildingAppearance, VISUAL_REFERENCES } from '../dist/visual-data.js';
import { REX_ID, REX_LINK_ID, rexGeometry } from '../dist/small-buildings-data.js';
import { buildingBase } from '../dist/terrain.js';
const b=CAMPUS.buildings.find(p=>p.id===ELECTRICAL_ID),raw=SOURCE.buildings.find(p=>p.id===ELECTRICAL_ID),g=electricalGeometry(b);
const poly=points=>[points.map(p=>[p.x,p.z])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);

test('Electrical Engineering retains map evidence independently of derived planning heights',()=>{
  assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.levels,8);assert.equal(b.mappedHeight,24);assert.equal(b.heightSource,'derived');
  assert.equal(b.height+buildingBase(b.points),69.5);assert.equal(b.heightQuantity,'Lightning mast above model base');
  assert.equal(ELECTRICAL_LEVELS.parapetRL,57.141);assert.equal(ELECTRICAL_LEVELS.plantRL,63.711);assert.equal(ELECTRICAL_LEVELS.flueRL,66.711);
  assert.ok(ELECTRICAL_LEVELS.parapetRL<ELECTRICAL_LEVELS.stairRL&&ELECTRICAL_LEVELS.stairRL<ELECTRICAL_LEVELS.plantRL);
});

test('north and south regions partition the mapped T-shaped footprint without replacing it',()=>{
  const parts=g.regions.map(p=>poly(p.points)),union=clipping.union(...parts);
  assert.ok(area(clipping.difference(poly(b.points),union))<1e-6);assert.ok(area(clipping.difference(union,poly(b.points)))<1e-6);
  assert.ok(Math.abs(parts.reduce((s,p)=>s+area([p]),0)-area(union))<1e-6);
  for(const c of [...g.cores,...g.plants]){assert.ok(c.reconstructed);assert.ok(area(clipping.difference(poly(c.points),poly(b.points)))<.01,'roof components remain within mapped building');}
});

test('photo-led facade rows and component positions stay separate from mapped floor count',()=>{
  assert.equal(buildingAppearance(b).facade,'electrical');assert.equal(g.upperRows,5);assert.notEqual(g.upperRows,b.levels);
  for(const c of g.cores)assert.ok(c.roofRL>ELECTRICAL_LEVELS.parapetRL&&c.roofRL<ELECTRICAL_LEVELS.plantRL);
  for(const m of g.masts){assert.ok(m.reconstructed);assert.ok(m.rl>m.from&&m.rl<=g.maximumRL);}
  assert.equal(Math.max(...g.masts.map(m=>m.rl)),g.maximumRL);
  for(const id of ['electrical-built-hassell','electrical-folded-plant','electrical-contractor-built','electrical-elevation-levels'])assert.ok(VISUAL_REFERENCES.some(s=>s.id===id));
});

test('G17 exterior arrival and existing Rex covered walking route remain clear',()=>{
  const circle=(p,r=.4)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i*Math.PI/16)*r,p.z+Math.sin(i*Math.PI/16)*r])];
  const landmark=CAMPUS.landmarks.find(p=>p.id===ELECTRICAL_ID);assert.equal(landmark.x,g.arrival.x);assert.equal(landmark.z,g.arrival.z);
  for(const other of CAMPUS.buildings)assert.ok(area(clipping.intersection(circle(g.arrival),poly(other.points)))<1e-6,`arrival clears ${other.id}`);
  const rex=CAMPUS.buildings.find(p=>p.id===REX_ID),link=CAMPUS.buildings.find(p=>p.id===REX_LINK_ID),r=rexGeometry(rex,link);
  for(let i=0;i<=60;i++){const t=i/60,p={x:r.bridgeArrival.x+(r.bridgeTarget.x-r.bridgeArrival.x)*t,z:r.bridgeArrival.z+(r.bridgeTarget.z-r.bridgeArrival.z)*t};assert.ok(area(clipping.intersection(circle(p,.35),poly(b.points)))<1e-6);}
});
