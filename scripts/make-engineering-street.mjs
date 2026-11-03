import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {ENGINEERING_SCOPE as S,ENGINEERING_BOLLARD_CANDIDATES,engineeringRectangle,engineeringCoordinates} from '../dist/engineering-street-data.js';
import {MALL_REMNANTS} from '../dist/mall-landscape-parts.js';
import {SOUTHERN_REMNANTS} from '../dist/southern-drive-parts.js';
import {mallPathKey} from '../dist/mall-landscape-data.js';
import {OLD_MAIN_ENTRY_ZONES} from '../dist/old-main-entry-data.js';
import {pathGeometry} from '../dist/path-materials.js';
const evidence=JSON.parse(fs.readFileSync(new URL('../sources/engineering-street-gis-evidence.json',import.meta.url))),r=6371008.8*Math.PI/180,sx=r*Math.cos(RAW.center.lat*Math.PI/180);
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),snap=n=>Math.round(n*1e6)/1e6,parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})))}));
const union=ps=>ps.length?clip.union(...ps):[],difference=(a,...bs)=>a.length?clip.difference(a,...bs.filter(b=>b.length)):[],scope=poly({points:engineeringRectangle(S.s0,S.s1,S.o0,S.o1)});
const world=([lon,lat])=>[(lon-RAW.center.lon)*sx,(RAW.center.lat-lat)*r],mapped=union(evidence.response.features.map(f=>f.geometry.rings.map(r=>r.map(world))));
const occupied=RAW.buildings.filter(b=>!b.walkableUnder).map(poly);
// Exact source segment ribbons are only masks; original points and widths are untouched.
const ribbon=(path,width)=>path.points.slice(1).map((b,i)=>{const a=path.points[i],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz)||1,nx=-dz/len*width/2,nz=dx/len*width/2;return [[[a.x+nx,a.z+nz],[b.x+nx,b.z+nz],[b.x-nx,b.z-nz],[a.x-nx,a.z-nz]]];});
const bounded=r=>{const ps=r[0].map(([x,z])=>engineeringCoordinates({x,z}));return Math.min(...ps.map(p=>p.s))<S.s1+.5&&Math.max(...ps.map(p=>p.s))>S.s0-.5&&Math.min(...ps.map(p=>p.o))<S.o1+.5&&Math.max(...ps.map(p=>p.o))>S.o0-.5;},routes=union(CAMPUS.paths.flatMap(p=>ribbon(p,pathGeometry(p).width+.02)).filter(bounded).map(p=>p.map(r=>r.map(([x,z])=>[snap(x),snap(z)])))),gardens=difference(clip.intersection(mapped,scope),...occupied,routes);
const west=poly({points:engineeringRectangle(S.s0,S.s1,-8.5,-3.0)}),entryCut=difference(union(OLD_MAIN_ENTRY_ZONES.map(poly)),...occupied),paving=difference(west,gardens,entryCut,...occupied,routes),ground=union([gardens,paving,entryCut]);
const remains={paths:{}};
for(const p of CAMPUS.paths){if(p.kind==='steps')continue;const previous=MALL_REMNANTS.paths[mallPathKey(p)]||SOUTHERN_REMNANTS.paths[p.id],width=pathGeometry(p).width,edge=union(previous?previous.edge.map(poly):ribbon(p,width+.5));if(!clip.intersection(edge,ground).length)continue;remains.paths[mallPathKey(p)]={edge:parts(difference(edge,ground)),surface:parts(difference(union(previous?previous.surface.map(poly):ribbon(p,width)),ground))};}
const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const touches=(p,part,rad)=>inside(p,part.points)&&!part.holes.some(h=>inside(p,h))||[part.points,...part.holes||[]].some(r=>r.some((a,i)=>distance(p,a,r[(i+1)%r.length])<rad));
const gardenParts=parts(gardens),bollards=ENGINEERING_BOLLARD_CANDIDATES.filter(p=>CAMPUS.paths.every(route=>route.points.slice(1).every((b,i)=>distance(p,route.points[i],b)>=pathGeometry(route).width/2+p.radius+.025))&&RAW.buildings.filter(b=>!b.walkableUnder).every(b=>!touches(p,b,p.radius+.25))&&gardenParts.every(g=>!touches(p,g,p.radius+.05))&&TREE_INVENTORY.every(t=>Math.hypot(p.x-t.x,p.z-t.z)>p.radius+(t.dbhMm||200)/2000+.3)&&CAMPUS.landmarks.every(l=>Math.hypot(p.x-l.x,p.z-l.z)>p.radius+.6));
const plants=[];for(let s=S.s0;s<S.s1;s+=.8)for(let o=-8.5;o<30;o+=.8){const p=engineeringRectangle(s,s+.01,o,o+.01)[0];if(gardenParts.some(g=>touches(p,g,0)&&g.points.every((a,i)=>distance(p,a,g.points[(i+1)%g.points.length])>.24))&&TREE_INVENTORY.every(t=>Math.hypot(p.x-t.x,p.z-t.z)>.6))plants.push({...p,height:.28+(plants.length%4)*.055,radius:.22,reconstructed:true});}
const result={ENGINEERING_GARDENS:gardenParts,ENGINEERING_PAVING:parts(paving),ENGINEERING_GROUND:parts(ground),ENGINEERING_REMNANTS:remains,ENGINEERING_BOLLARDS:bollards,ENGINEERING_PLANTS:plants};
fs.writeFileSync(new URL('../dist/engineering-street-parts.js',import.meta.url),'// Generated public garden outlines with photo-fitted paving / planting / bollards. No measured Z data.\n'+Object.entries(result).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v)+';').join('\n')+'\n');
console.log(Object.fromEntries(Object.entries(result).map(([k,v])=>[k,Array.isArray(v)?v.length:Object.keys(v.paths).length])));
