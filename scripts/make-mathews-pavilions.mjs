import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {MATHEWS_PAVILIONS_ID,mathewsPavilionsGeometry} from '../dist/mathews-pavilions-data.js';
const b=CAMPUS.buildings.find(b=>b.id===MATHEWS_PAVILIONS_ID),g=mathewsPavilionsGeometry(b),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),source=poly(b),rect=(...args)=>poly({points:g.rect(...args)});
// Snap generated joins only to stabilise Boolean operations; source accuracy is unchanged.
const clean=ring=>(Math.hypot(ring[0][0]-ring.at(-1)[0],ring[0][1]-ring.at(-1)[1])<1e-8?ring.slice(0,-1):ring).map(([x,z])=>({x:Math.round(x*1e7)/1e7,z:Math.round(z*1e7)/1e7}));
const regions=p=>p.map(r=>({points:clean(r[0]),holes:r.slice(1).map(clean)}));
const pieces=[{kind:'north',shape:clip.intersection(source,rect(-100,100,-100,-7.6))},{kind:'south',shape:clip.intersection(source,rect(-22.9,100,13.5,100))},{kind:'link',shape:clip.intersection(source,rect(-100,-22.9,-7.6,100))},{kind:'west',shape:clip.intersection(source,rect(-22.9,-10.4,-7.6,13.5))},{kind:'east',shape:clip.intersection(source,rect(-10.4,100,-7.6,13.5))}];
const parts=pieces.flatMap(p=>regions(p.shape).map(r=>({...r,kind:p.kind,reconstructed:true}))),strips=[];
for(const p of parts){const uAxis=['west','east'].includes(p.kind);for(let n=-32;n<33;n+=.65){const cut=uAxis?rect(n,n+.65,-100,100):rect(-100,100,n,n+.65);for(const r of regions(clip.intersection(poly(p),cut)))strips.push({...r,kind:p.kind,reconstructed:true});}}
const neighbours=CAMPUS.buildings.filter(p=>p.id!==b.id&&!p.walkableUnder),obstacles=neighbours.map(poly);
const rooms=g.rooms.flatMap(room=>regions(clip.difference(clip.intersection(source,poly(room)),...obstacles)).map(r=>({...r,kind:room.kind,reconstructed:true})));
const paving=regions(clip.difference(clip.union(source,...b.holes.map(points=>poly({points})),poly(g.apron)),poly(g.planter),...obstacles));
fs.writeFileSync(new URL('../dist/mathews-pavilions-parts.js',import.meta.url),'// Photo-fitted curved pavilion partitions; original roof / courtyard outline retained.\nexport const MATHEWS_PAVILION_ROOFS = '+JSON.stringify(parts,null,2)+';\nexport const MATHEWS_PAVILION_STRIPS = '+JSON.stringify(strips,null,2)+';\nexport const MATHEWS_PAVILION_ROOMS = '+JSON.stringify(rooms,null,2)+';\nexport const MATHEWS_PAVILION_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(`${parts.length} pavilion roof regions; ${strips.length} curved-roof strips; ${rooms.length} glazed room regions`);
