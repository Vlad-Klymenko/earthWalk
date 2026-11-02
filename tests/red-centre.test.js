import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { RED_CENTRE_IDS, redCentreGeometry, LAWRENCE_RENAME } from '../dist/red-centre-data.js';
import { RED_CENTRE_PARTS, RED_CENTRE_ROOFS, RED_CENTRE_PAVING } from '../dist/red-centre-parts.js';
import { buildingAppearance } from '../dist/visual-data.js';
import { frameRectangle } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const circle=(p,r)=>poly(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r})));
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};

test('Lawrence Centre keeps mapped heights and outlines while retaining the Red Centre search identity',()=>{
  for(const id of RED_CENTRE_IDS){const b=CAMPUS.buildings.find(b=>b.id===id),raw=SOURCE.buildings.find(b=>b.id===id),g=redCentreGeometry(b);
    assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.deepEqual(b.holes,raw.holes);assert.equal(b.height,40);assert.equal(b.levels,9);assert.equal(b.heightSource,'mapped');assert.match(b.name,/Anita B. Lawrence/);assert.ok(b.aliases.includes('Red Centre'));assert.equal(b.identityReference,LAWRENCE_RENAME.url);assert.equal(buildingAppearance(b).facade,'red-centre');
    assert.ok(g.screenTop<g.bodyRoof);assert.ok(g.bodyRoof<b.height);assert.equal(Math.max(...g.stacks.map(s=>s.top)),b.height);assert.equal(g.rows.length,8);
  }
});

test('recesses, covered links and occupied ground regions exactly partition both mapped outlines',()=>{
  for(const id of RED_CENTRE_IDS){const b=SOURCE.buildings.find(b=>b.id===id),parts=RED_CENTRE_PARTS.filter(p=>p.building===id),src=[poly(b.points,b.holes)],union=clip.union(...parts.map(p=>poly(p.points,p.holes)));
    assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);
    for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++)assert.ok(area(clip.intersection(poly(parts[i].points,parts[i].holes),poly(parts[j].points,parts[j].holes)))<1e-6);
  }
});

test('all three mapped through-routes have clear ground and standing / jumping headroom',()=>{
  let count=0;
  for(const id of RED_CENTRE_IDS){const b=SOURCE.buildings.find(b=>b.id===id),g=redCentreGeometry(b),parts=RED_CENTRE_PARTS.filter(p=>p.building===id),occupied=parts.filter(p=>p.kind==='ground');
    for(const route of g.routes){count++;
      for(let i=0;i<route.points.length-1;i++){const a=route.points[i],c=route.points[i+1];for(let k=0;k<=16;k++){
        const p={x:a.x+(c.x-a.x)*k/16,z:a.z+(c.z-a.z)*k/16},disc=circle(p,.45);
        for(const body of occupied){assert.ok(area(clip.intersection(disc,poly(body.points,body.holes)))<1e-6,`${route.id} clears occupied ground`);for(let j=0;j<body.points.length;j++)assert.ok(distance(p,body.points[j],body.points[(j+1)%body.points.length])>.4,'no zero-area collision spurs');}
        assert.ok(g.base+g.passageCeiling-(terrainHeight(p.x,p.z)+.22)>3.0);
      }}
    }
  }
  assert.equal(count,3);
});

test('Lawrence Centre arrivals clear neighbouring buildings and forecourt furniture clears mapped paths',()=>{
  for(const id of RED_CENTRE_IDS){const b=SOURCE.buildings.find(b=>b.id===id),g=redCentreGeometry(b),views=[{id,arrival:g.arrival},...g.passageViews];
    for(const view of views)for(const other of SOURCE.buildings)assert.ok(area(clip.intersection(circle(view.arrival,.4),poly(other.points,other.holes)))<1e-6,`${view.id} clears ${other.id}`);
    for(const feature of [...g.benches,...(g.gallery?.columns||[])])for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(feature,path.points[i],path.points[i+1])>(path.width||3)/2+(feature.width?1.4:.7),`furniture clears ${path.id}`);
    for(const plant of g.plants)assert.ok(area(clip.difference([poly(plant.points)],[poly(b.points,b.holes)]))<1e-6,'rooftop enclosure stays inside mapped outline');
    if(g.gallery){const p=poly(g.gallery.points);const recess=RED_CENTRE_PARTS.filter(p=>p.building===id&&p.kind==='recess');assert.ok(area(clip.difference([p],clip.union(...recess.map(p=>poly(p.points,p.holes)))))<1e-6);}
  }
});


test('stepped roof regions preserve each perimeter and leave a lower strip behind the screen',()=>{
  for(const id of RED_CENTRE_IDS){const b=SOURCE.buildings.find(b=>b.id===id),g=redCentreGeometry(b),roofs=RED_CENTRE_ROOFS.filter(p=>p.building===id),src=[poly(b.points,b.holes)],union=clip.union(...roofs.map(p=>poly(p.points,p.holes)));
    assert.ok(area(clip.difference(src,union))<1e-6);assert.ok(area(clip.difference(union,src))<1e-6);assert.ok(roofs.some(p=>p.height===g.screenTop));assert.ok(roofs.some(p=>p.height===g.bodyRoof));
    for(const stack of g.stacks)assert.ok(stack.top>g.bodyRoof+5&&stack.v<-9.3,'vent shafts stand forward of the taller occupied roof');
  }
});


test('reconstructed paving stays in open ground regions and off existing path ribbons',()=>{
  for(const floor of RED_CENTRE_PAVING){const shape=[poly(floor.points,floor.holes)],recess=RED_CENTRE_PARTS.filter(p=>p.building===floor.building&&p.kind!=='ground');assert.ok(area(clip.difference(shape,clip.union(...recess.map(p=>poly(p.points,p.holes)))))<1e-6);
    for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),w=(path.width||3)/2,nx=-(c.z-a.z)/len*w,nz=(c.x-a.x)/len*w,ribbon=poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}]);assert.ok(area(clip.intersection(shape,[ribbon]))<1e-6,'no coincident paving on source path');}
  }
});
