import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {terrainHeight} from '../dist/terrain.js';
import {frameRectangle} from '../dist/geometry.js';
import {REGIMENT_HALL_ID,REGIMENT_HALL_GIS,regimentHallGeometry} from '../dist/regiment-hall-data.js';
import {buildingAppearance,VISUAL_REFERENCES} from '../dist/visual-data.js';
const source=RAW.buildings.find(b=>b.id===REGIMENT_HALL_ID),b=CAMPUS.buildings.find(b=>b.id===REGIMENT_HALL_ID),g=regimentHallGeometry();
const poly=p=>[p.map(p=>[p.x,p.z])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const area=p=>p.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const disc=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*r,p.z+Math.sin(i/32*Math.PI*2)*r])];
const pathShapes=RAW.paths.flatMap(path=>path.points.slice(1).map((p,i)=>{const a=path.points[i],length=Math.hypot(p.x-a.x,p.z-a.z),frame={x:(p.x+a.x)/2,z:(p.z+a.z)/2,u:{x:-(p.z-a.z)/length,z:(p.x-a.x)/length},v:{x:(p.x-a.x)/length,z:(p.z-a.z)/length}};return {id:path.id,points:frameRectangle(frame,path.width||3,length)};}));

test('H1 preserves the complete map evidence and does not interpret a zero GIS field as measured height',()=>{
 assert.deepEqual(b.points,source.points);assert.deepEqual(b.holes,source.holes);assert.deepEqual(b.tags,source.tags);assert.equal(b.height,source.height);assert.equal(b.heightSource,'estimated');assert.equal(b.levels,2);assert.equal(REGIMENT_HALL_GIS.heightField,0);assert.equal(REGIMENT_HALL_GIS.floorCount,2);assert.match(b.heightNote,/unavailable/);assert.match(b.heightNote,/reconstructed/);assert.equal(buildingAppearance(b).facade,'regiment-hall');assert.ok(VISUAL_REFERENCES.some(r=>r.id===buildingAppearance(b).source&&r.photo));
});
test('two pitched roof planes cover the original six-point hall without overlap and meet at the ridge',()=>{
 const roofs=g.roofParts.map(poly),whole=poly(source.points);assert.ok(area(clip.difference(whole,...roofs))<1e-7);assert.ok(area(clip.difference(clip.union(...roofs),whole))<1e-7);assert.ok(area(clip.intersection(...roofs))<1e-7);
 for(const part of g.roofParts)for(const p of part){const h=g.roofHeight(p);assert.ok(h>=g.eave-1e-8&&h<=g.ridge+1e-8);assert.ok(g.base+h-terrainHeight(p.x,p.z)>5);}
 for(let v=-14;v<=14;v+=.2){assert.ok(Math.abs(g.roofHeight(g.at(-1e-7,v))-g.roofHeight(g.at(1e-7,v)))<1e-9);assert.ok(Math.abs(g.roofHeight(g.at(0,v))-g.ridge)<1e-9);}
 for(const vent of g.vents)assert.ok(vent.top<=b.height&&vent.bottom>=g.ridge);
});
test('hall shutters and high windows face outside the opaque shell',()=>{
 for(const edge of [...g.doors.map(d=>g.eastEdge(d.v-d.width/2,d.v+d.width/2)),g.eastEdge(g.clerestory.v0,g.clerestory.v1),g.southEdge(-4.68,-3.72),g.southEdge(3.72,4.68)]){
  const [a,c]=edge,l=Math.hypot(c.x-a.x,c.z-a.z),n={x:(c.z-a.z)/l,z:-(c.x-a.x)/l};
  for(let i=1;i<10;i++){const p={x:a.x+(c.x-a.x)*i/10+n.x*.11,z:a.z+(c.z-a.z)*i/10+n.z*.11};assert.ok(area(clip.intersection(disc(p,.02),poly(source.points)))<1e-9,'outward facade overlay stays in front of the solid wall');}
 }
 for(const door of g.doors){assert.ok(door.top<g.clerestory.bottom);assert.ok(door.v-door.width/2>g.clerestory.v0&&door.v+door.width/2<g.clerestory.v1);}
});
test('fitted asphalt, door hatching and yardarm clear every occupied building and mapped route',()=>{
 const shapes=[poly(g.apron),disc(g.pole,.32),...g.hatches.map(h=>poly(h.points))];
 for(const shape of shapes){for(const building of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(shape,poly(building.points)))<1e-7,'courtyard avoids '+building.id);for(const path of pathShapes)assert.ok(area(clip.intersection(shape,poly(path.points)))<1e-7,'courtyard avoids '+path.id);}
 for(const h of g.hatches)assert.ok(area(clip.difference(poly(h.points),poly(g.apron)))<1e-8);
});
test('map arrivals have standing clearance and the primary view remains on its original public footway',()=>{
 for(const id of [REGIMENT_HALL_ID,'regiment-hall-court']){const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);for(const other of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,.4),poly(other.points)))<1e-7);assert.ok(Math.hypot(p.x-g.pole.x,p.z-g.pole.z)>.8);}
 const path=RAW.paths.find(p=>p.id===g.publicPath),primary=CAMPUS.landmarks.find(p=>p.id===REGIMENT_HALL_ID);assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id),path);assert.deepEqual({x:primary.x,z:primary.z},g.streetArrival);const [a,c]=[path.points[0],path.points.at(-1)];assert.ok(Math.abs((primary.x-a.x)*(c.z-a.z)-(primary.z-a.z)*(c.x-a.x))<1e-7);
});
