import {CAMPUS} from './campus-data.js?v=0dd17659ccd5';
import {terrainHeight,buildingBase} from './terrain.js?v=0dd17659ccd5';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=0dd17659ccd5';
import {UNSW_GIS_LABEL_EVIDENCE} from './unsw-gis-evidence.js?v=0dd17659ccd5';
export const SHALOM_ID='osm-way-45560897';
export const SHALOM_GIS=UNSW_GIS_LABEL_EVIDENCE.find(p=>p.code==='N9');
export const SHALOM_COLLEGE={title:'Shalom College · accommodation and balcony levels',url:'https://shalomcollege.unsw.edu.au/accomodation/',balconyFloors:[1,2]};
export const SHALOM_NORTH_VIEW='https://www.google.com/maps/@?api=1&map_action=pano&pano=rPhK4KNe-ca8pbyaX1GNEg&heading=180&pitch=10';
export const SHALOM_SOUTH_VIEW='https://www.google.com/maps/@?api=1&map_action=pano&pano=o0i0yVvC_kOsUnTg8KhTaQ&heading=0&pitch=10';

// Original OSM envelope / overall height remain unchanged. Internal roof
// boundaries, lightwells, courtyard and detailed component levels are fitted
// from public imagery rather than measured as-built building-part geometry.
export function shalomGeometry(b=CAMPUS.buildings.find(b=>b.id===SHALOM_ID)){
 const a=b.points[0],c=b.points[1],frame=orientedFrame(b.points,{x:c.x-a.x,z:c.z-a.z}),at=(u,v)=>framePoint(frame,u,v),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z}),rect=(u0,u1,v0,v1)=>frameRectangle(frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2);
 const base=buildingBase(b.points),garden={points:rect(-38.3,-20.6,-17.5,-1.4)},lightwells=[{points:rect(-1.9,6.7,-4.2,4.7)},{points:rect(16.9,25.2,-4.2,4.7)}];
 const entryHole={points:rect(-31.5,-22.5,11.8,16.1)},entryAnchor=at(-27,16),entryFloorRL=terrainHeight(entryAnchor.x,entryAnchor.z)+.24,entryFloor=entryFloorRL-base;
 const entryLanding={points:rect(-28.35,-25.65,12,16.1)},entryApproach={points:rect(-28.35,-25.65,16.1,22)},northWalk={points:rect(-13,37,-20,-18.35)};
 const entryGrade=(x,z)=>{const v=local({x,z}).v,t=Math.max(0,Math.min(1,(v-16.1)/5.9)),p=at(-27,22),y=terrainHeight(p.x,p.z)+.22;return Math.max(terrainHeight(x,z)+.22,entryFloorRL*(1-t)+y*t);};
 const arrival=at(12,-27),target=at(14,-13),entryArrival=at(-27,22.1),entryTarget=at(-27,12),southArrival=at(15,38.5),southTarget=at(12,14),gardenArrival=at(-28,-15.7),gardenTarget=at(-28,-2.5);
 const trees=[[-8,-17.7],[10,-17.7],[28,-17.7],[-5,18.3],[17,18.4],[30,18.4]].map(([u,v],i)=>({...at(u,v),u,v,height:7.1+i*.25,radius:.14,reconstructed:true}));
 const boundary=[{points:rect(-8,6,18.95,19.2)},{points:rect(10,32.5,18.95,19.2)}],gate={points:rect(6,10,18.95,19.2)};
 const boulders=[[-11,-17.85,.42],[-3,-17.85,.36],[5.5,-17.85,.47],[14,-17.85,.4],[23,-17.85,.46],[34,-17.85,.42]].map(([u,v,radius])=>({...at(u,v),u,v,radius,reconstructed:true}));
 const ferns=[[-30.2,18.2,3.4],[-23.8,18.4,3.0],[-30.4,20.5,2.1],[-23.8,20.5,2.3],[-33,-8.4,2.6],[-23.6,-7,2.5]].map(([u,v,height])=>({...at(u,v),u,v,height,radius:.095,reconstructed:true}));
 const heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z),northRoof=p=>Math.min(12,11.5+.45*Math.max(0,Math.min(1,(-local(p).v-4.2)/13.1)));
 const southRoof=p=>{const u=local(p).u,centre=u<12?1.75:22.45,half=u<12?10.25:10.45;return 7.15+1.05*Math.min(1,((u-centre)/half)**2);};
 return {frame,at,local,rect,base,garden,lightwells,entryHole,entryLanding,entryApproach,northWalk,entryFloor,entryFloorRL,entryGrade,northRoof,southRoof,maximum:12,northBody:11.2,newWing:12,commonBody:6.7,commonRoof:7.6,southBody:6.8,arrival,target,entryArrival,entryTarget,southArrival,southTarget,gardenArrival,gardenTarget,trees,boulders,ferns,heading:heading(arrival,target),entryHeading:heading(entryArrival,entryTarget),southHeading:heading(southArrival,southTarget),gardenHeading:heading(gardenArrival,gardenTarget),boundary,gate,reconstructed:true};
}
const frame=shalomGeometry().frame;
export function inShalomGround(x,z){const u=(x-frame.x)*frame.u.x+(z-frame.z)*frame.u.z,v=(x-frame.x)*frame.v.x+(z-frame.z)*frame.v.z;return u>-39&&u<39&&v>-20.3&&v<22.1;}
