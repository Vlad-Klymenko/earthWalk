import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=f879f0105713';
import { terrainHeight, buildingBase } from './terrain.js?v=f879f0105713';
export const OLD_MAIN_ID='osm-way-45490050';
export const OLD_MAIN_PHYSICS={url:'https://newt.phys.unsw.edu.au/jw/maps.html',title:'UNSW Physics · Old Main description and courtyard photographs',describedStoreys:4};
// The source outline, 24 m maximum and six-level tag remain intact. Window
// spacing, entrance dimensions and relief geometry are photo-led estimates.
export function oldMainGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const signed=b.points.reduce((s,p,i)=>{const q=b.points[(i+1)%b.points.length];return s+p.x*q.z-q.x*p.z;},0),ring=signed<0?[...b.points].reverse():b.points;
  const faces=ring.map((a,i)=>{const c=ring[(i+1)%ring.length],len=Math.hypot(c.x-a.x,c.z-a.z),normal={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};return {a,c,len,normal};});
  const rows=[2.7,8.0,13.3,18.6].map(low=>({low,high:low+2.8,reconstructed:true}));
  const u=60,bottomV=40.2,lowerTop=39,middleTop=37.8,upperTop=33.8,wallV=32.3,riser=.17;
  const first=frameRectangle(frame,5.8,.4,u,bottomV-.2),low=Math.max(...first.map(p=>terrainHeight(p.x,p.z)))+.16;
  const flight=(width,from,to,count,offset)=>Array.from({length:count},(_,i)=>({points:frameRectangle(frame,width,(from-to)/count,u,from-(i+.5)*(from-to)/count),rl:low+(offset+i)*riser+.05}));
  const lower=flight(5.8,bottomV,lowerTop,3,0),middle={points:frameRectangle(frame,5.8,lowerTop-middleTop,u,(lowerTop+middleTop)/2),rl:low+3*riser+.05};
  const upper=flight(2.8,middleTop,upperTop,9,3),landing={points:frameRectangle(frame,11,upperTop-wallV,63.1,(upperTop+wallV)/2),rl:low+12*riser+.05};
  const parts=[...lower,middle,...upper,landing],stairs={u,bottomV,lowerTop,middleTop,upperTop,wallV,low,riser,rise:12*riser,count:12,lower,middle,upper,landing,parts,reconstructed:true};
  const arrival=framePoint(frame,-25,63),target=framePoint(frame,8,29),entryArrival=framePoint(frame,u,46),entryTarget=framePoint(frame,u,wallV);
  const northArrival=framePoint(frame,-40,-35),northTarget=framePoint(frame,-40,8);
  const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
  return {frame,base,local,faces,rows,stairs,arrival,target,heading:heading(arrival,target),entryArrival,entryTarget,entryHeading:heading(entryArrival,entryTarget),northArrival,northTarget,northHeading:heading(northArrival,northTarget),reconstructed:true};
}
