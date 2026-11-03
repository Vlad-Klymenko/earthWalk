import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=9473ccb108ea';
import { terrainHeight, buildingBase } from './terrain.js?v=9473ccb108ea';
export const SQUAREHOUSE_ID='squarehouse';
export const SQUAREHOUSE_PHOTO={url:'https://steppingonthecracks.com/2023/01/26/sydney-travel-blog-day-2/',title:'Stepping on the Cracks · 16 January 2023 Squarehouse exterior photographs'};
export function squarehouseGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const ring=b.points.reduce((s,p,i)=>{const q=b.points[(i+1)%b.points.length];return s+p.x*q.z-q.x*p.z;},0)<0?[...b.points].reverse():b.points;
  const faces=ring.map((a,i)=>{const c=ring[(i+1)%ring.length],len=Math.hypot(c.x-a.x,c.z-a.z),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},mid=local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});return {a,c,len,n,mid,kind:n.x*frame.v.x+n.z*frame.v.z>.7?'blank-brick':'pier-windows'};});
  // Lower terrace and annex extents are reconstructed around the retained
  // upper-building outline; no additional mapped footprint is claimed.
  const podium=[[19.8,-24],[19.8,22],[-8,22],[-8,10.2],[-14.7,10.2],[-14.7,-.4],[-19,-.4],[-19,-24]].map(([u,v])=>framePoint(frame,u,v));
  const floor=3.6,underside=3.35,roof=11.1,top=b.height;
  const u=17.4,width=2.2,bottomV=-23.8,topV=-17,count=22;
  const first=frameRectangle(frame,width,(topV-bottomV)/count,u,bottomV+(topV-bottomV)/count/2),low=Math.max(...first.map(p=>terrainHeight(p.x,p.z)))+.22,rise=base+floor-low;
  const steps=Array.from({length:count},(_,i)=>({points:frameRectangle(frame,width,(topV-bottomV)/count,u,bottomV+(i+.5)*(topV-bottomV)/count),rl:low+.02+rise*i/count}));
  const stairOpening=frameRectangle(frame,3.2,topV+24.1,u,(topV-24.1)/2),landing=frameRectangle(frame,3.2,1.5,u,topV+.75);
  const stairs={u,width,bottomV,topV,count,low,rise,steps,opening:stairOpening,landing,reconstructed:true};
  const columns=[];
  for(const u of [-18,-12,-6,0,6,12])columns.push({u,v:-23.4});
  for(const v of [-12,-6,0,6,12,18])columns.push({u:19.2,v});
  for(const u of [-6,0,6,12])columns.push({u,v:21.4});
  const supports=columns.map(p=>({...p,...framePoint(frame,p.u,p.v),width:.42,reconstructed:true}));
  const planters=[...[-14,-8,0,6,11].map(u=>({u,v:-19.0})),...[0,7,13].map(u=>({u,v:19.5})),...[-6,4,15].map(v=>({u:15.8,v}))].map(p=>({...p,...framePoint(frame,p.u,p.v),width:1.05,depth:.75,reconstructed:true}));
  const canopies=[{points:frameRectangle(frame,38,3.2,-.5,-21.4),u0:-19.5,u1:18.5,v0:-23,v1:-19.8},{points:frameRectangle(frame,3.5,34.3,17.75,3.35),u0:16,u1:19.5,v0:-13.8,v1:20.5}].map(p=>({...p,bottom:6.8,top:7.0,reconstructed:true}));
  const arrival=framePoint(frame,29,34),target=framePoint(frame,4,2),northArrival=framePoint(frame,-10,-32),northTarget=framePoint(frame,0,-16);
  const stairArrival=framePoint(frame,u,-28),stairTarget=framePoint(frame,u,-15.5),arcadeArrival=framePoint(frame,17.7,24.5),arcadeTarget=framePoint(frame,17.7,-14.0);
  const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
  return {frame,base,local,faces,podium,floor,underside,roof,top,stairs,supports,planters,canopies,rows:[3.95,6.35,8.75].map(low=>({low,high:low+2.0})),arrival,target,heading:heading(arrival,target),northArrival,northTarget,northHeading:heading(northArrival,northTarget),stairArrival,stairTarget,stairHeading:heading(stairArrival,stairTarget),arcadeArrival,arcadeTarget,arcadeHeading:heading(arcadeArrival,arcadeTarget),reconstructed:true};
}
