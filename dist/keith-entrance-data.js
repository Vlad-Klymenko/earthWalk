import {CAMPUS as RAW} from './campus-data.js?v=01be76894552';
import {KEITH_ID,keithGeometry} from './physics-precinct-data.js?v=01be76894552';
import {terrainHeight} from './terrain.js?v=01be76894552';
import {frameRectangle} from './geometry.js?v=01be76894552';
export const KEITH_PHOTO='https://www.learningenvironments.unsw.edu.au/physical-spaces/k-j14';
export const KEITH_HEIGHT={height:11.18,reportedFloors:3,objectId:54,url:'https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer/18',title:'UNSW public building labels · Keith Burrows Theatre J14',linkLabel:'Height source · UNSW GIS',note:'Retained public Building Labels Feb 2023 snapshot reports height 11.18 m and three floors. Original OSM 8 m / one-level tags remain. Height-field reference and floor-count definition are unspecified; this is not a roof-RL or component survey.'};
export const KEITH_GUIDE='https://cgi.cse.unsw.edu.au/~learn/where_k14_is/';
export const KEITH_BRICK={length:.23,height:.076,tileWidth:4.6,tileHeight:1.52,reconstructed:true};
const raw=RAW.buildings.find(b=>b.id===KEITH_ID);
const sumArea=ps=>ps.reduce((s,p,i)=>{const q=ps[(i+1)%ps.length];return s+p.x*q.z-q.x*p.z;},0);

// Keep source vertices. New components are fitted inside the existing inset;
// the blank auditorium wall is never replaced with invented office windows.
export function keithEntranceGeometry(b=raw){
 const g=keithGeometry(b),sign=sumArea(b.points)>0?1:-1,hoodBottom=g.overhang-1.2,hoodTop=hoodBottom+.25;
 const makeFaces=(points,upper=false)=>{
  let chain=0;
  return points.map((p,i)=>{
   const q=points[(i+1)%points.length],a=sign>0?p:q,c=sign>0?q:p,length=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,start=chain;chain+=length;
   const point=(t,y,offset=0)=>[a.x+(c.x-a.x)*t+nx*offset,y,a.z+(c.z-a.z)*t+nz*offset],uv=(t,y)=>[(start+length*(sign>0?t:1-t))/KEITH_BRICK.tileWidth,y/KEITH_BRICK.tileHeight],holes=[];
   let floor=0;
   if(!upper&&i>=4&&i<=8){
    floor=Math.max(...[.15,.5,.85].map(t=>{const p=point(t,0);return terrainHeight(p[0],p[2]);}))+.22-g.base;
    holes.push({id:'upper-glazing',left:0,right:1,bottom:hoodTop+.08,top:g.overhang-.16,recess:.15,reconstructed:true});
    const door=i===4||i===8;
    holes.push({id:door?'entrance-door':'lower-window',left:door?.18:0,right:door?.82:1,bottom:door?floor:Math.min(floor+1.0,hoodBottom-1.0),top:hoodBottom-.12,recess:door?.22:.15,reconstructed:true});
   }
   const bottom=upper?g.overhang:0,top=upper?b.height:g.overhang,xs=[...new Set([0,1,...holes.flatMap(h=>[h.left,h.right])])].sort((a,b)=>a-b),ys=[...new Set([bottom,top,...holes.flatMap(h=>[h.bottom,h.top])])].sort((a,b)=>a-b),masonry=[];
   for(let x=1;x<xs.length;x++)for(let y=1;y<ys.length;y++){const left=xs[x-1],right=xs[x],bottom=ys[y-1],top=ys[y],t=(left+right)/2,h=(bottom+top)/2;if(!holes.some(o=>t>o.left&&t<o.right&&h>o.bottom&&h<o.top))masonry.push({left,right,bottom,top});}
   return {sourceEdge:i,a,c,length,nx,nz,point,uv,holes,masonry,floor,upper};
  });
 };
 const lower=makeFaces(g.lower),upper=makeFaces(b.points,true),corners=[];
 for(let i=4;i<=9;i++){
  const p=g.lower[i],before=lower[(i+lower.length-1)%lower.length],after=lower[i],nx=before.nx+after.nx,nz=before.nz+after.nz,length=Math.hypot(nx,nz),dot=(nx/length)*after.nx+(nz/length)*after.nz,offset=.95/dot;
  corners.push({x:p.x+nx/length*offset,z:p.z+nz/length*offset});
 }
 const hood=Array.from({length:5},(_,j)=>({id:`keith-hood-${j}`,points:[g.lower[j+4],g.lower[j+5],corners[j+1],corners[j]],bottom:hoodBottom,top:hoodTop,reconstructed:true}));
 const front=lower[4],door=front.holes.find(h=>h.id==='entrance-door'),target=front.point((door.left+door.right)/2,door.bottom),arrival=front.point((door.left+door.right)/2,0,5.2);
 const end=lower[9],p=end.point(.5,0,.55),planter={...{x:p[0],z:p[2]},u:{x:(end.c.x-end.a.x)/end.length,z:(end.c.z-end.a.z)/end.length},v:{x:end.nx,z:end.nz}};
 const bed={points:frameRectangle(planter,2.25,.65),centre:{x:p[0],z:p[2]},frame:planter,height:.38,reconstructed:true};bed.floor=Math.max(...bed.points.map(p=>terrainHeight(p.x,p.z)))+.22;
 return {...g,lowerPoints:g.lower,upper,lower,hood,hoodBottom,hoodTop,bed,entryArrival:{x:arrival[0],z:arrival[2]},entryTarget:{x:target[0],z:target[2]},entryHeading:Math.atan2(target[0]-arrival[0],arrival[2]-target[2])};
}
const g=keithEntranceGeometry();
export const KEITH_ENTRY_VIEW={id:'keith-burrows-curved-entry',name:'Keith Burrows · curved brick entrance',code:'J14',kind:'viewpoint',...g.entryArrival,heading:g.entryHeading,pitch:.16,showSign:false,description:'Mottled curved brick wall above a pale soffit, dark recessed glazing and a narrow grey entrance hood. Appearance follows university photographs. The selected public UNSW GIS height is 11.18 m; original 8 m / one-level map tags remain separately. Hood, lower section heights, window bays and planting are fitted estimates'};

