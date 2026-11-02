import {walkingSurfaceHeight} from '../dist/walking-surfaces.js';
import {pavilionDeckPatches} from '../dist/pavilion-walking.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {terrainHeight} from '../dist/terrain.js';
import {PAVILION_ID,PAVILION_GIS,pavilionGeometry} from '../dist/pavilion-data.js';
import {PAVILION_PARTS,PAVILION_FACES,PAVILION_BALCONY,PAVILION_LANDING,PAVILION_PAVING,PAVILION_APRON,PAVILION_SEATS,PAVILION_COLUMNS} from '../dist/pavilion-parts.js';
const raw=RAW.buildings.find(b=>b.id===PAVILION_ID),b=CAMPUS.buildings.find(b=>b.id===PAVILION_ID),g=pavilionGeometry();
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const perimeter=geometry=>geometry.flat().reduce((s,r)=>s+r.reduce((n,p,i)=>{const q=r[(i+1)%r.length];return n+Math.hypot(q[0]-p[0],q[1]-p[1]);},0),0);
const disc=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i/24*Math.PI*2)*r,p.z+Math.sin(i/24*Math.PI*2)*r])];
const source=poly(raw),upper=clip.union(...PAVILION_PARTS.filter(p=>p.minHeight).map(poly)),ground=clip.union(...PAVILION_PARTS.filter(p=>!p.minHeight).map(poly));

test('H8 retains its source envelope / height independently from university GIS fields and reconstruction',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,8);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,2);assert.equal(PAVILION_GIS.heightField,6.62);assert.equal(PAVILION_GIS.floorCount,3);assert.equal(g.maximum,b.height);assert.ok(g.roof<g.maximum);assert.ok(CAMPUS.landmarks.some(p=>p.id==='pavilion-entrance'));assert.ok(CAMPUS.landmarks.some(p=>p.id==='pavilion-balcony'));
});

test('pavilion room partitions and curved balcony preserve the actual outer source outline',()=>{
 const entry=poly({points:g.entryHole}),combined=clip.union(upper,...PAVILION_BALCONY.map(poly),clip.intersection(source,entry));assert.ok(area(clip.xor(combined,source))<1e-6);
 for(const p of PAVILION_PARTS)assert.ok(area(clip.difference(poly(p),source))<1e-6);
 for(const p of PAVILION_BALCONY)assert.ok(area(clip.intersection(poly(p),upper))<1e-6);
 assert.ok(area(clip.intersection(ground,[g.stairPoints.map(p=>[p.x,p.z])] ))<1e-6);
 for(const p of PAVILION_PAVING)assert.ok(area(clip.intersection(poly(p),ground))<1e-6);
 for(const p of PAVILION_APRON)for(const other of RAW.buildings.filter(b=>b.id!==PAVILION_ID&&!b.walkableUnder))assert.ok(area(clip.intersection(poly(p),poly(other)))<1e-6,'graded apron avoids adjacent occupied buildings');
});

test('exposed pavilion facade spans match the real occupied perimeters at both levels',()=>{
 for(const h of [1,3.5,6.5]){const occupied=PAVILION_PARTS.filter(p=>p.minHeight<h&&p.height>h),expected=perimeter(clip.union(...occupied.map(poly))),actual=PAVILION_FACES.filter(p=>p.bottom<h&&p.top>h).reduce((s,p)=>s+Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),0);assert.ok(Math.abs(expected-actual)<1e-4,`${h}: ${expected} vs ${actual}`);}
});

