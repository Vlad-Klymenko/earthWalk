import {CAMPUS as RAW} from './campus-data.js?v=e9883400adb4';
import {NEWTON_ID,newtonGeometry} from './physics-precinct-data.js?v=e9883400adb4';
import {framePoint,frameRectangle} from './geometry.js?v=e9883400adb4';
export const NEWTON_FACADE_PHOTO='https://www.learningenvironments.unsw.edu.au/physical-spaces/k-j12';
export const NEWTON_FACADE={roof:14.65,coping:14.82,maximum:16,bayPitch:4.2,firstBay:-28.6,bays:15,recess:.18,brickTileWidth:4.6,brickTileHeight:1.52,reconstructed:true};
export const NEWTON_WINDOW_ROWS=[{bottom:.65,top:3.6,panelTop:4.75},{bottom:5.0,top:7.0,panelTop:8.1},{bottom:8.7,top:10.7,panelTop:11.8},{bottom:12.4,top:14.25,panelTop:14.4}];
export const NEWTON_GIS_CANDIDATE={objectId:22,height:13.29,floors:6,selected:false,note:'Retained public Building Labels Feb 2023 snapshot. Component extent, measurement base and floor definition unspecified; no fresh geometry / level survey. Original 16 m / five-level map evidence remains selected.'};
const raw=RAW.buildings.find(b=>b.id===NEWTON_ID),signed=ps=>ps.reduce((s,p,i)=>{const q=ps[(i+1)%ps.length];return s+p.x*q.z-q.x*p.z;},0);
export function newtonFacadeGeometry(b=raw){
 const g=newtonGeometry(b),f=g.frame,local=p=>({u:(p.x-f.x)*f.u.x+(p.z-f.z)*f.u.z,v:(p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z}),ring=signed(b.points)>0?b.points:[...b.points].reverse();let chain=0;
 const faces=ring.map((a,i)=>{
  const c=ring[(i+1)%ring.length],length=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z,la=local(a),lc=local(c),start=chain;chain+=length;
  const mode=nu<-.8?'west':nu>.8?'east':nv>.8?'south-end':'end',holes=[],panels=[],ribs=[];
  const interval=(left,right)=>{let l=(left-la.v)/(lc.v-la.v),r=(right-la.v)/(lc.v-la.v);if(l>r)[l,r]=[r,l];return {left:Math.max(0,l),right:Math.min(1,r)};};
  const add=(array,item,left,right)=>{const q=interval(left,right);if(q.right-q.left>1e-7)array.push({...item,...q,reconstructed:true});};
  if((mode==='west'||mode==='east')&&length>7){
   for(let bay=0;bay<NEWTON_FACADE.bays;bay++){
    const v=NEWTON_FACADE.firstBay+bay*NEWTON_FACADE.bayPitch;
    for(const offset of [-1.53,-.82,.82,1.53]){const q=v+offset,bottom=mode==='west'&&q> -21&&q< -16?g.stair.highRL-g.base+3.55:0;add(ribs,{bottom,top:NEWTON_FACADE.roof,depth:.075},q-.055,q+.055);}
    for(const [row,level]of NEWTON_WINDOW_ROWS.entries())for(const [kind,offset,width]of [['main',0,1.32],['side',-1.15,.36],['side',1.15,.36]]){
     // The raised west entrance replaces the affected ground-window fields.
     if(mode==='west'&&row===0&&v+offset+width/2>-21&&v+offset-width/2<-16)continue;
     add(holes,{id:`${mode}-${bay}-${row}-${kind}-${offset}`,kind,row,bay,bottom:level.bottom,top:level.top,recess:NEWTON_FACADE.recess},v+offset-width/2,v+offset+width/2);
     add(panels,{bottom:level.top+.04,top:level.panelTop},v+offset-width/2-.035,v+offset+width/2+.035);
    }
   }
   if(mode==='west'&&Math.min(la.v,lc.v)<=-18.5&&Math.max(la.v,lc.v)>=-18.5){const floor=g.stair.highRL-g.base;add(holes,{id:'west-entry',kind:'door',row:0,bay:-1,bottom:floor,top:floor+2.8,recess:.28},-20.5,-16.5);}
  }
  const xs=[...new Set([0,1,...holes.flatMap(h=>[h.left,h.right])])].sort((a,b)=>a-b),ys=[...new Set([0,NEWTON_FACADE.roof,...holes.flatMap(h=>[h.bottom,h.top])])].sort((a,b)=>a-b),masonry=[];
  for(let x=1;x<xs.length;x++)for(let y=1;y<ys.length;y++){const left=xs[x-1],right=xs[x],bottom=ys[y-1],top=ys[y],t=(left+right)/2,h=(bottom+top)/2;if(!holes.some(o=>t>o.left&&t<o.right&&h>o.bottom&&h<o.top))masonry.push({left,right,bottom,top});}
  return {sourceEdge:i,a,c,length,nx,nz,mode,holes,panels,ribs,masonry,point:(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off],uv:(t,y)=>[(start+t*length)/NEWTON_FACADE.brickTileWidth,y/NEWTON_FACADE.brickTileHeight]};
 });
 const roofUnits=[-25,-13,-1,11,23].map((v,i)=>({id:`newton-roof-unit-${i}`,u:-3.6,v,points:frameRectangle(f,3.2,2.2,-3.6,v),bottom:NEWTON_FACADE.roof+.08,top:15.92,reconstructed:true}));
 return {...g,faces,roofUnits,local,at:(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];}};
}
