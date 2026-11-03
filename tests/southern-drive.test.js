import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {SOUTHERN_SCOPE as S,SOUTHERN_FRAME,SOUTHERN_FIXTURES,SOUTHERN_DESTINATIONS} from '../dist/southern-drive-data.js';
import {SOUTHERN_ROAD,SOUTHERN_PAVING,SOUTHERN_GRASS,SOUTHERN_PLANTING,SOUTHERN_HEDGES,SOUTHERN_MEDIAN,SOUTHERN_REFUGE,SOUTHERN_STRIPES,SOUTHERN_REMNANTS} from '../dist/southern-drive-parts.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
import {orientedFrame,framePoint} from '../dist/geometry.js';
import {terrainHeight} from '../dist/terrain.js';
import {priorityWalkingSurface} from '../dist/walking-surfaces.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const area=m=>m.reduce((s,p)=>s+ra(p[0])-p.slice(1).reduce((s,r)=>s+ra(r),0),0);
const scope=[[[S.minX,S.minZ],[S.maxX,S.minZ],[S.maxX,S.maxZ],[S.minX,S.maxZ]]];
const layers=[SOUTHERN_ROAD,SOUTHERN_PAVING,SOUTHERN_GRASS,SOUTHERN_PLANTING];
const union=ps=>clip.union(...ps.map(poly));
const buildings=RAW.buildings.filter(b=>!b.walkableUnder).map(poly);
const inside=(x,z,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>z)!==(r[j].z>z)&&x<(r[j].x-r[i].x)*(z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
test('public GIS snapshot retains raw WGS84 source evidence, with no private fields or invented height claims',()=>{
 const s=JSON.parse(fs.readFileSync(new URL('../sources/southern-drive-gis-evidence.json',import.meta.url)));
 for(const layer of Object.values(s.layers)){assert.equal(layer.spatialReference.wkid,4326);for(const f of layer.features){assert.deepEqual(Object.keys(f.attributes),['OBJECTID']);for(const r of f.geometry.rings)for(const p of r){assert.ok(p[0]>151.22&&p[0]<151.24&&p[1]>-33.93&&p[1]<-33.91);}}}
 assert.equal(s.layers['21'].features.length,2);assert.equal(s.layers['24'].features.length,13);assert.equal(s.layers['25'].features.length,5);assert.match(SOUTHERN_FIXTURES.note,/No fixture height survey/);
});
test('street surfaces partition the bounded junction without overlap, holes or filling occupied rooms',()=>{
 const surfaces=layers.map(union);for(let i=0;i<surfaces.length;i++){assert.ok(area(clip.difference(surfaces[i],scope))<1e-6);for(let j=0;j<i;j++)assert.ok(area(clip.intersection(surfaces[i],surfaces[j]))<1e-6);for(const b of buildings)assert.ok(area(clip.intersection(surfaces[i],b))<1e-6);}
 const expected=clip.difference(scope,...buildings),actual=clip.union(...surfaces);assert.ok(Math.abs(area(expected)-area(actual))<1e-6);
 assert.ok(area(union(SOUTHERN_REFUGE))>35);assert.ok(area(clip.difference(union(SOUTHERN_REFUGE),union(SOUTHERN_PAVING)))<1e-6);
 for(const p of SOUTHERN_STRIPES)assert.ok(area(clip.difference(poly(p),union(SOUTHERN_ROAD)))<1e-6);
});
test('generated street surfaces and old-path remnants triangulate without filling clipped holes',()=>{
 for(const p of [...layers.flat(),...SOUTHERN_STRIPES,...Object.values(SOUTHERN_REMNANTS.paths).flatMap(p=>[...p.edge,...p.surface])]){const all=[...p.points,...p.holes.flat()],ts=ShapeUtils.triangulateShape(p.points.map(p=>new Vector2(p.x,p.z)),p.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));const a=ts.reduce((s,t)=>s+ra(t.map(i=>[all[i].x,all[i].z])),0);assert.ok(Math.abs(a-area([poly(p)]))<1e-5);}
 for(const p of Object.values(SOUTHERN_REMNANTS.paths).flatMap(p=>[...p.edge,...p.surface]))assert.ok(area(clip.intersection(poly(p),scope))<1e-6);
});
test('photo-fitted furniture and hedges leave every complete source path width clear',()=>{
 const f=orientedFrame(SOUTHERN_MEDIAN[0].points,SOUTHERN_FRAME.v),fixtures=[SOUTHERN_FIXTURES.refugeLamp,...[-5,5].map(v=>({...framePoint(f,0,v),radius:.085})),...SOUTHERN_FIXTURES.bins,{...SOUTHERN_FIXTURES.board,radius:.75}];
 for(const p of fixtures)for(const route of RAW.paths)for(let i=1;i<route.points.length;i++){const a=route.points[i-1],c=route.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>route.width/2+p.radius+.34);}
 for(const route of RAW.paths.filter(p=>p.kind!=='road'))for(let i=1;i<route.points.length;i++){const a=route.points[i-1],c=route.points[i],dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz);if(!l)continue;const nx=-dz/l*route.width/2,nz=dx/l*route.width/2,strip=[[[a.x+nx,a.z+nz],[c.x+nx,c.z+nz],[c.x-nx,c.z-nz],[a.x-nx,a.z-nz]]];assert.ok(area(clip.intersection(union(SOUTHERN_HEDGES),strip))<1e-5);}
 for(const p of fixtures)for(const b of buildings)assert.ok(!inside(p.x,p.z,b[0].map(([x,z])=>({x,z}))));
});
test('crossing follows retained terrain across low kerbs and retains the original path coordinates',()=>{
 const offsets=[.055,.22,.015,.18],patches=layers.flatMap((ps,i)=>ps.map(p=>({...p,priority:true,heightAt:(x,z)=>terrainHeight(x,z)+offsets[i]})));
 const crossing=RAW.paths.find(p=>p.id==='osm-way-1098977026');let last;
 for(let i=1;i<crossing.points.length;i++){const a=crossing.points[i-1],c=crossing.points[i],n=Math.ceil(Math.hypot(c.x-a.x,c.z-a.z)/.1);for(let k=0;k<n;k++){const x=a.x+(c.x-a.x)*k/n,z=a.z+(c.z-a.z)*k/n,y=priorityWalkingSurface(patches,x,z,terrainHeight(x,z),inside);assert.ok(Number.isFinite(y));if(last!==undefined)assert.ok(Math.abs(y-last)<.21);last=y;}}
 for(const p of SOUTHERN_DESTINATIONS){assert.ok(CAMPUS.landmarks.some(l=>l.id===p.id));assert.ok(Number.isFinite(priorityWalkingSurface(patches,p.x,p.z,terrainHeight(p.x,p.z),inside)));}
 for(const p of RAW.paths.filter(p=>SOUTHERN_REMNANTS.paths[p.id]))assert.ok(CAMPUS.paths.some(q=>JSON.stringify(p.points)===JSON.stringify(q.points)&&p.width===q.width));
});
