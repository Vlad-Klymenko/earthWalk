import fs from 'node:fs';
import {CAMPUS} from '../dist/campus-data.js';
const source=JSON.parse(fs.readFileSync(new URL('../sources/unsw-tree-inventory-evidence.json',import.meta.url))),r=6371008.8*Math.PI/180,sx=r*Math.cos(CAMPUS.center.lat*Math.PI/180);
const records=source.response.features.map(f=>{const a=f.attributes;return {id:'unsw-tree-'+a.Tree_No__w,fid:a.FID,treeNumber:a.Tree_No__w,x:(f.geometry.x-CAMPUS.center.lon)*sx,z:(CAMPUS.center.lat-f.geometry.y)*r,botanicalName:a.Botanical_,commonName:a.Common_Nam,heightBand:a.Height__m_,canopyBand:a.Canopy__m_,dbhMm:a.DBH__mm_};});
fs.writeFileSync(new URL('../dist/tree-inventory-data.js',import.meta.url),'// Public UNSW tree-map inventory, last data edit July 2023; not a current census.\nexport const TREE_INVENTORY_SOURCE = '+JSON.stringify({url:source.url,publicApp:source.publicApp,retrieved:source.retrieved,lastDataEditEpochMs:source.lastDataEditEpochMs,note:source.note})+';\nexport const TREE_INVENTORY = '+JSON.stringify(records)+';\n');
console.log(records.length+' public tree records');
