import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {NEWTON_ID,newtonGeometry} from '../dist/physics-precinct-data.js';
import {newtonFacadeGeometry,NEWTON_FACADE,NEWTON_WINDOW_ROWS,NEWTON_GIS_CANDIDATE} from '../dist/newton-facade-data.js';
const b=CAMPUS.buildings.find(b=>b.id===NEWTON_ID),raw=RAW.buildings.find(b=>b.id===NEWTON_ID),g=newtonFacadeGeometry(b),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const inside=(p,ps)=>{let c=false;for(let i=0,j=ps.length-1;i<ps.length;j=i++)if((ps[i].z>p.z)!==(ps[j].z>p.z)&&p.x<(ps[j].x-ps[i].x)*(p.z-ps[i].z)/(ps[j].z-ps[i].z)+ps[i].x)c=!c;return c;};
test('Newton preserves source perimeter and height evidence separately from fitted facade / roof components',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,16);assert.equal(b.levels,5);assert.equal(b.heightSource,'mapped');assert.equal(NEWTON_WINDOW_ROWS.length,4);assert.equal(newtonGeometry(b).rows,4);assert.ok(NEWTON_FACADE.roof<NEWTON_FACADE.coping&&NEWTON_FACADE.coping<b.height);
 const data=JSON.parse(fs.readFileSync(new URL('../sources/unsw-gis-label-height-fields.json',import.meta.url))),record=data.features.find(f=>f.attributes.egdb_ES_14==='J12').attributes;assert.equal(record.OBJECTID,NEWTON_GIS_CANDIDATE.objectId);assert.equal(record.egdb_ES_26,NEWTON_GIS_CANDIDATE.height);assert.equal(record.egdb_ES_18,NEWTON_GIS_CANDIDATE.floors);assert.equal(NEWTON_GIS_CANDIDATE.selected,false);assert.match(b.heightNote,/13.29 m \/ six floors/);
});
test('window and doorway cuts form a complete disjoint masonry partition',()=>{
 for(const f of g.faces){const wall=f.masonry.reduce((s,c)=>s+(c.right-c.left)*(c.top-c.bottom),0),open=f.holes.reduce((s,h)=>s+(h.right-h.left)*(h.top-h.bottom),0);assert.ok(Math.abs(wall+open-NEWTON_FACADE.roof)<1e-8);for(const c of f.masonry)for(const h of f.holes)assert.ok(Math.min(c.right,h.right)-Math.max(c.left,h.left)<1e-9||Math.min(c.top,h.top)-Math.max(c.bottom,h.bottom)<1e-9);for(let i=0;i<f.holes.length;i++)for(let j=i+1;j<f.holes.length;j++){const a=f.holes[i],b=f.holes[j];assert.ok(Math.min(a.right,b.right)-Math.max(a.left,b.left)<1e-9||Math.min(a.top,b.top)-Math.max(a.bottom,b.bottom)<1e-9);}}
});
test('window backs are recessed inside the original shell and the photographed south end remains blank',()=>{
 for(const f of g.faces)for(const h of f.holes){assert.ok(h.left>=0&&h.right<=1&&h.bottom>=0&&h.top<NEWTON_FACADE.roof&&h.recess>0);const p=f.point((h.left+h.right)/2,h.bottom,-h.recess);assert.equal(inside({x:p[0],z:p[2]},raw.points),true);}
 const south=g.faces.filter(f=>f.mode==='south-end'&&f.length>10);assert.equal(south.length,1);assert.equal(south[0].holes.length,0);assert.equal(south[0].panels.length,0);
 assert.ok(g.faces.filter(f=>f.mode==='west').flatMap(f=>f.holes).some(h=>h.kind==='main'));assert.ok(g.faces.filter(f=>f.mode==='west').flatMap(f=>f.holes).some(h=>h.kind==='side'));
});
test('pale head panels and projecting brick strips leave openings unobstructed',()=>{
 for(const f of g.faces)for(const p of [...f.panels,...f.ribs])for(const h of f.holes)assert.ok(Math.min(p.right,h.right)-Math.max(p.left,h.left)<1e-9||Math.min(p.top,h.top)-Math.max(p.bottom,h.bottom)<1e-9,`${f.sourceEdge} ${h.id}`);
 for(const f of g.faces){const a=f.uv(0,0),b=f.uv(1,0),c=f.uv(0,1);assert.ok(Math.abs((b[0]-a[0])*NEWTON_FACADE.brickTileWidth-f.length)<1e-8);assert.ok(Math.abs((c[1]-a[1])*NEWTON_FACADE.brickTileHeight-1)<1e-8);}
});
test('estimated roof service units fit inside the source footprint and retained maximum',()=>{
 for(const u of g.roofUnits){assert.equal(clip.difference(poly(u),poly(raw)).length,0);assert.ok(u.bottom>NEWTON_FACADE.roof);assert.ok(u.top+.025<raw.height);assert.ok(u.top>u.bottom);assert.equal(u.reconstructed,true);}
});
test('landing joins the source wall without entering an occupied room and retains the stair / ramp connection',()=>{
 const a=raw.points[0],c=raw.points[1],dx=c.x-a.x,dz=c.z-a.z,L=Math.hypot(dx,dz);for(const i of [1,2]){const p=g.landing[i],d=Math.abs((p.x-a.x)*dz-(p.z-a.z)*dx)/L;assert.ok(d>.0199&&d<.0201);assert.equal(inside(p,raw.points),false);}
 for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.equal(clip.intersection(poly({points:g.landing}),poly(room)).length,0,room.id);
 assert.equal(g.ramp.highRL,g.stair.highRL);assert.ok((g.stair.highRL-g.stair.lowRL)/g.stair.count<=.18);const door=g.faces.flatMap(f=>f.holes).find(h=>h.kind==='door');assert.equal(door.bottom,g.stair.highRL-g.base);
});
