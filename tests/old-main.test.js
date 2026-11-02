import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { OLD_MAIN_ID, OLD_MAIN_PHYSICS, oldMainGeometry } from '../dist/old-main-data.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { terrainHeight } from '../dist/terrain.js';
const b=CAMPUS.buildings.find(b=>b.id===OLD_MAIN_ID),raw=SOURCE.buildings.find(q=>q.id===b.id),g=oldMainGeometry(b);
const poly=points=>[points.map(p=>[p.x,p.z])];
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const ribbon=(a,c,width)=>{const len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2;return poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}]);};

test('Old Main photo-led bands remain independent of source height and level tags',()=>{
  assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);assert.equal(b.height,24);assert.equal(b.levels,6);assert.equal(b.heightSource,'mapped');assert.equal(b.photoLevels,OLD_MAIN_PHYSICS.describedStoreys);assert.equal(g.rows.length,4);assert.equal(buildingAppearance(b).facade,'old-main');
  for(const row of g.rows){assert.ok(row.high>row.low);assert.ok(row.high<b.height-.4);}
});

test('both Old Main flights and landings clear mapped buildings and retained path envelopes',()=>{
  for(const part of g.stairs.parts){
    for(const other of SOURCE.buildings)assert.ok(area(clip.intersection(poly(part.points),poly(other.points)))<1e-6,`entrance clears ${other.id}`);
    for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(area(clip.intersection(poly(part.points),ribbon(path.points[i],path.points[i+1],(path.width||3)+.68)))<1e-6,`stairs preserve ${path.id}`);
  }
});

test('Old Main entrance shares small risers across its two bounded flights and intermediate landing',()=>{
  const s=g.stairs;assert.equal(s.lower.length+s.upper.length,12);assert.equal(s.count,12);assert.ok(Math.abs(s.rise-2.04)<1e-8);
  for(let i=1;i<s.parts.length;i++){const d=s.parts[i].rl-s.parts[i-1].rl;assert.ok(d>=0&&d<=.17000001);assert.ok(area(clip.intersection(poly(s.parts[i].points),poly(s.parts[i-1].points)))<1e-6);}
  for(const p of s.lower[0].points){const d=s.lower[0].rl+.01-(terrainHeight(p.x,p.z)+.22);assert.ok(d>=-.04&&d<.27,'lower flight meets surrounding paving');}
  const all=clip.union(...s.parts.map(p=>poly(p.points)));assert.equal(all.length,1,'all flight and landing polygons are contiguous');
  assert.ok((s.bottomV-s.lowerTop)/s.lower.length>.3);assert.ok((s.middleTop-s.upperTop)/s.upper.length>.3);
});

test('Old Main exterior map arrivals clear every occupied footprint',()=>{
  for(const id of [OLD_MAIN_ID,'old-main-entry','old-main-north-court']){
    const p=CAMPUS.landmarks.find(q=>q.id===id);assert.ok(p);const circle=poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*.4,z:p.z+Math.sin(i*Math.PI/12)*.4})));
    for(const other of SOURCE.buildings)assert.ok(area(clip.intersection(circle,poly(other.points)))<1e-6,`${id} clears ${other.id}`);
  }
});
