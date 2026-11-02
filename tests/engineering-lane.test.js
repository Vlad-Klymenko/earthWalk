import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { CAMPUS as SOURCE } from '../dist/campus-data.js';
import { WILLIS_ID, K17_VISUAL_HEIGHT, k17Geometry, willisGeometry } from '../dist/engineering-lane-data.js';
import { framePoint } from '../dist/geometry.js';
import { terrainHeight } from '../dist/terrain.js';
import { heightDescription } from '../dist/building-heights.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const n=r[(i+1)%r.length];return s+p[0]*n[1]-n[0]*p[1];},0))/2;
const area=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const circle=(p,r)=>[Array.from({length:48},(_,i)=>[p.x+Math.cos(i*Math.PI/24)*r,p.z+Math.sin(i*Math.PI/24)*r])];
const k17=CAMPUS.buildings.find(b=>b.id==='k17'),willis=CAMPUS.buildings.find(b=>b.id===WILLIS_ID);

test('engineering models preserve original coordinates and separate photo-led massing from map tags',()=>{
  for(const b of [k17,willis]){const raw=SOURCE.buildings.find(s=>s.id===b.id);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.tags,raw.tags);assert.equal(b.levels,raw.levels);}
  assert.equal(willis.height,12);assert.equal(willis.levels,3);assert.equal(heightDescription(willis).label,'OSM height tag');
  assert.equal(k17.height,K17_VISUAL_HEIGHT);assert.equal(k17.heightSource,'estimated');assert.equal(k17.previousEstimate,SOURCE.buildings.find(b=>b.id==='k17').height);assert.equal(k17.levels,6);assert.match(k17.heightNote,/not surveyed/);
  const g=k17Geometry(k17);assert.ok(g.foyerTop<k17.height);assert.ok(area(clipping.difference(polygon({points:g.foyerFloor}),polygon(k17)))<1e-6,'visual foyer floor stays inside the retained building');
  for(const t of [.2,.65])for(const off of [-1.3,-2.8,-3.45])assert.ok(area(clipping.difference(circle(g.front.along(t,off),.05),polygon({points:g.foyerFloor})))<1e-6,'orange stair glimpse fits behind the glazing');
});

test('engineering arrivals and covered-lane centre remain clear of mapped building volumes',()=>{
  for(const id of ['k17',WILLIS_ID,'willis-covered-lane']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);assert.ok(p.x>CAMPUS.bounds.minX&&p.x<CAMPUS.bounds.maxX&&p.z>CAMPUS.bounds.minZ&&p.z<CAMPUS.bounds.maxZ);
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`${id} clears ${b.id}`);
  }
  const g=willisGeometry(willis),s=g.cover;
  for(let v=s.v0;v<=s.v1;v+=.5){
    const p=framePoint(g.frame,-19.3,v);
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`lane clears ${b.id}`);
    assert.ok(s.clearance-.1>2.1,'canopy preserves standing headroom relative to DEM');
    assert.ok(Number.isFinite(terrainHeight(p.x,p.z)));
  }
  assert.ok(s.u0<-22&&s.u1>-16.2,'cover reaches the photographed building faces');assert.equal(s.reconstructed,true);
});

test('reconstructed K17 footway clears buildings and Willis roof remains within its mapped vertical maximum',()=>{
  const k=k17Geometry(k17),w=willisGeometry(willis);
  for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(polygon({points:k.paving}),polygon(b)))<1e-6,`foyer footway clears ${b.id}`);
  assert.ok(w.eave<willis.height);assert.ok(w.eave>willis.height-1);assert.ok(w.entryGround>w.base);assert.ok(w.entryGround-w.base+3.48<w.eave,'northern hood remains below the roof');
});

