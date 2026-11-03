import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {TREE_INVENTORY,TREE_INVENTORY_SOURCE} from '../dist/tree-inventory-data.js';
import {inventoryTree,inventoryTreeGeometry,treeBand,treeForm,treeClearsRoutes} from '../dist/tree-geometry.js';
import {CAMPUS} from '../dist/campus-data.js';
test('public tree snapshot retains every source coordinate, size band and species with a dated provenance',()=>{
 const raw=JSON.parse(fs.readFileSync(new URL('../sources/unsw-tree-inventory-evidence.json',import.meta.url))),r=6371008.8*Math.PI/180,sx=r*Math.cos(CAMPUS.center.lat*Math.PI/180);
 assert.equal(TREE_INVENTORY.length,1146);assert.equal(new Set(TREE_INVENTORY.map(p=>p.id)).size,1146);assert.equal(raw.response.exceededTransferLimit,undefined);assert.equal(TREE_INVENTORY_SOURCE.lastDataEditEpochMs,1689824239221);assert.match(TREE_INVENTORY_SOURCE.note,/not a current census/);
 for(let i=0;i<TREE_INVENTORY.length;i++){const p=TREE_INVENTORY[i],s=raw.response.features[i],a=s.attributes;assert.deepEqual(Object.keys(a).sort(),['FID','Tree_No__w','Botanical_','Common_Nam','Canopy__m_','DBH__mm_','Height__m_'].sort());assert.equal(p.x,(s.geometry.x-CAMPUS.center.lon)*sx);assert.equal(p.z,(CAMPUS.center.lat-s.geometry.y)*r);assert.equal(p.heightBand,a.Height__m_);assert.equal(p.canopyBand,a.Canopy__m_);assert.equal(p.botanicalName,a.Botanical_);assert.equal(p.dbhMm,a.DBH__mm_);}
});
test('reported bands stay separate from representative dimensions and missing trunk data is labelled estimated',()=>{
 assert.deepEqual(treeBand('15-20'),{min:15,max:20,value:17.5,open:false});assert.equal(treeBand('>30').max,null);assert.equal(treeBand('<5').open,true);assert.throws(()=>treeBand('unknown'));
 for(const record of TREE_INVENTORY){const t=inventoryTree(record);assert.equal(t.dimensionsReconstructed,true);assert.ok(t.height>t.heightRange.min);assert.ok(t.heightRange.max===null||t.height<t.heightRange.max);assert.ok(t.canopy>t.canopyRange.min);assert.ok(t.canopyRange.max===null||t.canopy<t.canopyRange.max);assert.equal(t.dbhEstimated,!(record.dbhMm>0));if(record.dbhMm>0)assert.equal(t.radius,record.dbhMm/2000);else assert.ok(t.radius>0);}
});
test('all reconstructed trees, including rotated leaf cards, fit their representative height and canopy envelope',()=>{
 for(const record of TREE_INVENTORY){const t=inventoryTree(record),g=inventoryTreeGeometry(t),check=(p,margin=0,verticalMargin=margin)=>{assert.ok(Number.isFinite(p.x+p.y+p.z));assert.ok(p.y-verticalMargin>=-1e-8&&p.y+verticalMargin<=t.height+1e-8);assert.ok(Math.hypot(p.x,p.z)+margin<=t.canopy/2+1e-8);};
 for(const s of g.segments){check(s.a);check(s.b);assert.ok(s.radius>0);}
 for(const p of g.leaves)check(p,p.size*Math.SQRT2/2);
 for(const f of g.fronds){check(f.base);check(f.mid,f.width,0);check(f.tip);}
 assert.deepEqual(g,inventoryTreeGeometry(t));
 }
});
test('species groups create different architecture, with branched broad crowns and fronds on palms',()=>{
 const representatives={fig:'Ficus rubiginosa',gum:'Eucalyptus microcorys',poplar:'Populus deltoides',conifer:'Araucaria cunninghamii',palm:'Livistona australis',broadleaf:'Jacaranda mimosifolia'};
 for(const [form,name] of Object.entries(representatives)){assert.equal(treeForm(name),form);const source=TREE_INVENTORY.find(t=>t.botanicalName===name);assert.ok(source);const t=inventoryTree(source),g=inventoryTreeGeometry(t);if(form==='palm'){assert.equal(g.fronds.length,14);assert.equal(g.leaves.length,0);assert.equal(g.segments.length,1);}else{assert.ok(g.segments.length>=11);assert.ok(g.leaves.length>=112);}}
});

test('tree placement preserves full widths at route junctions and retains its original point',()=>{
 const paths=CAMPUS.paths.flatMap(p=>p.points.slice(1).map((b,i)=>({a:p.points[i],b,width:p.width})));
 let accepted=0;for(const source of TREE_INVENTORY){const t=inventoryTree(source),before={x:t.x,z:t.z},ok=treeClearsRoutes(t,paths);assert.deepEqual({x:t.x,z:t.z},before);if(ok)accepted++;}
 assert.ok(accepted>850&&accepted<TREE_INVENTORY.length);
 const t={x:0,z:0,radius:.3},junction=[{a:{x:1,z:-10},b:{x:1,z:10},width:1},{a:{x:-10,z:3},b:{x:10,z:3},width:8}];assert.equal(treeClearsRoutes(t,junction),false,'a nearer narrow route must not hide overlap with a wider one');
});
