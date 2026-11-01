import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { MEDICAL_PARTS, MEDICAL_GROUND_FLOORS } from '../dist/medical-parts.js';
import { medicalGeometry, WALLACE_HEIGHT_REPORT } from '../dist/medical-data.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
import { heightDescription } from '../dist/building-heights.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=g=>g.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];
const ids=['wallace-wurth','osm-way-45230537'];

test('medical massing preserves mapped outlines and distinguishes component elevations',()=>{
  for(const id of ids){
    const b=CAMPUS.buildings.find(b=>b.id===id),raw=SOURCE.buildings.find(b=>b.id===id),g=medicalGeometry(b),parts=MEDICAL_PARTS.filter(p=>p.buildingId===id);
    assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.levels,raw.levels);
    const union=clipping.union(...parts.map(polygon));
    assert.ok(area(clipping.xor(union,polygon(b)))<1e-6);
    assert.ok(Math.abs(parts.reduce((s,p)=>s+area([polygon(p)]),0)-area(union))<1e-6);
    assert.ok(parts.every(p=>p.reconstructed));
    for(const plant of g.plants)assert.ok(area(clipping.difference(polygon(plant),polygon(b)))<1e-6);
    if(g.wallace){
      assert.equal(b.heightSource,'derived');assert.equal(b.levels,null);
      assert.ok(Math.abs(b.height+g.base-95)<1e-6);
      assert.equal(g.roofRL,87.01);assert.equal(g.plants[0].roofRL,90.55);
      assert.ok(g.roofRL<g.plants[0].roofRL&&g.plants[0].roofRL<WALLACE_HEIGHT_REPORT.flueRL);
      assert.equal(heightDescription(b).quantity,'Flue top above model base');
      assert.match(b.heightNote,/not an as-built survey/);
    }else{
      assert.equal(b.height,32);assert.equal(b.levels,8);assert.equal(b.heightSource,'mapped');
      assert.ok(Math.abs(g.plants[0].roofRL-g.base-32)<1e-6);
      assert.ok(g.bridgeRoof<g.roofRL-g.base);
    }
  }
});

test('raised medical sections support their columns and preserve ground clearance',()=>{
  for(const id of ids){
    const b=CAMPUS.buildings.find(b=>b.id===id),g=medicalGeometry(b),part=MEDICAL_PARTS.find(p=>p.buildingId===id&&p.kind===(g.wallace?'east':'bridge'));
    for(const p of g.supports){
      assert.ok(area(clipping.difference(circle(p,p.radius),polygon(part)))<1e-6,`${id} entire column under upper volume`);
      assert.ok((g.wallace?g.upperBaseRL:g.base+g.bridgeBottom)-terrainHeight(p.x,p.z)>2.4,'raised volume clears standing player');
    }
    if(g.wallace){
      for(const floor of MEDICAL_GROUND_FLOORS)assert.ok(area(clipping.difference(polygon(floor),polygon(part)))<1e-6);
      for(const v of [35,37,39]){
        const p=framePoint(g.frame,13,v);
        assert.ok(g.upperBaseRL-.15-terrainHeight(p.x,p.z)>2.4);
        for(const floor of MEDICAL_GROUND_FLOORS)assert.ok(area(clipping.intersection(circle(p,.4),polygon(floor)))<1e-6,'southern covered route stays open');
        assert.ok(g.supports.every(s=>Math.hypot(p.x-s.x,p.z-s.z)>s.radius+.4));
      }
    }
  }
});

test('medical arrivals and explicitly reconstructed atrium clear mapped neighbours',()=>{
  for(const id of ids){
    const p=CAMPUS.landmarks.find(p=>p.id===id),b=CAMPUS.buildings.find(b=>b.id===id),g=medicalGeometry(b);
    assert.ok(p.x<CAMPUS.bounds.maxX-.5&&p.x>CAMPUS.bounds.minX+.5&&p.z<CAMPUS.bounds.maxZ-.5&&p.z>CAMPUS.bounds.minZ+.5);
    for(const other of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(other)))<1e-6,`${id} arrival clears ${other.id}`);
    if(g.wallace){
      for(const other of CAMPUS.buildings)assert.ok(area(clipping.intersection(polygon({points:g.atrium}),polygon(other)))<1e-6,'new atrium enclosure does not overlap source buildings');
      assert.ok(area(clipping.intersection(circle(p,.4),polygon({points:g.atrium})))<1e-6);
    }
  }
});
