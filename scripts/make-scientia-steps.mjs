import {ELECTRICAL_APRON} from '../dist/electrical-landscape-parts.js';
import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {TERRAIN_GRID as GRID} from '../dist/terrain.js';
import {scientiaPoint,scientiaLocal,scientiaRectangle} from '../dist/scientia-data.js';
import {SCIENTIA_STEP_SCOPE as S,SCIENTIA_STEP_IDS,SCIENTIA_STEP_SECTIONS,SCIENTIA_FLIGHTS,scientiaStepHeight} from '../dist/scientia-steps-data.js';
import {MALL_REMNANTS} from '../dist/mall-landscape-parts.js';
import {mallPathKey} from '../dist/mall-landscape-data.js';
const source=JSON.parse(fs.readFileSync(new URL('../sources/scientia-steps-evidence.json',import.meta.url))),m=6371008.8*Math.PI/180,sx=m*Math.cos(RAW.center.lat*Math.PI/180),world=([lon,lat])=>[(lon-RAW.center.lon)*sx,(RAW.center.lat-lat)*m];
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[Math.round(p.x*1e6)/1e6,Math.round(p.z*1e6)/1e6])),parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x:Math.round(x*1e6)/1e6,z:Math.round(z*1e6)/1e6})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x:Math.round(x*1e6)/1e6,z:Math.round(z*1e6)/1e6})))})),union=ps=>ps.length?clip.union(...ps):[],diff=(a,...ps)=>a.length?clip.difference(a,...ps.filter(p=>p.length)):[];
const ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=ps=>ps.reduce((s,p)=>s+ra(p[0])-p.slice(1).reduce((s,h)=>s+ra(h),0),0);
const ribbon=(p,w)=>p.points.slice(1).map((b,i)=>{const a=p.points[i],l=Math.hypot(b.x-a.x,b.z-a.z),n={x:-(b.z-a.z)/l*w/2,z:(b.x-a.x)/l*w/2};return poly({points:[{x:a.x+n.x,z:a.z+n.z},{x:b.x+n.x,z:b.z+n.z},{x:b.x-n.x,z:b.z-n.z},{x:a.x-n.x,z:a.z-n.z}]});});
const relevant=p=>{const ps=p.points.map(scientiaLocal);return Math.min(...ps.map(p=>p.u))<S.u1+8&&Math.max(...ps.map(p=>p.u))>S.u0-8&&Math.min(...ps.map(p=>p.v))<S.v1+8&&Math.max(...ps.map(p=>p.v))>S.v0-8;};
const rooms=RAW.buildings.filter(b=>!b.walkableUnder).map(poly),roads=RAW.paths.filter(p=>relevant(p)&&/road|service|residential/.test(p.kind||'')),roadSpace=union(roads.flatMap(p=>ribbon(p,(p.width||6)+.6)));
const clipBox=poly({points:scientiaRectangle(S.u0-1,S.u1+1,S.v0-1,S.v1+1)});
const ground=diff(poly({points:scientiaRectangle(S.u0,S.u1,S.v0,S.v1)}),roadSpace,...rooms),routeShapes=RAW.paths.filter(relevant).flatMap(p=>[...ribbon(p,(p.width||2.4)+.4),...p.points.map(q=>poly({points:Array.from({length:24},(_,i)=>({x:q.x+Math.cos(i*Math.PI/12)*((p.width||2.4)/2+.2),z:q.z+Math.sin(i*Math.PI/12)*((p.width||2.4)/2+.2)}))}))]),routeParts=routeShapes.flatMap(shape=>clip.intersection(shape,clipBox));
const clearRoutes=shape=>routeParts.reduce((kept,route)=>diff(kept,route),shape);
const read=n=>source.layers[n].response.features.map(f=>({id:f.attributes.OBJECTID,shape:f.geometry.rings.map(r=>r.map(world))}));
const gardens=read(24).flatMap(f=>parts(clearRoutes(clip.intersection(f.shape,ground))).map(p=>({...p,sourceId:f.id}))),gardenShape=union(gardens.map(poly)),lawns=read(25).flatMap(f=>parts(clearRoutes(diff(clip.intersection(f.shape,ground),gardenShape))).map(p=>({...p,sourceId:f.id}))),lawnShape=union(lawns.map(poly)),paving=diff(ground,gardenShape,lawnShape);
const floors=[];for(let index=0;index<SCIENTIA_STEP_SECTIONS.length;index++){const section=SCIENTIA_STEP_SECTIONS[index],slices=section.kind==='tread'?1:Math.ceil((section.u1-section.u0)/1.0);for(let j=0;j<slices;j++){const strip=poly({points:scientiaRectangle(section.u0+(section.u1-section.u0)*j/slices,section.u0+(section.u1-section.u0)*(j+1)/slices,-100,100)});for(const [kind,shape]of [['paving',paving],['lawn',lawnShape]])for(const p of parts(clip.intersection(shape,strip)))floors.push({...p,kind,section:index});}}
const removed=[],edges=[],xs=parts(ground).flatMap(p=>p.points.map(p=>p.x)),zs=parts(ground).flatMap(p=>p.points.map(p=>p.z));
for(let row=Math.floor((Math.min(...zs)-GRID.z0)/GRID.dz);row<=Math.ceil((Math.max(...zs)-GRID.z0)/GRID.dz);row++)for(let col=Math.floor((Math.min(...xs)-GRID.x0)/GRID.dx);col<=Math.ceil((Math.max(...xs)-GRID.x0)/GRID.dx);col++){
 const a=[GRID.x0+col*GRID.dx,GRID.z0+row*GRID.dz],b=[a[0]+GRID.dx,a[1]],c=[a[0],a[1]+GRID.dz],d=[b[0],c[1]];for(const [i,t]of [[a,b,c],[b,d,c]].entries()){const rest=diff([t],ground);if(area([[t]])-area(rest)>1e-7){removed.push([col,row,i]);edges.push(...parts(rest));}}
}
const remains={greens:{},plazas:{},paths:{}};for(const key of ['greens','plazas'])for(const p of [...RAW[key]||[],...(key==='plazas'?ELECTRICAL_APRON.map((p,i)=>({...p,id:'electrical-south-apron-'+i})):[])]){const original=union((MALL_REMNANTS[key][p.id]||[p]).map(poly));if(clip.intersection(original,ground).length)remains[key][p.id]=parts(diff(original,ground));}
for(const p of RAW.paths){if(p.kind==='steps')continue;const old=MALL_REMNANTS.paths[mallPathKey(p)],w=p.width||3.4,edge=union(old?old.edge.map(poly):ribbon(p,w+.5));if(clip.intersection(edge,ground).length)remains.paths[mallPathKey(p)]={edge:parts(diff(edge,ground)),surface:parts(diff(union(old?old.surface.map(poly):ribbon(p,w)),ground))};}
const tiers=[],bounds=[S.u0,...SCIENTIA_FLIGHTS.map(f=>f.u0),S.u1];
for(const garden of gardens)for(let i=1;i<bounds.length;i++)for(const part of parts(clip.intersection(poly(garden),poly({points:scientiaRectangle(bounds[i-1],bounds[i],-100,100)})))){const levels=part.points.map(p=>scientiaStepHeight(p.x,p.z));tiers.push({...part,sourceId:garden.sourceId,soil:Math.max(...levels)+.32,base:Math.min(...levels)-.1});}
const out={SCIENTIA_STEP_TIERS:tiers,SCIENTIA_STEP_GROUND:parts(ground),SCIENTIA_STEP_GARDENS:gardens,SCIENTIA_STEP_LAWNS:lawns,SCIENTIA_STEP_PAVING:parts(paving),SCIENTIA_STEP_FLOORS:floors,SCIENTIA_STEP_REMOVED_TRIANGLES:removed,SCIENTIA_STEP_GROUND_EDGES:edges,SCIENTIA_STEP_REMNANTS:remains};
fs.writeFileSync(new URL('../dist/scientia-steps-parts.js',import.meta.url),'// Derived bounded main-step surfaces. Raw GIS, DEM and map paths are unchanged.\n'+Object.entries(out).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v)+';').join('\n')+'\n');console.log({ground:area(ground),gardens:gardens.length,lawns:lawns.length,floors:floors.length,cutTriangles:removed.length});
