import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { ESME_ID, ESME_HEIGHT_REPORT, SCIENCE_HEIGHT_REPORT, SCIENCE_FLUE_REPORT, esmeGeometry, scienceLabGeometry, scienceLinks } from '../dist/science-precinct-data.js';
import { buildingBase, terrainHeight } from '../dist/terrain.js';
import { framePoint } from '../dist/geometry.js';
import { heightDescription } from '../dist/building-heights.js';
const polygon=points=>[points.map(p=>[p.x,p.z])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const find=id=>CAMPUS.buildings.find(b=>b.id===id),esme=find(ESME_ID),seb=find('science-engineering'),hilmer=find('hilmer');

test('science precinct preserves source footprints and tags while identifying derived heights',()=>{
  for(const b of [esme,seb,hilmer]){
    const raw=SOURCE.buildings.find(q=>q.id===b.id);
    assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.levels,raw.levels);assert.equal(b.heightSource,'derived');
    assert.match(heightDescription(b).label,/planning RL minus DEM/);
    if(b===esme)assert.equal(b.mappedHeight,2);else assert.equal(b.previousEstimate,22.400000000000002);
  }
});

test('science precinct height quantities distinguish lift, plant, parapet and flues',()=>{
  assert.ok(Math.abs(esme.height+buildingBase(esme.points)-ESME_HEIGHT_REPORT.liftRL)<1e-8);
  assert.ok(Math.abs(seb.height+buildingBase(seb.points)-SCIENCE_FLUE_REPORT.flueRL)<1e-8);
  assert.ok(Math.abs(hilmer.height+buildingBase(hilmer.points)-SCIENCE_HEIGHT_REPORT.parapetRL)<1e-8);
  assert.equal(ESME_HEIGHT_REPORT.liftRL-1.96,ESME_HEIGHT_REPORT.podiumRL);
  assert.equal(scienceLabGeometry(seb).mainRL,68.9);assert.equal(scienceLabGeometry(seb).plantRL,73.8);
});

test('amphitheatre terraces cover the original footprint exactly without overlapping treads',()=>{
  const g=esmeGeometry(esme),parts=g.regions.map(r=>polygon(r.points)),union=clipping.union(...parts);
  assert.ok(area(clipping.difference(polygon(esme.points),union))<1e-6);
  assert.ok(area(clipping.difference(union,polygon(esme.points)))<1e-6);
  assert.ok(Math.abs(parts.reduce((s,p)=>s+area([p]),0)-area(union))<1e-6);
  assert.ok(g.regions.every(r=>r.rl<=g.topRL));assert.ok((g.topRL-g.lowRL)/g.count<.18);
});

test('amphitheatre rises westward from its eastern lawn forecourt and joins the top landing',()=>{
  const g=esmeGeometry(esme);let previous=g.lowRL;
  for(let k=0;k<=128;k++){
    const p=framePoint(g.frame,g.frame.width/2-(g.frame.width)*k/128,0),height=g.surfaceRL(p);
    assert.ok(height>=previous-1e-8);assert.ok(height-previous<.18);previous=height;
  }
  assert.equal(previous,g.topRL);
  const bottom=framePoint(g.frame,g.frame.width/2-.1,0);assert.ok(Math.abs(g.surfaceRL(bottom)-terrainHeight(bottom.x,bottom.z))<.3);
});

test('podium lift sits wholly on the raised landing and reaches its documented roof level',()=>{
  const g=esmeGeometry(esme);
  assert.ok(area(clipping.difference(polygon(g.lift.points),polygon(g.regions[0].points)))<1e-6);
  assert.equal(g.lift.bottomRL,g.topRL);assert.equal(g.lift.topRL,35.1);
});

test('science plant enclosures and flues stay within their retained building outlines',()=>{
  for(const b of [seb,hilmer]){
    const g=scienceLabGeometry(b);assert.ok(area(clipping.difference(polygon(g.plant.points),polygon(b.points)))<1e-6);
    assert.ok(g.plant.top>g.plant.bottom);assert.ok(g.base+g.plant.top<=g.maximumRL);
    for(const p of g.flues){
      const circle=[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*p.radius,p.z+Math.sin(i*Math.PI/24)*p.radius])];
      assert.ok(area(clipping.difference(circle,polygon(g.plant.points)))<1e-6);assert.equal(p.top+g.base,79.8);
    }
  }
});

test('glazed science links remain between both footprints and clear walking ground below',()=>{
  const g=scienceLinks(seb,hilmer);
  for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(polygon(g.points),polygon(b.points)))<1e-6,`links clear ${b.id}`);
  for(const p of g.points)assert.ok(g.levels[0].bottomRL-terrainHeight(p.x,p.z)>2.3);
  for(const level of g.levels)assert.ok(level.topRL>level.bottomRL);
  for(const [i,level] of g.levels.entries())for(const b of [seb,hilmer]){const model=scienceLabGeometry(b);assert.ok(Math.abs(level.bottomRL+.18-(model.base+model.bands[i].low))<1e-8,'bridge floor aligns with both inner balcony levels');}
  assert.ok(g.topRL.at(-1)<=scienceLabGeometry(hilmer).mainRL);
});

test('science precinct external map arrivals clear all source buildings',()=>{
  for(const id of [ESME_ID,'science-engineering','hilmer','science-link-passage','esme-roof-steps']){
    const p=CAMPUS.landmarks.find(p=>p.id===id),circle=[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*.4,p.z+Math.sin(i*Math.PI/24)*.4])];
    for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(circle,polygon(b.points)))<1e-6,`${id} arrival clears ${b.id}`);
  }
  const g=esmeGeometry(esme),p=CAMPUS.landmarks.find(p=>p.id==='esme-roof-steps');assert.ok(Math.abs(p.heading-g.stairHeading)<1e-8);
});
