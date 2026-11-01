import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { WILLIS_ID, K17_VISUAL_HEIGHT, k17Geometry, willisGeometry } from '../dist/engineering-lane-data.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
import { heightDescription } from '../dist/building-heights.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const n=r[(i+1)%r.length];return s+p[0]*n[1]-n[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];
const k17=CAMPUS.buildings.find(b=>b.id==='k17'),willis=CAMPUS.buildings.find(b=>b.id===WILLIS_ID);

test('engineering models preserve original coordinates and separate photo-led massing from map tags',()=>{
  for(const b of [k17,willis]){const raw=SOURCE.buildings.find(s=>s.id===b.id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.levels,raw.levels);}
  assert.equal(willis.height,12);assert.equal(willis.levels,3);assert.equal(heightDescription(willis).label,'OSM height tag');
  assert.equal(k17.height,K17_VISUAL_HEIGHT);assert.equal(k17.heightSource,'estimated');assert.equal(k17.previousEstimate,SOURCE.buildings.find(b=>b.id==='k17').height);assert.equal(k17.levels,6);assert.match(k17.heightNote,/not surveyed/);
  const g=k17Geometry(k17);assert.ok(g.foyerTop<k17.height);assert.ok(area(clipping.difference(polygon({points:g.foyerFloor}),polygon(k17)))<1e-6,'visual foyer floor stays inside the retained building');
  for(const t of [.2,.65])for(const off of [-1.3,-2.8,-3.45])assert.ok(area(clipping.difference(circle(g.front.along(t,off),.05),polygon({points:g.foyerFloor})))<1e-6,'orange stair glimpse fits behind the glazing');
});

test('engineering arrivals and covered-lane centre remain clear of mapped building volumes',()=>{
  for(const id of ['k17',WILLIS_ID,'willis-covered-lane']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);assert.ok(p.x>CAMPUS.bounds.minX&&p.x<CAMPUS.bounds.maxX&&p.z>CAMPUS.bounds.minZ&&p.z<CAMPUS.bounds.maxZ);
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`${id} clears ${b.id}`);
  }
  const g=willisGeometry(willis),s=g.cover;
  for(let v=s.v0;v<=s.v1;v+=.5){
    const p=framePoint(g.frame,-19.3,v);
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`lane clears ${b.id}`);
    assert.ok(s.clearance-.1>2.1,'canopy preserves standing headroom relative to DEM');
    assert.ok(Number.isFinite(terrainHeight(p.x,p.z)));
  }
  assert.ok(s.u0<-22&&s.u1>-16.2,'cover reaches the photographed building faces');assert.equal(s.reconstructed,true);
});

test('reconstructed K17 footway clears buildings and Willis roof remains within its mapped vertical maximum',()=>{
  const k=k17Geometry(k17),w=willisGeometry(willis);
  for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(polygon({points:k.paving}),polygon(b)))<1e-6,`foyer footway clears ${b.id}`);
  assert.ok(w.eave<willis.height);assert.ok(w.eave>willis.height-1);assert.ok(w.entryGround>w.base);assert.ok(w.entryGround-w.base+3.48<w.eave,'northern hood remains below the roof');
});
