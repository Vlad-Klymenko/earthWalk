import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {terrainHeight} from '../dist/terrain.js';
import {SAMUELS_BUILDING as B,SAMUELS as G,SAMUELS_LIBRARY_FACE as F,SAMUELS_SCREEN as S,SAMUELS_UPPER_WINDOWS as W,SAMUELS_UPPER_PANELS as M,SAMUELS_SCREEN_PANELS as P,SAMUELS_SCREEN_BLADES as V,SAMUELS_SCREEN_SUPPORTS as R,SAMUELS_SCREEN_VIEW as VIEW,samuelsFacadePoint as at} from '../dist/samuels-facade-data.js';
const area=m=>m.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((s,p,j)=>{const q=r[(j+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2,0),0);
const rect=r=>[[[r.l,r.bottom],[r.l,r.top],[r.r,r.top],[r.r,r.bottom]]];
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const circle=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i*Math.PI/16)*r,p.z+Math.sin(i*Math.PI/16)*r])];
const dist=(a,c)=>Math.hypot(a.x-c.x,a.y-c.y,a.z-c.z);
test('source footprint, mapped height / levels and existing roof structures are preserved',()=>{
 const shown=CAMPUS.buildings.find(b=>b.id===B.id),raw=RAW.buildings.find(b=>b.id===B.id);assert.deepEqual(shown.points,raw.points);assert.deepEqual(shown.tags,raw.tags);assert.equal(shown.height,28);assert.equal(shown.levels,7);assert.equal(shown.heightSource,'mapped');assert.match(shown.heightNote,/Exact screen sections/);
 assert.equal(G.bodyRoof,24.2);assert.equal(Math.max(...G.glasshouse.points.map(G.roofHeight)),28);
 assert.deepEqual(F.a,B.points[8]);assert.deepEqual(F.c,B.points[9]);assert.ok(F.n.z>.9,'the detailed face is Library Walk, not the unverified opposite long wall');
});
test('metal panels and window apertures partition the full observed upper elevation',()=>{
 const domain=rect({l:0,r:F.length,bottom:S.claddingBase,top:G.bodyRoof}),walls=clip.union(...M.map(rect)),glass=clip.union(...W.map(rect));
 assert.ok(area(clip.xor(clip.union(walls,glass),domain))<1e-7);assert.ok(area(clip.intersection(walls,glass))<1e-7);
 assert.ok(Math.abs([...M,...W].reduce((s,r)=>s+(r.r-r.l)*(r.top-r.bottom),0)-F.length*(G.bodyRoof-S.claddingBase))<1e-7);
 assert.equal(new Set(W.map(w=>w.row)).size,5);assert.ok(W.length>=90);
 for(const w of W){assert.ok(w.bottom>=S.claddingBase&&w.top<=G.bodyRoof);assert.ok(w.recess>.1&&w.recess<.3);const a=at(w.l,w.bottom),c=at(w.l,w.bottom,-w.recess);assert.ok(Math.abs(dist(a,c)-w.recess)<1e-8);}
});
test('screen assemblies contain real shade depth and projecting lower fin webs',()=>{
 assert.ok(V.length>=5);for(const blade of V){assert.equal(blade.points.length,3);assert.ok(blade.local[1][2]-blade.local[0][2]>1);assert.ok(blade.local[1][1]>blade.local[0][1],'angled lower web is not a rectangular full-height slab');}
 for(const kind of ['vertical-front','vertical-web','horizontal-front','horizontal-top'])assert.ok(P.some(p=>p.kind===kind));
 const tops=P.filter(p=>p.kind==='horizontal-top');assert.equal(tops.length,S.rows+1);for(const top of tops){assert.ok(Math.abs(top.local[1][2]-top.local[0][2])>.8);assert.ok(top.local.every(p=>p[1]===top.local[0][1]));}
 assert.ok(R.some(r=>Math.hypot(r.a.x-r.c.x,r.a.z-r.c.z)>.8));
});
test('screen UVs span both local axes and every part stays below the retained maximum',()=>{
 for(const p of P){assert.ok(Math.max(...p.uv.map(v=>v[0]))-Math.min(...p.uv.map(v=>v[0]))>.5);assert.ok(Math.max(...p.uv.map(v=>v[1]))-Math.min(...p.uv.map(v=>v[1]))>.5);for(const q of p.points)assert.ok(Number.isFinite(q.x+q.y+q.z)&&q.y>0&&q.y<B.height);}
 for(const r of R)for(const p of [r.a,r.c])assert.ok(p.y<B.height&&p.y>0);
});
test('projecting screen edges retain standing clearance above public sloping ground',()=>{
 for(const part of [...P,...V])for(const p of part.points)assert.ok(G.base+p.y-terrainHeight(p.x,p.z)>2.1,'screen geometry remains safely overhead');
});
test('the new view and existing approach fit a player without moving inventory trees or buildings',()=>{
 assert.ok(CAMPUS.landmarks.some(p=>p.id===VIEW.id));for(const point of [VIEW,G.arrival]){for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(circle(point,.4),poly(b)))<1e-7);for(const t of G.trees)assert.ok(Math.hypot(point.x-t.x,point.z-t.z)>1);}
 const roof=RAW.buildings.find(b=>b.id===B.id);assert.deepEqual(B.points,roof.points);assert.ok(VIEW.pitch>.3&&VIEW.pitch<.7);
});
