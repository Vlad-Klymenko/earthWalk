import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { mathewsGeometry, MATHEWS_SHARED_LANE } from '../dist/mathews-data.js';
import { MATHEWS_ROOFS, MATHEWS_LOWER, MATHEWS_TOWER, MATHEWS_ENTRY_FLOOR, MATHEWS_PODIUM_FACES, MATHEWS_SIRF_PAVING } from '../dist/mathews-parts.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
import { buildingAppearance, VISUAL_REFERENCES } from '../dist/visual-data.js';

const raw=SOURCE.buildings.find(b=>b.id==='mathews'),g=mathewsGeometry(raw);
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r})));
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const src=[poly(raw.points,raw.holes)];

test('Mathews preserves map evidence and reported height independently of reconstructed tower / podium',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='mathews');assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);
  assert.equal(b.mappedHeight,60);assert.equal(b.levels,20);assert.equal(b.height,54);assert.equal(b.heightSource,'reported');assert.equal(b.photoTowerRows,14);assert.match(b.heightNote,/reconstructed estimates/);assert.equal(buildingAppearance(b).facade,'mathews');
  for(const id of ['mathews','mathews-entry','mathews-west-entry-photo','mathews-south-panorama','mathews-aerial-massing'])assert.ok(VISUAL_REFERENCES.some(r=>r.id===id));
  for(const id of ['osm-way-977850216','osm-way-297835022','osm-way-45559202'])assert.deepEqual(CAMPUS.paths.find(p=>p.id===id).points,SOURCE.paths.find(p=>p.id===id).points);
  const lane=CAMPUS.paths.find(p=>p.id===MATHEWS_SHARED_LANE.id),mapped=SOURCE.paths.find(p=>p.id===lane.id);assert.deepEqual(lane.points,mapped.points);assert.equal(lane.kind,mapped.kind);assert.equal(lane.width,mapped.width);assert.equal(lane.renderWidth,5.8);assert.equal(lane.renderSurface,'asphalt');
});

test('Mathews roof phases preserve the full L-shaped source perimeter without overlapping',()=>{
  const union=clip.union(...MATHEWS_ROOFS.map(p=>poly(p.points,p.holes)));assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);
  for(let i=0;i<MATHEWS_ROOFS.length;i++)for(let j=i+1;j<MATHEWS_ROOFS.length;j++)assert.ok(area(clip.intersection([poly(MATHEWS_ROOFS[i].points,MATHEWS_ROOFS[i].holes)],[poly(MATHEWS_ROOFS[j].points,MATHEWS_ROOFS[j].holes)]))<1e-6);
  assert.equal(Math.max(...MATHEWS_ROOFS.map(p=>p.height)),54);
  // The western arm and southern teaching edge must no longer be tall towers.
  for(const [u,v] of [[-28,-13],[30,23]]){const p=framePoint(g.frame,u,v),r=MATHEWS_ROOFS.filter(r=>area(clip.intersection([disc(p,.1)],[poly(r.points,r.holes)]))>.01);assert.equal(r.length,1);assert.equal(r[0].kind,'teaching-podium');assert.equal(r[0].height,18.3);}
  assert.ok(area(clip.union(...MATHEWS_TOWER.map(p=>poly(p.points,p.holes))))<area(src)/2);
});

test('Mathews shallow entry recess partitions the ground outline and clears the player approach',()=>{
  const union=clip.union(...MATHEWS_LOWER.map(p=>poly(p.points,p.holes)));assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);
  assert.ok(area(clip.intersection(...MATHEWS_LOWER.map(p=>poly(p.points,p.holes))))<1e-6);
  for(let k=0;k<=40;k++){
    const p=framePoint(g.frame,-42.1+5*k/40,-2.3);
    for(const part of MATHEWS_LOWER.filter(p=>p.kind==='ground')){assert.ok(area(clip.intersection([disc(p,.45)],[poly(part.points,part.holes)]))<1e-6);for(let i=0;i<part.points.length;i++)assert.ok(distance(p,part.points[i],part.points[(i+1)%part.points.length])>.45);}
    assert.ok(g.base+g.entry.ceiling-g.entryFloor(p)>3.1);
  }
});

