import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { RUPERT_ID, rupertGeometry } from '../dist/rupert-data.js';
import { RUPERT_PARTS, RUPERT_LAWN } from '../dist/rupert-parts.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
import { buildingAppearance } from '../dist/visual-data.js';
const b=CAMPUS.buildings.find(b=>b.id===RUPERT_ID),g=rupertGeometry(b);
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const n=r[(i+1)%r.length];return s+p[0]*n[1]-n[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];
const corridorPart=p=>p.kind.endsWith('bridge');

test('Rupert Myers reconstruction partitions the retained courtyard building and preserves mapped dimensions',()=>{
  const raw=SOURCE.buildings.find(s=>s.id===RUPERT_ID);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,20);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,5);assert.equal(buildingAppearance(b).source,'rupert-architect');
  const union=clipping.union(...RUPERT_PARTS.map(polygon));assert.ok(area(clipping.xor(union,polygon(b)))<1e-6);
  for(let i=0;i<RUPERT_PARTS.length;i++)for(let j=i+1;j<RUPERT_PARTS.length;j++)assert.ok(area(clipping.intersection(polygon(RUPERT_PARTS[i]),polygon(RUPERT_PARTS[j])))<1e-6);
  assert.ok(g.northTop<b.height);assert.ok(g.whiteBoxTop<g.northUpper);assert.ok(g.northUpper<g.northTop);
});

test('Southern Drive and its mapped northern footway remain clear beneath raised Rupert Myers floors',()=>{
  const routeIds=['osm-way-45489345','osm-way-1098977022','osm-way-1098977024'];
  const blockers=RUPERT_PARTS.filter(p=>!corridorPart(p)),raised=RUPERT_PARTS.filter(corridorPart);
  assert.equal(raised.length,2);
  for(const path of CAMPUS.paths.filter(p=>routeIds.includes(p.id))){
    let crossed=false;
    for(let i=0;i<path.points.length-1;i++){
      const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),count=Math.ceil(len/.5);
      for(let k=0;k<=count;k++){
        const p={x:a.x+(c.x-a.x)*k/count,z:a.z+(c.z-a.z)*k/count},q=g.local(p);
        if(q.u< -25||q.u>32||q.v<g.corridor.minV||q.v>g.corridor.maxV)continue;
        for(const block of blockers)assert.ok(area(clipping.intersection(circle(p,.4),polygon(block)))<1e-6,`${path.id} clears ${block.kind}`);
        for(const upper of raised)if(area(clipping.intersection(circle(p,.4),polygon(upper)))>0){
          crossed=true;const bottom=upper.kind==='west-bridge'?g.corridor.westBottom:g.corridor.eastBottom;
          assert.ok(g.base+bottom-terrainHeight(p.x,p.z)>2.1,'raised floor keeps standing clearance');
        }
        for(const column of g.columns)assert.ok(Math.hypot(p.x-column.x,p.z-column.z)>column.radius+.4,'columns preserve the mapped route');
      }
    }
    assert.equal(crossed,true,`${path.id} is tested where it crosses the footprint`);
  }
});

test('Rupert Myers arrivals, lawn and tree trunks fit the actual courtyard and mapped paths',()=>{
  for(const id of [RUPERT_ID,'rupert-courtyard']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);
    for(const other of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.5),polygon(other)))<1e-6,`${id} clears ${other.id}`);
  }
  const hole=[b.holes[0].map(p=>[p.x,p.z])];
  for(const points of RUPERT_LAWN)assert.ok(area(clipping.difference(polygon({points}),hole))<1e-6);
  for(const t of g.trees){
    assert.equal(t.reconstructed,true);assert.ok(area(clipping.difference(circle(t,.5),hole))<1e-6);
    for(const path of CAMPUS.paths)for(let i=0;i<path.points.length-1;i++){
      const a=path.points[i],c=path.points[i+1],dx=c.x-a.x,dz=c.z-a.z,q=Math.max(0,Math.min(1,((t.x-a.x)*dx+(t.z-a.z)*dz)/(dx*dx+dz*dz||1)));
      assert.ok(Math.hypot(t.x-a.x-dx*q,t.z-a.z-dz*q)>(path.width||2.1)/2+.4,'tree trunk preserves source path width');
    }
  }
});
