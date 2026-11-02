import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS} from '../dist/campus-data.js';
import {buildingBase} from '../dist/terrain.js';
import {NIDA_SCHOOL_IDS,nidaSchoolDefinitions,nidaLocal,nidaRectangle,nidaPoint,nidaSchoolGeometry} from '../dist/nida-school-data.js';
import {frameRectangle} from '../dist/geometry.js';

const poly=points=>[points.map(p=>[p.x,p.z])];
const points=r=>(r.length>1&&r[0][0]===r.at(-1)[0]&&r[0][1]===r.at(-1)[1]?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const area=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const parts=[],courts=[];
for(const id of NIDA_SCHOOL_IDS){
 const b=CAMPUS.buildings.find(b=>b.id===id),base=buildingBase(b.points);let remaining=[poly(b.points)];
 for(const def of nidaSchoolDefinitions(id)){
  const regions=clip.intersection(remaining,poly(def.points));remaining=clip.difference(remaining,poly(def.points));
  for(const [index,r]of regions.entries()){
   if(area(r[0])<1e-10)continue;
   const ring=points(r[0]),local=ring.map(nidaLocal),localBounds={u0:Math.min(...local.map(p=>p.u)),u1:Math.max(...local.map(p=>p.u)),v0:Math.min(...local.map(p=>p.v)),v1:Math.max(...local.map(p=>p.v))};
   const part={id:`${def.key}-${index}`,sourceId:id,kind:def.kind,base,points:ring,holes:r.slice(1).map(points),localBounds,reconstructed:true};
   if(def.kind==='hip'){
    const e=localBounds,cu=(e.u0+e.u1)/2,cv=(e.v0+e.v1)/2,w=Math.min(3.4,(e.u1-e.u0)*.4),l=Math.min(4.0,(e.v1-e.v0)*.3);
    const lantern=clip.intersection(poly(nidaRectangle(cu-w/2,cu+w/2,cv-l/2,cv+l/2)),r);
    if(lantern.length===1&&area(lantern[0][0])>1)part.lantern=points(lantern[0][0]);
   }
   parts.push(part);
  }
 }
 for(const r of remaining)if(area(r[0])>1e-10)courts.push({sourceId:id,points:points(r[0]),holes:r.slice(1).map(points),reconstructed:true});
}
const northernCourt=[nidaPoint(-7,-26),nidaPoint(.373*-26+16.2,-26),nidaPoint(.373*27+16.2,27),nidaPoint(-7,27)],envelope=clip.union(...NIDA_SCHOOL_IDS.map(id=>poly(CAMPUS.buildings.find(b=>b.id===id).points)),poly(northernCourt));
const occupied=parts.filter(p=>!['cover','gallery'].includes(p.kind)).map(p=>poly(p.points));
const gardens=nidaSchoolGeometry().trees.map(t=>poly(Array.from({length:20},(_,i)=>({x:t.x+Math.cos(i/20*Math.PI*2)*1.1,z:t.z+Math.sin(i/20*Math.PI*2)*1.1}))));
const sourcePaths=CAMPUS.paths.flatMap(path=>path.points.slice(1).map((c,i)=>{const a=path.points[i],length=Math.hypot(c.x-a.x,c.z-a.z),frame={x:(a.x+c.x)/2,z:(a.z+c.z)/2,u:{x:-(c.z-a.z)/length,z:(c.x-a.x)/length},v:{x:(c.x-a.x)/length,z:(c.z-a.z)/length}};return poly(frameRectangle(frame,(path.width||3)+.15,length));}));
const paving=clip.difference(envelope,...occupied,...gardens,...sourcePaths).filter(r=>area(r[0])>.01).map(r=>({points:points(r[0]),holes:r.slice(1).map(points),reconstructed:true}));
const out='// Fitted NIDA school roof / occupied regions; original source rings remain separate.\nexport const NIDA_SCHOOL_PARTS = '+JSON.stringify(parts)+';\nexport const NIDA_SCHOOL_COURTS = '+JSON.stringify(courts)+';\nexport const NIDA_SCHOOL_PAVING = '+JSON.stringify(paving)+';\nexport const NIDA_SCHOOL_GARDENS = '+JSON.stringify(gardens.map(r=>({points:points(r[0]),reconstructed:true})))+';\n';
fs.writeFileSync(new URL('../dist/nida-school-parts.js',import.meta.url),out);
console.log(parts.length,'school regions,',courts.length,'reconstructed court openings');
