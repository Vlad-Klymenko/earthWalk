import {CAMPUS} from './campus-data.js?v=7e037edcfeb5';
import {terrainHeight} from './terrain.js?v=7e037edcfeb5';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=7e037edcfeb5';
import {UNSW_GIS_LABEL_EVIDENCE} from './unsw-gis-evidence.js?v=7e037edcfeb5';
export const L5_ID='osm-way-97699521';
export const L5_BUILDER={title:'Lipman · UNSW L5 Building',url:'https://lipman.com.au/projects/unsw-l5-building/',eastFloors:6,westFloors:3};
export const L5_COLLEGE={title:'UNSW College · current L5 facilities',url:'https://www.unswcollege.edu.au/experience/facilities'};
export const L5_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=ZDXizUnB9CxivdOejxV2-g&heading=270&pitch=35';
export const L5_GIS=UNSW_GIS_LABEL_EVIDENCE.find(p=>p.code==='L5');
export function l5Geometry(b=CAMPUS.buildings.find(b=>b.id===L5_ID)){
 const f=orientedFrame(b.points,{x:.155,z:.988}),local=p=>({u:(p.x-f.x)*f.u.x+(p.z-f.z)*f.u.z,v:(p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z}),at=(u,v)=>framePoint(f,u,v);
 const street=at(26.2,-8.8),base=terrainHeight(street.x,street.z)+.22,deck=4.32,roof=28.5,westRoof=16.5;
 const stair={a:at(25.15,-8.8),b:at(7.4,-8.8),width:10.8,count:28,h0:base,h1:base+deck};
 const stairPoints=frameRectangle(f,17.75,stair.width,16.275,-8.8),court={points:frameRectangle(f,15.9,37.4,-.55,0)},arrival=at(28.7,-8.8),frontView=at(52,3),westView=at(-28.3,0),courtView=at(0,-13.5);
 const planters=[[-4.9,-6.2],[-4.9,5.1],[3.7,12.5]].map(([u,v],i)=>({...at(u,v),u,v,radius:.7,height:5.2+i*.35,reconstructed:true}));
 const benches=[{u:-5.7,v:-10,width:2.1,depth:.55},{u:4.7,v:6.2,width:2.1,depth:.55}].map(p=>({...p,...at(p.u,p.v),points:frameRectangle(f,p.depth,p.width,p.u,p.v)}));
 return {frame:f,local,base,deck,deckRL:base+deck,roof,westRoof,maximum:30,eastFloors:6,westFloors:3,stair,stairPoints,court,arrival,frontView,westView,courtView,planters,benches,heading:Math.atan2(-f.u.x,f.u.z),westHeading:Math.atan2(f.u.x,-f.u.z),courtHeading:Math.atan2(f.v.x,-f.v.z),reconstructed:true};
}
const frame=l5Geometry().frame;
export function inL5Court(x,z){const u=(x-frame.x)*frame.u.x+(z-frame.z)*frame.u.z,v=(x-frame.x)*frame.v.x+(z-frame.z)*frame.v.z;return u>-26&&u<26&&v>-25&&v<25;}
