import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS as RAW } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { buildingBase } from '../dist/terrain.js';
import { RESIDENTIAL_PARTS } from '../dist/residential-parts.js';
import { VILLAGE_ID,VILLAGE_FACADE,VILLAGE_SECURITY_EDGE,VILLAGE_SECURITY } from '../dist/village-data.js';
import { VILLAGE_FACADES,VILLAGE_ENTRY_PAVING } from '../dist/village-facades.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const length=r=>r.reduce((sum,p,i)=>{const q=r[(i+1)%r.length];return sum+Math.hypot(p[0]-q[0],p[1]-q[1]);},0);
const inRing=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const inside=(p,s)=>inRing(p,s.points)&&!(s.holes||[]).some(r=>inRing(p,r));
const parts=RESIDENTIAL_PARTS.filter(p=>p.parent===VILLAGE_ID).map(p=>({...p,base:buildingBase(p.points)}));

test('Village estimated maximum agrees with rendered masses without replacing source level evidence',()=>{
 const raw=RAW.buildings.find(b=>b.id===VILLAGE_ID),b=CAMPUS.buildings.find(b=>b.id===VILLAGE_ID);
 assert.equal(b.height,VILLAGE_FACADE.mainHeight);assert.equal(b.height,Math.max(...parts.map(p=>p.height)));
 assert.equal(b.previousEstimate,raw.height);assert.equal(b.heightSource,'estimated');assert.equal(b.levels,raw.levels);assert.equal(b.levels,7);assert.equal(b.architectMainFloors,8);
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);
});

test('exposed Village surfaces match the occupied horizontal perimeter at several heights',()=>{
 for(const rl of [31,36,43,50]){
  const occupied=parts.filter(p=>p.base+p.minHeight<rl&&p.base+p.height>rl),union=clipping.union(...occupied.map(poly));
  const expected=union.flat().reduce((sum,r)=>sum+length(r),0);
  const actual=VILLAGE_FACADES.filter(f=>f.base+f.bottom<rl&&f.base+f.top>rl).reduce((sum,f)=>sum+Math.hypot(f.b.x-f.a.x,f.b.z-f.a.z),0);
  assert.ok(Math.abs(expected-actual)<.0001,`RL ${rl}: exposed facade ${actual} must match ${expected}, with no phantom partition walls`);
 }
 for(const f of VILLAGE_FACADES){
  const p={x:(f.a.x+f.b.x)/2+f.normal.x*.01,z:(f.a.z+f.b.z)/2+f.normal.z*.01},y=f.base+(f.bottom+f.top)/2;
  assert.ok(!parts.some(q=>q.id!==f.part&&inside(p,q)&&q.base+q.minHeight<y-1e-6&&q.base+q.height>y+1e-6));
 }
});

test('Village separates timber low blocks from charcoal tall ends and preserves suspended core gaps',()=>{
 assert.ok(VILLAGE_FACADES.some(f=>f.kind==='screen'&&f.floors<8));assert.ok(VILLAGE_FACADES.some(f=>f.kind==='end'&&f.floors===8));assert.ok(VILLAGE_FACADES.some(f=>f.kind==='band'));
 assert.ok(VILLAGE_FACADES.filter(f=>f.kind==='core').every(f=>f.bottom>=5.8-1e-7));
 assert.ok(VILLAGE_FACADE.slatHeight<VILLAGE_FACADE.slatPitch&&VILLAGE_FACADE.screenDepth>.5);
});

test('security glazing stays on its source wall and arrival / paving remain outside occupied buildings',()=>{
 assert.equal(VILLAGE_FACADES.filter(f=>f.security).length,1);
 const face=VILLAGE_FACADES.find(f=>f.security);assert.ok(VILLAGE_SECURITY_EDGE.every(p=>[face.a,face.b].some(q=>Math.hypot(p.x-q.x,p.z-q.z)<1e-6)));
 assert.ok(!RAW.buildings.some(b=>!b.walkableUnder&&inside(VILLAGE_SECURITY.arrival,b)));
 for(const patch of VILLAGE_ENTRY_PAVING){assert.ok(patch.points.length>=3);for(const b of RAW.buildings.filter(b=>!b.walkableUnder)){const inter=clipping.intersection(poly(patch),poly(b));assert.equal(inter.length,0);}}
 const destination=CAMPUS.landmarks.find(p=>p.id==='village-security');assert.equal(destination.x,VILLAGE_SECURITY.arrival.x);
});
