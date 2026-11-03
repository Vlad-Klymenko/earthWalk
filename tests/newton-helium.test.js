import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {NEWTON_ID} from '../dist/physics-precinct-data.js';
import {OLD_MAIN_ROOFS} from '../dist/old-main-front-parts.js';
import {HELIUM_BODIES,HELIUM_BUILDINGS,HELIUM_OLD_ANNEX,HELIUM_WORK,HELIUM_BED,HELIUM_CHILLER,HELIUM_SHRUBS,HELIUM_VIEW,HELIUM_FLOOR,heliumAnnexFace,heliumPoint,inHeliumWork} from '../dist/newton-helium-data.js';
import {HELIUM_GROUND,HELIUM_PAVING,HELIUM_SOIL,HELIUM_MESH,HELIUM_OLD_MAIN_ROOFS} from '../dist/newton-helium-parts.js';
import {heliumWalkingHeight} from '../dist/newton-helium-ground.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=g=>g.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,r)=>s+ringArea(r),0),0),shape=ps=>clip.union(...ps.map(poly)),occupied=shape(RAW.buildings.filter(b=>!b.walkableUnder));
const inside=(q,ring)=>{let c=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++)if((ring[i][1]>q.z)!==(ring[j][1]>q.z)&&q.x<(ring[j][0]-ring[i][0])*(q.z-ring[i][1])/(ring[j][1]-ring[i][1])+ring[i][0])c=!c;return c;};
const ribbon=(a,c,w)=>{const dx=c.x-a.x,dz=c.z-a.z,L=Math.hypot(dx,dz),x=-dz/L*w/2,z=dx/L*w/2;return {points:[{x:a.x+x,z:a.z+z},{x:c.x+x,z:c.z+z},{x:c.x-x,z:c.z-z},{x:a.x-x,z:a.z-z}]};};
test('new completed-project geometry stays separate from the original map records',()=>{
 for(const id of [NEWTON_ID,'osm-way-45490050']){const raw=RAW.buildings.find(b=>b.id===id),b=CAMPUS.buildings.find(b=>b.id===id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,raw.height);assert.equal(b.levels,raw.levels);}
 for(const b of HELIUM_BUILDINGS){assert.ok(CAMPUS.buildings.some(p=>p.id===b.id));assert.equal(RAW.buildings.some(p=>p.id===b.id),false);assert.equal(b.heightSource,'estimated');assert.equal(b.reconstructed,true);assert.match(b.heightQuantity,/fitted slab/);assert.equal(b.levels,null);assert.match(b.heightNote,/not measured/);}
 assert.ok(Number.isFinite(HELIUM_FLOOR));
});
test('fitted enclosures, equipment and planting clear original occupied rooms and full public path widths',()=>{
 for(const item of [...HELIUM_BODIES,HELIUM_CHILLER,HELIUM_BED]){
  assert.ok(area(clip.intersection(poly(item),occupied))<1e-7);
  for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){
   const a=path.points[i-1],c=path.points[i];if(Math.hypot(a.x-c.x,a.z-c.z)<1e-6)continue;
   assert.ok(area(clip.intersection(poly(item),poly(ribbon(a,c,path.width))))<1e-7,path.id+' / '+(item.id||'equipment or bed'));
  }
 }
 for(const b of HELIUM_BODIES){const h=b.opening;assert.ok(h.u0>b.u0&&h.u1<b.u1);assert.ok(h.top<b.height);assert.ok(h.depth>0&&h.depth<b.v1-b.v0);}
});
test('low service annex uses its exact source vertices and replaces only that part of the tall roof',()=>{
 const old=RAW.buildings.find(b=>b.id==='osm-way-45490050');assert.deepEqual(HELIUM_OLD_ANNEX.points,[old.points[6],old.points[7],old.points[8],old.points[9]]);
 const before=shape(Object.values(OLD_MAIN_ROOFS).flat()),after=shape(Object.values(HELIUM_OLD_MAIN_ROOFS).flat()),annex=poly(HELIUM_OLD_ANNEX);
 assert.ok(area(clip.difference(annex,poly(old)))<1e-7);assert.ok(area(clip.intersection(after,annex))<1e-7);assert.ok(area(clip.xor(before,clip.union(after,annex)))<1e-7);
 assert.ok(Math.abs(area(before)-area(after)-area([annex]))<1e-7);
 for(let i=0;i<3;i++){const a=HELIUM_OLD_ANNEX.points[i],c=HELIUM_OLD_ANNEX.points[i+1];assert.equal(heliumAnnexFace(a,c),true);assert.equal(heliumAnnexFace(c,a),true);}
 assert.equal(heliumAnnexFace(old.points[9],old.points[6]),false);assert.equal(heliumAnnexFace(old.points[0],old.points[1]),false);
});
test('apron partitions avoid occupied volumes and keep soil and paving disjoint',()=>{
 const ground=shape(HELIUM_GROUND),paving=shape(HELIUM_PAVING),soil=shape(HELIUM_SOIL),newOccupied=shape([...HELIUM_BODIES,HELIUM_CHILLER]);
 assert.ok(area(clip.intersection(ground,occupied))<1e-7);assert.ok(area(clip.intersection(ground,newOccupied))<1e-7);assert.ok(area(clip.difference(ground,poly(HELIUM_WORK)))<1e-7);
 assert.ok(area(clip.intersection(paving,soil))<1e-7);assert.ok(area(clip.xor(ground,clip.union(paving,soil)))<1e-7);assert.ok(area(clip.difference(soil,poly(HELIUM_BED)))<1e-7);
 let sum=0;for(const tri of HELIUM_MESH){assert.ok(tri.points.every(p=>Object.values(p).every(Number.isFinite)));const [a,b,c]=tri.points;assert.ok((b.z-a.z)*(c.x-a.x)-(b.x-a.x)*(c.z-a.z)>1e-12,'upward face');sum+=area([poly(tri)]);const q={x:(a.x+b.x+c.x)/3,z:(a.z+b.z+c.z)/3};assert.ok((tri.kind==='soil'?soil:paving).some(part=>inside(q,part[0])&&!part.slice(1).some(r=>inside(q,r))));}
 assert.ok(Math.abs(sum-area(ground))<1e-6);
});
test('walking uses the exact visible apron triangles at weighted interior samples',()=>{
 for(const tri of HELIUM_MESH)for(const w of [[.2,.3,.5],[.1,.7,.2]]){const p=tri.points.reduce((a,p,i)=>({x:a.x+p.x*w[i],y:a.y+p.y*w[i],z:a.z+p.z*w[i]}),{x:0,y:0,z:0});assert.ok(Math.abs(heliumWalkingHeight(p.x,p.z)-p.y)<1e-7);}
});
test('arrival clears buildings and source routes / inventory tree roots remain unchanged',()=>{
 const view=HELIUM_VIEW;assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));
 for(let i=0;i<16;i++){const x=view.x+Math.cos(i*Math.PI/8)*.4,z=view.z+Math.sin(i*Math.PI/8)*.4,p={points:[{x:x-.01,z:z-.01},{x:x+.01,z:z-.01},{x:x+.01,z:z+.01},{x:x-.01,z:z+.01}]};assert.equal(clip.intersection(poly(p),occupied).length,0);assert.equal(clip.intersection(poly(p),shape([...HELIUM_BODIES,HELIUM_CHILLER])).length,0);}
 for(const path of RAW.paths)assert.ok(CAMPUS.paths.some(p=>p.id===path.id&&p.width===path.width&&JSON.stringify(p.points)===JSON.stringify(path.points)),path.id);
 assert.equal(TREE_INVENTORY.filter(t=>inHeliumWork(t.x,t.z)).length,0);
 for(const shrub of HELIUM_SHRUBS){assert.equal(shrub.reconstructed,true);assert.ok(Number.isFinite(heliumWalkingHeight(shrub.x,shrub.z)));}
 const p=heliumPoint(-1,51);assert.equal(p.x,view.x);assert.equal(p.z,view.z);
});
