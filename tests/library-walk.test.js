import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {LIBRARY_WALK_ID,libraryWalkGeometry} from '../dist/library-walk-data.js';
import {LIBRARY_WALK_ROOFS,LIBRARY_WALK_CELLS,LIBRARY_WALK_PAVING} from '../dist/library-walk-parts.js';
import {campusTerrainHeight as terrainHeight} from '../dist/spiral-landscape.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const raw=RAW.buildings.find(b=>b.id===LIBRARY_WALK_ID),b=CAMPUS.buildings.find(b=>b.id===LIBRARY_WALK_ID),g=libraryWalkGeometry();
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=p=>p.reduce((s,r)=>s+ra(r[0])-r.slice(1).reduce((s,r)=>s+ra(r),0),0);
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const disc=(p,r=.34)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*r,p.z+Math.sin(i/32*Math.PI*2)*r])];
const ribbon=(a,c,w)=>{const dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz),nx=dz/l*w/2,nz=-dx/l*w/2;return [[[a.x+nx,a.z+nz],[c.x+nx,c.z+nz],[c.x-nx,c.z-nz],[a.x-nx,a.z-nz]]];};

test('upper-campus covered walks retain source evidence and distinguish local cover height from the Library canopy',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(raw.height,9.6);assert.equal(b.previousEstimate,9.6);assert.equal(b.previousVisualEstimate,3.8);assert.equal(b.height,4.2);assert.equal(b.heightSource,'estimated');assert.equal(b.levels,null);assert.equal(b.modelledCanopyWith,'library');assert.equal(b.walkableUnder,true);
 for(const id of [LIBRARY_WALK_ID,'library-walk-crossing','library-east-covered-walk','library-west-covered-link'])assert.ok(CAMPUS.landmarks.some(p=>p.id===id));
});
test('network roof partitions and the single Library canopy retain the complete original roof outline',()=>{
 const roof=clip.union(...LIBRARY_WALK_ROOFS.map(poly)),canopy=poly(g.library.canopy),source=poly(raw),combined=clip.union(roof,canopy);assert.ok(area(clip.xor(source,combined))<1e-4);assert.ok(area(clip.intersection(roof,canopy))<1e-5,'the old flat cover cannot pass through the concrete canopy');
 assert.ok(Math.abs(LIBRARY_WALK_ROOFS.reduce((s,p)=>s+area([poly(p)]),0)+area([canopy])-area([source]))<1e-4);
 const cells=clip.union(...LIBRARY_WALK_CELLS.map(poly));assert.ok(area(clip.xor(roof,cells))<1e-4);assert.ok(Math.abs(LIBRARY_WALK_CELLS.reduce((s,p)=>s+area([poly(p)]),0)-area(roof))<1e-4);
});
test('curved / glazed roof cells triangulate and clear the retained terrain along every sampled edge',()=>{
 for(const cell of LIBRARY_WALK_CELLS){const all=[...cell.points,...cell.holes.flat()],tri=ShapeUtils.triangulateShape(cell.points.map(p=>new Vector2(p.x,p.z)),cell.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));let total=0;for(const t of tri)total+=area([poly({points:t.map(i=>all[i])})]);assert.ok(Math.abs(total-area([poly(cell)]))<1e-5);
  for(const p of [...all,all.reduce((s,p)=>({x:s.x+p.x/all.length,z:s.z+p.z/all.length}),{x:0,z:0})]){const offset=g.roofOffset(p);assert.ok(offset>=3.25-1e-7&&offset<=4.2+1e-7);assert.ok(g.roofAt(p)-.15-terrainHeight(p.x,p.z)-.23>2.8);}
 }
 assert.ok(LIBRARY_WALK_CELLS.some(p=>p.glazed&&p.junction));assert.ok(LIBRARY_WALK_CELLS.some(p=>!p.glazed));
});
test('Library entrance canopy uses actual mapped roof corners with a lower, longer curved flare',()=>{
 assert.deepEqual(g.library.canopy.points,[14,15,41,42].map(i=>raw.points[i]));assert.equal(g.library.canopy.eaveRL,59.8);assert.equal(g.library.canopy.lipRL,63.8);
 assert.ok(area(clip.difference(poly(g.library.canopy),poly(raw)))<1e-6);for(const p of g.library.canopy.points){const y=g.library.base+g.library.canopy.heightAt(p);assert.ok(y>=59.8-1e-7&&y<=63.8+1e-7);assert.ok(y-g.library.canopy.thickness-terrainHeight(p.x,p.z)-.23>3.2);}
 for(const column of g.library.columns)assert.ok(area(clip.difference(poly(column),poly(g.library.canopy)))<1e-6,'piers fit under the mapped canopy');
});
test('new steel bases and benches retain full source path widths and avoid occupied buildings',()=>{
 for(const p of g.columns){assert.ok(inside(p,raw.points));assert.ok(!inside(p,g.library.canopy.points));for(const other of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,.27),poly(other)))<1e-6);}
 const nearby=RAW.paths.filter(path=>path.points.some(p=>{const q=g.local(p);return q.u>-78&&q.u<78&&q.v>-80&&q.v<80;}));
 for(const path of nearby){assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id).points,path.points);for(let i=1;i<path.points.length;i++){const shape=ribbon(path.points[i-1],path.points[i],path.width);for(const p of g.columns)assert.ok(area(clip.intersection(disc(p,.27),shape))<1e-6,'steel base clears the whole mapped path width');for(const p of g.benches)assert.ok(area(clip.intersection(poly({points:g.rect(p.u-.38,p.u+.38,p.v-1.35,p.v+1.35)}),shape))<1e-6,'bench clears the whole source route');}}
});
test('new paving avoids original stairs and building interiors while map arrivals remain clear',()=>{
 for(const part of LIBRARY_WALK_PAVING){for(const other of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(poly(part),poly(other)))<1e-5);for(const path of RAW.paths.filter(p=>p.kind==='steps'))for(let i=1;i<path.points.length;i++)assert.ok(area(clip.intersection(poly(part),ribbon(path.points[i-1],path.points[i],path.width)))<1e-5,'original stair surfaces are not buried by a smooth apron');}
 for(const p of [g.arrival,g.crossArrival,g.eastArrival,g.westArrival]){for(const other of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(disc(p),poly(other)))<1e-6);for(const col of g.columns)assert.ok(Math.hypot(p.x-col.x,p.z-col.z)>.5);}
});

test('covered-roof height is continuous across internal branch endpoints',()=>{
 for(const branch of g.branches)for(const [end,taper]of [['start',branch.taperStart],['end',branch.taperEnd]]){if(!taper)continue;const value=branch.axis==='u'?(end==='start'?branch.u0:branch.u1):(end==='start'?branch.v0:branch.v1),sample=d=>g.roofOffset(g.at(branch.axis==='u'?value+d:branch.cross,branch.axis==='u'?branch.cross:value+d));assert.ok(Math.abs(sample(-.0001)-sample(.0001))<.0002,`${branch.id} ${end} cannot create a vertical roof gap`);}
});
