import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {frameRectangle} from '../dist/geometry.js';
import {TERRACES_ID,terracesGeometry} from '../dist/terraces-data.js';
const b=CAMPUS.buildings.find(b=>b.id===TERRACES_ID),g=terracesGeometry(b),f=g.frame;
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const shape=points=>poly({points}),clean=r=>(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-9?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const regions=geometry=>geometry.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean)}));
const source=poly(b),rect=(width,length,u=0,v=0)=>shape(frameRectangle(f,width,length,u,v));
const definitions=[
 {kind:'west-wing',mask:rect(100,200,-61.3),height:g.maximum,minHeight:g.retail,rows:g.upperRows},
 {kind:'east-wing',mask:rect(100,200,61.3),height:g.maximum,minHeight:g.retail,rows:g.upperRows},
 {kind:'north-link',mask:rect(22.6,100,0,-69),height:g.northHeight,minHeight:g.retail,rows:g.northRows},
 {kind:'south-link',mask:rect(22.6,100,0,79),height:g.retail+.1,minHeight:g.retail-.22,rows:0}
];
const parts=[];
for(const d of definitions)for(const p of regions(clip.intersection(source,d.mask)))parts.push({...p,id:`terraces-${d.kind}-${parts.length}`,parent:TERRACES_ID,kind:d.kind,height:d.height,minHeight:d.minHeight,rows:d.rows,reconstructed:true});
const footways=[];
for(const path of CAMPUS.paths)for(let i=1;i<path.points.length;i++){
 const a=path.points[i-1],c=path.points[i],len=Math.hypot(c.x-a.x,c.z-a.z);if(!len)continue;
 if(Math.min(Math.hypot(a.x-f.x,a.z-f.z),Math.hypot(c.x-f.x,c.z-f.z))>100)continue;
 const width=(path.width||2.1)+.8,nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2,ex=(c.x-a.x)/len*.5,ez=(c.z-a.z)/len*.5;
 footways.push(shape([{x:a.x+nx-ex,z:a.z+nz-ez},{x:a.x-nx-ex,z:a.z-nz-ez},{x:c.x-nx+ex,z:c.z-nz+ez},{x:c.x+nx+ex,z:c.z+nz+ez}]));
}
for(const upper of parts.filter(p=>p.kind!=='south-link')){
 const body=clip.intersection(poly(upper),rect(f.width-4.8,f.length-4.8));
 for(const p of regions(clip.difference(body,...footways)))parts.push({...p,id:`terraces-retail-${parts.length}`,parent:TERRACES_ID,kind:'retail',height:g.retail,minHeight:0,rows:1,reconstructed:true});
}
// Glazed retail rooms below the two raised gardens, set back from the
// lightwell edges. Their floor follows the retained DEM; all path cuts remain.
for(const garden of g.gardens){
 const body=clip.intersection(poly(garden),rect(22.6,100,0,garden.points[0].z<f.z?-55:55));
 for(const p of regions(clip.difference(body,...footways)))parts.push({...p,id:`terraces-court-retail-${parts.length}`,parent:TERRACES_ID,kind:'retail',height:g.retail-g.gardenSlab,minHeight:0,rows:1,reconstructed:true});
}
const ground=clip.union(...parts.filter(p=>!p.minHeight).map(poly));
const paving=regions(clip.difference(source,ground,...footways)).map(p=>({...p,reconstructed:true}));
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
fs.writeFileSync(new URL('../dist/terraces-parts.js',import.meta.url),'// Photo-led reconstruction inside the unchanged B8 source envelope.\n// Regenerate with node scripts/make-terraces-parts.mjs.\nexport const TERRACES_PARTS = '+JSON.stringify(parts,null,2)+';\nexport const TERRACES_FACES = '+JSON.stringify(faces,null,2)+';\nexport const TERRACES_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(`${parts.length} reconstructed Terraces masses; ${faces.length} exposed facade segments`);
