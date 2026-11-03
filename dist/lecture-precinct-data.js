import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=dfa1c50ac01f';
import { buildingBase, terrainHeight } from './terrain.js?v=dfa1c50ac01f';
const frameFor=b=>orientedFrame(b.points,{x:-.16,z:1});
export function civilGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),bodyRoof=b.height-3,upperBase=7,rows=8;
  const entry=framePoint(frame,-11,-frame.length/2),entryGround=terrainHeight(entry.x,entry.z);
  const arrival=framePoint(frame,-6,-34),target=framePoint(frame,-5,0);
  const plant={points:frameRectangle(frame,16,6,-2,-5),bottom:bodyRoof,top:b.height,reconstructed:true};
  const trees=[-2,4,10,16].map((u,i)=>({...framePoint(frame,u,-frame.length/2-4.5),height:11+i%2,form:'civil-poplar',reconstructed:true,source:'https://www.google.com/maps/@?api=1&map_action=pano&pano=7z8NTBJ_x5mnsxoQaXFtHA&heading=170&pitch=20&fov=90'}));
  return {frame,base,bodyRoof,upperBase,rows,pitch:(bodyRoof-upperBase)/rows,entry,entryGround,arrival,target,plant,trees,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z)};
}
export function patriciaGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const stair={a:framePoint(frame,14.4,-10.9),b:framePoint(frame,14.4,-19.2),width:2.2,count:22,reconstructed:true};
  const landing=[[0,-23],[16.6,-23],[16.6,-19],[12.1,-19],[12.1,-20.7],[0,-20.7]].map(([u,v])=>framePoint(frame,u,v));
  const firstRL=Math.max(terrainHeight(stair.a.x,stair.a.z)+3.3,...landing.map(p=>terrainHeight(p.x,p.z)+2.4));
  stair.lowRL=terrainHeight(stair.a.x,stair.a.z)+.2;stair.highRL=firstRL;
  const entrance={a:framePoint(frame,16.84,7.8),b:framePoint(frame,16.84,-5.8)};
  const arrival=framePoint(frame,34,1),target=framePoint(frame,12,1);
  const stairArrival={...stair.a};
  const columns=[2,9,15.8].map(u=>({...framePoint(frame,u,-22.6),radius:.16,reconstructed:true}));
  return {frame,local,base,stair,landing,firstRL,coverRL:firstRL+2.65,entrance,arrival,target,stairArrival,columns,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),stairHeading:Math.atan2(stair.b.x-stair.a.x,stair.a.z-stair.b.z)};
}

// Collinear survey vertices remain in source / roofs / collision. Façade runs
// merge only their tiny sub-15 cm alignment differences to avoid duplicate bays.
export function lectureFacadeRing(points){
  const ring=points.map(p=>({...p}));let changed=true;
  while(changed&&ring.length>3){changed=false;for(let i=0;i<ring.length;i++){
    const a=ring[(i+ring.length-1)%ring.length],p=ring[i],c=ring[(i+1)%ring.length],dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz),t=((p.x-a.x)*dx+(p.z-a.z)*dz)/(len*len);
    if(t>0&&t<1&&Math.abs(dx*(p.z-a.z)-dz*(p.x-a.x))/len<.15){ring.splice(i,1);changed=true;break;}
  }}return ring;
}
