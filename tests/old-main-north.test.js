import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {terrainHeight} from '../dist/terrain.js';
import {OLD_NORTH_ANNEX as A,OLD_NORTH_BRIDGE as B,OLD_NORTH_PLANTER as P,OLD_NORTH_VIEWS,oldNorthPoint,oldNorthPavingHeight} from '../dist/old-main-north-data.js';
import {OLD_NORTH_ANNEX_PARTS as ANNEX,OLD_NORTH_COURT as COURT,OLD_NORTH_PAVING as PAVING,OLD_NORTH_PAVING_MESH as MESH,OLD_NORTH_REMNANTS as REMAINS,OLD_NORTH_POSTS as POSTS} from '../dist/old-main-north-parts.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;},contains=(p,q)=>inside(p,q.points)&&!(q.holes||[]).some(h=>inside(p,h));
const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const ribbon=(p,width)=>p.points.slice(1).map((b,i)=>{const a=p.points[i],dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1,nx=-dz/l*width/2,nz=dx/l*width/2;return [[[a.x+nx,a.z+nz],[b.x+nx,b.z+nz],[b.x-nx,b.z-nz],[a.x-nx,a.z-nz]]];});
const annex=clip.union(...ANNEX.map(poly)),court=clip.union(...COURT.map(poly)),paving=clip.union(...PAVING.map(poly)),evidence=JSON.parse(fs.readFileSync(new URL('../sources/old-main-north-evidence.json',import.meta.url)));
test('northern court retains unnamed public GIS geometry and keeps historical height / ambiguous gallery evidence separate',()=>{
 const c=evidence.courtyard.response.features[0];assert.equal(c.attributes.OBJECTID,12);assert.equal(c.attributes.Name.trim(),'');assert.equal(c.attributes.Location.trim(),'');assert.deepEqual(Object.keys(c.attributes).sort(),['OBJECTID','Name','Location'].sort());assert.equal(evidence.courtyard.response.spatialReference.wkid,4326);assert.equal(evidence.building.response.features[0].attributes.egdb_ES_14,'K15');assert.equal(A.reconstructed,true);assert.equal(B.reconstructed,true);assert.equal(evidence.historicalHeight.facadeHeightMetres,18.5928);assert.match(evidence.historicalHeight.note,/no absolute roof RL/);assert.ok(evidence.photographs.some(p=>/placement remains unresolved/.test(p.observation)));
 for(const source of RAW.buildings){const kept=CAMPUS.buildings.find(b=>b.id===source.id);assert.deepEqual(kept.points,source.points);assert.deepEqual(kept.tags,source.tags);if(source.id==='osm-way-45490050')assert.equal(kept.height,source.height);}
});
test('curved low annex comes from the secondary GIS footprint and leaves original rooms / full route widths intact',()=>{
 const metresPerDegree=6371008.8*Math.PI/180,sx=metresPerDegree*Math.cos(RAW.center.lat*Math.PI/180),gis=clip.union(...evidence.building.response.features.map(f=>f.geometry.rings.map(r=>r.map(([lon,lat])=>[(lon-RAW.center.lon)*sx,(RAW.center.lat-lat)*metresPerDegree]))));assert.equal(ANNEX.length,2);assert.ok(area(annex)>100&&area(annex)<200);assert.ok(area(clip.difference(annex,gis))<1e-4);assert.ok(ANNEX.some(p=>p.points.length>12));
 for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(annex,poly(room)))<1e-4,room.id);
 for(const route of RAW.paths){assert.ok(CAMPUS.paths.some(p=>p.id===route.id&&p.width===route.width&&JSON.stringify(p.points)===JSON.stringify(route.points)));for(const strip of ribbon(route,route.width+.68))assert.ok(area(clip.intersection(annex,strip))<1e-4,route.id);}
 for(const part of ANNEX)for(const p of part.points)assert.ok(A.roofRL>terrainHeight(p.x,p.z)+2.5);assert.ok(A.floorRL<A.fasciaBottomRL&&A.fasciaBottomRL<A.roofRL);
});
test('mapped court paving preserves source ribbons, tree opening and the actual renderer triangulation',()=>{
 assert.ok(area(court)>600);assert.ok(area(paving)>500);assert.ok(area(clip.intersection(paving,annex))<1e-5);assert.ok(Math.abs(area(clip.union(...MESH.map(poly)))-area(paving))<1e-4);
 const strips=[];for(const route of RAW.paths)for(const strip of ribbon(route,route.width)){const within=clip.intersection(court,strip);if(area(within)>1e-6)strips.push(within);assert.ok(area(clip.intersection(paving,strip))<1e-4);}
 const treeOpening=poly({points:P.holes[0]});assert.ok(area(clip.intersection(paving,treeOpening))<1e-6);assert.ok(Math.abs(area(court)-area(clip.union(paving,...strips,clip.intersection(court,treeOpening))))<1e-4);
 for(const p of [...MESH,...ANNEX,...Object.values(REMAINS.paths).flatMap(p=>[...p.surface,...p.edge])]){const all=[...p.points,...p.holes.flat()],tris=ShapeUtils.triangulateShape(p.points.map(p=>new Vector2(p.x,p.z)),p.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(tris.reduce((s,t)=>s+ringArea(t.map(i=>[all[i].x,all[i].z])),0)-area([poly(p)]))<1e-4);}
});
test('enclosed northern link leaves standing clearance along every intersecting source route',()=>{
 assert.ok(B.floorRL>B.bottomRL);assert.ok(B.roofRL>B.floorRL+2.5);assert.ok(B.roofRL<46);let crossed=0;for(const route of RAW.paths)for(const strip of ribbon(route,route.width+.68)){const intersection=clip.intersection(poly(B),strip);if(area(intersection)<1e-6)continue;crossed++;for(const ring of intersection.flat())for(const [x,z] of ring)assert.ok(B.bottomRL-oldNorthPavingHeight(x,z)>2.5);}
 assert.ok(crossed>0);for(const p of B.points)assert.ok(B.bottomRL-oldNorthPavingHeight(p.x,p.z)>3.1);
});
test('timber planter retains the inventory pear and fitted posts leave original paths clear',()=>{
 const t=TREE_INVENTORY.find(t=>t.id===P.treeId);assert.equal(t.botanicalName,'Pyrus calleryana');assert.equal(P.x,t.x);assert.equal(P.z,t.z);assert.ok(inside(t,P.holes[0]));assert.equal(P.reconstructed,true);assert.equal(POSTS.length,4);
 for(const route of RAW.paths){for(const strip of ribbon(route,route.width))assert.ok(area(clip.intersection(poly(P),strip))<1e-6);for(const p of POSTS)for(let i=1;i<route.points.length;i++)assert.ok(distance(p,route.points[i-1],route.points[i])>route.width/2+p.radius+.079);}
 for(const post of POSTS){assert.ok(!ANNEX.some(a=>contains(post,a)));assert.ok(!RAW.buildings.filter(b=>!b.walkableUnder).some(b=>contains(post,b)));assert.equal(post.height,.95);}
});
test('outdoor viewpoints clear all occupied volumes / furniture and paved walking heights remain finite',()=>{
 for(const view of OLD_NORTH_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));assert.equal(view.showSign,false);assert.match(view.description,/service gallery remains unlocated/);const circle={points:Array.from({length:24},(_,i)=>({x:view.x+Math.cos(i*Math.PI/12)*.4,z:view.z+Math.sin(i*Math.PI/12)*.4}))};for(const p of [...RAW.buildings.filter(b=>!b.walkableUnder),...ANNEX,P])assert.ok(area(clip.intersection(poly(circle),poly(p)))<1e-6);for(const p of POSTS)assert.ok(Math.hypot(view.x-p.x,view.z-p.z)>p.radius+.4);}
 for(let v=-33;v<8;v+=.1){const p=oldNorthPoint(-40,v);assert.ok(Number.isFinite(oldNorthPavingHeight(p.x,p.z)));assert.ok(Math.abs(oldNorthPavingHeight(p.x,p.z)-terrainHeight(p.x,p.z)-.22)<1e-9);}
});
