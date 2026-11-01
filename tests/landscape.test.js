import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { COLLEGE_GARDEN, COLLEGE_PAVING, COLLEGE_COURTYARD_VIEW } from '../dist/campus-landscape.js';

function inside(p,ring){
  let hit=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const a=ring[i],b=ring[j];
    if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)hit=!hit;
  }
  return hit;
}

test('courtyard reconstruction preserves the mapped garden and opens at the public panorama position',()=>{
  assert.deepEqual(COLLEGE_GARDEN.points,SOURCE.greens.find(g=>g.id==='osm-way-926419123').points);
  assert.deepEqual(COLLEGE_PAVING.holes,[COLLEGE_GARDEN.points]);
  assert.ok(COLLEGE_GARDEN.points.every(p=>inside(p,COLLEGE_PAVING.points)),'paving hole stays within the reconstructed courtyard');
  const panorama=COLLEGE_COURTYARD_VIEW;
  assert.ok(Math.abs(panorama.x-317.4226)<.001);
  assert.ok(Math.abs(panorama.z+173.8424)<.001);
  assert.equal(inside(panorama,COLLEGE_GARDEN.points),false,'arrival stays outside the raised bed');
  for(const b of CAMPUS.buildings)assert.equal(inside(panorama,b.points),false,`arrival inside ${b.name}`);
  assert.ok(CAMPUS.landmarks.some(p=>p.id===panorama.id));
  assert.equal(new Set(CAMPUS.landmarks.map(p=>p.id)).size,CAMPUS.landmarks.length);
  assert.equal(COLLEGE_GARDEN.dimensionsSource,'visual reconstruction');
  assert.equal(COLLEGE_PAVING.reconstructed,true);
});
