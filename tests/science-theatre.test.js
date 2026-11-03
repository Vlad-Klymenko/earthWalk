import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {scienceTheatreGeometry,scienceTheatreFoundation,SCIENCE_THEATRE_HEIGHT} from '../dist/modernism-data.js';
import {scienceTheatreFacades,scienceTheatreCanopy} from '../dist/science-theatre-facade.js';
import {framePoint} from '../dist/geometry.js';
import {terrainHeight,buildingBase} from '../dist/terrain.js';
const b=CAMPUS.buildings.find(p=>p.id==='science-theatre'),raw=RAW.buildings.find(p=>p.id===b.id),g=scienceTheatreGeometry(b),faces=scienceTheatreFacades(b),poly=ps=>[ps.map(p=>[p.x,p.z])];
const inside=(p,ring)=>{let result=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++)if((ring[i].z>p.z)!==(ring[j].z>p.z)&&p.x<(ring[j].x-ring[i].x)*(p.z-ring[i].z)/(ring[j].z-ring[i].z)+ring[i].x)result=!result;return result;};

test('the selected university height is traceable to the retained snapshot while original map tags stay intact',()=>{
 const evidence=JSON.parse(fs.readFileSync(new URL('../sources/science-theatre-evidence.json',import.meta.url))),bytes=fs.readFileSync(new URL('../sources/unsw-gis-label-height-fields.json',import.meta.url)),snapshot=JSON.parse(bytes),record=snapshot.features.find(f=>f.attributes.egdb_ES_14==='F13');
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),evidence.gis.snapshotSha256);assert.deepEqual(record,evidence.gis.record);assert.equal(record.attributes.egdb_ES_26,11.73);assert.equal(record.attributes.egdb_ES_18,5);assert.equal(record.attributes.OBJECTID,9);
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,SCIENCE_THEATRE_HEIGHT.height);assert.equal(b.mappedHeight,15);assert.equal(b.levels,5);assert.equal(b.reportedLevels,5);assert.equal(b.heightSource,'reported');assert.match(evidence.gis.limitation,/fresh bounded F13 query was blocked/);assert.match(SCIENCE_THEATRE_HEIGHT.note,/not a roof-RL/);
});

test('the pergola faces the southern lawn and the separate eastern glazing has its own outdoor arrival',()=>{
 assert.ok(g.frame.v.z>.98);assert.ok(Math.abs(g.frame.v.x)<.17);const south=faces.find(f=>f.mode==='south'),east=faces.find(f=>f.mode==='east');assert.ok(south.nz>.98&&east.nx>.98);assert.equal(south.holes.length,3);assert.equal(east.holes.length,1);assert.equal(east.holes[0].id,'east-glazed-foyer');
 assert.ok(g.local(g.arrival).v>g.frame.length/2+10);assert.ok(g.local(g.eastArrival).u>g.frame.width/2+10);assert.equal(CAMPUS.landmarks.find(p=>p.id==='science-theatre').x,g.arrival.x);assert.equal(CAMPUS.landmarks.find(p=>p.id==='science-theatre-east-foyer').x,g.eastArrival.x);
 for(const p of [g.arrival,g.eastArrival,...g.trees])for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.equal(inside(p,room.points),false,room.id);
 assert.ok(Math.abs(Math.max(...b.points.map(g.roofHeight))-b.height)<1e-8);assert.ok(Math.min(...b.points.map(g.roofHeight))>9);assert.equal(scienceTheatreFoundation(b,terrainHeight),g.floor);
 for(let i=0;i<b.points.length;i++){const a=b.points[i],c=b.points[(i+1)%b.points.length];for(let j=0;j<=100;j++)assert.ok(g.floor>terrainHeight(a.x+(c.x-a.x)*j/100,a.z+(c.z-a.z)*j/100)+.20,'mid-edge terrain stays below the fitted sill');}
});

