import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {CIVIL_ID,CIVIL_HEIGHT as H,CIVIL_WEST_VIEW as VIEW,civilWestFacade} from '../dist/civil-west-data.js';
import {civilGeometry} from '../dist/lecture-precinct-data.js';
import {heightDescription} from '../dist/building-heights.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
const raw=RAW.buildings.find(b=>b.id===CIVIL_ID),b=CAMPUS.buildings.find(b=>b.id===CIVIL_ID),W=civilWestFacade(b),G=civilGeometry(b),e=JSON.parse(fs.readFileSync(new URL('../sources/civil-west-evidence.json',import.meta.url)));
const rect=p=>[[[p.left,p.bottom],[p.right,p.bottom],[p.right,p.top],[p.left,p.top]]],ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=ps=>ps.reduce((s,p)=>s+ra(p[0])-p.slice(1).reduce((s,h)=>s+ra(h),0),0),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
test('owner GIS height and floor fields are retained alongside conflicting original OSM values',()=>{
 const a=e.gis.response.features[0].attributes;assert.equal(a.OBJECTID,52);assert.equal(a.egdb_ES_26,35.38);assert.equal(a.egdb_ES_18,11);assert.equal(b.height,35.38);assert.equal(b.mappedHeight,40);assert.equal(b.reportedLevels,11);assert.equal(b.levels,10);assert.equal(raw.height,40);assert.equal(b.heightSource,'reported');assert.equal(heightDescription(b).label,'public UNSW GIS');assert.equal(b.heightReference.linkLabel,'Height source · UNSW GIS');assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.points,raw.points);assert.match(H.note,/not a component\/absolute-RL survey/);assert.match(e.streetView.observed,/does not establish western window count/);assert.match(W.note,/fitted estimates/);
});
test('western façade belongs to the unchanged source end and preserves the independently reconstructed north rows',()=>{
 assert.ok(W.nu<-.99);assert.ok(W.length>17&&W.length<18);assert.ok(raw.points.some(p=>p.x===W.a.x&&p.z===W.a.z));assert.ok(raw.points.some(p=>p.x===W.c.x&&p.z===W.c.z));assert.equal(G.rows,8);assert.equal(G.plant.top,H.height);assert.ok(G.bodyRoof<H.height);assert.ok(G.pitch>3&&G.pitch<3.3);assert.ok(Math.abs(W.normal.x**2+W.normal.z**2-1)<1e-8);
});
test('brick rectangles and actual window apertures exactly partition the full western wall without double faces',()=>{
 const masonry=clip.union(...W.masonry.map(rect)),holes=clip.union(...W.windows.map(rect)),wall=rect({left:0,right:W.length,bottom:0,top:W.roof});assert.ok(Math.abs(area(masonry)+area(holes)-area([wall]))<1e-7);assert.ok(area(clip.intersection(masonry,holes))<1e-8);assert.ok(area(clip.difference(wall,clip.union(masonry,holes)))<1e-8);assert.ok(Math.abs(W.masonry.reduce((s,p)=>s+(p.right-p.left)*(p.top-p.bottom),0)-area(masonry))<1e-7);for(const p of W.masonry)assert.ok(p.left<p.right&&p.bottom<p.top);
});
test('small recessed square windows and service pipes stay within the reported height envelope and clear each other',()=>{
 assert.equal(W.windows.length,40);assert.equal(W.pipes.length,4);for(const w of W.windows){assert.ok(w.left>0&&w.right<W.length);assert.ok(w.top<W.roof);assert.ok(Math.abs((w.right-w.left)-(w.top-w.bottom))<.03);assert.ok(w.recess>.1&&w.recess<.2);assert.ok(w.frame>0&&w.frame<.1);assert.equal(w.reconstructed,true);}
 for(const p of W.pipes){assert.ok(p.bottom>=0&&p.top<W.roof);assert.ok(p.s-p.radius>0&&p.s+p.radius<W.length);for(const w of W.windows)assert.ok(p.s+p.radius<w.left||p.s-p.radius>w.right);}
});
test('western-end map arrival stays outside occupied rooms, fitted planters and inventoried trunks',()=>{
 assert.ok(CAMPUS.landmarks.some(p=>p.id===VIEW.id));assert.equal(VIEW.showSign,false);const circle={points:Array.from({length:32},(_,i)=>({x:VIEW.x+Math.cos(i*Math.PI/16)*.4,z:VIEW.z+Math.sin(i*Math.PI/16)*.4}))};for(const p of CAMPUS.buildings.filter(p=>!p.walkableUnder))assert.ok(area(clip.intersection(poly(circle),poly(p)))<1e-6,p.id);for(const t of TREE_INVENTORY)assert.ok(Math.hypot(t.x-VIEW.x,t.z-VIEW.z)>(t.dbhMm||200)/2000+.4);
});
