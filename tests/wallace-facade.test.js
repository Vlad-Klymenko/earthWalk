import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {MEDICAL_PARTS,MEDICAL_GROUND_FLOORS} from '../dist/medical-parts.js';
import {WALLACE_GEOMETRY as G,WALLACE_SCREEN as S,WALLACE_GRID,WALLACE_FLOORS,WALLACE_BANDS,WALLACE_EAST_FACES,WALLACE_PIERS,WALLACE_FACADE_VIEWS,wallaceFaceKind,wallaceWestSurface,wallaceCells,wallaceBandProfile,wallaceBayAppearance,wallaceFins,wallaceFinPoints,wallaceEave} from '../dist/wallace-facade-data.js';
import {framePoint} from '../dist/geometry.js';
import {terrainHeight} from '../dist/terrain.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((s,p)=>s+p.reduce((n,r,i)=>n+(i?-1:1)*Math.abs(r.reduce((a,v,j)=>{const q=r[(j+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const circle=(p,r)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];
const east=MEDICAL_PARTS.find(p=>p.buildingId==='wallace-wurth'&&p.kind==='east');
test('Wallace refinement preserves mapped evidence and existing planning component levels',()=>{
 const source=RAW.buildings.find(b=>b.id==='wallace-wurth'),shown=CAMPUS.buildings.find(b=>b.id===source.id);assert.deepEqual(shown.points,source.points);assert.deepEqual(shown.tags,source.tags);assert.equal(G.roofRL,87.01);assert.equal(G.plants[0].roofRL,90.55);assert.ok(Math.abs(shown.height+G.base-95)<1e-8);
 assert.equal(wallaceWestSurface(framePoint(G.frame,-21,-41),framePoint(G.frame,-4,-40)), 'north-pale');assert.equal(wallaceWestSurface(framePoint(G.frame,-4,34),framePoint(G.frame,-20,34)), 'south-brick');
 assert.deepEqual(WALLACE_FLOORS,[65.53,69.49,73.45,77.41]);assert.equal(S.baseRL,G.upperBaseRL);assert.ok(Math.abs(S.topRL-G.upperOfficeRL-.6)<1e-9);assert.ok(S.reconstructed);
});
test('east glazing grid continues across the retained source vertex without duplicated fins',()=>{
 const faces=WALLACE_EAST_FACES.filter(f=>wallaceFaceKind(f)==='folded-east');assert.equal(faces.length,2);let coverage=0;const anchors=new Set();
 for(const f of faces)for(const cell of wallaceCells(f)){coverage+=cell.end-cell.start;assert.ok(cell.start>=f.v0-1e-8&&cell.end<=f.v1+1e-8);for(const fin of wallaceFins(f,cell,0).filter(p=>!p.extra)){assert.ok(!anchors.has(fin.anchor));anchors.add(fin.anchor);}}
 assert.ok(Math.abs(coverage-WALLACE_GRID.v1+WALLACE_GRID.v0)<1e-8);assert.equal(anchors.size,WALLACE_GRID.count);assert.equal(WALLACE_GRID.count,32);
 assert.equal(WALLACE_EAST_FACES.filter(f=>wallaceFaceKind(f)==='folded-north'&&f.length>10).length,1);assert.equal(WALLACE_EAST_FACES.filter(f=>wallaceFaceKind(f)==='south-end').length,1);const north=WALLACE_EAST_FACES.find(f=>wallaceFaceKind(f)==='folded-north');assert.equal(wallaceCells(north).length,5);assert.ok(Math.abs(wallaceCells(north).reduce((s,c)=>s+c.end-c.start,0)-north.length)<1e-8);
});
test('folded bands, staggered shades and amber fields stay within the retained four laboratory floors',()=>{
 const tones=new Set();let extras=0;const bandHeight=WALLACE_BANDS.reduce((s,b)=>s+b.top-b.bottom,0);assert.ok(Math.abs(bandHeight+4*S.windowHeight-(S.topRL-S.baseRL))<1e-8);
 for(const f of WALLACE_EAST_FACES.filter(f=>['folded-east','folded-north'].includes(wallaceFaceKind(f))))for(const cell of wallaceCells(f)){
  const profile=wallaceBandProfile(cell);assert.equal(profile[0].v,cell.start);assert.equal(profile.at(-1).v,cell.end);for(const p of profile)assert.ok(p.d>=.099&&p.d<=S.finDepth+1e-8);
  for(let row=0;row<4;row++){const a=wallaceBayAppearance(cell,row);tones.add(a.color);for(const fin of wallaceFins(f,cell,row)){assert.ok(fin.bottom>=S.baseRL&&fin.top<=S.topRL);assert.ok(fin.top>fin.bottom);assert.ok(fin.depth<=S.finDepth);const points=wallaceFinPoints(f,fin);assert.equal(points.length,4);assert.ok(points.every(p=>Number.isFinite(p.x+p.z)));if(fin.extra)extras++;}}
 }
 assert.ok(extras>30);assert.equal(tones.size,2);
});
test('floating eave covers the source upper footprint with a bounded overhang and unchanged roof level',()=>{
 const roof=wallaceEave(east.points);assert.equal(roof.length,east.points.length);assert.ok(area(clip.difference(poly(east),poly({points:roof})))<1e-6);assert.ok(area([poly({points:roof})])>area([poly(east)]));
 for(let i=0;i<roof.length;i++){const a=east.points[i],b=roof[i];assert.ok(Math.hypot(a.x-b.x,a.z-b.z)<=S.eave*1.6+1e-8);assert.ok(G.roofRL-.2-terrainHeight(b.x,b.z)>3.2);}
});
test('tapered pier collision caps enclose the visible supports and keep the southern gateway clear',()=>{
 assert.equal(WALLACE_PIERS.length,G.supports.length);for(let i=0;i<WALLACE_PIERS.length;i++){const p=WALLACE_PIERS[i],s=G.supports[i];assert.equal(p.x,s.x);assert.equal(p.z,s.z);assert.ok(p.topWidth>p.bottomWidth&&p.topDepth>p.bottomDepth);assert.ok(area(clip.difference(poly({points:p.points}),poly(east)))<1e-6);assert.ok(G.upperBaseRL-terrainHeight(p.x,p.z)>2.4);}
 for(const v of [35,37,39]){const p=framePoint(G.frame,13,v);for(const pier of WALLACE_PIERS)assert.ok(area(clip.intersection([circle(p,.4)],poly({points:pier.points})))<1e-8);for(const room of MEDICAL_GROUND_FLOORS)assert.ok(area(clip.intersection([circle(p,.4)],poly(room)))<1e-8);}
});
test('new Wallace destinations remain clear of source ground footprints',()=>{
 for(const view of WALLACE_FACADE_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));assert.ok(view.x>CAMPUS.bounds.minX+1&&view.x<CAMPUS.bounds.maxX-1&&view.z>CAMPUS.bounds.minZ+1&&view.z<CAMPUS.bounds.maxZ-1);for(const b of RAW.buildings)assert.ok(area(clip.intersection([circle(view,.4)],poly(b)))<1e-7,view.id+' clears '+b.id);}
});
