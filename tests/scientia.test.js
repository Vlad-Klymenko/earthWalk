import {SCIENTIA_LINKS,SCIENTIA_SOLAR,SCIENTIA_PASSAGE} from '../dist/scientia-geometry.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {SCIENTIA as S,SCIENTIA_ID,SCIENTIA_NORTH_ID,SCIENTIA_TREES,SCIENTIA_VIEWS,scientiaPoint,scientiaLocal,scientiaRoofPoint} from '../dist/scientia-data.js';
import {SCIENTIA_GIS_OUTLINE as OUTLINE,SCIENTIA_NORTH as NORTH,SCIENTIA_SOUTH as SOUTH} from '../dist/scientia-parts.js';
import {terrainHeight,buildingBase} from '../dist/terrain.js';
const e=JSON.parse(fs.readFileSync(new URL('../sources/scientia-evidence.json',import.meta.url))),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=ps=>ps.reduce((s,p)=>s+ra(p[0])-p.slice(1).reduce((s,h)=>s+ra(h),0),0),union=ps=>clip.union(...ps.map(poly));
const dist=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);};
test('G19 retains GIS footprint, 19.32m and five-floor fields separately from original OSM geometry and fitted levels',()=>{
 const feature=e.buildingLayer.response.features[0];assert.equal(feature.attributes.OBJECTID,33);assert.equal(feature.attributes.egdb_ES_26,19.32);assert.equal(feature.attributes.egdb_ES_18,5);assert.equal(S.reportedHeight,19.32);assert.equal(S.roofRL-S.base,19.32);assert.match(S.note,/not a surveyed absolute level/);assert.equal(OUTLINE.length,20);
 for(const id of [SCIENTIA_ID,SCIENTIA_NORTH_ID]){const raw=RAW.buildings.find(b=>b.id===id),shown=CAMPUS.buildings.find(b=>b.id===id);assert.deepEqual(shown.points,raw.points);assert.deepEqual(shown.tags,raw.tags);}assert.equal(CAMPUS.buildings.find(b=>b.id===SCIENTIA_ID).heightSource,'reported');assert.equal(CAMPUS.buildings.find(b=>b.id===SCIENTIA_ID).heightReference.linkLabel,'Height source · UNSW GIS');assert.ok(S.base<S.podiumRL&&S.podiumRL<S.hallRoofRL&&S.hallRoofRL<S.valleyRL&&S.valleyRL<S.roofRL);
});
test('butterfly wings use all four original canopy corners and meet along a continuous lower valley',()=>{
 const source=RAW.buildings.find(b=>b.id===SCIENTIA_ID);for(const [t,s,i]of [[0,0,0],[1,0,3],[0,1,1],[1,1,2]]){const p=scientiaRoofPoint(t,s);assert.equal(p.x,source.points[i].x);assert.equal(p.z,source.points[i].z);assert.equal(p.y,S.roofRL);}
 for(let i=0;i<=20;i++){const t=i/20,lo=scientiaRoofPoint(t,.5);assert.equal(lo.y,S.valleyRL);for(let j=0;j<=12;j++){const p=scientiaRoofPoint(t,j/12);assert.ok(Number.isFinite(p.x+p.y+p.z));assert.ok(p.y>=S.valleyRL&&p.y<=S.roofRL);assert.ok(p.y-terrainHeight(p.x,p.z)>8);}}
 for(const [u,v]of [[0,0],[5,4],[30,-20]]){const p=scientiaLocal(scientiaPoint(u,v));assert.ok(Math.abs(p.u-u)<1e-10&&Math.abs(p.v-v)<1e-10);}
});
test('GIS hall partitions remain inside the source outline, separate from each other and every retained path corridor',()=>{
 assert.ok(area(union(NORTH))>500);assert.ok(area(union(SOUTH))>500);assert.ok(area(clip.intersection(union(NORTH),union(SOUTH)))<1e-5);
 const occupied=clip.union(union(NORTH),union(SOUTH));assert.ok(area(clip.difference(occupied,poly({points:OUTLINE})))<1e-4);
 for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],len=Math.hypot(b.x-a.x,b.z-a.z),w=(path.width||2.4)/2,n={x:(b.z-a.z)/len*w,z:-(b.x-a.x)/len*w},r={points:[{x:a.x+n.x,z:a.z+n.z},{x:b.x+n.x,z:b.z+n.z},{x:b.x-n.x,z:b.z-n.z},{x:a.x-n.x,z:a.z-n.z}]};assert.ok(area(clip.intersection(occupied,poly(r)))<1e-4,path.id);}
 for(const part of SOUTH)assert.ok(CAMPUS.buildings.some(b=>b.modelledWith===SCIENTIA_ID&&JSON.stringify(b.points)===JSON.stringify(part.points)));for(const b of RAW.buildings.filter(b=>!b.walkableUnder&&b.id!==SCIENTIA_NORTH_ID))assert.ok(area(clip.intersection(occupied,poly(b)))<1e-4,b.id);
});
test('fitted timber trunks and two standing arrivals clear original centre lines and occupied halls',()=>{
 assert.equal(SCIENTIA_TREES.length,3);assert.equal(SCIENTIA_VIEWS.length,2);const occupied=clip.union(union(NORTH),union(SOUTH));
 for(const t of SCIENTIA_TREES){assert.ok(t.root<t.forkRL&&t.forkRL<S.valleyRL);assert.ok(Math.abs(t.root-terrainHeight(t.x,t.z)-.04)<1e-8);for(const p of RAW.paths)for(let i=1;i<p.points.length;i++)assert.ok(dist(t,p.points[i-1],p.points[i])>t.radius+.35,p.id);}
 for(const v of SCIENTIA_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===v.id));assert.equal(v.showSign,false);const ring={points:Array.from({length:32},(_,i)=>({x:v.x+Math.cos(i*Math.PI/16)*.4,z:v.z+Math.sin(i*Math.PI/16)*.4}))};assert.ok(area(clip.intersection(occupied,poly(ring)))<1e-5);for(const t of SCIENTIA_TREES)assert.ok(Math.hypot(t.x-v.x,t.z-v.z)>t.radius+.4);}
});

