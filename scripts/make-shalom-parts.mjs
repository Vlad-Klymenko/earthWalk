import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {orientedFrame,frameRectangle} from '../dist/geometry.js';
import {SHALOM_ID,shalomGeometry} from '../dist/shalom-data.js';
const b=CAMPUS.buildings.find(b=>b.id===SHALOM_ID),g=shalomGeometry(b);
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
const shape=points=>poly({points});
const clean=ring=>{
 const r=(Math.hypot(ring[0][0]-ring.at(-1)[0],ring[0][1]-ring.at(-1)[1])<1e-9?ring.slice(0,-1):ring).map(([x,z])=>({x,z}));
 let changed=true;while(changed&&r.length>3){changed=false;for(let i=0;i<r.length;i++){const a=r[(i+r.length-1)%r.length],b=r[i],c=r[(i+1)%r.length],length=Math.hypot(c.x-a.x,c.z-a.z);if(length<1e-7||Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))/length<1e-7){r.splice(i,1);changed=true;break;}}}
 return r;
};
const regions=geometry=>geometry.map(p=>({points:clean(p[0]),holes:p.slice(1).map(clean)}));
const source=poly(b),rect=(...args)=>shape(g.rect(...args)),parts=[];
// Keep the fitted lightwell cuts crossing the reconstructed roof boundary;
// an exactly tangent hole can leave a zero-area wall sliver after rotation.
const cuts=[poly(g.garden),...g.lightwells.map(poly),poly(g.entryHole)],occupied=clip.difference(source,...cuts);
const edgeA=b.points[22],edgeB=b.points[23],boundary=orientedFrame([edgeA,edgeB],{x:edgeB.x-edgeA.x,z:edgeB.z-edgeA.z}),westHalf=shape(frameRectangle(boundary,200,300,-100,0)),eastHalf=shape(frameRectangle(boundary,200,300,100,0));
const west=clip.intersection(occupied,westHalf),newWing=clip.intersection(occupied,eastHalf,rect(-100,-8.5,-100,100)),north=clip.intersection(occupied,rect(-8.5,100,-100,4.6)),south=clip.intersection(occupied,rect(-8.5,100,4.6,100));
const add=(geometry,kind,height,minHeight,rows)=>{for(const p of regions(geometry))parts.push({...p,id:`shalom-${kind}-${parts.length}`,parent:SHALOM_ID,kind,height,minHeight,rows,reconstructed:true});};
add(west,'common-ground',4.5,0,1);add(clip.difference(clip.intersection(source,westHalf),poly(g.garden)),'common-upper',g.commonBody,4.5,1);add(newWing,'west-wing',g.newWing,0,3);add(north,'balcony-wing',g.northBody,0,3);add(south,'south-wing',g.southBody,0,2);
const roofs=[];for(const p of parts){let geometry=[poly(p)];for(const q of parts)if(q.id!==p.id&&q.height>p.height)geometry=clip.difference(geometry,poly(q));if(p.kind==='south-wing'){const strips=[];for(let u=-8.5;u<38.3;u+=.65)strips.push(...clip.intersection(geometry,rect(u,Math.min(38.3,u+.65),-100,100)));geometry=strips;}if(p.kind==='common-upper')geometry=[...clip.intersection(geometry,rect(-100,100,-100,7.2)),...clip.intersection(geometry,rect(-100,100,7.2,100))];for(const r of regions(geometry))roofs.push({...r,height:p.height,kind:p.kind,reconstructed:true});}
const gardens=regions(clip.intersection(source,poly(g.garden))),wells=g.lightwells.flatMap(p=>regions(clip.intersection(source,poly(p))));
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
fs.writeFileSync(new URL('../dist/shalom-parts.js',import.meta.url),'// Reconstructed Shalom volumes / garden inside the unchanged source envelope.\nexport const SHALOM_PARTS = '+JSON.stringify(parts,null,2)+';\nexport const SHALOM_FACES = '+JSON.stringify(faces,null,2)+';\nexport const SHALOM_ROOFS = '+JSON.stringify(roofs,null,2)+';\nexport const SHALOM_GARDEN = '+JSON.stringify(gardens,null,2)+';\nexport const SHALOM_LIGHTWELLS = '+JSON.stringify(wells,null,2)+';\n');
console.log(`${parts.length} Shalom volumes; ${faces.length} exposed facades; ${gardens.length} garden / ${wells.length} lightwell regions`);