test('pavilion seats / support columns stay inside the open viewing strip with space below the balcony',()=>{
 assert.ok(PAVILION_SEATS.length>50);assert.ok(PAVILION_COLUMNS.length>5);assert.ok(g.floor-.18>2.2);
 const balcony=clip.union(...PAVILION_BALCONY.map(poly));
 for(const p of PAVILION_COLUMNS){assert.ok(area(clip.difference(disc(p,p.radius),balcony))<1e-6);assert.ok(p.roof<=g.maximum);}
 for(const p of PAVILION_SEATS){assert.ok(area(clip.difference(poly(p),source))<1e-6);assert.ok(area(clip.intersection(poly(p),ground))<1e-6);assert.ok(p.seat+.48<g.floor-.2);}
 const p=g.balconyView;assert.ok(area(clip.difference(disc(p,.34),balcony))<1e-6,'map arrival fits balcony');assert.ok(area(clip.intersection(disc(p,.34),upper))<1e-6);for(const column of PAVILION_COLUMNS)assert.ok(Math.hypot(p.x-column.x,p.z-column.z)>.34+column.radius);
});

test('pavilion entrance stair reaches its landing above DEM and keeps source footways / arrivals clear',()=>{
 const s=g.stair;for(const tread of g.stairTreads){const signed=tread.points.reduce((sum,p,i)=>{const q=tread.points[(i+1)%tread.points.length];return sum+p.x*q.z-q.x*p.z;},0)/2;assert.ok(signed>0,'actual rendered tread faces upward');}assert.ok((s.h1-s.h0)/s.count<=.18);assert.equal(s.h1,g.floorRL);
 const run=Math.hypot(s.b.x-s.a.x,s.b.z-s.a.z),edgeFloor=s.h0+(s.h1-s.h0)*Math.floor((1-.34/run)*s.count)/s.count+.075;assert.ok(edgeFloor>=s.h1-g.landingStepHeight,'landing is reachable before the player circle overlaps its leading edge');
 for(let i=0;i<=60;i++){const t=i/60,p={x:s.a.x+(s.b.x-s.a.x)*t,z:s.a.z+(s.b.z-s.a.z)*t},y=s.h0+(s.h1-s.h0)*Math.floor(t*s.count)/s.count+.075;assert.ok(terrainHeight(p.x,p.z)<y+.03);for(const part of PAVILION_PARTS)if(part.minHeight<y-g.base+2.0&&part.height>y-g.base+.2)assert.ok(area(clip.intersection(disc(p,.34),poly(part)))<1e-6,'stair standing clearance');}
 for(const p of PAVILION_LANDING)assert.ok(area(clip.intersection(poly(p),upper))<1e-6);
 for(const p of [g.arrival,g.entryView,g.approach]){assert.ok(area(clip.intersection(disc(p,.34),ground))<1e-6);for(const other of RAW.buildings.filter(b=>b.id!==PAVILION_ID&&!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,.34),poly(other)))<1e-6);}
 const path=RAW.paths.find(p=>p.id==='osm-way-1153730139');assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id).points,path.points);
 for(const p of PAVILION_COLUMNS)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>path.width/2+p.radius+.1);}
});


test('pavilion deck layer keeps the ground arcade walkable and supports explicit balcony map arrivals',()=>{
 const inside=(x,z,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>z)!==(r[j].z>z)&&x<(r[j].x-r[i].x)*(z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
 const layers=pavilionDeckPatches(g),p=g.balconyView,groundHeight=g.base+.025;
 assert.equal(walkingSurfaceHeight(groundHeight,layers,p.x,p.z,groundHeight,inside),groundHeight,'walking below a deck stays on ground');
 assert.equal(walkingSurfaceHeight(groundHeight,layers,p.x,p.z,groundHeight+1.1,inside),groundHeight,'a ground-level jump does not snap onto the upper deck');
 assert.equal(walkingSurfaceHeight(groundHeight,layers,p.x,p.z,g.floorRL,inside),g.floorRL+.02,'an upper-level player stays on the deck');
 assert.equal(CAMPUS.landmarks.find(p=>p.id==='pavilion-balcony').walkFloor,g.floorRL,'map destination explicitly requests the upper layer');
 const hole=disc(p,.8)[0].map(([x,z])=>({x,z})),masked={points:PAVILION_BALCONY[0].points,holes:[hole],heightAt:()=>g.floorRL+.02};
 assert.equal(walkingSurfaceHeight(groundHeight,[masked],p.x,p.z,g.floorRL,inside),groundHeight,'surface holes remain open');
});
