import test from 'node:test';
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {physicsServiceGeometry,PHYSICS_GIS_CANDIDATE,PHYSICS_SERVICE_VIEW} from '../dist/physics-service-data.js';
import {PHYSICS_ID} from '../dist/physics-precinct-data.js';
import {framePoint} from '../dist/geometry.js';
const raw=RAW.buildings.find(b=>b.id===PHYSICS_ID),b=CAMPUS.buildings.find(b=>b.id===PHYSICS_ID),g=physicsServiceGeometry(b),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=geom=>geom.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const inside=(p,ps)=>{let c=false;for(let i=0,j=ps.length-1;i<ps.length;j=i++)if((ps[i].z>p.z)!==(ps[j].z>p.z)&&p.x<(ps[j].x-ps[i].x)*(p.z-ps[i].z)/(ps[j].z-ps[i].z)+ps[i].x)c=!c;return c;};
test('the source theatre shell and selected height remain separate from the ambiguous university field',()=>{
 assert.deepEqual(b.points,raw.points);assert.equal(b.points.length,14);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,8);assert.equal(b.levels,1);assert.equal(b.heightSource,'mapped');assert.equal(PHYSICS_GIS_CANDIDATE.selected,false);assert.equal(b.universityHeightCandidate,12.24);assert.equal(b.universityFloorCountCandidate,4);assert.match(b.heightNote,/do not replace/);
});
test('main roof and edge service regions partition the mapped footprint exactly',()=>{
 const union=clip.union(...g.parts.map(poly));assert.ok(area(clip.xor(union,poly(b)))<1e-7);assert.ok(Math.abs(g.parts.reduce((s,p)=>s+area([poly(p)]),0)-area(union))<1e-7);assert.equal(g.parts.filter(p=>p.kind==='main').length,1);assert.ok(g.parts.some(p=>p.kind==='service'));
 const main=g.parts.find(p=>p.kind==='main');assert.ok(area([poly(main)])>area([poly(b)])*.5);
});
test('crowned roof, service panels and fan units stay within the retained eight-metre maximum',()=>{
 for(const p of g.parts.filter(p=>p.kind==='main').flatMap(p=>p.points)){assert.ok(g.roofAt(p)>=7.15-1e-9&&g.roofAt(p)<=8);assert.ok(g.roofAt(p)>g.body);}
 for(let v=-8;v<12;v+=2)assert.ok(Math.abs(g.roofAt(framePoint(g.frame,-.5,v))-8)<1e-9);
 const service=clip.union(...g.parts.filter(p=>p.kind==='service').map(poly));assert.equal(g.units.length,2);for(const u of g.units){assert.equal(clip.difference(poly(u),service).length,0);assert.equal(u.bottom,g.serviceRoof);assert.ok(u.top+.025<g.maximum);}
 for(const part of g.parts.filter(p=>p.kind==='main'))for(let i=0;i<part.points.length;i++){const a=part.points[i],c=part.points[(i+1)%part.points.length],outside=g.externalEdge(a,c);assert.equal(typeof outside,'boolean');}
});
test('west windows and recessed service openings cut a disjoint complete wall partition',()=>{
 for(const f of g.faces){const solid=f.masonry.reduce((s,c)=>s+(c.right-c.left)*(c.top-c.bottom),0),holes=f.holes.reduce((s,h)=>s+(h.right-h.left)*(h.top-h.bottom),0);assert.ok(Math.abs(solid+holes-g.body)<1e-9);for(const c of f.masonry)for(const h of f.holes)assert.ok(Math.min(c.right,h.right)-Math.max(c.left,h.left)<1e-9||Math.min(c.top,h.top)-Math.max(c.bottom,h.bottom)<1e-9);for(const h of f.holes){assert.ok(h.recess>0&&h.bottom>=0&&h.top<g.body);const p=f.point((h.left+h.right)/2,h.bottom,-h.recess);assert.equal(inside({x:p[0],z:p[2]},b.points),true);}}
 assert.equal(g.faces.flatMap(f=>f.holes).filter(h=>h.id.includes('high')).length,3);assert.equal(g.faces.filter(f=>f.holes.length).length,2);
});
test('new service viewpoint is outside all rooms and original path widths / centrelines are retained',()=>{
 const p=PHYSICS_SERVICE_VIEW;assert.ok(CAMPUS.landmarks.some(q=>q.id===p.id));for(const room of RAW.buildings.filter(b=>!b.walkableUnder))for(let i=0;i<16;i++)assert.equal(inside({x:p.x+Math.cos(i*Math.PI/8)*.4,z:p.z+Math.sin(i*Math.PI/8)*.4},room.points),false,room.id);
 for(const path of RAW.paths)assert.ok(CAMPUS.paths.some(p=>p.id===path.id&&p.width===path.width&&JSON.stringify(p.points)===JSON.stringify(path.points)),path.id);
});

test('unselected K14 height / floor fields are traceable to the retained public snapshot',()=>{
 const bytes=fs.readFileSync(new URL('../sources/unsw-gis-label-height-fields.json',import.meta.url)),data=JSON.parse(bytes),record=data.features.find(f=>f.attributes.egdb_ES_14==='K14');assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),'748c9b20eb59a1ff011af8a1b57d994015b7a69d10e095efd6af4a05da8f4327');assert.equal(record.attributes.OBJECTID,PHYSICS_GIS_CANDIDATE.objectId);assert.equal(record.attributes.egdb_ES_26,PHYSICS_GIS_CANDIDATE.height);assert.equal(record.attributes.egdb_ES_18,PHYSICS_GIS_CANDIDATE.floors);assert.notEqual(b.height,PHYSICS_GIS_CANDIDATE.height);
});
