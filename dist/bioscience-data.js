import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=68ba9bfc4c04';
import { buildingBase } from './terrain.js?v=68ba9bfc4c04';

export const BIOSCIENCE_REPORTS={
  north:{title:'Woods Bagot · 2016 biosciences S96 design statement',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-6674-MOD-1%2120190228T015509.308+GMT',printedPage:5,pdfPage:5,roofRL:96.2,approximate:true},
  south:{title:'Woods Bagot · biosciences architectural design report',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-6674%2120190227T074245.609+GMT',printedPage:10,pdfPage:10,roofRL:89.5,approximate:true},
};

export function bioscienceGeometry(b){
  // East-west façade axis follows the long mapped D26 elevation. Internal
  // boundaries and plant footprints are reconstructions within the OSM outline.
  const frame=orientedFrame(b.points,{x:-.1994,z:1});
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const north=b.id==='biological-north',base=buildingBase(b.points),report=BIOSCIENCE_REPORTS[north?'north':'south'];
  const levels=[53.47,57.57,61.53,65.49,69.45,73.41,77.37,81.33,85.2];
  const canopy={roofRL:61.53,start:-frame.width/2+1,end:frame.width/2-1,v:-27.1,depth:4.2};
  const plants=north?[
    {points:frameRectangle(frame,96,11,0,-18.5),bottomRL:86.4,roofRL:90.4},
    {points:frameRectangle(frame,32,10,-27,-18.5),bottomRL:90.4,roofRL:96.2},
    {points:frameRectangle(frame,26,10,30,-18.5),bottomRL:90.4,roofRL:96.2},
  ]:[{points:frameRectangle(frame,45,18,-2,-3),bottomRL:87.13,roofRL:89.5}];
  const arrival=north?framePoint(frame,-28,-78):framePoint(frame,80,8);
  const target=north?framePoint(frame,-20,-20):framePoint(frame,32,-2);
  const supports=north?[]:[-15,-6,2].map(v=>framePoint(frame,v>0?32.5:35,v));
  const forecourt=frameRectangle(frame,64,7,-20,-30.15),streetGarden={points:frameRectangle(frame,5.5,38,44.5,0),trees:[-14,-2,12].map(v=>({...framePoint(frame,44.5,v),height:4.6,reconstructed:true})),reconstructed:true};
  return {frame,local,north,base,report,levels,canopy,plants,supports,forecourt,streetGarden,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),
    regionRoofRL:kind=>kind==='biolink'?81.5:kind==='atrium'||kind==='glass-box'?85.98:north?86.4:87.13};
}

export function mathewsTheatreGeometry(b){
  const frame=orientedFrame(b.points),arrival=framePoint(frame,-frame.width/2-11,3),target=framePoint(frame,0,3);
  return {frame,arrival,target,paving:frameRectangle(frame,4,10,-frame.width/2-2,3),heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),canopyHeight:3.6};
}

export const MATHEWS_COVERED_ROUTES=['osm-way-1178531022','osm-relation-15937009-0'];
