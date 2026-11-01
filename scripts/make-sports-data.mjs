import fs from 'node:fs';
import {CAMPUS} from '../dist/campus-data.js';
const source=JSON.parse(fs.readFileSync(new URL('../dist/data/unsw.json',import.meta.url)));
const nodes=new Map(source.elements.filter(e=>e.type==='node').map(n=>[n.id,n]));
const ids=[1153449509,1153449510,1178531041,1178531042,1178531043,1178531044,1178531045,1178531046];
const data=source.elements.filter(e=>e.type==='way'&&ids.includes(e.id)).map(e=>({
 id:`osm-way-${e.id}`,osmId:e.id,kind:e.tags.leisure,sport:e.tags.sport,closed:e.nodes[0]===e.nodes.at(-1),
 points:(e.nodes[0]===e.nodes.at(-1)?e.nodes.slice(0,-1):e.nodes).map(id=>nodes.get(id)).map(p=>({
  x:+((p.lon-CAMPUS.center.lon)*Math.PI/180*6371008.8*Math.cos(CAMPUS.center.lat*Math.PI/180)).toFixed(3),
  z:+((CAMPUS.center.lat-p.lat)*Math.PI/180*6371008.8).toFixed(3)
 }))
}));
fs.writeFileSync(new URL('../dist/sports-data.js',import.meta.url),'// Retained OpenStreetMap sports geometry, ODbL. Equipment / markings are reconstructions.\nexport const VILLAGE_SPORTS = '+JSON.stringify(data,null,2)+';\n');
console.log(`${data.length} mapped sports areas and running track`);
