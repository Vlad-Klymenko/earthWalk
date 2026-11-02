import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { WILLIS_ID, willisGeometry } from '../dist/engineering-lane-data.js';
import { WILLIS_LANE_COVER, WILLIS_LANE_PAVING, WILLIS_COVER_FRAME, WILLIS_ENTRY_CANOPY, WILLIS_ENTRY_PAVING } from '../dist/willis-parts.js';
import { terrainHeight } from '../dist/terrain.js';
import { framePoint } from '../dist/geometry.js';
const raw=SOURCE.buildings.find(b=>b.id===WILLIS_ID),b=CAMPUS.buildings.find(b=>b.id===WILLIS_ID),g=willisGeometry(b);
const poly=(p,holes=[])=>[p,...holes].map(r=>r.map(p=>[p.x,p.z]));
const shape=p=>poly(p.points,p.holes);
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:32},(_,i)=>({x:p.x+Math.cos(i*Math.PI/16)*r,z:p.z+Math.sin(i*Math.PI/16)*r})));
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};

test('Willis retains mapped massing and anchors its reconstructed entrance to the retained north approach',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,12);assert.equal(b.levels,3);assert.equal(b.heightSource,raw.heightSource);assert.match(b.heightNote,/not surveyed/);assert.equal(g.cover.previousClearance,3.8);
 const approach=SOURCE.paths.find(p=>p.id==='osm-way-45564021');assert.ok(Math.hypot(g.entry.x-approach.points[0].x,g.entry.z-approach.points[0].z)<1e-9);
 for(const path of SOURCE.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.frame.x,p.z-g.frame.z)<95)))assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id).points,path.points);
});

test('Willis pitched roof exactly partitions the source outline and stays within the mapped maximum',()=>{
 const roof=g.roofFaces.map(p=>poly(p)),src=[shape(raw)],union=clip.union(...roof);assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);assert.ok(area(clip.intersection(...roof))<1e-6);
 for(const face of g.roofFaces)for(const p of face){const h=g.roofHeight(p);assert.ok(h>=g.eave-1e-9&&h<=b.height);}
});

test('Willis raised canopy and its steel grid clear neighbouring occupied footprints with standing headroom',()=>{
 const cover=clip.union(...WILLIS_LANE_COVER.map(shape));
 for(const frame of WILLIS_COVER_FRAME)assert.ok(area(clip.difference([shape(frame)],cover))<1e-6);
 for(const parts of [WILLIS_LANE_COVER,WILLIS_COVER_FRAME,WILLIS_ENTRY_CANOPY,WILLIS_LANE_PAVING])for(const part of parts)for(const other of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([shape(part)],[shape(other)]))<1e-6,`cover clears ${other.id}`);
 for(let i=0;i<=26;i++)for(let j=0;j<=60;j++){
  const p=framePoint(g.frame,g.cover.u0+(g.cover.u1-g.cover.u0)*i/26,g.cover.v0+(g.cover.v1-g.cover.v0)*j/60);assert.ok(g.cover.bottomRL-terrainHeight(p.x,p.z)>2.1);assert.ok(g.cover.heightAt(p)>=g.cover.bottomRL&&g.cover.heightAt(p)<=g.cover.topRL+1e-8);
 }
 const a=framePoint(g.frame,-19.3,-42),c=framePoint(g.frame,-19.3,-8);assert.equal(g.cover.heightAt(a),g.cover.heightAt(c));assert.ok(g.cover.clearance>9,'photo-led high canopy replaces old low cover');
});

test('Willis northern hood and apron preserve entry headroom and avoid source path mesh seams',()=>{
 for(const part of WILLIS_ENTRY_CANOPY)for(const p of part.points)assert.ok(g.base+g.entryCanopy.bottom-terrainHeight(p.x,p.z)-.12>2.1);
 for(const part of WILLIS_ENTRY_PAVING){for(const other of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([shape(part)],[shape(other)]))<1e-6);
  for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){
   const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*(path.width||3)/2,nz=(c.x-a.x)/len*(path.width||3)/2,strip=poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}]);assert.ok(area(clip.intersection([shape(part)],[strip]))<1e-6,`apron clears ${path.id}`);
  }
 }
});

test('Willis forecourt planting and map arrivals leave occupied buildings and retained path widths clear',()=>{
 for(const p of [...g.trees,...g.shrubs,g.sign]){
  for(const other of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([disc(p,.6)],[shape(other)]))<1e-6);
  for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(p,path.points[i],path.points[i+1])>(path.width||3)/2+.6,`plant clears ${path.id}`);
 }
 for(const id of [WILLIS_ID,'willis-covered-lane','willis-workshops']){const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);for(const other of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([disc(p,.4)],[shape(other)]))<1e-6);}
});
