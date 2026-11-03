import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {CAMPUS_DETAILS} from '../dist/campus-details.js';
import {OLD_MAIN_ENTRY as E,OLD_MAIN_ENTRY_TREADS,OLD_MAIN_ENTRY_BIKES as RACK,OLD_MAIN_ENTRY_VIEWS,OLD_MAIN_EAST_ROWS,OLD_MAIN_VISUAL_ROOF,oldMainEntryHeight,oldMainEntryFloorHeight,oldMainEntryWalkingPatches,oldMainEastFacadePoint,oldMainEastWindowBayVisible} from '../dist/old-main-entry-data.js';
import {OLD_MAIN_ENTRY_FLOORS as FLOORS,OLD_MAIN_ENTRY_CUTOUT as CUT,OLD_MAIN_ENTRY_REMOVED_TRIANGLES as REMOVED,OLD_MAIN_ENTRY_GROUND_EDGES as EDGES,OLD_MAIN_ENTRY_REMNANTS} from '../dist/old-main-entry-parts.js';
import {campusTerrainHeight as finalTerrain} from '../dist/old-main-entry-landscape.js';
import {campusTerrainHeight as previousTerrain} from '../dist/spiral-landscape.js';
import {SPIRAL_REMOVED_TRIANGLES} from '../dist/spiral-parts.js';
import {ELECTRICAL_REMOVED_TRIANGLES} from '../dist/electrical-landscape-parts.js';
import {engineeringPoint} from '../dist/engineering-street-data.js';
import {oldMainGeometry} from '../dist/old-main-data.js';
import {terrainHeight,TERRAIN_GRID as grid} from '../dist/terrain.js';
import {priorityWalkingSurface} from '../dist/walking-surfaces.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const inside=(x,z,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>z)!==(r[j].z>z)&&x<(r[j].x-r[i].x)*(z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const contains=(p,q)=>inside(p.x,p.z,q.points)&&!(q.holes||[]).some(h=>inside(p.x,p.z,h));
const ribbon=(p,width)=>p.points.slice(1).map((b,i)=>{const a=p.points[i],dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1,nx=-dz/l*width/2,nz=dx/l*width/2;return [[[a.x+nx,a.z+nz],[b.x+nx,b.z+nz],[b.x-nx,b.z-nz],[a.x-nx,a.z-nz]]];});
const b=CAMPUS.buildings.find(b=>b.id==='osm-way-45490050'),raw=RAW.buildings.find(q=>q.id===b.id),g=oldMainGeometry(b),cut=clip.union(...CUT.map(poly));
test('Old Main level anchors retain the public AHD survey and separate unspecified GIS height evidence',()=>{
 const s=JSON.parse(fs.readFileSync(new URL('../sources/old-main-entry-evidence.json',import.meta.url)));assert.deepEqual(s.survey.pages,[1,27,28]);assert.match(s.survey.datum,/Australian Height Datum/);assert.match(s.survey.sha256,/^[a-f0-9]{64}$/);assert.equal(s.survey.observations.lowerFloorRL,E.lowerRL);assert.equal(s.survey.observations.upperLandingRL,E.upperRL);assert.match(s.survey.note,/SIP \/ EOT service labels are not floor/);
 const a=s.buildingGIS.response.features[0].attributes;assert.deepEqual(Object.keys(a).sort(),['OBJECTID','egdb_ES_14','egdb_ES_15','egdb_ES_18','egdb_ES_26'].sort());assert.equal(a.egdb_ES_14,'K15');assert.equal(a.egdb_ES_18,5);assert.equal(a.egdb_ES_26,15.32);assert.match(s.buildingGIS.note,/unspecified/);assert.equal(OLD_MAIN_VISUAL_ROOF.estimated,true);assert.equal(b.height,24);assert.equal(b.levels,6);assert.equal(b.heightSource,'mapped');assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);
});
test('sunken exterior floors partition the terrain cut and clear all occupied rooms, source paths and main-entry steps',()=>{
 const floors=clip.union(...FLOORS.map(poly));assert.ok(area(cut)>70);assert.ok(Math.abs(area(cut)-area(floors))<1e-4);
 for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(cut,poly(room)))<1e-4,room.id);
 for(const route of RAW.paths)for(const strip of ribbon(route,route.width))assert.ok(area(clip.intersection(cut,strip))<1e-5,route.id);
 for(const p of g.stairs.parts)assert.ok(area(clip.intersection(cut,poly(p)))<1e-6);
 for(const p of FLOORS){assert.ok(p.points.every(q=>Number.isFinite(oldMainEntryFloorHeight(p,q.x,q.z))));for(const q of p.points){if(p.height!==undefined)assert.equal(oldMainEntryFloorHeight(p,q.x,q.z),p.height);}}
});
test('terrain stencil conserves each clipped triangle and does not reinsert previous landscape cuts',()=>{
 const old=new Set([...SPIRAL_REMOVED_TRIANGLES,...ELECTRICAL_REMOVED_TRIANGLES].map(p=>p.join(',')));assert.ok(REMOVED.length>10);assert.equal(new Set(REMOVED.map(p=>p.join(','))).size,REMOVED.length);let removedArea=0;
 for(const [col,row,i] of REMOVED){assert.ok(!old.has([col,row,i].join(',')));const x=grid.x0+col*grid.dx,z=grid.z0+row*grid.dz,a=[x,z],bb=[x+grid.dx,z],c=[x,z+grid.dz],d=[x+grid.dx,z+grid.dz],tri=i?[bb,d,c]:[a,bb,c],intersection=clip.intersection([tri],cut);assert.ok(area(intersection)>0);removedArea+=area(intersection);const remains=clip.difference([tri],cut);assert.ok(Math.abs(area(remains)+area(intersection)-grid.dx*grid.dz/2)<1e-5);}
 assert.ok(Math.abs(removedArea-area(cut))<1e-4);
 for(const part of [...FLOORS,...EDGES,...Object.values(OLD_MAIN_ENTRY_REMNANTS.greens).flat(),...Object.values(OLD_MAIN_ENTRY_REMNANTS.plazas).flat()]){const ps=[...part.points,...part.holes.flat()],tris=ShapeUtils.triangulateShape(part.points.map(p=>new Vector2(p.x,p.z)),part.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(tris.reduce((s,t)=>s+ringArea(t.map(i=>[ps[i].x,ps[i].z])),0)-area([poly(part)]))<1e-4);}
 for(const p of EDGES)assert.ok(area(clip.intersection(poly(p),cut))<1e-4);
});
test('actual walking patches climb and descend twelve bounded risers and join the northern street exit',()=>{
 const patches=oldMainEntryWalkingPatches(FLOORS),rise=(E.upperRL-E.lowerRL)/E.treads;assert.equal(OLD_MAIN_ENTRY_TREADS.length,12);assert.ok(rise>.16&&rise<.18);
 const walk=(coordinates,reference)=>{let previous=reference;for(const p of coordinates){const h=priorityWalkingSurface(patches,p.x,p.z,previous,inside)??previousTerrain(p.x,p.z);assert.ok(Number.isFinite(h));assert.ok(Math.abs(h-previous)<.181);previous=h;}return previous;};
 const line=Array.from({length:1235},(_,i)=>engineeringPoint(-9.99+i*.02,-7.55)),start=oldMainEntryHeight(line[0].x,line[0].z);assert.ok(Math.abs(walk(line,start)-E.upperRL)<1e-8);assert.ok(Math.abs(walk([...line].reverse(),E.upperRL)-start)<1e-8);
 const exit=Array.from({length:227},(_,i)=>engineeringPoint(15.3,-7.55+i*.02)),end=walk(exit,E.upperRL),last=exit.at(-1);assert.ok(Math.abs(end-(previousTerrain(last.x,last.z)+.055))<.01);
 for(let i=1;i<OLD_MAIN_ENTRY_TREADS.length;i++)assert.ok(Math.abs(OLD_MAIN_ENTRY_TREADS[i].height-OLD_MAIN_ENTRY_TREADS[i-1].height-rise)<1e-9);
});
test('survey window bands apply to the original east edge while roof and upper bands remain estimates',()=>{
 assert.equal(g.faces.filter(f=>f.surveyEast).length,1);assert.equal(g.base+g.roof,46);assert.ok(g.roof<raw.height);assert.equal(g.eastRows[0].low+g.base,30.65);assert.equal(g.eastRows[0].high+g.base,32.95);assert.equal(g.eastRows[1].low+g.base,34.7);assert.equal(g.eastRows[1].high+g.base,37.1);assert.ok(g.eastRows.slice(0,2).every(r=>!r.reconstructed));assert.ok(g.eastRows.slice(2).every(r=>r.reconstructed));assert.ok(g.rows.every(r=>r.reconstructed));assert.equal(g.southRows[0].low+g.base,30.75);assert.equal(g.southRows[0].high+g.base,32.45);assert.ok(g.eastRows.every(r=>r.high<g.roof-.5));
 for(const s of [-2,1])assert.equal(oldMainEastWindowBayVisible(0,oldMainEastFacadePoint(s)),true);for(const s of [4.8,8,30])assert.equal(oldMainEastWindowBayVisible(0,oldMainEastFacadePoint(s)),false);assert.equal(oldMainEastWindowBayVisible(1,oldMainEastFacadePoint(30)),true);
 const door=oldMainEastFacadePoint(4.8,.13);assert.ok(!contains(door,raw));assert.ok(OLD_MAIN_EAST_ROWS.every(r=>r.head>r.sill));
});
test('mapped bike evidence stays intact while the photo-fitted rack clears the reconstructed stair and central arrivals',()=>{
 const source=CAMPUS_DETAILS.find(p=>p.osmId===RACK.sourceOsmId);assert.equal(source.x,213.614);assert.equal(source.z,98.752);assert.equal(RACK.reconstructed,true);assert.equal(RACK.count,5);
 for(const stair of OLD_MAIN_ENTRY_TREADS)assert.ok(area(clip.intersection(poly(stair),poly(RACK)))<1e-6);for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(poly(RACK),poly(room)))<1e-6);
 assert.ok(RACK.points.every(p=>FLOORS.some(f=>f.id==='upper-platform'&&contains(p,f))));
 const arrival=OLD_MAIN_ENTRY_VIEWS.find(p=>p.id==='old-main-lower-stair-top'),circle={points:Array.from({length:24},(_,i)=>({x:arrival.x+Math.cos(i*Math.PI/12)*.4,z:arrival.z+Math.sin(i*Math.PI/12)*.4}))};assert.ok(area(clip.intersection(poly(circle),poly(RACK)))<1e-6);
});
test('three outdoor arrivals preserve their vertical layer and remain outside closed rooms',()=>{
 for(const view of OLD_MAIN_ENTRY_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));assert.equal(view.showSign,false);assert.match(view.description,/Current access and interiors are not represented/);const circle={points:Array.from({length:24},(_,i)=>({x:view.x+Math.cos(i*Math.PI/12)*.4,z:view.z+Math.sin(i*Math.PI/12)*.4}))};for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(poly(circle),poly(room)))<1e-6);if(view.walkFloor!==undefined)assert.ok(Math.abs(finalTerrain(view.x,view.z)-view.walkFloor)<1e-8);}
});
test('the local reconstructed ground leaves the rest of the public terrain unchanged',()=>{
 let changed=0;for(let row=0;row<grid.rows;row+=2)for(let col=0;col<grid.cols;col+=2){const x=grid.x0+col*grid.dx,z=grid.z0+row*grid.dz,old=previousTerrain(x,z),now=finalTerrain(x,z);if(Math.abs(now-old)>1e-8){changed++;assert.ok(CUT.some(p=>contains({x,z},p)));}else assert.equal(now,old);assert.ok(Number.isFinite(terrainHeight(x,z)));}assert.ok(changed>0&&changed<20);assert.equal(oldMainEntryHeight(-300,0),undefined);
});
