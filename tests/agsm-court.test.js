import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {terrainHeight,TERRAIN_GRID as GRID} from '../dist/terrain.js';
import {AGSM_ID,agsmCourtGrade,AGSM_COURT_GRADE,AGSM_COURT as G,AGSM_PERGOLA,AGSM_COURT_SCOPE,AGSM_STEPS as S,AGSM_TABLES,AGSM_TRELLISES,AGSM_COURT_VIEWS,agsmCourtPoint} from '../dist/agsm-court-data.js';
import {AGSM_COURT_PAVING,AGSM_COURT_REGIONS,AGSM_COURT_TRIANGLES,AGSM_COURT_REMOVED_TRIANGLES,AGSM_COURT_GROUND_EDGES,AGSM_COURT_REMNANTS} from '../dist/agsm-court-parts.js';
import {agsmCourtHeight} from '../dist/agsm-court-landscape.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const circle=(p,r)=>[Array.from({length:32},(_,i)=>[p.x+Math.cos(i*Math.PI/16)*r,p.z+Math.sin(i*Math.PI/16)*r])];
const area=m=>m.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((s,p,j)=>{const q=r[(j+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2,0),0);
const paving=clip.union(...AGSM_COURT_PAVING.map(poly));
test('AGSM court keeps original building, DEM and tree evidence while clipping its paved recess',()=>{
 const raw=RAW.buildings.find(b=>b.id===AGSM_ID),shown=CAMPUS.buildings.find(b=>b.id===AGSM_ID);assert.deepEqual(raw.points,shown.points);assert.deepEqual(raw.tags,shown.tags);assert.equal(shown.height,20);assert.equal(shown.levels,5);assert.equal(shown.heightSource,'mapped');assert.ok(area(paving)>200);assert.ok(area(clip.difference(paving,poly({points:AGSM_COURT_SCOPE})))<1e-6);
 for(const b of RAW.buildings)assert.ok(area(clip.intersection(paving,poly(b)))<1e-6,'paving clears '+b.id);
 const tree=TREE_INVENTORY.find(t=>t.id==='unsw-tree-101107');assert.ok(tree);assert.ok(area(clip.intersection(paving,[circle(tree,.75)]))<1e-6);assert.equal(agsmCourtHeight(tree.x,tree.z),undefined);
});
test('terrace regions partition the court and rendered walking triangles preserve its area and levels',()=>{
 assert.equal(AGSM_COURT_REGIONS.length,4);assert.deepEqual([...new Set(AGSM_COURT_REGIONS.map(p=>Math.round(p.rise*100)))].sort((a,b)=>a-b),[0,15,30,45]);const union=clip.union(...AGSM_COURT_REGIONS.map(poly));assert.ok(area(clip.xor(union,paving))<1e-6);assert.ok(Math.abs(AGSM_COURT_REGIONS.reduce((s,p)=>s+area([poly(p)]),0)-area(paving))<1e-6);
 let sum=0;for(const tri of AGSM_COURT_TRIANGLES){const [a,b,c]=tri;sum+=Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))/2;const x=(a.x+b.x+c.x)/3,z=(a.z+b.z+c.z)/3,h=agsmCourtHeight(x,z);assert.ok(Math.abs(h-(a.y+b.y+c.y)/3)<1e-7);for(const p of tri){const offset=p.y-agsmCourtGrade(p.x,p.z)-S.pavingOffset;assert.ok([0,.15,.30,.45].some(n=>Math.abs(n-offset)<1e-8));}}
 assert.ok(Math.abs(sum-area(paving))<1e-6);assert.equal(agsmCourtHeight(0,0),undefined);
});
test('cafe furniture, shade and vine screens fit the paved court and avoid the selected route',()=>{
 const routeA=agsmCourtPoint(-3.5,16),routeB=agsmCourtPoint(-7.8,16),length=Math.hypot(routeB.x-routeA.x,routeB.z-routeA.z),nx=-(routeB.z-routeA.z)/length*.4,nz=(routeB.x-routeA.x)/length*.4,route=poly({points:[{x:routeA.x+nx,z:routeA.z+nz},{x:routeB.x+nx,z:routeB.z+nz},{x:routeB.x-nx,z:routeB.z-nz},{x:routeA.x-nx,z:routeA.z-nz}]});
 for(const table of AGSM_TABLES){assert.ok(area(clip.difference([circle(table,table.radius)],paving))<1e-6);if(table.shade)assert.ok(table.shadeEave>2.1);for(const p of [table,...table.chairs]){assert.ok(Number.isFinite(agsmCourtHeight(p.x,p.z)));assert.ok(area(clip.difference([circle(p,p.radius)],paving))<1e-6);assert.ok(area(clip.intersection([circle(p,p.radius)],route))<1e-6);}}
 for(const screen of AGSM_TRELLISES){assert.ok(area(clip.difference(poly({points:screen.planter}),paving))<1e-6);assert.ok(area(clip.difference(poly({points:screen.bench}),paving))<1e-6);assert.ok(area(clip.intersection(poly({points:screen.planter}),route))<1e-6);assert.ok(area(clip.intersection(poly({points:screen.bench}),route))<1e-6);}
});
test('walkable steps remain under the open pergola with standing headroom and useful arrivals',()=>{
 const samples=[];for(let u=-3.5;u>=-7.8;u-=.05){const p=agsmCourtPoint(u,16),h=agsmCourtHeight(p.x,p.z);assert.ok(Number.isFinite(h));samples.push(h);assert.ok(G.base+AGSM_PERGOLA.back-.08-h>2.4);}
 assert.ok(Math.max(...samples)-Math.min(...samples)>.35);for(let i=1;i<samples.length;i++)assert.ok(Math.abs(samples[i]-samples[i-1])<.18);
 for(const p of AGSM_COURT_VIEWS){assert.ok(CAMPUS.landmarks.some(q=>q.id===p.id));assert.ok(Number.isFinite(agsmCourtHeight(p.x,p.z)));for(const b of RAW.buildings)assert.ok(area(clip.intersection([circle(p,.4)],poly(b)))<1e-6);}
});
test('bounded DEM cut and plaza remnant exactly expose the graded courtyard without altering surrounding terrain',()=>{
 const point=agsmCourtPoint(4,16);assert.ok(Math.abs(agsmCourtGrade(point.x,point.z)-terrainHeight(point.x,point.z))<1e-9);assert.ok(AGSM_COURT_GRADE.reconstructed);assert.ok(Math.abs(AGSM_COURT_GRADE.du)<.02&&Math.abs(AGSM_COURT_GRADE.dv)<.02);
 assert.ok(AGSM_COURT_REMOVED_TRIANGLES.length>0);const keys=AGSM_COURT_REMOVED_TRIANGLES.map(x=>x.join(','));assert.equal(new Set(keys).size,keys.length);
 const removed=AGSM_COURT_REMOVED_TRIANGLES.map(([col,row,i])=>{const a=[GRID.x0+col*GRID.dx,GRID.z0+row*GRID.dz],b=[a[0]+GRID.dx,a[1]],c=[a[0],a[1]+GRID.dz],d=[b[0],c[1]];return [i?[b,d,c]:[a,b,c]];});
 const removedArea=removed.reduce((n,t)=>n+area([[t[0]]]),0),edgeArea=AGSM_COURT_GROUND_EDGES.reduce((n,p)=>n+area([poly(p)]),0);assert.ok(Math.abs(removedArea-edgeArea-area(paving))<1e-6);for(const edge of AGSM_COURT_GROUND_EDGES){assert.ok(area(clip.intersection(poly(edge),paving))<1e-6);assert.ok(removed.some(([t])=>{const [a,b,c]=t,den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);return edge.points.every(p=>{const u=((b[1]-c[1])*(p.x-c[0])+(c[0]-b[0])*(p.z-c[1]))/den,v=((c[1]-a[1])*(p.x-c[0])+(a[0]-c[0])*(p.z-c[1]))/den;return u>=-1e-7&&v>=-1e-7&&1-u-v>=-1e-7;});}));}
 const plaza=RAW.plazas.find(p=>p.id==='osm-way-1116164553'),remnants=AGSM_COURT_REMNANTS.plazas[plaza.id];assert.ok(remnants);assert.ok(area(clip.xor(clip.union(...remnants.map(poly)),clip.difference(poly(plaza),paving)))<1e-6);
});
