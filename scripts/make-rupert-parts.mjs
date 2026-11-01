import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { RUPERT_ID, rupertGeometry } from '../dist/rupert-data.js';
import { frameRectangle } from '../dist/geometry.js';
const b=CAMPUS.buildings.find(b=>b.id===RUPERT_ID),g=rupertGeometry(b),output=[];
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const rect=(u0,u1,v0,v1)=>[frameRectangle(g.frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2).map(p=>[p.x,p.z])];
let remaining=[polygon(b)];
const cuts=[['west-bridge',rect(-100,0,g.corridor.minV,g.corridor.maxV)],['east-bridge',rect(0,100,g.corridor.minV,g.corridor.maxV)],['north-portico',rect(-100,8,-16,g.corridor.minV)],['north',rect(-100,8,-100,-16)]];
const emit=(kind,regions)=>{for(const rings of regions){const ring=r=>r.slice(0,-1).map(([x,z])=>({x,z}));output.push({kind,points:ring(rings[0]),holes:rings.slice(1).map(ring),reconstructed:true});}};
for(const [kind,cut]of cuts){const region=clipping.intersection(remaining,cut);emit(kind,region);remaining=clipping.difference(remaining,region);}
emit('main',remaining);
const lawn=clipping.intersection(polygon({points:g.lawn}),[b.holes[0].map(p=>[p.x,p.z])]);
fs.writeFileSync(new URL('../dist/rupert-parts.js',import.meta.url),'// Reconstructed internal regions partition the original mapped outline exactly.\nexport const RUPERT_PARTS = '+JSON.stringify(output,null,2)+';\nexport const RUPERT_LAWN = '+JSON.stringify(lawn.map(r=>r[0].slice(0,-1).map(([x,z])=>({x,z}))),null,2)+';\n');
console.log(`${output.length} Rupert Myers regions, ${lawn.length} courtyard lawn`);
