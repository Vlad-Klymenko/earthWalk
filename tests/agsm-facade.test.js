import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {AGSM_FACADE_BUILDING as B,AGSM_MASSING as M,AGSM_COURT_BANDS as S,AGSM_COURT_FACES,AGSM_CURVE_FACES,AGSM_CURVE_GRID,AGSM_FACADE_VIEW,agsmFaceCells,agsmScreen,agsmOffsetPoint} from '../dist/agsm-facade-data.js';
import {AGSM_FACADE_PARTS as PARTS,AGSM_FACADE_WALLS as WALLS} from '../dist/agsm-facade-parts.js';
import {AGSM_COURT_VIEWS,agsmCourtPoint} from '../dist/agsm-court-data.js';
import {agsmCourtHeight} from '../dist/agsm-court-landscape.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((s,p,j)=>{const q=r[(j+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2,0),0);
const circle=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i*Math.PI/16)*r,p.z+Math.sin(i*Math.PI/16)*r])];
test('AGSM roof tiers conserve the complete occupied footprint and source height evidence',()=>{
 const shown=CAMPUS.buildings.find(b=>b.id===B.id),source=RAW.buildings.find(b=>b.id===B.id);assert.deepEqual(shown.points,source.points);assert.deepEqual(shown.tags,source.tags);assert.equal(shown.height,20);assert.equal(shown.levels,5);assert.equal(shown.heightSource,'mapped');assert.match(shown.heightNote,/estimated setbacks/);
 assert.ok(area(clip.xor(clip.union(...PARTS.map(poly)),poly(source)))<1e-6);assert.ok(Math.abs(PARTS.reduce((s,p)=>s+area([poly(p)]),0)-area([poly(source)]))<1e-6);assert.equal(Math.max(...PARTS.map(p=>p.height)),source.height);
 assert.ok(M.reconstructed);assert.ok(M.courtRoof<M.upperRoof&&M.upperRoof<M.maximum);assert.equal(PARTS.length,3);
});
test('new inset walls expose only the vertical interval above their adjoining lower roof',()=>{
 const shared=WALLS.filter(w=>w.shared);assert.ok(shared.length>10);for(const wall of WALLS){assert.ok(wall.top>wall.bottom);assert.ok([0,M.courtRoof,M.upperRoof].includes(wall.bottom));assert.ok([M.courtRoof,M.upperRoof,M.maximum].includes(wall.top));assert.ok([wall.a.x,wall.a.z,wall.c.x,wall.c.z].every(Number.isFinite));if(wall.shared){assert.ok(wall.bottom>0);assert.ok(wall.sourceIndex<0);}else assert.equal(wall.bottom,0);}
 const curveSources=AGSM_CURVE_FACES.map(f=>f.index);for(const i of curveSources){const faces=WALLS.filter(w=>w.sourceIndex===i);assert.ok(faces.length>0);assert.ok(faces.every(w=>w.top===M.courtRoof));}
});
test('continuous curved screen grid follows all source facets without duplicate pier anchors',()=>{
 let length=0;const anchors=new Set();for(const face of AGSM_CURVE_FACES)for(const cell of agsmFaceCells(face)){assert.ok(cell.start>=-1e-8&&cell.end<=face.length+1e-8);length+=cell.end-cell.start;if(cell.anchor>=-1e-7&&cell.anchor<face.length-1e-7){const v=Math.round((face.start+cell.anchor)*1e8);assert.ok(!anchors.has(v));anchors.add(v);}}
 assert.ok(Math.abs(length-AGSM_CURVE_GRID.length)<1e-7);assert.equal(anchors.size,AGSM_CURVE_GRID.count);assert.ok(AGSM_CURVE_GRID.count>8);
});
test('mixed adjustable screen positions and the recessed gallery stay within the lower photo-fitted tier',()=>{
 const bottoms=new Set();for(const face of AGSM_COURT_FACES.filter(f=>f.kind==='glazed'))for(const cell of agsmFaceCells(face)){const screen=agsmScreen(cell);assert.ok(screen.bottom>=S.screenBottom-1e-8&&screen.top<=S.screenTop);assert.ok(screen.bottom<screen.top);assert.ok(screen.bottomProjection>screen.topProjection);assert.ok(screen.bottomProjection<1);bottoms.add(screen.bottom);}
 assert.equal(bottoms.size,4);assert.ok(S.groundTop<S.screenBottom);assert.ok(S.screenTop<S.galleryFloor);assert.ok(S.galleryTop<S.roofBottom&&S.roofBottom<M.courtRoof);
});
test('court arrivals and the existing terrace route remain outside occupied tiers with matching walking heights',()=>{
 for(const p of [AGSM_FACADE_VIEW,...AGSM_COURT_VIEWS]){assert.ok(Number.isFinite(agsmCourtHeight(p.x,p.z)));for(const part of PARTS)assert.ok(area(clip.intersection([circle(p,.4)],poly(part)))<1e-7);}
 assert.ok(CAMPUS.landmarks.some(p=>p.id===AGSM_FACADE_VIEW.id));for(let u=-3.5;u>=-7.8;u-=.1){const p=agsmCourtPoint(u,16);assert.ok(Number.isFinite(agsmCourtHeight(p.x,p.z)));for(const part of PARTS)assert.ok(area(clip.intersection([circle(p,.3)],poly(part)))<1e-6);}
});

test('recessed glazing, backing walls and projecting brows join at every curved source vertex',()=>{
 const faces=AGSM_COURT_FACES.filter(f=>f.kind==='glazed');for(let i=1;i<faces.length;i++)for(const offset of [-1.05,-.82,.03,.25,.65]){const a=agsmOffsetPoint(faces[i-1],faces[i-1].length,offset),c=agsmOffsetPoint(faces[i],0,offset);assert.ok(Math.hypot(a.x-c.x,a.z-c.z)<1e-8);assert.ok(Math.hypot(a.x-faces[i].a.x,a.z-faces[i].a.z)<=Math.abs(offset)*2+1e-8);}
});
