import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {MALL_GROUND,MALL_GREEN,MALL_PAVING,MALL_PAVING_MESH,MALL_GREEN_MESH,MALL_REMNANTS} from '../dist/mall-landscape-parts.js';
import {MALL_PATH_IDS,MALL_PATTERN,MALL_LIGHT,mallPathKey,mallCoordinates,mallLightCandidates} from '../dist/mall-landscape-data.js';
import {mallGreenOffset} from '../dist/mall-landscape.js';
import {SOUTHERN_SCOPE as S} from '../dist/southern-drive-data.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const area=m=>m.reduce((s,p)=>s+ra(p[0])-p.slice(1).reduce((s,r)=>s+ra(r),0),0);
const union=ps=>clip.union(...ps.map(poly));
// Derived render coordinates use a 1e-6 m grid; aggregate area comparisons allow 1 cm².
const AREA_EPS=1e-4;
test('named public GIS court and landscape evidence retain only requested public fields',()=>{
 const s=JSON.parse(fs.readFileSync(new URL('../sources/mall-gis-evidence.json',import.meta.url)));assert.equal(s.layers.courtyard.features.length,1);const c=s.layers.courtyard.features[0];assert.equal(c.attributes.Name,'University Mall');assert.equal(c.attributes.OBJECTID,8);assert.deepEqual(Object.keys(c.attributes).sort(),['OBJECTID','Name','Location'].sort());
 for(const key of ['gardens','lawns']){assert.equal(s.layers[key].spatialReference.wkid,4326);assert.ok(s.layers[key].features.length>20);for(const f of s.layers[key].features)assert.deepEqual(Object.keys(f.attributes),['OBJECTID']);}
 assert.match(s.note,/includes lawn verges/);assert.equal(MALL_PATTERN.reconstructed,true);assert.equal(MALL_LIGHT.reconstructed,true);
});
test('paving and green verges form a complete non-overlapping partition without occupying mapped rooms',()=>{
 const ground=union(MALL_GROUND),paving=union(MALL_PAVING),green=union(MALL_GREEN);assert.ok(area(paving)>1500);assert.ok(area(green)>1000);assert.ok(area(clip.intersection(paving,green))<1e-6);assert.ok(Math.abs(area(ground)-area(clip.union(paving,green)))<AREA_EPS);
 for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(ground,poly(b)))<1e-5);
 for(const [source,mesh] of [[MALL_PAVING,MALL_PAVING_MESH],[MALL_GREEN,MALL_GREEN_MESH]]){assert.ok(Math.abs(area(union(source))-area(union(mesh)))<AREA_EPS);for(const part of mesh){const us=part.points.map(p=>mallCoordinates(p).u);assert.ok(Math.max(...us)-Math.min(...us)<=4.00001);}}
});
test('surface tiles and clipped original paths triangulate correctly, including holes and both landscape masks',()=>{
 const south=[[[S.minX,S.minZ],[S.maxX,S.minZ],[S.maxX,S.maxZ],[S.minX,S.maxZ]]],ground=union(MALL_GROUND);
 for(const part of [...MALL_PAVING_MESH,...MALL_GREEN_MESH,...Object.values(MALL_REMNANTS.paths).flatMap(p=>p.surface)]){
  const all=[...part.points,...part.holes.flat()],triangles=ShapeUtils.triangulateShape(part.points.map(p=>new Vector2(p.x,p.z)),part.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(triangles.reduce((s,t)=>s+ra(t.map(i=>[all[i].x,all[i].z])),0)-area([poly(part)]))<1e-5);
 }
 for(const part of Object.values(MALL_REMNANTS.paths).flatMap(p=>[...p.surface,...p.edge])){assert.ok(area(clip.intersection(poly(part),ground))<1e-5);assert.ok(area(clip.intersection(poly(part),south))<1e-6);}
 const pointsA={id:'same-osm-id',points:[{x:0,z:0},{x:1,z:1}]},pointsB={id:'same-osm-id',points:[{x:100,z:0},{x:101,z:1}]};assert.notEqual(mallPathKey(pointsA),mallPathKey(pointsB));
});
test('fitted verge grades stay bounded and meet paving continuously without changing source paths',()=>{
 for(const p of MALL_PAVING)for(const r of [p.points,...p.holes])for(const q of r)assert.ok(Math.abs(mallGreenOffset(q.x,q.z)-.22)<1e-7);
 for(const p of MALL_GREEN_MESH)for(const q of p.points){const h=mallGreenOffset(q.x,q.z);assert.ok(h>=.005&&h<=.22);assert.ok(Math.abs(h-mallGreenOffset(q.x+.01,q.z))<=.00087);}
 for(const p of RAW.paths.filter(p=>MALL_PATH_IDS.includes(p.id))){const kept=CAMPUS.paths.find(q=>q.id===p.id);assert.deepEqual(kept.points,p.points);assert.equal(kept.width,p.width);}
});
test('reconstructed lighting candidates span the Mall with bounded sizes and leave a central walking corridor',()=>{
 const lights=mallLightCandidates();assert.ok(lights.length>40);assert.equal(new Set(lights.map(p=>p.id)).size,lights.length);assert.ok(lights.every(p=>p.diffuserTop<p.height&&p.diffuserBottom>3&&p.height===5.4&&p.radius===.16));
 for(const p of lights){const route=RAW.paths.filter(p=>MALL_PATH_IDS.includes(p.id)).flatMap(p=>p.points.slice(1).map((b,i)=>({a:p.points[i],b,width:p.width})));for(const {a,b,width} of route){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));assert.ok(Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>width/2+p.radius+.34);}}
});
test('initial camera and movement face along the actual Mall centreline in both horizontal axes',()=>{
 const route=RAW.paths.find(p=>p.id==='osm-way-45558517'),a=route.points.find(p=>p.x<-130&&p.x>-140),b=route.points.find(p=>p.x>-120&&p.x<-100),dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz),forward={x:Math.sin(CAMPUS.spawn.heading),z:-Math.cos(CAMPUS.spawn.heading)};
 assert.ok((forward.x*dx+forward.z*dz)/length>.99999);assert.equal(CAMPUS.spawn.heading,CAMPUS.landmarks.find(p=>p.id==='university-mall').heading);assert.equal(CAMPUS.spawn.x,RAW.spawn.x);assert.equal(CAMPUS.spawn.z,RAW.spawn.z);assert.notEqual(CAMPUS.spawn.heading,RAW.spawn.heading);
});
