import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {BARKER_EAST_PAVING,BARKER_EAST_HEDGES} from '../dist/barker-east-parts.js';
import {SOUTHERN_SCOPE as S,southernPoint} from '../dist/southern-drive-data.js';
const source=JSON.parse(fs.readFileSync(new URL('../sources/southern-drive-gis-evidence.json',import.meta.url)));
const px=6371008.8*Math.PI/180*Math.cos(-33.9178*Math.PI/180),pz=6371008.8*Math.PI/180;
const world=([lon,lat])=>[(lon-151.2285)*px,(-33.9178-lat)*pz];
const mapped=id=>source.layers[id].features.map(f=>({id:f.attributes.OBJECTID,poly:f.geometry.rings.map(r=>r.map(world))}));
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const ring=r=>r.slice(0,-1).map(([x,z])=>({x,z}));
const parts=m=>m.map(p=>({points:ring(p[0]),holes:p.slice(1).map(ring)}));
const scope=[[[S.minX,S.minZ],[S.maxX,S.minZ],[S.maxX,S.maxZ],[S.minX,S.maxZ]]];
const intersect=(...p)=>clip.intersection(...p),union=p=>p.length?clip.union(...p):[],difference=(a,...b)=>a.length?clip.difference(a,...b.filter(p=>p.length)):[];
const buildings=RAW.buildings.filter(b=>!b.walkableUnder).map(poly);
const route=(a,c,width)=>{const dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz);if(!l)return [];const nx=-dz/l*width/2,nz=dx/l*width/2;return [[[a.x+nx,a.z+nz],[c.x+nx,c.z+nz],[c.x-nx,c.z-nz],[a.x-nx,a.z-nz]]];};
const footpaths=CAMPUS.paths.filter(p=>p.kind!=='road'&&p.kind!=='steps').flatMap(p=>p.points.slice(1).map((c,i)=>route(p.points[i],c,p.width+.12))).filter(p=>p.length);
const gardens=mapped('24'),lawns=mapped('25'),roads=mapped('21');
const narrow=gardens.filter(p=>![21,274,366].includes(p.id)),broad=gardens.filter(p=>[21,274,366].includes(p.id));
const planting=difference(intersect(union([...narrow.map(p=>p.poly),...BARKER_EAST_HEDGES.map(poly)]),scope),...buildings,...footpaths);
const grass=difference(intersect(union([...lawns.map(p=>p.poly),...broad.map(p=>p.poly)]),scope),planting,...buildings,...footpaths);
// Rounded brick refuge fitted from the panorama, independently of mapped garden 273.
const refugeRing=[];for(const [u,v,start] of [[.9,-6.5,-Math.PI/2],[.9,7.7,0],[-.9,7.7,Math.PI/2],[-.9,-6.5,Math.PI]])for(let i=0;i<=6;i++){const a=start+i*Math.PI/12,p=southernPoint(u+.7*Math.cos(a),v+.7*Math.sin(a));refugeRing.push([p.x,p.z]);}
const roadArea=difference(intersect(union(roads.map(p=>p.poly)),scope),grass,planting,...buildings);
const refuge=intersect([refugeRing],roadArea),road=difference(roadArea,refuge);
const paving=difference(scope,road,grass,planting,...buildings);
const hedge=difference(planting,union(BARKER_EAST_HEDGES.map(poly)),...gardens.filter(p=>p.id===273).map(p=>p.poly));
const median=intersect(planting,...gardens.filter(p=>p.id===273).map(p=>p.poly));
// Reproduce renderer ribbon sampling before clipping, so old surfaces terminate exactly at scope.
function ribbonQuads(points,width){
 const sampled=[];for(let i=1;i<points.length;i++){const a=points[i-1],c=points[i],n=Math.max(1,Math.ceil(Math.hypot(c.x-a.x,c.z-a.z)));for(let k=0;k<n;k++)sampled.push({x:a.x+(c.x-a.x)*k/n,z:a.z+(c.z-a.z)*k/n});}sampled.push(points.at(-1));
 const across=Math.max(1,Math.ceil(width)),rows=sampled.map((p,i)=>{const a=sampled[Math.max(0,i-1)],c=sampled[Math.min(sampled.length-1,i+1)],l=Math.hypot(c.x-a.x,c.z-a.z)||1;return Array.from({length:across+1},(_,j)=>[p.x-(c.z-a.z)/l*width*(j/across-.5),p.z+(c.x-a.x)/l*width*(j/across-.5)]);});
 return rows.slice(1).flatMap((r,i)=>r.slice(1).map((_,j)=>[[rows[i][j+1],r[j+1],r[j],rows[i][j]]]));
}
const remnants={paths:{},greens:{},plazas:{}};
for(const p of CAMPUS.paths){if(p.kind==='steps')continue;const road=p.renderSurface==='asphalt'||p.renderSurface!=='paving'&&/road|service|residential|street/i.test(p.kind||p.type||''),width=p.renderWidth||p.width||(/mall/i.test(p.name||'')?12:road?7:3.4),q=ribbonQuads(p.points,width+.5);if(!q.some(p=>intersect(p,scope).length))continue;
 remnants.paths[p.id]={surface:parts(difference(union(ribbonQuads(p.points,width)),scope)),edge:parts(difference(union(q),scope))};
}
for(const key of ['greens','plazas'])for(const p of CAMPUS[key])if(intersect(poly(p),scope).length)remnants[key][p.id]=parts(difference(poly(p),scope));
const barkerPaving=parts(difference(union(BARKER_EAST_PAVING.map(poly)),scope));
const stripes=[];const crossing=RAW.paths.find(p=>p.id==='osm-way-1098977026');const a=crossing.points.at(-1),c=crossing.points[0],l=Math.hypot(c.x-a.x,c.z-a.z),u={x:(c.x-a.x)/l,z:(c.z-a.z)/l},v={x:-u.z,z:u.x};
for(let d=.5;d<l;d+=.9){const x=a.x+u.x*d,z=a.z+u.z*d;stripes.push(...parts(intersect([[[x-u.x*.225-v.x*1.5,z-u.z*.225-v.z*1.5],[x+u.x*.225-v.x*1.5,z+u.z*.225-v.z*1.5],[x+u.x*.225+v.x*1.5,z+u.z*.225+v.z*1.5],[x-u.x*.225+v.x*1.5,z-u.z*.225+v.z*1.5]]],road)));}
const values={SOUTHERN_ROAD:parts(road),SOUTHERN_PAVING:parts(paving),SOUTHERN_GRASS:parts(grass),SOUTHERN_PLANTING:parts(planting),SOUTHERN_HEDGES:parts(hedge),SOUTHERN_MEDIAN:parts(median),SOUTHERN_REFUGE:parts(refuge),SOUTHERN_STRIPES:stripes,SOUTHERN_REMNANTS:remnants,SOUTHERN_BARKER_PAVING:barkerPaving};
fs.writeFileSync(new URL('../dist/southern-drive-parts.js',import.meta.url),'// Generated from public UNSW GIS plan boundaries; materials / refuge / fine levels reconstructed.\n'+Object.entries(values).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v)+';').join('\n')+'\n');
console.log(Object.fromEntries(Object.entries(values).map(([k,v])=>[k,Array.isArray(v)?v.length:Object.keys(v.paths).length])));
