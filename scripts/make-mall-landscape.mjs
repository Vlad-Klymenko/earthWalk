import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {SOUTHERN_REMNANTS} from '../dist/southern-drive-parts.js';
import {MALL_PATH_IDS,MALL_AXIS,mallPathKey,mallCoordinates} from '../dist/mall-landscape-data.js';
const source=JSON.parse(fs.readFileSync(new URL('../sources/mall-gis-evidence.json',import.meta.url))),r=6371008.8*Math.PI/180,sx=r*Math.cos(RAW.center.lat*Math.PI/180);
const world=([lon,lat])=>[(lon-RAW.center.lon)*sx,(RAW.center.lat-lat)*r],gis=layer=>source.layers[layer].features.map(f=>f.geometry.rings.map(r=>r.map(world)));
const snap=n=>Math.round(n*1e6)/1e6;
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})))}));
const union=ps=>ps.length?clip.union(...ps):[],diff=(a,...ps)=>a.length?clip.difference(a,...ps.filter(p=>p.length)):[];
function ribbon(points,width){
 const sampled=[];for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)));for(let k=0;k<n;k++)sampled.push({x:a.x+(b.x-a.x)*k/n,z:a.z+(b.z-a.z)*k/n});}sampled.push(points.at(-1));
 const rows=sampled.map((p,i)=>{const a=sampled[Math.max(0,i-1)],b=sampled[Math.min(sampled.length-1,i+1)],l=Math.hypot(b.x-a.x,b.z-a.z)||1,nx=-(b.z-a.z)/l*width/2,nz=(b.x-a.x)/l*width/2;return [[p.x+nx,p.z+nz],[p.x-nx,p.z-nz]];});
 return rows.slice(1).map((q,i)=>[[rows[i][0],q[0],q[1],rows[i][1]]]);
}
const sourceMall=CAMPUS.paths.filter(p=>MALL_PATH_IDS.includes(p.id)),mapped=union(gis('courtyard'));
const scope=union([mapped,...sourceMall.flatMap(p=>ribbon(p.points,p.width+.5))]),buildings=RAW.buildings.filter(b=>!b.walkableUnder).map(poly),steps=union(CAMPUS.paths.filter(p=>p.kind==='steps').flatMap(p=>ribbon(p.points,p.width+.08)));
const ground=diff(scope,...buildings,steps),green=clip.intersection(union([...gis('gardens'),...gis('lawns')]),ground),paving=diff(ground,green);
const remains={paths:{},greens:{},plazas:{}};
for(const p of CAMPUS.paths){if(p.kind==='steps')continue;const road=p.renderSurface==='asphalt'||p.renderSurface!=='paving'&&/road|service|residential|street/i.test(p.kind||p.type||''),width=p.renderWidth||p.width||(/mall/i.test(p.name||'')?12:road?7:3.4),south=SOUTHERN_REMNANTS.paths[p.id],edge=union(south?south.edge.map(poly):ribbon(p.points,width+.5));if(!clip.intersection(edge,ground).length)continue;remains.paths[mallPathKey(p)]={surface:parts(diff(union(south?south.surface.map(poly):ribbon(p.points,width)),ground)),edge:parts(diff(edge,ground))};}
for(const key of ['greens','plazas'])for(const p of CAMPUS[key]){const base=union((SOUTHERN_REMNANTS[key][p.id]||[p]).map(poly));if(clip.intersection(base,ground).length)remains[key][p.id]=parts(diff(base,ground));}
// Short strips avoid subdividing a campus-length skinny triangle into excessive geometry.
const local=parts(ground).flatMap(p=>p.points.map(mallCoordinates)),umin=Math.floor(Math.min(...local.map(p=>p.u))/4)*4,umax=Math.max(...local.map(p=>p.u)),vmin=Math.min(...local.map(p=>p.v))-1,vmax=Math.max(...local.map(p=>p.v))+1;
const point=(u,v)=>[u*MALL_AXIS.x-v*MALL_AXIS.z,u*MALL_AXIS.z+v*MALL_AXIS.x],strips=[];for(let u=umin;u<umax;u+=4)strips.push([[point(u,vmin),point(u+4,vmin),point(u+4,vmax),point(u,vmax)]]);
const tile=m=>strips.flatMap(s=>parts(clip.intersection(m,s)));
const result={MALL_MAPPED_COURT:parts(mapped),MALL_GROUND:parts(ground),MALL_GREEN:parts(green),MALL_PAVING:parts(paving),MALL_PAVING_MESH:tile(paving),MALL_GREEN_MESH:tile(green),MALL_REMNANTS:remains};
fs.writeFileSync(new URL('../dist/mall-landscape-parts.js',import.meta.url),'// Generated GIS courtyard / lawn / garden partitions. Fine grades, materials and lights reconstructed.\n'+Object.entries(result).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v)+';').join('\n')+'\n');console.log(Object.fromEntries(Object.entries(result).map(([k,v])=>[k,Array.isArray(v)?v.length:Object.keys(v.paths).length])));
