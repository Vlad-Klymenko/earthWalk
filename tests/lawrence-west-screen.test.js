import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {NEWTON_ID} from '../dist/physics-precinct-data.js';
import {lawrenceWestEndGeometry,LAWRENCE_WEST_SCREEN,LAWRENCE_WEST_END_VIEW,isLawrenceWestScreenFace} from '../dist/lawrence-west-screen-data.js';
import {terrainHeight} from '../dist/terrain.js';
const b=CAMPUS.buildings.find(b=>b.id==='red-centre-west'),raw=RAW.buildings.find(q=>q.id==='red-centre-west'),g=lawrenceWestEndGeometry(b),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
test('the screened source end adjoins Newton and is spatially separate from Hilmer',()=>{
 const newton=RAW.buildings.find(b=>b.id===NEWTON_ID),shared=g.screens.find(f=>[f.a,f.c].every(p=>newton.points.some(q=>Math.hypot(q.x-p.x,q.z-p.z)<1e-8)));assert.ok(shared);assert.ok(shared.n.z>.9);assert.equal(g.screens.length,2);assert.ok(g.screens.some(f=>f.n.x<-.9));
 assert.equal(clip.intersection(poly(raw),poly(RAW.buildings.find(b=>b.id==='hilmer'))).length,0);assert.equal(LAWRENCE_WEST_END_VIEW.code,'H13');
 for(const f of g.screens){assert.equal(isLawrenceWestScreenFace(f.a,f.c),true);assert.equal(isLawrenceWestScreenFace(f.c,f.a),true);}assert.equal(isLawrenceWestScreenFace(raw.points[0],raw.points[1]),false);
});
test('source footprint, mapped tags, maximum and lower covered links remain unchanged',()=>{
 assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,raw.height);assert.equal(b.levels,raw.levels);assert.equal(b.height,40);assert.ok(g.bodyRoof<40);assert.equal(g.passageCeiling,5.8);assert.ok(LAWRENCE_WEST_SCREEN.upper<=g.bodyRoof);
 for(const path of RAW.paths)assert.ok(CAMPUS.paths.some(p=>p.id===path.id&&p.width===path.width&&JSON.stringify(p.points)===JSON.stringify(path.points)),path.id);
});
test('three separate screen fields fit under the retained body roof without overlap',()=>{
 for(const face of g.screens){assert.equal(face.bands.length,3);let prev=LAWRENCE_WEST_SCREEN.lower;for(const band of face.bands){assert.ok(band.bottom>prev);assert.ok(band.top>band.bottom);assert.ok(band.top+.11<=LAWRENCE_WEST_SCREEN.upper);prev=band.top;}assert.ok(face.pitch>.50&&face.pitch<.65);}
});
test('folded fin profiles are convex, separate and bounded by their original source faces',()=>{
 for(const face of g.screens){let prior=-Infinity;for(const fin of face.fins){const a=fin.section;let sign=0;for(let i=0;i<a.length;i++){const p=a[i],q=a[(i+1)%a.length],r=a[(i+2)%a.length],cross=(q.s-p.s)*(r.d-q.d)-(q.d-p.d)*(r.s-q.s);if(Math.abs(cross)>1e-10){if(sign)assert.equal(Math.sign(cross),sign);else sign=Math.sign(cross);}}
 const lo=fin.s+Math.min(...a.map(p=>p.s)),hi=fin.s+Math.max(...a.map(p=>p.s));assert.ok(lo>0&&hi<face.len);assert.ok(lo>prior);prior=hi;assert.ok(a.every(p=>p.d>=.2&&p.d<=.88+1e-10));assert.ok(fin.points.every(p=>Object.values(p).every(Number.isFinite)));}
 }
});
test('projecting blades and carriers remain well above the walking ground',()=>{
 for(const face of g.screens)for(const fin of face.fins)for(const p of fin.points){const clearance=g.base+LAWRENCE_WEST_SCREEN.bands[0][0]-.16-terrainHeight(p.x,p.z);assert.ok(clearance>2.3);}
});
test('new screen viewpoint is searchable and clears occupied rooms at player radius',()=>{
 const p=LAWRENCE_WEST_END_VIEW;assert.ok(CAMPUS.landmarks.some(q=>q.id===p.id));assert.ok(p.x>CAMPUS.bounds.minX&&p.x<CAMPUS.bounds.maxX&&p.z>CAMPUS.bounds.minZ&&p.z<CAMPUS.bounds.maxZ);const circle=[Array.from({length:32},(_,i)=>[p.x+Math.cos(i*Math.PI/16)*.4,p.z+Math.sin(i*Math.PI/16)*.4])];for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.equal(clip.intersection(circle,poly(b)).length,0,b.id);
});
