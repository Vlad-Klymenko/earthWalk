import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { ELECTRICAL_LANDSCAPE as g, ELECTRICAL_LANDSCAPE_REPORT, ELECTRICAL_FLOOR_REPORT, campusTerrainHeight, courtGround, inElectricalCourt } from '../dist/electrical-landscape.js';
import { ELECTRICAL_APRON, ELECTRICAL_GROUND_CUTOUT, ELECTRICAL_REMOVED_TRIANGLES, ELECTRICAL_GROUND_EDGES } from '../dist/electrical-landscape-parts.js';
import { REX_LINK_ID } from '../dist/small-buildings-data.js';
import { terrainHeight, TERRAIN_GRID as grid } from '../dist/terrain.js';
import { framePoint } from '../dist/geometry.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);

test('outdoor classroom and southern forecourt retain their public references without replacing source data',()=>{
  assert.ok(ELECTRICAL_LANDSCAPE_REPORT.url.includes('SSD-7370'));assert.equal(ELECTRICAL_FLOOR_REPORT.rexEntryRL,34.780);assert.equal(ELECTRICAL_FLOOR_REPORT.southEntryRL,35.470);
  assert.ok(g.reconstructed);assert.equal(g.tiers.length,6);assert.equal(g.steps.length,18);assert.ok(g.rise>2.5&&g.rise<3);
  const road=CAMPUS.paths.find(p=>p.id==='osm-way-280268480'),raw=SOURCE.paths.find(p=>p.id===road.id);assert.deepEqual(road.points,raw.points);assert.equal(road.kind,raw.kind);assert.equal(road.width,raw.width);assert.equal(road.renderSurface,'paving');
  for(const b of CAMPUS.buildings.filter(b=>b.id==='osm-way-45230019'||b.id==='osm-way-280411955'))assert.deepEqual(b.points,SOURCE.buildings.find(p=>p.id===b.id).points);
});

test('bleachers, stair aisle and paving stay outside occupied building outlines',()=>{
  const all=[{points:g.arena},{points:g.ramp},...ELECTRICAL_APRON];
  for(const part of all)for(const b of SOURCE.buildings){if(b.id===REX_LINK_ID)continue;assert.ok(area(clipping.intersection(poly(part.points,part.holes),poly(b.points,b.holes)))<1e-6,`landscape clears ${b.id}`);}
  const union=clipping.union(...[...g.tiers,...g.steps,...g.lowParts.map(points=>({points}))].map(p=>poly(p.points)));
  assert.ok(area(clipping.difference(poly(g.arena),union))<1e-6);assert.ok(area(clipping.difference(union,poly(g.arena)))<1e-6);
  assert.ok(area(clipping.intersection(clipping.union(...g.tiers.map(p=>poly(p.points))),clipping.union(...g.steps.map(p=>poly(p.points)))))<1e-6);
});

test('rendered court treads and seating agree with the shared walking-height function',()=>{
  for(const part of [...g.tiers,...g.steps]){
    const p=part.points.reduce((a,p)=>({x:a.x+p.x/part.points.length,z:a.z+p.z/part.points.length}),{x:0,z:0});
    assert.ok(inElectricalCourt(p.x,p.z));assert.ok(Math.abs(courtGround(p.x,p.z)-part.ground)<1e-7);assert.ok(Math.abs(campusTerrainHeight(p.x,p.z)-part.ground)<1e-7);
  }
  for(let i=0;i<18;i++){const p=framePoint(g.frame,g.startU+(i+.5)*(g.endU-g.startU)/18,22.8);assert.ok(Math.abs(courtGround(p.x,p.z)-(g.lowGround+g.rise*i/18))<1e-7);}
  for(const v of [12,18,22.8,25]){const a=framePoint(g.frame,g.endU,v),b=framePoint(g.frame,g.roadU,v),r=framePoint(g.frame,g.roadU,v);assert.ok(Math.abs(courtGround(a.x,a.z)-g.highGround)<1e-5);assert.ok(Math.abs(courtGround(b.x,b.z)-terrainHeight(r.x,r.z))<1e-5);}
  assert.ok(g.rise/18<.16);assert.ok(CAMPUS.landmarks.some(p=>p.id==='rex-outdoor-classroom'));
});

test('local terrain edits leave the raw DEM intact and are restricted to the court and link',()=>{
  for(const p of [{x:0,z:0},{x:-200,z:100},{x:400,z:-200},framePoint(g.frame,0,60),framePoint(g.frame,4.6,-20)])assert.equal(campusTerrainHeight(p.x,p.z),terrainHeight(p.x,p.z));
  const p=framePoint(g.frame,-7,22.8);assert.ok(terrainHeight(p.x,p.z)-campusTerrainHeight(p.x,p.z)>.5,'the coarse DEM is visibly refined in the low court');
  for(const p of g.bridge)assert.ok(campusTerrainHeight(p.x,p.z)<=g.lowGround+1e-7,'link boundary samples use the same refined floor');
  assert.ok(ELECTRICAL_REMOVED_TRIANGLES.length>0&&ELECTRICAL_REMOVED_TRIANGLES.length<100);
});

test('exact DEM-triangle fragments preserve all terrain outside the reconstructed cutout',()=>{
  const triangles=ELECTRICAL_REMOVED_TRIANGLES.map(([col,row,index])=>{
    const a={x:grid.x0+col*grid.dx,z:grid.z0+row*grid.dz},b={x:a.x+grid.dx,z:a.z},c={x:a.x,z:a.z+grid.dz},d={x:b.x,z:c.z};return poly(index?[b,d,c]:[a,b,c]);
  });
  // Snap sub-micrometre arithmetic differences at shared cell vertices before
  // unioning all fragments; retain the original full-precision source data.
  const snap=p=>p.map(r=>r.map(([x,z])=>[Math.round(x*1e7)/1e7,Math.round(z*1e7)/1e7]));
  const expected=clipping.difference(clipping.union(...triangles.map(snap)),clipping.union(...ELECTRICAL_GROUND_CUTOUT.map(p=>snap(poly(p.points,p.holes)))));
  const actual=clipping.union(...ELECTRICAL_GROUND_EDGES.map(p=>snap(poly(p.points,p.holes))));
  assert.ok(area(clipping.difference(expected,actual))<1e-5);assert.ok(area(clipping.difference(actual,expected))<1e-5);
});

test('new planted edges leave the mapped southern walking corridors clear',()=>{
  const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);};
  for(const bed of [...g.beds,...g.seats])for(const p of SOURCE.paths)for(let i=0;i<p.points.length-1;i++)for(const corner of bed.points)assert.ok(distance(corner,p.points[i],p.points[i+1])>(p.width||3)/2+.3,`planting clears ${p.id}`);
  for(const b of SOURCE.buildings){if(b.id===REX_LINK_ID)continue;assert.ok(area(clipping.intersection(poly(Array.from({length:24},(_,i)=>({x:g.arrival.x+Math.cos(i*Math.PI/12)*.4,z:g.arrival.z+Math.sin(i*Math.PI/12)*.4}))),poly(b.points,b.holes)))<1e-6);}
});
