import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {OLD_NORTH_SCOPE as S,OLD_NORTH_ANNEX_SCOPE as A,OLD_NORTH_POST_CANDIDATES,OLD_NORTH_PLANTER,oldNorthRectangle,oldNorthPoint,oldNorthLocal} from '../dist/old-main-north-data.js';
import {MALL_REMNANTS} from '../dist/mall-landscape-parts.js';
import {SOUTHERN_REMNANTS} from '../dist/southern-drive-parts.js';
import {OLD_MAIN_ENTRY_REMNANTS} from '../dist/old-main-entry-parts.js';
import {ENGINEERING_REMNANTS} from '../dist/engineering-street-parts.js';
import {mallPathKey} from '../dist/mall-landscape-data.js';
import {pathGeometry} from '../dist/path-materials.js';
const evidence=JSON.parse(fs.readFileSync(new URL('../sources/old-main-north-evidence.json',import.meta.url))),r=6371008.8*Math.PI/180,sx=r*Math.cos(RAW.center.lat*Math.PI/180),world=([lon,lat])=>[(lon-RAW.center.lon)*sx,(RAW.center.lat-lat)*r],snap=n=>Math.round(n*1e6)/1e6;
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[snap(p.x),snap(p.z)])),parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})))}));
const union=ps=>ps.length?clip.union(...ps):[],diff=(a,...bs)=>a.length?clip.difference(a,...bs.filter(b=>b.length)):[],gis=key=>union(evidence[key].response.features.map(f=>f.geometry.rings.map(r=>r.map(world))));
const rooms=RAW.buildings.filter(b=>!b.walkableUnder).map(poly),scope=poly({points:oldNorthRectangle(S.u0,S.u1,S.v0,S.v1)}),annexScope=poly({points:oldNorthRectangle(A.u0,A.u1,A.v0,A.v1)});
const ribbon=(path,width)=>path.points.slice(1).map((b,i)=>{const a=path.points[i],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz)||1,nx=-dz/len*width/2,nz=dx/len*width/2;return [[[snap(a.x+nx),snap(a.z+nz)],[snap(b.x+nx),snap(b.z+nz)],[snap(b.x-nx),snap(b.z-nz)],[snap(a.x-nx),snap(a.z-nz)]]];});
const bounded=p=>p[0].some(([x,z])=>{const q=oldNorthLocal({x,z});return q.u>S.u0-8&&q.u<S.u1+8&&q.v>S.v0-8&&q.v<S.v1+8;}),clearanceRoutes=union(CAMPUS.paths.flatMap(p=>ribbon(p,pathGeometry(p).width+.7)).filter(bounded)),annex=diff(clip.intersection(gis('building'),annexScope),...rooms,clearanceRoutes),court=diff(clip.intersection(gis('courtyard'),scope),...rooms,annex),routes=union(CAMPUS.paths.flatMap(p=>ribbon(p,pathGeometry(p).width)).filter(bounded)),paving=diff(court,routes,poly({points:OLD_NORTH_PLANTER.holes[0]})),ground=union([court,annex]);
const remnants={paths:{},greens:{},plazas:{}};
for(const p of CAMPUS.paths){if(p.kind==='steps')continue;const previous=ENGINEERING_REMNANTS.paths[mallPathKey(p)]||MALL_REMNANTS.paths[mallPathKey(p)]||SOUTHERN_REMNANTS.paths[p.id],width=pathGeometry(p).width,edge=union(previous?previous.edge.map(poly):ribbon(p,width+.5));if(!clip.intersection(edge,ground).length)continue;remnants.paths[mallPathKey(p)]={edge:parts(diff(edge,ground)),surface:parts(diff(union(previous?previous.surface.map(poly):ribbon(p,width)),diff(ground,routes)))};}
for(const key of ['greens','plazas'])for(const p of CAMPUS[key]){const base=union((OLD_MAIN_ENTRY_REMNANTS[key][p.id]||MALL_REMNANTS[key][p.id]||SOUTHERN_REMNANTS[key][p.id]||[p]).map(poly));if(clip.intersection(base,ground).length)remnants[key][p.id]=parts(diff(base,ground));}
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);},annexParts=parts(annex),posts=OLD_NORTH_POST_CANDIDATES.filter(p=>CAMPUS.paths.every(route=>route.points.slice(1).every((b,i)=>distance(p,route.points[i],b)>pathGeometry(route).width/2+p.radius+.08))&&RAW.buildings.filter(b=>!b.walkableUnder).every(b=>!inside(p,b.points))&&annexParts.every(a=>!inside(p,a.points)));
const strips=[];for(let v=S.v0;v<S.v1;v+=4)strips.push(poly({points:oldNorthRectangle(S.u0,S.u1,v,Math.min(S.v1,v+4))}));
const result={OLD_NORTH_ANNEX_PARTS:annexParts,OLD_NORTH_COURT:parts(court),OLD_NORTH_PAVING:parts(paving),OLD_NORTH_PAVING_MESH:strips.flatMap(s=>parts(clip.intersection(paving,s))),OLD_NORTH_REMNANTS:remnants,OLD_NORTH_POSTS:posts};
fs.writeFileSync(new URL('../dist/old-main-north-parts.js',import.meta.url),'// Generated public GIS plan reconstruction. Heights, glazing and fixtures remain estimates.\n'+Object.entries(result).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v)+';').join('\n')+'\n');console.log(Object.fromEntries(Object.entries(result).map(([k,v])=>[k,Array.isArray(v)?v.length:Object.keys(v.paths).length])));
