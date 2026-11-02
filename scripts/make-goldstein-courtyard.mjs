import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {goldsteinCourtGeometry} from '../dist/goldstein-courtyard-data.js';
const g=goldsteinCourtGeometry(),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),shape=points=>poly({points}),clean=r=>(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-9?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const regions=geometry=>geometry.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true}));
const buildings=CAMPUS.buildings.filter(p=>!p.walkableUnder).map(poly);
// Continuous raised paving deliberately follows the photographed court over
// the retained footway centrelines. Source paths and raw DEM are not rewritten.
const paving=regions(clip.difference(shape(g.court),shape(g.pool.outer),shape(g.tree.pit),...buildings));
const blockers=[...buildings];
for(const path of CAMPUS.paths.filter(p=>p.id!=='osm-way-301754238'))for(let i=1;i<path.points.length;i++){
 const a=path.points[i-1],c=path.points[i],len=Math.hypot(c.x-a.x,c.z-a.z);if(!len||Math.min(Math.hypot(a.x-g.stair.a.x,a.z-g.stair.a.z),Math.hypot(c.x-g.stair.a.x,c.z-g.stair.a.z))>60)continue;
 const half=(path.width||2.1)/2+.18,nx=-(c.z-a.z)/len*half,nz=(c.x-a.x)/len*half;
 blockers.push(shape([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}]));
}
const cheeks=g.cheeks.flatMap(p=>regions(clip.difference(poly(p),...blockers)));
fs.writeFileSync(new URL('../dist/goldstein-courtyard-parts.js',import.meta.url),'// Photo-led Goldstein courtyard, clipped around retained occupied footprints.\n// Regenerate with node scripts/make-goldstein-courtyard.mjs.\nexport const GOLDSTEIN_PAVING = '+JSON.stringify(paving,null,2)+';\nexport const GOLDSTEIN_STAIR_CHEEKS = '+JSON.stringify(cheeks,null,2)+';\n');
console.log(`${paving.length} court paving regions; ${cheeks.length} path-clear stair-cheek regions`);
