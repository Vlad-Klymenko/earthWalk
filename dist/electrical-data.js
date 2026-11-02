import { orientedFrame, framePoint, frameRectangle, clipFrameStrip } from './geometry.js?v=e77dc5c20f34';
import { buildingBase } from './terrain.js?v=e77dc5c20f34';

export const ELECTRICAL_ID='osm-way-45230019';
export const ELECTRICAL_LEVELS={
  title:'Hassell G17 proposed elevations · DA_A_2001 Rev C, 4 February 2016',
  url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-7370%2120190227T103626.692+GMT',
  pdfPage:1,linkLabel:'Height source · Hassell elevation',parapetRL:57.141,plantRL:63.711,stairRL:60.856,
  coreRL:[62.890,62.897],mastRL:[66.30,68.00,69.50],flueRL:66.711,
};

// The original T-shaped perimeter is retained. Internal divisions, floor
// spacing and rooftop footprints are photo-led reconstruction, not survey data.
export function electricalGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const regions=[{kind:'north',points:clipFrameStrip(b.points,frame,-100,24)},{kind:'south',points:clipFrameStrip(b.points,frame,24,100)}];
  const cores=[{u:-15.3,v:39.5,width:7.2,length:20,roofRL:ELECTRICAL_LEVELS.coreRL[0]},
    {u:26.2,v:35.6,width:7.1,length:20.5,roofRL:ELECTRICAL_LEVELS.coreRL[1]}]
    .map(c=>({...c,points:frameRectangle(frame,c.width,c.length,c.u,c.v),reconstructed:true}));
  const plants=[{u:20.5,v:-15,width:14.3,length:63},{u:1.2,v:35.2,width:20,length:11}]
    .map(p=>({...p,points:frameRectangle(frame,p.width,p.length,p.u,p.v),reconstructed:true}));
  const masts=[{u:-15.3,v:39.5,rl:66.3,from:62.89},{u:15,v:-28,rl:68,from:63.711},{u:26,v:-41,rl:69.5,from:63.711}]
    .map(p=>({...p,...framePoint(frame,p.u,p.v),reconstructed:true}));
  const flues=[{u:25.2,v:-37},{u:24.2,v:-35.4},{u:25.2,v:-33.8}].map(p=>({...framePoint(frame,p.u,p.v),rl:ELECTRICAL_LEVELS.flueRL,reconstructed:true}));
  const arrival=framePoint(frame,-5,87),target=framePoint(frame,0,36);
  return {frame,base,local,regions,cores,plants,masts,flues,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),
    // Main floor bands are estimated separately from the labelled roof RLs.
    upperFloorRL:38.9,storey:3.55,upperRows:5,maximumRL:69.5,reconstructed:true};
}
