import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CHEMICAL_PARTS } from '../dist/chemical-parts.js';
import { tubeFaces } from '../dist/structure-data.js';
import { websterTheatresGeometry } from '../dist/modernism-data.js';
import { terrainHeight, buildingBase } from '../dist/terrain.js';
import { CHEMICAL_ROOF_REPORT, heightDescription } from '../dist/building-heights.js';
import { framePoint } from '../dist/geometry.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((sum,p,i)=>{const q=r[(i+1)%r.length];return sum+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=g=>g.reduce((sum,r)=>sum+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:24},(_,i)=>[p.x+Math.cos(i/24*Math.PI*2)*r,p.z+Math.sin(i/24*Math.PI*2)*r])];

test('F10 tower and lower wings partition the mapped complex and retain overall height evidence',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='chemical-sciences'),union=clipping.union(...CHEMICAL_PARTS.map(polygon));
  assert.ok(area(clipping.xor(union,polygon(b)))<1e-6);
  assert.ok(Math.abs(CHEMICAL_PARTS.reduce((s,p)=>s+area([polygon(p)]),0)-area(union))<1e-6,'masses must not overlap');
  assert.ok(CHEMICAL_PARTS.every(p=>p.reconstructed));
  assert.equal(b.mappedHeight,45);assert.equal(b.heightSource,'derived');assert.equal(b.levels,14);
  assert.ok(Math.abs(b.height+buildingBase(b.points)-CHEMICAL_ROOF_REPORT.parapetRL)<1e-6);
  assert.equal(CHEMICAL_ROOF_REPORT.parapetRL,75.6);
  assert.equal(heightDescription(b).quantity,'Parapet above model base');
  assert.match(heightDescription(b).label,/approx/,'derived height must not be presented as a surveyed overall height');
  const tower=CHEMICAL_PARTS.find(p=>p.role==='tower'),podium=CHEMICAL_PARTS.find(p=>p.role==='podium');
  assert.equal(tower.height,b.mappedHeight,'generated source data retains the original tag for comparison');
  assert.ok(podium.height<tower.height/2);
  assert.ok(area([polygon(tower)])<area(union)*.6,'the entire complex must not become a tower');
});

test('square beams and capped pipes face outward on vertical, horizontal and angled runs',()=>{
  const sub=(a,b)=>a.map((v,i)=>v-b[i]),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
  const unit=a=>{const n=Math.hypot(...a);return a.map(v=>v/n);};
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  for(const end of [[0,4,0],[5,0,0],[1,3,-2]])for(const sides of [4,8]){
    const start=[0,0,0],axis=unit(end);
    for(const face of tubeFaces(start,end,.2,sides,true)){
      const normal=unit(cross(sub(face[1],face[0]),sub(face[2],face[0])));
      assert.ok(normal.every(Number.isFinite));
      if(face.length===4){
        const centre=face[0].map((_,i)=>face.reduce((s,p)=>s+p[i],0)/face.length),along=dot(centre,axis);
        const radial=centre.map((v,i)=>v-axis[i]*along);
        assert.ok(dot(normal,radial)>.1,'outer sides must survive back-face culling');
      }else assert.ok(dot(normal,axis)*(Math.hypot(...sub(face[0],start))<1e-8?-1:1)>.99,'end caps face away from the pipe interior');
    }
  }
});

test('theatre canopy posts and arrivals clear mapped buildings and preserve walking headroom',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-45488789'),g=websterTheatresGeometry(b);
  const p=framePoint(g.frame,g.west,0),base=terrainHeight(p.x,p.z);
  for(const post of g.posts){
    for(const building of CAMPUS.buildings)assert.ok(area(clipping.intersection(circle(post,.17),polygon(building)))<1e-6,'support must not enter the Quadrangle or theatre');
    assert.ok(base+3.38-terrainHeight(post.x,post.z)>2.4);
  }
  for(const id of ['osm-way-45488789','chemical-mall-view','chemical-sciences']){
    const arrival=CAMPUS.landmarks.find(p=>p.id===id);
    for(const building of CAMPUS.buildings)assert.ok(area(clipping.intersection(circle(arrival,.4),polygon(building)))<1e-6,`${id} must fit the walker`);
  }
});
