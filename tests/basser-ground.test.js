import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { TERRAIN_GRID as grid } from '../dist/terrain.js';
import { BASSER_STEP_IDS, BASSER_GROUND_CUTOUT, BASSER_REMOVED_TRIANGLES, BASSER_GROUND_EDGES } from '../dist/basser-ground-parts.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const snap=p=>p.map(r=>r.map(([x,z])=>[Math.round(x*1e7)/1e7,Math.round(z*1e7)/1e7]));

test('Basser ground cut matches the actual mapped stair ribbons',()=>{
  const rects=[];
  for(const path of CAMPUS.paths.filter(p=>BASSER_STEP_IDS.includes(p.id)))for(let i=0;i<path.points.length-1;i++){
    const a=path.points[i],b=path.points[i+1],len=Math.hypot(b.x-a.x,b.z-a.z),nx=-(b.z-a.z)/len*path.width/2,nz=(b.x-a.x)/len*path.width/2;
    rects.push([[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[b.x-nx,b.z-nz],[b.x+nx,b.z+nz]]]);
  }
  const expected=clipping.union(...rects.map(snap)),actual=clipping.union(...BASSER_GROUND_CUTOUT.map(p=>snap(poly(p.points,p.holes))));
  assert.equal(rects.length,4);assert.ok(area(clipping.difference(expected,actual))<1e-5);assert.ok(area(clipping.difference(actual,expected))<1e-5);
});

test('Basser triangle fragments preserve every ground area outside the stair cut',()=>{
  const triangles=BASSER_REMOVED_TRIANGLES.map(([col,row,index])=>{
    const a={x:grid.x0+col*grid.dx,z:grid.z0+row*grid.dz},b={x:a.x+grid.dx,z:a.z},c={x:a.x,z:a.z+grid.dz},d={x:b.x,z:c.z};return poly(index?[b,d,c]:[a,b,c]);
  });
  assert.ok(triangles.length>10&&triangles.length<150);
  const expected=clipping.difference(clipping.union(...triangles.map(snap)),clipping.union(...BASSER_GROUND_CUTOUT.map(p=>snap(poly(p.points,p.holes)))));
  const actual=clipping.union(...BASSER_GROUND_EDGES.map(p=>snap(poly(p.points,p.holes))));
  assert.ok(area(clipping.difference(expected,actual))<1e-5);assert.ok(area(clipping.difference(actual,expected))<1e-5);
});
