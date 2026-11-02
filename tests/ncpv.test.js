import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {heightDescription} from '../dist/building-heights.js';
import {terrainHeight} from '../dist/terrain.js';
import {NCPV_ID,NCPV_RED_ID,NCPV_CORNER_ID,NCPV_SOURCE_IDS,NCPV_HEIGHT,NCPV_GIS,ncpvGeometry} from '../dist/ncpv-data.js';
import {NCPV_PARTS,NCPV_FACES,NCPV_COURTS,NCPV_PAVING} from '../dist/ncpv-parts.js';
import {UNSW_GIS_LABEL_EVIDENCE} from '../dist/unsw-gis-evidence.js';
import {framePoint} from '../dist/geometry.js';
const g=ncpvGeometry(),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const perimeter=geometry=>geometry.flat().reduce((s,r)=>s+r.reduce((n,p,i)=>{const q=r[(i+1)%r.length];return n+Math.hypot(q[0]-p[0],q[1]-p[1]);},0),0);
const disc=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i/24*Math.PI*2)*r,p.z+Math.sin(i/24*Math.PI*2)*r])];

test('H3 uses the reported approximate council height while preserving all conflicting source fields',()=>{
 const b=CAMPUS.buildings.find(b=>b.id===NCPV_ID);assert.equal(b.height,21.6);assert.equal(b.height,NCPV_HEIGHT.height);assert.equal(NCPV_HEIGHT.approximate,true);assert.equal(b.heightSource,'reported');assert.equal(b.previousEstimate,25.6);assert.equal(b.levels,8);assert.equal(b.collegeFloors,7);assert.equal(NCPV_GIS.heightField,20.3);assert.equal(NCPV_GIS.floorCount,9);assert.equal(heightDescription(b).label,'Randwick Council approximate context height');
 for(const id of NCPV_SOURCE_IDS){const before=RAW.buildings.find(b=>b.id===id),after=CAMPUS.buildings.find(b=>b.id===id);assert.deepEqual(after.points,before.points);assert.deepEqual(after.tags,before.tags);assert.equal(after.levels,before.levels);if(id!==NCPV_ID)assert.equal(after.modelledWith,NCPV_ID);}
 assert.equal(UNSW_GIS_LABEL_EVIDENCE.length,78);assert.ok(UNSW_GIS_LABEL_EVIDENCE.some(p=>p.heightField===0));
});

test('three retained outlines form the actual composite quadrangle without filling the internal court',()=>{
 const source=clip.union(...NCPV_SOURCE_IDS.map(id=>poly(RAW.buildings.find(b=>b.id===id)))),actual=clip.union(...NCPV_PARTS.map(poly));assert.ok(area(clip.xor(source,actual))<1e-6);assert.equal(NCPV_COURTS.length,1);assert.ok(area([poly(NCPV_COURTS[0])])>450);
 assert.ok(area(clip.intersection(actual,poly(NCPV_COURTS[0])))<1e-6);assert.ok(area(clip.difference([g.courtLawn.map(p=>[p.x,p.z])],poly(NCPV_COURTS[0])))<1e-6);
 for(const patch of NCPV_PAVING)assert.ok(area(clip.intersection(poly(patch),actual))<1e-6);
});

test('NCPV exposed facade spans match occupied perimeters at each reconstructed mass level',()=>{
 for(const h of [2,5,12,20]){const occupied=NCPV_PARTS.filter(p=>p.minHeight<h&&p.height>h),expected=perimeter(clip.union(...occupied.map(poly))),actual=NCPV_FACES.filter(p=>p.bottom<h&&p.top>h).reduce((s,p)=>s+Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),0);assert.ok(Math.abs(expected-actual)<1e-4,`${h}: ${expected} vs ${actual}`);}
 const red=NCPV_PARTS.find(p=>p.sourceId===NCPV_RED_ID&&p.kind==='red'),blue=NCPV_PARTS.find(p=>p.sourceId===NCPV_CORNER_ID);
 assert.equal(red.height,9.6);assert.equal(red.minHeight,3.1);assert.ok(red.points.every(p=>g.local(p).v<-11));assert.equal(blue.height,g.bodyHeight);assert.ok(g.screen.top<=NCPV_HEIGHT.height);assert.ok(g.bodyHeight+.65<=NCPV_HEIGHT.height+1e-8);
});

test('outdoor court and street viewpoints remain outside occupied components and other campus buildings',()=>{
 for(const p of [g.arrival,g.northView,g.southView,g.courtView]){for(const part of NCPV_PARTS.filter(p=>!p.minHeight))assert.ok(area(clip.intersection(disc(p,.4),poly(part)))<1e-6);for(const b of RAW.buildings.filter(b=>!NCPV_SOURCE_IDS.includes(b.id)&&!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,.4),poly(b)))<1e-6);}
 for(const p of g.courtLawn)assert.ok(terrainHeight(p.x,p.z)<=g.courtFloor+.03,'lawn must stand above the retained coarse terrain');
 assert.ok(CAMPUS.landmarks.some(p=>p.id==='ncpv-north-red'));assert.ok(CAMPUS.landmarks.some(p=>p.id==='ncpv-courtyard'));
});

test('H3 street trees, hedge and glass-frame posts preserve source footway and road widths',()=>{
 const props=[...g.trees,...g.hedges,...[g.screen.v0,g.screen.v1].map(v=>({...framePoint(g.frame,g.screen.u,v),radius:.11}))];
 for(const p of props){for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,p.radius),poly(b)))<1e-6,`prop clears ${b.id}`);
  for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>=(path.width||2.1)/2+p.radius+.1,`${path.id} fits full width`);}
 }
});
