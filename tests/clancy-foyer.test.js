import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {framePoint} from '../dist/geometry.js';
import {terrainHeight} from '../dist/terrain.js';
import {CLANCY_ID,CLANCY_FOYER as G,CLANCY_CANOPY as C,CLANCY_GLAZING,CLANCY_CANOPY_POINTS,CLANCY_HANGERS,CLANCY_GLASS_FINS,CLANCY_DETAIL_VIEWS,clancySurfaceUV} from '../dist/clancy-foyer-data.js';
const area=g=>g.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((s,p,j)=>{const q=r[(j+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2,0),0);
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const circle=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i*Math.PI/16)*r,p.z+Math.sin(i*Math.PI/16)*r])];
test('Clancy detail retains map geometry and distinguishes component evidence from the estimated maximum',()=>{
 const raw=RAW.buildings.find(b=>b.id===CLANCY_ID),shown=CAMPUS.buildings.find(b=>b.id===CLANCY_ID);assert.deepEqual(raw.points,shown.points);assert.deepEqual(raw.tags,shown.tags);assert.equal(shown.height,14.5);assert.equal(shown.heightSource,'estimated');assert.equal(C.width,23);assert.equal(CLANCY_GLAZING.height,10);assert.ok(C.reconstructed&&CLANCY_GLAZING.reconstructed);
});
test('shingle UVs retain both dimensions on vertical and sloping faces',()=>{
 for(const points of [[[0,0,0],[4,0,0],[4,4,0],[0,4,0]],[[0,0,0],[0,0,4],[0,4,4],[0,4,0]],[[0,0,0],[4,0,0],[4,3,4],[0,3,4]]]){
  const uv=clancySurfaceUV(points);for(let i=0;i<4;i++){const j=(i+1)%4,world=Math.hypot(...points[i].map((n,k)=>n-points[j][k])),mapped=Math.hypot(uv[i][0]-uv[j][0],uv[i][1]-uv[j][1])*4;assert.ok(Math.abs(world-mapped)<1e-9);assert.ok(uv[i].every(Number.isFinite));}
 }
});
test('suspended canopy clears the retained sloping terrain and its rods meet the hood',()=>{
 const glass=framePoint(G.frame,G.hood.centreU,G.hood.glassV),base=terrainHeight(glass.x,glass.z);
 for(let i=0;i<=20;i++)for(let j=0;j<=8;j++){const p=framePoint(G.frame,G.hood.centreU-C.width/2+C.width*i/20,C.frontV+(C.backV-C.frontV)*j/8);assert.ok(base+C.height-C.beamDepth-terrainHeight(p.x,p.z)>2.4);}
 assert.equal(CLANCY_HANGERS.length,6);for(const rod of CLANCY_HANGERS){assert.ok(rod.v>C.frontV&&rod.v<C.backV);assert.ok(Math.abs(rod.u-G.hood.centreU)<C.width/2);assert.ok(rod.top>rod.bottom);assert.equal(rod.top,G.roofHeight(rod.v)-.27);}
 assert.equal(CLANCY_CANOPY_POINTS.length,4);
});
test('glass fins stay on the existing glazed frontage behind the arrival route',()=>{
 for(const fin of CLANCY_GLASS_FINS){assert.ok(Math.abs(fin.u-G.hood.centreU)<=G.hood.width/2+1e-8);assert.equal(fin.top,10);assert.ok(fin.bottom>0);assert.ok(fin.backV>fin.frontV);assert.ok(fin.frontV>C.frontV&&fin.frontV<C.backV);}
});
test('Clancy comparison destinations clear occupied mapped footprints and face the new details',()=>{
 for(const view of CLANCY_DETAIL_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));for(const b of RAW.buildings.filter(b=>!b.tags?.['building:part']&&!b.name?.includes('Canopy'))){if(['osm-way-1178531028','osm-way-1178531029','osm-way-1178531030'].includes(b.id))continue;assert.ok(area(clipping.intersection([circle(view,.4)],poly(b)))<1e-7,view.id+' clears '+b.id);}const target=framePoint(G.frame,G.hood.centreU,-18);assert.ok((Math.sin(view.heading)*(target.x-view.x)-Math.cos(view.heading)*(target.z-view.z))/Math.hypot(target.x-view.x,target.z-view.z)>.99);}
});
