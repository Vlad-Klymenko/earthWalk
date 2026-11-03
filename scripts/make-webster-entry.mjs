import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {TERRAIN_GRID as GRID} from '../dist/terrain.js';
import {MALL_REMNANTS,MALL_PAVING_MESH,MALL_GREEN_MESH,MALL_PAVING,MALL_GREEN} from '../dist/mall-landscape-parts.js';
import {mallPathKey} from '../dist/mall-landscape-data.js';
import {WEBSTER_ID,WEBSTER_RECESS,WEBSTER_SURFACES,WEBSTER_ISLANDS} from '../dist/webster-entry-data.js';
const union=ps=>ps.length?clip.union(...ps):[];
const snap=n=>Math.round(n*1e6)/1e6,poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[snap(p.x),snap(p.z)])),parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x,z})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x,z})))}));
const b=RAW.buildings.find(b=>b.id===WEBSTER_ID),others=RAW.buildings.filter(p=>p.id!==b.id&&!p.walkableUnder).map(poly),solids=parts(clip.difference(poly(b),poly(WEBSTER_RECESS))),recess=parts(clip.intersection(poly(b),poly(WEBSTER_RECESS))),floors=WEBSTER_SURFACES.flatMap(s=>parts(clip.difference(poly(s),...others)).map(p=>({...s,...p})));
const ground=clip.union(...floors.map(poly),...WEBSTER_ISLANDS.map(poly)),removed=[],edges=[],all=ground.flat(2),xs=all.map(p=>p[0]),zs=all.map(p=>p[1]);
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=ps=>ps.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
for(let row=Math.floor((Math.min(...zs)-GRID.z0)/GRID.dz);row<=Math.ceil((Math.max(...zs)-GRID.z0)/GRID.dz);row++)for(let col=Math.floor((Math.min(...xs)-GRID.x0)/GRID.dx);col<=Math.ceil((Math.max(...xs)-GRID.x0)/GRID.dx);col++){
 const a=[GRID.x0+col*GRID.dx,GRID.z0+row*GRID.dz],b=[a[0]+GRID.dx,a[1]],c=[a[0],a[1]+GRID.dz],d=[b[0],c[1]];for(const [i,t]of [[a,b,c],[b,d,c]].entries()){const rest=clip.difference([t],ground);if(area([[t]])-area(rest)>1e-7){removed.push([col,row,i]);edges.push(...parts(rest));}}
}
const mall={pavingMesh:{},greenMesh:{},paving:{},green:{}};for(const [key,collection] of Object.entries({pavingMesh:MALL_PAVING_MESH,greenMesh:MALL_GREEN_MESH,paving:MALL_PAVING,green:MALL_GREEN}))collection.forEach((p,i)=>{if(clip.intersection(poly(p),ground).length)mall[key][i]=parts(clip.difference(poly(p),ground));});
const remains={greens:{},plazas:{},paths:{}};for(const key of ['greens','plazas'])for(const p of RAW[key]){const baseline=clip.union(...(MALL_REMNANTS[key][p.id]||[p]).map(poly));if(clip.intersection(baseline,ground).length)remains[key][p.id]=parts(clip.difference(baseline,ground));}
const ribbon=(p,width)=>p.points.slice(1).map((b,i)=>{const a=p.points[i],l=Math.hypot(b.x-a.x,b.z-a.z),nx=-(b.z-a.z)/l*width/2,nz=(b.x-a.x)/l*width/2;return poly({points:[{x:a.x+nx,z:a.z+nz},{x:b.x+nx,z:b.z+nz},{x:b.x-nx,z:b.z-nz},{x:a.x-nx,z:a.z-nz}]});});
for(const p of RAW.paths){if(p.kind==='steps')continue;const old=MALL_REMNANTS.paths[mallPathKey(p)],width=p.width||3.4,edge=union(old?old.edge.map(poly):ribbon(p,width+.5));if(edge.length&&clip.intersection(edge,ground).length)remains.paths[mallPathKey(p)]={edge:parts(clip.difference(edge,ground)),surface:parts(clip.difference(union(old?old.surface.map(poly):ribbon(p,width)),ground))};}
const out={WEBSTER_SOLIDS:solids,WEBSTER_RECESS_PARTS:recess,WEBSTER_FLOORS:floors,WEBSTER_GROUND:parts(ground),WEBSTER_REMOVED_TRIANGLES:removed,WEBSTER_GROUND_EDGES:edges,WEBSTER_MALL_REMNANTS:mall,WEBSTER_REMNANTS:remains};fs.writeFileSync(new URL('../dist/webster-entry-parts.js',import.meta.url),'// Derived exterior entrance subtraction; original map outline and source paths remain intact.\n'+Object.entries(out).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v)+';').join('\n')+'\n');console.log('Webster:',solids.length,'lower occupied parts;',recess.length,'recess parts;',floors.length,'exterior floor parts');