test('K17 screen and its lower supports stay above the sloping public approach and below the retained model maximum',()=>{
  const g=k17Geometry(k17),screen=g.screen,front=g.front;
  for(const panel of g.screenPanels){
    assert.ok(panel.start>=0&&panel.end<=1&&panel.start<panel.end);assert.ok(panel.bottom>g.foyerTop&&panel.top<=k17.height);assert.ok(panel.top>panel.bottom);
    for(const t of [panel.start,(panel.start+panel.end)/2,panel.end]){
      const p=front.along(t,screen.offset);assert.ok(g.base+panel.bottom-terrainHeight(p.x,p.z)>5);
      for(const b of CAMPUS.buildings.filter(b=>b.id!=='k17'&&!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.04),polygon(b)))<1e-6,`screen clears ${b.id}`);
    }
  }
  for(let i=0;i<g.screenPanels.length;i++)for(let j=i+1;j<g.screenPanels.length;j++){
    const a=g.screenPanels[i],b=g.screenPanels[j];assert.ok(Math.min(a.end,b.end)<=Math.max(a.start,b.start)||Math.min(a.top,b.top)<=Math.max(a.bottom,b.bottom),'separate panels leave genuine seams');
  }
});

test('K17 projected stair landings retain standing clearance outside the source wall and do not intersect neighbouring buildings',()=>{
  const g=k17Geometry(k17),w=g.west;
  for(const landing of w.landings){
    assert.ok(landing.top<k17.height);assert.ok(landing.bottom<landing.top);
    // Sample the complete slab, including its projecting portion over terrain.
    for(let i=0;i<=20;i++)for(let j=0;j<=12;j++){
      const p=w.along(w.slotStart+(w.slotEnd-w.slotStart)*i/20,-w.depth+(w.depth+w.projection)*j/12);
      assert.ok(g.base+landing.bottom-terrainHeight(p.x,p.z)>2.1,'landing clears standing height on retained terrain');
    }
    for(const b of CAMPUS.buildings.filter(b=>b.id!=='k17'&&!b.walkableUnder))assert.ok(area(clipping.intersection(polygon(landing),polygon(b)))<1e-6,`landing clears ${b.id}`);
  }
  assert.ok(area(clipping.difference(polygon({points:g.foyerFloor}),polygon(k17)))<1e-6);
});

test('K17 photo-led beds and shrubs preserve the source garden and leave source path ribbons open',()=>{
  const g=k17Geometry(k17),garden=SOURCE.greens.find(p=>p.id==='osm-way-45489881');
  assert.deepEqual(CAMPUS.greens.find(p=>p.id===garden.id),garden);
  const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
  for(const bed of g.beds){
    assert.ok(area(clipping.difference(polygon(bed),polygon(garden)))<1e-6,'bed remains inside retained garden');
    for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(polygon(bed),polygon(b)))<1e-6);
    for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++){
      const a=path.points[i],c=path.points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*(path.width||3)/2,nz=(c.x-a.x)/len*(path.width||3)/2,strip={points:[{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}]};
      assert.ok(area(clipping.intersection(polygon(bed),polygon(strip)))<1e-6,`bed clears ${path.id}`);
    }
  }
  for(const shrub of g.shrubs){assert.ok(g.beds.some(bed=>area(clipping.difference(circle(shrub,.12),polygon(bed)))<1e-6));for(const path of SOURCE.paths)for(let i=0;i<path.points.length-1;i++)assert.ok(distance(shrub,path.points[i],path.points[i+1])>(path.width||3)/2+.65);}
});

test('K17 comparison arrivals fit the outdoor map and retain public evidence independently of estimated height',()=>{
  const g=k17Geometry(k17);
  for(const id of ['k17-screen','k17-west','k17-rear']){
    const p=CAMPUS.landmarks.find(p=>p.id===id);assert.ok(p);for(const b of CAMPUS.buildings.filter(b=>!b.walkableUnder))assert.ok(area(clipping.intersection(circle(p,.4),polygon(b)))<1e-6,`${id} clears ${b.id}`);
  }
  for(const path of SOURCE.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.frame.x,p.z-g.frame.z)<50)))assert.deepEqual(CAMPUS.paths.find(p=>p.id===path.id).points,path.points);
  assert.equal(k17.height,26);assert.equal(k17.previousEstimate,SOURCE.buildings.find(b=>b.id==='k17').height);assert.equal(k17.levels,6);assert.equal(k17.heightSource,'estimated');assert.match(k17.heightNote,/not surveyed/);
});
