import fs from 'node:fs';
import {CAMPUS} from '../dist/campus-data.js';
const r=JSON.parse(fs.readFileSync(new URL('../dist/data/unsw.json',import.meta.url)));
const nodes=new Map(r.elements.filter(e=>e.type==='node').map(n=>[n.id,n]));
const details=[];
for(const e of r.elements){
 const t=e.tags||{},type=t.amenity==='bench'?'bench':t.amenity==='waste_basket'?'bin':t.amenity==='bicycle_parking'?'bikes':t.amenity==='drinking_water'?'water':t.barrier==='bollard'?'bollard':null;
 if(!type)continue;
 const pts=e.type==='node'?[e]:(e.nodes||[]).map(id=>nodes.get(id)).filter(Boolean);if(!pts.length)continue;
 const lon=pts.reduce((s,p)=>s+p.lon,0)/pts.length,lat=pts.reduce((s,p)=>s+p.lat,0)/pts.length;
 const x=(lon-CAMPUS.center.lon)*Math.PI/180*6371008.8*Math.cos(CAMPUS.center.lat*Math.PI/180),z=(CAMPUS.center.lat-lat)*Math.PI/180*6371008.8;
 const b=CAMPUS.bounds;if(x<b.minX||x>b.maxX||z<b.minZ||z>b.maxZ)continue;
 details.push({osmId:e.id,type,x:+x.toFixed(3),z:+z.toFixed(3),capacity:Number(t.capacity)||null});
}
fs.writeFileSync(new URL('../dist/campus-details.js',import.meta.url),'// Real OSM positions; individual furniture designs are approximate. ODbL.\nexport const CAMPUS_DETAILS = '+JSON.stringify(details,null,2)+';\n');console.log(details.length+' mapped furniture features');