test('overhead links keep standing clearance over the real rising passage and fitted solar panels stay on the northern roof',()=>{
 assert.equal(SCIENTIA_LINKS.length,2);for(const link of SCIENTIA_LINKS){assert.ok(link.top>link.bottom&&link.rail>link.top);for(let du=-.85;du<=.85;du+=.17)for(let v=0;v<=9.4;v+=.2){const p=scientiaPoint(link.u+du,v);assert.ok(link.bottom-terrainHeight(p.x,p.z)-.3>2.1,'standing clearance beneath reconstructed bridge');}}
 assert.ok(SCIENTIA_SOLAR.length>50&&SCIENTIA_SOLAR.length<150);for(const p of SCIENTIA_SOLAR){assert.equal(p.reconstructed,true);assert.ok(p.bottom>S.hallRoofRL&&p.top<S.roofRL);assert.ok(area(clip.difference(poly({points:p.points}),union(NORTH)))<1e-5);}
});
test('paved central slot is tessellated inside the unchanged roof footprint with each vertex tied to measured terrain',()=>{
 assert.equal(SCIENTIA_PASSAGE.length,360);for(const cell of SCIENTIA_PASSAGE){assert.ok(area(clip.difference(poly({points:cell}),poly({points:S.footprint})))<1e-7);assert.ok(area(clip.intersection(poly({points:cell}),clip.union(union(NORTH),union(SOUTH))))<1e-7);for(const p of cell)assert.ok(Math.abs(p.y-terrainHeight(p.x,p.z)-.06)<1e-8);}
});
