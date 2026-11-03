import {CAMPUS} from './campus-data.js?v=1247eefc625e';
import {orientedFrame,framePoint,frameRectangle,clipFrameStrip} from './geometry.js?v=1247eefc625e';
import {buildingBase} from './terrain.js?v=1247eefc625e';
import {UNSW_GIS_LABEL_EVIDENCE} from './unsw-gis-evidence.js?v=1247eefc625e';

export const REGIMENT_HALL_ID='osm-way-164553176';
export const REGIMENT_HALL_PHOTO={url:'https://studentvip.com.au/unsw/kensington/maps/135725',photo:'https://s3.studentvip.com.au/photos/gated-building-178410-small.jpg'};
export const REGIMENT_HALL_AERIAL='https://www.google.com/maps/@-33.91728,151.22474,120m/data=!3m1!1e3';
export const REGIMENT_HALL_GIS=UNSW_GIS_LABEL_EVIDENCE.find(p=>p.code==='H1');

// The source footprint / levels are mapped. All facade, component roof,
// courtyard and pole dimensions are photograph-fitted estimates. The GIS
// height field is zero: it is not a measured replacement building height.
export function regimentHallGeometry(b=CAMPUS.buildings.find(b=>b.id===REGIMENT_HALL_ID)){
 const frame=orientedFrame(b.points),at=(u,v)=>framePoint(frame,u,v),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
 const rectangle=(u0,u1,v0,v1)=>frameRectangle(frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2);
 const eastEdge=(v0,v1)=>[at(frame.width/2,v0),at(frame.width/2,v1)],southEdge=(u0,u1)=>[at(u1,frame.length/2),at(u0,frame.length/2)];
 const base=buildingBase(b.points),half=frame.width/2,eave=5.6,ridge=6.1,maximum=6.4;
 const roofHeight=p=>eave+(ridge-eave)*Math.max(0,1-Math.abs(local(p).u)/half);
 const roofFrame={...frame,v:frame.u},roofParts=[clipFrameStrip(b.points,roofFrame,-100,0),clipFrameStrip(b.points,roofFrame,0,100)];
 const doors=[-10,-3.9,2.2].map(v=>({u:half+.045,v,width:5.0,bottom:.24,top:4.15}));
 const clerestory={u:half+.05,v0:-13.55,v1:7.65,bottom:4.45,top:5.37,panes:25};
 const vents=[-10,-3.4,3.2,10].map(v=>({...at(0,v),v,bottom:ridge,top:maximum,radius:.24}));
 // Keep the fitted asphalt inside the visible courtyard, clear of the
 // adjacent J2 wings. Its boundary is not a newly surveyed map polygon.
 const apron=[[half+.05,-14.2],[49.7,-14.2],[49.7,-5.8],[38.25,-5.8],[38.25,7.95],[half+.05,7.95]].map(([u,v])=>at(u,v));
 const hatches=doors.map(d=>({points:rectangle(half+.08,half+4.4,d.v-d.width/2,d.v+d.width/2),door:d}));
 const pole={...at(32,-8),u:32,v:-8,height:10.8,yardarm:3.7,armHeight:8.3,radius:.1};
 // A photo comparison viewpoint in the game, not a claim of public access.
 const arrival=at(29,1),target=at(half,-3.9),heading=Math.atan2(target.x-arrival.x,arrival.z-target.z);
 const publicPath=CAMPUS.paths.find(p=>p.id==='osm-way-1099978890'),a=publicPath.points[0],c=publicPath.points.at(-1),streetArrival={x:a.x+(c.x-a.x)*.99,z:a.z+(c.z-a.z)*.99};
 const streetTarget=at(0,0),streetHeading=Math.atan2(streetTarget.x-streetArrival.x,streetArrival.z-streetTarget.z);
 return {frame,at,local,rectangle,eastEdge,southEdge,base,half,eave,ridge,maximum,roofHeight,roofParts,doors,clerestory,vents,apron,hatches,pole,arrival,target,heading,streetArrival,streetTarget,streetHeading,publicPath:publicPath.id,reconstructed:true};
}

export function inRegimentHallCourt(x,z){const g=regimentHallGeometry(),p=g.local({x,z});return p.u>g.half-.15&&p.u<49.8&&p.v>-14.6&&p.v<8.1&&(p.u<38.7||p.v<-5.6);}
