import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { TYREE_ID, TYREE_CANOPY_ID, TYREE_HEIGHT_REPORT, TYREE_REPLACED_STEPS, tyreeGeometry } from '../dist/tyree-data.js';
import { TYREE_PARTS, TYREE_ROOFS, TYREE_PLATFORM, TYREE_STEPS, TYREE_APRON } from '../dist/tyree-parts.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { terrainHeight } from '../dist/terrain.js';
import { framePoint } from '../dist/geometry.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r})));
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const raw=SOURCE.buildings.find(b=>b.id===TYREE_ID),g=tyreeGeometry(raw),src=[poly(raw.points,raw.holes)];
const inPoly=(p,parts)=>area(clip.intersection([disc(p,.001)],clip.union(...parts.map(p=>poly(p.points,p.holes)))))>1e-7;
test('Tyree keeps original dimensions as evidence alongside distinct planning component levels',()=>{
 const b=CAMPUS.buildings.find(b=>b.id===TYREE_ID);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);assert.equal(raw.height,28);assert.equal(b.mappedHeight,28);assert.equal(b.levels,7);assert.equal(b.heightSource,'derived');assert.ok(Math.abs(b.height+g.base-59.7)<1e-8);assert.deepEqual(b.heightReference,TYREE_HEIGHT_REPORT);assert.match(b.heightNote,/planning evidence, not an as-built/);assert.equal(buildingAppearance(b).facade,'tyree');
 const canopy=CAMPUS.buildings.find(b=>b.id===TYREE_CANOPY_ID),source=SOURCE.buildings.find(b=>b.id===TYREE_CANOPY_ID);assert.deepEqual(canopy.points,source.points);assert.deepEqual(canopy.tags,source.tags);assert.equal(canopy.previousEstimate,9.6);assert.equal(canopy.modelledWith,TYREE_ID);assert.equal(canopy.heightSource,'estimated');
});
test('lower covered-route and western recess regions exactly partition the original footprint',()=>{
 const union=clip.union(...TYREE_PARTS.map(p=>poly(p.points,p.holes)));assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);
 for(let i=0;i<TYREE_PARTS.length;i++)for(let j=i+1;j<TYREE_PARTS.length;j++)assert.ok(area(clip.intersection(poly(TYREE_PARTS[i].points,TYREE_PARTS[i].holes),poly(TYREE_PARTS[j].points,TYREE_PARTS[j].holes)))<1e-6);
});
test('the mapped western route clears occupied ground and retains headroom above its graded walking floor',()=>{
 const occupied=TYREE_PARTS.filter(p=>p.kind==='ground');for(let i=0;i<g.route.points.length-1;i++){const a=g.route.points[i],b=g.route.points[i+1];for(let k=0;k<=48;k++){
 const p={x:a.x+(b.x-a.x)*k/48,z:a.z+(b.z-a.z)*k/48};for(const part of occupied){assert.ok(area(clip.intersection([disc(p,.45)],[poly(part.points,part.holes)]))<1e-6);for(let j=0;j<part.points.length;j++)assert.ok(distance(p,part.points[j],part.points[(j+1)%part.points.length])>.45,'no zero-area collision spur');}
 assert.ok(g.passageCeilingRL-g.passageFloor(p)>3);
 }}
});
test('roof phases preserve the footprint while keeping their curved profile below the plant maximum',()=>{
 // Snap only the boolean verification input to 0.1 micrometre precision:
 // repeated parallel cuts otherwise produce near-coincident floating edges.
 // Runtime and retained source points remain at their original precision.
 const snap=p=>p.map(r=>r.map(([x,z])=>[Math.round(x*1e7)/1e7,Math.round(z*1e7)/1e7]));
 const shapes=TYREE_ROOFS.map(p=>poly(p.points,p.holes)),union=clip.union(...shapes.map(snap));assert.ok(area(clip.difference(src.map(snap),union))<1e-5);assert.ok(area(clip.difference(union,src.map(snap)))<1e-5);
 assert.ok(Math.abs(area(shapes)-area(src))<1e-7,'full precision roof areas equal the source');
 for(let i=0;i<shapes.length;i++)for(let j=i+1;j<shapes.length;j++)assert.ok(area(clip.intersection(snap(shapes[i]),snap(shapes[j])))<1e-6,'roof phases do not overlap');
 let low=Infinity,high=-Infinity;for(const part of TYREE_ROOFS)for(const p of part.points){const rl=g.roofRL(p);low=Math.min(low,rl);high=Math.max(high,rl);assert.ok(rl>44&&rl<=53);}
 assert.ok(high-low>3);assert.equal(Math.max(...g.plants.map(p=>p.top)),59.7);assert.ok(g.plants.every(p=>p.top>p.bottom));
 for(const plant of g.plants)assert.ok(area(clip.difference([poly(plant.points)],src))<1e-6,'plant footprints stay within mapped perimeter');
});
test('five reconstructed risers meet the raised planning ground level without oversized steps',()=>{
 assert.equal(g.flights.length,19);assert.equal(TYREE_STEPS.length,95);for(const f of g.flights){let previous=f.low;for(const step of f.steps){assert.ok(step.rl>previous);assert.ok(step.rl-previous<=.2);previous=step.rl;}assert.ok(Math.abs(previous-28.2)<1e-8);const p=framePoint(g.frame,f.u,-33.69);assert.ok(inPoly(p,TYREE_PLATFORM),'last tread joins platform');}
 assert.ok(TYREE_REPLACED_STEPS.includes('osm-way-584174366'));assert.deepEqual(CAMPUS.paths.find(p=>p.id==='osm-way-584174366').points,SOURCE.paths.find(p=>p.id==='osm-way-584174366').points);
});
test('terrace and tread cells clear occupied footprints, leaving adjacent footways open',()=>{
 for(const part of [...TYREE_PLATFORM,...TYREE_STEPS])for(const b of SOURCE.buildings.filter(b=>b.id!==TYREE_CANOPY_ID))assert.ok(area(clip.intersection([poly(part.points,part.holes)],[poly(b.points,b.holes)]))<1e-6,`terrace clears ${b.id}`);
 for(const p of g.columns){assert.ok(inPoly(p,TYREE_PLATFORM));assert.ok(g.roofRL(p)-28.2>15);for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(p,path.points[i],path.points[i+1])>(path.width||3)/2+.55,`column clears ${path.id}`);}
});
test('photo-led arrivals and trees clear all mapped occupied footprints',()=>{
 const points=[g.arrival,g.stairArrival,g.westArrival,g.eastArrival,g.passageArrival,...g.trees];for(const p of points)for(const b of SOURCE.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection([disc(p,.8)],[poly(b.points,b.holes)]))<1e-6,`arrival / tree clears ${b.id}`);
 for(const table of g.tables){assert.ok(inPoly(table,TYREE_PLATFORM));for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(table,path.points[i],path.points[i+1])>(path.width||3)/2+1.5,`furniture clears ${path.id}`);}
});


