import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clipping from 'polygon-clipping';
import * as THREE from '../dist/vendor/three.module.js';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {terrainHeight} from '../dist/terrain.js';
import {GOLDSTEIN_ID,GOLDSTEIN_ART,GOLDSTEIN_ART_POINT,goldsteinCourtGeometry} from '../dist/goldstein-courtyard-data.js';
import {goldsteinSculptureGeometry} from '../dist/goldstein-sculpture.js';
import {GOLDSTEIN_PAVING,GOLDSTEIN_STAIR_CHEEKS} from '../dist/goldstein-courtyard-parts.js';
import {framePoint} from '../dist/geometry.js';
const g=goldsteinCourtGeometry(),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const disc=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i/24*Math.PI*2)*r,p.z+Math.sin(i/24*Math.PI*2)*r])];
const ribbon=(a,b,width)=>{const len=Math.hypot(b.x-a.x,b.z-a.z),x=-(b.z-a.z)/len*width/2,z=(b.x-a.x)/len*width/2;return [[[a.x+x,a.z+z],[a.x-x,a.z-z],[b.x-x,b.z-z],[b.x+x,b.z+z]]];};

test('Goldstein bronze retains the actual public artwork point and independent reported dimensions / dates',()=>{
 const raw=JSON.parse(fs.readFileSync(new URL('../dist/data/unsw.json',import.meta.url))),node=raw.elements.find(e=>e.type==='node'&&e.id===GOLDSTEIN_ART.osmId);
 assert.equal(GOLDSTEIN_ART.lat,node.lat);assert.equal(GOLDSTEIN_ART.lon,node.lon);assert.equal(GOLDSTEIN_ART.mappedStartDate,node.tags.start_date);assert.equal(GOLDSTEIN_ART.year,1964);
 assert.equal(GOLDSTEIN_ART.material,'cast bronze');assert.equal(GOLDSTEIN_ART.height,2.4);assert.equal(GOLDSTEIN_ART.width,4.32);assert.equal(GOLDSTEIN_ART.depth,.59);
 assert.ok(Math.hypot(GOLDSTEIN_ART_POINT.x-g.pool.x,GOLDSTEIN_ART_POINT.z-g.pool.z)<g.pool.width/2);
 const before=RAW.buildings.find(b=>b.id===GOLDSTEIN_ID),after=CAMPUS.buildings.find(b=>b.id===GOLDSTEIN_ID);assert.deepEqual(after.points,before.points);assert.equal(after.mappedHeight,20);assert.equal(after.height,12);assert.equal(after.levels,4);
});

test('actual pierced sculpture geometry fits reported overall size with open internal voids',()=>{
 const geometry=goldsteinSculptureGeometry(),size=geometry.boundingBox.getSize(new THREE.Vector3());
 for(const [axis,expected]of [['x',4.32],['y',2.4],['z',.59]])assert.ok(Math.abs(size[axis]-expected)<1e-5);
 const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),mesh=new THREE.Mesh(geometry,material);mesh.updateMatrixWorld();const ray=new THREE.Raycaster();let clear=0;
 for(const hole of geometry.userData.holeCentres){ray.set(new THREE.Vector3(hole.x,hole.y,-2),new THREE.Vector3(0,0,1));if(!ray.intersectObject(mesh).length)clear++;}
 assert.ok(clear>=10,`pierced figure openings must survive actual extrusion (${clear} clear)`);assert.ok(geometry.attributes.position.count<25000);geometry.dispose();material.dispose();
});

test('courtyard paving, pool, plinth and new furniture clear retained occupied footprints',()=>{
 const shapes=[...GOLDSTEIN_PAVING,{points:g.pool.outer},{points:g.plinth.points},{points:g.tree.pit},...g.benches];
 for(const p of shapes)for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(poly(p),poly(b)))<1e-6,`${b.id} stays clear`);
 for(const patch of GOLDSTEIN_PAVING){assert.ok(area(clipping.intersection(poly(patch),poly({points:g.pool.outer})))<1e-6);assert.ok(area(clipping.intersection(poly(patch),poly({points:g.tree.pit})))<1e-6);}
 assert.ok(g.pool.waterRL<g.floor&&g.plinth.top>g.pool.waterRL);for(const p of g.pool.points)assert.ok(terrainHeight(p.x,p.z)<g.pool.waterRL,'coarse ground remains below water');
});

test('three entry treads provide reachable rise into the raised court and meet the retained connector',()=>{
 assert.equal(g.entry.count,3);let previous=g.entry.low;for(const step of g.entry.steps){assert.ok(step.rl-previous<=.171);assert.ok(step.rl>previous);previous=step.rl;}
 assert.ok(Math.abs(previous-g.floor)<1e-9);assert.ok((g.entry.u1-g.entry.u0)/g.entry.count>.3);
 for(const p of [g.arrival,g.view])for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(disc(p,.4),poly(b)))<1e-6);
 for(const v of [-36,-27.8,-19]){const a=framePoint(g.frame,-21.8,v),b=framePoint(g.frame,-20.6,v);assert.ok(g.entry.apron.heightAt(a)>=terrainHeight(a.x,a.z)+.22);assert.ok(Math.abs(g.entry.apron.heightAt(b)-g.entry.low)<.08);assert.ok(g.entry.steps[0].rl-g.entry.apron.heightAt(b)<=.171);}
 const p=framePoint(g.frame,g.entry.u1,g.entry.v);assert.ok(Math.abs(g.floorAt(p)-g.entry.high)<.03);
 for(const id of ['osm-way-301754221','osm-way-301754225','osm-way-301754238'])assert.deepEqual(CAMPUS.paths.find(p=>p.id===id).points,RAW.paths.find(p=>p.id===id).points);
});

test('pool, furniture and stair cheeks preserve source circulation widths',()=>{
 const props=[{points:g.pool.outer},...g.benches,{points:g.tree.pit}];
 for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){
  const a=path.points[i-1],b=path.points[i];if(Math.min(Math.hypot(a.x-g.pool.x,a.z-g.pool.z),Math.hypot(b.x-g.pool.x,b.z-g.pool.z))>60)continue;
  const pathShape=ribbon(a,b,path.width||2.1);for(const p of props)assert.ok(area(clipping.intersection(poly(p),pathShape))<1e-6,`${path.id} retains width`);
  for(const p of g.bollards)assert.ok(area(clipping.intersection(disc(p,p.radius+.12),pathShape))<1e-6);
  for(const p of GOLDSTEIN_STAIR_CHEEKS)assert.ok(area(clipping.intersection(poly(p),pathShape))<1e-6,`cheek clears ${path.id}`);
 }
});
