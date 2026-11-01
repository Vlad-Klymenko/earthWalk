import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { BARKER_PARKING_ID, BOTANY_PARKING_ID, BARKER_EXISTING_REPORT, parkingGeometry, parkingEntry, parkingCars } from '../dist/parking-data.js';
import { buildingAppearance } from '../dist/visual-data.js';
const poly=points=>[points.map(p=>[p.x,p.z])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const buildings=[BARKER_PARKING_ID,BOTANY_PARKING_ID].map(id=>CAMPUS.buildings.find(b=>b.id===id));

test('parking stations retain mapped outlines and conflicting level / height evidence',()=>{
  for(const b of buildings){const raw=SOURCE.buildings.find(p=>p.id===b.id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.levels,raw.levels);assert.equal(buildingAppearance(b).facade,'parking-station');}
  const [barker,botany]=buildings,g=parkingGeometry(barker);
  assert.equal(barker.heightSource,'derived');assert.equal(barker.previousEstimate,16);assert.ok(Math.abs(barker.height+g.base-BARKER_EXISTING_REPORT.screenRL)<1e-8);
  assert.equal(botany.height,12.8);assert.equal(botany.heightSource,'estimated');assert.equal(botany.levels,4);assert.equal(parkingGeometry(botany).regions[0].decks.length,6);assert.match(botany.heightNote,/relocation/);
});

test('Barker models existing five-storey split decks rather than the proposed extension',()=>{
  const g=parkingGeometry(buildings[0]);assert.equal(g.regions.length,3);
  for(const [i,r] of g.regions.entries()){assert.equal(r.decks.length,5);assert.equal(r.decks[0],BARKER_EXISTING_REPORT.groundRLs[i]);assert.equal(r.decks.at(-1),BARKER_EXISTING_REPORT.deckTops[i]);assert.equal(r.screenRL,r.decks.at(-1)+1.8);}
  assert.equal(Math.max(...g.regions.map(r=>r.screenRL)),47.64);assert.equal(g.ramps.length,10);
});

test('parking deck regions partition the source perimeter without gaps or overlaps',()=>{
  for(const b of buildings){const g=parkingGeometry(b),parts=g.regions.map(r=>poly(r.points)),union=clipping.union(...parts);
    assert.ok(area(clipping.difference(poly(b.points),union))<1e-6);assert.ok(area(clipping.difference(union,poly(b.points)))<1e-6);assert.ok(Math.abs(parts.reduce((s,p)=>s+area([p]),0)-area(union))<1e-6);
    // External screen edges must be collinear with a retained outer boundary.
    for(const r of g.regions)for(const {a,b:c} of r.faces)assert.ok(b.points.some((p,i)=>{const q=b.points[(i+1)%b.points.length],dx=q.x-p.x,dz=q.z-p.z,len=Math.hypot(dx,dz);return Math.abs(dx*(a.z-p.z)-dz*(a.x-p.x))/len<.015&&Math.abs(dx*(c.z-p.z)-dz*(c.x-p.x))/len<.015;}));
  }
});

test('parking cores, ramps and illustrative cars remain inside their source footprints',()=>{
  for(const b of buildings){const g=parkingGeometry(b);assert.ok(parkingCars(b,g).length>20);
    for(const p of [...g.cores,...g.ramps,...parkingCars(b,g)])assert.ok(area(clipping.difference(poly(p.points),poly(b.points)))<1e-6,`${b.id} component stays inside perimeter`);
    const entry=parkingEntry(g);assert.ok(entry);assert.ok(Math.hypot(entry.a.x-entry.c.x,entry.a.z-entry.c.z)>11);
  }
});

test('parking map arrivals remain outside all building footprints',()=>{
  for(const b of buildings){const g=parkingGeometry(b),p=CAMPUS.landmarks.find(p=>p.id===b.id),circle=[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*.4,p.z+Math.sin(i*Math.PI/24)*.4])];
    assert.ok(Math.abs(p.x-g.arrival.x)<1e-8);assert.ok(Math.abs(p.heading-g.heading)<1e-8);
    for(const other of CAMPUS.buildings)assert.ok(area(clipping.intersection(circle,poly(other.points)))<1e-6,`${b.id} arrival clears ${other.id}`);
  }
});
