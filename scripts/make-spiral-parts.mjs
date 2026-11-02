import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {TERRAIN_GRID as grid} from '../dist/terrain.js';
import {frameRectangle} from '../dist/geometry.js';
import {BASSER_GROUND_CUTOUT} from '../dist/basser-ground-parts.js';
import {SPIRAL_ID,SPIRAL_ROOM,SPIRAL_RING,SPIRAL_LANDING,SPIRAL_GRADES} from '../dist/spiral-data.js';
const poly=p=>[p.map(p=>[p.x,p.z])];
const pointRing=r=>r.slice(0,-1).map(([x,z])=>({x,z}));
const parts=m=>m.map(r=>({points:pointRing(r[0]),holes:r.slice(1).map(pointRing),reconstructed:true}));
const shape=p=>[...poly(p.points),...(p.holes||[]).map(r=>poly(r)[0])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const area=m=>m.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const source=CAMPUS.buildings.find(b=>b.id===SPIRAL_ID),building=poly(source.points),room=poly(SPIRAL_ROOM);
const decks=SPIRAL_RING.flatMap(p=>parts(clip.difference(clip.intersection(poly(p.points),building),room)));
const landing=parts(clip.difference(clip.intersection(poly(SPIRAL_LANDING.points),building),room));
const paths=CAMPUS.paths.flatMap(path=>path.points.slice(1).map((c,i)=>{const a=path.points[i],length=Math.hypot(c.x-a.x,c.z-a.z),u={x:(c.x-a.x)/length,z:(c.z-a.z)/length},f={x:(a.x+c.x)/2,z:(a.z+c.z)/2,u,v:{x:-u.z,z:u.x}};return poly(frameRectangle(f,length,(path.width||3)+.15));}));
const cut=clip.union(...SPIRAL_GRADES.map(p=>poly(p.points))),paving=parts(clip.difference(cut,room,...paths));
// Regenerate one combined stencil so overlapping Basser / spiral cutouts do
// not reinsert each other's old DEM fragments at their shared approach.
const combined=clip.union(cut,...BASSER_GROUND_CUTOUT.map(shape)),all=combined.flat(2),xs=all.map(p=>p[0]),zs=all.map(p=>p[1]),removed=[],edges=[];
for(let row=Math.max(0,Math.floor((Math.min(...zs)-grid.z0)/grid.dz));row<=Math.min(grid.rows-2,Math.ceil((Math.max(...zs)-grid.z0)/grid.dz));row++)for(let col=Math.max(0,Math.floor((Math.min(...xs)-grid.x0)/grid.dx));col<=Math.min(grid.cols-2,Math.ceil((Math.max(...xs)-grid.x0)/grid.dx));col++){
 const a=[grid.x0+col*grid.dx,grid.z0+row*grid.dz],b=[a[0]+grid.dx,a[1]],c=[a[0],a[1]+grid.dz],d=[b[0],c[1]];
 for(const [i,t]of [[a,b,c],[b,d,c]].entries()){
  const remaining=clip.difference([t],combined);
  if(area([[t]])-area(remaining)>1e-7){removed.push([col,row,i]);edges.push(...parts(remaining));}
 }
}
const exports={SPIRAL_OPEN:parts(clip.difference(building,room)),SPIRAL_DECKS:decks,SPIRAL_LANDINGS:landing,SPIRAL_PAVING:paving,SPIRAL_GROUND_CUTOUT:parts(cut),SPIRAL_COMBINED_CUTOUT:parts(combined),SPIRAL_REMOVED_TRIANGLES:removed,SPIRAL_GROUND_EDGES:edges};
fs.writeFileSync(new URL('../dist/spiral-parts.js',import.meta.url),'// Reconstructed spiral layers and combined Basser / Grad Shop DEM stencil.\n'+Object.entries(exports).map(([name,value])=>`export const ${name} = ${JSON.stringify(value)};`).join('\n')+'\n');
console.log(decks.length,'deck cells;',paving.length,'paving regions;',removed.length,'combined terrain triangles');
