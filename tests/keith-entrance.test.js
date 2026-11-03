import test from 'node:test';
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {KEITH_ID} from '../dist/physics-precinct-data.js';
import {keithEntranceGeometry,keithEntrancePaving,KEITH_ENTRY_VIEW,KEITH_BRICK} from '../dist/keith-entrance-data.js';
import {terrainHeight} from '../dist/terrain.js';
const raw=RAW.buildings.find(b=>b.id===KEITH_ID),b=CAMPUS.buildings.find(b=>b.id===KEITH_ID),g=keithEntranceGeometry(b),poly=ps=>[ps.map(p=>[p.x,p.z])],area=ps=>Math.abs(ps.reduce((s,p,i)=>{const q=ps[(i+1)%ps.length];return s+p.x*q.z-q.x*p.z;},0))/2;
const inside=(p,ps)=>{let c=false;for(let i=0,j=ps.length-1;i<ps.length;j=i++)if((ps[i].z>p.z)!==(ps[j].z>p.z)&&p.x<(ps[j].x-ps[i].x)*(p.z-ps[i].z)/(ps[j].z-ps[i].z)+ps[i].x)c=!c;return c;};
test('source footprint and original tags remain separate from the selected reported height and estimated section',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.points.length,11);assert.equal(b.height,11.18);assert.equal(b.mappedHeight,8);assert.equal(b.levels,1);assert.equal(b.reportedLevels,3);assert.equal(b.heightSource,'reported');assert.equal(g.overhang,4.8);assert.match(b.heightNote,/Previous 3.8 m/);assert.match(b.heightNote,/reconstructed/);assert.equal(g.upper.flatMap(f=>f.holes).length,0);assert.equal(g.lowerPoints.length,11);assert.ok(g.lowerPoints.every(p=>Number.isFinite(p.x+p.z)));assert.ok(area(g.lowerPoints)>100);
});
test('solid brick faces and actual lower openings form a complete disjoint partition',()=>{
 for(const f of [...g.lower,...g.upper]){
  const whole=f.upper?b.height-g.overhang:g.overhang,solid=f.masonry.reduce((s,c)=>s+(c.right-c.left)*(c.top-c.bottom),0),holes=f.holes.reduce((s,h)=>s+(h.right-h.left)*(h.top-h.bottom),0);assert.ok(Math.abs(solid+holes-whole)<1e-9);
  for(const c of f.masonry)for(const h of f.holes)assert.ok(Math.min(c.right,h.right)-Math.max(c.left,h.left)<1e-9||Math.min(c.top,h.top)-Math.max(c.bottom,h.bottom)<1e-9);
  for(const h of f.holes){assert.ok(h.left>=0&&h.right<=1&&h.bottom<h.top&&h.top<g.overhang);const p=f.point((h.left+h.right)/2,h.bottom,-h.recess);assert.equal(inside({x:p[0],z:p[2]},g.lower.map(f=>f.a)),true);}
 }
 assert.equal(g.lower.flatMap(f=>f.holes).filter(h=>h.id==='entrance-door').length,2);assert.equal(g.lower.flatMap(f=>f.holes).filter(h=>h.id==='upper-glazing').length,5);
});
test('brick bond keeps metric scale and continuous UV coordinates across source corners',()=>{
 assert.ok(Math.abs(KEITH_BRICK.tileWidth/KEITH_BRICK.length-20)<1e-9);assert.equal(KEITH_BRICK.tileHeight/KEITH_BRICK.height,20);
 for(const faces of [g.lower,g.upper])for(let i=0;i<faces.length-1;i++){const a=faces[i],c=faces[i+1];assert.ok(Math.abs(a.uv(0,1)[0]-c.uv(1,1)[0])<1e-9);assert.ok(Math.abs((a.uv(0,1)[0]-a.uv(1,1)[0])*KEITH_BRICK.tileWidth-a.length)<1e-8);}
});
test('mitred hood sections remain within the mapped projection and clear standing height',()=>{
 assert.equal(g.hood.length,5);for(const h of g.hood){assert.ok(area(h.points)>0);assert.equal(clipping.difference(poly(h.points),poly(b.points)).length,0);assert.equal(clipping.intersection(poly(h.points),poly(g.lower.map(f=>f.a))).length,0);for(const p of h.points)assert.ok(g.base+h.bottom-terrainHeight(p.x,p.z)>2.1);}
 for(let i=1;i<g.hood.length;i++)assert.deepEqual(g.hood[i-1].points[2],g.hood[i].points[3]);
 for(let i=0;i<g.hood.length;i++)for(let j=i+1;j<g.hood.length;j++)assert.equal(clipping.intersection(poly(g.hood[i].points),poly(g.hood[j].points)).length,0);
});
test('planter and arrival clear occupied rooms and retained path widths',()=>{
 for(const room of RAW.buildings.filter(b=>!b.walkableUnder&&b.id!==KEITH_ID))assert.equal(clipping.intersection(poly(g.bed.points),poly(room.points)).length,0,room.id);
 assert.equal(clipping.intersection(poly(g.bed.points),poly(g.lower.map(f=>f.a))).length,0);
 for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i],dx=c.x-a.x,dz=c.z-a.z;for(const p of g.bed.points){const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>path.width/2,path.id);}}
 assert.ok(CAMPUS.landmarks.some(p=>p.id===KEITH_ENTRY_VIEW.id));for(const room of RAW.buildings.filter(b=>!b.walkableUnder))for(let i=0;i<16;i++)assert.equal(inside({x:KEITH_ENTRY_VIEW.x+Math.cos(i*Math.PI/8)*.4,z:KEITH_ENTRY_VIEW.z+Math.sin(i*Math.PI/8)*.4},room.points),false,room.id);
});

test('selected reported height is tied to the retained public university record',()=>{
 const bytes=fs.readFileSync(new URL('../sources/unsw-gis-label-height-fields.json',import.meta.url)),data=JSON.parse(bytes),f=data.features.find(f=>f.attributes.egdb_ES_14==='J14');assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),'748c9b20eb59a1ff011af8a1b57d994015b7a69d10e095efd6af4a05da8f4327');assert.equal(f.attributes.OBJECTID,54);assert.equal(f.attributes.egdb_ES_26,b.height);assert.equal(f.attributes.egdb_ES_18,b.reportedLevels);assert.match(b.heightReference.note,/not a roof-RL/);
});

test('paving stays within the source overhang, covers its inset and matches the rendered walking triangles',()=>{
 const paving=keithEntrancePaving(b),total=paving.triangles.reduce((s,tri)=>s+area(tri),0);assert.ok(Math.abs(total-area(b.points)+area(g.lower.map(f=>f.a)))<1e-7);assert.ok(paving.triangles.length>500);
 for(const tri of paving.triangles)for(const weights of [[1/3,1/3,1/3],[.2,.3,.5]]){const p={x:0,y:0,z:0};tri.forEach((q,i)=>{for(const k of ['x','y','z'])p[k]+=q[k]*weights[i];});assert.ok(Math.abs(paving.heightAt(p.x,p.z)-p.y)<1e-7);assert.equal(inside(p,b.points),true);assert.equal(inside(p,g.lower.map(f=>f.a)),false);}
 for(const f of g.lower)for(const h of f.holes.filter(h=>h.id==='entrance-door')){const p=f.point((h.left+h.right)/2,0,.05);assert.ok(Math.abs(paving.heightAt(p[0],p[2])-g.base-h.bottom)<.12);}
});
