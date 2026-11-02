import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {SHALOM_ID,SHALOM_GIS,shalomGeometry} from '../dist/shalom-data.js';
import {SHALOM_PARTS,SHALOM_FACES,SHALOM_ROOFS,SHALOM_GARDEN,SHALOM_LIGHTWELLS} from '../dist/shalom-parts.js';
import {terrainHeight} from '../dist/terrain.js';
const b=CAMPUS.buildings.find(b=>b.id===SHALOM_ID),raw=RAW.buildings.find(b=>b.id===SHALOM_ID),g=shalomGeometry();
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=p=>p.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const perimeter=p=>p.flat().reduce((s,r)=>s+r.reduce((n,p,i)=>{const q=r[(i+1)%r.length];return n+Math.hypot(q[0]-p[0],q[1]-p[1]);},0),0);
const disc=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*r,p.z+Math.sin(i/32*Math.PI*2)*r])];
const source=poly(raw),ground=clip.union(...SHALOM_PARTS.filter(p=>!p.minHeight).map(poly));

test('Shalom source height / footprint stay independent of balcony rows and university GIS fields',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,[]);assert.equal(b.height,12);assert.equal(b.heightSource,'mapped');assert.equal(b.levels,4);assert.equal(b.photoBalconyRows,3);assert.equal(SHALOM_GIS.heightField,19.54);assert.equal(SHALOM_GIS.floorCount,6);assert.equal(b.reconstructedMapHoles.length,3);
 for(const id of [SHALOM_ID,'shalom-entrance','shalom-north-garden','shalom-barker-front'])assert.ok(CAMPUS.landmarks.some(p=>p.id===id));
});
test('Shalom composite rooms retain the full mapped envelope while opening the fitted garden / lightwells',()=>{
 const combined=clip.union(ground,...SHALOM_GARDEN.map(poly),...SHALOM_LIGHTWELLS.map(poly),clip.intersection(source,poly(g.entryHole)));assert.ok(area(clip.xor(source,combined))<1e-6);
 for(const part of SHALOM_PARTS){assert.ok(area(clip.difference(poly(part),source))<1e-6);for(const hole of [...SHALOM_GARDEN,...SHALOM_LIGHTWELLS])assert.ok(area(clip.intersection(poly(part),poly(hole)))<1e-6);}
 for(const roof of SHALOM_ROOFS)for(const hole of [...SHALOM_GARDEN,...SHALOM_LIGHTWELLS])assert.ok(area(clip.intersection(poly(roof),poly(hole)))<1e-6,'no old whole-footprint roof closes the openings');
 assert.ok(SHALOM_PARTS.some(p=>p.kind==='common-upper'&&p.minHeight===4.5));assert.ok(SHALOM_PARTS.some(p=>p.kind==='south-wing'&&p.height<8));
});
test('Shalom exposed facade spans match the occupied perimeters across component heights',()=>{
 for(const h of [1,4.8,7,11.6]){const occupied=SHALOM_PARTS.filter(p=>p.minHeight<h&&p.height>h),expected=perimeter(clip.union(...occupied.map(poly))),actual=SHALOM_FACES.filter(p=>p.bottom<h&&p.top>h).reduce((s,p)=>s+Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),0);assert.ok(Math.abs(expected-actual)<1e-4,`${h}: ${actual} / ${expected}`);}
 for(const roof of SHALOM_ROOFS)for(const p of roof.points){const y=roof.kind==='balcony-wing'?g.northRoof(p):roof.kind==='south-wing'?g.southRoof(p):roof.kind==='common-upper'?g.commonBody+.9*Math.max(0,1-Math.abs(g.local(p).v-7.2)/8.6):roof.height;assert.ok(y<=b.height+1e-8);assert.ok(y>=roof.height-1e-8);}
});
test('Shalom entrance has a continuous outdoor approach, head clearance and clear arrivals',()=>{
 assert.ok(4.5-g.entryFloor>2.4);
 for(let v=16.1;v<=22;v+=.1){const p=g.at(-27,v),y=g.entryGrade(p.x,p.z);assert.ok(y>=terrainHeight(p.x,p.z)+.2199);assert.ok(area(clip.intersection(disc(p,.34),ground))<1e-6);}
 const end=g.at(-27,16.1);assert.ok(Math.abs(g.entryGrade(end.x,end.z)-g.entryFloorRL)<.03);
 for(const p of [g.arrival,g.entryArrival,g.gardenArrival,g.southArrival]){assert.ok(area(clip.intersection(disc(p,.34),ground))<1e-6);for(const other of RAW.buildings.filter(b=>b.id!==SHALOM_ID&&!b.walkableUnder))assert.ok(area(clip.intersection(disc(p,.34),poly(other)))<1e-6);}
});
test('Shalom planting / boulders stay clear of rooms and retained road / footway widths',()=>{
 for(const p of [...g.trees,...g.boulders,...g.ferns])assert.ok(area(clip.intersection(disc(p,p.radius),ground))<1e-6,'planting does not grow inside occupied rooms');
 for(const p of [...g.trees,...g.boulders])assert.ok(area(clip.intersection(disc(p,p.radius),poly(g.northWalk)))<1e-6,'the new northern walk stays clear');
 for(const p of [...g.boundary,g.gate])assert.ok(area(clip.intersection(poly(p),ground))<1e-6,'southern boundary remains outside occupied rooms');
 for(const id of ['osm-way-45489345','osm-way-4935033','osm-way-1233810725']){const path=RAW.paths.find(p=>p.id===id);assert.deepEqual(CAMPUS.paths.find(p=>p.id===id).points,path.points);for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i],dx=c.x-a.x,dz=c.z-a.z;for(const p of [...g.trees,...g.boulders,...g.ferns]){const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>path.width/2+p.radius,'full source circulation width stays clear');}}}
});
