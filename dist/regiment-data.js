import { CAMPUS } from './campus-data.js?v=eb4acc4e0f1c';
import { framePoint,frameRectangle } from './geometry.js?v=eb4acc4e0f1c';
import { buildingBase } from './terrain.js?v=eb4acc4e0f1c';
export const REGIMENT_J2_IDS=['osm-way-164553276','osm-way-164553343'];
export const REGIMENT_STREET_VIEW={url:'https://www.google.com/maps/@?api=1&map_action=pano&pano=BE7BYpVPxXH47P6c1E-rRA&heading=25&pitch=8',date:'October 2020',lat:-33.9177032,lon:151.2248377};
export function regimentGeometry(b){
 const points=b.points,edges=points.map((a,i)=>{const c=points[(i+1)%points.length],dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz);return{a,c,len,dx,dz};});
 const south=edges.filter(e=>Math.abs(e.dx/e.len)>.8).sort((a,b)=>(b.a.z+b.c.z)-(a.a.z+a.c.z))[0],sign=south.dx>0?1:-1,u={x:south.dx/south.len*sign,z:south.dz/south.len*sign},v={x:-u.z,z:u.x};
 const us=points.map(p=>p.x*u.x+p.z*u.z),vs=points.map(p=>p.x*v.x+p.z*v.z),loU=Math.min(...us),hiU=Math.max(...us),loV=Math.min(...vs),hiV=Math.max(...vs),cu=(loU+hiU)/2,cv=(loV+hiV)/2;
 const frame={x:cu*u.x+cv*v.x,z:cu*u.z+cv*v.z,u,v,width:hiU-loU,length:hiV-loV},base=buildingBase(points),east=b.id===REGIMENT_J2_IDS[1],eave=b.height-.25;
 const roofHeight=p=>{const pu=(p.x-frame.x)*u.x+(p.z-frame.z)*u.z,pv=(p.x-frame.x)*v.x+(p.z-frame.z)*v.z,d=Math.min(frame.width/2-Math.abs(pu),frame.length/2-Math.abs(pv));return eave+.25*Math.max(0,Math.min(1,d/(Math.min(frame.width,frame.length)/2)));};
 const arrival=regimentFootwayPoint(east?-307:-331),target=framePoint(frame,0,frame.length/2),heading=Math.atan2(target.x-arrival.x,arrival.z-target.z);
 return {frame,base,east,eave,roofHeight,southWindows:east?1:5,upper:{bottom:3.75,top:5.1},lower:{bottom:1.4,top:2.12},hood:east?{points:frameRectangle(frame,7.5,1.3,0,frame.length/2+.65),bottom:3.12,top:3.34}:null,arrival,target,heading,reconstructed:true};
}
const path=CAMPUS.paths.find(p=>p.id==='osm-way-1099978888'),west=path.points[1],east=path.points[0],len=Math.hypot(east.x-west.x,east.z-west.z),u={x:(east.x-west.x)/len,z:(east.z-west.z)/len},v={x:-u.z,z:u.x};
export function regimentFootwayPoint(x,north=0){const t=(x-west.x)/(east.x-west.x);return {x:x-v.x*north,z:west.z+(east.z-west.z)*t-v.z*north};}
export const REGIMENT_STREET={sourcePath:path.id,source:REGIMENT_STREET_VIEW.url,reconstructed:true,
 fence:[regimentFootwayPoint(-365,2),regimentFootwayPoint(-305,2)],height:1.8,
 trees:[-360,-352,-344,-336,-328,-320,-312,-306].map((x,i)=>({...regimentFootwayPoint(x,5.1),height:12+i%4,form:'regiment-street',reconstructed:true})),
 shrubs:Array.from({length:36},(_,i)=>({...regimentFootwayPoint(-364+i*1.65,3.2+(i%3)*.45),radius:.65+(i%4)*.08,height:.65+(i%5)*.15,reconstructed:true}))};
export function inRegimentStreet(x,z){const q=regimentFootwayPoint(x),north=(q.x-x)*v.x+(q.z-z)*v.z;return x>-370&&x<-300&&north>-12&&north<13;}
