import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TERRAIN_GRID as GRID,terrainHeight} from '../dist/terrain.js';
import {scientiaPoint,scientiaLocal} from '../dist/scientia-data.js';
import {SCIENTIA_STEP_IDS,SCIENTIA_LANDING_LEVELS as LEVELS,SCIENTIA_FLIGHTS as FLIGHTS,SCIENTIA_STEP_SECTIONS as SECTIONS,SCIENTIA_STEPS_VIEWS as VIEWS,scientiaStepHeight,scientiaSectionHeight,scientiaOutsideStepSegments} from '../dist/scientia-steps-data.js';
import {SCIENTIA_STEP_GROUND as GROUND,SCIENTIA_STEP_GARDENS as GARDENS,SCIENTIA_STEP_LAWNS as LAWNS,SCIENTIA_STEP_PAVING as PAVING,SCIENTIA_STEP_FLOORS as FLOORS,SCIENTIA_STEP_TIERS as TIERS,SCIENTIA_STEP_REMOVED_TRIANGLES as REMOVED,SCIENTIA_STEP_GROUND_EDGES as EDGES} from '../dist/scientia-steps-parts.js';
import {SCIENTIA_HEDGES as HEDGES,SCIENTIA_STEP_PARAPET as PARAPET,inScientiaSteps} from '../dist/scientia-steps-geometry.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const source=JSON.parse(fs.readFileSync(new URL('../sources/scientia-steps-evidence.json',import.meta.url))),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=ps=>ps.reduce((s,p)=>s+ra(p[0])-p.slice(1).reduce((s,h)=>s+ra(h),0),0),union=ps=>ps.length?clip.union(...ps.map(poly)):[],circle=(p,r)=>({points:Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r}))});
const dist=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
test('public landscape rings retain source IDs while all fine landing references remain explicit DEM-derived estimates',()=>{
 for(const n of [22,24,25]){const layer=source.layers[n];assert.match(layer.url,/gis.unsw.edu.au/);assert.equal(layer.response.spatialReference.wkid,4326);for(const f of layer.response.features)assert.deepEqual(Object.keys(f.attributes),['OBJECTID']);}assert.match(source.note,/no upper-main-step paving outline/);assert.match(source.grade,/not a tread survey/);
 assert.equal(FLIGHTS.length,5);assert.equal(LEVELS.length,6);for(const l of LEVELS){assert.equal(l.dem,terrainHeight(l.x,l.z));assert.equal(l.height,l.dem+.23);}assert.equal(FLIGHTS.reduce((s,f)=>s+f.count,0),44);for(const f of FLIGHTS){assert.ok(f.rise>.14&&f.rise<.17);assert.ok(f.tread>.29&&f.tread<.4);assert.equal(f.high-f.low,f.rise*f.count);assert.equal(f.reconstructed,true);}
 for(const b of RAW.buildings){const kept=CAMPUS.buildings.find(p=>p.id===b.id);assert.deepEqual(kept.points,b.points);assert.deepEqual(kept.tags,b.tags);}for(const p of RAW.paths)assert.ok(CAMPUS.paths.some(q=>q.id===p.id&&q.width===p.width&&JSON.stringify(q.points)===JSON.stringify(p.points)));
});
test('derived planting, grass and paving completely partition the bounded ground while clearing original rooms and the southern road',()=>{
 const g=union(GROUND),sets=[union(GARDENS),union(LAWNS),union(PAVING)];assert.ok(area(g)>900&&area(g)<1000);for(let i=0;i<sets.length;i++)for(let j=i+1;j<sets.length;j++)assert.ok(area(clip.intersection(sets[i],sets[j]))<1e-4);assert.ok(area(clip.difference(g,clip.union(...sets)))<1e-4);assert.ok(area(clip.difference(clip.union(...sets),g))<1e-4);assert.ok(Math.abs(area(union(TIERS))-area(union(GARDENS)))<1e-4);
 for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(g,poly(b)))<1e-4,b.id);
 for(const p of RAW.paths.filter(p=>/road|service|residential/.test(p.kind)))for(let i=1;i<p.points.length;i++){const a=p.points[i-1],b=p.points[i],len=Math.hypot(b.x-a.x,b.z-a.z),w=(p.width||6)/2,n={x:-(b.z-a.z)/len*w,z:(b.x-a.x)/len*w},r={points:[{x:a.x+n.x,z:a.z+n.z},{x:b.x+n.x,z:b.z+n.z},{x:b.x-n.x,z:b.z-n.z},{x:a.x-n.x,z:a.z-n.z}]};assert.ok(area(clip.intersection(g,poly(r)))<1e-4,p.id);}
});
test('floor cells triangulate with the renderer, cover paving and lawns and have bounded heights with no long continuous stair remaining',()=>{
 assert.ok(Math.abs(area(union(FLOORS))-area(clip.union(union(PAVING),union(LAWNS))))<1e-4);
 for(const p of FLOORS){const all=[...p.points,...p.holes.flat()],tris=ShapeUtils.triangulateShape(p.points.map(p=>new Vector2(p.x,p.z)),p.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(tris.reduce((s,t)=>s+ra(t.map(i=>[all[i].x,all[i].z])),0)-area([poly(p)]))<1e-4);const section=SECTIONS[p.section];for(const q of all){const y=scientiaSectionHeight(section,q.x,q.z);assert.ok(Number.isFinite(y)&&y>35&&y<45);}if(section.kind==='tread')assert.ok(section.height-section.bottom<.17);}
 for(const p of RAW.paths.filter(p=>SCIENTIA_STEP_IDS.includes(p.id)))for(const s of scientiaOutsideStepSegments(p)){const u=scientiaLocal({x:(s.a.x+s.b.x)/2,z:(s.a.z+s.b.z)/2}).u;assert.ok(u<-56||u>-8.3176318);assert.ok(s.count>0);}
});
test('exact clipped terrain fragments replace every source triangle touched by the terrace scope',()=>{
 assert.equal(new Set(REMOVED.map(p=>p.join(','))).size,REMOVED.length);assert.ok(REMOVED.length>100);const g=union(GROUND),kept=union(EDGES),original=[];
 for(const [col,row,i]of REMOVED){const a={x:GRID.x0+col*GRID.dx,z:GRID.z0+row*GRID.dz},b={x:a.x+GRID.dx,z:a.z},c={x:a.x,z:a.z+GRID.dz},d={x:b.x,z:c.z};original.push({points:i?[b,d,c]:[a,b,c]});}assert.ok(area(clip.intersection(g,kept))<1e-4);assert.ok(Math.abs(area(union(original))-area(kept)-area(g))<1e-3);
});
test('low planting and parapet gaps keep the source routes and retained tree points clear',()=>{
 assert.ok(HEDGES.length>100&&HEDGES.length<250);for(const h of HEDGES){assert.ok(area(clip.difference(poly(circle(h,h.radius)),poly(TIERS[h.tier])))<1e-5);assert.equal(h.root,TIERS[h.tier].soil);assert.ok(h.height>.35&&h.height<.51);for(const p of RAW.paths)for(let i=1;i<p.points.length;i++)assert.ok(dist(h,p.points[i-1],p.points[i])>(p.width||2.4)/2+h.radius+.03,p.id);for(const t of TREE_INVENTORY)assert.ok(Math.hypot(t.x-h.x,t.z-h.z)>h.radius+(t.dbhMm||200)/2000+.3);}
 assert.ok(PARAPET.length>50);for(const wall of PARAPET){assert.ok(wall.topA>wall.low&&wall.topB>wall.low);for(const p of RAW.paths.filter(p=>!['road','service','residential'].includes(p.kind)))for(let i=1;i<p.points.length;i++){const mid={x:(wall.a.x+wall.b.x)/2,z:(wall.a.z+wall.b.z)/2};assert.ok(dist(mid,p.points[i-1],p.points[i])>(p.width||2.4)/2+.49,p.id);}}
});
test('both stair lanes climb continuously beside the central rail and have clear map arrivals',()=>{
 assert.equal(VIEWS.length,2);for(const v of VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===v.id));assert.equal(v.showSign,false);assert.ok(inScientiaSteps(v.x,v.z));assert.equal(v.walkFloor,scientiaStepHeight(v.x,v.z));assert.ok(area(clip.intersection(poly(circle(v,.4)),union(TIERS)))<1e-5);}
 for(const v of [2.65,6.75]){let previous;for(let u=-55;u<-8.5;u+=.05){const p=scientiaPoint(u,v),y=scientiaStepHeight(p.x,p.z);assert.ok(inScientiaSteps(p.x,p.z));if(previous!==undefined){assert.ok(y>=previous-.005);assert.ok(y-previous<.17);}previous=y;assert.ok(!TIERS.some(t=>area(clip.intersection(poly(circle(p,.34)),poly(t)))>1e-5));}}
});
