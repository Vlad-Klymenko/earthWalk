import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {MEDICAL_PARTS} from '../dist/medical-parts.js';
import {LOWY_ID,lowyFacadeFaces} from '../dist/lowy-facade-data.js';
import {LOWY_STREET as S,LOWY_STREET_GEOMETRY as G,LOWY_STREET_WINDOW as W,LOWY_NORTH_BOX,LOWY_STREET_VIEWS,lowyStreetPoint,lowyStreetLocal,lowyStreetBottom,lowyStreetFeature,LOWY_WEST_POST} from '../dist/lowy-street-data.js';
import {LOWY_STREET_LOWER_PARTS as LOWER,LOWY_STREET_RECESS as RECESS,LOWY_STREET_LOWER_WALLS as WALLS,LOWY_STREET_COLLIDERS as COLLIDERS,LOWY_STREET_PAVING as PAVING,LOWY_STREET_PAVING_TRIANGLES as TRIANGLES} from '../dist/lowy-street-parts.js';
import {lowyStreetPavingHeight} from '../dist/lowy-street-landscape.js';
import {terrainHeight} from '../dist/terrain.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((s,p)=>s+p.reduce((n,r,i)=>n+(i?-1:1)*Math.abs(r.reduce((a,v,j)=>{const q=r[(j+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const circle=(p,r)=>[Array.from({length:40},(_,i)=>[p.x+Math.cos(i*Math.PI/20)*r,p.z+Math.sin(i*Math.PI/20)*r])];
const inside=(p,ring)=>{let hit=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++)if((ring[i].z>p.z)!==(ring[j].z>p.z)&&p.x<(ring[j].x-ring[i].x)*(p.z-ring[i].z)/(ring[j].z-ring[i].z)+ring[i].x)hit=!hit;return hit;};
const parent=MEDICAL_PARTS.find(p=>p.buildingId===LOWY_ID&&p.kind==='main');
test('Lowy reconstructed lower body and recess partition the original main region exactly',()=>{
 const shapes=[...LOWER,...RECESS],union=clip.union(...shapes.map(poly));assert.ok(area(clip.xor(union,poly(parent)))<1e-6);assert.ok(Math.abs(shapes.reduce((s,p)=>s+area([poly(p)]),0)-area(union))<1e-6);
 assert.ok(area(RECESS.map(poly))>50&&area(RECESS.map(poly))<130);for(const p of shapes)assert.ok(p.reconstructed);
 const shown=CAMPUS.buildings.find(b=>b.id===LOWY_ID),source=RAW.buildings.find(b=>b.id===LOWY_ID);assert.deepEqual(shown.points,source.points);assert.deepEqual(shown.tags,source.tags);assert.equal(shown.height,32);assert.equal(shown.levels,8);
});
test('taper collision slices cover the lower body and stay conservatively below the visible underside',()=>{
 // Snap only verification coordinates to 0.1 micrometre: the clipping sweep
 // cannot reliably union many nearly collinear full-precision strip edges.
 const snap=p=>poly(p).map(r=>r.map(q=>q.map(n=>Math.round(n*1e7)/1e7))),union=clip.union(...COLLIDERS.map(snap));assert.ok(area(clip.xor(union,clip.union(...LOWER.map(snap))))<2e-4);assert.ok(Math.abs(COLLIDERS.reduce((s,p)=>s+area([poly(p)]),0)-LOWER.reduce((s,p)=>s+area([poly(p)]),0))<1e-6);
 const maxError=S.beam*S.collisionSlice/(S.taperBaseU-S.taperTopU);
 for(const c of COLLIDERS){assert.ok(c.bottom>=-1e-8&&c.bottom<c.top);assert.equal(c.top,S.beam);for(const p of c.points){const exact=c.taper?lowyStreetBottom(p):0;assert.ok(c.bottom<=exact+1e-7);assert.ok(exact-c.bottom<=maxError+1e-7);}}
 const entry=lowyStreetPoint(-37.8,-17),low=lowyStreetPoint(-34,-17);assert.ok(G.base+lowyStreetBottom(entry)-terrainHeight(entry.x,entry.z)>3.2);assert.ok(G.base+lowyStreetBottom(low)-terrainHeight(low.x,low.z)<1.65);
});
test('lower visible walls and slanted ceiling retain finite, bounded levels',()=>{
 assert.ok(LOWER.some(p=>p.taper));for(const w of WALLS){for(const n of [w.bottom0,w.bottom1,w.top0,w.top1])assert.ok(Number.isFinite(n)&&n>=-1e-7&&n<=S.beam+1e-7);assert.ok(w.bottom0<=w.top0+1e-7&&w.bottom1<=w.top1+1e-7);if(w.shared){assert.equal(w.kind,'concrete');assert.equal(w.bottom0,0);assert.equal(w.top0,lowyStreetBottom(w.a));}}
 for(const p of RECESS)for(const q of p.points)assert.ok(G.base+S.beam-terrainHeight(q.x,q.z)>3.1);
});
test('street window, north green box and western shaded frame are distinct source-facing features',()=>{
 const features=lowyFacadeFaces().map(f=>lowyStreetFeature(f));for(const key of ['north-wall','north-box','west-screen','west-screen-side'])assert.equal(features.filter(f=>f===key).length,1,key);
 assert.ok(W.start>0&&W.end<1&&W.end>W.start);assert.ok(W.projection-W.glass>1);assert.ok(W.bottom>21&&W.top<G.roofRL-G.base);assert.ok(LOWY_NORTH_BOX.bottom>15&&LOWY_NORTH_BOX.top<G.roofRL-G.base);
 assert.ok(S.reconstructed&&W.reconstructed&&LOWY_NORTH_BOX.reconstructed);
 assert.ok(RECESS.some(p=>inside(LOWY_WEST_POST,p.points)));assert.ok(area(clip.difference([circle(LOWY_WEST_POST,LOWY_WEST_POST.radius)],poly(parent)))<1e-7);assert.ok(G.base+LOWY_WEST_POST.top-terrainHeight(LOWY_WEST_POST.x,LOWY_WEST_POST.z)>3);
});
test('four exterior arrivals clear source buildings and remain inside the campus bounds',()=>{
 for(const view of LOWY_STREET_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));assert.ok(view.x>CAMPUS.bounds.minX+1&&view.x<CAMPUS.bounds.maxX-1&&view.z>CAMPUS.bounds.minZ+1&&view.z<CAMPUS.bounds.maxZ-1,view.id);for(const b of RAW.buildings)assert.ok(area(clip.intersection([circle(view,.4)],poly(b)))<1e-7,view.id+' clears '+b.id);assert.ok(Number.isFinite(terrainHeight(view.x,view.z)));}
 const outside=lowyStreetPoint(-44,-17);assert.ok(!COLLIDERS.some(c=>inside(outside,c.points)));assert.ok(Math.abs(lowyStreetLocal(lowyStreetPoint(-37,-17)).u+37)<1e-10);
});

