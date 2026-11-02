import fs from 'node:fs';
import clip from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { VILLAGE_CAFE_ID,villageCafeGeometry } from '../dist/village-cafe-data.js';
const poly=(p,h=[])=>[p,...h].map(r=>r.map(p=>[p.x,p.z]));
const clean=r=>(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-9?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const emit=r=>r.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true}));
const raw=CAMPUS.buildings.find(b=>b.id===VILLAGE_CAFE_ID),g=villageCafeGeometry(raw),occupied=clip.union(...CAMPUS.buildings.filter(b=>!b.walkableUnder).map(b=>poly(b.points,b.holes)));
const paths=[];for(const p of CAMPUS.paths)for(let i=1;i<p.points.length;i++){const a=p.points[i-1],c=p.points[i];if(Math.min(Math.hypot(a.x-g.frame.x,a.z-g.frame.z),Math.hypot(c.x-g.frame.x,c.z-g.frame.z))>50)continue;const len=Math.hypot(c.x-a.x,c.z-a.z);if(!len)continue;const nx=-(c.z-a.z)/len*((p.width||3)+.16)/2,nz=(c.x-a.x)/len*((p.width||3)+.16)/2;paths.push(poly([{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:c.x-nx,z:c.z-nz},{x:c.x+nx,z:c.z+nz}]));}
const deck=clip.difference(clip.union(...g.deck.map(p=>poly(p))),occupied,...paths);
const data={VILLAGE_CAFE_DECK:emit(deck)};
fs.writeFileSync(new URL('../dist/village-cafe-parts.js',import.meta.url),'// Photo-led deck clipped off retained occupied buildings and source paths.\n// Regenerate with node scripts/make-village-cafe-parts.mjs.\n'+Object.entries(data).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v,null,2)+';').join('\n')+'\n');
console.log(`${deck.length} Village Café deck regions, ${g.stairs.count} reconstructed treads`);
