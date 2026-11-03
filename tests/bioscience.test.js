import {BIO_STREET_GARDEN,BIO_STREET_TREES} from '../dist/bioscience-street-data.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { BIOSCIENCE_PARTS } from '../dist/bioscience-parts.js';
import { bioscienceGeometry, MATHEWS_COVERED_ROUTES } from '../dist/bioscience-data.js';
import { framePoint } from '../dist/geometry.js';
import { heightDescription } from '../dist/building-heights.js';
import { terrainHeight, buildingBase } from '../dist/terrain.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=g=>g.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i*Math.PI/12)*r,p.z+Math.sin(i*Math.PI/12)*r])];

test('biosciences massing partitions mapped outlines while retaining missing map dimensions',()=>{
  for(const id of ['biological-north','biological-south']){
    const b=CAMPUS.buildings.find(b=>b.id===id),raw=SOURCE.buildings.find(b=>b.id===id),g=bioscienceGeometry(b),parts=BIOSCIENCE_PARTS.filter(p=>p.buildingId===id);
    assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.levels,null);
    const union=clipping.union(...parts.map(polygon));
    assert.ok(area(clipping.xor(union,polygon(b)))<1e-6);
    assert.ok(Math.abs(parts.reduce((s,p)=>s+area([polygon(p)]),0)-area(union))<1e-6,'internal volumes do not overlap');
    for(const plant of g.plants){
      assert.ok(area(clipping.difference(polygon(plant),polygon(b)))<1e-6,'plant stays within the original outline');
      assert.ok(plant.roofRL<=g.report.roofRL);
    }
    assert.equal(b.heightSource,'derived');assert.equal(b.previousEstimate,raw.height);
    assert.ok(Math.abs(b.height+buildingBase(b.points)-g.report.roofRL)<1e-6);
    assert.equal(heightDescription(b).quantity,'Plant roof above model base');
    assert.match(heightDescription(b).label,/approx/);assert.match(b.heightNote,/not an as-built height survey/);
    assert.ok(parts.every(p=>p.roofRL<g.report.roofRL),'plant maximum is not applied to every building mass');
  }
});

test('biosciences covered entrances and floating glass box clear the real ground',()=>{
  const n=CAMPUS.buildings.find(b=>b.id==='biological-north'),g=bioscienceGeometry(n);
  for(let u=g.canopy.start;u<=g.canopy.end;u+=2)for(const v of [g.canopy.v,g.canopy.v-g.canopy.depth]){
    const p=framePoint(g.frame,u,v);
    assert.ok(g.canopy.roofRL-.2-terrainHeight(p.x,p.z)>2.4,'northern cover clears the high end of the slope');
  }
  const south=CAMPUS.buildings.find(b=>b.id==='biological-south'),s=bioscienceGeometry(south);
  assert.equal(BIO_STREET_GARDEN.reconstructed,true);
  for(const p of BIO_STREET_TREES)for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,'street planting must not enter a building');
  for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(polygon({points:g.forecourt}),polygon(b)))<.1,'entrance terrace must not fill another building');
  for(const p of s.supports){
    const glass=BIOSCIENCE_PARTS.find(p=>p.buildingId===south.id&&p.kind==='glass-box');
    assert.ok(area(clipping.difference(circle(p,.48),polygon(glass)))<1e-6,'whole support belongs under the glass box');
    assert.ok(57.57-terrainHeight(p.x,p.z)>2,'underside remains above the street-side terrain');
  }
});

test('new viewpoints fit the player and covered-route source outlines remain unchanged',()=>{
  for(const id of ['biological-north','biological-south','mathews-theatres']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);
    assert.ok(p.x<CAMPUS.bounds.maxX-.5&&p.x>CAMPUS.bounds.minX+.5&&p.z<CAMPUS.bounds.maxZ-.5&&p.z>CAMPUS.bounds.minZ+.5);
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`${id} arrival clears ${b.id}`);
  }
  const theatre=CAMPUS.buildings.find(b=>b.id==='mathews-theatres');assert.equal(theatre.height,12);assert.equal(theatre.levels,3);assert.equal(theatre.heightSource,'mapped');
  for(const id of MATHEWS_COVERED_ROUTES){
    const b=CAMPUS.buildings.find(b=>b.id===id),raw=SOURCE.buildings.find(b=>b.id===id);
    assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);
    assert.equal(b.heightSource,'estimated');assert.equal(b.previousVisualEstimate,3.8);assert.equal(b.height,4.2);assert.equal(b.modelledCanopyWith,'library');
    assert.ok(b.height-.25-1.65>.8,'cover clears a standing player across terrain rather than a single low foundation');
  }
});
