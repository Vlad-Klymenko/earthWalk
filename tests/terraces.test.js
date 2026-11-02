import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as SOURCE} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {terrainHeight} from '../dist/terrain.js';
import {TERRACES_ID,TERRACES_HEIGHT_REPORT,terracesGeometry} from '../dist/terraces-data.js';
import {TERRACES_PARTS,TERRACES_FACES,TERRACES_PAVING} from '../dist/terraces-parts.js';
const raw=SOURCE.buildings.find(b=>b.id===TERRACES_ID),b=CAMPUS.buildings.find(b=>b.id===TERRACES_ID),g=terracesGeometry(raw);
const shape=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((sum,rings)=>sum+ringArea(rings[0])-rings.slice(1).reduce((n,r)=>n+ringArea(r),0),0);
const disc=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i/24*Math.PI*2)*r,p.z+Math.sin(i/24*Math.PI*2)*r])];
const perimeter=geometry=>geometry.flat().reduce((s,r)=>s+r.reduce((n,p,i)=>{const q=r[(i+1)%r.length];return n+Math.hypot(q[0]-p[0],q[1]-p[1]);},0),0);

test('B8 identity and derived context roof retain the source envelope and independent level evidence',()=>{
 assert.equal(b.name,'University Terraces');assert.equal(b.campusRef,'B8');assert.equal(b.mappedHeight,32);assert.equal(b.levels,8);assert.equal(b.builderLevels,7);assert.equal(b.heightSource,'derived');
 assert.equal(b.height+g.base,TERRACES_HEIGHT_REPORT.roofRL);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.reconstructedMapHoles,[g.court.points]);
 assert.ok(CAMPUS.landmarks.some(p=>p.id===TERRACES_ID));assert.ok(CAMPUS.landmarks.some(p=>p.id==='university-terraces-west'));
});

test('Terraces upper volumes open the photo-confirmed courtyard without extending the source footprint',()=>{
 const upper=TERRACES_PARTS.filter(p=>p.kind!=='retail'),union=clip.union(...upper.map(shape)),expected=clip.difference(shape(raw),shape(g.court));
 assert.ok(area(clip.xor(union,expected))<1e-6);assert.ok(area(clip.intersection(union,shape(g.court)))<1e-6);
 assert.ok(Math.abs(upper.reduce((s,p)=>s+area([shape(p)]),0)-area(union))<1e-6);
 assert.equal(Math.max(...upper.map(p=>p.height)),g.maximum);assert.ok(upper.some(p=>p.kind==='north-link'&&p.rows===3));
});

test('exposed Terraces faces match occupied part perimeters at retail, lower-link and tower levels',()=>{
 for(const h of [2,6,18,27]){
  const occupied=TERRACES_PARTS.filter(p=>p.minHeight<h&&p.height>h),expected=perimeter(clip.union(...occupied.map(shape)));
  const actual=TERRACES_FACES.filter(p=>p.bottom<h&&p.top>h).reduce((s,p)=>s+Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),0);
  assert.ok(Math.abs(expected-actual)<1e-4,`${h}: ${expected} vs ${actual}`);
 }
});

test('retained B8 crossing and edge footways fit a player and have standing clearance under the wings',()=>{
 const ground=clip.union(...TERRACES_PARTS.filter(p=>!p.minHeight).map(shape));
 for(const id of ['osm-way-655894584','osm-way-655894581','osm-way-655894582','osm-way-648137238']){
  const path=SOURCE.paths.find(p=>p.id===id);assert.deepEqual(CAMPUS.paths.find(p=>p.id===id).points,path.points);
  for(let i=1;i<path.points.length;i++){
   const a=path.points[i-1],c=path.points[i],steps=Math.ceil(Math.hypot(c.x-a.x,c.z-a.z)/.4);
   for(let j=0;j<=steps;j++){const t=j/steps,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};assert.ok(area(clip.intersection(ground,disc(p,.36)))<1e-6,`${id} fits player`);
    if(area(clip.intersection(shape(raw),disc(p,.1)))>1e-6)assert.ok(g.base+g.retail-.22-terrainHeight(p.x,p.z)-.22>2.2,'standing height below reconstructed decks');
   }
  }
 }
 for(const garden of g.gardens)for(const p of garden.points)assert.ok(g.gardenFloor-g.gardenSlab-terrainHeight(p.x,p.z)-.22>2.2);
});

test('Terraces viewpoints and support columns avoid occupied ground and source path widths',()=>{
 const occupied=clip.union(...TERRACES_PARTS.filter(p=>!p.minHeight).map(shape));
 for(const p of [g.westArrival,g.eastArrival,g.streetArrival]){assert.ok(area(clip.intersection(occupied,disc(p,.4)))<1e-6);for(const other of SOURCE.buildings.filter(b=>b.id!==TERRACES_ID&&!b.walkableUnder))assert.ok(area(clip.intersection(shape(other),disc(p,.4)))<1e-6);}
 assert.ok(g.columns.length>0,'photo-led round columns remain where paths permit');
 for(const p of g.columns)for(const path of SOURCE.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],c=path.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>=(path.width||2.1)/2+p.radius+.1);}
 assert.ok(g.balconyDepth>1&&g.balconyRail>=1);assert.ok(g.gardens.every(p=>area(clip.intersection(shape(p),shape(g.court)))>0));
});


test('paved arcades avoid occupied retail and raised gardens have closed retail rooms below',()=>{
 const occupied=clip.union(...TERRACES_PARTS.filter(p=>!p.minHeight).map(shape));
 assert.ok(TERRACES_PAVING.length>0);
 for(const patch of TERRACES_PAVING){assert.ok(area(clip.intersection(shape(patch),occupied))<1e-6);assert.ok(area(clip.difference(shape(patch),shape(raw)))<1e-6);}
 for(const garden of g.gardens)assert.ok(area(clip.intersection(shape(garden),occupied))>area([shape(garden)])*.8,'retail rooms support most of the planted deck');
});