test('recessed openings form a complete non-overlapping partition of the original wall elevations',()=>{
 for(const f of faces){
  const bottom=buildingBase(b.points)-g.floor,whole=(f.roof(0)+f.roof(1)-2*bottom)/2*f.length,removed=f.holes.reduce((s,h)=>s+(h.right-h.left)*f.length*(h.top-h.bottom),0),walls=f.masonry.reduce((s,c)=>s+(c.right-c.left)*f.length*((c.topLeft+c.topRight)/2-c.bottom),0);
  assert.ok(Math.abs(whole-removed-walls)<1e-7);for(const h of f.holes){assert.ok(h.recess>0&&h.left>=0&&h.right<=1&&h.bottom<h.top);assert.ok(h.top<Math.min(f.roof(h.left),f.roof(h.right)));}
  for(let i=0;i<f.masonry.length;i++){const c=f.masonry[i],rectangle={points:[{x:c.left,z:c.bottom},{x:c.right,z:c.bottom},{x:c.right,z:Math.min(c.topLeft,c.topRight)},{x:c.left,z:Math.min(c.topLeft,c.topRight)}]};for(const h of f.holes){const opening={points:[{x:h.left,z:h.bottom},{x:h.right,z:h.bottom},{x:h.right,z:h.top},{x:h.left,z:h.top}]};assert.equal(clip.intersection(poly(rectangle.points),poly(opening.points)).length,0);}}
 }
});

test('the entrance paving uses exactly the visible triangles for walking and meets the level door sill',()=>{
 assert.ok(g.pavingMesh.triangles.length>300);for(const room of RAW.buildings)assert.equal(clip.intersection(poly(g.paving),poly(room.points)).length,0,room.id);
 for(const indices of g.pavingMesh.triangles){const p=indices.map(i=>g.pavingMesh.vertices[i]);assert.ok(p.every(p=>Number.isFinite(p.x+p.y+p.z)));for(const weights of [[1/3,1/3,1/3],[.2,.3,.5]]){const q={x:0,z:0,y:0};p.forEach((p,i)=>{for(const axis of ['x','y','z'])q[axis]+=p[axis]*weights[i];});assert.ok(Math.abs(g.pavingHeight(q)-q.y)<1e-8);assert.ok(q.y>terrainHeight(q.x,q.z)+.20);}}
 for(let u=-g.frame.width/2;u<g.frame.width/2;u+=.5)assert.ok(Math.abs(g.pavingHeight(framePoint(g.frame,u,g.frame.length/2))-g.floor)<1e-8);
});

test('canopy supports remain outside occupied rooms and preserve every original route width',()=>{
 const structure=scienceTheatreCanopy(g);assert.equal(structure.posts.length,10);for(const s of structure.posts){const q=framePoint(g.frame,s.u,s.v);for(const room of RAW.buildings)assert.equal(clip.intersection(poly(Array.from({length:16},(_,i)=>({x:q.x+Math.cos(i*Math.PI/8)*.21,z:q.z+Math.sin(i*Math.PI/8)*.21}))),poly(room.points)).length,0,room.id);for(const p of RAW.paths)for(let i=1;i<p.points.length;i++){const a=p.points[i-1],c=p.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((q.x-a.x)*dx+(q.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(q.x-a.x-dx*t,q.z-a.z-dz*t)>p.width/2+.21,p.id);}}
 for(const p of RAW.paths)assert.ok(CAMPUS.paths.some(c=>c.id===p.id&&c.width===p.width&&JSON.stringify(c.points)===JSON.stringify(p.points)),'retained route '+p.id);
 const door=framePoint(g.frame,g.frame.width*.14,g.frame.length/2+.4);for(const s of structure.posts){const p=framePoint(g.frame,s.u,s.v),dx=door.x-g.arrival.x,dz=door.z-g.arrival.z,t=Math.max(0,Math.min(1,((p.x-g.arrival.x)*dx+(p.z-g.arrival.z)*dz)/(dx*dx+dz*dz)));assert.ok(Math.hypot(p.x-g.arrival.x-dx*t,p.z-g.arrival.z-dz*t)>.61,'straight arrival to the door clears posts');}
});
