import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {BARKER_EAST_ID,BARKER_EAST_IDS,BARKER_EAST_TREE,barkerEastGeometry} from '../dist/barker-east-data.js';
import {BARKER_EAST_PAVING,BARKER_EAST_HEDGES} from '../dist/barker-east-parts.js';
import {terrainHeight} from '../dist/terrain.js';
import {priorityWalkingSurface,walkingDestination} from '../dist/walking-surfaces.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const area=m=>m.reduce((s,r)=>s+ra(r[0])-r.slice(1).reduce((s,h)=>s+ra(h),0),0);
const inside=(x,z,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>z)!==(r[j].z>z)&&x<(r[j].x-r[i].x)*(z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const ribbon=(a,c,w)=>{const dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz),nx=dz/l*w/2,nz=-dx/l*w/2;return [[[a.x+nx,a.z+nz],[c.x+nx,c.z+nz],[c.x-nx,c.z-nz],[a.x-nx,a.z-nz]]];};
const disc=(p,r=.35)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*r,p.z+Math.sin(i/32*Math.PI*2)*r])];
const g=barkerEastGeometry();
test('detached Barker wings retain source height / level evidence and separate compound GIS fields',()=>{
 for(const id of BARKER_EAST_IDS){const raw=RAW.buildings.find(b=>b.id===id),b=CAMPUS.buildings.find(b=>b.id===id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,9.6);assert.equal(b.heightSource,'estimated');assert.equal(b.levels,null);assert.equal(b.roofShape,'flat');assert.equal(b.reconstructedRoofShape,'hipped');assert.equal(b.photoUpperWindowRows,2);assert.equal(b.compoundGisFloorCount,6);assert.equal(b.compoundGisHeightField,19.54);assert.equal(b.campusRef,'N13');assert.match(b.heightNote,/not surveyed/);}
});
test('hipped tile roofs reach their retained estimated ridge and follow every actual eave edge',()=>{
 for(const id of BARKER_EAST_IDS){const g=barkerEastGeometry(RAW.buildings.find(b=>b.id===id));assert.ok(Math.abs(g.roofHeight({x:g.frame.x,z:g.frame.z})-9.6)<1e-8);for(let i=0;i<g.roofPoints.length;i++){const a=g.roofPoints[i],c=g.roofPoints[(i+1)%g.roofPoints.length];for(let k=0;k<=20;k++){const p={x:a.x+(c.x-a.x)*k/20,z:a.z+(c.z-a.z)*k/20};assert.ok(Math.abs(g.roofHeight(p)-g.eave)<1e-7);}}
 assert.ok(area(clip.difference(poly(RAW.buildings.find(b=>b.id===id)),poly({points:g.roofPoints})))<1e-6);
 for(let u=-g.frame.width/2;u<g.frame.width/2;u+=.25)for(let v=-g.frame.length/2;v<g.frame.length/2;v+=.25){const p=g.at(u,v),height=g.roofHeight(p);assert.ok(height>=g.eave&&height<=9.6);assert.ok(Math.abs(height-g.roofHeight({x:p.x+.001,z:p.z}))<.002);}
 }
});
test('steel stair and galleries retain source path widths and stay outside occupied mapped rooms',()=>{
 for(const p of [...g.treads,...g.galleries,...g.landings]){for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(poly(p),poly(b)))<1e-5);for(const path of RAW.paths)for(let i=1;i<path.points.length;i++)assert.ok(area(clip.intersection(poly(p),ribbon(path.points[i-1],path.points[i],path.width)))<1e-5);}
 for(const tread of g.treads)for(const p of tread.points)assert.ok(tread.height>terrainHeight(p.x,p.z)+.08,'steel treads stay above the retained DEM');
 assert.ok(g.stair.canopy-.1-g.stair.upper>2.2);
});
test('stair layer can climb every tread and descend without snapping ground walkers onto upper galleries',()=>{
 const patches=[...g.treads,...g.galleries,...g.landings].map(p=>({...p,priority:true,minimumY:p.height-.24,heightAt:()=>p.height}));let y=g.stair.floor;
 for(const p of g.treads){const q=p.points.reduce((s,p)=>({x:s.x+p.x/4,z:s.z+p.z/4}),{x:0,z:0}),height=priorityWalkingSurface(patches,q.x,q.z,y,inside);assert.ok(height>=p.height-1e-6&&height<=p.height+.16);assert.ok(Math.abs(height-y)<.24);y=height;}
 assert.ok(g.stair.upper-y<.24);y=g.stair.upper;for(const p of [...g.treads].reverse()){const q=p.points.reduce((s,p)=>({x:s.x+p.x/4,z:s.z+p.z/4}),{x:0,z:0}),height=priorityWalkingSurface(patches,q.x,q.z,y,inside);assert.ok(Math.abs(height-y)<.24);y=height;}
 const p=g.stair.arrival;assert.equal(priorityWalkingSurface(patches,p.x,p.z,terrainHeight(p.x,p.z),inside),undefined);assert.equal(priorityWalkingSurface(patches,p.x,p.z,g.stair.upper,inside),g.stair.upper);
});
test('clipped hedges and aprons triangulate, avoid occupied rooms and preserve every original source path',()=>{
 for(const p of [...BARKER_EAST_PAVING,...BARKER_EAST_HEDGES]){const all=[...p.points,...p.holes.flat()],ts=ShapeUtils.triangulateShape(p.points.map(p=>new Vector2(p.x,p.z)),p.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(ts.reduce((s,t)=>s+area([poly({points:t.map(i=>all[i])})]),0)-area([poly(p)]))<1e-6);
 for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(poly(p),poly(b)))<1e-5);for(const path of RAW.paths)for(let i=1;i<path.points.length;i++)assert.ok(area(clip.intersection(poly(p),ribbon(path.points[i-1],path.points[i],path.width)))<1e-5);
 }
 for(const p of BARKER_EAST_PAVING)for(const h of BARKER_EAST_HEDGES)assert.ok(area(clip.intersection(poly(p),poly(h)))<1e-6);
});
test('new map arrivals preserve the upper layer and the reconstructed gum clears source routes / buildings',()=>{
 for(const id of [...BARKER_EAST_IDS,'barker-east-stair','barker-east-gallery']){const l=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(l);for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(disc(l),poly(b)))<1e-5);}
 assert.equal(walkingDestination(CAMPUS.landmarks.find(p=>p.id==='barker-east-gallery')).walkFloor,g.stair.upper);
 for(const b of RAW.buildings)assert.ok(area(clip.intersection(disc(BARKER_EAST_TREE,.7),poly(b)))<1e-5);for(const path of RAW.paths)for(let i=1;i<path.points.length;i++)assert.ok(area(clip.intersection(disc(BARKER_EAST_TREE,.7),ribbon(path.points[i-1],path.points[i],path.width)))<1e-5);
 for(const p of RAW.paths.filter(p=>p.points.some(q=>q.x>105&&q.x<140&&q.z>170&&q.z<225)))assert.ok(CAMPUS.paths.some(q=>q.id===p.id&&q.width===p.width&&JSON.stringify(q.points)===JSON.stringify(p.points)));
});
