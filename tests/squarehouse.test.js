import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { SQUAREHOUSE_ID, squarehouseGeometry } from '../dist/squarehouse-data.js';
import { SQUAREHOUSE_PARTS as PARTS } from '../dist/squarehouse-parts.js';
import { framePoint, frameRectangle } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
import { buildingAppearance } from '../dist/visual-data.js';
const b=CAMPUS.buildings.find(b=>b.id===SQUAREHOUSE_ID),raw=SOURCE.buildings.find(b=>b.id===SQUAREHOUSE_ID),g=squarehouseGeometry(b);
const poly=(p,h=[])=>[p,...h].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((s,p)=>s+p.reduce((a,r,i)=>a+(i?-1:1)*Math.abs(r.reduce((a,p,k)=>{const q=r[(k+1)%r.length];return a+p[0]*q[1]-q[0]*p[1];},0))/2,0),0);
const circle=(p,r)=>[poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r})))];
const ribbon=(a,c,width)=>{const len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2;return [poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}])];};

test('Squarehouse keeps its mapped upper outline, height and four-level tag',()=>{
  assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);assert.equal(b.height,12);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,4);assert.equal(b.photoUpperRows,3);assert.equal(buildingAppearance(b).facade,'squarehouse');assert.ok(g.roof<g.top);assert.equal(g.top,12);
  for(const row of g.rows){assert.ok(row.low>g.floor);assert.ok(row.high<g.roof);}
});

test('reconstructed terrace clears all other buildings and retained path widths',()=>{
  for(const other of SOURCE.buildings.filter(p=>p.id!==b.id))assert.ok(area(clip.intersection([poly(g.podium)],[poly(other.points,other.holes)]))<1e-6,`terrace clears ${other.id}`);
  for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(area(clip.intersection([poly(g.podium)],ribbon(path.points[i],path.points[i+1],(path.width||3)+.68)))<1e-6,`terrace clears ${path.id}`);
  const src=[poly(g.podium)],opening=clip.intersection([poly(g.stairs.opening)],src),union=clip.union(...PARTS.deck.map(p=>poly(p.points,p.holes)),opening);
  assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);
  assert.ok(area(clip.difference([poly(b.points)],src))<1e-6);
});

test('bounded terrace stair has small risers and an open overhead well',()=>{
  const s=g.stairs;assert.equal(s.steps.length,22);assert.ok(s.rise/s.count>.13&&s.rise/s.count<.18);assert.ok((s.topV-s.bottomV)/s.count>.30);
  for(const step of s.steps){
    assert.ok(area(clip.difference([poly(step.points)],[poly(s.opening)]))<1e-6);
    for(const part of PARTS.deck)assert.ok(area(clip.intersection([poly(step.points)],[poly(part.points,part.holes)]))<1e-6,'deck leaves the stair well open');
    for(const canopy of PARTS.canopies)assert.ok(area(clip.intersection([poly(step.points)],[poly(canopy.points,canopy.holes)]))<1e-6,'no low roof above rising stair');
    assert.ok(area(clip.intersection([poly(step.points)],[poly(b.points)]))<1e-6);
  }
  const d=g.base+g.floor-s.steps.at(-1).rl;assert.ok(d>0&&d<.18);
  for(const p of s.steps[0].points){const d=s.steps[0].rl+.01-(terrainHeight(p.x,p.z)+.22);assert.ok(d>=0&&d<.27);}
});

test('the covered east arcade stays clear at ground level with jumping headroom',()=>{
  for(let i=0;i<=60;i++){
    const p=framePoint(g.frame,17.7,23.5-i*.6),disc=circle(p,.4);
    assert.ok(area(clip.intersection(disc,[poly(b.points)]))<1e-6);
    for(const part of PARTS.annex)assert.ok(area(clip.intersection(disc,[poly(part.points,part.holes)]))<1e-6);
    for(const support of g.supports)assert.ok(area(clip.intersection(disc,[poly(frameRectangle(g.frame,support.width,support.width,support.u,support.v))]))<1e-6);
    if(g.local(p).v<22)assert.ok(g.base+g.underside-(terrainHeight(p.x,p.z)+.22)>3.0);
  }
});

test('terrace planting and canopies stay outside occupied upper walls and off the stair',()=>{
  for(const planter of g.planters){const p=[poly(frameRectangle(g.frame,planter.width,planter.depth,planter.u,planter.v))];assert.ok(area(clip.difference(p,[poly(g.podium)]))<1e-6);assert.ok(area(clip.intersection(p,[poly(b.points)]))<1e-6);assert.ok(area(clip.intersection(p,[poly(g.stairs.opening)]))<1e-6);}
  for(const canopy of PARTS.canopies){assert.ok(canopy.bottom-g.floor>3.05);assert.ok(area(clip.intersection([poly(canopy.points,canopy.holes)],[poly(b.points)]))<1e-6);}
});

test('Squarehouse exterior arrival points clear every mapped occupied building',()=>{
  for(const id of [SQUAREHOUSE_ID,'squarehouse-north','squarehouse-stair','squarehouse-arcade']){const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);for(const other of SOURCE.buildings)assert.ok(area(clip.intersection(circle(p,.4),[poly(other.points,other.holes)]))<1e-6,`${id} clears ${other.id}`);}
});
