import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { QUADRANGLE_ID, quadrangleGeometry } from '../dist/quadrangle-data.js';
import { QUADRANGLE_PARTS } from '../dist/quadrangle-parts.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
const b=CAMPUS.buildings.find(p=>p.id===QUADRANGLE_ID),raw=SOURCE.buildings.find(p=>p.id===b.id),g=quadrangleGeometry(b);
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r=.35)=>poly(Array.from({length:32},(_,i)=>({x:p.x+Math.cos(i*Math.PI/16)*r,z:p.z+Math.sin(i*Math.PI/16)*r})));

test('Quadrangle tower estimate keeps its conflicting map height, levels and outline as evidence',()=>{
  assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.mappedHeight,15);assert.equal(b.levels,5);assert.equal(b.heightSource,'estimated');
  assert.equal(g.tower.height,27);assert.equal(b.height+g.base,g.maximumRL);assert.ok(b.height>30&&b.height<32);assert.ok(g.maximumRL>g.roofRL+11);
  assert.equal(g.tower.u,(g.local(b.points[11]).u+g.local(b.points[13]).u)/2);assert.ok(g.tower.u>19&&g.tower.u<27);assert.equal(buildingAppearance(b).facade,'quadrangle');
});

test('occupied wings and covered regions partition the exact retained Quadrangle footprint',()=>{
  const all=QUADRANGLE_PARTS.map(p=>poly(p.points,p.holes)),union=clipping.union(...all);
  assert.ok(area(clipping.difference(poly(raw.points),union))<1e-6);assert.ok(area(clipping.difference(union,poly(raw.points)))<1e-6);
  assert.ok(Math.abs(all.reduce((s,p)=>s+area([p]),0)-area(union))<1e-6);
  for(const kind of ['central','west-link','east-link','south-arcade','west-arcade','east-arcade','main'])assert.ok(QUADRANGLE_PARTS.some(p=>p.kind===kind));
});

test('central, western and College Road through-routes clear occupied wings and ground-floor columns',()=>{
  const occupied=QUADRANGLE_PARTS.filter(p=>p.kind==='main');
  for(const [a,c] of [[g.portalArrival,g.portalTarget],[g.westArrival,g.westTarget],[g.eastArrival,g.eastTarget]])for(let i=0;i<=80;i++){
    const t=i/80,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};
    for(const q of occupied)assert.ok(area(clipping.intersection(circle(p),poly(q.points,q.holes)))<1e-6,'through route clears occupied ground');
    // Also check individual edges: a zero-area clipping spur can block the
    // player despite contributing no measurable polygon intersection area.
    for(const q of occupied)for(const ring of [q.points,...q.holes])for(let j=0;j<ring.length;j++){
      const a=ring[j],c=ring[(j+1)%ring.length],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));
      assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>.35,'through route clears collision edges, including zero-area spurs');
    }
    for(const column of g.columns)assert.ok(Math.hypot(p.x-column.x,p.z-column.z)>.69,'columns keep the centre route open');
    for(const part of QUADRANGLE_PARTS.filter(p=>p.kind!=='main'))if(area(clipping.intersection(circle(p),poly(part.points,part.holes)))>1e-6)assert.ok((part.kind==='east-link'?g.eastBottom:g.ceilingRL)-terrainHeight(p.x,p.z)-.23>2.8,'clear headroom above sloping route');
  }
});

test('courtyard colonnades have usable headroom and the roof remains below the separate tower',()=>{
  for(const part of QUADRANGLE_PARTS.filter(p=>p.kind.includes('arcade'))){
    for(const p of part.points){assert.ok(g.ceilingRL-terrainHeight(p.x,p.z)-.23>2.6);assert.ok(g.roofAt(p)>g.clerestoryRL+1.5);assert.ok(g.roofAt(p)<=g.roofRL+.001);}
  }
  for(const column of g.columns)assert.ok(g.ceilingRL-terrainHeight(column.x,column.z)>2.9);
});

test('Basser canopy follows the actual mapped stair grade with clear standing and jumping room',()=>{
  const s=g.basser,route=SOURCE.paths.find(p=>p.id==='osm-way-588521806');
  for(let k=0;k<=80;k++){
    const u=s.startU+(s.endU-s.startU)*k/80,p=framePoint(g.frame,u,-41.2),edge=framePoint(g.frame,u,s.centreV+s.width/2);
    let floor=-Infinity;
    for(let i=0;i<route.points.length-1;i++){
      const a=route.points[i],c=route.points[i+1],u0=g.local(a).u,u1=g.local(c).u;if(u<u0||u>u1)continue;
      const t=(u-u0)/(u1-u0),h0=terrainHeight(a.x,a.z)+.17,h1=terrainHeight(c.x,c.z)+.17,count=Math.ceil(Math.abs(h1-h0)/.17);floor=h0+(h1-h0)*Math.floor(t*count)/count+.06;
    }
    assert.ok(Number.isFinite(floor));assert.ok(s.roofAt(edge)-floor>3.1);assert.ok(s.roofAt(p)-floor>3.6);
  }
  assert.equal(s.supports.length,10);assert.equal(s.leaves,4);
  for(const p of s.supports)for(const other of SOURCE.buildings)assert.ok(area(clipping.intersection(circle(p,.2),poly(other.points,other.holes)))<1e-6,`canopy support clears ${other.id}`);
});

test('Quadrangle and Basser destinations start on open ground outside occupied footprints',()=>{
  for(const id of [QUADRANGLE_ID,'quadrangle-central-passage','quadrangle-west-passage','quadrangle-college-road-link','basser-covered-steps']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);
    for(const other of SOURCE.buildings)assert.ok(area(clipping.intersection(circle(p,.4),poly(other.points,other.holes)))<1e-6,`${id} clears ${other.id}`);
  }
});
