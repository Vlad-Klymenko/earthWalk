import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { AINSWORTH_ID, AINSWORTH_HEIGHT_REPORT, ainsworthGeometry } from '../dist/ainsworth-data.js';
import { AINSWORTH_UPPER, AINSWORTH_GROUND, AINSWORTH_ROOFS, AINSWORTH_CANOPY, AINSWORTH_PAVING } from '../dist/ainsworth-parts.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
import { buildingAppearance, VISUAL_REFERENCES } from '../dist/visual-data.js';
const raw=SOURCE.buildings.find(b=>b.id===AINSWORTH_ID),g=ainsworthGeometry(raw);
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:32},(_,i)=>({x:p.x+Math.cos(i*Math.PI/16)*r,z:p.z+Math.sin(i*Math.PI/16)*r})));
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const src=[poly(raw.points,raw.holes)];

test('Ainsworth retains map geometry and missing level tags separately from planning-derived maximum',()=>{
 const b=CAMPUS.buildings.find(b=>b.id===AINSWORTH_ID);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);assert.equal(b.levels,null);assert.equal(b.previousEstimate,9.6);assert.equal(b.previousVisualEstimate,24);assert.equal(b.heightSource,'derived');assert.ok(Math.abs(b.height+g.base-63.88)<1e-8);assert.deepEqual(b.heightReference,AINSWORTH_HEIGHT_REPORT);assert.match(b.heightNote,/not an as-built survey/);assert.equal(buildingAppearance(b).facade,'ainsworth');
 for(const id of ['ainsworth','ainsworth-detail','ainsworth-north-photo','ainsworth-foyer-photo','ainsworth-glazing-photo','ainsworth-planning-height','ainsworth-design-facades','ainsworth-north-panorama'])assert.ok(VISUAL_REFERENCES.some(r=>r.id===id));
 for(const id of ['osm-way-45563941','osm-way-202504062','osm-way-45489829'])assert.deepEqual(CAMPUS.paths.find(p=>p.id===id).points,SOURCE.paths.find(p=>p.id===id).points);
});

test('Old / new wings, ground recesses and roof phases each preserve the complete source perimeter',()=>{
 for(const parts of [AINSWORTH_UPPER,AINSWORTH_GROUND,AINSWORTH_ROOFS]){
  const union=clip.union(...parts.map(p=>poly(p.points,p.holes)));assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);
  for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++)assert.ok(area(clip.intersection([poly(parts[i].points,parts[i].holes)],[poly(parts[j].points,parts[j].holes)]))<1e-6);
 }
 assert.equal(AINSWORTH_UPPER.length,2);assert.equal(AINSWORTH_ROOFS.length,4);assert.equal(Math.max(...AINSWORTH_ROOFS.map(p=>p.rl)),63.88);
 for(const [kind,u,v] of [['north',-10,-18],['south',10,10]]){const p=framePoint(g.frame,u,v);assert.ok(AINSWORTH_UPPER.filter(p=>p.kind===kind).some(part=>area(clip.intersection([disc(p,.2)],[poly(part.points,part.holes)]))>.1));}
});

test('North colonnade and retained stepped route have standing / jumping clearance below the reconstruction',()=>{
 const occupied=AINSWORTH_GROUND.filter(p=>p.kind!=='arcade');
 for(let k=0;k<=80;k++){
  const p=framePoint(g.frame,-19+40*k/80,-28.6);
  for(const part of occupied){assert.ok(area(clip.intersection([disc(p,.4)],[poly(part.points,part.holes)]))<1e-6);for(let i=0;i<part.points.length;i++)assert.ok(distance(p,part.points[i],part.points[(i+1)%part.points.length])>.4);}
  assert.ok(g.soffitRL-g.floorAt(p)>3);
 }
 const route=SOURCE.paths.find(p=>p.id==='osm-way-45563941');for(let i=0;i<route.points.length-1;i++)for(let k=0;k<=40;k++){
  const a=route.points[i],c=route.points[i+1],p={x:a.x+(c.x-a.x)*k/40,z:a.z+(c.z-a.z)*k/40};assert.ok(g.soffitRL-terrainHeight(p.x,p.z)-.22>3);
  for(const part of occupied)assert.ok(area(clip.intersection([disc(p,.4)],[poly(part.points,part.holes)]))<1e-6);
 }
});

test('Reconstructed columns and low planted beds leave retained path widths clear',()=>{
 for(const col of g.columns)for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(col,path.points[i],path.points[i+1])>(path.width||3)/2+col.radius+.15,`column clears ${path.id}`);
 for(const bed of g.beds)for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)for(const p of bed.points)assert.ok(distance(p,path.points[i],path.points[i+1])>(path.width||3)/2+.25,`bed clears ${path.id}`);
});

test('Additional northern canopy stays outside occupied footprints with terrain headroom',()=>{
 for(const part of AINSWORTH_CANOPY){for(const b of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([poly(part.points,part.holes)],[poly(b.points,b.holes)]))<1e-6,`canopy clears ${b.id}`);
  for(const p of part.points)assert.ok(g.soffitRL-terrainHeight(p.x,p.z)-.22>3);
 }
});

test('Reconstructed arcade paving stays out of occupied ground and avoids source path meshes',()=>{
 for(const floor of AINSWORTH_PAVING){const shape=[poly(floor.points,floor.holes)];for(const part of AINSWORTH_GROUND.filter(p=>p.kind!=='arcade'))assert.ok(area(clip.intersection(shape,[poly(part.points,part.holes)]))<1e-6);
  for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){
   const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*(path.width||3)/2,nz=(c.x-a.x)/len*(path.width||3)/2;
   assert.ok(area(clip.intersection(shape,[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}])]))<1e-6);
  }
 }
});

test('Photo-led theatre / roof enclosures remain inside their intended mapped wings',()=>{
 const modern=AINSWORTH_UPPER.filter(p=>p.kind==='south').map(p=>poly(p.points,p.holes));assert.ok(area(clip.difference([disc(g.theatre.center,g.theatre.radius)],...modern))<1e-6);assert.ok(g.theatre.topRL<g.soffitRL);
 for(const part of AINSWORTH_ROOFS.filter(p=>['plant','lift'].includes(p.kind)))assert.ok(part.rl>g.bodyRoofRL);
 assert.equal(g.rows.length,5);assert.equal(g.northBays.length,5);for(const row of g.rows)assert.ok(row.high>row.low&&row.high<g.bodyRoofRL);
});

test('John Lions Garden boundary is unchanged, with safe tree and destination placement',()=>{
 const original=SOURCE.greens.find(p=>p.id==='osm-way-45489881'),garden=CAMPUS.greens.find(p=>p.id===original.id);assert.deepEqual(garden.points,original.points);
 for(const tree of g.trees){assert.ok(area(clip.difference([disc(tree,.6)],[poly(original.points)]))<1e-6);for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(tree,path.points[i],path.points[i+1])>(path.width||3)/2+.6);}
 for(const p of [g.arrival,g.northArrival,g.stairArrival,...g.trees])for(const b of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([disc(p,.6)],[poly(b.points,b.holes)]))<1e-6,`arrival / tree clears ${b.id}`);
});
