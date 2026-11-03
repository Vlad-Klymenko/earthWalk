import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {BOURKE_POOL as P,BOURKE_PORTRAIT,BOURKE_STONES,BOURKE_DISH,BOURKE_VIEW,bourkePoint} from '../dist/morven-fountain-data.js';
import {bourkeStoneGeometry} from '../dist/morven-fountain-geometry.js';
import {MORVEN_ID,morvenGeometry} from '../dist/morven-brown-data.js';
import {terrainHeight} from '../dist/terrain.js';
const poly=(r,h=[])=>[r,...h].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
test('Bourke portrait uses the university dimensions independently of reconstructed fountain stones',()=>{
 assert.equal(BOURKE_PORTRAIT.height,.30);assert.equal(BOURKE_PORTRAIT.width,.24);assert.equal(BOURKE_PORTRAIT.depth,.04);assert.equal(BOURKE_PORTRAIT.date,1967);assert.equal(BOURKE_PORTRAIT.commissioned,1966);
 assert.ok(BOURKE_STONES[0].height>BOURKE_PORTRAIT.height*5);assert.ok(BOURKE_STONES.every(s=>s.reconstructed));
 const raw=RAW.buildings.find(b=>b.id===MORVEN_ID),b=CAMPUS.buildings.find(b=>b.id===MORVEN_ID);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,18);
});
test('irregular basin remains inside its coping, clears terrain, and keeps original courtyard routes',()=>{
 assert.ok(area(clip.difference([poly(P.points)],[poly(P.rim)]))<1e-8);assert.ok(area([poly(P.points)])>13);assert.ok(area([poly(P.points)])<20);
 for(const p of P.rim)assert.ok(P.waterRL>terrainHeight(p.x,p.z)+.04);assert.ok(P.bottomRL<P.waterRL&&P.waterRL<P.rimRL);
 const g=morvenGeometry(RAW.buildings.find(b=>b.id===MORVEN_ID));assert.deepEqual(bourkePoint(0,0),{x:g.frame.x+g.frame.u.x*g.pool.u+g.frame.v.x*g.pool.v,z:g.frame.z+g.frame.u.z*g.pool.u+g.frame.v.z*g.pool.v});
 for(const route of g.routes)for(const p of route.points)assert.ok(Math.hypot(p.x-bourkePoint(0,0).x,p.z-bourkePoint(0,0).z)>7);
 assert.ok(BOURKE_DISH.lipRL>P.waterRL+.2);assert.ok(BOURKE_DISH.backRL>BOURKE_DISH.lipRL);
});
test('fountain stones have finite outward geometry and a reproducible full height',()=>{
 for(const stone of BOURKE_STONES){const a=bourkeStoneGeometry(stone),b=bourkeStoneGeometry(stone);assert.deepEqual(a.attributes.position.array,b.attributes.position.array);assert.ok(a.attributes.position.count>500);
 assert.ok([...a.attributes.position.array,...a.attributes.normal.array].every(Number.isFinite));assert.ok(Math.abs(a.boundingBox.max.y-stone.height)<1e-6);assert.equal(a.boundingBox.min.y,0);
 const pos=a.attributes.position,n=a.attributes.normal;let outward=0;for(let i=0;i<pos.count;i++)if(n.getX(i)*(pos.getX(i)-stone.lean*pos.getY(i)/stone.height)+n.getZ(i)*pos.getZ(i)>0)outward++;assert.ok(outward/pos.count>.7);
 a.dispose();b.dispose();}
});
test('Bourke map viewpoint clears the basin and all occupied source buildings',()=>{
 assert.ok(CAMPUS.landmarks.some(p=>p.id===BOURKE_VIEW.id));assert.ok(Math.hypot(BOURKE_VIEW.x-bourkePoint(0,0).x,BOURKE_VIEW.z-bourkePoint(0,0).z)>4);
 const disc=Array.from({length:24},(_,i)=>({x:BOURKE_VIEW.x+Math.cos(i*Math.PI/12)*.45,z:BOURKE_VIEW.z+Math.sin(i*Math.PI/12)*.45}));
 assert.ok(area(clip.intersection([poly(disc)],[poly(P.rim)]))<1e-8);for(const b of RAW.buildings)assert.ok(area(clip.intersection([poly(disc)],[poly(b.points,b.holes)]))<1e-8,b.id);
});
