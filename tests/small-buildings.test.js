import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { REX_ID, REX_LINK_ID, SDN_ID, REX_VISUAL_HEIGHT, SDN_VISUAL_HEIGHT, SDN_CURRENT_NAME, rexGeometry, sdnGeometry } from '../dist/small-buildings-data.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight, buildingBase } from '../dist/terrain.js';
const get=id=>CAMPUS.buildings.find(b=>b.id===id),rex=get(REX_ID),link=get(REX_LINK_ID),sdn=get(SDN_ID);
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r=.4)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];

test('small-building height revisions retain their original estimated status, outlines and tags',()=>{
  for(const b of [rex,link,sdn]){const raw=SOURCE.buildings.find(q=>q.id===b.id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.levels,raw.levels);assert.equal(b.heightSource,'estimated');assert.equal(b.previousEstimate,9.6);assert.ok(buildingAppearance(b).source);}
  assert.equal(rex.height,REX_VISUAL_HEIGHT);assert.equal(sdn.height,SDN_VISUAL_HEIGHT);assert.ok(link.height<6);
});

test('SDN current identity retains its former name as searchable source evidence',()=>{
  assert.equal(sdn.name,SDN_CURRENT_NAME);assert.equal(sdn.mappedName,'SDN House at Pooh Corner');assert.ok(sdn.aliases.includes(sdn.mappedName));assert.ok(sdn.aliases.includes('House at Pooh Corner'));assert.ok(sdn.aliases.includes('N8'));assert.equal(sdn.campusRef,'N8');assert.match(sdn.nameSource.url,/sdn.org.au/);assert.equal(CAMPUS.landmarks.find(p=>p.id===SDN_ID).name,SDN_CURRENT_NAME);
});

test('theatre link uses its separately mapped footprint and clears its east-west walking route',()=>{
  const g=rexGeometry(rex,link);assert.equal(link.modelledWith,REX_ID);assert.deepEqual(g.bridge.points,link.points);assert.equal(g.bridge.base,buildingBase(link.points));assert.equal(link.height+g.bridge.base,g.bridge.roofRL);
  for(let k=0;k<=80;k++){const t=k/80,p={x:g.bridgeArrival.x+(g.bridgeTarget.x-g.bridgeArrival.x)*t,z:g.bridgeArrival.z+(g.bridgeTarget.z-g.bridgeArrival.z)*t};
    for(const b of CAMPUS.buildings){if(b.id===REX_LINK_ID)continue;assert.ok(area(clipping.intersection(circle(p,.35),poly(b.points,b.holes)))<1e-6,`route clears ${b.id}`);}
    if(area(clipping.intersection(circle(p),poly(link.points)))>1e-6)assert.ok(g.bridge.roofRL-.24-terrainHeight(p.x,p.z)-.225>2.5);
  }
});

test('SDN hall, entry wing and verandah partition the retained L-shaped outline exactly',()=>{
  const g=sdnGeometry(sdn),parts=g.regions.map(r=>poly(r.points)),union=clipping.union(...parts);
  assert.ok(area(clipping.difference(poly(sdn.points),union))<1e-6);assert.ok(area(clipping.difference(union,poly(sdn.points)))<1e-6);assert.ok(Math.abs(parts.reduce((s,p)=>s+area([p]),0)-area(union))<1e-6);
  assert.deepEqual(g.regions.map(p=>p.kind),['wing','hall','veranda']);
  for(const r of g.regions)for(const p of r.points){const h=g.roofAt(p,r.kind);assert.ok(h<=sdn.height+.001);assert.ok(h-r.floor>2.6);}
  const veranda=g.regions.find(r=>r.kind==='veranda');assert.ok(Math.min(...veranda.points.map(p=>g.base+g.roofAt(p,'veranda')-terrainHeight(p.x,p.z)))>2.5,'verandah roof has plausible clearance despite sloping site');
});

test('SDN reconstructed garden clears buildings and its fence stays off Southern Drive',()=>{
  const g=sdnGeometry(sdn),road=CAMPUS.paths.find(p=>p.name==='Southern Drive');
  for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(poly(g.yard),poly(b.points,b.holes)))<1e-6,`garden clears ${b.id}`);
  for(const t of g.trees){assert.ok(t.reconstructed);assert.ok(area(clipping.intersection(circle(t,1),poly(g.yard)))>3);for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(circle(t,1),poly(b.points,b.holes)))<1e-6,`garden tree clears ${b.id}`);}
  for(const edge of g.fences)for(const p of [edge.a,edge.b])for(let i=0;i<road.points.length-1;i++){const a=road.points[i],b=road.points[i+1],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>(road.width||6)/2+.5);}
});

test('low theatre roof and new exterior destinations respect retained source geometry',()=>{
  const g=rexGeometry(rex,link);for(const p of rex.points)assert.ok(g.roofAt(p)<rex.height&&g.base+g.roofAt(p)-terrainHeight(p.x,p.z)>2.4);
  for(const id of [REX_ID,SDN_ID,'rex-covered-link']){const p=CAMPUS.landmarks.find(q=>q.id===id);assert.ok(p);for(const b of CAMPUS.buildings){if(b.id===REX_LINK_ID)continue;assert.ok(area(clipping.intersection(circle(p),poly(b.points,b.holes)))<1e-6,`${id} clears ${b.id}`);}}
});
