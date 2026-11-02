import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { TERRAIN_GRID as grid } from '../dist/terrain.js';
const ids=['osm-way-10203380','osm-way-588521806'];
const paths=CAMPUS.paths.filter(p=>ids.includes(p.id)),rects=[];
for(const path of paths)for(let i=0;i<path.points.length-1;i++){
  const a=path.points[i],b=path.points[i+1],len=Math.hypot(b.x-a.x,b.z-a.z),nx=-(b.z-a.z)/len*path.width/2,nz=(b.x-a.x)/len*path.width/2;
  rects.push([[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[b.x-nx,b.z-nz],[b.x+nx,b.z+nz]]]);
}
const cutout=clipping.union(...rects),all=cutout.flat(2),xs=all.map(p=>p[0]),zs=all.map(p=>p[1]);
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const parts=m=>m.map(r=>({points:r[0].slice(0,-1).map(([x,z])=>({x,z})),holes:r.slice(1).map(h=>h.slice(0,-1).map(([x,z])=>({x,z}))),reconstructed:true}));
const removed=[],edges=[];
for(let row=Math.max(0,Math.floor((Math.min(...zs)-grid.z0)/grid.dz));row<=Math.min(grid.rows-2,Math.ceil((Math.max(...zs)-grid.z0)/grid.dz));row++)for(let col=Math.max(0,Math.floor((Math.min(...xs)-grid.x0)/grid.dx));col<=Math.min(grid.cols-2,Math.ceil((Math.max(...xs)-grid.x0)/grid.dx));col++){
  const a=[grid.x0+col*grid.dx,grid.z0+row*grid.dz],b=[a[0]+grid.dx,a[1]],c=[a[0],a[1]+grid.dz],d=[b[0],c[1]];
  for(const [i,t]of [[a,b,c],[b,d,c]].entries()){
    const remaining=clipping.difference([t],cutout);
    if(area([[t]])-area(remaining)>1e-7){removed.push([col,row,i]);edges.push(...parts(remaining));}
  }
}
fs.writeFileSync(new URL('../dist/basser-ground-parts.js',import.meta.url),'// Retained Basser stair rectangles cut only the displayed ground mesh.\n// Source DEM samples and walking levels remain unchanged.\nexport const BASSER_STEP_IDS = '+JSON.stringify(ids)+';\nexport const BASSER_GROUND_CUTOUT = '+JSON.stringify(parts(cutout),null,2)+';\nexport const BASSER_REMOVED_TRIANGLES = '+JSON.stringify(removed)+';\nexport const BASSER_GROUND_EDGES = '+JSON.stringify(edges,null,2)+';\n');
console.log(`${removed.length} Basser DEM triangles replaced with ${edges.length} boundary fragments`);
