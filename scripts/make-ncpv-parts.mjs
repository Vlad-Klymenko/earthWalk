import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {NCPV_ID,NCPV_RED_ID,NCPV_CORNER_ID,ncpvGeometry} from '../dist/ncpv-data.js';
const g=ncpvGeometry(),poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),clean=r=>(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-9?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const regions=x=>x.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean)}));
const parts=[NCPV_ID,NCPV_RED_ID,NCPV_CORNER_ID].flatMap(id=>{const b=CAMPUS.buildings.find(b=>b.id===id);return regions([poly(b)]).map(p=>({...p,id:`ncpv-${id}`,sourceId:id,kind:id===NCPV_RED_ID?'red':id===NCPV_CORNER_ID?'blue':'white',height:id===NCPV_RED_ID?g.redHeight:g.bodyHeight,minHeight:id===NCPV_RED_ID?3.1:0,reconstructed:true}));});
for(const p of regions(clip.intersection(poly(CAMPUS.buildings.find(b=>b.id===NCPV_RED_ID)),[g.redRoom.map(p=>[p.x,p.z])])))parts.push({...p,id:'ncpv-ground-red',sourceId:NCPV_RED_ID,kind:'ground',height:3.1,minHeight:0,reconstructed:true});
const union=clip.union(...parts.map(poly)),courts=union.flatMap(p=>p.slice(1).map(r=>({points:clean(r),holes:[],reconstructed:true}))),paving=courts.flatMap(p=>regions(clip.difference(poly(p),[g.courtLawn.map(p=>[p.x,p.z])])));
const area=r=>r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p.x*q.z-q.x*p.z;},0)/2;
const insideRing=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const inside=(p,s)=>insideRing(p,s.points)&&!s.holes.some(r=>insideRing(p,r)),vertices=parts.flatMap(p=>[p.points,...p.holes].flat()),faces=[];
for(const part of parts)for(const ring of [area(part.points)>0?part.points:[...part.points].reverse(),...part.holes.map(r=>area(r)<0?r:[...r].reverse())])for(let i=0;i<ring.length;i++){
 const a=ring[i],b=ring[(i+1)%ring.length],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(len<1e-6)continue;const normal={x:dz/len,z:-dx/len},cuts=[0,1];
 for(const p of vertices){const t=((p.x-a.x)*dx+(p.z-a.z)*dz)/(len*len);if(t>1e-7&&t<1-1e-7&&Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)<1e-6)cuts.push(t);}
 const ts=[...new Set(cuts.map(t=>Math.round(t*1e9)/1e9))].sort((a,b)=>a-b);
 for(let j=1;j<ts.length;j++){const lo=ts[j-1],hi=ts[j];if((hi-lo)*len<1e-5)continue;const p={x:a.x+dx*lo,z:a.z+dz*lo},q={x:a.x+dx*hi,z:a.z+dz*hi},mid={x:(p.x+q.x)/2+normal.x*.005,z:(p.z+q.z)/2+normal.z*.005};let spans=[[part.minHeight,part.height]];
 for(const other of parts)if(other.id!==part.id&&inside(mid,other))spans=spans.flatMap(([a,b])=>other.height<=a||other.minHeight>=b?[[a,b]]:[[a,Math.min(b,other.minHeight)],[Math.max(a,other.height),b]].filter(([a,b])=>b-a>1e-6));
 for(const [bottom,top]of spans)faces.push({part:part.id,kind:part.kind,height:part.height,a:p,b:q,normal,bottom,top,reconstructed:true});}
}
fs.writeFileSync(new URL('../dist/ncpv-parts.js',import.meta.url),'// Reconstructed H3 components using all three retained source outlines.\nexport const NCPV_PARTS = '+JSON.stringify(parts,null,2)+';\nexport const NCPV_FACES = '+JSON.stringify(faces,null,2)+';\nexport const NCPV_COURTS = '+JSON.stringify(courts,null,2)+';\nexport const NCPV_PAVING = '+JSON.stringify(paving,null,2)+';\n');console.log(`${parts.length} H3 components; ${faces.length} exposed facades; ${courts.length} retained courtyard openings`);
