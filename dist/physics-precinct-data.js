import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=372bc6d4b821';
import { buildingBase, terrainHeight } from './terrain.js?v=372bc6d4b821';
export const NEWTON_ID='osm-way-45489051',KEITH_ID='osm-way-45489639',PHYSICS_ID='osm-way-45489666';
const frameFor=b=>orientedFrame(b.points,{x:-.16,z:1});
const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
export function newtonGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),entry=framePoint(frame,-8.2,-18.5);
  const landing=frameRectangle(frame,3.15,4.2,-9.95,-18.5),stair={a:framePoint(frame,-15.5,-18.5),b:framePoint(frame,-11.5,-18.5),width:3.3,reconstructed:true};
  stair.lowRL=terrainHeight(stair.a.x,stair.a.z)+.03;stair.highRL=Math.max(stair.lowRL+.9,...landing.map(p=>terrainHeight(p.x,p.z)+.8));stair.count=Math.ceil((stair.highRL-stair.lowRL)/.17);
  const rampStart=framePoint(frame,-10.35,-30),ramp={a:rampStart,b:framePoint(frame,-10.35,-20.6),width:1.65,count:1,lowRL:terrainHeight(rampStart.x,rampStart.z)+.02,highRL:stair.highRL,reconstructed:true};
  const arrival=framePoint(frame,-25,-6),target=entry,stairArrival=framePoint(frame,-16.7,-18.5);
  return {frame,base,entry,landing,stair,ramp,arrival,target,heading:heading(arrival,target),stairArrival,stairHeading:heading(stair.a,stair.b),rows:4,reconstructed:true};
}
export function keithGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),centre=framePoint(frame,0,4),arcIndices=[0,3,4,5,6,7,8,9,10];
  const lower=b.points.map((p,i)=>{if(!arcIndices.includes(i))return {...p};const dx=centre.x-p.x,dz=centre.z-p.z,len=Math.hypot(dx,dz);return {x:p.x+dx/len*1.3,z:p.z+dz/len*1.3};});
  const overhang=Math.max(3.8,...arcIndices.map(i=>terrainHeight(b.points[i].x,b.points[i].z)+2.5-base));
  const arrival=framePoint(frame,-16,-15),target=framePoint(frame,0,-5);
  return {frame,base,lower,arcIndices,overhang,arrival,target,heading:heading(arrival,target),reconstructed:true};
}
export function physicsGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),bodyRoof=b.height-1.05,plant={points:frameRectangle(frame,12,7,0,2),bottom:bodyRoof,top:b.height,reconstructed:true};
  const arrival=framePoint(frame,-20,-2),target=framePoint(frame,-9,4);
  return {frame,base,bodyRoof,plant,arrival,target,heading:heading(arrival,target),reconstructed:true};
}