export function keithEntrancePaving(b=raw){
 const g=keithEntranceGeometry(b),triangles=[],doors=g.lower.flatMap(f=>f.holes.filter(h=>h.id==='entrance-door').map(h=>({f,h}))),field=p=>{
  const ground=terrainHeight(p.x,p.z)+.22;let y=ground;
  for(const {f,h} of doors){const dx=p.x-f.a.x,dz=p.z-f.a.z,t=(dx*(f.c.x-f.a.x)+dz*(f.c.z-f.a.z))/(f.length*f.length),normal=dx*f.nx+dz*f.nz,along=Math.max(0,h.left-t,t-h.right)*f.length,influence=Math.max(0,1-along/.6)*Math.max(0,1-Math.max(0,normal)/1.5);y=Math.max(y,ground+(g.base+h.bottom+.02-ground)*influence);}
  return y;
 };
 const subdivide=(a,c,d)=>{
  const ps=[a,c,d],lengths=ps.map((p,i)=>Math.hypot(p.x-ps[(i+1)%3].x,p.z-ps[(i+1)%3].z)),edge=lengths.indexOf(Math.max(...lengths));
  if(lengths[edge]>.55){const next=(edge+1)%3,other=(edge+2)%3,mid={x:(ps[edge].x+ps[next].x)/2,z:(ps[edge].z+ps[next].z)/2};subdivide(ps[edge],mid,ps[other]);subdivide(mid,ps[next],ps[other]);return;}
  if(Math.abs((c.x-a.x)*(d.z-a.z)-(d.x-a.x)*(c.z-a.z))<1e-8)return;
  triangles.push(ps.map(p=>({...p,y:field(p)})));
 };
 for(let i=0;i<b.points.length;i++){const next=(i+1)%b.points.length,a=b.points[i],c=b.points[next],d=g.lowerPoints[next],e=g.lowerPoints[i];subdivide(a,c,d);subdivide(a,d,e);}
 const heightAt=(x,z)=>{
  for(const ps of triangles){const [a,c,d]=ps,det=(c.z-d.z)*(a.x-d.x)+(d.x-c.x)*(a.z-d.z),u=((c.z-d.z)*(x-d.x)+(d.x-c.x)*(z-d.z))/det,v=((d.z-a.z)*(x-d.x)+(a.x-d.x)*(z-d.z))/det,w=1-u-v;if(u>=-1e-7&&v>=-1e-7&&w>=-1e-7)return u*a.y+v*c.y+w*d.y;}
  return field({x,z});
 };
 return {points:b.points,holes:[g.lowerPoints],triangles,heightAt,reconstructed:true};
}
