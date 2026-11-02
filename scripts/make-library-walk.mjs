import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {LIBRARY_WALK_ID,libraryWalkGeometry} from '../dist/library-walk-data.js';
const b=CAMPUS.buildings.find(b=>b.id===LIBRARY_WALK_ID),g=libraryWalkGeometry(b),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),rect=(...args)=>poly({points:g.rect(...args)}),source=poly(b),canopy=poly(g.library.canopy);
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
// Generated coordinates are snapped only for stable Boolean joins, not survey accuracy.
const clean=r=>{const q=(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-8?r.slice(0,-1):r).map(([x,z])=>({x:Math.round(x*1e7)/1e7,z:Math.round(z*1e7)/1e7})).filter((p,i,a)=>!i||Math.hypot(p.x-a[i-1].x,p.z-a[i-1].z)>1e-8);if(q.length>3&&Math.hypot(q[0].x-q.at(-1).x,q[0].z-q.at(-1).z)<1e-8)q.pop();let changed=true;while(changed&&q.length>3){changed=false;for(let i=0;i<q.length;i++){const a=q[(i+q.length-1)%q.length],b=q[i],c=q[(i+1)%q.length],len=Math.hypot(c.x-a.x,c.z-a.z);if(len<1e-8||Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))/len<2e-7){q.splice(i,1);changed=true;break;}}}return q;};
const regions=p=>p.filter(r=>ringArea(r[0])>1e-8).map(r=>({points:clean(r[0]),holes:r.slice(1).filter(r=>ringArea(r)>1e-8).map(clean)}));
let remainder=clip.difference(source,canopy),roofs=[];
const add=(shape,kind,axis,junction=false)=>{const part=clip.intersection(remainder,shape);remainder=clip.difference(remainder,shape);for(const p of regions(part))roofs.push({...p,kind,axis,junction,reconstructed:true});};
for(const j of g.junctions)add(poly(j),'glazed-junction','u',true);
for(const id of ['north-hook','west-spur','morven-lawn','cafe-link','library-east','south-hook','west-upper','main-east-west']){const branch=g.branches.find(b=>b.id===id);add(rect(branch.u0,branch.u1,branch.v0,branch.v1),branch.id,branch.axis);}
for(const p of regions(remainder))roofs.push({...p,kind:'edge-return',axis:'u',junction:false,reconstructed:true});
const glassSources=[...g.junctions.map(poly),...g.branches.map(b=>b.axis==='u'?rect(b.u0,b.u1,b.cross-.34,b.cross+.34):rect(b.cross-.34,b.cross+.34,b.v0,b.v1))],glass=clip.union(...glassSources),cells=[];
for(const roof of roofs){const bounds=roof.points.map(g.local),minU=Math.min(...bounds.map(p=>p.u)),maxU=Math.max(...bounds.map(p=>p.u)),minV=Math.min(...bounds.map(p=>p.v)),maxV=Math.max(...bounds.map(p=>p.v));
 for(const glazed of [false,true]){const shape=glazed?clip.intersection(poly(roof),glass):clip.difference(poly(roof),glass);if(!shape.length)continue;const du=roof.junction?1:roof.axis==='u'?3:.6,dv=roof.junction?1:roof.axis==='u'?.6:3;
  for(let u=Math.floor(minU/du)*du;u<maxU;u+=du)for(let v=Math.floor(minV/dv)*dv;v<maxV;v+=dv){for(const p of regions(clip.intersection(shape,rect(u,u+du,v,v+dv))))cells.push({...p,axis:roof.axis,glazed,junction:roof.junction,reconstructed:true});}
 }
}
const stepMasks=CAMPUS.paths.filter(p=>p.kind==='steps').flatMap(path=>path.points.slice(1).map((c,i)=>{const a=path.points[i],dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz),nx=dz/l*(path.width/2+.08),nz=-dx/l*(path.width/2+.08);return [[[a.x+nx,a.z+nz],[c.x+nx,c.z+nz],[c.x-nx,c.z-nz],[a.x-nx,a.z-nz]]];}));
const neighbours=CAMPUS.buildings.filter(p=>!p.walkableUnder),aprons=g.benches.map(p=>poly({points:g.rect(p.u-1.6,p.u+1.0,p.v-1.8,p.v+1.8)})),paving=regions(clip.difference(clip.union(source,...aprons),...neighbours.map(poly),...stepMasks));
fs.writeFileSync(new URL('../dist/library-walk-parts.js',import.meta.url),'// Photo-fitted upper-campus covered roofs; concrete Library canopy is rendered once with the Library.\nexport const LIBRARY_WALK_ROOFS = '+JSON.stringify(roofs,null,2)+';\nexport const LIBRARY_WALK_CELLS = '+JSON.stringify(cells)+';\nexport const LIBRARY_WALK_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(`${roofs.length} roof regions; ${cells.length} curved / glazed cells; ${paving.length} paving regions`);
