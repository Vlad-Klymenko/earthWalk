import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { medicalGeometry } from '../dist/medical-data.js';
import { frameRectangle } from '../dist/geometry.js';
const polygon=b=>[b.points,...b.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const output=[],ground=[];
for(const id of ['wallace-wurth','osm-way-45230537']){
  const b=CAMPUS.buildings.find(b=>b.id===id),g=medicalGeometry(b);
  const rect=(u0,u1,v0,v1)=>[frameRectangle(g.frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2).map(p=>[p.x,p.z])];
  let remaining=[polygon(b)];
  const cuts=g.wallace?[['west',rect(-100,-4,-100,100)],['east',rect(7,100,-100,100)]]:[['bridge',rect(25.2,100,6,100)]];
  const emit=(kind,regions)=>{for(const rings of regions){const ring=r=>r.slice(0,-1).map(([x,z])=>({x,z}));output.push({buildingId:id,kind,points:ring(rings[0]),holes:rings.slice(1).map(ring),reconstructed:true});}};
  for(const [kind,cut]of cuts){const region=clipping.intersection(remaining,cut);emit(kind,region);remaining=clipping.difference(remaining,region);}
  emit(g.wallace?'atrium':'main',remaining);
  if(g.wallace)for(const rings of clipping.intersection(polygon(b),rect(8.5,18.5,-34,30))){const ring=r=>r.slice(0,-1).map(([x,z])=>({x,z}));ground.push({points:ring(rings[0]),holes:rings.slice(1).map(ring),reconstructed:true});}
}
fs.writeFileSync(new URL('../dist/medical-parts.js',import.meta.url),'// Reconstructed regions exactly partitioning the retained mapped outlines.\nexport const MEDICAL_PARTS = '+JSON.stringify(output,null,2)+';\nexport const MEDICAL_GROUND_FLOORS = '+JSON.stringify(ground,null,2)+';\n');
console.log(`${output.length} medical precinct regions`);
