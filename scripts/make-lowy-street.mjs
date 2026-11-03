import fs from 'node:fs';
import clip from 'polygon-clipping';
import * as THREE from '../dist/vendor/three.module.js';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {TREE_INVENTORY} from '../dist/tree-inventory-data.js';
import {terrainHeight} from '../dist/terrain.js';
import {MEDICAL_PARTS} from '../dist/medical-parts.js';
import {LOWY_ID,lowyFacadeFaces} from '../dist/lowy-facade-data.js';
import {LOWY_STREET as S,LOWY_STREET_FACE as F,lowyStreetPoint,lowyStreetLocal,lowyStreetBottom,lowyStreetFeature} from '../dist/lowy-street-data.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const clean=r=>r.slice(0,-1).map(([x,z])=>({x,z}));
const parts=m=>m.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true}));
const rect=(u0,u1,v0,v1)=>[[[u0,v0],[u1,v0],[u1,v1],[u0,v1]].map(([u,v])=>{const p=lowyStreetPoint(u,v);return [p.x,p.z];})];
const n={x:(F.c.z-F.a.z)/F.length,z:-(F.c.x-F.a.x)/F.length},at=(t,d)=>[F.a.x+(F.c.x-F.a.x)*t+n.x*d,F.a.z+(F.c.z-F.a.z)*t+n.z*d];
const cut=[[at(-.03,4),at(1.03,4),at(1.03,-S.recess),at(-.03,-S.recess)]],main=MEDICAL_PARTS.find(p=>p.buildingId===LOWY_ID&&p.kind==='main'),parent=[poly(main)],portal=clip.intersection(parent,rect(-100,-33.8,3,100)),lower=clip.difference(parent,clip.union(cut,portal)),recess=parts(clip.union(clip.intersection(parent,cut),portal)),wedge=clip.intersection(lower,rect(-100,S.taperBaseU,-100,S.cutV)),flat=clip.difference(lower,wedge);
const lowerParts=[...parts(flat).map(p=>({...p,taper:false})),...parts(wedge).map(p=>({...p,taper:true}))],walls=[],colliders=[];
const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const onBoundary=(p,part)=>[part.points,...part.holes].some(r=>r.some((a,i)=>distance(p,a,r[(i+1)%r.length])<1e-7));
const external=lowyFacadeFaces().filter(f=>f.external&&!f.bridge);
for(const part of lowerParts){
 if(!part.taper)colliders.push({...part,bottom:0,top:S.beam});
 for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++){
  const a=ring[i],c=ring[(i+1)%ring.length],mid={x:(a.x+c.x)/2,z:(a.z+c.z)/2},shared=lowerParts.some(p=>p!==part&&onBoundary(mid,p));
  if(shared&&part.taper)continue;
  const bottom0=part.taper?lowyStreetBottom(a):0,bottom1=part.taper?lowyStreetBottom(c):0,top0=shared?lowyStreetBottom(a):S.beam,top1=shared?lowyStreetBottom(c):S.beam;
  if(Math.max(top0-bottom0,top1-bottom1)<1e-8)continue;
  const source=external.find(f=>distance(mid,f.a,f.c)<1e-7),local=lowyStreetLocal(mid),kind=(source&&source.nv>.65&&lowyStreetFeature(source)!=='west-core-return')||(Math.abs(local.u+33.8)<1e-6&&local.v>3)?'glass':'concrete';
  walls.push({a,c,bottom0,bottom1,top0,top1,kind,shared,reconstructed:true});
 }
}
for(let u=S.taperTopU;u<S.taperBaseU;u+=S.collisionSlice){const end=Math.min(S.taperBaseU,u+S.collisionSlice),regions=clip.intersection(wedge,rect(u,end,-100,100));for(const p of parts(regions))colliders.push({...p,bottom:lowyStreetBottom(lowyStreetPoint(end,0)),top:S.beam,taper:true});}
// Paved approach inferred from street-level photographs. Clip retained path
// ribbons, occupied lower ground, neighbouring buildings and source tree bases.
const pavingScope=clip.union(...recess.map(poly),wedge,rect(-43,-33,-23,-10.615766395),rect(-42,-33.8,3,16)),near=points=>{const q=points.map(lowyStreetLocal);return Math.max(...q.map(p=>p.u))>-48&&Math.min(...q.map(p=>p.u))<43&&Math.max(...q.map(p=>p.v))>-33&&Math.min(...q.map(p=>p.v))<20;},obstacles=[];
for(const b of RAW.buildings)if(b.id!==LOWY_ID&&near(b.points))obstacles.push(poly(b));
for(const path of RAW.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],len=Math.hypot(b.x-a.x,b.z-a.z);if(!len||!near([a,b]))continue;const w=(path.width||3)/2+.04,nx=-(b.z-a.z)/len*w,nz=(b.x-a.x)/len*w;obstacles.push(poly({points:[{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:b.x-nx,z:b.z-nz},{x:b.x+nx,z:b.z+nz}]}));}
for(const t of TREE_INVENTORY)if(near([t]))obstacles.push([Array.from({length:32},(_,i)=>[t.x+Math.cos(i*Math.PI/16)*.7,t.z+Math.sin(i*Math.PI/16)*.7])]);
const paving=parts(clip.difference(pavingScope,clip.union(...parts(flat).map(poly),...obstacles))),triangles=[];
function subdivide(a,b,c){if(Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))<1e-10)return;const vs=[a,b,c],lengths=vs.map((p,i)=>Math.hypot(p.x-vs[(i+1)%3].x,p.z-vs[(i+1)%3].z)),max=Math.max(...lengths);if(max>.65){const i=lengths.indexOf(max),j=(i+1)%3,k=(i+2)%3,mid={x:(vs[i].x+vs[j].x)/2,z:(vs[i].z+vs[j].z)/2};subdivide(vs[i],mid,vs[k]);subdivide(mid,vs[j],vs[k]);return;}triangles.push(vs.map(p=>({...p,y:terrainHeight(p.x,p.z)+.22})));}
for(const part of paving){const pts=[...part.points,...part.holes.flat()];for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(part.points.map(p=>new THREE.Vector2(p.x,p.z)),part.holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z)))))subdivide(pts[a],pts[c],pts[b]);}
const output='// Photo-fitted lower volumes inside the original mapped Lowy main footprint.\n'+[['LOWY_STREET_LOWER_PARTS',lowerParts],['LOWY_STREET_RECESS',recess],['LOWY_STREET_LOWER_WALLS',walls],['LOWY_STREET_COLLIDERS',colliders],['LOWY_STREET_PAVING',paving],['LOWY_STREET_PAVING_TRIANGLES',triangles]].map(([name,data])=>'export const '+name+' = '+JSON.stringify(data)+';\n').join('');
fs.writeFileSync(new URL('../dist/lowy-street-parts.js',import.meta.url),output);console.log({parts:lowerParts.length,recess:recess.length,walls:walls.length,colliders:colliders.length,paving:paving.length,triangles:triangles.length});
