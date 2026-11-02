import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {WARRANE_ID,WARRANE_GIS,warraneGeometry} from '../dist/warrane-data.js';
import {WARRANE_PARTS,WARRANE_FACES,WARRANE_ROOFS,WARRANE_COURT} from '../dist/warrane-parts.js';
import {terrainHeight} from '../dist/terrain.js';
const b=CAMPUS.buildings.find(b=>b.id===WARRANE_ID),raw=RAW.buildings.find(b=>b.id===WARRANE_ID),g=warraneGeometry();
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=p=>p.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const perimeter=p=>p.flat().reduce((s,r)=>s+r.reduce((n,p,i)=>{const q=r[(i+1)%r.length];return n+Math.hypot(q[0]-p[0],q[1]-p[1]);},0),0);
const disc=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*r,p.z+Math.sin(i/32*Math.PI*2)*r])];
const source=poly(raw),ground=clip.union(...WARRANE_PARTS.filter(p=>!p.minHeight).map(poly)),upper=WARRANE_PARTS.filter(p=>p.minHeight);

test('Warrane keeps mapped heights / outline separately from photo rows, residential uses and GIS fields',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,27);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,9);assert.equal(b.photoUpperRows,6);assert.equal(b.collegeResidentialFloors,5);assert.equal(WARRANE_GIS.heightField,29.08);assert.equal(WARRANE_GIS.floorCount,11);assert.deepEqual(b.reconstructedMapHoles,[g.court.points]);
 for(const id of [WARRANE_ID,'warrane-entrance','warrane-courtyard'])assert.ok(CAMPUS.landmarks.some(p=>p.id===id));
});
test('reconstructed Warrane volumes open the court without changing the source envelope',()=>{
 const combined=clip.union(ground,poly(g.court),clip.intersection(source,poly(g.entryHole)));assert.ok(area(clip.xor(source,combined))<1e-6);
 for(const p of WARRANE_PARTS){assert.ok(area(clip.difference(poly(p),source))<1e-6);assert.ok(area(clip.intersection(poly(p),poly(g.court)))<1e-6);}
 for(const p of WARRANE_ROOFS)assert.ok(area(clip.intersection(poly(p),poly(g.court)))<1e-6,'no full-footprint roof closes the courtyard');
 assert.ok(area(clip.union(...upper.map(poly)))<area([source])*.65,'the upper towers occupy only part of the footprint');assert.ok(upper.some(p=>p.kind==='north-wing')&&upper.some(p=>p.kind==='south-wing')&&upper.some(p=>p.kind==='stair-core'));
});
test('Warrane exposed facade spans match composite perimeters at every occupied level',()=>{
 for(const h of [1,6.6,20,26.5]){const occupied=WARRANE_PARTS.filter(p=>p.minHeight<h&&p.height>h),expected=perimeter(clip.union(...occupied.map(poly))),actual=WARRANE_FACES.filter(p=>p.bottom<h&&p.top>h).reduce((s,p)=>s+Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),0);assert.ok(Math.abs(expected-actual)<1e-4,`${h}: ${actual} / ${expected}`);}
});
test('Warrane outdoor stair has upward treads, reachable landing and clearance beneath the canopy / upper wing',()=>{
 const stair=g.stair;assert.ok((stair.h1-stair.h0)/stair.count<=.18);assert.ok(g.podium-g.floor>2.4);
 for(const t of g.stairTreads){const signed=t.points.reduce((s,p,i)=>{const q=t.points[(i+1)%t.points.length];return s+p.x*q.z-q.x*p.z;},0);assert.ok(signed>0,'actual rendered treads face upward');for(const p of t.points)assert.ok(terrainHeight(p.x,p.z)<t.rl+.03);}
 const run=Math.hypot(stair.b.x-stair.a.x,stair.b.z-stair.a.z),before=stair.h0+(stair.h1-stair.h0)*Math.floor((1-.34/run)*stair.count)/stair.count+.06;assert.ok(g.floorRL-before<.27,'landing can be reached before the player circle touches its edge');
 for(let i=0;i<=50;i++){const t=i/50,p={x:stair.a.x+(stair.b.x-stair.a.x)*t,z:stair.a.z+(stair.b.z-stair.a.z)*t};assert.ok(area(clip.intersection(disc(p,.34),ground))<1e-6,'stair stays clear of the ground rooms');}
});
test('Warrane court terrain, arrivals, planting and source footways remain usable',()=>{
 for(let u=-3;u<=9.3;u+=.6)for(let v=-22.5;v<.8;v+=.6){const p=g.at(u,v);assert.ok(g.floorRL>=terrainHeight(p.x,p.z)+.12);}
 for(const p of [g.arrival,g.entryArrival,g.courtArrival]){assert.ok(area(clip.intersection(disc(p,.34),ground))<1e-6);for(const other of RAW.buildings.filter(b=>b.id!==WARRANE_ID&&!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,.34),poly(other)))<1e-6);}
 for(const p of g.columns)assert.ok(Math.hypot(p.x-g.courtArrival.x,p.z-g.courtArrival.z)>.6);
 for(const id of ['osm-way-1099961657','osm-way-1099961658','osm-way-1233810724']){const path=RAW.paths.find(p=>p.id===id);assert.deepEqual(CAMPUS.paths.find(p=>p.id===id).points,path.points);for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i];for(let j=0;j<=30;j++){const p={x:a.x+(c.x-a.x)*j/30,z:a.z+(c.z-a.z)*j/30};assert.ok(area(clip.intersection(disc(p,path.width/2),ground))<1e-6);for(const tree of g.trees)assert.ok(Math.hypot(p.x-tree.x,p.z-tree.z)>path.width/2+tree.radius);}}}
});
