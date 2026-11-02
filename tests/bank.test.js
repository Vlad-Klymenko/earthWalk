import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {terrainHeight} from '../dist/terrain.js';
import {BANK_ID,BANK_STEPS_ID,BANK_GIS,bankGeometry} from '../dist/bank-data.js';
import {buildingAppearance,VISUAL_REFERENCES} from '../dist/visual-data.js';
const b=CAMPUS.buildings.find(b=>b.id===BANK_ID),raw=RAW.buildings.find(b=>b.id===BANK_ID),g=bankGeometry();
const poly=points=>[points.map(p=>[p.x,p.z])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=p=>p.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const disc=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*r,p.z+Math.sin(i/32*Math.PI*2)*r])];
test('F22 becomes searchable without converting estimated height or independent GIS fields into a survey',()=>{
 assert.equal(b.name,'The Bank');assert.ok(b.named);assert.ok(b.aliases.includes('former Commonwealth Bank'));assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,6.4);assert.equal(b.heightSource,'estimated');assert.equal(b.levels,2);assert.equal(BANK_GIS.heightField,7.99);assert.equal(BANK_GIS.floorCount,3);assert.equal(buildingAppearance(b).source,'bank-university-exterior');assert.ok(VISUAL_REFERENCES.some(r=>r.id==='bank-university-exterior'&&r.photo));assert.match(b.heightNote,/2023/);
 for(const id of [BANK_ID,'bank-entrance','bank-ramp'])assert.ok(CAMPUS.landmarks.some(p=>p.id===id));
});
test('bank room stays inside its mapped roof and leaves the complete western footway clear',()=>{
 assert.ok(area(clip.difference(poly(g.room),poly(raw.points)))<1e-7);assert.ok(area([poly(raw.points)])-area([poly(g.room)])>15);
 const path=RAW.paths.find(p=>p.id==='osm-way-304595797');assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id).points,path.points);
 for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i];for(let j=0;j<=30;j++){const p={x:a.x+(c.x-a.x)*j/30,z:a.z+(c.z-a.z)*j/30};assert.ok(area(clip.intersection(disc(p,path.width/2),poly(g.room)))<1e-7,'full source path width remains outside the occupied room');}}
});
test('the entrance stair retains the mapped location and reaches the raised outdoor landing',()=>{
 const source=RAW.paths.find(p=>p.id===BANK_STEPS_ID);assert.deepEqual(g.stair.a,source.points[0]);assert.deepEqual(g.stair.b,source.points[1]);assert.equal(g.stair.width,source.width);assert.equal(g.stair.count,6);assert.ok(Math.abs(g.stair.h1-g.stair.h0-.96)<1e-7);
 for(const t of g.stairTreads){const signed=t.points.reduce((s,p,i)=>{const q=t.points[(i+1)%t.points.length];return s+p.x*q.z-q.x*p.z;},0);assert.ok(signed>0);for(const p of t.points)assert.ok(terrainHeight(p.x,p.z)<t.rl+.1);}
 const end=g.stairTreads.at(-1).rl;assert.ok(g.high-end<.27);assert.ok(g.roof-g.entryFloor>2.4);
});
test('switchback grades remain above the DEM, fit the source notch and meet without a height jump',()=>{
 const patches=[...g.rampParts,g.landing,g.topApron,g.approach];
 for(const part of patches){assert.ok(area(clip.intersection(poly(part.points),poly(g.room)))<1e-7);for(const other of RAW.buildings.filter(b=>b.id!==BANK_ID&&!b.walkableUnder))assert.ok(area(clip.intersection(poly(part.points),poly(other.points)))<1e-6,'outdoor route avoids adjacent source buildings');}
 for(const [index,v] of [[0,-12.7],[2,-11.15]])for(let i=0;i<=50;i++){const p=g.at(-2.95+7.4*i/50,v),height=g.rampParts[index].heightAt(p.x,p.z);assert.ok(height>=terrainHeight(p.x,p.z)+.15);}
 for(const v of [-12.7,-11.15]){const p=g.at(-2.95,v);assert.ok(Math.abs(g.rampParts[v===-12.7?0:2].heightAt(p.x,p.z)-g.mid)<1e-8);}
 const top=g.at(4.45,-11.15);assert.ok(Math.abs(g.rampParts[2].heightAt(top.x,top.z)-g.high)<1e-8);
 for(const p of [g.arrival,g.rampArrival,g.stairArrival])for(const other of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,.34),poly(other.id===BANK_ID?g.room:other.points)))<1e-6,'map arrival has standing room');
});

test('ramp entrance stays open past the rail ends for a walking player',()=>{
 for(let v=-14.35;v<-12.4;v+=.1)for(const rail of g.rampRails){const u=4.45,nearest=Math.max(Math.min(rail.u0,rail.u1),Math.min(Math.max(rail.u0,rail.u1),u));assert.ok(Math.hypot(u-nearest,v-rail.v)>.39,'rail endpoint does not close the entry');}
});
