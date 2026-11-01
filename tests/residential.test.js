import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { NIDA_PARTS } from '../dist/nida-parts.js';
import { RESIDENTIAL_PARTS, VILLAGE_PASSAGES } from '../dist/residential-parts.js';
import { heightDescription } from '../dist/building-heights.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((sum,p,i)=>{const q=r[(i+1)%r.length];return sum+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((sum,rings)=>sum+ringArea(rings[0])-rings.slice(1).reduce((n,r)=>n+ringArea(r),0),0);

test('reconstructed residential masses partition the actual outlines without filling courtyard holes',()=>{
  for(const id of ['osm-relation-2637829-0','new-college-village']){
    const b=CAMPUS.buildings.find(b=>b.id===id),parts=RESIDENTIAL_PARTS.filter(p=>p.parent===id);
    const union=clipping.union(...parts.map(polygon));
    assert.ok(area(clipping.xor(union,polygon(b)))<1e-6,'partition must preserve the complete source footprint');
    assert.ok(Math.abs(parts.reduce((sum,p)=>sum+area([polygon(p)]),0)-area(union))<1e-6,'volumes must not overlap');
    assert.ok(new Set(parts.map(p=>p.height)).size>1,'photographs require stepped heights');
    assert.ok(parts.every(p=>p.reconstructed&&p.heightSource.startsWith('estimated')));
  }
});

test('mapped Village footways stay clear of ground walls including player radius at thresholds',()=>{
  const ground=clipping.union(...RESIDENTIAL_PARTS.filter(p=>p.parent==='osm-relation-2637829-0'&&!p.minHeight).map(polygon));
  for(const path of VILLAGE_PASSAGES){
    assert.deepEqual(path.points,CAMPUS.paths.find(p=>p.id===path.id).points);
    for(let edge=0;edge<path.points.length-1;edge++){
      const a=path.points[edge],b=path.points[edge+1],steps=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.25);
      for(let i=0;i<=steps;i++){
        const t=i/steps,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;
        const circle=[Array.from({length:20},(_,k)=>[x+Math.cos(k/20*Math.PI*2)*.36,z+Math.sin(k/20*Math.PI*2)*.36])];
        assert.ok(area(clipping.intersection(ground,circle))<1e-6,`${path.id} threshold / path must fit the player`);
      }
    }
  }
});

test('NIDA upper parts retain actual public coordinates and height tags separately from the old overall tag',()=>{
  const raw=JSON.parse(fs.readFileSync(new URL('../dist/data/unsw.json',import.meta.url))),nodes=new Map(raw.elements.filter(e=>e.type==='node').map(e=>[e.id,e]));
  for(const p of NIDA_PARTS){
    const e=raw.elements.find(e=>e.type==='way'&&e.id===p.osmId);
    assert.equal(p.height,+e.tags.height);assert.equal(p.minHeight,+e.tags.min_height);
    assert.equal(p.parent,'osm-way-164558658');
    assert.deepEqual(p.points,e.nodes.slice(0,-1).map(id=>nodes.get(id)).map(n=>({x:+((n.lon-CAMPUS.center.lon)*Math.PI/180*6371008.8*Math.cos(CAMPUS.center.lat*Math.PI/180)).toFixed(3),z:+((CAMPUS.center.lat-n.lat)*Math.PI/180*6371008.8).toFixed(3)})));
  }
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-164558658');
  assert.equal(b.mappedHeight,12);assert.equal(b.height,19);
  assert.equal(heightDescription(b).label,'OSM building-part tags');
  assert.ok(NIDA_PARTS.find(p=>p.osmId===609912640).points.length>20,'auditorium uses the mapped D-shape');
});
