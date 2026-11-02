import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { ELECTRICAL_LANDSCAPE as g } from '../dist/electrical-landscape.js';
import { TERRAIN_GRID as grid } from '../dist/terrain.js';
const poly=p=>[p.map(p=>[p.x,p.z])];
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const area=m=>m.reduce((s,p)=>s+ringArea(p[0])-p.slice(1).reduce((s,h)=>s+ringArea(h),0),0);
const parts=m=>m.map(r=>({points:r[0].slice(0,-1).map(([x,z])=>({x,z})),holes:r.slice(1).map(h=>h.slice(0,-1).map(([x,z])=>({x,z}))),reconstructed:true}));
const relevant=CAMPUS.buildings.filter(b=>area(clipping.intersection(poly(g.apron),poly(b.points)))>1e-7);
const apron=clipping.difference(poly(g.apron),...relevant.map(b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]))));
const cutout=clipping.union(poly(g.arena),poly(g.ramp),poly(g.bridge));
const all=cutout.flat(2),xs=all.map(p=>p[0]),zs=all.map(p=>p[1]);
const cols=[Math.max(0,Math.floor((Math.min(...xs)-grid.x0)/grid.dx)),Math.min(grid.cols-2,Math.ceil((Math.max(...xs)-grid.x0)/grid.dx))];
const rows=[Math.max(0,Math.floor((Math.min(...zs)-grid.z0)/grid.dz)),Math.min(grid.rows-2,Math.ceil((Math.max(...zs)-grid.z0)/grid.dz))];
const removed=[],edges=[];
for(let row=rows[0];row<=rows[1];row++)for(let col=cols[0];col<=cols[1];col++){
  const a=[grid.x0+col*grid.dx,grid.z0+row*grid.dz],b=[a[0]+grid.dx,a[1]],c=[a[0],a[1]+grid.dz],d=[b[0],c[1]];
  for(const [i,t]of [[a,b,c],[b,d,c]].entries()){
    const remaining=clipping.difference([t],cutout);
    if(area([[t]])-area(remaining)>1e-7){removed.push([col,row,i]);edges.push(...parts(remaining));}
  }
}
fs.writeFileSync(new URL('../dist/electrical-landscape-parts.js',import.meta.url),'// Reconstructed pavement and exact cuts in the retained DEM triangles.\n// Regenerate with node scripts/make-electrical-landscape.mjs.\nexport const ELECTRICAL_APRON = '+JSON.stringify(parts(apron),null,2)+';\nexport const ELECTRICAL_GROUND_CUTOUT = '+JSON.stringify(parts(cutout),null,2)+';\nexport const ELECTRICAL_REMOVED_TRIANGLES = '+JSON.stringify(removed)+';\nexport const ELECTRICAL_GROUND_EDGES = '+JSON.stringify(edges,null,2)+';\n');
console.log(`${parts(apron).length} apron polygons; ${removed.length} DEM triangles replaced with ${edges.length} boundary fragments`);
