import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {MORVEN_ID,morvenGeometry} from '../dist/morven-brown-data.js';
import {MORVEN_CANOPY as C,MORVEN_CANOPY_RING,MORVEN_CANOPY_POSTS,MORVEN_CANOPY_RIBS,MORVEN_COUNTER_FOOTPRINT,MORVEN_COUNTER_RL,MORVEN_CANOPY_STOOLS,MORVEN_FRONTAGE,MORVEN_FRONTAGE_BAYS,MORVEN_CANOPY_VIEW,MORVEN_CANOPY_FORECOURT_VIEW,morvenCanopyPoint,morvenCanopyLocal,morvenCanopyUnderRL,morvenCanopyWallV,morvenFrontagePoint} from '../dist/morven-canopy-data.js';
import {terrainHeight} from '../dist/terrain.js';
const poly=(r,h=[])=>[r,...h].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i*Math.PI/12)*r,z:p.z+Math.sin(i*Math.PI/12)*r}));
const raw=RAW.buildings.find(b=>b.id===MORVEN_ID),g=morvenGeometry(raw),lawn=RAW.greens.find(g=>g.id==='osm-way-45604250');
test('curved canopy connects continuously to the retained mapped courtyard wall',()=>{
 const wall=raw.holes[0].map(g.local).filter(p=>p.v>16).sort((a,b)=>a.u-b.u),a=wall[0],b=wall.at(-1);
 for(const u of [C.u-C.rx,C.u,C.u+C.rx])assert.ok(Math.abs(morvenCanopyWallV(u)-(a.v+(b.v-a.v)*(u-a.u)/(b.u-a.u)))<1e-10);
 for(const p of [MORVEN_CANOPY_RING[0],MORVEN_CANOPY_RING[1],MORVEN_CANOPY_RING.at(-1)]){const q=morvenCanopyLocal(p);assert.ok(Math.abs(q.v-morvenCanopyWallV(q.u))<1e-8);}
 assert.ok(Math.abs(area([poly(MORVEN_CANOPY_RING)])-Math.PI*C.rx*C.rz/2)<.03);assert.ok(C.segments>=64);assert.ok(MORVEN_CANOPY_RIBS.every(r=>Math.abs(r.fromRL-morvenCanopyUnderRL(0)+.05)<1e-9));
});
test('supports, counter and stools preserve open lawn and occupied building regions',()=>{
 const shapes=[...MORVEN_CANOPY_POSTS.map(p=>disc(p,p.radius+.045)),MORVEN_COUNTER_FOOTPRINT,...MORVEN_CANOPY_STOOLS.map(s=>s.points)];
 for(const r of shapes){assert.ok(area(clip.intersection([poly(r)],[poly(lawn.points)]))<1e-7,'no structural furniture on lawn');for(const b of RAW.buildings)assert.ok(area(clip.intersection([poly(r)],[poly(b.points,b.holes)]))<1e-7,b.id);}
 for(const r of shapes)for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],len=Math.hypot(b.x-a.x,b.z-a.z);if(len<1e-8)continue;const w=(path.width||3)/2,nx=-(b.z-a.z)/len*w,nz=(b.x-a.x)/len*w;assert.ok(area(clip.intersection([poly(r)],[poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:b.x-nx,z:b.z-nz},{x:b.x+nx,z:b.z+nz}])]))<1e-7,path.id);}
 for(const p of MORVEN_CANOPY_POSTS)assert.ok(p.topRL-terrainHeight(p.x,p.z)-.22>2.7);
 assert.ok(MORVEN_COUNTER_RL>Math.max(...MORVEN_COUNTER_FOOTPRINT.map(p=>terrainHeight(p.x,p.z)))+.9);
});
test('roof and plain glazed frontage retain standing headroom above sloping terrain',()=>{
 for(let i=0;i<=96;i++)for(let j=0;j<=12;j++){const t=j/12,p=morvenCanopyPoint(Math.PI+i/96*Math.PI,t);assert.ok(morvenCanopyUnderRL(t)-C.fasciaDepth/2-terrainHeight(p.x,p.z)-.22>2.65);}
 for(const bay of MORVEN_FRONTAGE_BAYS){const a=morvenFrontagePoint(bay.u0),b=morvenFrontagePoint(bay.u1);assert.ok(MORVEN_FRONTAGE.glassTopRL-Math.max(terrainHeight(a.x,a.z),terrainHeight(b.x,b.z))-.22>2.4);}
 assert.ok(MORVEN_FRONTAGE.topRL<MORVEN_CANOPY_RIBS[0].fromRL);assert.equal(MORVEN_FRONTAGE_BAYS[0].u0,MORVEN_FRONTAGE.u0);assert.equal(MORVEN_FRONTAGE_BAYS.at(-1).u1,MORVEN_FRONTAGE.u1);
});
test('canopy arrival is clear and the original mapped building remains unchanged',()=>{
 for(const view of [MORVEN_CANOPY_VIEW,MORVEN_CANOPY_FORECOURT_VIEW]){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));const arrival=[poly(disc(view,.45))];
 for(const b of RAW.buildings)assert.ok(area(clip.intersection(arrival,[poly(b.points,b.holes)]))<1e-7);
 for(const p of MORVEN_CANOPY_POSTS)assert.ok(area(clip.intersection(arrival,[poly(disc(p,p.radius+.045))]))<1e-7);assert.ok(area(clip.intersection(arrival,[poly(MORVEN_COUNTER_FOOTPRINT)]))<1e-7);
 }const b=CAMPUS.buildings.find(b=>b.id===MORVEN_ID);assert.deepEqual(b.points,raw.points);assert.deepEqual(b.holes,raw.holes);assert.deepEqual(b.tags,raw.tags);assert.equal(b.height,18);assert.equal(b.levels,5);
});
