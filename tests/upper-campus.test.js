import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { CLANCY_HOODS, clancyGeometry, chancelleryGeometry } from '../dist/upper-campus-data.js';
import { CHANCELLERY_ROOFS } from '../dist/chancellery-roofs.js';
import { framePoint } from '../dist/geometry.js';
import { buildingBase, terrainHeight } from '../dist/terrain.js';
import { heightDescription } from '../dist/building-heights.js';

const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((sum,p,i)=>{const q=r[(i+1)%r.length];return sum+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=g=>g.reduce((sum,r)=>sum+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i/24*Math.PI*2)*r,p.z+Math.sin(i/24*Math.PI*2)*r])];

test('Clancy retains conflicting map evidence and renders its separately mapped hoods once',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-45230512'),raw=SOURCE.buildings.find(q=>q.id===b.id),g=clancyGeometry(b);
  assert.deepEqual(b.points,raw.points);
  assert.equal(raw.height,8);assert.equal(b.mappedHeight,8);assert.equal(b.height,14.5);
  assert.equal(heightDescription(b).label,'estimated');
  assert.match(b.heightNote,/differing component figures/);
  assert.ok(area(clipping.difference(polygon({points:g.core}),polygon(b)))<1e-6,'opaque hall stays within the mapped footprint');
  assert.equal(g.roofHeight(g.hood.lipV),b.height);
  assert.equal(g.roofHeight(g.hood.backV),g.hood.backHeight);
  assert.ok(g.roofHeight(g.hood.glassV)>g.hood.glassHeight);
  for(const id of CLANCY_HOODS){
    const roof=CAMPUS.buildings.find(b=>b.id===id),original=SOURCE.buildings.find(b=>b.id===id);
    assert.deepEqual(roof.points,original.points);assert.deepEqual(roof.tags,original.tags);
    assert.equal(roof.modelledWith,b.id);assert.equal(roof.walkableUnder,true);
    assert.match(roof.heightNote,/not a measured roof height/);
  }
});

test('Chancellery roof regions preserve the complete H-shaped footprint and mapped maximum',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='chancellery'),raw=SOURCE.buildings.find(q=>q.id===b.id),g=chancelleryGeometry(b);
  const union=clipping.union(...CHANCELLERY_ROOFS.map(polygon));
  assert.ok(area(clipping.xor(union,polygon(b)))<1e-6);
  assert.ok(Math.abs(CHANCELLERY_ROOFS.reduce((s,p)=>s+area([polygon(p)]),0)-area(union))<1e-6,'roofs do not overlap');
  assert.deepEqual(b.points,raw.points);assert.equal(b.height,15);assert.equal(b.levels,5);
  assert.equal(b.heightSource,'mapped');assert.match(b.heightReference.url,/openstreetmap/);
  for(let i=0;i<g.west.bays;i++){
    const valley=framePoint(g.frame,g.west.minU+i*g.pitch,0),peak=framePoint(g.frame,g.west.minU+(i+.5)*g.pitch,0);
    assert.ok(Math.abs(g.roofHeight(peak)-b.height)<1e-6);
    assert.ok(Math.abs(g.roofHeight(valley)-g.west.eave)<1e-6);
  }
});

test('upper campus arrivals and planting clear mapped buildings and the entry canopy clears terrain',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='chancellery'),g=chancelleryGeometry(b);
  const arrivals=CAMPUS.landmarks.filter(p=>['chancellery','chancellery-vaults','osm-way-45230512'].includes(p.id));
  for(const p of [...arrivals,...g.ferns,...[-10,-5,5,10].map(v=>framePoint(g.frame,26,v))]){
    for(const building of CAMPUS.buildings)assert.ok(area(clipping.intersection(circle(p,.4),polygon(building)))<1e-6,'walker or planting must not enter mapped buildings');
  }
  for(const v of [-4.7,0,4.7]){
    const p=framePoint(g.frame,18.6,v);
    assert.ok(buildingBase(b.points)+8.05-terrainHeight(p.x,p.z)>2.4,'canopy underside has head clearance across the real slope');
  }
  for(const [id,target]of [['chancellery',g.entry],['osm-way-45230512',clancyGeometry(CAMPUS.buildings.find(b=>b.id==='osm-way-45230512')).frame]]){
    const p=arrivals.find(p=>p.id===id),dx=target.x-p.x,dz=target.z-p.z;
    assert.ok((Math.sin(p.heading)*dx-Math.cos(p.heading)*dz)/Math.hypot(dx,dz)>.99,'arrival faces the photographed entrance');
  }
});
