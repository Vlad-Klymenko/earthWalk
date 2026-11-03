import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {inventoryTree,inventoryTreeGeometry,treeForm} from '../dist/tree-geometry.js';
import {terrainHeight} from '../dist/terrain.js';
import {CHANCELLOR_ART as ART,CHANCELLOR_TREES,CHANCELLOR_FLOWERING_TREES,CHANCELLOR_VIEWS,chancellorBlossoms,chancellorPoint} from '../dist/chancellors-garden-data.js';
import {CHANCELLOR_GROUND as GROUND,CHANCELLOR_ROUTES as ROUTES,CHANCELLOR_GARDENS as GARDENS,CHANCELLOR_LAWNS as LAWNS,CHANCELLOR_PAVING as PAVING,CHANCELLOR_MESH as MESH,CHANCELLOR_POOL as POOL,CHANCELLOR_PLANTS as PLANTS,CHANCELLOR_REMNANTS as REMAINS} from '../dist/chancellors-garden-parts.js';
import {fountainFigureGeometry} from '../dist/fountain-figure.js';
import {ShapeUtils,Vector2,Vector3} from '../dist/vendor/three.module.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0),union=ps=>ps.length?clip.union(...ps.map(poly)):[];
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;},contains=(p,q)=>inside(p,q.points)&&!(q.holes||[]).some(h=>inside(p,h));
const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);},evidence=JSON.parse(fs.readFileSync(new URL('../sources/chancellors-garden-evidence.json',import.meta.url)));
test('garden source rings and layer classifications remain public plan evidence, separate from the fountain interpretation',()=>{
 for(const name of ['gardens','lawns','paving']){const s=evidence[name];assert.match(s.source,/gis.unsw.edu.au/);assert.equal(s.query.outFields,'OBJECTID');assert.equal(s.response.spatialReference.wkid,4326);assert.ok(s.response.features.length);for(const f of s.response.features)assert.deepEqual(Object.keys(f.attributes),['OBJECTID']);}
 assert.equal(evidence.lawns.response.features.find(f=>f.attributes.OBJECTID===32).geometry.rings[0].length,7);assert.match(POOL.note,/classifies object 32 as lawn/);assert.equal(POOL.reconstructed,true);assert.equal(ART.width,1.86);assert.equal(ART.height,.72);assert.equal(ART.depth,.87);assert.equal(evidence.artwork.medium,'Electrolytic Copper');assert.equal(evidence.photographs.length,2);
 const raw=RAW.greens.find(g=>g.id==='osm-way-45490084'),kept=CAMPUS.greens.find(g=>g.id===raw.id);assert.deepEqual(kept.points,raw.points);assert.equal(kept.mappedName,raw.name);assert.equal(kept.name,'Chancellor’s Garden');
});
test('court surfaces form a complete non-overlapping partition outside all original occupied rooms',()=>{
 const ground=union(GROUND),surfaces=[union(GARDENS),union(LAWNS),union(PAVING),[poly({points:POOL.points})],union(ROUTES)];assert.ok(area(ground)>1000);assert.ok(area(surfaces[0])>100);assert.ok(area(surfaces[1])>400);assert.ok(area(surfaces[2])>250);assert.ok(area(surfaces[3])>10&&area(surfaces[3])<20);
 for(let i=0;i<surfaces.length;i++)for(let j=i+1;j<surfaces.length;j++)assert.ok(area(clip.intersection(surfaces[i],surfaces[j]))<1e-4);assert.ok(area(clip.difference(ground,clip.union(...surfaces)))<1e-4);for(const room of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(ground,poly(room)))<1e-4,room.id);
 for(const b of RAW.buildings){const kept=CAMPUS.buildings.find(p=>p.id===b.id);assert.deepEqual(kept.points,b.points);assert.deepEqual(kept.tags,b.tags);}for(const path of RAW.paths){assert.ok(CAMPUS.paths.some(p=>p.id===path.id&&p.width===path.width&&JSON.stringify(p.points)===JSON.stringify(path.points)));}
});
test('bounded surface strips and old green remnants triangulate with the real renderer without filling pool holes',()=>{
 for(const [key,parts] of Object.entries({gardens:GARDENS,lawns:LAWNS,paving:PAVING}))assert.ok(Math.abs(area(union(MESH[key]))-area(union(parts)))<1e-4);
 for(const p of [...Object.values(MESH).flat(),...Object.values(REMAINS.greens).flat(),POOL]){const all=[...p.points,...p.holes.flat()],tris=ShapeUtils.triangulateShape(p.points.map(p=>new Vector2(p.x,p.z)),p.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(tris.reduce((s,t)=>s+ringArea(t.map(i=>[all[i].x,all[i].z])),0)-area([poly(p)]))<1e-4);}
 assert.ok(POOL.holes[0].every(p=>inside(p,POOL.points)));assert.ok(POOL.rimRL>POOL.waterRL&&POOL.waterRL>POOL.baseRL);for(const p of POOL.points)assert.ok(POOL.waterRL>terrainHeight(p.x,p.z)+.05);
});
test('retained tree points and size bands are unchanged, with blossoms bounded to three inventoried jacarandas',()=>{
 assert.equal(CHANCELLOR_TREES.length,6);assert.equal(CHANCELLOR_FLOWERING_TREES.length,3);assert.equal(treeForm('Taxodium distichum'),'conifer');
 for(const id of CHANCELLOR_TREES){const source=TREE_INVENTORY.find(t=>t.id===id),tree=inventoryTree(source),g=inventoryTreeGeometry(tree),flowers=chancellorBlossoms(tree,g);assert.equal(tree.x,source.x);assert.equal(tree.z,source.z);assert.equal(tree.heightBand,source.heightBand);assert.equal(tree.canopyBand,source.canopyBand);if(source.botanicalName==='Jacaranda mimosifolia')assert.equal(flowers.length,g.leaves.length*3);else assert.equal(flowers.length,0);for(const p of flowers){const margin=p.size*Math.SQRT2/2;assert.ok(p.y-margin>=0&&p.y+margin<=tree.height);assert.ok(Math.hypot(p.x,p.z)+margin<=tree.canopy/2);}}
 const other=inventoryTree(TREE_INVENTORY.find(t=>t.botanicalName==='Jacaranda mimosifolia'&&!CHANCELLOR_FLOWERING_TREES.includes(t.id)));assert.equal(chancellorBlossoms(other,inventoryTreeGeometry(other)).length,0);
});
test('shrubs stay fully within mapped garden beds, clear retained trunks and leave the northern entrance open',()=>{
 assert.ok(PLANTS.length>250&&PLANTS.length<400);for(const p of PLANTS){const bed=GARDENS.find(g=>contains(p,g));assert.ok(bed);for(const r of [bed.points,...bed.holes])for(let i=0;i<r.length;i++)assert.ok(distance(p,r[i],r[(i+1)%r.length])>p.radius+.05);for(const t of TREE_INVENTORY)assert.ok(Math.hypot(p.x-t.x,p.z-t.z)>.65);assert.ok(p.height>=.38&&p.height<=.8);}
 for(let v=-34.1;v<-25;v+=.25){const p=chancellorPoint(45,v);assert.ok(GROUND.some(g=>contains(p,g)));assert.ok(!PLANTS.some(s=>Math.hypot(p.x-s.x,p.z-s.z)<s.radius+.35));}
});
test('reclining figure mesh fits catalogue height, width and depth with finite nondegenerate geometry',()=>{
 const g=fountainFigureGeometry(),box=g.boundingBox,size=box.getSize(new Vector3());for(const [actual,expected] of [[size.x,ART.width],[size.y,ART.height],[size.z,ART.depth]])assert.ok(Math.abs(actual-expected)<1e-6);assert.ok(Math.abs(box.min.y)<1e-8);assert.equal(g.userData.reconstructed,true);assert.ok(g.attributes.position.count>1000&&g.attributes.position.count<25000);for(const attr of ['position','normal','uv','color'])assert.ok(Array.from(g.attributes[attr].array).every(Number.isFinite));g.dispose();
});
test('two outdoor arrivals keep a standing circle clear of rooms, pool and retained tree trunks',()=>{
 assert.equal(CHANCELLOR_VIEWS.length,2);for(const v of CHANCELLOR_VIEWS){assert.ok(CAMPUS.landmarks.some(l=>l.id===v.id));assert.equal(v.showSign,false);assert.match(v.description,/estimates/);const circle={points:Array.from({length:24},(_,i)=>({x:v.x+Math.cos(i*Math.PI/12)*.4,z:v.z+Math.sin(i*Math.PI/12)*.4}))};for(const p of [...RAW.buildings.filter(b=>!b.walkableUnder),{points:POOL.points}])assert.ok(area(clip.intersection(poly(circle),poly(p)))<1e-5);for(const t of TREE_INVENTORY)assert.ok(Math.hypot(v.x-t.x,v.z-t.z)>(t.dbhMm||200)/2000+.4);assert.ok(Number.isFinite(terrainHeight(v.x,v.z)));}
});
