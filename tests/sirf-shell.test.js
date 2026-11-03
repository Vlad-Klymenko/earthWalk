import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {SIRF_BUILDING as B,SIRF as G,SIRF_PORTALS as P,SIRF_CORNER_VIEW as V,sirfPoint,sirfGlassTop,sirfGlassSpan} from '../dist/sirf-shell-data.js';
import {SIRF_FACETS as F,SIRF_PANEL_SEAMS as S,SIRF_HOOD as H,SIRF_LOWER_BODY as L,SIRF_RECESS as R,SIRF_HOOD_COLLIDERS as C} from '../dist/sirf-shell-parts.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((s,p,j)=>{const q=r[(j+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2,0),0);
const circle=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i*Math.PI/16)*r,p.z+Math.sin(i*Math.PI/16)*r])];
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
const cross=(a,b)=>({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x});
const sub=(a,b)=>({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z});
const dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;
test('source roof, body and recess partition preserve all mapped area without overlaps',()=>{
 const shown=CAMPUS.buildings.find(b=>b.id===B.id);assert.deepEqual(shown.points,B.points);assert.deepEqual(shown.tags,B.tags);assert.equal(shown.height,8);assert.equal(shown.levels,2);assert.match(shown.heightNote,/reconstructed/);
 const all=clip.union(...[...L,...R].map(poly));assert.ok(area(clip.xor(all,poly(B)))<1e-7);assert.ok(area(clip.intersection(clip.union(...L.map(poly)),clip.union(...R.map(poly))))<1e-7);assert.ok(area(clip.union(...R.map(poly)))>50);
});
test('the recessed corner glass and outer hood join without a false vertical partition',()=>{
 const north=P.find(p=>p.corner&&p.faceIndex===3),east=P.find(p=>p.corner&&p.faceIndex===0);
 assert.ok(distance(north.innerWorld[1],east.innerWorld[1])<1e-8);assert.ok(distance(north.innerWorld[2],east.innerWorld[0])<1e-8);assert.ok(distance(north.outerWorld[1],east.outerWorld[1])<1e-8);
 assert.equal(north.hood.length,1);assert.equal(east.hood.length,1);assert.ok(Math.hypot(north.innerWorld[1].x-B.points[0].x,north.innerWorld[1].z-B.points[0].z)>3);
 for(const q of P)for(const p of [...q.innerWorld,...q.outerWorld])assert.ok(p.y>=0&&p.y<=B.height);
});
test('asymmetric glass grids stay on their triangles and span the full corner edge',()=>{
 for(const q of P){for(let y=q.bottom;y<=q.glassPeak;y+=.1){const [l,r]=sirfGlassSpan(q,y);assert.ok(l>=q.l-1e-9&&r<=q.r+1e-9&&l<=r+1e-9);assert.ok(Math.abs(sirfGlassTop(q,l)-y)<1e-7||l===q.peak);assert.ok(Math.abs(sirfGlassTop(q,r)-y)<1e-7||r===q.peak);}
  assert.ok(Math.abs(sirfGlassTop(q,q.peak)-q.glassPeak)<1e-8);
 }
});
test('faceted wall area excludes the portals and its fine seams follow the folded planes',()=>{
 for(const face of G.facades){const facets=F.filter(f=>f.faceIndex===face.index),aperture=face.portals.reduce((s,p)=>s+face.len*(p.end-p.start)*(p.outerPeak-p.bottom)/2,0),measured=facets.reduce((s,f)=>s+area([[f.local.map(p=>[p.x,p.z])]]),0);assert.ok(Math.abs(measured-(face.len*7.75-aperture))<1e-7);}
 assert.ok(F.some(f=>f.points.some((p,i)=>{const face=G.facades.find(face=>face.index===f.faceIndex),flat=sirfPoint(face,f.local[i].x/face.len,p.y);return Math.hypot(flat.x-p.x,flat.z-p.z)>.05;})),'creases are actual noncoplanar metal');
 for(const seam of S)assert.ok(F.some(f=>{const n=cross(sub(f.points[1],f.points[0]),sub(f.points[2],f.points[0])),len=Math.hypot(n.x,n.y,n.z);return Math.abs(dot(n,sub(seam.a,f.points[0])))/len<1e-7&&Math.abs(dot(n,sub(seam.c,f.points[0])))/len<1e-7;}));
});
test('conservative hood collision slices cover sampled ceilings at their rendered heights',()=>{
 assert.ok(C.length>100);for(const c of C){assert.ok(c.top>c.bottom&&c.top-c.bottom<.31);assert.ok(area(clip.intersection(poly(c),poly(B)))>0);}
 for(const q of H)for(const ids of [[0,1,2],[0,2,3]])for(const w of [[.2,.3,.5],[.3,.4,.3],[.6,.1,.3]]){const p=ids.reduce((p,j,i)=>({x:p.x+q[j].x*w[i],y:p.y+q[j].y*w[i],z:p.z+q[j].z*w[i]}),{x:0,y:0,z:0});assert.ok(C.some(c=>p.y>=c.bottom&&p.y<=c.top&&area(clip.intersection(circle(p,.005),poly(c)))>0),'the visible soffit has a matching head-height barrier');}
});
test('new map destination clears buildings and a tall part of the recessed apron is open below its roof',()=>{
 assert.ok(CAMPUS.landmarks.some(p=>p.id===V.id));for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(circle(V,.4),poly(b)))<1e-7);
 const p=B.points[0],walk={x:p.x-1,z:p.z+1};assert.ok(area(clip.intersection(circle(walk,.3),clip.union(...R.map(poly))))>0);for(const body of L)assert.ok(area(clip.intersection(circle(walk,.3),poly(body)))<1e-7);for(const c of C.filter(c=>c.bottom<2.1))assert.ok(area(clip.intersection(circle(walk,.3),poly(c)))<1e-7);
});

test('the approach passes beneath the canopy before reaching the occupied glass boundary',()=>{
 const point=d=>({x:V.x+Math.sin(V.heading)*d,z:V.z-Math.cos(V.heading)*d});
 for(let d=16;d<=22;d+=.25)for(const body of L)assert.ok(area(clip.intersection(circle(point(d),.34),poly(body)))<1e-7,'the inset apron remains open');
 assert.ok(L.some(body=>area(clip.intersection(circle(point(24),.34),poly(body)))>0),'the laboratory envelope blocks continued forward travel');
});
