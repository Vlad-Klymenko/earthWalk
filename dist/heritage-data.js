import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=bd77208c6e8e';

// Appearance dimensions reconstructed from linked public photographs. The
// mapped outlines remain authoritative for location; these are not surveys.
export function heritageGeometry(b,type){
  const frame=orientedFrame(b.points,type==='figtree'?{x:-.62,z:.784}:null);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  let roofHeight;
  if(type==='figtree'){
    const left=-frame.width/2,split=frame.width*.18,ridge=(left+split)/2;
    roofHeight=p=>{const {u}=local(p);return u>split?3.45-(u-split)/(frame.width/2-split)*.7:3.45+2.25*Math.max(0,1-Math.abs(u-ridge)/((split-left)/2));};
  }else if(type==='whitehouse'){
    // Every mapped eave, including the concave veranda returns, meets the
    // posts at the same height. Bounding-box distances lift return edges.
    roofHeight=p=>{
      const d=Math.min(...b.points.map((a,i)=>{
        const c=b.points[(i+1)%b.points.length],dx=c.x-a.x,dz=c.z-a.z;
        const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));
        return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);
      }));
      return 6.6+Math.min(2.6,d*.7);
    };
  }else roofHeight=p=>8.8+2.4*Math.max(0,1-Math.abs(local(p).u)/(frame.width/2));
  // The veranda outline is concave. Scaling that outline toward its bounding
  // centre can push an inner corner outside it, corrupting the deck hole.
  // Use an explicitly reconstructed inset room block inside the mapped edge.
  const body=frameRectangle(frame,frame.width*.64,frame.length*.6,0,-1);
  return {frame,local,roofHeight,body};
}

export function whiteHouseStair(b){
  const area=b.points.reduce((s,p,i)=>{const q=b.points[(i+1)%b.points.length];return s+p.x*q.z-q.x*p.z;},0);
  const ring=area<0?[...b.points].reverse():b.points;
  let edge=null;
  for(let i=0;i<ring.length;i++){
    const a=ring[i],c=ring[(i+1)%ring.length],length=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length;
    if(!edge||nx*length>edge.score)edge={a,c,length,nx,nz,index:i,score:nx*length};
  }
  const {a,c,length,nx,nz}=edge,dx=(c.x-a.x)/length,dz=(c.z-a.z)/length;
  return {...edge,a:{x:a.x+dx*.7+nx*.68,z:a.z+dz*.7+nz*.68},b:{x:c.x-dx*.7+nx*.68,z:c.z-dz*.7+nz*.68},direction:{x:dx,z:dz},width:1.12,count:18,low:.25,high:3.35,landingOffset:.2};
}

export function goldsteinGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:.987});
  const split=frame.width*.18;
  const courtyard={...frame,...framePoint(frame,0,-frame.length/2-10.5)};
  return {frame,split,courtyard};
}

export const HERITAGE_FIGS=[
  {x:189,z:-219,height:17},
  {x:219,z:-246,height:16},
  {x:237,z:-187,height:18},
  {x:191,z:-175,height:16}
].map((p,i)=>({...p,id:`reconstructed-heritage-fig-${i}`,species:'Ficus macrophylla',form:'heritage-fig',reconstructed:true,source:'heritage-conservation'}));
