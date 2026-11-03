import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {BIO_STREET_GARDEN as G,BIO_STREET_ROUTE,BIO_STREET_TREES,bioStreetPathU,bioStreetWallU,bioStreetWallBase,bioStreetWallTop,bioStreetSoilRL,BIO_STREET_VIEW} from '../dist/bioscience-street-data.js';
import {BIO_STREET_BEDS,BIO_STREET_WALLS,BIO_STREET_SOIL_TRIANGLES,BIO_STREET_PLANTS} from '../dist/bioscience-street-parts.js';
import {bioStreetWalkingHeight,bioStreetTreeRoot} from '../dist/bioscience-street-landscape.js';
import {terrainHeight} from '../dist/terrain.js';
const poly=(r,h=[])=>[r,...h].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const dist=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
test('planted bank and retaining wall clear original buildings and full mapped routes',()=>{
 const shapes=[...BIO_STREET_BEDS,...BIO_STREET_WALLS];for(const p of shapes){const shape=[poly(p.points,p.holes)];for(const b of RAW.buildings)assert.ok(area(clip.intersection(shape,[poly(b.points,b.holes)]))<1e-7,b.id);
  for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],len=Math.hypot(b.x-a.x,b.z-a.z);if(len<1e-8)continue;if(Math.min(dist(a,p.points[0],p.points[1]),dist(b,p.points[0],p.points[1]))>100)continue;const w=(path.width||3)/2,nx=-(b.z-a.z)/len*w,nz=(b.x-a.x)/len*w;assert.ok(area(clip.intersection(shape,[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:b.x-nx,z:b.z-nz},{x:b.x+nx,z:b.z+nz}])]))<1e-7,path.id);}
 }
 assert.equal(BIO_STREET_ROUTE.width,2.5);for(let v=G.v0;v<G.v1;v+=.5)assert.ok(Math.abs(bioStreetPathU(v)-bioStreetWallU(v)-G.wallWidth/2-G.pathGap-BIO_STREET_ROUTE.width/2)<1e-8);
});
test('soil mesh and indexed walking height agree over the whole sloping bank',()=>{
 assert.ok(BIO_STREET_SOIL_TRIANGLES.length<15000);let triangles=0;
 for(const tri of BIO_STREET_SOIL_TRIANGLES){const p={x:tri[0].x*.2+tri[1].x*.3+tri[2].x*.5,z:tri[0].z*.2+tri[1].z*.3+tri[2].z*.5},expected=tri[0].y*.2+tri[1].y*.3+tri[2].y*.5;
  assert.ok(Math.abs(bioStreetWalkingHeight(p.x,p.z)-expected)<1e-7);for(const q of tri){assert.ok(Number.isFinite(q.x+q.y+q.z));assert.ok(Math.abs(q.y-bioStreetSoilRL(q.x,q.z))<1e-8);assert.ok(q.y>=terrainHeight(q.x,q.z)+.059);}
  triangles+=area([poly(tri)]);
 }
 assert.ok(Math.abs(triangles-BIO_STREET_BEDS.reduce((a,p)=>a+area([poly(p.points,p.holes)]),0))<1e-6);assert.equal(bioStreetWalkingHeight(0,0),undefined);
});
test('retaining faces stay grounded across grade changes with a photo-estimated cap level',()=>{
 assert.ok(BIO_STREET_WALLS.length>75);assert.ok(bioStreetWallTop(G.v0)-bioStreetWallTop(G.v1)>2);
 for(const w of BIO_STREET_WALLS){assert.equal(w.points.length,4);assert.ok(Math.abs(w.top0-bioStreetWallTop(w.v0))<1e-9);assert.ok(Math.abs(w.base0-bioStreetWallBase(w.v0)+.06)<1e-9);assert.ok(Math.abs(w.top1-bioStreetWallTop(w.v1))<1e-9);assert.ok(w.top0-w.base0>.6&&w.top0-w.base0<.7);}
});
test('planting and tree roots remain inside the derived bank without adding inventory records',()=>{
 assert.equal(TREE_INVENTORY.length,1146);assert.ok(BIO_STREET_TREES.length>=6);for(const tree of BIO_STREET_TREES){assert.deepEqual(TREE_INVENTORY.find(t=>t.id===tree.id),tree);assert.ok(Number.isFinite(bioStreetTreeRoot(tree)));assert.equal(bioStreetTreeRoot(tree),bioStreetWalkingHeight(tree.x,tree.z));}
 assert.equal(bioStreetTreeRoot(TREE_INVENTORY[0]),undefined);assert.ok(BIO_STREET_PLANTS.length>300);
 for(const p of BIO_STREET_PLANTS){assert.ok(Number.isFinite(bioStreetWalkingHeight(p.x,p.z)));assert.ok(p.clearance>=(p.kind==='strap'?.85:p.kind==='edge-cover'?.36:.7));let distance=Infinity;for(const bed of BIO_STREET_BEDS)for(const ring of [bed.points,...bed.holes])for(let i=0;i<ring.length;i++)distance=Math.min(distance,dist(p,ring[i],ring[(i+1)%ring.length]));assert.ok(distance>=p.clearance-1e-7);}
});
test('garden viewpoint remains on the clear cycleway and source geometry remains separate',()=>{
 assert.ok(CAMPUS.landmarks.some(p=>p.id===BIO_STREET_VIEW.id));assert.equal(bioStreetWalkingHeight(BIO_STREET_VIEW.x,BIO_STREET_VIEW.z),undefined);
 for(const id of ['biological-north','biological-south']){const raw=RAW.buildings.find(b=>b.id===id),shown=CAMPUS.buildings.find(b=>b.id===id);assert.deepEqual(shown.points,raw.points);assert.deepEqual(shown.tags,raw.tags);}
 assert.deepEqual(BIO_STREET_ROUTE.points,RAW.paths.find(p=>p.id===BIO_STREET_ROUTE.id).points);
});
