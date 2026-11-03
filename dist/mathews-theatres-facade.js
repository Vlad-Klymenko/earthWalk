import {CAMPUS as RAW} from './campus-data.js?v=eb4acc4e0f1c';
import {mathewsTheatreGeometry} from './bioscience-data.js?v=eb4acc4e0f1c';
import {buildingBase,terrainHeight} from './terrain.js?v=eb4acc4e0f1c';
import {framePoint} from './geometry.js?v=eb4acc4e0f1c';

export const MATHEWS_THEATRES_ID='mathews-theatres';
export const MATHEWS_THEATRES_PHOTO='https://www.learningenvironments.unsw.edu.au/physical-spaces/k-d23';
export const MATHEWS_THEATRES_PAVILION_PHOTO='https://studentvip.com.au/unsw/kensington/maps/133153';
const raw=RAW.buildings.find(b=>b.id===MATHEWS_THEATRES_ID),frame=mathewsTheatreGeometry(raw).frame;
const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
const signed=ps=>ps.reduce((s,p,i)=>{const q=ps[(i+1)%ps.length];return s+p.x*q.z-q.x*p.z;},0);

// Openings and reveals are photo fitted, not surveyed elevation drawings.
// The two photographed entrances face opposite sides of the retained D23 slab.
export function mathewsTheatreFacades(b=raw){
 const base=buildingBase(b.points),ring=signed(b.points)>0?b.points:[...b.points].reverse();
 const floors={};
 for(const mode of ['west','east']){
  const u=(mode==='west'?-1:1)*frame.width/2;
  floors[mode]=Math.max(...[-8,-4,0,4,8].map(v=>{const p=framePoint(frame,u,v);return terrainHeight(p.x,p.z);}))+ .22-base;
 }
 return ring.map((a,i)=>{
  const c=ring[(i+1)%ring.length],length=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,nu=nx*frame.u.x+nz*frame.u.z,mode=nu>.9?'east':nu<-.9?'west':'end',floor=floors[mode]??0,la=local(a),lc=local(c),holes=[];
  const opening=(id,left,right,bottom,top,recess)=>{
   let l=(left-la.v)/(lc.v-la.v),r=(right-la.v)/(lc.v-la.v);if(l>r)[l,r]=[r,l];l=Math.max(0,l);r=Math.min(1,r);if(r-l>1e-6)holes.push({id,left:l,right:r,bottom:floor+bottom,top:floor+top,recess,reconstructed:true});
  };
  if(mode==='east'){
   opening('pavilion-doors',-.2,6.2,0,2.9,.65);
   opening('pavilion-south-windows',7.25,18.5,.65,2.8,.45);
   opening('pavilion-north-windows',-18.5,-1.25,.65,2.8,.45);
  }
  if(mode==='west'){
   opening('lower-stair-doors',1.8,4.2,0,2.8,.55);
   opening('lower-food-court',-1.8,.9,0,2.8,.55);
  }
  const xs=[...new Set([0,1,...holes.flatMap(h=>[h.left,h.right])])].sort((a,b)=>a-b),ys=[...new Set([0,b.height,...holes.flatMap(h=>[h.bottom,h.top])])].sort((a,b)=>a-b),masonry=[];
  for(let x=1;x<xs.length;x++)for(let y=1;y<ys.length;y++){
   const left=xs[x-1],right=xs[x],bottom=ys[y-1],top=ys[y],t=(left+right)/2,h=(bottom+top)/2;
   if(!holes.some(o=>t>o.left&&t<o.right&&h>o.bottom&&h<o.top))masonry.push({left,right,bottom,top});
  }
  const point=(t,y,offset=0)=>[a.x+(c.x-a.x)*t+nx*offset,y,a.z+(c.z-a.z)*t+nz*offset];
  return {a,c,length,nx,nz,mode,floor,holes,masonry,point};
 });
}
const arrival=framePoint(frame,frame.width/2+8,3),target=framePoint(frame,frame.width/2,3);
export const MATHEWS_THEATRES_VIEW={id:'mathews-theatres-pavilion-entry',name:'Mathews Theatres · pavilion entrance',code:'D23',kind:'viewpoint',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:.12,showSign:false,description:'Recessed glazed doors, white entrance surround, projecting concrete lintel and round soffit lights beside Mathews Pavilions. Public photographs guide the appearance; fine dimensions and entrance levels are reconstructed against the regional terrain. Interiors remain closed'};

// A bounded fitted apron reconciles the DEM slope with each level door sill.
// Walking samples exactly these rendered triangles; no source terrain changes.
export function mathewsTheatreAprons(b=raw){
 const base=buildingBase(b.points);
 return mathewsTheatreFacades(b).filter(f=>f.holes.some(h=>h.id.includes('doors'))).map(f=>{
  const doors=f.holes.filter(h=>h.id.includes('doors')||h.id==='lower-food-court'),left=Math.max(0,Math.min(...doors.map(h=>h.left))-.4/f.length),right=Math.min(1,Math.max(...doors.map(h=>h.right))+.4/f.length),depth=3,cols=Math.ceil((right-left)*f.length*2),rows=6,vertices=[],triangles=[];
  const at=(u,v)=>{const p=f.point(left+(right-left)*u,0,v*depth);return {x:p[0],z:p[2]};};
  for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
   const t=j/rows,p=at(i/cols,t),outer=at(i/cols,1),inner=base+f.floor+.025,y=Math.max(terrainHeight(p.x,p.z)+.24,inner+(terrainHeight(outer.x,outer.z)+.24-inner)*t);vertices.push({...p,y});
  }
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=j*(cols+1)+i,c=a+cols+1;triangles.push([a,a+1,c],[a+1,c+1,c]);}
  const heightAt=(x,z)=>{
   const dx=x-f.a.x,dz=z-f.a.z,tangent=((dx*(f.c.x-f.a.x)+dz*(f.c.z-f.a.z))/(f.length*f.length)-left)/(right-left),normal=(dx*f.nx+dz*f.nz)/depth,ix=Math.max(0,Math.min(cols,tangent*cols)),iz=Math.max(0,Math.min(rows,normal*rows)),i=Math.min(cols-1,Math.floor(ix)),j=Math.min(rows-1,Math.floor(iz)),tx=ix-i,tz=iz-j,a=j*(cols+1)+i,at=k=>vertices[k].y;
   return tx+tz<=1?at(a)+tx*(at(a+1)-at(a))+tz*(at(a+cols+1)-at(a)):at(a+cols+2)+(1-tx)*(at(a+cols+1)-at(a+cols+2))+(1-tz)*(at(a+1)-at(a+cols+2));
  };
  return {id:`mathews-theatres-${f.mode}-apron`,points:[at(0,0),at(1,0),at(1,1),at(0,1)],vertices,triangles,heightAt,mode:f.mode,reconstructed:true};
 });
}
