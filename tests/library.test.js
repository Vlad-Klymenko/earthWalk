import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { BUILDING_PARTS } from '../dist/building-parts.js';
import { libraryGeometry, libraryFacadeRing } from '../dist/library-data.js';
import { terrainHeight } from '../dist/terrain.js';
import { buildingAppearance, VISUAL_REFERENCES } from '../dist/visual-data.js';

const raw=SOURCE.buildings.find(b=>b.id==='library'),g=libraryGeometry(raw);
const poly=ps=>[ps.map(p=>[p.x,p.z])];
const area=m=>m.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r})));
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};

test('Library retains source evidence and reported maximum independently of photo window rows',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='library');
  assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);
  assert.equal(b.height,57.74);assert.equal(b.mappedHeight,60);assert.equal(b.levels,14);assert.equal(b.heightSource,'reported');assert.equal(b.photoNorthRows,7);
  assert.match(b.heightNote,/unseen elevations remain approximate/i);assert.equal(buildingAppearance(b).source,'library-entry-exterior');
  for(const id of ['library-entry-exterior','library-entry-detail','library-scientia-entry','library-2024-exterior','library-lawn-panorama'])assert.ok(VISUAL_REFERENCES.some(r=>r.id===id));
});

test('Library component roofs preserve all five mapped part outlines and differing heights',()=>{
  assert.equal(g.parts.length,5);assert.deepEqual(g.parts,BUILDING_PARTS.filter(p=>p.parent==='library'));
  assert.deepEqual(g.parts.map(p=>p.height),[57.74,16,12,4,4]);
  assert.equal(g.annexes.length,2);for(const annex of g.annexes){const b=CAMPUS.buildings.find(b=>b.id===annex.id);assert.equal(b.modelledWith,'library');assert.deepEqual(b.points,annex.points);assert.deepEqual(b.tags,annex.tags);assert.equal(b.height,annex.height);}
  for(const part of g.parts){
    const simplified=libraryFacadeRing(part.points);
    const difference=area(clip.xor([poly(part.points)],[poly(simplified)]));
    assert.ok(difference<2,'façade vertex simplification remains within the survey line tolerance');
    for(const p of simplified)assert.ok(part.points.some(q=>q.x===p.x&&q.z===p.z));
  }
});

test('Flared Library canopy clears the sloping DEM and its supports avoid source walking routes',()=>{
  const lowest=Math.min(...g.canopy.points.map(g.canopy.heightAt))-g.canopy.thickness;
  for(let i=0;i<g.canopy.points.length;i++){
    const a=g.canopy.points[i],c=g.canopy.points[(i+1)%g.canopy.points.length];
    for(let k=0;k<=20;k++){const p={x:a.x+(c.x-a.x)*k/20,z:a.z+(c.z-a.z)*k/20};assert.ok(g.base+lowest-terrainHeight(p.x,p.z)-.22>4);}
  }
  for(const col of g.columns){
    for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)for(const p of col.points)assert.ok(distance(p,path.points[i],path.points[i+1])>(path.width||3)/2+.45,`support clears ${path.id}`);
    for(const b of SOURCE.buildings.filter(b=>!b.walkableUnder&&b.building!=='roof'))assert.ok(area(clip.intersection([poly(col.points)],[poly(b.points)]))<1e-7,`support clears ${b.id}`);
  }
  for(const post of g.portal.posts)for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)for(const p of post.points)assert.ok(distance(p,path.points[i],path.points[i+1])>(path.width||3)/2+.45,`portal clears ${path.id}`);
});

test('Library viewpoints are outside occupied footprints and the upper glazing stays below the fascia',()=>{
  for(const p of [g.arrival,g.westArrival,g.coveredArrival])for(const b of SOURCE.buildings.filter(b=>!b.walkableUnder&&b.building!=='roof'))assert.ok(area(clip.intersection([disc(p,.6)],[poly(b.points)]))<1e-7,`viewpoint clears ${b.id}`);
  assert.equal(g.northRows.length,7);assert.ok(g.northRows[0].low>16);assert.ok(g.northRows.at(-1).high<g.fasciaBottom);assert.ok(g.fasciaBottom<g.tower.height);
});
