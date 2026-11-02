import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {frameRectangle} from '../dist/geometry.js';
import {terrainHeight} from '../dist/terrain.js';
import {NIDA_SCHOOL_IDS,NIDA_SCHOOL_ID,NIDA_WEST_ID,NIDA_SCHOOL_STREET_PATH,nidaSchoolGeometry,nidaSchoolColumns,nidaSchoolRoofHeight,nidaSchoolBoundarySegments} from '../dist/nida-school-data.js';
import {NIDA_SCHOOL_PARTS as PARTS,NIDA_SCHOOL_COURTS as COURTS,NIDA_SCHOOL_PAVING as PAVING,NIDA_SCHOOL_GARDENS as GARDENS} from '../dist/nida-school-parts.js';
import {buildingAppearance,VISUAL_REFERENCES} from '../dist/visual-data.js';
const poly=p=>[p.map(p=>[p.x,p.z])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const area=p=>p.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const shape=p=>[...poly(p.points),...(p.holes||[]).map(r=>poly(r)[0])];
const disc=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i/24*Math.PI*2)*r,p.z+Math.sin(i/24*Math.PI*2)*r])];
const occupied=PARTS.filter(p=>!['cover','gallery'].includes(p.kind)),g=nidaSchoolGeometry();
const pathShapes=RAW.paths.flatMap(path=>path.points.slice(1).map((c,i)=>{const a=path.points[i],length=Math.hypot(c.x-a.x,c.z-a.z),frame={x:(a.x+c.x)/2,z:(a.z+c.z)/2,u:{x:-(c.z-a.z)/length,z:(c.x-a.x)/length},v:{x:(c.x-a.x)/length,z:(c.z-a.z)/length}};return{id:path.id,points:frameRectangle(frame,path.width||3,length)};}));

