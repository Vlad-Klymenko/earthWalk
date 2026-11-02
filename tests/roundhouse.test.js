import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { ROUNDHOUSE_ID,roundhouseGeometry } from '../dist/roundhouse-data.js';
import { ROUNDHOUSE_MAIN,ROUNDHOUSE_UPPER,ROUNDHOUSE_GROUND,ROUNDHOUSE_ROOFS,ROUNDHOUSE_DECK,ROUNDHOUSE_PARAPET,ROUNDHOUSE_STEPS,ROUNDHOUSE_PAVING } from '../dist/roundhouse-parts.js';
import { terrainHeight } from '../dist/terrain.js';
import { framePoint } from '../dist/geometry.js';
const raw=SOURCE.buildings.find(b=>b.id===ROUNDHOUSE_ID),b=CAMPUS.buildings.find(b=>b.id===ROUNDHOUSE_ID),g=roundhouseGeometry(b);
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const shape=p=>poly(p.points,p.holes);
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:48},(_,i)=>({x:p.x+Math.cos(i*Math.PI/24)*r,z:p.z+Math.sin(i*Math.PI/24)*r})));

test('Roundhouse retains source perimeter, mapped maximum and level evidence independently of reconstructed components',()=>{
 assert.deepEqual(b.points,raw.points);assert.equal(b.points.length,31);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,10);assert.equal(b.levels,2);assert.equal(b.heightSource,'mapped');assert.match(b.heightNote,/not surveyed/);
 const before=JSON.stringify(raw);roundhouseGeometry(raw);assert.equal(JSON.stringify(raw),before);
 assert.ok(Math.abs(g.center.x+153.2463)<.001&&Math.abs(g.center.z+143.7896)<.001);
 assert.ok(ROUNDHOUSE_ROOFS.some(p=>p.kind==='annex'),'mapped eastern projection remains a distinct low volume');
});

test('Roundhouse ground and roof regions preserve the complete mapped footprint without overlap',()=>{
 for(const parts of [ROUNDHOUSE_GROUND,ROUNDHOUSE_ROOFS]){
  const union=clip.union(...parts.map(shape)),src=[shape(raw)];assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);
  for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++)assert.ok(area(clip.intersection([shape(parts[i])],[shape(parts[j])]))<1e-6);
 }
 const annex=ROUNDHOUSE_ROOFS.filter(p=>p.kind==='annex');assert.ok(area(annex.map(shape))>400);assert.ok(area(ROUNDHOUSE_MAIN.map(shape))>2900);
});

test('Roundhouse roof eave, shallow cone, small oculus and annex remain inside the retained maximum',()=>{
 assert.ok(g.deck<g.eave&&g.eave<g.roofInner&&g.roofInner<g.oculusBase&&g.oculusBase<b.height);assert.ok(g.oculusRadius<5);
 for(let k=0;k<96;k++){const a=k*Math.PI/48,r=g.radiusAt(a);assert.ok(Math.abs(g.roofHeight(g.at(a,r))-g.eave)<1e-7);assert.ok(Math.abs(g.roofHeight(g.at(a,g.oculusRadius))-g.roofInner)<1e-7);for(let j=0;j<=30;j++){const h=g.roofHeight(g.at(a,g.oculusRadius+(r-g.oculusRadius)*j/30));assert.ok(h>=g.eave-1e-8&&h<b.height);}}
 assert.ok(g.eave+.12<b.height);assert.ok(g.roofInner+.15<=g.oculusBase+1e-8);assert.equal(g.oculusBase+(b.height-g.oculusBase),10);
});

test('Roundhouse balcony has continuous standing space, headroom and clear openings at both stairs',()=>{
 const deck=clip.union(...ROUNDHOUSE_DECK.map(shape)),rails=clip.union(...ROUNDHOUSE_PARAPET.map(shape));
 for(let k=0;k<144;k++){const a=k*Math.PI/72,p=g.at(a,g.radiusAt(a)*.93);assert.ok(area(clip.difference([disc(p,.4)],deck))<1e-6);assert.ok(area(clip.intersection([disc(p,.4)],rails))<1e-6);}
 assert.ok(g.eave-.16-g.deck>2.1);
 for(const stair of g.stairs)for(let i=0;i<=20;i++){const p=framePoint(stair.frame,0,-2+i*.1);assert.ok(area(clip.intersection([disc(p,.4)],rails))<1e-6,'stair opening clears an avatar');for(const upper of ROUNDHOUSE_UPPER)assert.ok(area(clip.intersection([disc(p,.4)],[shape(upper)]))<1e-6);}
 for(const part of ROUNDHOUSE_GROUND.filter(p=>p.kind==='arcade'))for(const p of part.points)assert.ok(g.base+g.underside-terrainHeight(p.x,p.z)-.22>2.1);
});

test('Both Roundhouse staircases rise from retained terrain with reachable treads and landings clear of other buildings',()=>{
 for(const [index,stair]of g.stairs.entries()){
  const steps=ROUNDHOUSE_STEPS.filter(p=>p.stair===index);assert.equal(steps.length,stair.count);let previous=stair.lowRL;
  for(const step of steps){assert.ok(step.rl>previous&&step.rl-previous<=.171);previous=step.rl;for(const other of SOURCE.buildings.filter(b=>b.id!==ROUNDHOUSE_ID&&!b.walkableUnder))assert.ok(area(clip.intersection([shape(step)],[shape(other)]))<1e-6,`stair clears ${other.id}`);}
  assert.ok(Math.abs(previous-stair.highRL)<1e-8);assert.ok(Math.abs(stair.highRL-g.base-g.deck)<1e-8);assert.ok(Math.abs(stair.lowRL-terrainHeight(stair.bottom.x,stair.bottom.z)-.22)<1e-8);
  for(const other of SOURCE.buildings.filter(b=>b.id!==ROUNDHOUSE_ID&&!b.walkableUnder))assert.ok(area(clip.intersection([shape(stair.landing)],[shape(other)]))<1e-6);
  for(let k=0;k<=20;k++){const p=framePoint(stair.frame,0,stair.run*k/20);assert.ok(stair.width/2>.4);for(const part of ROUNDHOUSE_GROUND.filter(p=>p.kind!=='arcade'))assert.ok(area(clip.intersection([disc(p,.35)],[shape(part)]))<1e-6);}
 }
});

test('Roundhouse added paving avoids retained building footprints and source path mesh seams',()=>{
 for(const part of ROUNDHOUSE_PAVING){for(const other of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([shape(part)],[shape(other)]))<1e-6);
  for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){
   const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*(path.width||3)/2,nz=(c.x-a.x)/len*(path.width||3)/2,strip=poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}]);assert.ok(area(clip.intersection([shape(part)],[strip]))<1e-6,`paving clears ${path.id}`);
  }
 }
});

test('Roundhouse map arrivals stay outdoors and retain source path coordinates',()=>{
 for(const id of [ROUNDHOUSE_ID,'roundhouse-west','roundhouse-se-stairs','roundhouse-nw-stairs']){const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);for(const other of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([disc(p,.4)],[shape(other)]))<1e-6,`${id} clears ${other.id}`);}
 for(const path of SOURCE.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.center.x,p.z-g.center.z)<100)))assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id).points,path.points);
});
