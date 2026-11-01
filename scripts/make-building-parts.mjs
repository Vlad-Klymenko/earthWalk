import fs from 'node:fs';
import { CAMPUS } from '../dist/campus-data.js';
import { REPORTED_HEIGHTS, HEIGHT_REPORT } from '../dist/building-heights.js';
const source=JSON.parse(fs.readFileSync(new URL('../dist/data/unsw.json',import.meta.url)));
const nodes=new Map(source.elements.filter(e=>e.type==='node').map(e=>[e.id,e]));
const ids=[926419114,926419115,926419116,926419117,926419118];
const parts=source.elements.filter(e=>ids.includes(e.id)).map(e=>({
 id:`osm-part-${e.id}`,parent:'library',osmId:e.id,levels:Number(e.tags['building:levels'])||null,
 height:e.tags['building:levels']==='14'?REPORTED_HEIGHTS.library.height:(Number(e.tags['building:levels'])||3)*4,
 heightSource:e.tags['building:levels']==='14'?'NSW planning report maximum height':'estimated from mapped levels',
 ...(e.tags['building:levels']==='14'?{heightReference:HEIGHT_REPORT}:{}),
 points:e.nodes.slice(0,-1).map(id=>nodes.get(id)).map(p=>({x:+((p.lon-CAMPUS.center.lon)*Math.PI/180*6371008.8*Math.cos(CAMPUS.center.lat*Math.PI/180)).toFixed(3),z:+((CAMPUS.center.lat-p.lat)*Math.PI/180*6371008.8).toFixed(3)}))
}));
fs.writeFileSync(new URL('../dist/building-parts.js',import.meta.url),'// Real OSM building-part outlines. Heights distinguish source measurements from level estimates.\nexport const BUILDING_PARTS = '+JSON.stringify(parts,null,2)+';\n');
console.log(`${parts.length} mapped library parts`);
