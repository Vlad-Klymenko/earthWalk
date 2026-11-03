import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {GLOBE as G,GLOBE_NODE,GLOBE_LIGHTS,GLOBE_VIEWS,globeGround} from '../dist/globe-data.js';
import {globeLatticeGeometry,globeCupGeometry} from '../dist/globe-geometry.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
const evidence=JSON.parse(fs.readFileSync(new URL('../sources/globe-evidence.json',import.meta.url)));
const dist=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
test('Globe preserves conflicting catalogue diameters and the public mapped point without mapper identities',()=>{
 assert.equal(G.diameter,3);assert.equal(G.alternateDiameter,2.5);assert.equal(evidence.artwork.diameterSources[2].diameterMetres,2.5);assert.match(G.note,/unresolved source discrepancy/);assert.deepEqual(Object.keys(evidence.position.node).sort(),['type','id','version','timestamp','lat','lon','tags'].sort());assert.equal(GLOBE_NODE.id,5332274045);assert.ok(Math.abs(G.x-258.6071431656764)<1e-8&&Math.abs(G.z-21.86095277418319)<1e-8);assert.ok(Math.abs(globeGround()-35.42583410138769)<1e-8);assert.equal(evidence.photographs.length,4);
});
test('open lattice has finite nondegenerate indexed geometry entirely within the 3m spherical envelope',()=>{
 const g=globeLatticeGeometry(),p=g.attributes.position,n=g.attributes.normal;assert.ok(p.count>50000&&p.count<80000);assert.equal(g.userData.openLattice,true);assert.equal(g.userData.curveCount,224);assert.ok(g.index.count<450000);for(const key of ['position','normal','color'])assert.ok(Array.from(g.attributes[key].array).every(Number.isFinite));let largestEdge=0;
 for(let i=0;i<p.count;i++){assert.ok(Math.hypot(p.getX(i),p.getY(i)-1.5,p.getZ(i))<=1.500001);assert.ok(Math.abs(Math.hypot(n.getX(i),n.getY(i),n.getZ(i))-1)<1e-5);}
 for(let i=0;i<g.index.count;i+=3){const ids=[0,1,2].map(j=>g.index.getX(i+j)),pts=ids.map(k=>[p.getX(k),p.getY(k),p.getZ(k)]),a=pts[1].map((v,k)=>v-pts[0][k]),b=pts[2].map((v,k)=>v-pts[0][k]);assert.ok(Math.hypot(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])>1e-12);largestEdge=Math.max(largestEdge,Math.hypot(...a),Math.hypot(...b));}assert.ok(largestEdge<.2,'only narrow rod surfaces, no large opaque sphere faces');assert.ok(g.boundingBox.max.y-g.boundingBox.min.y>2.98);g.dispose();
});
test('low cup and fitted ground lights stay within the lawn and leave every retained path corridor clear',()=>{
 const cup=globeCupGeometry();cup.computeBoundingBox();assert.equal(cup.userData.feet,4);assert.ok(cup.boundingBox.max.y<.32&&cup.boundingBox.min.y>0);assert.ok(cup.boundingBox.max.x<.9);for(const key of ['position','normal','uv'])assert.ok(Array.from(cup.attributes[key].array).every(Number.isFinite));cup.dispose();
 const lawn=RAW.greens.find(p=>p.id==='osm-way-1116164549');for(const p of [{...G,radius:G.diameter/2},...GLOBE_LIGHTS]){for(let i=0;i<24;i++)assert.ok(inside({x:p.x+Math.cos(i*Math.PI/12)*p.radius,z:p.z+Math.sin(i*Math.PI/12)*p.radius},lawn.points));for(const route of RAW.paths)for(let i=1;i<route.points.length;i++)assert.ok(dist(p,route.points[i-1],route.points[i])>(route.width||2.4)/2+p.radius+.4,route.id);for(const t of TREE_INVENTORY)assert.ok(Math.hypot(t.x-p.x,t.z-p.z)>p.radius+(t.dbhMm||200)/2000+.35);}
});
test('two clear arrivals and current lawn name keep original mapped paths and outlines intact',()=>{
 assert.equal(GLOBE_VIEWS.length,2);for(const v of GLOBE_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===v.id));assert.equal(v.showSign,false);assert.ok(Math.hypot(v.x-G.x,v.z-G.z)>G.diameter/2+.4);assert.ok(Number.isFinite(globeGround(v.x,v.z)));for(const b of RAW.buildings.filter(b=>!b.walkableUnder))assert.ok(!inside(v,b.points),b.id);for(const t of TREE_INVENTORY)assert.ok(Math.hypot(v.x-t.x,v.z-t.z)>(t.dbhMm||200)/2000+.4);}
 const raw=RAW.greens.find(p=>p.id==='osm-way-1116164549'),shown=CAMPUS.greens.find(p=>p.id===raw.id);assert.deepEqual(shown.points,raw.points);assert.equal(shown.mappedName,raw.name);assert.equal(shown.name,'Eleonora Kopalinsky Lawn');for(const p of RAW.paths){assert.ok(CAMPUS.paths.some(q=>q.id===p.id&&q.width===p.width&&JSON.stringify(q.points)===JSON.stringify(p.points)),p.id);}for(const b of RAW.buildings){const kept=CAMPUS.buildings.find(p=>p.id===b.id);assert.deepEqual(kept.points,b.points);assert.deepEqual(kept.tags,b.tags);}
});
