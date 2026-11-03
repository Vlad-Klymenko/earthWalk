import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {WEBSTER_REPLACED_STEP_ID,WEBSTER_ID,WEBSTER_HEIGHT,WEBSTER_ENTRY as E,WEBSTER_FRAME,WEBSTER_SURFACES,WEBSTER_LOWER_FLIGHTS,WEBSTER_ISLANDS,WEBSTER_PIERS,WEBSTER_RECESS,WEBSTER_VIEWS,websterPoint,websterLocal,websterSurfaceRL,websterRect} from '../dist/webster-entry-data.js';
import {WEBSTER_FLOORS,WEBSTER_SOLIDS,WEBSTER_RECESS_PARTS,WEBSTER_GROUND,WEBSTER_REMOVED_TRIANGLES,WEBSTER_GROUND_EDGES,WEBSTER_MALL_REMNANTS} from '../dist/webster-entry-parts.js';
import {websterWalkingHeight} from '../dist/webster-entry-landscape.js';
import {MALL_PAVING_MESH,MALL_GREEN_MESH,MALL_PAVING,MALL_GREEN} from '../dist/mall-landscape-parts.js';
import {TERRAIN_GRID as GRID} from '../dist/terrain.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[Math.round(p.x*1e6)/1e6,Math.round(p.z*1e6)/1e6])),union=ps=>ps.length?clip.union(...ps.map(poly)):[],ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=ps=>ps.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0),ground=union(WEBSTER_GROUND),raw=RAW.buildings.find(b=>b.id===WEBSTER_ID),b=CAMPUS.buildings.find(b=>b.id===WEBSTER_ID);
test('reported G14 height and conflicting floor counts remain traceable alongside original map dimensions',()=>{
 const bytes=fs.readFileSync(new URL('../sources/unsw-gis-label-height-fields.json',import.meta.url)),evidence=JSON.parse(fs.readFileSync(new URL('../sources/webster-entry-evidence.json',import.meta.url))),snapshot=JSON.parse(bytes),records=snapshot.features.filter(f=>['G14','G15'].includes(f.attributes.egdb_ES_14));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),evidence.heightEvidence.sha256);assert.deepEqual(records,evidence.heightEvidence.records);assert.equal(records.find(p=>p.attributes.egdb_ES_14==='G14').attributes.egdb_ES_26,18.78);assert.equal(WEBSTER_HEIGHT.height,18.78);assert.equal(b.height,18.78);assert.equal(b.reportedLevels,5);assert.equal(b.levels,4);assert.equal(b.mappedHeight,16);assert.equal(b.heightSource,'reported');assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);
 for(const p of RAW.paths)assert.ok(CAMPUS.paths.some(q=>q.id===p.id&&q.width===p.width&&JSON.stringify(q.points)===JSON.stringify(p.points)));
});
test('the exterior portico is subtracted only from the lower occupied volume, retaining the full upper footprint',()=>{
 const original=poly(raw),solid=union(WEBSTER_SOLIDS),recess=union(WEBSTER_RECESS_PARTS);assert.ok(area(recess)>30&&area(recess)<90);assert.ok(area(clip.intersection(solid,recess))<1e-7);assert.ok(Math.abs(area(clip.union(solid,recess))-area([original]))<1e-4);assert.ok(area(clip.difference(recess,poly(WEBSTER_RECESS)))<1e-5);assert.ok(E.ceilingRL-E.mainRL>3);assert.ok(E.base+b.height>E.ceilingRL+8);
 for(const room of RAW.buildings.filter(p=>p.id!==WEBSTER_ID&&!p.walkableUnder))assert.ok(area(clip.intersection(ground,poly(room)))<1e-6,room.id);
});
test('visible tread triangles and walking use the same finite, monotonic surfaces',()=>{
 for(const part of WEBSTER_FLOORS){const all=[...part.points,...part.holes.flat()],triangles=ShapeUtils.triangulateShape(part.points.map(p=>new Vector2(p.x,p.z)),part.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(triangles.reduce((s,t)=>s+ringArea(t.map(i=>[all[i].x,all[i].z])),0)-area([poly(part)]))<1e-5);
  for(const triangle of triangles){const ps=triangle.map(i=>all[i]),centre={x:ps.reduce((s,p)=>s+p.x,0)/3,z:ps.reduce((s,p)=>s+p.z,0)/3},height=ps.reduce((s,p)=>s+websterSurfaceRL(part,p),0)/3;assert.ok(Number.isFinite(height));assert.ok(Math.abs(websterSurfaceRL(part,centre)-height)<1e-8);assert.ok(Math.abs(websterWalkingHeight(centre.x,centre.z)-height)<1e-7,part.id);}
 }
 for(const f of WEBSTER_LOWER_FLIGHTS){const v=(f.v0+f.v1)/2,heights=[];for(let i=0;i<f.count;i++){const p=websterPoint(f.u0+(f.u1-f.u0)*(i+.5)/f.count,v);heights.push(websterWalkingHeight(p.x,p.z));}assert.ok(heights.every(Number.isFinite));for(let i=1;i<heights.length;i++)assert.ok(heights[i]>heights[i-1]&&heights[i]-heights[i-1]<=.161);assert.ok(Math.abs(heights.at(-1)-E.middleRL)<1e-8);}
 const high=websterPoint((E.upperEnd+E.back)/2,20.7);assert.ok(Math.abs(websterWalkingHeight(high.x,high.z)-E.mainRL)<1e-8);assert.equal(websterWalkingHeight(0,0),undefined);
});
test('the exact bounded DEM cut and old Mall masks leave no underlying terrain or duplicate surface inside the entrance',()=>{
 assert.ok(WEBSTER_REMOVED_TRIANGLES.length>10);for(const [col,row,index] of WEBSTER_REMOVED_TRIANGLES){const a=[GRID.x0+col*GRID.dx,GRID.z0+row*GRID.dz],b=[a[0]+GRID.dx,a[1]],c=[a[0],a[1]+GRID.dz],d=[b[0],c[1]],triangle=[index?[b,d,c]:[a,b,c]],expected=clip.difference(triangle,ground),actual=WEBSTER_GROUND_EDGES.reduce((sum,p)=>sum+area(clip.intersection(poly(p),triangle)),0);assert.ok(Math.abs(area(expected)-actual)<1e-4);assert.ok(area(clip.intersection(triangle,ground))>1e-7);}
 for(const [key,parts] of Object.entries({pavingMesh:MALL_PAVING_MESH,greenMesh:MALL_GREEN_MESH,paving:MALL_PAVING,green:MALL_GREEN}))for(const [index,remaining] of Object.entries(WEBSTER_MALL_REMNANTS[key])){assert.ok(area(clip.intersection(union(remaining),ground))<1e-5);assert.ok(Math.abs(area(clip.difference(poly(parts[index]),ground))-area(union(remaining)))<1e-4);}
 const tiled=clip.union(union(WEBSTER_FLOORS),union(WEBSTER_ISLANDS));assert.ok(Math.abs(area(tiled)-area(ground))<1e-4);
});
test('the Mall through-route, mapped entrance spur and outdoor arrivals stay clear of occupied volumes and piers',()=>{
 const ribbon=(a,b,width)=>{const dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz),nx=-dz/l*width/2,nz=dx/l*width/2;return [[{x:a.x+nx,z:a.z+nz},{x:b.x+nx,z:b.z+nz},{x:b.x-nx,z:b.z-nz},{x:a.x-nx,z:a.z-nz}].map(p=>[p.x,p.z])];};
 const mall=RAW.paths.find(p=>p.id==='osm-way-183691277');for(let i=1;i<mall.points.length;i++)assert.ok(area(clip.intersection(ground,ribbon(mall.points[i-1],mall.points[i],mall.width)))<1e-6);
 const spur=RAW.paths.find(p=>p.id===WEBSTER_REPLACED_STEP_ID);assert.equal(spur.kind,'steps');assert.equal(spur.width,3);for(const pier of WEBSTER_PIERS){const footprint=poly({points:websterRect(pier.u-pier.depth/2,pier.u+pier.depth/2,pier.v-pier.width/2,pier.v+pier.width/2)});for(let i=1;i<spur.points.length;i++)assert.ok(area(clip.intersection(footprint,ribbon(spur.points[i-1],spur.points[i],spur.width)))<1e-6);}
 for(const island of WEBSTER_ISLANDS)for(let i=1;i<spur.points.length;i++)assert.ok(area(clip.intersection(poly(island),ribbon(spur.points[i-1],spur.points[i],spur.width)))<1e-6);
 for(const view of WEBSTER_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));for(const room of RAW.buildings.filter(p=>p.id!==WEBSTER_ID&&!p.walkableUnder))assert.ok(area(clip.intersection(poly({points:Array.from({length:16},(_,i)=>({x:view.x+Math.cos(i*Math.PI/8)*.4,z:view.z+Math.sin(i*Math.PI/8)*.4}))}),poly(room)))<1e-7);}
 const portico=WEBSTER_VIEWS.find(p=>p.walkFloor);assert.ok(Math.abs(websterWalkingHeight(portico.x,portico.z)-portico.walkFloor)<1e-8);assert.ok(websterLocal(portico).u<E.back);
});
