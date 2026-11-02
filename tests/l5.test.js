import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {terrainHeight} from '../dist/terrain.js';
import {framePoint,frameRectangle} from '../dist/geometry.js';
import {L5_ID,L5_BUILDER,L5_GIS,l5Geometry} from '../dist/l5-data.js';
import {L5_PARTS,L5_FACES,L5_DECK} from '../dist/l5-parts.js';
const raw=RAW.buildings.find(b=>b.id===L5_ID),b=CAMPUS.buildings.find(b=>b.id===L5_ID),g=l5Geometry();
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const perimeter=geometry=>geometry.flat().reduce((s,r)=>s+r.reduce((n,p,i)=>{const q=r[(i+1)%r.length];return n+Math.hypot(q[0]-p[0],q[1]-p[1]);},0),0);
const disc=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i/24*Math.PI*2)*r,p.z+Math.sin(i/24*Math.PI*2)*r])];

test('L5 preserves its mapped outline and height while separating builder component counts and GIS fields',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,30);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,9);assert.deepEqual(b.builderUpperFloors,[6,3]);assert.equal(L5_BUILDER.eastFloors,6);assert.equal(L5_GIS.floorCount,10);assert.equal(L5_GIS.heightField,27.67);assert.equal(b.name,'UNSW College · L5');assert.ok(CAMPUS.landmarks.some(p=>p.id===L5_ID));
});

test('L5 composite stays inside the source outline and keeps its elevated central court open',()=>{
 const union=clip.union(...L5_PARTS.map(poly));assert.ok(area(clip.xor(union,poly(raw)))<1e-6);
 const upper=L5_PARTS.filter(p=>p.height>g.deck),upperShape=clip.union(...upper.map(poly));assert.ok(area(clip.intersection(upperShape,poly(g.court)))<1e-6);
 for(const deck of L5_DECK){assert.ok(area(clip.difference(poly(deck),poly(raw)))<1e-6);assert.ok(area(clip.intersection(poly(deck),upperShape))<1e-6);}
 assert.ok(L5_PARTS.some(p=>p.kind==='west-wing'&&p.rows===3&&p.height<g.roof));assert.equal(g.maximum,raw.height);
});

test('L5 exposed facades match occupied perimeter at podium, entry and both wing levels',()=>{
 for(const h of [2,6,10,18,28]){const parts=L5_PARTS.filter(p=>p.minHeight<h&&p.height>h),expected=perimeter(clip.union(...parts.map(poly))),actual=L5_FACES.filter(p=>p.bottom<h&&p.top>h).reduce((s,p)=>s+Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),0);assert.ok(Math.abs(expected-actual)<1e-4,`${h}: ${expected} vs ${actual}`);}
});

test('the full-width L5 stair rises above coarse terrain and preserves standing clearance into the deck',()=>{
 const s=g.stair;assert.equal(s.width,10.8);assert.ok((s.h1-s.h0)/s.count<.18);assert.equal(s.h1,g.deckRL);
 for(let i=0;i<=80;i++)for(const side of [-.4,0,.4]){const t=i/80,p={x:s.a.x+(s.b.x-s.a.x)*t+g.frame.v.x*s.width*side,z:s.a.z+(s.b.z-s.a.z)*t+g.frame.v.z*s.width*side},y=s.h0+(s.h1-s.h0)*Math.floor(t*s.count)/s.count+.075;
 assert.ok(terrainHeight(p.x,p.z)<y+.02,'visible treads above DEM');
 for(const part of L5_PARTS.filter(p=>p.minHeight<y-g.base+2.1&&p.height>y-g.base+.2))assert.ok(area(clip.intersection(disc(p,.3),poly(part)))<1e-6,'entry corridor fits the player');
 }
 assert.ok(8.8-g.deck>2.2,'upper bridge clears court entry');
 for(let u=-7.9;u<7;u+=1)for(let v=-18;v<18;v+=1){const p=framePoint(g.frame,u,v);assert.ok(terrainHeight(p.x,p.z)<g.deckRL);}
});

test('L5 exterior arrivals, seating and retained street paths avoid occupied ground',()=>{
 const ground=clip.union(...L5_PARTS.filter(p=>!p.minHeight).map(poly));
 for(const p of [g.arrival,g.frontView,g.westView]){assert.ok(area(clip.intersection(ground,disc(p,.35)))<1e-6);for(const other of RAW.buildings.filter(b=>b.id!==L5_ID&&!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,.35),poly(other)))<1e-6);}
 for(const id of ['osm-way-1099978877','osm-way-1099978880']){const path=RAW.paths.find(p=>p.id===id);assert.deepEqual(CAMPUS.paths.find(p=>p.id===id).points,path.points);
  for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i],n=Math.ceil(Math.hypot(c.x-a.x,c.z-a.z)/.5);for(let j=0;j<=n;j++){const t=j/n,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};assert.ok(area(clip.intersection(ground,disc(p,path.width/2)))<1e-6,'full source footway width remains open');}}
 }
 for(const bench of g.benches)assert.ok(area(clip.difference(poly(bench),poly(g.court)))<1e-6);
 for(const p of g.planters)assert.ok(area(clip.difference(disc(p,p.radius),poly(g.court)))<1e-6);
 const entrance={points:frameRectangle(g.frame,17.75,g.stair.width,16.275,-8.8)};for(const bench of g.benches)assert.ok(area(clip.intersection(poly(bench),poly(entrance)))<1e-6);
});
