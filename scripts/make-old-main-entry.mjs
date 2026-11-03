import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {TERRAIN_GRID as grid} from '../dist/terrain.js';
import {OLD_MAIN_ENTRY_ZONES,OLD_MAIN_ENTRY_SURFACES} from '../dist/old-main-entry-data.js';
import {MALL_REMNANTS} from '../dist/mall-landscape-parts.js';
import {SOUTHERN_REMNANTS} from '../dist/southern-drive-parts.js';
const snap=n=>Math.round(n*1e6)/1e6,poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[snap(p.x),snap(p.z)])),parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})))}));
const rooms=CAMPUS.buildings.filter(b=>!b.walkableUnder).map(poly),cut=clip.difference(clip.union(...OLD_MAIN_ENTRY_ZONES.map(poly)),...rooms),floors=OLD_MAIN_ENTRY_SURFACES.flatMap(p=>parts(clip.difference(poly(p),...rooms)).map(q=>({...q,id:p.id,...(p.height!==undefined?{height:p.height}:{})}))),all=cut.flat(2),xs=all.map(p=>p[0]),zs=all.map(p=>p[1]),removed=[],edges=[];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
for(let row=Math.max(0,Math.floor((Math.min(...zs)-grid.z0)/grid.dz));row<=Math.min(grid.rows-2,Math.ceil((Math.max(...zs)-grid.z0)/grid.dz));row++)for(let col=Math.max(0,Math.floor((Math.min(...xs)-grid.x0)/grid.dx));col<=Math.min(grid.cols-2,Math.ceil((Math.max(...xs)-grid.x0)/grid.dx));col++){
 const a=[grid.x0+col*grid.dx,grid.z0+row*grid.dz],b=[a[0]+grid.dx,a[1]],c=[a[0],a[1]+grid.dz],d=[b[0],c[1]];
 for(const [i,t]of [[a,b,c],[b,d,c]].entries()){const remaining=clip.difference([t],cut);if(area([[t]])-area(remaining)>1e-7){removed.push([col,row,i]);edges.push(...parts(remaining));}}
}
const remnants={greens:{},plazas:{}};for(const key of ['greens','plazas'])for(const p of CAMPUS[key]){const base=clip.union(...(MALL_REMNANTS[key][p.id]||SOUTHERN_REMNANTS[key][p.id]||[p]).map(poly));if(clip.intersection(base,cut).length)remnants[key][p.id]=parts(clip.difference(base,cut));}
const result={OLD_MAIN_ENTRY_FLOORS:floors,OLD_MAIN_ENTRY_CUTOUT:parts(cut),OLD_MAIN_ENTRY_REMOVED_TRIANGLES:removed,OLD_MAIN_ENTRY_GROUND_EDGES:edges,OLD_MAIN_ENTRY_REMNANTS:remnants};
fs.writeFileSync(new URL('../dist/old-main-entry-parts.js',import.meta.url),'// Generated bounded exterior terrain cut. Source DEM samples remain untouched.\n'+Object.entries(result).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v)+';').join('\n')+'\n');console.log(removed.length,'terrain triangles cut;',edges.length,'edge fragments');
