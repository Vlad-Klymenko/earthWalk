import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { buildingAppearance, VISUAL_REFERENCES } from '../dist/visual-data.js';
import { theatreGeometry, newCollegeRoof } from '../dist/architecture-data.js';
import { heightDescription } from '../dist/building-heights.js';
import { ShapeUtils, Vector2 } from '../dist/vendor/three.module.js';

const inside=(p,ring)=>{
  let result=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const a=ring[i],b=ring[j];
    if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)result=!result;
  }
  return result;
};
const area=ring=>Math.abs(ring.reduce((sum,p,i)=>{const q=ring[(i+1)%ring.length];return sum+p.x*q.z-q.x*p.z;},0))/2;

test('theatre roof opening fits the real footprint and triangulates without filling the drum',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-164558658'),g=theatreGeometry(b);
  assert.ok(g.opening.every(p=>inside(p,b.points)));
  const contour=b.points.map(p=>new Vector2(p.x,p.z)),hole=g.opening.map(p=>new Vector2(p.x,p.z));
  const vertices=[...b.points,...g.opening],triangles=ShapeUtils.triangulateShape(contour,[hole]);
  const total=triangles.reduce((sum,indices)=>sum+area(indices.map(i=>vertices[i])),0);
  assert.ok(Math.abs(total-(area(b.points)-area(g.opening)))<1e-5);
  for(const indices of triangles){
    const points=indices.map(i=>vertices[i]),centre={x:points.reduce((s,p)=>s+p.x,0)/3,z:points.reduce((s,p)=>s+p.z,0)/3};
    assert.ok(!inside(centre,g.opening),'roof triangle must not seal the theatre opening');
  }
  assert.equal(g.curtainWallHeight,11);
  const [a,c]=g.front,view=CAMPUS.landmarks.find(p=>p.id===b.id);
  const outward={x:c.z-a.z,z:-(c.x-a.x)};
  assert.ok((view.x-(a.x+c.x)/2)*outward.x+(view.z-(a.z+c.z)/2)*outward.z>0,'entrance signage faces the external arrival viewpoint');
  assert.ok([...b.points,...g.opening].every(p=>g.roofHeight(p)<g.drum.height));
});

test('residence reconstruction keeps mapped height evidence and finite rotated roof coordinates',()=>{
  for(const id of ['osm-way-45560472','osm-way-45560776']){
    const b=CAMPUS.buildings.find(b=>b.id===id),profile=buildingAppearance(b);
    assert.equal(b.heightSource,'mapped');
    assert.equal(heightDescription(b,profile).metres,b.height);
    assert.ok(VISUAL_REFERENCES.some(r=>r.id===profile.source&&r.photo));
    const waypoint=CAMPUS.landmarks.find(l=>l.id===id);
    assert.ok(!inside(waypoint,b.points),'arrival must remain outside the building');
  }
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-45560776'),roof=newCollegeRoof(b);
  assert.equal(roof.ridge,15);
  assert.ok(roof.eave<roof.clerestory&&roof.clerestory<roof.ridge);
  assert.ok(roof.vertex(0,0,roof.ridge).every(Number.isFinite));
});
