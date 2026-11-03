import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {terrainHeight} from '../dist/terrain.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {GOODSELL_BUILDING as B,GOODSELL as G,GOODSELL_ENTRY_FACE as F,GOODSELL_DOOR as D,GOODSELL_WINDOWS as W,GOODSELL_BRICK_PANELS as M,GOODSELL_OPENINGS as O,GOODSELL_CANOPY as C,GOODSELL_RAFTERS as R,GOODSELL_GLASS_PANES as P,GOODSELL_CANOPY_COLLISION as COLLISION,GOODSELL_CANOPY_VIEW as VIEW,goodsellFacePoint as at,goodsellCanopyPoint as cp,goodsellCanopyGlassHeight as roof} from '../dist/goodsell-entrance-data.js';
const area=m=>m.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((s,p,j)=>{const q=r[(j+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2,0),0);
const rect=r=>[[[r.l,r.bottom],[r.l,r.top],[r.r,r.top],[r.r,r.bottom]]];
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const circle=(p,r)=>[Array.from({length:40},(_,i)=>[p.x+Math.cos(i*Math.PI/20)*r,p.z+Math.sin(i*Math.PI/20)*r])];
test('Goodsell preserves its source outline, height / level tags and courtyard foundation',()=>{
 const shown=CAMPUS.buildings.find(b=>b.id===B.id),raw=RAW.buildings.find(b=>b.id===B.id);assert.deepEqual(shown.points,raw.points);assert.deepEqual(shown.tags,raw.tags);assert.equal(shown.height,15);assert.equal(shown.levels,6);assert.equal(shown.heightSource,'mapped');assert.match(shown.heightNote,/photo-fitted estimates/);assert.ok(G.entryGround-G.minimumGround>4);assert.equal(G.base,G.entryGround);
 assert.deepEqual(F.a,B.points[9]);assert.deepEqual(F.c,B.points[8]);assert.ok(F.n.z<-.9);
});
test('window and door voids partition the full entrance elevation without an opaque backing wall',()=>{
 const domain=rect({l:0,r:F.length,bottom:0,top:B.height}),walls=clip.union(...M.map(rect)),holes=clip.union(...O.map(rect));
 assert.ok(area(clip.xor(clip.union(walls,holes),domain))<1e-7);assert.ok(area(clip.intersection(walls,holes))<1e-7);assert.ok(Math.abs([...M,...O].reduce((s,r)=>s+(r.r-r.l)*(r.top-r.bottom),0)-F.length*B.height)<1e-7);
 assert.equal(new Set(W.map(w=>w.row)).size,4);assert.ok(W.length>=38);for(const w of W){assert.ok(w.top<=B.height&&w.bottom>=0);assert.ok(area(clip.intersection(rect(w),rect(D)))<1e-7);const p=at(w.l,w.bottom,-w.recess),q=at(w.l,w.bottom);assert.ok(Math.abs(Math.hypot(p.x-q.x,p.z-q.z)-.32)<1e-8);}
});
test('rafter webs have a real tapered end and flanges / pane dimensions fit the canopy envelope',()=>{
 assert.equal(R.length,7);assert.equal(P.length,R.length-1);for(const r of R){assert.equal(r.profile.length,4);assert.ok(r.profile[0][0]<r.profile[1][0]);assert.ok(r.profile[0][1]>r.profile[1][1]);assert.ok(r.flangeWidth>r.webWidth*3);for(const [v,y] of r.profile){assert.ok(y>=COLLISION.bottom&&y<=COLLISION.top);assert.ok(Math.abs(r.u)+r.flangeWidth/2<C.width/2);assert.ok(v>=-2.1&&v<=1.75);}}
 for(const [i,p] of P.entries()){assert.ok(p.l>R[i].u&&p.r<R[i+1].u);assert.ok(p.l<p.r);for(const v of [p.front,p.back]){assert.ok(roof(v)>C.mainTop&&roof(v)<COLLISION.top);}assert.ok(roof(p.front)>roof(p.back),'glass roof follows the sloped rafter top');}
});
test('short steel bearings bridge the red column heads to the front main beam',()=>{
 assert.ok(C.columnTop<C.bracketTop);assert.equal(C.bracketTop,C.mainBottom);assert.ok(C.mainTop-C.mainBottom>.3);
 for(const column of G.supports){const u=(column.x-G.canopy.frame.x)*G.frame.u.x+(column.z-G.canopy.frame.z)*G.frame.u.z,v=(column.x-G.canopy.frame.x)*G.frame.v.x+(column.z-G.canopy.frame.z)*G.frame.v.z;assert.ok(Math.abs(v+1.35)<1e-7);assert.ok(Math.abs(u)<C.width/2);assert.ok(G.base+C.columnTop-terrainHeight(column.x,column.z)>2.2);}
});
test('complete canopy envelope covers its frame and retains clearance over unchanged public terrain',()=>{
 for(const p of COLLISION.points)assert.ok(G.base+COLLISION.bottom-terrainHeight(p.x,p.z)>2.2);
 for(const r of R)for(const [v,y] of r.profile){const p=cp(r.u,v,y);assert.ok(area(clip.intersection(circle(p,.001),poly(COLLISION)))>0);}
 assert.ok(area(clip.intersection(poly(COLLISION),poly(B)))>.1,'the roof remains attached to its source wall');
 for(const other of CAMPUS.buildings.filter(b=>b.id!==B.id&&!b.walkableUnder))assert.ok(area(clip.intersection(poly(COLLISION),poly(other)))<1e-7);
});
test('new entrance view and the central approach avoid buildings, columns and inventory trunks',()=>{
 assert.ok(CAMPUS.landmarks.some(p=>p.id===VIEW.id));for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(circle(VIEW,.4),poly(b)))<1e-7);
 for(const t of TREE_INVENTORY)assert.ok(Math.hypot(t.x-VIEW.x,t.z-VIEW.z)>.9);
 for(let d=0;d<=7.5;d+=.25){const p={x:VIEW.x+Math.sin(VIEW.heading)*d,z:VIEW.z-Math.cos(VIEW.heading)*d};for(const c of G.supports)assert.ok(Math.hypot(p.x-c.x,p.z-c.z)>c.radius+.4);for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(circle(p,.34),poly(b)))<1e-7);}
});


test('rear beam flanges remain entirely outside the mapped wall across the canopy width',()=>{
 const v=C.beams[1];for(const u of [-3.9,3.9])for(const side of [-.115,.115]){const p=cp(u,v+side,C.mainBottom),off=(p.x-F.a.x)*F.n.x+(p.z-F.a.z)*F.n.z;assert.ok(off>.015,'mapped wall cannot occlude the rear beam or its flanges');}
});
