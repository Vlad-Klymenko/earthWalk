import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { BARKER_APARTMENTS_ID, BARKER_PASSAGE_PATH, barkerApartmentsGeometry } from '../dist/barker-apartments-data.js';
import { BARKER_APARTMENTS_PARTS } from '../dist/barker-apartments-parts.js';
import { VALLENTINE_ID, vallentineGeometry } from '../dist/vallentine-data.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const barker=CAMPUS.buildings.find(b=>b.id===BARKER_APARTMENTS_ID),vallentine=CAMPUS.buildings.find(b=>b.id===VALLENTINE_ID);
const circle=(p,r=.4)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];

test('Barker apartments and Vallentine retain source height, outlines and independent level evidence',()=>{
  for(const b of [barker,vallentine]){const raw=SOURCE.buildings.find(p=>p.id===b.id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,12);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,raw.levels);assert.ok(buildingAppearance(b).source);}
  assert.match(barker.heightNote,/three to five/);assert.equal(barker.levels,4);assert.equal(vallentine.levels,3);
});

test('the reconstructed Barker passage split preserves its complete mapped building perimeter',()=>{
  const parts=BARKER_APARTMENTS_PARTS.map(p=>poly(p.points,p.holes)),union=clipping.union(...parts);
  assert.ok(area(clipping.difference(poly(barker.points),union))<1e-6);assert.ok(area(clipping.difference(union,poly(barker.points)))<1e-6);assert.ok(Math.abs(parts.reduce((s,p)=>s+area([p]),0)-area(union))<1e-6);
  assert.equal(BARKER_APARTMENTS_PARTS.filter(p=>p.kind==='passage').length,2);
});

test('Gate 15 footways pass beneath both covered sections with walking and head clearance',()=>{
  const g=barkerApartmentsGeometry(barker);let coveredSamples=0;
  for(let i=0;i<BARKER_PASSAGE_PATH.length-1;i++){
    const a=BARKER_PASSAGE_PATH[i],c=BARKER_PASSAGE_PATH[i+1];
    for(let k=0;k<=30;k++){const t=k/30,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};
      for(const part of BARKER_APARTMENTS_PARTS){const overlap=area(clipping.intersection(circle(p),poly(part.points,part.holes)));if(overlap<1e-6)continue;
        assert.equal(part.kind,'passage','no solid ground-level part blocks the mapped path');assert.ok(g.base+g.passageBottom(part.points)-terrainHeight(p.x,p.z)>2.7);coveredSamples++;
      }
    }
  }
  assert.ok(coveredSamples>10);
});

test('Barker angular roofs stay within the retained maximum and vary across the wings',()=>{
  const g=barkerApartmentsGeometry(barker),heights=[];
  for(let i=0;i<=200;i++){const p=framePoint(g.frame,-g.frame.width/2+g.frame.width*i/200,0),h=g.roofAt(p);assert.ok(h<=12&&h>=9.94);heights.push(h);}
  assert.ok(Math.max(...heights)-Math.min(...heights)>1.9);
});

test('Vallentine red stair joins its landing and has walkable reconstructed risers',()=>{
  const g=vallentineGeometry(vallentine),s=g.stair;
  assert.ok(Math.abs(s.h1-s.h0-2.4)<1e-8);assert.ok((s.h1-s.h0)/s.count<.18);assert.equal(s.h1,g.landing.rl);
  const inner={x:s.b.x+(s.b.x-s.a.x)*.1,z:s.b.z+(s.b.z-s.a.z)*.1};assert.ok(area(clipping.intersection(circle(inner,.3),poly(g.landing.points)))>.1);
  for(const points of [g.landing.points,g.apron])for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(poly(points),poly(b.points,b.holes)))<1e-6,`entry surface clears ${b.id}`);
  assert.ok(g.canopy.rl>g.topRL+2.5&&g.canopy.rl<=g.base+vallentine.height);
  const edge=Array.from({length:40},(_,i)=>g.canopyEdge(g.canopy.v0+(g.canopy.v1-g.canopy.v0)*i/39));assert.ok(Math.max(...edge)-Math.min(...edge)>1.3);
});

test('new exterior and stair destinations clear all source building footprints',()=>{
  for(const id of [BARKER_APARTMENTS_ID,VALLENTINE_ID,'vallentine-entry-steps','vallentine-north-frontage']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);
    for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(circle(p),poly(b.points,b.holes)))<1e-6,`${id} clears ${b.id}`);
  }
});
