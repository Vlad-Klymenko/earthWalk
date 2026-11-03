import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {PATH_MATERIALS,pathGeometry,pathMaterial} from '../dist/path-materials.js';
import {PATH_MATERIAL_VIEWS} from '../dist/path-material-views.js';
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
test('material audit preserves every original surface tag and source section without reclassifying routes',()=>{
 const audit=JSON.parse(fs.readFileSync(new URL('../sources/path-material-evidence.json',import.meta.url)));assert.equal(audit.records.length,RAW.paths.length);assert.equal(audit.retrieved,'2026-11-01T12:46:54.846Z');assert.match(audit.note,/rather than road access/);
 for(const p of audit.records){const raw=RAW.paths[p.index];assert.equal(p.id,raw.id);assert.equal(p.kind,raw.kind);assert.equal(p.width,raw.width);assert.equal(p.sourceSurface,p.retainedSurface);assert.equal(p.retainedSurface,raw.surface??null);const enhanced=CAMPUS.paths.find(q=>q.id===raw.id&&JSON.stringify(q.points)===JSON.stringify(raw.points));assert.deepEqual(enhanced.points,raw.points);assert.equal(enhanced.kind,raw.kind);assert.equal(enhanced.surface,raw.surface);assert.equal(p.renderMaterial,pathMaterial(enhanced).material);assert.equal(p.basis,pathMaterial(enhanced).basis);assert.equal(p.reconstructedOffset,pathMaterial(enhanced).height);}
});
test('explicit materials override the road/path appearance shortcut without changing their walking role',()=>{
 const asphalt=RAW.paths.filter(p=>p.surface==='asphalt'&&p.kind==='path');assert.equal(asphalt.length,46);for(const p of asphalt){const r=pathMaterial(p);assert.equal(r.material,'asphalt');assert.equal(r.road,false);assert.equal(r.height,.22);}
 for(const p of RAW.paths.filter(p=>p.kind==='road'&&p.surface==='concrete')){const r=pathMaterial(p);assert.equal(r.material,'concrete');assert.equal(r.road,true);assert.equal(r.height,.055);}
 assert.equal(pathMaterial(RAW.paths.find(p=>p.surface==='wood')).material,'wood');assert.equal(pathMaterial(RAW.paths.find(p=>p.surface==='concrete:plates')).material,'concretePlates');assert.equal(pathMaterial(RAW.paths.find(p=>p.id==='osm-way-9784408')).material,'interlockingPavers');const science=pathMaterial(RAW.paths.find(p=>p.id==='osm-way-9784674'));assert.equal(science.material,'interlockingPavers');assert.equal(science.sourceSurface,'pebblestone');assert.equal(science.basis,'photo-reference-with-map-conflict');assert.equal(pathMaterial({kind:'path',surface:'pebblestone'}).material,'pebble');
 for(const p of RAW.paths){const r=pathMaterial(p);assert.ok(PATH_MATERIALS[r.material]);if(p.surface==='paved'||!p.surface)assert.equal(r.basis,'estimated-default');}
});
test('material selection cannot alter the source route geometry or terrain offsets',()=>{
 for(const p of RAW.paths){const before=JSON.stringify(p),geometry=pathGeometry(p);for(const surface of ['asphalt','concrete','paving_stones','wood','pebblestone',null])assert.deepEqual(pathGeometry({...p,surface}),geometry);assert.equal(JSON.stringify(p),before);}
 const field=CAMPUS.paths.find(p=>p.id==='osm-way-280268480'),lane=CAMPUS.paths.find(p=>p.id==='osm-way-1384227356');assert.equal(pathMaterial(field).material,'paving');assert.equal(pathMaterial(field).basis,'reconstruction-override');assert.equal(pathMaterial(field).height,.22);assert.equal(pathMaterial(lane).material,'asphalt');assert.equal(pathMaterial(lane).width,5.8);assert.equal(pathMaterial(lane).height,.055);
});
test('generic paved and missing tags remain explicit estimates rather than invented material evidence',()=>{
 for(const surface of [null,'paved','unknown']){assert.equal(pathMaterial({kind:'road',surface}).basis,'estimated-default');assert.equal(pathMaterial({kind:'path',surface}).basis,'estimated-default');}
 const overridden=pathMaterial({kind:'path',surface:'concrete',renderSurface:'asphalt',width:3});assert.equal(overridden.sourceSurface,'concrete');assert.equal(overridden.material,'asphalt');assert.equal(overridden.basis,'reconstruction-override');
});
test('new material viewpoints are on retained source routes and outside occupied mapped rooms',()=>{
 for(const p of PATH_MATERIAL_VIEWS){assert.ok(CAMPUS.landmarks.some(l=>l.id===p.id));assert.ok(Number.isFinite(p.x+p.z+p.heading));assert.equal(p.showSign,false);for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(!inside(p,b.points)||b.holes.some(h=>inside(p,h)));const distance=Math.min(...RAW.paths.flatMap(path=>path.points.slice(1).map((b,i)=>{const a=path.points[i],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);})));assert.ok(distance<1e-7);}
});
