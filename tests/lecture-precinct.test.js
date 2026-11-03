import {CIVIL_HEIGHT} from '../dist/civil-west-data.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { civilGeometry, patriciaGeometry, lectureFacadeRing } from '../dist/lecture-precinct-data.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
import { heightDescription } from '../dist/building-heights.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=g=>g.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];
const civil=CAMPUS.buildings.find(b=>b.id==='osm-way-45230790'),patricia=CAMPUS.buildings.find(b=>b.id==='osm-way-45230803');

test('lecture precinct retains mapped footprints and heights independently from façade rows',()=>{
  for(const [b,height,levels] of [[civil,CIVIL_HEIGHT.height,10],[patricia,12,3]]){
    const raw=SOURCE.buildings.find(s=>s.id===b.id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,height);assert.equal(b.levels,levels);assert.equal(heightDescription(b).label,b.id===civil.id?'public UNSW GIS':'OSM height tag');
    const ring=lectureFacadeRing(b.points);assert.ok(ring.length<b.points.length);
    const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
    for(const p of b.points)assert.ok(Math.min(...ring.map((a,i)=>distance(p,a,ring[(i+1)%ring.length])))<=.15,'merged façade edges remain within the disclosed alignment tolerance');
  }
  const g=civilGeometry(civil);assert.equal(g.rows,8);assert.ok(g.bodyRoof<g.plant.top);assert.equal(g.plant.top,CIVIL_HEIGHT.height);
  assert.ok(area(clipping.difference(polygon(g.plant),polygon(civil)))<1e-6,'roof plant stays within its source outline');
});

test('Patricia stair and upper landing fit the real recess and retain standing clearance',()=>{
  const g=patriciaGeometry(patricia),s=g.stair;
  assert.ok(g.coverRL<g.base+patricia.height,'gallery cover does not raise the mapped maximum');
  assert.ok(g.coverRL-g.firstRL>2.4);
  assert.ok((s.highRL-s.lowRL)/s.count<.21);
  const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,length=Math.hypot(dx,dz),nx=-dz/length,nz=dx/length;
  const stairOutline=[{x:s.a.x+nx*s.width/2,z:s.a.z+nz*s.width/2},{x:s.b.x+nx*s.width/2,z:s.b.z+nz*s.width/2},{x:s.b.x-nx*s.width/2,z:s.b.z-nz*s.width/2},{x:s.a.x-nx*s.width/2,z:s.a.z-nz*s.width/2}];
  for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(polygon({points:stairOutline}),polygon(b)))<1e-6,`whole flight clears ${b.id}`);
  for(let i=0;i<=s.count;i++){
    const t=i/s.count,p={x:s.a.x+(s.b.x-s.a.x)*t,z:s.a.z+(s.b.z-s.a.z)*t};
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`stair width clears ${b.id}`);
  }
  for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(polygon({points:g.landing}),polygon(b)))<1e-6,`external gallery clears ${b.id}`);
  for(const p of g.landing)assert.ok(g.firstRL-.16-terrainHeight(p.x,p.z)>2.1,'ground passage remains open beneath terrace');
  assert.ok(area(clipping.intersection(circle(s.b,.5),polygon({points:g.landing})))>.2,'stair reaches the physical landing');
  for(const p of g.columns){
    assert.ok(area(clipping.difference(circle(p,p.radius),polygon({points:g.landing})))<1e-6,'column belongs beneath cover');
    assert.ok(Math.hypot(p.x-s.b.x,p.z-s.b.z)>p.radius+s.width/2);
  }
});

test('new lecture precinct arrivals clear all mapped buildings',()=>{
  for(const id of [civil.id,patricia.id,'patricia-foyer-stair']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);
    assert.ok(p.x<CAMPUS.bounds.maxX-.5&&p.x>CAMPUS.bounds.minX+.5&&p.z<CAMPUS.bounds.maxZ-.5&&p.z>CAMPUS.bounds.minZ+.5);
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`${id} arrival clears ${b.id}`);
  }
});

test('reconstructed slender forecourt trees clear building outlines and mapped paths',()=>{
  const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
  for(const p of civilGeometry(civil).trees){
    assert.equal(p.reconstructed,true);assert.ok(p.source.startsWith('https://www.google.com/maps/'));
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.5),polygon(b)))<1e-6);
    for(const path of CAMPUS.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(p,path.points[i],path.points[i+1])>(path.width||2.1)/2+.4,'tree trunk preserves mapped walking width');
  }
});
