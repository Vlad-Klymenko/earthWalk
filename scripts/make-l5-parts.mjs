import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {frameRectangle} from '../dist/geometry.js';
import {L5_ID,l5Geometry} from '../dist/l5-data.js';
const b=CAMPUS.buildings.find(b=>b.id===L5_ID),g=l5Geometry(b),f=g.frame;
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const shape=points=>poly({points});
// Boolean cuts along a shared oblique source edge can retain numerical
// zero-area spikes. Remove only sub-micrometre collinearity / duplicate points.
const clean=ring=>{
 const r=(Math.hypot(ring[0][0]-ring.at(-1)[0],ring[0][1]-ring.at(-1)[1])<1e-9?ring.slice(0,-1):ring).map(([x,z])=>({x,z}));
 let changed=true;while(changed&&r.length>3){changed=false;for(let i=0;i<r.length;i++){const a=r[(i+r.length-1)%r.length],b=r[i],c=r[(i+1)%r.length],length=Math.hypot(c.x-a.x,c.z-a.z);if(length<1e-7||Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))/length<1e-7){r.splice(i,1);changed=true;break;}}}
 return r;
};
const regions=geometry=>geometry.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean)}));
const source=poly(b),rect=(width,length,u=0,v=0)=>shape(frameRectangle(f,width,length,u,v)),parts=[];
const east=clip.intersection(source,rect(100,200,57.4)),west=clip.intersection(source,rect(100,200,-58.5)),ends=clip.difference(source,east,west,poly(g.court));
const passage=rect(40,g.stair.width,27.4,-8.8);
const paths=[];
for(const path of CAMPUS.paths)for(let i=1;i<path.points.length;i++){
 const a=path.points[i-1],c=path.points[i],len=Math.hypot(c.x-a.x,c.z-a.z);if(!len||Math.min(Math.hypot(a.x-f.x,a.z-f.z),Math.hypot(c.x-f.x,c.z-f.z))>80)continue;
 const width=(path.width||2.1)+.7,nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2,ex=(c.x-a.x)/len*.5,ez=(c.z-a.z)/len*.5;
 paths.push(shape([{x:a.x+nx-ex,z:a.z+nz-ez},{x:a.x-nx-ex,z:a.z-nz-ez},{x:c.x-nx+ex,z:c.z-nz+ez},{x:c.x+nx+ex,z:c.z+nz+ez}]));
}
const add=(geometry,kind,height,minHeight,rows)=>{for(const p of regions(geometry))parts.push({...p,id:`l5-${kind}-${parts.length}`,parent:L5_ID,kind,height,minHeight,rows,reconstructed:true});};
add(clip.difference(source,passage,...paths),'podium',g.deck,0,1);
add(clip.difference(east,passage),'east-base',8.8,g.deck,1);
add(east,'east-tower',g.roof,8.8,5);
add(west,'west-wing',g.westRoof,g.deck,3);
add(ends,'end-link',7.6,g.deck,1);
const deck=regions(clip.intersection(source,poly(g.court)));
// Exposed boundaries at each part's occupied vertical interval. Avoid walls
// through adjoining reconstructed masses and at the retained passage cuts.
const area=r=>r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p.x*q.z-q.x*p.z;},0)/2;
const inRing=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const inside=(p,s)=>inRing(p,s.points)&&!s.holes.some(r=>inRing(p,r));
const vertices=parts.flatMap(p=>[p.points,...p.holes].flat()),faces=[];
for(const part of parts)for(const ring of [area(part.points)>0?part.points:[...part.points].reverse(),...part.holes.map(r=>area(r)<0?r:[...r].reverse())])for(let i=0;i<ring.length;i++){
 const a=ring[i],c=ring[(i+1)%ring.length],dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz);if(len<1e-6)continue;const normal={x:dz/len,z:-dx/len},cuts=[0,1];
 for(const p of vertices){const t=((p.x-a.x)*dx+(p.z-a.z)*dz)/(len*len);if(t>1e-7&&t<1-1e-7&&Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)<1e-6)cuts.push(t);}
 const ts=[...new Set(cuts.map(t=>Math.round(t*1e9)/1e9))].sort((a,b)=>a-b);
 for(let k=1;k<ts.length;k++){
  const lo=ts[k-1],hi=ts[k];if((hi-lo)*len<1e-5)continue;const p={x:a.x+dx*lo,z:a.z+dz*lo},q={x:a.x+dx*hi,z:a.z+dz*hi},mid={x:(p.x+q.x)/2+normal.x*.005,z:(p.z+q.z)/2+normal.z*.005};let spans=[[part.minHeight,part.height]];
  for(const other of parts)if(other.id!==part.id&&inside(mid,other))spans=spans.flatMap(([a,b])=>other.height<=a||other.minHeight>=b?[[a,b]]:[[a,Math.min(b,other.minHeight)],[Math.max(a,other.height),b]].filter(([a,b])=>b-a>1e-6));
  for(const [bottom,top]of spans)faces.push({part:part.id,kind:part.kind,rows:part.rows,height:part.height,a:p,b:q,normal,bottom,top,reconstructed:true});
 }
}
fs.writeFileSync(new URL('../dist/l5-parts.js',import.meta.url),'// Reconstructed L5 wings, podium and entrance inside the retained outer outline.\nexport const L5_PARTS = '+JSON.stringify(parts,null,2)+';\nexport const L5_FACES = '+JSON.stringify(faces,null,2)+';\nexport const L5_DECK = '+JSON.stringify(deck,null,2)+';\n');
console.log(`${parts.length} L5 components; ${faces.length} exposed facade spans`);
