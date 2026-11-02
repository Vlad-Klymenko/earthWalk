import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { QUADRANGLE_ID, quadrangleGeometry } from '../dist/quadrangle-data.js';
import { frameRectangle } from '../dist/geometry.js';
const b=CAMPUS.buildings.find(b=>b.id===QUADRANGLE_ID),g=quadrangleGeometry(b),poly=p=>[p.map(p=>[p.x,p.z])];
const rect=(u0,u1,v0,v1)=>poly(frameRectangle(g.frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2));
const buffer=(points,width)=>{
  const pieces=[];
  for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],len=Math.hypot(b.x-a.x,b.z-a.z),nx=-(b.z-a.z)/len*width/2,nz=(b.x-a.x)/len*width/2;pieces.push([[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[b.x-nx,b.z-nz],[b.x+nx,b.z+nz]]]);}
  for(const p of points)pieces.push([Array.from({length:24},(_,i)=>[p.x+Math.cos(i*Math.PI/12)*width/2,p.z+Math.sin(i*Math.PI/12)*width/2])]);
  return clipping.union(...pieces);
};
const west=clipping.union(...g.westRoute.map(p=>buffer(p.points,4.6))),east=buffer(g.eastRoute.points,6.4);
const cuts=[['central',poly(g.central)],['west-link',west],['east-link',east],['south-arcade',rect(-30,52.5,3.7,10.3)],['west-arcade',rect(-34.7,-29.5,-44.5,10.3)],['east-arcade',rect(51.8,56.5,-39.4,10.3)]];
let remaining=[poly(b.points)];const output=[];
// Polygon clipping can retain zero-area out-and-back spurs at collinear
// source vertices. Area equality alone cannot catch their collision edges.
// Clean only reconstructed rings; the original mapped polygon stays intact.
const clean=r=>{
  const points=r.slice(0,-1).map(([x,z])=>({x,z}));let changed=true;
  while(changed&&points.length>3){changed=false;for(let i=0;i<points.length;i++){
    const a=points[(i+points.length-1)%points.length],p=points[i],c=points[(i+1)%points.length],len=Math.hypot(c.x-a.x,c.z-a.z);
    if(Math.hypot(p.x-a.x,p.z-a.z)<1e-8||Math.abs((p.x-a.x)*(c.z-a.z)-(p.z-a.z)*(c.x-a.x))<1e-8*Math.max(1,len)){points.splice(i,1);changed=true;break;}
  }}return points;
};
const emit=(kind,m)=>{for(const r of m)output.push({kind,points:clean(r[0]),holes:r.slice(1).map(clean),reconstructed:true});};
for(const [kind,cut]of cuts){const region=clipping.intersection(remaining,cut);emit(kind,region);remaining=clipping.difference(remaining,region);}
emit('main',remaining);
fs.writeFileSync(new URL('../dist/quadrangle-parts.js',import.meta.url),'// Photo-led occupied wings and open ground-floor regions preserve the mapped outline.\n// Regenerate with node scripts/make-quadrangle-parts.mjs.\nexport const QUADRANGLE_PARTS = '+JSON.stringify(output,null,2)+';\n');
console.log(`${output.length} Quadrangle regions`);
