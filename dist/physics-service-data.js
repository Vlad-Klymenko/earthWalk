import {CAMPUS as RAW} from './campus-data.js?v=01be76894552';
import {PHYSICS_ID,physicsGeometry} from './physics-precinct-data.js?v=01be76894552';
import {PHYSICS_ROOF_PARTS} from './physics-roof-parts.js?v=01be76894552';
import {framePoint,frameRectangle} from './geometry.js?v=01be76894552';
import {terrainHeight} from './terrain.js?v=01be76894552';
export const PHYSICS_SERVICE_PHOTO='https://studentvip.com.au/unsw/kensington/maps/135061';
export const PHYSICS_CSE_GUIDE='https://cgi.cse.unsw.edu.au/~learn/where_k14_is/';
export const PHYSICS_GIS_CANDIDATE={height:12.24,floors:4,objectId:53,url:'https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer/18',selected:false,note:'Retained K14 label attributes report 12.24 m and four floors. The measured extent / height reference within the connected Physics / Old Main complex is not established here, so these fields do not replace the separate mapped theatre shell’s 8 m / one-level tags.'};
const raw=RAW.buildings.find(b=>b.id===PHYSICS_ID);
const signed=ps=>ps.reduce((s,p,i)=>{const q=ps[(i+1)%ps.length];return s+p.x*q.z-q.x*p.z;},0);
export function physicsServiceGeometry(b=raw){
 const g=physicsGeometry(b),frame=g.frame,local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z}),body=6.65,serviceRoof=7.55,roofAt=p=>7.15+.85*Math.max(0,1-((local(p).u+.5)/9.5)**2),sign=signed(b.points)>0?1:-1;
 let chain=0;
 const faces=b.points.map((p,i)=>{
  const q=b.points[(i+1)%b.points.length],a=sign>0?p:q,c=sign>0?q:p,length=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,start=chain;chain+=length;
  const point=(t,y,offset=0)=>[a.x+(c.x-a.x)*t+nx*offset,y,a.z+(c.z-a.z)*t+nz*offset],uv=(t,y)=>[(start+length*(sign>0?t:1-t))/4.6,y/1.52],holes=[];
  const floor=Math.max(...[.2,.5,.8].map(t=>{const p=point(t,0);return terrainHeight(p[0],p[2]);}))+.22-g.base;
  const open=(id,left,right,bottom,top,recess)=>holes.push({id,left,right,bottom,top,recess,reconstructed:true});
  if(i===9){open('west-high-three-panes',.46,.90,4.95,5.72,.16);open('west-service-door',.55,.72,floor,floor+2.22,.15);}
  if(i===11){open('court-high-three-panes',.08,.46,4.95,5.72,.16);open('court-high-pair',.59,.82,4.95,5.72,.16);open('court-service-louvre',.18,.37,floor,floor+2.16,.12);}
  const plinthTop=(i===9||i===11)?2.72:2.35,xs=[...new Set([0,1,...holes.flatMap(h=>[h.left,h.right])])].sort((a,b)=>a-b),ys=[...new Set([0,plinthTop,body,...holes.flatMap(h=>[h.bottom,h.top])])].sort((a,b)=>a-b),masonry=[];
  for(let x=1;x<xs.length;x++)for(let y=1;y<ys.length;y++){const left=xs[x-1],right=xs[x],bottom=ys[y-1],top=ys[y],t=(left+right)/2,h=(bottom+top)/2;if(!holes.some(o=>t>o.left&&t<o.right&&h>o.bottom&&h<o.top))masonry.push({left,right,bottom,top,rendered:top<=plinthTop});}
  return {sourceEdge:i,a,c,length,nx,nz,point,uv,holes,masonry,floor,plinthTop};
 });
 const units=[-6,-1].map(u=>({points:frameRectangle(frame,1.8,1.2,u,-12),centre:framePoint(frame,u,-12),bottom:serviceRoof,top:7.96,reconstructed:true}));
 const face=faces[9],door=face.holes.find(h=>h.id==='west-service-door'),centre=(door.left+door.right)/2,target=face.point(centre,0),arrival=face.point(centre,0,7.2);
 const externalEdge=(a,c)=>[0,.5,1].every(t=>{const p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};return b.points.some((q,i)=>{const r=b.points[(i+1)%b.points.length],dx=r.x-q.x,dz=r.z-q.z,s=Math.max(0,Math.min(1,((p.x-q.x)*dx+(p.z-q.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-q.x-dx*s,p.z-q.z-dz*s)<1e-6;});});
 return {...g,body,serviceRoof,units,externalEdge,maximum:b.height,local,roofAt,faces,parts:PHYSICS_ROOF_PARTS,entryArrival:{x:arrival[0],z:arrival[2]},entryTarget:{x:target[0],z:target[2]},entryHeading:Math.atan2(target[0]-arrival[0],arrival[2]-target[2])};
}
const g=physicsServiceGeometry();
export const PHYSICS_SERVICE_VIEW={id:'physics-west-service',name:'Physics Theatre · west service facade',code:'K14',kind:'viewpoint',...g.entryArrival,heading:g.entryHeading,pitch:.26,showSign:false,description:'High three-pane windows, brown rendered base, recessed service door, downpipes and pale roof enclosure. Roof regions follow public photographs / aerial context within the original map outline. Mapped 8 m maximum retained; fine section, openings and roof profile are reconstructed. Closed service doors are not public entrances'};
