import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {SPIRAL_ID,SPIRAL_ROOM,SPIRAL_STAIRS,SPIRAL_TREADS,SPIRAL_LEVELS,SPIRAL_GRADES,spiralGeometry,spiralPoint} from '../dist/spiral-data.js';
import {SPIRAL_OPEN,SPIRAL_DECKS,SPIRAL_LANDINGS,SPIRAL_GROUND_CUTOUT,SPIRAL_COMBINED_CUTOUT,SPIRAL_REMOVED_TRIANGLES,SPIRAL_GROUND_EDGES} from '../dist/spiral-parts.js';
import {BASSER_GROUND_CUTOUT} from '../dist/basser-ground-parts.js';
import {terrainHeight as dem,TERRAIN_GRID as grid} from '../dist/terrain.js';
import {campusTerrainHeight as terrain} from '../dist/spiral-landscape.js';
import {priorityWalkingSurface,walkingDestination} from '../dist/walking-surfaces.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const raw=RAW.buildings.find(b=>b.id===SPIRAL_ID),b=CAMPUS.buildings.find(b=>b.id===SPIRAL_ID),g=spiralGeometry();
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const area=m=>m.reduce((s,r)=>s+ra(r[0])-r.slice(1).reduce((s,h)=>s+ra(h),0),0);
const inside=(x,z,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>z)!==(r[j].z>z)&&x<(r[j].x-r[i].x)*(z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const patches=[...SPIRAL_DECKS,...SPIRAL_LANDINGS].map(p=>({...p,minimumY:g.upper-.24,priority:true,heightAt:()=>g.upper})).concat(SPIRAL_TREADS.map(p=>({...p,minimumY:p.height-.24,priority:true,heightAt:()=>p.height})));
test('spiral identity and photo fitting retain all source footprint and height evidence',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,9.6);assert.equal(b.heightSource,'estimated');assert.equal(b.levels,null);assert.match(b.name,/Grad Shop/);assert.match(b.heightNote,/not surveyed/);
 assert.ok(area(clip.xor(poly(raw),clip.union(poly({points:SPIRAL_ROOM}),...SPIRAL_OPEN.map(poly))))<1e-6);
 for(const p of [...SPIRAL_DECKS,...SPIRAL_LANDINGS,...SPIRAL_TREADS])assert.ok(area(clip.difference(poly(p),poly(raw)))<1e-5);
 assert.equal(SPIRAL_LEVELS.roof,SPIRAL_LEVELS.base+9.6);
});
test('spiral decks and stair wedges triangulate without dropped or shifted vertices',()=>{
 for(const p of [...SPIRAL_DECKS,...SPIRAL_LANDINGS,...SPIRAL_TREADS]){const all=[...p.points,...(p.holes||[]).flat()],ts=ShapeUtils.triangulateShape(p.points.map(p=>new Vector2(p.x,p.z)),(p.holes||[]).map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(ts.reduce((s,t)=>s+area([poly({points:t.map(i=>all[i])})]),0)-area([poly(p)]))<1e-6);}
});
test('priority layer walks every curved tread upward and downward independently from mapped ground stairs',()=>{
 let y=g.floor;for(const p of SPIRAL_TREADS){const q=spiralPoint(p.angle,4.6),next=priorityWalkingSurface(patches,q.x,q.z,y,inside);assert.ok(Math.abs(next-p.height)<1e-7);assert.ok(Math.abs(next-y)<.16);y=next;}
 assert.ok(g.upper-y<.16);y=g.upper;for(const p of [...SPIRAL_TREADS].reverse()){const q=spiralPoint(p.angle,4.6),next=priorityWalkingSurface(patches,q.x,q.z,y,inside);assert.ok(Math.abs(next-p.height)<1e-7);assert.ok(Math.abs(next-y)<.16);y=next;}
 const q=g.upperArrival;assert.equal(priorityWalkingSurface(patches,q.x,q.z,g.floor,inside),undefined);assert.equal(priorityWalkingSurface(patches,q.x,q.z,g.upper,inside),g.upper);assert.ok(g.upper-.22-g.floor>3.2);
});
test('combined terrain stencil preserves Basser cut and tiles removed DEM triangles without overlap',()=>{
 const combined=clip.union(...SPIRAL_COMBINED_CUTOUT.map(poly)),basser=clip.union(...BASSER_GROUND_CUTOUT.map(poly)),spiral=clip.union(...SPIRAL_GROUND_CUTOUT.map(poly));assert.ok(area(clip.xor(combined,clip.union(basser,spiral)))<1e-5);
 const tris=SPIRAL_REMOVED_TRIANGLES.map(([col,row,i])=>{const a={x:grid.x0+col*grid.dx,z:grid.z0+row*grid.dz},b={x:a.x+grid.dx,z:a.z},c={x:a.x,z:a.z+grid.dz},d={x:b.x,z:c.z};return poly({points:i?[b,d,c]:[a,b,c]});});
 const expectedArea=tris.reduce((s,p)=>s+area(clip.difference(p,combined)),0),actual=SPIRAL_GROUND_EDGES.reduce((s,p)=>s+area([poly(p)]),0);assert.ok(Math.abs(expectedArea-actual)<1e-4);
 for(const p of SPIRAL_GROUND_EDGES)assert.ok(area(clip.intersection(poly(p),combined))<1e-6);
 for(let i=0;i<SPIRAL_GROUND_EDGES.length;i++)for(let j=i+1;j<SPIRAL_GROUND_EDGES.length;j++){const a=SPIRAL_GROUND_EDGES[i],b=SPIRAL_GROUND_EDGES[j];if(Math.max(...a.points.map(p=>p.x))<=Math.min(...b.points.map(p=>p.x))||Math.max(...b.points.map(p=>p.x))<=Math.min(...a.points.map(p=>p.x))||Math.max(...a.points.map(p=>p.z))<=Math.min(...b.points.map(p=>p.z))||Math.max(...b.points.map(p=>p.z))<=Math.min(...a.points.map(p=>p.z)))continue;// Snap only boolean-test inputs below a micron: nearly coincident grid edges otherwise confuse the clipping library.
 const snap=p=>poly(p).map(r=>r.map(v=>v.map(n=>Math.round(n*1e7)/1e7)));assert.ok(area(clip.intersection(snap(a),snap(b)))<1e-6);}
});
test('bounded lower floor retains original DEM outside the reconstruction and coherent approach endpoints',()=>{
 assert.equal(terrain(0,0),dem(0,0));assert.equal(terrain(500,-300),dem(500,-300));assert.ok(Math.abs(terrain(358.051,-106.981)+.22-g.floor)<1e-6);
 for(const grade of SPIRAL_GRADES.filter(p=>p.a)){for(const p of [grade.a,grade.c])assert.ok(Number.isFinite(grade.heightAt(p.x,p.z)));}
 const east=RAW.paths.find(p=>p.id==='osm-way-45559840');for(let i=0;i<100;i++){const t=i/100,p={x:east.points[1].x+(east.points[2].x-east.points[1].x)*t,z:east.points[1].z+(east.points[2].z-east.points[1].z)*t};assert.ok(terrain(p.x,p.z)>=g.floor-.23);}
});
test('stair map arrivals preserve selected vertical layers and columns clear complete source path widths',()=>{
 for(const id of [SPIRAL_ID,'morven-spiral-start','morven-spiral-gallery'])assert.ok(CAMPUS.landmarks.some(p=>p.id===id));const upper=CAMPUS.landmarks.find(p=>p.id==='morven-spiral-gallery');assert.equal(walkingDestination(upper).walkFloor,g.upper);assert.ok(!inside(g.start.x,g.start.z,SPIRAL_ROOM));
 for(const col of g.columns)for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((col.x-a.x)*dx+(col.z-a.z)*dz)/(dx*dx+dz*dz)));assert.ok(Math.hypot(col.x-a.x-dx*t,col.z-a.z-dz*t)>path.width/2+col.radius+.2);}
});
