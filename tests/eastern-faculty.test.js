import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { samuelsGeometry, goodsellGeometry } from '../dist/eastern-faculty-data.js';
import { heightDescription } from '../dist/building-heights.js';
import { terrainHeight } from '../dist/terrain.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=g=>g.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];

test('Samuels retains source dimensions and confines photo-led roof structures to the real outline',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-290473701'),g=samuelsGeometry(b);
  assert.equal(b.height,28);assert.equal(b.levels,7);assert.equal(heightDescription(b).label,'OSM height tag');
  const source=SOURCE.buildings.find(s=>s.id===b.id);assert.deepEqual(b.points,source.points);assert.deepEqual(b.tags,source.tags);
  assert.equal(g.glasshouse.reconstructed,true);assert.equal(g.plant.reconstructed,true);
  assert.ok(area([polygon(g.glasshouse)])>=400,'approximate growing enclosure is consistent with public area account');
  for(const p of [g.glasshouse,g.plant])assert.ok(area(clipping.difference(polygon(p),polygon(b)))<1e-6);
  assert.ok(area(clipping.intersection(polygon(g.glasshouse),polygon(g.plant)))<1e-6);
  assert.ok(g.bodyRoof<g.glasshouse.low);assert.ok(Math.abs(Math.max(...g.glasshouse.points.map(g.roofHeight))-28)<1e-6);
  assert.ok(Math.max(...g.glasshouse.points.map(g.roofHeight))-Math.min(...g.glasshouse.points.map(g.roofHeight))>1,'source-led roof is sloped');
  assert.ok(g.plant.top<b.height);
});

test('Goodsell canopy is attached to its source wall with grounded columns and standing clearance',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-45604203'),raw=SOURCE.buildings.find(s=>s.id===b.id),g=goodsellGeometry(b);
  assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,15);assert.equal(b.levels,6);
  assert.equal(heightDescription(b).label,'OSM height tag');
  assert.ok(area(clipping.intersection(polygon(g.canopy),polygon(b)))>.1,'entrance roof meets the retained building');
  assert.ok(g.canopy.roofRL<g.base+b.height);
  assert.equal(g.base,g.entryGround);assert.ok(g.base-g.minimumGround>4,'courtyard reference preserves the lower-ground difference');
  for(const p of g.supports){
    assert.ok(area(clipping.difference(circle(p,p.radius),polygon(g.canopy)))<1e-6,'whole column sits beneath canopy');
    assert.ok(g.canopy.bottomRL-terrainHeight(p.x,p.z)>2.4);
    for(const other of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,p.radius),polygon(other)))<1e-6);
  }
  for(const p of g.canopy.points)assert.ok(g.canopy.bottomRL-terrainHeight(p.x,p.z)>2.2,'sloping courtyard does not block the cover');
});

test('faculty arrivals fit the player and added trees remain outside mapped buildings',()=>{
  for(const id of ['osm-way-290473701','osm-way-45604203']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);
    assert.ok(p.x<CAMPUS.bounds.maxX-.5&&p.x>CAMPUS.bounds.minX+.5&&p.z<CAMPUS.bounds.maxZ-.5&&p.z>CAMPUS.bounds.minZ+.5);
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`${id} arrival clears ${b.id}`);
  }
  const g=samuelsGeometry(CAMPUS.buildings.find(b=>b.id==='osm-way-290473701'));
  const segmentDistance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
  for(const p of g.trees){
    assert.ok(p.reconstructed&&p.source.startsWith('https://www.google.com/maps/'));
    for(const path of CAMPUS.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(segmentDistance(p,path.points[i],path.points[i+1])>(path.width||2.1)/2+.4,'tree trunks keep mapped walking widths clear');
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.5),polygon(b)))<1e-6,`tree clears ${b.id}`);
  }
});
