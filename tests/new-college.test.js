import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {NEW_COLLEGE_ID,NEW_COLLEGE_GIS,NEW_COLLEGE_SOURCE,newCollegeGeometry} from '../dist/new-college-data.js';
import {NEW_COLLEGE_PARTS,NEW_COLLEGE_FACES,NEW_COLLEGE_ROOFS,NEW_COLLEGE_COURT} from '../dist/new-college-parts.js';
import {terrainHeight} from '../dist/terrain.js';
import {walkingSurfaceHeight,walkingDestination} from '../dist/walking-surfaces.js';
const g=newCollegeGeometry(),b=CAMPUS.buildings.find(b=>b.id===NEW_COLLEGE_ID),raw=RAW.buildings.find(b=>b.id===NEW_COLLEGE_ID);
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=p=>p.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const perimeter=p=>p.flat().reduce((s,r)=>s+r.reduce((n,p,i)=>{const q=r[(i+1)%r.length];return n+Math.hypot(q[0]-p[0],q[1]-p[1]);},0),0);
const inside=(x,z,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>z)!==(r[j].z>z)&&x<(r[j].x-r[i].x)*(z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const disc=(p,r=.34)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*r,p.z+Math.sin(i/32*Math.PI*2)*r])];

test('New College preserves independent source envelope, height, floor tags and university fields',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,[]);assert.equal(b.height,15);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,5);assert.equal(NEW_COLLEGE_GIS.heightField,16.46);assert.equal(NEW_COLLEGE_GIS.floorCount,6);assert.deepEqual(NEW_COLLEGE_SOURCE.roomLevels,[1,2,3,4]);assert.equal(NEW_COLLEGE_SOURCE.bridgeLevel,3);assert.equal(b.reconstructedMapHoles.length,1);
 for(const id of [NEW_COLLEGE_ID,'new-college-entrance','new-college-courtyard','new-college-oval-front'])assert.ok(CAMPUS.landmarks.some(p=>p.id===id));
});
test('New College has a genuine covered courtyard void and no full-footprint upper room cap',()=>{
 const upper=NEW_COLLEGE_PARTS.filter(p=>p.kind==='rooms');assert.ok(area(clip.xor(poly(raw),clip.union(...upper.map(poly),...NEW_COLLEGE_COURT.map(poly))))<1e-6);
 for(const p of upper)assert.ok(area(clip.intersection(poly(p),poly(g.court)))<1e-6);
 for(const p of NEW_COLLEGE_ROOFS){assert.ok(area(clip.intersection(poly(p),poly(g.roofOpening)))<1e-6);for(const point of p.points){assert.ok(g.lowerRoof(point)>=g.body);assert.ok(g.lowerRoof(point)<g.maximum);}}
 for(const u of [-12.6,-2.2,0,2.2,12.6])assert.ok(g.canopyHeight(g.at(u,0))<=15&&g.canopyHeight(g.at(u,0))>=14.19);
 for(const h of [1,4,10,13.4]){const occupied=NEW_COLLEGE_PARTS.filter(p=>p.minHeight<h&&p.height>h),expected=perimeter(clip.union(...occupied.map(poly))),actual=NEW_COLLEGE_FACES.filter(p=>p.bottom<h&&p.top>h).reduce((s,p)=>s+Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),0);assert.ok(Math.abs(expected-actual)<1e-4,`${h}: ${actual} / ${expected}`);}
});
test('first-floor courtyard walking stays at the raised floor and never pulls ground walkers through rooms',()=>{
 const patches=NEW_COLLEGE_COURT.map(p=>({...p,minimumY:g.floorRL-.4,heightAt:()=>g.floorRL+.015})),p=g.courtArrival,dem=terrainHeight(p.x,p.z)+.22;
 assert.equal(walkingSurfaceHeight(dem,patches,p.x,p.z,g.floorRL,inside),g.floorRL+.015);assert.equal(walkingSurfaceHeight(dem,patches,p.x,p.z,dem,inside),dem);
 assert.ok(g.bridge.floor-g.floor>4.5,'walking passes below the third-floor bridge');assert.ok(g.body-(g.floor+3*g.level)>2);
 for(const part of NEW_COLLEGE_PARTS.filter(p=>p.kind==='rooms'))assert.ok(area(clip.intersection(disc(p),poly(part)))<1e-6);
 for(const p of [g.pavilion,g.bridge,g.deck])assert.ok(area(clip.difference(poly(p),poly(g.court)))<1e-6);
});
test('entrance retains headroom and clear viewpoints while stopping at closed doors',()=>{
 assert.ok(g.floor-g.entryFloor>2.4);assert.ok(Math.abs(g.stair.h1-g.stair.h0-.75)<1e-8);assert.equal(g.stairTreads.length,5);
 const ground=clip.union(...NEW_COLLEGE_PARTS.filter(p=>p.minHeight===0).map(poly));for(const p of [g.arrival,g.entryArrival,g.eastArrival]){assert.ok(area(clip.intersection(disc(p),ground))<1e-6);for(const other of RAW.buildings.filter(b=>b.id!==NEW_COLLEGE_ID&&!b.walkableUnder))assert.ok(area(clip.intersection(disc(p),poly(other)))<1e-6);}
 for(const t of g.stairTreads)assert.ok(area(clip.intersection(poly(t),ground))<1e-6);assert.ok(g.entryFloor+2.35<g.floor);
});
test('New College entrance and planting preserve full mapped street and footway widths',()=>{
 const protectedIds=['osm-way-1099961657','osm-way-589601109','osm-way-857730312','osm-way-407606340'];
 for(const id of protectedIds){const path=RAW.paths.find(p=>p.id===id);assert.deepEqual(CAMPUS.paths.find(p=>p.id===id).points,path.points);for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i],dx=c.x-a.x,dz=c.z-a.z;for(const p of g.trees){const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>path.width/2+p.radius,`${id} tree ${p.v}`);}}}
 const foot=RAW.paths.find(p=>p.id==='osm-way-1099961657'),a=foot.points[1],c=foot.points[2],dx=c.x-a.x,dz=c.z-a.z;for(const p of g.stairTreads.flatMap(p=>p.points)){const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>foot.width/2,'no tread lies in the source public footway');}
 for(const p of g.trees)assert.ok(area(clip.intersection(disc(p,p.radius),poly(raw)))<1e-6);
});

test('cached New College arrivals retain the requested first-floor walking layer',()=>{
 const landmark=CAMPUS.landmarks.find(p=>p.id==='new-college-courtyard'),xz={x:landmark.x,z:landmark.z},cached={...landmark,walkPoint:xz};
 for(const target of [walkingDestination(landmark,xz),walkingDestination(cached)]){assert.equal(target.walkFloor,g.floorRL+.015);assert.equal(target.x,landmark.x);assert.equal(target.z,landmark.z);const p=NEW_COLLEGE_COURT[0];assert.equal(walkingSurfaceHeight(terrainHeight(target.x,target.z),[{...p,minimumY:g.floorRL-.4,heightAt:()=>g.floorRL+.015}],target.x,target.z,target.walkFloor,inside),g.floorRL+.015);}
 assert.equal(walkingDestination({x:0,z:0}).walkFloor,undefined,'ground arrivals keep their terrain default');
});
