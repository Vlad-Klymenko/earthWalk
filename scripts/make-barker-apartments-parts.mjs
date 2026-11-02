import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { BARKER_APARTMENTS_ID, BARKER_PASSAGE_PATH } from '../dist/barker-apartments-data.js';
const b=CAMPUS.buildings.find(b=>b.id===BARKER_APARTMENTS_ID),source=[b.points.map(p=>[p.x,p.z])];
const corridors=BARKER_PASSAGE_PATH.slice(1).map((c,i)=>{const a=BARKER_PASSAGE_PATH[i],dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz),nx=dz/len*1.65,nz=-dx/len*1.65;return [[[a.x-nx-dx/len*.05,a.z-nz-dz/len*.05],[c.x-nx+dx/len*.05,c.z-nz+dz/len*.05],[c.x+nx+dx/len*.05,c.z+nz+dz/len*.05],[a.x+nx-dx/len*.05,a.z+nz-dz/len*.05]]];});
const corridor=clipping.union(...corridors),bridge=clipping.intersection(source,corridor),main=clipping.difference(source,bridge),parts=[];
for(const [kind,regions] of [['main',main],['passage',bridge]])for(const rings of regions){const ring=r=>r.slice(0,-1).map(([x,z])=>({x,z}));parts.push({kind,points:ring(rings[0]),holes:rings.slice(1).map(ring),reconstructed:true});}
fs.writeFileSync(new URL('../dist/barker-apartments-parts.js',import.meta.url),'// Reconstructed Gate 15 passage split; union retains the mapped N13 footprint.\nexport const BARKER_APARTMENTS_PARTS = '+JSON.stringify(parts,null,2)+';\n');
console.log(`${parts.length} N13 regions, ${bridge.length} covered passage sections`);