test('Grey teaching-wing facades stay on the source perimeter and do not overlay the beige tower',()=>{
  for(const {a,c} of MATHEWS_PODIUM_FACES)for(const t of [.1,.5,.9]){
    const p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};
    assert.ok(raw.points.some((a,i)=>distance(p,a,raw.points[(i+1)%raw.points.length])<1e-7));
    for(const tower of MATHEWS_TOWER)assert.ok(tower.points.every((a,i)=>distance(p,a,tower.points[(i+1)%tower.points.length])>1e-5));
  }
});

test('Mathews added entry paving stays within its approach, outside occupied ground and off source paths',()=>{
  const entry=MATHEWS_LOWER.filter(p=>p.kind==='entry').map(p=>poly(p.points,p.holes));
  for(const part of MATHEWS_ENTRY_FLOOR){const shape=[poly(part.points,part.holes)];assert.ok(area(clip.difference(shape,clip.union(...entry,poly(g.entryApron))))<1e-6);
    for(const occupied of MATHEWS_LOWER.filter(p=>p.kind==='ground'))assert.ok(area(clip.intersection(shape,[poly(occupied.points,occupied.holes)]))<1e-6);
    for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){
      const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*(path.width||3)/2,nz=(c.x-a.x)/len*(path.width||3)/2;
      assert.ok(area(clip.intersection(shape,[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}])]))<1e-6);
    }
  }
});

test('Mathews entrance posts and reconstructed planted beds leave mapped routes clear',()=>{
  for(const bed of g.planters){for(const b of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([poly(bed.points)],[poly(b.points,b.holes)]))<1e-6,`bed clears ${b.id}`);
    for(const path of CAMPUS.paths)for(let i=0;i<path.points.length-1;i++)for(const p of bed.points)assert.ok(distance(p,path.points[i],path.points[i+1])>(path.renderWidth||path.width||3)/2+.5,`bed clears ${path.id}`);
  }
  for(const post of g.entry.posts)for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(post,path.points[i],path.points[i+1])>(path.width||3)/2+.25,`post clears ${path.id}`);
  for(const palm of g.palms)assert.ok(g.planters.some(bed=>area(clip.intersection([disc(palm,.3)],[poly(bed.points)]))>.25));
});

test('The reconstructed SIRF apron no longer overlays Library Walk asphalt',()=>{
  const lane=CAMPUS.paths.find(p=>p.id===MATHEWS_SHARED_LANE.id);
  assert.ok(MATHEWS_SIRF_PAVING.length);
  for(const part of MATHEWS_SIRF_PAVING)for(let i=0;i<lane.points.length-1;i++){
    const a=lane.points[i],c=lane.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*lane.renderWidth/2,nz=(c.x-a.x)/len*lane.renderWidth/2;
    assert.ok(area(clip.intersection([poly(part.points,part.holes)],[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}])]))<1e-6);
  }
});

test('Mathews viewpoints clear occupied footprints and all photo-led rows fit their volumes',()=>{
  for(const p of [g.arrival,g.courtArrival,g.entryArrival])for(const b of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([disc(p,.6)],[poly(b.points,b.holes)]))<1e-6,`arrival clears ${b.id}`);
  assert.equal(g.towerRows.length,14);assert.equal(g.podiumRows.length,4);assert.equal(g.towerBays.length,6);
  assert.ok(g.towerRows.at(-1).high<g.tower.top);assert.ok(g.podiumRows.at(-1).high<g.podiumHeight);assert.ok(g.tower.top<g.plant.top);
  for(const row of [...g.towerRows,...g.podiumRows])assert.ok(row.low<row.high);
});
