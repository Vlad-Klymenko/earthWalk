import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { REGIMENT_J2_IDS,REGIMENT_STREET,regimentGeometry,regimentFootwayPoint } from '../dist/regiment-data.js';
import { terrainHeight } from '../dist/terrain.js';
import { frameRectangle } from '../dist/geometry.js';
import { buildingAppearance } from '../dist/visual-data.js';
const poly=(p,holes=[])=>[p,...holes].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:40},(_,i)=>({x:p.x+Math.cos(i*Math.PI/20)*r,z:p.z+Math.sin(i*Math.PI/20)*r})));
const segmentDistance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};

test('J2 wings retain original outlines, level evidence and estimated height while gaining distinct searchable identities',()=>{
 for(const id of REGIMENT_J2_IDS){const raw=SOURCE.buildings.find(b=>b.id===id),b=CAMPUS.buildings.find(b=>b.id===id),before=JSON.stringify(raw),g=regimentGeometry(raw);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(raw.name,'J2');assert.equal(b.height,6.4);assert.equal(b.levels,2);assert.equal(b.heightSource,'estimated');assert.equal(JSON.stringify(raw),before);assert.match(b.heightNote,/no measured height/);assert.equal(buildingAppearance(b).source,'regiment-day-avenue');assert.equal(g.southWindows,g.east?1:5);}
 const places=CAMPUS.landmarks.filter(p=>REGIMENT_J2_IDS.includes(p.id));assert.equal(new Set(places.map(p=>p.name)).size,2);assert.ok(places.every(p=>p.name.includes('UNSW Regiment 2')));
});

test('J2 shallow roofs retain their source perimeter and eastern hood clears buildings and source footways',()=>{
 for(const id of REGIMENT_J2_IDS){const b=SOURCE.buildings.find(b=>b.id===id),g=regimentGeometry(b);for(const p of b.points)assert.ok(Math.abs(g.roofHeight(p)-g.eave)<.015);for(let i=0;i<=30;i++)for(let j=0;j<=30;j++){const u=(i/30-.5)*g.frame.width,v=(j/30-.5)*g.frame.length,p={x:g.frame.x+u*g.frame.u.x+v*g.frame.v.x,z:g.frame.z+u*g.frame.u.z+v*g.frame.v.z},h=g.roofHeight(p);assert.ok(h>=g.eave-1e-8&&h<=b.height+1e-8);}
 if(g.hood){for(const p of g.hood.points)assert.ok(g.base+g.hood.bottom-terrainHeight(p.x,p.z)-.22>2.1);for(const other of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([poly(g.hood.points)],[poly(other.points,other.holes)]))<1e-5,`hood clears ${other.id}`);}
 }
});

test('Day Avenue fence and planted street edge preserve every mapped path and occupied footprint',()=>{
 const shapes=[...REGIMENT_STREET.trees.map(p=>({points:disc(p,.65),p,r:.65})),...REGIMENT_STREET.shrubs.map(p=>({points:disc(p,p.radius),p,r:p.radius}))];
 const [a,b]=REGIMENT_STREET.fence,len=Math.hypot(b.x-a.x,b.z-a.z),u={x:(b.x-a.x)/len,z:(b.z-a.z)/len},v={x:-u.z,z:u.x};
 shapes.push({points:poly(frameRectangle({x:(a.x+b.x)/2,z:(a.z+b.z)/2,u,v},len,.12))});
 for(const s of shapes){for(const b of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([s.points],[poly(b.points,b.holes)]))<1e-6,`street furniture clears ${b.id}`);
 for(const path of SOURCE.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],len=Math.hypot(b.x-a.x,b.z-a.z);if(!len)continue;const frame={x:(a.x+b.x)/2,z:(a.z+b.z)/2,u:{x:-(b.z-a.z)/len,z:(b.x-a.x)/len},v:{x:(b.x-a.x)/len,z:(b.z-a.z)/len}};assert.ok(area(clip.intersection([s.points],[poly(frameRectangle(frame,(path.width||3)+.6,len))]))<1e-6,`street edge clears ${path.id}`);}}
 assert.ok(REGIMENT_STREET.trees.length>=6);assert.ok(REGIMENT_STREET.shrubs.length>20);
});

test('J2 map arrivals remain on the public Day Avenue footway outside the reconstructed fence',()=>{
 const path=SOURCE.paths.find(p=>p.id===REGIMENT_STREET.sourcePath),[a,b]=REGIMENT_STREET.fence;
 for(const id of REGIMENT_J2_IDS){const p=CAMPUS.landmarks.find(p=>p.id===id),g=regimentGeometry(SOURCE.buildings.find(b=>b.id===id));assert.deepEqual({x:p.x,z:p.z},g.arrival);assert.ok(segmentDistance(p,path.points[0],path.points[1])<1e-6);assert.ok(segmentDistance(p,a,b)>1.5);for(const other of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([disc(p,.45)],[poly(other.points,other.holes)]))<1e-6);}
 assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id),path);const foot=regimentFootwayPoint(-360),bank=regimentFootwayPoint(-360,8);assert.ok(terrainHeight(bank.x,bank.z)-terrainHeight(foot.x,foot.z)>.5,'retained rise from footway to planted bank is not flattened');
});