test('original NIDA outlines and independent two-level / estimated-height evidence remain intact',()=>{
 for(const id of NIDA_SCHOOL_IDS){const raw=RAW.buildings.find(b=>b.id===id),b=CAMPUS.buildings.find(b=>b.id===id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,6.4);assert.equal(b.heightSource,'estimated');assert.equal(b.levels,2);assert.match(b.heightNote,/different component/);assert.equal(buildingAppearance(b).facade,'nida-school');assert.ok(VISUAL_REFERENCES.some(r=>r.id===buildingAppearance(b).source));}
 assert.ok(CAMPUS.buildings.find(b=>b.id===NIDA_WEST_ID).named);assert.ok(CAMPUS.buildings.find(b=>b.id===NIDA_SCHOOL_ID).reconstructedMapHoles.length);
});
test('roof / open-court regions partition both complete source footprints without overlap',()=>{
 for(const id of NIDA_SCHOOL_IDS){const raw=RAW.buildings.find(b=>b.id===id),all=[...PARTS,...COURTS].filter(p=>p.sourceId===id).map(shape);assert.ok(area(clip.difference(poly(raw.points),...all))<1e-6);assert.ok(area(clip.difference(clip.union(...all),poly(raw.points)))<1e-6);for(let i=0;i<all.length;i++)for(let j=0;j<i;j++)assert.ok(area(clip.intersection(all[i],all[j]))<1e-7);}
 assert.ok(area(COURTS.map(shape))>500,'substantial outdoor courts are no longer extruded as a solid block');
});
test('six roof lanterns fit their parent hips and every roof with its opening triangulates to the expected area',()=>{
 assert.equal(PARTS.filter(p=>p.kind==='hip'&&p.lantern).length,6);
 for(const part of PARTS){const holes=[...part.holes,...(part.lantern?[part.lantern]:[])],all=[...part.points,...holes.flat()],triangles=ShapeUtils.triangulateShape(part.points.map(p=>new Vector2(p.x,p.z)),holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));let rendered=0;
  for(const indices of triangles){rendered+=ringArea(indices.map(i=>[all[i].x,all[i].z]));for(const i of indices){const p=all[i],h=nidaSchoolRoofHeight(part,p);assert.ok(Number.isFinite(h));assert.ok(h<=part.base+6.4+1e-7);}}
  const expected=area([shape(part)])-holes.slice(part.holes.length).reduce((s,r)=>s+area([poly(r)]),0);assert.ok(Math.abs(rendered-expected)<1e-6,part.id+' triangulation');
  if(part.lantern)assert.ok(area(clip.difference(poly(part.lantern),shape(part)))<1e-7);
  if(part.kind==='hip')for(let i=0;i<part.points.length;i++){const a=part.points[i],c=part.points[(i+1)%part.points.length];for(let j=0;j<=20;j++){const q={x:a.x+(c.x-a.x)*j/20,z:a.z+(c.z-a.z)*j/20};assert.ok(Math.abs(nidaSchoolRoofHeight(part,q)-part.base-4.7)<1e-8,'hip eave meets the wall along the real clipped boundary');}}
 }
});
test('covered galleries preserve local standing height and all source footway widths remain outside occupied rooms',()=>{
 for(const p of PARTS.filter(p=>['cover','gallery'].includes(p.kind)))for(const q of p.points)assert.ok(nidaSchoolRoofHeight(p,q)-.18-terrainHeight(q.x,q.z)-.23>2.8);
 for(const part of occupied)for(const path of pathShapes)assert.ok(area(clip.intersection(shape(part),poly(path.points)))<1e-7,'occupied roof room avoids '+path.id);
});
test('courtyard paving and garden beds remain outside occupied rooms, original paths and other source buildings',()=>{
 for(const p of [...PAVING,...GARDENS]){for(const room of occupied)assert.ok(area(clip.intersection(shape(p),shape(room)))<1e-6);for(const b of RAW.buildings.filter(b=>!b.walkableUnder&&!NIDA_SCHOOL_IDS.includes(b.id)))assert.ok(area(clip.intersection(shape(p),poly(b.points)))<1e-6);for(const path of pathShapes)assert.ok(area(clip.intersection(shape(p),poly(path.points)))<1e-6);}
 for(const paving of PAVING)for(const bed of GARDENS)assert.ok(area(clip.intersection(shape(paving),shape(bed)))<1e-6);
});
test('columns, courtyard furniture and canopy supports leave the real circulation widths and neighbouring buildings clear',()=>{
 const columns=nidaSchoolColumns(PARTS),props=[...columns.map(p=>({p,r:p.radius+.1})),...[...g.trees,...g.streetTrees].map(p=>({p,r:p.radius+.15})),...g.benches.map(p=>({p,r:1.4})),...g.canopy.map(p=>({p,r:.16}))];assert.ok(columns.length>15);
 for(const {p,r}of props){for(const room of occupied)assert.ok(area(clip.intersection(disc(p,r),shape(room)))<1e-6,'prop avoids '+room.id);for(const path of pathShapes)assert.ok(area(clip.intersection(disc(p,r),poly(path.points)))<1e-6);for(const b of RAW.buildings.filter(b=>!b.walkableUnder&&!NIDA_SCHOOL_IDS.includes(b.id)))assert.ok(area(clip.intersection(disc(p,r),poly(b.points)))<1e-6);}
 for(const room of occupied)assert.ok(area(clip.intersection(poly(g.canopy),shape(room)))<1e-6);
});
test('all added NIDA map destinations retain player standing clearance in the actual occupied model',()=>{
 for(const id of [NIDA_SCHOOL_ID,NIDA_WEST_ID,'nida-school-court','nida-west-gallery']){const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);for(const room of occupied)assert.ok(area(clip.intersection(disc(p,.4),shape(room)))<1e-6,id+' avoids '+room.id);for(const column of nidaSchoolColumns(PARTS))assert.ok(Math.hypot(p.x-column.x,p.z-column.z)>.5);for(const tree of g.trees)assert.ok(Math.hypot(p.x-tree.x,p.z-tree.z)>tree.radius+.4);}
});

test('street boundary wall has solid finite-width geometry and the primary destination lies on the untouched Anzac footway',()=>{
 const walls=nidaSchoolBoundarySegments(g.boundaryWall),path=RAW.paths.find(p=>p.id===NIDA_SCHOOL_STREET_PATH),arrival=CAMPUS.landmarks.find(p=>p.id===NIDA_SCHOOL_ID);assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id),path);
 for(const wall of walls){assert.ok(Math.abs(area([poly(wall.points)])-wall.length*.22)<1e-7);for(const room of occupied)assert.ok(area(clip.intersection(poly(wall.points),shape(room)))<1e-6);for(const p of pathShapes)assert.ok(area(clip.intersection(poly(wall.points),poly(p.points)))<1e-6);assert.ok(area(clip.intersection(poly(wall.points),disc(arrival,.4)))<1e-6);}
 const onPath=path.points.slice(1).some((c,i)=>{const a=path.points[i],dx=c.x-a.x,dz=c.z-a.z,t=((arrival.x-a.x)*dx+(arrival.z-a.z)*dz)/(dx*dx+dz*dz);return t>=0&&t<=1&&Math.abs((arrival.x-a.x)*dz-(arrival.z-a.z)*dx)<1e-7;});assert.ok(onPath);
});
