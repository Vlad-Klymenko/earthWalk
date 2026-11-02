import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { BUSINESS_ID, BUSINESS_ARCHITECT, businessGeometry, businessCanopyFaces } from '../dist/business-data.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { terrainHeight } from '../dist/terrain.js';
const b=CAMPUS.buildings.find(b=>b.id===BUSINESS_ID),raw=SOURCE.buildings.find(q=>q.id===b.id),g=businessGeometry(b);
const poly=points=>[points.map(p=>[p.x,p.z])];
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const ribbon=(a,c,width)=>{const len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2;return poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}]);};

test('Business School retains mapped dimensions independently of architectural floor evidence',()=>{
  assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);assert.equal(b.height,32);assert.equal(b.levels,8);assert.equal(b.heightSource,'mapped');assert.equal(b.architectStoreys,BUSINESS_ARCHITECT.describedStoreys);assert.equal(b.architectStoreys,6);assert.equal(b.photoWindowRows,6);assert.equal(buildingAppearance(b).facade,'business-school');
  assert.equal(g.rows.length,6);for(const row of g.rows){assert.ok(row.high>row.low);assert.ok(row.high<g.roof-.5);}assert.equal(g.roof,32);
  assert.ok(['north-shades','south-grid','west-cladding','east-brick','stair-core'].every(kind=>g.faces.some(f=>f.kind===kind)));
});

test('the bounded entrance flight and landing stay outside occupied buildings and mapped footways',()=>{
  for(const part of [...g.stairs.steps,g.stairs.landing]){
    for(const other of SOURCE.buildings)assert.ok(area(clip.intersection(poly(part.points),poly(other.points)))<1e-6,`stair clears ${other.id}`);
    for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(area(clip.intersection(poly(part.points),ribbon(path.points[i],path.points[i+1],(path.width||3)+.68)))<1e-6,`treads leave player clearance along ${path.id}`);
  }
  const union=clip.union(...[...g.stairs.steps,g.stairs.landing].map(p=>poly(p.points)));
  assert.ok(area(clip.difference(poly(g.stairs.arena),union))<1e-6);assert.ok(area(clip.difference(union,poly(g.stairs.arena)))<1e-6);
});

test('entrance treads meet the landing with usable risers and canopy headroom',()=>{
  assert.equal(g.stairs.count,7);assert.equal(g.stairs.steps.length,7);assert.ok(g.stairs.rise/g.stairs.count<.17);assert.ok((g.stairs.bottomV-g.stairs.topV)/g.stairs.count>.30);
  for(let i=1;i<g.stairs.steps.length;i++)assert.ok(Math.abs(g.stairs.steps[i].rl-g.stairs.steps[i-1].rl-.15)<1e-7);
  assert.ok(Math.abs(g.stairs.landing.rl-g.stairs.steps.at(-1).rl-.15)<1e-7);
  const first=g.stairs.steps[0];for(const p of first.points){const difference=first.rl+.01-(terrainHeight(p.x,p.z)+.22);assert.ok(difference>-.02&&difference<.27,'bottom step is reachable from normal paving');}
  for(const part of [...g.stairs.steps,g.stairs.landing])for(const p of part.points){const v=g.local(p).v;if(v>g.canopy.frontV)continue;const t=(v-g.canopy.backV)/(g.canopy.frontV-g.canopy.backV),roof=g.base+g.canopy.backBottom+(g.canopy.frontBottom-g.canopy.backBottom)*t;assert.ok(roof-part.rl>3.05,'standing and jump headroom beneath sloping canopy');}
});

test('Business School arrivals and estimated forecourt seats clear all occupied footprints',()=>{
  for(const id of [BUSINESS_ID,'business-south-grid','business-west-steps']){
    const p=CAMPUS.landmarks.find(q=>q.id===id);assert.ok(p);const circle=poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*.4,z:p.z+Math.sin(i*Math.PI/12)*.4})));
    for(const other of SOURCE.buildings)assert.ok(area(clip.intersection(circle,poly(other.points)))<1e-6,`${id} clears ${other.id}`);
  }
  assert.equal(g.benches.length,2);
  for(const seat of g.benches){const p=poly(Array.from({length:24},(_,i)=>({x:seat.x+Math.cos(i*Math.PI/12)*1.4,z:seat.z+Math.sin(i*Math.PI/12)*1.4})));for(const other of SOURCE.buildings)assert.ok(area(clip.intersection(p,poly(other.points)))<1e-6);}
});


test('sloping entrance canopy faces point outward so its deep fascia is visible',()=>{
  const mesh=businessCanopyFaces(g),normal=face=>{const [a,b,c]=face,u=b.map((v,i)=>v-a[i]),v=c.map((v,i)=>v-a[i]);return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];};
  assert.ok(normal(mesh.top)[1]>0);assert.ok(normal(mesh.bottom)[1]<0);
  const centre=[...mesh.top,...mesh.bottom].reduce((a,p)=>a.map((v,i)=>v+p[i]/8),[0,0,0]);
  for(const face of mesh.sides){const n=normal(face),mid=face.reduce((a,p)=>a.map((v,i)=>v+p[i]/4),[0,0,0]);assert.ok(n.reduce((s,v,i)=>s+v*(mid[i]-centre[i]),0)>0,'fascia normal points away from canopy interior');}
});