test('western supports stay in the retained open recess and clear the mapped path width',()=>{
 for(const col of g.westColumns){assert.ok(inPoly(col,TYREE_PARTS.filter(p=>p.kind!=='ground')));assert.ok(g.passageCeilingRL-g.passageFloor(col)>3);
 for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(col,path.points[i],path.points[i+1])>(path.width||3)/2+col.radius+.4,`support clears ${path.id}`);
 }
 // The Anzac-facing panel line stays straight; curved spoon roofs begin behind it.
 const a=framePoint(g.frame,-28,-22),c=framePoint(g.frame,-28,-10),m=framePoint(g.frame,-28,-16);assert.ok(Math.abs(g.roofRL(m)-(g.roofRL(a)+g.roofRL(c))/2)<1e-8);
});


test('terrain-following stair approach bridges the grass-to-tread height and avoids existing path meshes',()=>{
 for(const f of g.flights){const p=framePoint(g.frame,f.u,-36.31);assert.ok(f.steps[0].rl-g.apron.heightAt(p)<.27);assert.ok(f.steps[0].rl>g.apron.heightAt(p));}
 assert.ok(g.apron.heightAt(g.stairArrival)>terrainHeight(g.stairArrival.x,g.stairArrival.z));
 for(const part of TYREE_APRON){assert.ok(area(clip.intersection([poly(part.points,part.holes)],src))<1e-6);for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*(path.width||3)/2,nz=(c.x-a.x)/len*(path.width||3)/2;assert.ok(area(clip.intersection([poly(part.points,part.holes)],[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}])]))<1e-6);}}
});
