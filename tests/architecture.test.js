import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { buildingAppearance, VISUAL_REFERENCES } from '../dist/visual-data.js';
import { theatreGeometry, newCollegeRoof } from '../dist/architecture-data.js';
import { heightDescription } from '../dist/building-heights.js';
import { ShapeUtils, Vector2 } from '../dist/vendor/three.module.js';
import { CAMPUS as MAPPED_CAMPUS } from '../dist/campus-data.js';
import { heritageGeometry, whiteHouseStair } from '../dist/heritage-data.js';

const inside=(p,ring)=>{
  let result=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const a=ring[i],b=ring[j];
    if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)result=!result;
  }
  return result;
};
const area=ring=>Math.abs(ring.reduce((sum,p,i)=>{const q=ring[(i+1)%ring.length];return sum+p.x*q.z-q.x*p.z;},0))/2;

test('map arrivals face their destinations in the first-person heading convention',()=>{
  for(const id of ['library','mathews','osm-way-196250617','osm-way-306785257','osm-way-164552439']){
    const b=CAMPUS.buildings.find(b=>b.id===id),p=CAMPUS.landmarks.find(p=>p.id===id);
    const dx=b.points.reduce((s,q)=>s+q.x,0)/b.points.length-p.x;
    const dz=b.points.reduce((s,q)=>s+q.z,0)/b.points.length-p.z;
    assert.ok((Math.sin(p.heading)*dx-Math.cos(p.heading)*dz)/Math.hypot(dx,dz)>.95,id);
  }
});

test('White House stair reaches a verandah around an inset solid body',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-196250617'),g=heritageGeometry(b,'whitehouse'),s=whiteHouseStair(b);
  assert.ok(g.body.every(p=>inside(p,b.points)));
  assert.ok(area(b.points)-area(g.body)>40,'verandah has usable floor area');
  for(let i=0;i<b.points.length;i++){
    const a=b.points[i],c=b.points[(i+1)%b.points.length];
    assert.ok(Math.abs(g.roofHeight({x:(a.x+c.x)/2,z:(a.z+c.z)/2})-6.6)<1e-6,'concave eaves meet the posts');
  }
  assert.ok((s.high-s.low)/s.count<.2,'risers are walkable');
  assert.ok(Math.hypot(s.b.x-s.a.x,s.b.z-s.a.z)/s.count>.24,'treads accommodate walking');
  assert.ok(s.width>.68,'stair fits the player capsule');
  // Final tread and landing must be within the physical step tolerance.
  assert.ok((s.high-s.low)/s.count<.27);
});

test('photo-led height changes retain conflicting source data and stay labelled estimates',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-71500653'),raw=MAPPED_CAMPUS.buildings.find(q=>q.id===b.id);
  assert.equal(raw.height,20);
  assert.equal(b.mappedHeight,raw.height);
  const description=heightDescription(b,buildingAppearance(b));
  assert.equal(description.metres,12);
  assert.equal(description.label,'estimated');
  assert.match(description.reference.url,/tkda\.com\.au/);
  assert.match(b.heightNote,/20 m/);
  const tote=CAMPUS.buildings.find(b=>b.id==='osm-way-306785257');
  assert.equal(heightDescription(tote,buildingAppearance(tote)).label,'estimated');
  assert.equal(heightDescription(tote,buildingAppearance(tote)).metres,11.2);
});

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
