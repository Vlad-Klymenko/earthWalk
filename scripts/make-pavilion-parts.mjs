import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {PAVILION_ID,pavilionGeometry,pavilionRibbon} from '../dist/pavilion-data.js';
const b=CAMPUS.buildings.find(b=>b.id===PAVILION_ID),g=pavilionGeometry(b);
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
const source=poly(b),curveBands=g.curve.slice(1).map((c,i)=>shape(pavilionRibbon(g.curve[i],c,3.0,0,.6))),seatingBands=g.curve.slice(1).map((c,i)=>shape(pavilionRibbon(g.curve[i],c,4.4,0,.6))),front=shape(pavilionRibbon(g.a,g.c,2.1,0,.2)),entry=shape(g.entryHole);
const balcony=clip.intersection(source,clip.union(...curveBands)),upper=clip.difference(source,balcony,entry),ground=clip.difference(source,...seatingBands,front,entry),parts=[];
const add=(geometry,kind,height,minHeight,rows)=>{for(const p of regions(geometry))parts.push({...p,id:`pavilion-${kind}-${parts.length}`,parent:PAVILION_ID,kind,height,minHeight,rows,reconstructed:true});};
add(ground,'ground-room',g.floor,0,1);add(upper,'upper-room',g.roof,g.floor,1);
const balconyParts=regions(balcony),landing=regions(clip.intersection(source,poly(g.landing))),paving=regions(clip.difference(source,ground,entry));
const outside=[shape(pavilionRibbon(g.a,g.c,.05,1.6,.15)),...g.curve.slice(1).map((c,i)=>shape(pavilionRibbon(g.curve[i],c,.05,2.2,.35))),...g.curve.map(p=>shape(Array.from({length:24},(_,i)=>({x:p.x+Math.cos(i/24*Math.PI*2)*2.2,z:p.z+Math.sin(i/24*Math.PI*2)*2.2}))))];
const pitchedRoof=regions(clip.intersection(upper,shape(pavilionRibbon(g.a,g.c,8,0,0))));
const apron=regions(clip.difference(clip.union(...outside),source));
const seatShape=s=>shape([{x:s.x-s.u.x*s.width/2-s.n.x*s.depth/2,z:s.z-s.u.z*s.width/2-s.n.z*s.depth/2},{x:s.x+s.u.x*s.width/2-s.n.x*s.depth/2,z:s.z+s.u.z*s.width/2-s.n.z*s.depth/2},{x:s.x+s.u.x*s.width/2+s.n.x*s.depth/2,z:s.z+s.u.z*s.width/2+s.n.z*s.depth/2},{x:s.x-s.u.x*s.width/2+s.n.x*s.depth/2,z:s.z-s.u.z*s.width/2+s.n.z*s.depth/2}]);
const ringArea=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;
const regionArea=geometry=>geometry.reduce((s,r)=>s+ringArea(r[0])-r.slice(1).reduce((s,r)=>s+ringArea(r),0),0);
const seats=g.seats.filter(s=>regionArea(clip.difference(seatShape(s),source))<1e-6&&regionArea(clip.intersection(seatShape(s),ground))<1e-6).map(s=>({...s,points:regions([seatShape(s)])[0].points}));
const columns=g.columns.filter(p=>regionArea(clip.difference(shape(Array.from({length:16},(_,i)=>({x:p.x+Math.cos(i/16*Math.PI*2)*p.radius,z:p.z+Math.sin(i/16*Math.PI*2)*p.radius}))),balcony))<1e-6);

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
fs.writeFileSync(new URL('../dist/pavilion-parts.js',import.meta.url),'// Source envelope retained; component boundaries and balcony are reconstructed.\nexport const PAVILION_PITCHED_ROOF = '+JSON.stringify(pitchedRoof,null,2)+';\nexport const PAVILION_SEATS = '+JSON.stringify(seats,null,2)+';\nexport const PAVILION_COLUMNS = '+JSON.stringify(columns,null,2)+';\nexport const PAVILION_PARTS = '+JSON.stringify(parts,null,2)+';\nexport const PAVILION_FACES = '+JSON.stringify(faces,null,2)+';\nexport const PAVILION_BALCONY = '+JSON.stringify(balconyParts,null,2)+';\nexport const PAVILION_LANDING = '+JSON.stringify(landing,null,2)+';\nexport const PAVILION_PAVING = '+JSON.stringify(paving,null,2)+';\nexport const PAVILION_APRON = '+JSON.stringify(apron,null,2)+';\n');
console.log(`${seats.length} pavilion seats; ${columns.length} columns; ${parts.length} pavilion rooms; ${faces.length} exposed facades; ${balconyParts.length} balcony regions`);
