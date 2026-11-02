import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=be5557850bd0';
import { buildingBase, terrainHeight } from './terrain.js?v=be5557850bd0';
export const WILLIS_ID='osm-way-45229601';
export const K17_VISUAL_HEIGHT=26;
const frameFor=b=>orientedFrame(b.points,{x:-.16,z:1});
export function k17Geometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),a=b.points[7],c=b.points[0],len=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
  const along=(t,offset=0)=>({x:a.x+(c.x-a.x)*t+nx*offset,z:a.z+(c.z-a.z)*t+nz*offset});
  const midpoint=along(.5),floor=terrainHeight(midpoint.x,midpoint.z)-base-.15,foyerTop=floor+6.6;
  const arrival=framePoint(frame,-30,-23),target=along(.45);
  const foyerFloor=[along(0),along(1),along(1,-4.1),along(0,-4.1)],paving=[along(0,.1),along(.985,.1),along(.985,3.1),along(0,3.1)];
  return {frame,base,front:{a,c,len,nx,nz,along},floor,foyerTop,foyerFloor,paving,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),rows:7,pitch:K17_VISUAL_HEIGHT/7,stairBay:{start:.15,end:.7,depth:3.2},reconstructed:true};
}
export function willisGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),entry=framePoint(frame,-3,-55),entryGround=terrainHeight(entry.x,entry.z);
  const arrival=framePoint(frame,-5,-70),target=framePoint(frame,-3,-54),laneView=framePoint(frame,-19.3,-44);
  const cover={points:frameRectangle(frame,6.5,39,-19.35,-25),u0:-22.6,u1:-16.1,v0:-44.5,v1:-5.5,clearance:3.8,reconstructed:true};
  return {frame,base,entry,entryGround,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),laneView,laneHeading:Math.atan2(frame.v.x,-frame.v.z),cover,eave:b.height-.55};
}
