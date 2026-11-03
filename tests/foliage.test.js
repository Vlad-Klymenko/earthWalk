import test from 'node:test';
import assert from 'node:assert/strict';
import {foliageKind,foliageSprites,columnarPoplar} from '../dist/foliage-data.js';
import {inventoryTree,inventoryTreeGeometry} from '../dist/tree-geometry.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';

test('foliage silhouettes distinguish narrow eucalypts, figs, poplars and needle sprays without treating every conifer as needles',()=>{
 for(const [name,kind] of [['Eucalyptus microcorys','lanceolate'],['Corymbia maculata','lanceolate'],['Angophora costata','lanceolate'],['Ficus rubiginosa','fig'],["Populus nigra 'Italica'",'poplar'],['Pinus radiata','needle'],['Casuarina glauca','needle'],['Podocarpus elatus','lanceolate'],['Melaleuca styphelioides','broad'],['Jacaranda mimosifolia','broad']])assert.equal(foliageKind(name),kind);
 assert.equal(columnarPoplar("Populus nigra 'Italica'"),true);assert.equal(columnarPoplar('Populus nigra'),false);assert.equal(columnarPoplar('Populus deltoides'),false);
 const ratio=kind=>foliageSprites(kind).reduce((n,p)=>n+p.ry/p.rx,0)/foliageSprites(kind).length;
 assert.ok(ratio('needle')>ratio('lanceolate'));assert.ok(ratio('lanceolate')>ratio('fig')*2);
});

test('procedural foliage has substantial coverage and transparent margins, rather than sparse particles or opaque cards',()=>{
 for(const kind of ['broad','fig','poplar','lanceolate','needle']){
  const sprites=foliageSprites(kind);assert.deepEqual(sprites,foliageSprites(kind));let covered=0,total=0;
  for(const p of sprites){assert.ok(p.x-p.ry>0&&p.x+p.ry<256&&p.y-p.ry>0&&p.y+p.ry<256);assert.ok(Object.values(p).every(Number.isFinite));}
  for(let y=1;y<256;y+=3)for(let x=1;x<256;x+=3){total++;if(sprites.some(p=>{const dx=x-p.x,dy=y-p.y,c=Math.cos(p.angle),s=Math.sin(p.angle);return ((dx*c+dy*s)/p.rx)**2+((-dx*s+dy*c)/p.ry)**2<=1;}))covered++;}
  assert.ok(covered/total>.18&&covered/total<.62,`${kind}: ${covered/total}`);
 }
});

test('Lombardy poplars alone have an upright continuous leader and all new forks attach to existing wood',()=>{
 const distance=(p,a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy+(p.z-a.z)*dz)/(dx*dx+dy*dy+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.y-a.y-dy*t,p.z-a.z-dz*t);};
 let columnar=0,broad=0;
 for(const source of TREE_INVENTORY){const tree=inventoryTree(source),g=inventoryTreeGeometry(tree);if(tree.columnar){columnar++;assert.ok(g.segments[0].b.y>tree.height*.9);assert.ok(g.segments.slice(1).every(s=>s.b.y>s.a.y));}else if(tree.form==='poplar'){broad++;assert.ok(g.segments[0].b.y<tree.height*.5);}
  for(let i=1;i<g.segments.length;i++)assert.ok(g.segments.slice(0,i).some(s=>distance(g.segments[i].a,s.a,s.b)<1e-8),source.id+' detached fork');
 }
 assert.ok(columnar>10&&broad>0);
});
