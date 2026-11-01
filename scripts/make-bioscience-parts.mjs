import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { bioscienceGeometry } from '../dist/bioscience-data.js';
import { frameRectangle } from '../dist/geometry.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const output=[];
for(const id of ['biological-north','biological-south']){
  const b=CAMPUS.buildings.find(b=>b.id===id),g=bioscienceGeometry(b);
  const rect=(minU,maxU,minV,maxV)=>[frameRectangle(g.frame,maxU-minU,maxV-minV,(minU+maxU)/2,(minV+maxV)/2).map(p=>[p.x,p.z])];
  let remaining=[polygon(b)];
  const cuts=g.north?[
    ['main',rect(-100,100,-100,-9.5)],
    ['biolink',rect(-100,-21,-9.5,100)],
  ]:[['glass-box',rect(22,100,-100,5)]];
  const emit=(kind,geometry)=>{for(const rings of geometry){const ring=r=>r.slice(0,-1).map(([x,z])=>({x,z}));output.push({buildingId:id,kind,roofRL:g.regionRoofRL(kind),points:ring(rings[0]),holes:rings.slice(1).map(ring),reconstructed:true});}};
  for(const [kind,cut]of cuts){const region=clipping.intersection(remaining,cut);emit(kind,region);remaining=clipping.difference(remaining,region);}
  emit(g.north?'atrium':'main',remaining);
}
fs.writeFileSync(new URL('../dist/bioscience-parts.js',import.meta.url),'// Reconstructed internal regions; mapped outlines and holes retained exactly.\nexport const BIOSCIENCE_PARTS = '+JSON.stringify(output,null,2)+';\n');
console.log(`${output.length} biosciences regions`);
