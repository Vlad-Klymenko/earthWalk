import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { VILLAGE_CAFE_ID,VILLAGE_CAFE_HEIGHT,villageCafeGeometry } from '../dist/village-cafe-data.js';
import { VILLAGE_CAFE_DECK } from '../dist/village-cafe-parts.js';
import { terrainHeight } from '../dist/terrain.js';
import { framePoint,frameRectangle } from '../dist/geometry.js';
const raw=SOURCE.buildings.find(b=>b.id===VILLAGE_CAFE_ID),b=CAMPUS.buildings.find(b=>b.id===VILLAGE_CAFE_ID),g=villageCafeGeometry(b);
const poly=(p,h=[])=>[p,...h].map(r=>r.map(p=>[p.x,p.z]));
const shape=p=>poly(p.points,p.holes);
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:48},(_,i)=>({x:p.x+Math.cos(i*Math.PI/24)*r,z:p.z+Math.sin(i*Math.PI/24)*r})));
const occupied=SOURCE.buildings.filter(b=>!b.walkableUnder);

test('Village Café replaces an unsupported generic height while preserving source outline, tags and missing level count',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(raw.height,9.6);assert.equal(b.previousEstimate,9.6);assert.equal(b.height,VILLAGE_CAFE_HEIGHT);assert.equal(b.heightSource,'estimated');assert.equal(b.levels,null);assert.match(b.heightNote,/no surveyed height/);assert.equal(g.floor,g.base+.55);assert.equal(b.heightQuantity,'Kiosk roof above reconstructed deck floor');
 const before=JSON.stringify(raw);villageCafeGeometry(raw);assert.equal(JSON.stringify(raw),before);
});

test('Village Café deck and five-tread entrance remain outside occupied buildings and retained path widths',()=>{
 assert.ok(area(VILLAGE_CAFE_DECK.map(shape))>100);assert.equal(g.stairs.steps.length,5);let previous=g.stairs.lowRL;
 for(const step of g.stairs.steps){assert.ok(step.rl>previous&&step.rl-previous<=.171);previous=step.rl;}assert.ok(Math.abs(previous-g.floor)<1e-8);assert.equal(g.stairs.lowRL,terrainHeight(g.stairs.bottom.x,g.stairs.bottom.z)+.22);
 for(const p of [...VILLAGE_CAFE_DECK,...g.stairs.steps]){for(const other of occupied)assert.ok(area(clip.intersection([shape(p)],[shape(other)]))<1e-6,`new ground clears ${other.id}`);
 for(const path of SOURCE.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],len=Math.hypot(b.x-a.x,b.z-a.z);if(!len)continue;const f={x:(a.x+b.x)/2,z:(a.z+b.z)/2,u:{x:-(b.z-a.z)/len,z:(b.x-a.x)/len},v:{x:(b.x-a.x)/len,z:(b.z-a.z)/len}};assert.ok(area(clip.intersection([shape(p)],[poly(frameRectangle(f,path.width||3,len))]))<1e-6,`new ground clears ${path.id}`);}}
});

test('Village Café canopies and supports remain above the deck with outdoor standing clearance',()=>{
 for(const canopy of g.canopies){assert.ok(canopy.eave-g.floor>2.3);assert.ok(canopy.peak>canopy.eave);assert.ok(area(clip.difference([poly(canopy.points)],VILLAGE_CAFE_DECK.map(shape)))<1e-6,'canopy lies over the reconstructed deck');for(const other of occupied)assert.ok(area(clip.intersection([poly(canopy.points)],[shape(other)]))<1e-6);}
 for(const p of g.canopyPosts){assert.ok(p.top-g.floor>2.3);for(const b of occupied)assert.ok(area(clip.intersection([disc(p,.08)],[shape(b)]))<1e-6);}
});

test('Village Café furniture leaves a continuous entrance and serving-side walking route',()=>{
 const furniture=[{...g.tree,radius:g.tree.planterRadius},...g.canopyPosts.map(p=>({...p,radius:.075})),...g.tables.flatMap(p=>[p,...p.chairs])];
 for(const p of furniture){assert.ok(area(clip.difference([disc(p,p.radius)],VILLAGE_CAFE_DECK.map(shape)))<1e-6,'furniture supported by deck');for(const b of occupied)assert.ok(area(clip.intersection([disc(p,p.radius)],[shape(b)]))<1e-6);}
 for(let i=0;i<=60;i++){const t=i/60,p={x:g.stairs.top.x+(g.target.x-g.stairs.top.x)*t,z:g.stairs.top.z+(g.target.z-g.stairs.top.z)*t};for(const q of furniture)assert.ok(Math.hypot(p.x-q.x,p.z-q.z)>q.radius+.4,'walkway clears furniture');assert.ok(area(clip.difference([disc(p,.33)],VILLAGE_CAFE_DECK.map(shape)))<.18,'entrance joins the retained deck');}
});

test('Village Café arrival stays outside occupied footprints and reaches the stair without moving source paths',()=>{
 const p=CAMPUS.landmarks.find(p=>p.id===VILLAGE_CAFE_ID);assert.deepEqual({x:p.x,z:p.z},g.arrival);for(const b of occupied)assert.ok(area(clip.intersection([disc(p,.4)],[shape(b)]))<1e-6);
 for(const path of SOURCE.paths.filter(p=>p.points.some(q=>Math.hypot(q.x-g.frame.x,q.z-g.frame.z)<35)))assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id),path);
 for(let i=0;i<10;i++){const p=framePoint(g.stairs.frame,0,-g.stairs.run*(1-i/10));for(const b of occupied)assert.ok(area(clip.intersection([disc(p,.34)],[shape(b)]))<1e-6);}
});
