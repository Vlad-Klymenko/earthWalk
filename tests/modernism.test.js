import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { scienceTheatreGeometry, scienceTheatreFoundation, modernFacadeFrame } from '../dist/modernism-data.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';

const inside=(p,ring)=>{
  let result=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const a=ring[i],b=ring[j];
    if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)result=!result;
  }
  return result;
};

test('modernist reconstructions retain mapped footprints and levels, keeping the theatre height conflict explicit',()=>{
  for(const id of ['science-theatre','dalton','robert-webster']){
    const b=CAMPUS.buildings.find(b=>b.id===id),raw=SOURCE.buildings.find(b=>b.id===id);
    assert.deepEqual(b.points,raw.points);
    if(id==='science-theatre'){assert.equal(b.height,11.73);assert.equal(b.mappedHeight,raw.height);assert.equal(b.heightSource,'reported');}else{assert.equal(b.height,raw.height);assert.equal(b.heightSource,'mapped');}
    assert.equal(b.levels,raw.levels);
  }
  assert.equal(CAMPUS.buildings.find(b=>b.id==='science-theatre').levels,5);
});

test('auditorium roof preserves the selected reported maximum and canopy clears the real slope',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='science-theatre'),g=scienceTheatreGeometry(b);
  const heights=b.points.map(g.roofHeight);
  assert.ok(Math.abs(Math.max(...heights)-b.height)<1e-6);
  assert.ok(Math.min(...heights)>9);
  const base=scienceTheatreFoundation(b,terrainHeight);
  for(const v of [g.frame.length/2+.5,g.canopy.front])for(let i=0;i<=6;i++){
    const p=framePoint(g.frame,-g.frame.width/2+i*g.frame.width/6,v);
    assert.ok(base+g.canopy.height-.2-terrainHeight(p.x,p.z)>2.4,'canopy has head clearance, including terrain between mapped vertices');
  }
});

test('new comparison arrivals and estimated trees remain outside buildings',()=>{
  for(const id of ['science-theatre','dalton','webster-west-view','dalton-east-view']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);
    for(const b of CAMPUS.buildings)assert.ok(!inside(p,b.points),`${id} inside ${b.name}`);
  }
  const b=CAMPUS.buildings.find(b=>b.id==='science-theatre'),g=scienceTheatreGeometry(b);
  for(const p of g.trees){
    assert.equal(p.reconstructed,true);
    assert.ok(!inside(p,b.points));
    assert.ok(Math.hypot(p.x-g.arrival.x,p.z-g.arrival.z)>4,'tree does not occupy the arrival');
  }
  const {frame}=modernFacadeFrame(CAMPUS.buildings.find(b=>b.id==='dalton'));
  assert.ok(frame.length>60&&frame.width<15,'long elevations stay distinct from blank ends');
});
