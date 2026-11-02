import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=002ddb18d272';
import { buildingBase, terrainHeight } from './terrain.js?v=002ddb18d272';
export const VALLENTINE_ID='osm-way-45604879';
export function vallentineGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points),east=frame.width/2;
  const landingV=10,stairU=east+2.1,width=2.35,length=6.3,count=15;
  const bottom=framePoint(frame,stairU,landingV-length-1.1),top=framePoint(frame,stairU,landingV-1.1),ground=terrainHeight(bottom.x,bottom.z),topRL=ground+2.4;
  const apron=frameRectangle(frame,5,12.6,east+2.7,6.5);
  const landing={points:frameRectangle(frame,3.255,2.2,east+1.6475,landingV),rl:topRL},stair={a:bottom,b:top,h0:ground,h1:topRL,width,count};
  const direction={x:(top.x-bottom.x)/length,z:(top.z-bottom.z)/length},stairArrival={x:bottom.x-direction.x*1.8,z:bottom.z-direction.z*1.8},stairHeading=Math.atan2(direction.x,-direction.z);
  const arrival=framePoint(frame,east+12,landingV-10),target=framePoint(frame,east,landingV),northArrival=framePoint(frame,east+5,-frame.length/2-3.5);
  const canopy={u0:east-.1,u1:east+4.5,v0:landingV-length-2.3,v1:landingV+2.1,rl:Math.min(base+b.height-.3,topRL+3)};
  const canopyEdge=v=>canopy.u1-.7*(1+Math.sin((v-canopy.v0)/(canopy.v1-canopy.v0)*Math.PI*2-.6));
  return {frame,base,east,apron,landing,stair,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),northArrival,northHeading:Math.atan2(frame.x-northArrival.x,northArrival.z-frame.z),canopy,canopyEdge,ground,topRL,stairArrival,stairHeading,reconstructed:true};
}
