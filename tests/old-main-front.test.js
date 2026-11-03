import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {OLD_MAIN_MAIN_ENTRY as E,OLD_MAIN_MAIN_STAIRS as S,OLD_MAIN_FIN as FIN,OLD_MAIN_WEST_PROFILE as W,FALCONER as ART,OLD_MAIN_MAIN_VIEWS,falconerWorldPoint} from '../dist/old-main-front-data.js';
import {OLD_MAIN_ROOFS as ROOFS,OLD_MAIN_FRONT_APRON as APRON,OLD_MAIN_FRONT_REMNANTS as REMAINS} from '../dist/old-main-front-parts.js';
import {oldNorthPoint as point,oldNorthLocal as local} from '../dist/old-main-north-data.js';
import {oldMainGeometry} from '../dist/old-main-data.js';
import {terrainHeight} from '../dist/terrain.js';
import {ShapeUtils,Vector2,Vector3} from '../dist/vendor/three.module.js';
import {falconerGeometry} from '../dist/falconer-geometry.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;},contains=(p,q)=>inside(p,q.points)&&!(q.holes||[]).some(h=>inside(p,h));
const evidence=JSON.parse(fs.readFileSync(new URL('../sources/old-main-front-evidence.json',import.meta.url))),b=RAW.buildings.find(b=>b.id==='osm-way-45490050'),g=oldMainGeometry(b);
test('main entrance survey and catalogue anchors stay separate from reconstructed roofs, plan and artwork mounting',()=>{
 assert.equal(evidence.survey.mainEntranceFloorRL,33.59);assert.equal(evidence.survey.mainEntranceDoorHeadRL,35.8);assert.equal(evidence.survey.lowerForecourtSpotRL,30.61);assert.equal(E.floorRL,evidence.survey.mainEntranceFloorRL);assert.equal(E.doorHeadRL,evidence.survey.mainEntranceDoorHeadRL);assert.match(evidence.survey.sha256,/^[a-f0-9]{64}$/);assert.match(evidence.survey.note,/No roof RL/);assert.equal(W.estimated,true);assert.equal(FIN.reconstructed,true);assert.equal(ART.height,14);assert.equal(ART.width,5.5);assert.equal(ART.depth,.2);assert.match(ART.note,/mounting RL/);assert.match(evidence.streetView.observation,/plain brick/);assert.match(evidence.historicalFacade.note,/not an absolute/);
 assert.equal(g.base+g.roof,46);assert.equal(g.base+g.westRoof,49.1);assert.equal(g.eastRows[0].low+g.base,30.65);assert.equal(g.eastRows[1].high+g.base,37.1);assert.equal(g.westRows[0].low+g.base,30.75);assert.ok(g.westRows.slice(1).every(p=>p.reconstructed));for(const row of g.westRows)assert.ok(row.high<g.westRoof-.5);
});
test('corrected return follows the public GIS entrance neighbourhood and roof pieces retain the full raw building footprint',()=>{
 const raw=CAMPUS.buildings.find(p=>p.id===b.id);assert.deepEqual(raw.points,b.points);assert.deepEqual(raw.tags,b.tags);assert.equal(raw.height,24);assert.equal(raw.levels,6);
 const roofUnion=clip.union(...Object.values(ROOFS).flat().map(poly));assert.ok(Math.abs(area(roofUnion)-area([poly(b)]))<1e-4);assert.ok(area(clip.intersection(clip.union(...ROOFS.west.map(poly)),clip.union(...ROOFS.east.map(poly))))<1e-4);assert.ok(FIN.u0>10.7&&FIN.u1<=14.21);assert.ok(FIN.v0>=28&&FIN.v1<35);assert.ok(ART.baseRL+ART.height<FIN.roofRL);
 for(const source of RAW.paths)assert.ok(CAMPUS.paths.some(p=>p.id===source.id&&p.width===source.width&&JSON.stringify(p.points)===JSON.stringify(source.points)));assert.ok(REMAINS.paths);const sourceArrival=RAW.paths.find(p=>p.id==='osm-way-45489147').points[1];assert.ok(contains(sourceArrival,S.landing));assert.ok(local(g.entryArrival).u<0,'old entrance at u60 has moved to the source approach');
});
test('turned main stair climbs continuously to the labelled floor and descends over the same visible treads',()=>{
 const floor=p=>{if(APRON.some(a=>contains(p,a)))return terrainHeight(p.x,p.z)+.055;return S.parts.reduce((h,s)=>contains(p,s)?Math.max(h,s.rl+.01):h,terrainHeight(p.x,p.z)+.005);};
 const route=[];for(let v=43;v>30.9;v-=.015)route.push(point(E.bottomU,v));for(let u=E.bottomU;u<5;u+=.015)route.push(point(u,30.9));const heights=route.map(floor);assert.ok(Math.abs(heights.at(-1)-33.6)<1e-8);let maxRise=0,maxDrop=0;for(let i=1;i<heights.length;i++){maxRise=Math.max(maxRise,heights[i]-heights[i-1]);maxDrop=Math.max(maxDrop,heights[i-1]-heights[i]);}assert.ok(maxRise<.22);assert.ok(maxDrop<.1);assert.ok(S.lowerRise<.18&&S.upperRise<.21);assert.equal(S.count,18);
 const fin=poly(FIN);for(const part of S.parts)assert.ok(area(clip.intersection(poly(part),fin))<1e-6);for(const p of route)assert.ok(!contains(p,FIN));assert.ok(Math.abs(S.upper[0].points[1].x-S.upper[0].points[0].x)>Math.abs(S.upper[0].points[1].z-S.upper[0].points[0].z));
});
test('roof, apron and composed original-surface remnants triangulate with all openings intact',()=>{
 for(const p of [...Object.values(ROOFS).flat(),...APRON,...Object.values(REMAINS.greens).flat(),...Object.values(REMAINS.paths).flatMap(p=>[...p.surface,...p.edge])]){const holes=p.holes||[],all=[...p.points,...holes.flat()],tris=ShapeUtils.triangulateShape(p.points.map(p=>new Vector2(p.x,p.z)),holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(tris.reduce((s,t)=>s+ringArea(t.map(i=>[all[i].x,all[i].z])),0)-area([poly(p)]))<1e-4);}
 for(const apron of APRON){for(const stair of S.parts)assert.ok(area(clip.intersection(poly(apron),poly(stair)))<1e-4);for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(poly(apron),poly(room)))<1e-4);}
});
test('full relief has the catalogue envelope, all pictured components and a finite outward-facing wall transform',()=>{
 const mesh=falconerGeometry(),size=mesh.boundingBox.getSize(new Vector3());for(const [actual,target]of [[size.x,ART.width],[size.y,ART.height],[size.z,ART.depth]])assert.ok(Math.abs(actual-target)<1e-6);for(const name of ['horse','rider','falcon','tree','sun','rain cloud','rain','constellation','arrow','dove','connecting rays'])assert.ok(mesh.userData.components.includes(name));assert.ok(mesh.attributes.position.count<20000);for(const name of ['position','normal','color','uv'])assert.ok(Array.from(mesh.attributes[name].array).every(Number.isFinite));
 const back=falconerWorldPoint(0,0,0),front=falconerWorldPoint(0,0,ART.depth),top=falconerWorldPoint(0,ART.height,0);assert.ok(Math.abs(local(back).u-ART.u)<1e-8);assert.ok(Math.abs(local(front).u-(ART.u-ART.depth))<1e-8);assert.equal(top.y,48.65);assert.ok(local(front).u>11.89,'source approach corridor clears the sculpture stand-off');assert.equal(mesh.userData.reconstructed,true);mesh.dispose();
});
test('new main entrance and art viewpoints clear occupied rooms and select the proper standing layer',()=>{
 for(const v of OLD_MAIN_MAIN_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===v.id));assert.equal(v.showSign,false);const circle={points:Array.from({length:24},(_,i)=>({x:v.x+Math.cos(i*Math.PI/12)*.4,z:v.z+Math.sin(i*Math.PI/12)*.4}))};for(const room of [...RAW.buildings.filter(b=>!b.walkableUnder),FIN])assert.ok(area(clip.intersection(poly(circle),poly(room)))<1e-5);if(v.walkFloor!==undefined){assert.equal(v.walkFloor,E.floorRL);assert.ok(contains(v,S.landing));}else assert.ok(Number.isFinite(terrainHeight(v.x,v.z)));}
});
