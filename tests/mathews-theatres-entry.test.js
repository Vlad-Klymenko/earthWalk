import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {mathewsTheatreFacades,mathewsTheatreAprons,MATHEWS_THEATRES_VIEW} from '../dist/mathews-theatres-facade.js';
import {mathewsTheatreGeometry} from '../dist/bioscience-data.js';
import {buildingBase,terrainHeight} from '../dist/terrain.js';
import {framePoint} from '../dist/geometry.js';
const raw=RAW.buildings.find(b=>b.id==='mathews-theatres'),b=CAMPUS.buildings.find(b=>b.id===raw.id),faces=mathewsTheatreFacades(b),frame=mathewsTheatreGeometry(b).frame;
const inside=(p,ps)=>{let c=false;for(let i=0,j=ps.length-1;i<ps.length;j=i++)if((ps[i].z>p.z)!==(ps[j].z>p.z)&&p.x<(ps[j].x-ps[i].x)*(p.z-ps[i].z)/(ps[j].z-ps[i].z)+ps[i].x)c=!c;return c;};
test('D23 retains its mapped flat slab and separate height evidence',()=>{
 assert.deepEqual(b.points,raw.points);assert.equal(b.points.length,8);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,12);assert.equal(b.levels,3);assert.equal(b.heightSource,'mapped');assert.equal(b.roofShape,'flat');assert.match(b.heightNote,/neighbouring steep roof is Clancy/);assert.match(b.heightNote,/not constitute a surveyed stepped access route/);
});
test('new recessed glazing and solid masonry completely partition each original wall',()=>{
 for(const f of faces){
  const solid=f.masonry.reduce((s,c)=>s+(c.right-c.left)*(c.top-c.bottom),0),open=f.holes.reduce((s,h)=>s+(h.right-h.left)*(h.top-h.bottom),0);assert.ok(Math.abs(solid+open-b.height)<1e-9);
  for(const c of f.masonry){assert.ok(c.left>=0&&c.right<=1&&c.bottom>=0&&c.top<=b.height);assert.ok(c.left<c.right&&c.bottom<c.top);for(const h of f.holes)assert.ok(Math.min(c.right,h.right)-Math.max(c.left,h.left)<1e-9||Math.min(c.top,h.top)-Math.max(c.bottom,h.bottom)<1e-9);}
  for(let i=0;i<f.masonry.length;i++)for(let j=i+1;j<f.masonry.length;j++){const a=f.masonry[i],c=f.masonry[j];assert.ok(Math.min(a.right,c.right)-Math.max(a.left,c.left)<1e-9||Math.min(a.top,c.top)-Math.max(a.bottom,c.bottom)<1e-9);}
 }
});
test('pavilion and lower entrances face opposite sides with physically inset glass',()=>{
 const doorFaces=faces.filter(f=>f.holes.some(h=>h.id.includes('doors')));assert.ok(doorFaces.some(f=>f.mode==='east'));assert.ok(doorFaces.some(f=>f.mode==='west'));
 for(const f of faces)for(const h of f.holes){const t=(h.left+h.right)/2,p=f.point(t,h.bottom,-h.recess),q=f.point(t,h.bottom);assert.ok(h.recess>=.45&&h.recess<=.65);assert.ok(h.top<b.height&&h.bottom>=.22);assert.ok(Math.abs((p[0]-q[0])*f.nx+(p[2]-q[2])*f.nz+h.recess)<1e-8);assert.ok(inside({x:p[0],z:p[2]},raw.points),'pane is inside its wall');}
});
test('sill references remain tied to unchanged public DEM with section estimates explicit',()=>{
 for(const side of ['east','west']){const u=(side==='east'?1:-1)*frame.width/2,expected=Math.max(...[-8,-4,0,4,8].map(v=>{const p=framePoint(frame,u,v);return terrainHeight(p.x,p.z);}))+ .22-buildingBase(b.points);for(const f of faces.filter(f=>f.mode===side))assert.equal(f.floor,expected);}
 for(const p of RAW.paths){assert.ok(CAMPUS.paths.some(q=>q.id===p.id&&q.width===p.width&&JSON.stringify(q.points)===JSON.stringify(p.points)),p.id);}
});
test('new pavilion destination clears all occupied building volumes and is searchable',()=>{
 const p=MATHEWS_THEATRES_VIEW;assert.ok(CAMPUS.landmarks.some(q=>q.id===p.id));assert.ok(p.x>CAMPUS.bounds.minX&&p.x<CAMPUS.bounds.maxX&&p.z>CAMPUS.bounds.minZ&&p.z<CAMPUS.bounds.maxZ);for(const room of CAMPUS.buildings.filter(b=>!b.walkableUnder))for(let i=0;i<16;i++)assert.equal(inside({x:p.x+Math.cos(i*Math.PI/8)*.4,z:p.z+Math.sin(i*Math.PI/8)*.4},room.points),false,room.id);
 const target=framePoint(frame,frame.width/2,3);assert.ok(Math.abs(p.heading-Math.atan2(target.x-p.x,p.z-target.z))<1e-10);
});

test('bounded entrance aprons match the walking triangles and stay outside occupied rooms',()=>{
 const aprons=mathewsTheatreAprons(b);assert.equal(aprons.length,2);
 for(const part of aprons)for(const tri of part.triangles){
  const ps=tri.map(i=>part.vertices[i]);for(const weights of [[1/3,1/3,1/3],[.2,.3,.5]]){const p={x:0,y:0,z:0};ps.forEach((q,i)=>{for(const k of ['x','y','z'])p[k]+=q[k]*weights[i];});assert.ok(Math.abs(part.heightAt(p.x,p.z)-p.y)<1e-8);for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.equal(inside(p,room.points),false,room.id);}
 }
});