test('paved approach matches its walking mesh and avoids source paths and occupied ground',()=>{
 assert.ok(TRIANGLES.length>1000&&TRIANGLES.length<12000);let meshArea=0;
 for(const tri of TRIANGLES){const p={x:tri[0].x*.2+tri[1].x*.3+tri[2].x*.5,z:tri[0].z*.2+tri[1].z*.3+tri[2].z*.5},height=tri[0].y*.2+tri[1].y*.3+tri[2].y*.5;assert.ok(Math.abs(lowyStreetPavingHeight(p.x,p.z)-height)<1e-7);for(const q of tri)assert.ok(Math.abs(q.y-terrainHeight(q.x,q.z)-.22)<1e-8);meshArea+=area([poly({points:tri})]);}
 assert.ok(Math.abs(meshArea-PAVING.reduce((s,p)=>s+area([poly(p)]),0))<1e-6);assert.equal(lowyStreetPavingHeight(0,0),undefined);
 for(const p of PAVING){for(const part of LOWER.filter(p=>!p.taper))assert.ok(area(clip.intersection(poly(p),poly(part)))<1e-6);for(const b of RAW.buildings.filter(b=>b.id!==LOWY_ID))assert.ok(area(clip.intersection(poly(p),poly(b)))<1e-6);
  for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],len=Math.hypot(b.x-a.x,b.z-a.z);if(!len)continue;const w=(path.width||3)/2,nx=-(b.z-a.z)/len*w,nz=(b.x-a.x)/len*w;assert.ok(area(clip.intersection(poly(p),poly({points:[{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:b.x-nx,z:b.z-nz},{x:b.x+nx,z:b.z+nz}]})))<1e-6,path.id);}
 }
});
