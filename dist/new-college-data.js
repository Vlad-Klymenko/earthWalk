import {CAMPUS} from './campus-data.js?v=0471b93d3b95';
import {terrainHeight,buildingBase} from './terrain.js?v=0471b93d3b95';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=0471b93d3b95';
import {UNSW_GIS_LABEL_EVIDENCE} from './unsw-gis-evidence.js?v=0471b93d3b95';
export const NEW_COLLEGE_ID='osm-way-45560776';
export const NEW_COLLEGE_GIS=UNSW_GIS_LABEL_EVIDENCE.find(p=>p.code==='L6');
export const NEW_COLLEGE_SOURCE={url:'https://newcollege.unsw.edu.au/live-at-unsw/new-college',tour:'https://newcollege.unsw.edu.au/images/virtualtour/index.html',courtyardPhoto:'https://newcollege.unsw.edu.au/images/newcollege/2_Live_at_UNSW/Galleries/New_College/NC_Facilities/New%20College%20Courtyard.jpg',roomLevels:[1,2,3,4],bridgeLevel:3};
export const NEW_COLLEGE_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=Qhol4Zy10WN5FuGWbS9l_Q&heading=90&pitch=15';
// The complete mapped envelope / 15 m height stay untouched. All component
// boundaries and levels below are fitted visual estimates, not as-built data.
export function newCollegeGeometry(b=CAMPUS.buildings.find(b=>b.id===NEW_COLLEGE_ID)){
 const a=b.points[1],c=b.points[2],frame=orientedFrame(b.points,{x:c.x-a.x,z:c.z-a.z}),at=(u,v)=>framePoint(frame,u,v),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z}),rect=(u0,u1,v0,v1)=>frameRectangle(frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2),base=buildingBase(b.points);
 const floor=3.5,level=2.6,body=13.6,floorRL=base+floor,court={points:rect(-10.3,10.3,-26.4,26.4)},roofOpening={points:rect(-12.3,12.3,-28.2,28.2)},entryHole={points:rect(-19,-14.2,-3.6,3.6)},groundRoom={points:rect(-15.8,15.8,-30.3,30.3)};
 const lowPoint=at(-20.8,0),entryLow=terrainHeight(lowPoint.x,lowPoint.z)+.22,entryFloorRL=entryLow+.75,entryFloor=entryFloorRL-base;
 const stair={a:at(-20.8,0),b:at(-19.3,0),width:5.6,count:5,h0:entryLow+.015,h1:entryFloorRL+.015},stairTreads=Array.from({length:5},(_,i)=>({points:rect(-20.8+i*.3,-20.8+(i+1)*.3,-2.8,2.8),rl:stair.h0+.15*i+.05}));
 const landing={points:rect(-19.3,-14.2,-3.6,3.6)},apron={points:rect(-24.5,-20.8,-3.6,3.6)},entryArrival=at(-24.5,-1.4),arrival=at(-37,11),target=at(-17.5,0),eastArrival=at(32,0),eastTarget=at(17.8,0),courtArrival=at(6,21.2),courtTarget=at(6,-20);
 const bridge={points:rect(-10.3,10.3,-3.4,-1.1),floor:floor+2*level},pavilion={points:rect(-6.6,-.8,-19.8,-5.4),u0:-6.6,u1:-.8,v0:-19.8,v1:-5.4,height:3.1},deck={points:rect(-8.6,-.4,5,24.6)};
 const columns=Array.from({length:7},(_,i)=>-24+i*8).flatMap(v=>[-8.8,8.8].map(u=>({...at(u,v),u,v,radius:.13}))),trees=[[-18.4,-27],[-18.4,-7],[-18.4,7],[-18.4,28]].map(([u,v],i)=>({...at(u,v),u,v,height:6.6+i*.3,radius:.13}));
 const heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z),canopyHeight=p=>15-.8*Math.min(1,Math.abs(local(p).u)/12.6),lowerRoof=p=>13.63+.32*Math.max(0,1-Math.max(0,(Math.abs(local(p).u)-12.3)/5.4,(Math.abs(local(p).v)-28.2)/4.4));
 return {frame,at,local,rect,base,floor,level,body,floorRL,court,roofOpening,entryHole,groundRoom,entryLow,entryFloor,entryFloorRL,stair,stairTreads,landing,apron,arrival,target,entryArrival,eastArrival,eastTarget,courtArrival,courtTarget,bridge,pavilion,deck,columns,trees,canopyHeight,lowerRoof,maximum:15,heading:heading(arrival,target),entryHeading:heading(entryArrival,at(-14.2,-1.4)),eastHeading:heading(eastArrival,eastTarget),courtHeading:heading(courtArrival,courtTarget),reconstructed:true};
}
const f=newCollegeGeometry().frame;
export function inNewCollegeGround(x,z){const u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z;return u>-22&&u<20&&v>-34&&v<34;}
