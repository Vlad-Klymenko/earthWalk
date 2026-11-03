import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {ENGINEERING_EDGE as E,ENGINEERING_WALLS,ENGINEERING_STREET_VIEW,engineeringCoordinates,engineeringPavingHeight,engineeringPlantLeaves} from '../dist/engineering-street-data.js';
import {ENGINEERING_GARDENS,ENGINEERING_PAVING,ENGINEERING_GROUND,ENGINEERING_REMNANTS,ENGINEERING_BOLLARDS,ENGINEERING_PLANTS} from '../dist/engineering-street-parts.js';
import {OLD_MAIN_ENTRY_CUTOUT} from '../dist/old-main-entry-parts.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
import {terrainHeight} from '../dist/terrain.js';
import {walkingSurfaceHeight} from '../dist/walking-surfaces.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const inside=(x,z,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>z)!==(r[j].z>z)&&x<(r[j].x-r[i].x)*(z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const contains=(p,part)=>inside(p.x,p.z,part.points)&&!(part.holes||[]).some(h=>inside(p.x,p.z,h));
const ribbon=(p,width)=>p.points.slice(1).map((b,i)=>{const a=p.points[i],dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1,nx=-dz/l*width/2,nz=dx/l*width/2;return [[[a.x+nx,a.z+nz],[b.x+nx,b.z+nz],[b.x-nx,b.z-nz],[a.x-nx,a.z-nz]]];});
test('Engineering Road retains public garden plan evidence separately from estimated fixture dimensions',()=>{
 const e=JSON.parse(fs.readFileSync(new URL('../sources/engineering-street-gis-evidence.json',import.meta.url)));assert.equal(e.response.features.length,17);assert.equal(e.response.spatialReference.wkid,4326);assert.equal(e.query.outFields,'OBJECTID');assert.match(e.note,/not surveyed Z/);assert.equal(E.reconstructed,true);assert.match(E.note,/sunken entrance/);
 for(const f of e.response.features)assert.deepEqual(Object.keys(f.attributes),['OBJECTID']);
 for(const p of RAW.paths){const q=CAMPUS.paths.find(q=>q.id===p.id&&JSON.stringify(q.points)===JSON.stringify(p.points));assert.ok(q);assert.equal(q.width,p.width);assert.equal(q.surface,p.surface);}
});
test('garden and reconstructed paving partitions avoid occupied source rooms and full route widths',()=>{
 const ground=clip.union(...ENGINEERING_GROUND.map(poly)),pave=clip.union(...ENGINEERING_PAVING.map(poly)),gardens=clip.union(...ENGINEERING_GARDENS.map(poly));assert.ok(area(pave)>100);assert.ok(area(gardens)>200);assert.ok(area(clip.intersection(pave,gardens))<1e-5);assert.ok(Math.abs(area(ground)-area(pave)-area(gardens)-area(clip.union(...OLD_MAIN_ENTRY_CUTOUT.map(poly))))<1e-4);
 for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(ground,poly(b)))<1e-5,b.id);
 for(const route of RAW.paths)for(const strip of ribbon(route,route.width))assert.ok(area(clip.intersection(ground,strip))<1e-5,route.id);
 for(const part of [...ENGINEERING_GROUND,...Object.values(ENGINEERING_REMNANTS.paths).flatMap(p=>[...p.surface,...p.edge])]){const all=[...part.points,...part.holes.flat()],tris=ShapeUtils.triangulateShape(part.points.map(p=>new Vector2(p.x,p.z)),part.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(tris.reduce((s,t)=>s+ringArea(t.map(i=>[all[i].x,all[i].z])),0)-area([poly(part)]))<1e-5);}
});
test('blue posts and brick wall leave retained road and footpath corridors clear',()=>{
 assert.equal(ENGINEERING_BOLLARDS.length,6);assert.equal(new Set(ENGINEERING_BOLLARDS.map(p=>p.id)).size,6);
 for(const p of ENGINEERING_BOLLARDS){assert.equal(p.height,.95);assert.equal(p.radius,.11);for(const route of RAW.paths)for(let i=1;i<route.points.length;i++)assert.ok(distance(p,route.points[i-1],route.points[i])>=route.width/2+p.radius+.024,route.id);for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(!contains(p,b));assert.ok(ENGINEERING_GARDENS.every(g=>!contains(p,g)));}
 for(const wall of ENGINEERING_WALLS){for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(poly(wall),poly(b)))<1e-5);for(const route of RAW.paths)for(const strip of ribbon(route,route.width))assert.ok(area(clip.intersection(poly(wall),strip))<1e-5);assert.ok(wall.height<E.railHeight);}
});
test('planting remains inside public garden partitions with estimated low heights and no path intrusion',()=>{
 assert.ok(ENGINEERING_PLANTS.length>300);for(const p of ENGINEERING_PLANTS){assert.ok(p.height>=.28&&p.height<.46);assert.equal(p.reconstructed,true);assert.ok(ENGINEERING_GARDENS.some(g=>contains(p,g)));const c=engineeringCoordinates(p);assert.ok(c.s>=-1&&c.s<=35);for(const leaf of engineeringPlantLeaves(p,ENGINEERING_PLANTS.indexOf(p))){for(const q of [leaf.baseLeft,leaf.baseRight,leaf.midLeft,leaf.midRight,leaf.tip]){assert.ok(Math.hypot(q.x-p.x,q.z-p.z)<=p.radius);assert.ok(q.y>=0&&q.y<=p.height);}assert.ok(Math.hypot(leaf.midRight.x-leaf.midLeft.x,leaf.midRight.z-leaf.midLeft.z)<.037);}}
});
test('street arrival and terrain-following paving remain on the ground layer with a finite walking-height API',()=>{
 const view=CAMPUS.landmarks.find(p=>p.id===ENGINEERING_STREET_VIEW.id);assert.ok(view);assert.equal(view.showSign,false);assert.ok(RAW.buildings.filter(b=>!b.walkableUnder).every(b=>!contains(view,b)));assert.ok(ENGINEERING_WALLS.every(w=>!contains(view,w)));assert.match(view.description,/sunken entrance uses separate published survey RL anchors/);
 for(const part of ENGINEERING_PAVING)for(const p of part.points){const h=engineeringPavingHeight(p.x,p.z);assert.ok(Number.isFinite(h));assert.ok(Math.abs(h-terrainHeight(p.x,p.z)-.055)<1e-10);}
 const part=ENGINEERING_PAVING[0],p=ENGINEERING_BOLLARDS[0],base=terrainHeight(p.x,p.z),patch={points:part.points,holes:part.holes,heightAt:engineeringPavingHeight};assert.ok(Number.isFinite(walkingSurfaceHeight(base,[patch],p.x,p.z,base,inside)));assert.equal(engineeringPavingHeight(1,2,(x,z)=>x+z),3.055);
});
