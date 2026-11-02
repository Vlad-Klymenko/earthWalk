import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { LAW_ID, LAW_ARCHITECT, lawGeometry } from '../dist/law-data.js';
import { buildingAppearance, VISUAL_REFERENCES } from '../dist/visual-data.js';
import { framePoint } from '../dist/geometry.js';
const b=CAMPUS.buildings.find(b=>b.id===LAW_ID),raw=SOURCE.buildings.find(q=>q.id===b.id),g=lawGeometry(b);
const poly=points=>[points.map(p=>[p.x,p.z])];
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);

test('Law pavilion keeps mapped height, outline and five-level tag separate from four architectural levels',()=>{
  assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);assert.equal(b.height,15);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,5);assert.equal(b.photoLevels,4);assert.equal(g.visibleLevels,LAW_ARCHITECT.visibleLevels);assert.equal(buildingAppearance(b).facade,'law-pavilion');
  assert.match(b.heightNote,/2027/);for(const id of ['law-mall-photo','law-roof-section','law-mall-streetview','law-union-entry','law-west-entry','law-cladding-source'])assert.ok(VISUAL_REFERENCES.some(r=>r.id===id));
});

test('Law folded roof stays within the mapped maximum without the old invented rooftop core',()=>{
  const heights=b.points.map(g.roofAt);assert.ok(Math.max(...heights)-Math.min(...heights)>.7);assert.ok(Math.abs(Math.max(...heights)-15)<1e-8);
  for(let u=-40;u<=40;u+=2)for(let v=-26;v<=26;v+=2){const h=g.roofAt(framePoint(g.frame,u,v));assert.ok(h>=13.25&&h<=15);}
  assert.ok(g.roofAt(framePoint(g.frame,3,-2))<13.3);
  assert.equal(g.faces.length,raw.points.length);assert.ok(['mall','union','west','east'].every(kind=>g.faces.some(f=>f.kind===kind)));
  for(const face of g.faces){
    assert.ok(Math.abs(Math.hypot(face.normal.x,face.normal.z)-1)<1e-8);
    const mx=(face.a.x+face.c.x)/2,mz=(face.a.z+face.c.z)/2,p={x:mx+face.normal.x*.05,z:mz+face.normal.z*.05};
    const circle=poly(Array.from({length:16},(_,i)=>({x:p.x+Math.cos(i*Math.PI/8)*.01,z:p.z+Math.sin(i*Math.PI/8)*.01})));
    assert.ok(area(clipping.intersection(circle,poly(raw.points)))<1e-7,'facade normals face outward');
  }
});

test('all Law exterior arrivals fit the player and face the correct facade',()=>{
  for(const id of [LAW_ID,'law-union-road','law-west-piers']){
    const p=CAMPUS.landmarks.find(q=>q.id===id);assert.ok(p);const circle=poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*.4,z:p.z+Math.sin(i*Math.PI/12)*.4})));
    for(const other of SOURCE.buildings)assert.ok(area(clipping.intersection(circle,poly(other.points)))<1e-6,`${id} clears ${other.id}`);
    const target=id===LAW_ID?g.target:id==='law-union-road'?g.unionTarget:g.westTarget,dx=target.x-p.x,dz=target.z-p.z;assert.ok((Math.sin(p.heading)*dx-Math.cos(p.heading)*dz)/Math.hypot(dx,dz)>.999);
  }
});
