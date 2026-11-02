import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {MATHEWS_PAVILIONS_ID,mathewsPavilionsGeometry} from '../dist/mathews-pavilions-data.js';
import {MATHEWS_PAVILION_ROOFS,MATHEWS_PAVILION_STRIPS,MATHEWS_PAVILION_ROOMS,MATHEWS_PAVILION_PAVING} from '../dist/mathews-pavilions-parts.js';
import {terrainHeight} from '../dist/terrain.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const raw=RAW.buildings.find(b=>b.id===MATHEWS_PAVILIONS_ID),b=CAMPUS.buildings.find(b=>b.id===MATHEWS_PAVILIONS_ID),g=mathewsPavilionsGeometry();
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=p=>p.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const disc=(p,r=.34)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*r,p.z+Math.sin(i/32*Math.PI*2)*r])];
const ribbon=(a,c,w)=>{const dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz),nx=dz/l*w/2,nz=-dx/l*w/2;return [[[a.x+nx,a.z+nz],[c.x+nx,c.z+nz],[c.x-nx,c.z-nz],[a.x-nx,a.z-nz]]];};

test('Mathews Pavilions keeps roof geometry and missing source levels independent of fitted height',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(raw.height,9.6);assert.equal(b.previousEstimate,9.6);assert.equal(b.previousVisualEstimate,3.8);assert.equal(b.heightSource,'estimated');assert.equal(b.height,g.maximum);assert.equal(b.levels,null);assert.equal(b.walkableUnder,true);assert.equal(b.campusRef,'E24');assert.equal(b.name,'Mathews Pavilions');assert.ok(g.maximum>5&&g.maximum<8);
 for(const id of [MATHEWS_PAVILIONS_ID,'mathews-pavilions-court','mathews-pavilions-west-walk'])assert.ok(CAMPUS.landmarks.some(p=>p.id===id));
});
test('curved pavilion partitions exactly cover the roof while retaining its open courtyard',()=>{
 const source=poly(raw),roofUnion=clip.union(...MATHEWS_PAVILION_ROOFS.map(poly)),stripUnion=clip.union(...MATHEWS_PAVILION_STRIPS.map(poly));assert.ok(area(clip.xor(source,roofUnion))<1e-5);assert.ok(area(clip.xor(source,stripUnion))<1e-5);
 assert.ok(Math.abs(MATHEWS_PAVILION_ROOFS.reduce((s,p)=>s+area([poly(p)]),0)-area([source]))<1e-5);assert.ok(Math.abs(MATHEWS_PAVILION_STRIPS.reduce((s,p)=>s+area([poly(p)]),0)-area([source]))<1e-5);
 for(const p of MATHEWS_PAVILION_STRIPS){assert.ok(area(clip.intersection(poly(p),poly({points:raw.holes[0]})))<1e-6);const vertices=[...p.points,...p.holes.flat()],tri=ShapeUtils.triangulateShape(p.points.map(q=>new Vector2(q.x,q.z)),p.holes.map(r=>r.map(q=>new Vector2(q.x,q.z))));const total=tri.reduce((s,t)=>s+area([poly({points:t.map(i=>vertices[i])})]),0);assert.ok(Math.abs(total-area([poly(p)]))<1e-5);}
});
test('pavilion curves meet at their hips and retain standing clearance over sampled real terrain',()=>{
 for(const kind of ['west','east'])for(const v of [-7.6,13.5]){const p=g.at(kind==='west'?-15.3:17.8,v),other=v<0?'north':'south';assert.ok(Math.abs(g.roofAt(kind,p)-g.roofAt(other,p))<1e-7,'joined roof boundaries meet');}
 for(const part of MATHEWS_PAVILION_STRIPS){for(const p of [...part.points,part.points.reduce((s,p)=>({x:s.x+p.x/part.points.length,z:s.z+p.z/part.points.length}),{x:0,z:0})]){const rl=g.roofAt(part.kind,p);assert.ok(Number.isFinite(rl));assert.ok(rl<=g.peakRL+1e-6);assert.ok(rl-.18-terrainHeight(p.x,p.z)>2.4,'estimated soffits clear regional terrain');}}
});
test('fitted glazed rooms, paving and roof supports leave neighbours and source path widths clear',()=>{
 for(const room of MATHEWS_PAVILION_ROOMS){assert.ok(area(clip.difference(poly(room),poly(raw)))<1e-6);assert.ok(area(clip.intersection(poly(room),poly({points:raw.holes[0]})))<1e-6);for(const other of RAW.buildings.filter(b=>b.id!==raw.id&&!b.walkableUnder))assert.ok(area(clip.intersection(poly(room),poly(other)))<1e-6);}
 for(const p of MATHEWS_PAVILION_PAVING){assert.ok(area(clip.intersection(poly(p),poly(g.planter)))<1e-6);for(const other of RAW.buildings.filter(b=>b.id!==raw.id&&!b.walkableUnder))assert.ok(area(clip.intersection(poly(p),poly(other)))<1e-6);}
 const protectedPaths=RAW.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.frame.x,p.z-g.frame.z)<45));
 for(const path of protectedPaths){assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id).points,path.points);for(let i=1;i<path.points.length;i++){const shape=ribbon(path.points[i-1],path.points[i],path.width);for(const p of g.columns)assert.ok(area(clip.intersection(disc(p,.2),shape))<1e-6,'full width of source paths stays clear of column bases');for(const room of MATHEWS_PAVILION_ROOMS)assert.ok(area(clip.intersection(poly(room),shape))<1e-6,'glazed rooms do not seal a source route');}}
 for(const p of g.columns){assert.ok(inside(p,raw.points));assert.ok(!raw.holes.some(r=>inside(p,r)));}
});
test('courtyard planting and furniture stay inside the mapped opening with clear arrivals',()=>{
 const hole=poly({points:raw.holes[0]});assert.ok(area(clip.difference(poly(g.planter),hole))<1e-6);
 for(const p of [...g.benches,...g.pots]){assert.ok(inside(p,raw.holes[0]));assert.ok(area(clip.intersection(disc(p,.4),poly(g.planter)))<1e-6);}
 for(const p of [g.arrival,g.courtArrival,g.linkArrival]){for(const room of MATHEWS_PAVILION_ROOMS)assert.ok(area(clip.intersection(disc(p),poly(room)))<1e-6);for(const other of RAW.buildings.filter(b=>b.id!==raw.id&&!b.walkableUnder))assert.ok(area(clip.intersection(disc(p),poly(other)))<1e-6);assert.ok(area(clip.intersection(disc(p),poly(g.planter)))<1e-6);}
});

test('the courtyard arrival faces a usable corridor past benches and potted plants',()=>{
 const walk=poly({points:g.rect(10.4-.34,10.4+.34,-9.7,9.2)});
 for(const room of MATHEWS_PAVILION_ROOMS)assert.ok(area(clip.intersection(walk,poly(room)))<1e-6);
 assert.ok(area(clip.intersection(walk,poly(g.planter)))<1e-6);
 for(const p of [...g.pots,...g.columns])assert.ok(area(clip.intersection(walk,disc(p,p.radius)))<1e-6);
 for(const p of g.benches){const points=p.along==='v'?g.rect(p.u-.36,p.u+.36,p.v-p.length/2,p.v+p.length/2):g.rect(p.u-p.length/2,p.u+p.length/2,p.v-.36,p.v+.36);assert.ok(area(clip.intersection(walk,poly({points})))<1e-6);}
});
