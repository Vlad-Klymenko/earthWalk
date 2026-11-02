import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {REPOSITORY_ID,REPOSITORY_IDS,REPOSITORY_GIS,REPOSITORY_YARD,repositoryGeometry,repositoryTrees} from '../dist/repository-data.js';
import {REPOSITORY_PAVING} from '../dist/repository-parts.js';
import {buildingBase} from '../dist/terrain.js';
import {ShapeUtils,Vector2} from '../dist/vendor/three.module.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const area=m=>m.reduce((s,r)=>s+ra(r[0])-r.slice(1).reduce((s,h)=>s+ra(h),0),0);
const ribbon=(a,c,w)=>{const dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz),nx=dz/l*w/2,nz=-dx/l*w/2;return [[[a.x+nx,a.z+nz],[c.x+nx,c.z+nz],[c.x-nx,c.z-nz],[a.x-nx,a.z-nz]]];};
const disc=p=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i/32*Math.PI*2)*.4,p.z+Math.sin(i/32*Math.PI*2)*.4])];
test('Repository components preserve mapped rings and distinguish GIS storeys from estimated model heights',()=>{
 assert.equal(REPOSITORY_GIS.floorCount,2);assert.equal(REPOSITORY_GIS.heightField,0);
 for(const id of REPOSITORY_IDS){const raw=RAW.buildings.find(b=>b.id===id),b=CAMPUS.buildings.find(b=>b.id===id),g=repositoryGeometry(raw);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(raw.height,9.6);assert.equal(b.previousEstimate,9.6);assert.equal(b.levels,null);assert.equal(b.heightSource,'estimated');assert.equal(b.height,g.maximum);assert.equal(g.base,buildingBase(raw.points));assert.ok(b.height<9.6);assert.match(b.heightNote,/not surveyed/);}
 const main=CAMPUS.buildings.find(b=>b.id===REPOSITORY_ID);assert.equal(main.campusRef,'B21');assert.equal(main.universityGisFloorCount,2);assert.equal(main.universityGisHeightField,0);
});
test('six reconstructed square roof vents stay inside the rounded main source footprint',()=>{
 const b=RAW.buildings.find(b=>b.id===REPOSITORY_ID),g=repositoryGeometry(b);assert.equal(g.vents.length,6);assert.ok(g.frame.width>25&&g.frame.length<9);assert.ok(g.frame.u.x>.98&&g.frame.v.z>.98);
 for(const p of g.vents){assert.ok(area(clip.difference(poly(p),poly(b)))<1e-6);assert.equal(p.height,g.maximum);assert.ok(g.maximum>g.eave);}
 for(let i=0;i<g.vents.length;i++)for(let j=i+1;j<g.vents.length;j++)assert.equal(area(clip.intersection(poly(g.vents[i]),poly(g.vents[j]))),0);
});
test('lower western metal roof follows a continuous shallow fall while the eastern parapet stays lower than the main roof',()=>{
 const gs=REPOSITORY_IDS.map(id=>repositoryGeometry(RAW.buildings.find(b=>b.id===id))),g=gs[1];for(let i=0;i<=50;i++){const v=-g.frame.length/2+i/50*g.frame.length,p=g.at(0,v),height=g.roofHeight(p);assert.ok(height>=3.4-1e-7&&height<=4.1+1e-7);if(i)assert.ok(Math.abs(height-g.roofHeight(g.at(0,v-g.frame.length/50)))<.02);}
 assert.ok(Math.abs(g.roofHeight(g.at(0,-g.frame.length/2))-4.1)<1e-7);assert.ok(Math.abs(g.roofHeight(g.at(0,g.frame.length/2))-3.4)<1e-7);assert.ok(gs[2].maximum<gs[0].eave);
});
test('service hardstand triangulates without filling occupied rooms or burying source paths',()=>{
 for(const p of REPOSITORY_PAVING){const all=[...p.points,...p.holes.flat()],ts=ShapeUtils.triangulateShape(p.points.map(p=>new Vector2(p.x,p.z)),p.holes.map(r=>r.map(p=>new Vector2(p.x,p.z))));assert.ok(Math.abs(ts.reduce((s,t)=>s+area([poly({points:t.map(i=>all[i])})]),0)-area([poly(p)]))<1e-6);assert.ok(area(clip.difference(poly(p),poly({points:REPOSITORY_YARD})))<1e-6);
 for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(poly(p),poly(b)))<1e-5);
 for(const path of RAW.paths)for(let i=1;i<path.points.length;i++)assert.ok(area(clip.intersection(poly(p),ribbon(path.points[i-1],path.points[i],path.width)))<1e-5);
 }
});
test('Repository map arrivals clear retained occupied footprints without relocating source paths',()=>{
 for(const id of REPOSITORY_IDS){const g=repositoryGeometry(RAW.buildings.find(b=>b.id===id)),l=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(l);assert.equal(l.x,g.arrival.x);assert.equal(l.z,g.arrival.z);assert.ok(Number.isFinite(l.heading));for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clip.intersection(disc(l),poly(b)))<1e-6,'arrival clears '+b.id);}
 for(const p of RAW.paths.filter(p=>p.points.some(q=>q.x>425&&q.x<510&&q.z>-205&&q.z<-130))){assert.ok(CAMPUS.paths.some(q=>q.id===p.id&&q.width===p.width&&JSON.stringify(q.points)===JSON.stringify(p.points)));}
});

test('aerial-led canopy trunks leave source paths and map arrivals clear',()=>{
 const trees=repositoryTrees();assert.ok(trees.length>=3);for(const tree of trees){for(const id of REPOSITORY_IDS){const g=repositoryGeometry(RAW.buildings.find(b=>b.id===id));assert.ok(Math.hypot(tree.x-g.arrival.x,tree.z-g.arrival.z)>1);}
 for(const path of RAW.paths)for(let i=1;i<path.points.length;i++)assert.ok(area(clip.intersection(disc(tree),ribbon(path.points[i-1],path.points[i],path.width)))<1e-6);
 for(const b of RAW.buildings)assert.ok(area(clip.intersection(disc(tree),poly(b)))<1e-6);
 }
});
