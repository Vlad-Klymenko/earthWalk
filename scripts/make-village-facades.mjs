import fs from 'node:fs';
import clip from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { RESIDENTIAL_PARTS } from '../dist/residential-parts.js';
import { VILLAGE_ID,VILLAGE_AXIS as u,VILLAGE_CROSS as v,VILLAGE_SECURITY_EDGE,VILLAGE_SECURITY_PAVING } from '../dist/village-data.js';
import { VILLAGE_CAFE_DECK } from '../dist/village-cafe-parts.js';
import { buildingBase } from '../dist/terrain.js';
const area=r=>r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p.x*q.z-q.x*p.z;},0)/2;
const inRing=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const inside=(p,s)=>inRing(p,s.points)&&!s.holes.some(r=>inRing(p,r));
const parts=RESIDENTIAL_PARTS.filter(p=>p.parent===VILLAGE_ID).map(p=>({...p,base:buildingBase(p.points)}));
const vertices=parts.flatMap(p=>[p.points,...p.holes].flat()),faces=[];
const nearSegment=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz);return t>=-1e-6&&t<=1+1e-6&&Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)<.002;};
for(const part of parts){
 const rings=[area(part.points)>0?part.points:[...part.points].reverse(),...part.holes.map(r=>area(r)<0?r:[...r].reverse())];
 for(const ring of rings)for(let i=0;i<ring.length;i++){
  const a=ring[i],b=ring[(i+1)%ring.length],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(len<1e-6)continue;const normal={x:dz/len,z:-dx/len},cuts=[0,1];
  for(const p of vertices){const t=((p.x-a.x)*dx+(p.z-a.z)*dz)/(len*len);if(t>1e-7&&t<1-1e-7&&Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)<1e-6)cuts.push(t);}
  const ts=[...new Set(cuts.map(t=>Math.round(t*1e9)/1e9))].sort((a,b)=>a-b);
  for(let k=1;k<ts.length;k++){
   const lo=ts[k-1],hi=ts[k];if((hi-lo)*len<1e-5)continue;const p={x:a.x+dx*lo,z:a.z+dz*lo},q={x:a.x+dx*hi,z:a.z+dz*hi},mid={x:(p.x+q.x)/2+normal.x*.005,z:(p.z+q.z)/2+normal.z*.005};
   let spans=[[part.base+part.minHeight,part.base+part.height]];
   for(const other of parts)if(other.id!==part.id&&inside(mid,other)){const bottom=other.base+other.minHeight,top=other.base+other.height;spans=spans.flatMap(([a,b])=>top<=a||bottom>=b?[[a,b]]:[[a,Math.min(b,bottom)],[Math.max(a,top),b]].filter(([a,b])=>b-a>1e-6));}
   const across=Math.abs(normal.x*v.x+normal.z*v.z)>.8,security=nearSegment(p,...VILLAGE_SECURITY_EDGE)&&nearSegment(q,...VILLAGE_SECURITY_EDGE),securityNorth=(p.x+q.x)/2>-10&&(p.x+q.x)/2<10&&(p.z+q.z)/2>-222&&(p.z+q.z)/2<-215&&(normal.x*v.x+normal.z*v.z)<-.8;
   const kind=part.floors===8?(part.minHeight>5&&!across?'core':across?'end':'band'):(across&&!securityNorth?'screen':'band-low');
   for(const [bottom,top]of spans)faces.push({part:part.id,a:p,b:q,normal,base:part.base,bottom:bottom-part.base,top:top-part.base,height:part.height,floors:part.floors,kind,security,reconstructed:true});
  }
 }
}
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const blockers=[...CAMPUS.buildings.filter(b=>!b.walkableUnder).map(poly),...VILLAGE_CAFE_DECK.map(poly)];
for(const path of CAMPUS.paths)for(let i=1;i<path.points.length;i++){const a=path.points[i-1],b=path.points[i],len=Math.hypot(b.x-a.x,b.z-a.z);if(!len)continue;if(Math.min(Math.hypot(a.x+9,a.z+216),Math.hypot(b.x+9,b.z+216))>40)continue;const nx=-(b.z-a.z)/len*((path.width||3)+.16)/2,nz=(b.x-a.x)/len*((path.width||3)+.16)/2;blockers.push([[{x:a.x+nx,z:a.z+nz},{x:a.x-nx,z:a.z-nz},{x:b.x-nx,z:b.z-nz},{x:b.x+nx,z:b.z+nz}].map(p=>[p.x,p.z])]);}
const clean=r=>(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-9?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const paving=clip.difference([VILLAGE_SECURITY_PAVING.map(p=>[p.x,p.z])],...blockers).map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true}));
fs.writeFileSync(new URL('../dist/village-facades.js',import.meta.url),'// Exposed surfaces of the retained reconstructed residential masses.\n// Neighbouring occupied vertical intervals are removed; source outlines stay intact.\n// Regenerate with node scripts/make-village-facades.mjs.\nexport const VILLAGE_FACADES = '+JSON.stringify(faces,null,2)+';\nexport const VILLAGE_ENTRY_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(`${faces.length} exposed Village facade segments; ${faces.filter(p=>p.security).length} security glazing segments; ${paving.length} entrance paving regions`);
