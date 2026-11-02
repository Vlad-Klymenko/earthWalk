import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=c65eae45fe39';
import { buildingBase } from './terrain.js?v=c65eae45fe39';
export const RUPERT_ID='osm-relation-1131247-0';
// Original OSM outline / courtyard retained. These internal splits, floor
// dimensions and steel positions are photograph-led estimates, not a survey.
export function rupertGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const corridor={minV:-8.5,maxV:4.5,westBottom:11.5,eastBottom:8.1};
  const arrival=framePoint(frame,-38,-4),target=framePoint(frame,-16,-15),courtyardView=framePoint(frame,-12.44,2.23);
  const columns=[-21.8,-10.3].flatMap(u=>[-8.8,4.8].map(v=>({...framePoint(frame,u,v),radius:.3,reconstructed:true})));
  const trees=[[-3,14],[4,14],[-3,23],[4,23]].map(([u,v],i)=>({...framePoint(frame,u,v),height:7.5+i%2,form:'rupert-courtyard',reconstructed:true,source:'https://s3.studentvip.com.au/photos/h-175921-small.jpg'}));
  const lawn=frameRectangle(frame,16,14,1.5,19);
  return {frame,local,base,corridor,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),courtyardView,courtyardHeading:Math.atan2(frame.u.x,-frame.u.z),columns,trees,lawn,northTop:15.2,northUpper:11.5,whiteBoxTop:8.5,whiteBoxBottom:1.15};
}
