import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { sirfGeometry, agsmGeometry } from '../dist/eastern-landmarks-data.js';
import { terrainHeight } from '../dist/terrain.js';
import { buildingAppearance, VISUAL_REFERENCES } from '../dist/visual-data.js';
const sirf=CAMPUS.buildings.find(b=>b.id==='osm-way-45604880'),agsm=CAMPUS.buildings.find(b=>b.id==='osm-way-101505149');
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const circle=(p,r)=>[Array.from({length:40},(_,i)=>[p.x+Math.cos(i*Math.PI/20)*r,p.z+Math.sin(i*Math.PI/20)*r])];
const area=geometry=>geometry.reduce((s,p)=>s+Math.abs(p[0].reduce((a,v,i)=>{const n=p[0][(i+1)%p[0].length];return a+v[0]*n[1]-n[0]*v[1];},0))/2,0);

test('eastern landmarks keep source outlines, heights and levels independently from visual reconstruction',()=>{
  for(const [b,height,levels] of [[sirf,8,2],[agsm,20,5]]){
    const raw=SOURCE.buildings.find(s=>s.id===b.id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,height);assert.equal(b.levels,levels);assert.equal(b.heightSource,'mapped');
    const profile=buildingAppearance(b);assert.ok(VISUAL_REFERENCES.some(r=>r.id===profile.source));assert.match(b.heightNote,/reconstructed/);
  }
  assert.equal(agsm.points.length,43);const g=agsmGeometry(agsm);assert.deepEqual(g.courtyard,agsm.points.slice(21,36));
  assert.equal(area(clipping.intersection(circle(g.arrival,.5),polygon(agsm))),0,'curved courtyard remains an open recess');
});

test('SIRF portal geometry stays within the mapped vertical envelope and joins continuous bays',()=>{
  const g=sirfGeometry(sirf);
  for(const face of g.facades){
    assert.ok(face.len>20);assert.ok(Math.abs(Math.hypot(face.normal.x,face.normal.z)-1)<1e-9);
    assert.equal(face.portals[0].start,0);assert.equal(face.portals.at(-1).end,1);
    for(const [i,p] of face.portals.entries()){
      assert.ok(p.start<p.peak&&p.peak<p.end);assert.ok(p.bottom>=0&&p.glassPeak>p.bottom&&p.outerPeak>p.glassPeak&&p.outerPeak<=sirf.height);assert.ok(p.projection>0&&p.projection<1.5);assert.equal(p.reconstructed,true);
      if(i)assert.equal(face.portals[i-1].end,p.start);
    }
  }
  for(const b of CAMPUS.buildings)assert.ok(area(clipping.intersection(polygon({points:g.paving}),polygon(b)))<.5,`northern paving clears ${b.id}`);
});

test('eastern arrivals and pergola posts preserve pedestrian clearance on sloping ground',()=>{
  for(const b of [sirf,agsm]){
    const p=CAMPUS.landmarks.find(p=>p.id===b.id);assert.ok(p.x>CAMPUS.bounds.minX&&p.x<CAMPUS.bounds.maxX&&p.z>CAMPUS.bounds.minZ&&p.z<CAMPUS.bounds.maxZ);
    for(const other of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.equal(area(clipping.intersection(circle(p,.5),polygon(other))),0,`${b.id} arrival clears ${other.id}`);
  }
  const g=agsmGeometry(agsm);
  for(let i=0;i<g.pergola.length-1;i+=2){
    const a=g.pergola[i],c=g.pergola[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),p={x:(a.x+c.x)/2+(c.z-a.z)/len*1.75,z:(a.z+c.z)/2-(c.x-a.x)/len*1.75};
    assert.ok(g.base+3.78-terrainHeight(p.x,p.z)>2.1,'pergola retains standing clearance');
    assert.ok(Math.hypot(p.x-g.arrival.x,p.z-g.arrival.z)>.6);
    for(const other of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.equal(area(clipping.intersection(circle(p,.12),polygon(other))),0,`post clears ${other.id}`);
  }
});
