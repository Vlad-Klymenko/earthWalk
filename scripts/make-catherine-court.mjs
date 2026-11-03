import fs from 'node:fs';
import clip from 'polygon-clipping';
import * as THREE from '../dist/vendor/three.module.js';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {terrainHeight,TERRAIN_GRID as GRID} from '../dist/terrain.js';
import {pathGeometry} from '../dist/path-materials.js';
import {mallPathKey} from '../dist/mall-landscape-data.js';
import {WEBSTER_REMNANTS} from '../dist/webster-entry-parts.js';
import {SCIENTIA_STEP_REMNANTS} from '../dist/scientia-steps-parts.js';
import {OLD_MAIN_FRONT_REMNANTS} from '../dist/old-main-front-parts.js';
import {CHANCELLOR_REMNANTS} from '../dist/chancellors-garden-parts.js';
import {OLD_NORTH_REMNANTS} from '../dist/old-main-north-parts.js';
import {OLD_MAIN_ENTRY_REMNANTS} from '../dist/old-main-entry-parts.js';
import {ENGINEERING_REMNANTS} from '../dist/engineering-street-parts.js';
import {MALL_REMNANTS} from '../dist/mall-landscape-parts.js';
import {SOUTHERN_REMNANTS} from '../dist/southern-drive-parts.js';
import {AGSM_COURT_REMNANTS} from '../dist/agsm-court-parts.js';
import {CATHERINE_SOURCE as SOURCE,CATHERINE_FRAME as F,CATHERINE_PATTERN as P,catherineRectangle} from '../dist/catherine-court-data.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x,z})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x,z}))),reconstructed:true}));
const area=m=>m.reduce((s,p)=>s+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((s,p,j)=>{const q=r[(j+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2,0),0);
const union=ps=>ps.length?clip.union(...ps):[],diff=(a,b)=>a.length&&b.length?clip.difference(a,b):a;
function ribbon(points,width){
 const sampled=[];for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)));for(let k=0;k<n;k++)sampled.push({x:a.x+(b.x-a.x)*k/n,z:a.z+(b.z-a.z)*k/n});}sampled.push(points.at(-1));
 const rows=sampled.map((p,i)=>{const a=sampled[Math.max(0,i-1)],b=sampled[Math.min(sampled.length-1,i+1)],l=Math.hypot(b.x-a.x,b.z-a.z)||1,nx=-(b.z-a.z)/l*width/2,nz=(b.x-a.x)/l*width/2;return [[p.x+nx,p.z+nz],[p.x-nx,p.z-nz]];});return rows.slice(1).map((q,i)=>[[rows[i][0],q[0],q[1],rows[i][1]]]);
}
const buildings=RAW.buildings.filter(b=>!b.walkableUnder).map(poly),greens=(CAMPUS.greens||[]).map(poly),steps=union(CAMPUS.paths.filter(p=>p.kind==='steps').flatMap(p=>ribbon(p.points,(p.width||3)+.08)));
const ground=diff([poly(SOURCE)],union([...buildings,...greens,steps].filter(p=>p.length))),groundParts=parts(ground);
const inside=(p,ps)=>ps.some(s=>{const ring=r=>{let c=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)c=!c;return c;};return ring(s.points)&&!s.holes.some(ring);});
const pits=[],soils=[],curbs=[];
for(const t of TREE_INVENTORY.filter(t=>inside(t,groundParts))){
 const outer=clip.intersection(poly({points:catherineRectangle(t,P.pitOuter,P.pitOuter)}),ground),inner=clip.intersection(poly({points:catherineRectangle(t,P.pitInner,P.pitInner)}),ground);
 if(area(inner)<.4)continue;
 const outerParts=parts(outer),innerParts=parts(inner);pits.push({treeId:t.id,x:t.x,z:t.z,outer:outerParts,inner:innerParts,reconstructed:true});soils.push(...innerParts);curbs.push(...parts(diff(outer,inner)));
}
const pitsUnion=union(pits.flatMap(p=>p.outer.map(poly))),paving=diff(ground,pitsUnion),pavingParts=parts(paving);
const bounds={minX:Math.min(...SOURCE.points.map(p=>p.x))-4,maxX:Math.max(...SOURCE.points.map(p=>p.x))+4,minZ:Math.min(...SOURCE.points.map(p=>p.z))-4,maxZ:Math.max(...SOURCE.points.map(p=>p.z))+4};
const walkways=CAMPUS.paths.flatMap(p=>ribbon(p.points,pathGeometry(p).width+.8)).filter(q=>q[0].some(([x,z])=>x>bounds.minX&&x<bounds.maxX&&z>bounds.minZ&&z<bounds.maxZ)),benches=[],rejects=[];
for(const t of TREE_INVENTORY.filter(t=>inside(t,groundParts)&&t.botanicalName==='Pyrus calleryana'&&t.x<403&&t.z<-48))for(const side of [-1,1]){
 const centre={x:t.x+F.v.x*side*1.35,z:t.z+F.v.z*side*1.35},n={x:F.v.x*side,z:F.v.z*side},points=catherineRectangle(centre,2.4,.84,F.u,n),shape=poly({points});
 if(area(diff([shape],paving))>1e-7||walkways.some(w=>area(clip.intersection(shape,w))>1e-7)||benches.some(b=>area(clip.intersection(shape,poly(b)))>1e-7)){rejects.push({treeId:t.id,side});continue;}
 const floor=terrainHeight(centre.x,centre.z)+P.pavingOffset,region=(u,d,w,depth,height,bottom)=>({points:catherineRectangle({x:centre.x+F.u.x*u+n.x*d,z:centre.z+F.u.z*u+n.z*d},w,depth,F.u,n),height:floor+height,minimumY:floor+height-.22,bottom:floor+bottom});
 benches.push({id:`catherine-bench-${t.id}-${side}`,treeId:t.id,...centre,t:F.u,n,points,width:2.2,depth:.6,seat:.46,back:.9,floor,surfaces:[region(0,0,2.3,.54,.49,-.02),region(0,-.285,2.3,.13,.925,.45),region(-1.04,-.015,.10,.51,.71,.46),region(1.04,-.015,.10,.51,.71,.46)],reconstructed:true});
}
// Partition every rendered floor into the exact original DEM triangles, rather
// than flattening the courtyard or interpolating across a height-grid diagonal.
const mesh=[],xs=SOURCE.points.map(p=>p.x),zs=SOURCE.points.map(p=>p.z),soilShape=union(soils.map(poly)),curbShape=union(curbs.map(poly));
for(let row=Math.max(0,Math.floor((Math.min(...zs)-GRID.z0)/GRID.dz));row<=Math.min(GRID.rows-2,Math.ceil((Math.max(...zs)-GRID.z0)/GRID.dz));row++)for(let col=Math.max(0,Math.floor((Math.min(...xs)-GRID.x0)/GRID.dx));col<=Math.min(GRID.cols-2,Math.ceil((Math.max(...xs)-GRID.x0)/GRID.dx));col++){
 const a=[GRID.x0+col*GRID.dx,GRID.z0+row*GRID.dz],b=[a[0]+GRID.dx,a[1]],c=[a[0],a[1]+GRID.dz],d=[b[0],c[1]];
 for(const triangle of [[a,b,c],[b,d,c]])for(const [kind,shape,offset] of [['paving',paving,P.pavingOffset],['soil',soilShape,P.soilOffset],['curb',curbShape,P.curbOffset]]){
  for(const part of parts(clip.intersection([triangle],shape))){const all=[...part.points,...part.holes.flat()];for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(part.points.map(p=>new THREE.Vector2(p.x,p.z)),part.holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z)))))mesh.push({kind,points:[all[a],all[c],all[b]].map(p=>({...p,y:terrainHeight(p.x,p.z)+offset}))});}
 }
}
const remnants={paths:{},greens:{},plazas:{}},pathLayers=[WEBSTER_REMNANTS,SCIENTIA_STEP_REMNANTS,OLD_MAIN_FRONT_REMNANTS,CHANCELLOR_REMNANTS,OLD_NORTH_REMNANTS,ENGINEERING_REMNANTS,MALL_REMNANTS],landLayers=[AGSM_COURT_REMNANTS,WEBSTER_REMNANTS,SCIENTIA_STEP_REMNANTS,OLD_MAIN_FRONT_REMNANTS,CHANCELLOR_REMNANTS,OLD_NORTH_REMNANTS,OLD_MAIN_ENTRY_REMNANTS,MALL_REMNANTS,SOUTHERN_REMNANTS];
for(const p of CAMPUS.paths){if(p.kind==='steps')continue;const key=mallPathKey(p),prior=pathLayers.map(l=>l.paths?.[key]).find(Boolean)||SOUTHERN_REMNANTS.paths[p.id],width=pathGeometry(p).width,edge=prior?union(prior.edge.map(poly)):union(ribbon(p.points,width+.5));if(!clip.intersection(edge,ground).length)continue;const surface=prior?union(prior.surface.map(poly)):union(ribbon(p.points,width));remnants.paths[key]={edge:parts(diff(edge,ground)),surface:parts(diff(surface,ground))};}
for(const key of ['greens','plazas'])for(const p of CAMPUS[key]||[]){const prior=landLayers.map(l=>l[key]?.[p.id]).find(Boolean)||[p],base=union(prior.map(poly));if(clip.intersection(base,ground).length)remnants[key][p.id]=parts(diff(base,ground));}
const result={CATHERINE_GROUND:groundParts,CATHERINE_PAVING:pavingParts,CATHERINE_PITS:pits,CATHERINE_SOIL:soils,CATHERINE_CURBS:curbs,CATHERINE_MESH:mesh,CATHERINE_BENCHES:benches,CATHERINE_REMNANTS:remnants};
fs.writeFileSync(new URL('../dist/catherine-court-parts.js',import.meta.url),'// Original OSM courtyard, exact public-DEM floor triangles, inventory-aligned tree pits and photo-fitted furniture.\n// Generated by scripts/make-catherine-court.mjs; fresh public GIS queries returned 403.\n'+Object.entries(result).map(([n,d])=>'export const '+n+' = '+JSON.stringify(d)+';\n').join(''));
console.log({ground:area(ground),paving:area(paving),pits:pits.length,benches:benches.length,rejectedBenches:rejects.length,triangles:mesh.length,paths:Object.keys(remnants.paths).length});
