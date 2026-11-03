import {CAMPUS} from './campus-data.js?v=ef86122637ee';
import {buildingBase,terrainHeight} from './terrain.js?v=ef86122637ee';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=ef86122637ee';
export const BARKER_EAST_ID='osm-way-45561366',BARKER_SOUTH_ID='osm-way-45561370',BARKER_EAST_IDS=[BARKER_EAST_ID,BARKER_SOUTH_ID];
export const BARKER_EAST_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=b6Ha54RA0wf4y1dP-q2aCA&heading=260&pitch=10';
export const BARKER_EAST_AERIAL='https://www.google.com/maps/@-33.91953,151.22978,120m/data=!3m1!1e3';
export const BARKER_EAST_GIS={url:'https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer/18',compoundCode:'N13',compoundFloorCount:6,compoundHeightField:19.54,note:'Whole-compound attributes do not measure the detached wings.'};
const raw=id=>CAMPUS.buildings.find(b=>b.id===id);
const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
export function barkerEastGeometry(b=raw(BARKER_EAST_ID)){
 const frame=orientedFrame(b.points,{x:-.16,z:1}),at=(u,v)=>framePoint(frame,u,v),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z}),base=buildingBase(b.points),maximum=b.height,eave=7.55,main=b.id===BARKER_EAST_ID;
 const roofPoints=b.points.map(p=>{const q=local(p);return at(q.u*(1+.4/frame.width),q.v*(1+.4/frame.length));});
 const edgeDistance=p=>Math.min(...roofPoints.map((a,i)=>distance(p,a,roofPoints[(i+1)%roofPoints.length]))),centreDepth=edgeDistance({x:frame.x,z:frame.z});
 const roofHeight=p=>eave+(maximum-eave)*Math.max(0,Math.min(1,edgeDistance(p)/centreDepth));
 const longU=frame.width>=frame.length,halfRidge=Math.abs(frame.width-frame.length)/2,ridge=[longU?at(-halfRidge,0):at(0,-halfRidge),longU?at(halfRidge,0):at(0,halfRidge)];
 const frontPath=CAMPUS.paths.find(p=>p.id==='osm-way-1116164538'),crossing=CAMPUS.paths.find(p=>p.id==='osm-way-1098977026'),arrival=main?{...crossing.points[1]}:{...frontPath.points[8]},target=at(frame.width/2,0);
 const stairStart=at(-6.3,-6.7),stairFloor=terrainHeight(stairStart.x,stairStart.z)+.22,lower=base+2.55,upper=base+5.1;
 const stair=main?{u0:-5.3,u1:4.3,middleWidth:1.05,v0:-7.2,v1:-6.2,count:32,floor:stairFloor,upper,lower,canopy:base+7.55,start:stairStart,arrival:at(4.7,-5.25),target:at(-4,-5.25),reconstructed:true}:null;
 const treads=stair?Array.from({length:stair.count},(_,i)=>{const half=stair.count/2,second=i>=half,k=i%half,a=second?stair.middleWidth/2:stair.u0,c=second?stair.u1:-stair.middleWidth/2,u0=a+(c-a)*k/half,u1=a+(c-a)*(k+1)/half;return {points:frameRectangle(frame,u1-u0,stair.v1-stair.v0,(u0+u1)/2,(stair.v0+stair.v1)/2),u0,u1,height:second?lower+(upper-lower)*k/half:stairFloor+(lower-stairFloor)*k/half,reconstructed:true};}):[];
 const galleries=stair?[lower,upper].map(height=>({points:frameRectangle(frame,10.8,1.5,0,-5.35),height,reconstructed:true})):[];
 const landings=stair?[{points:frameRectangle(frame,1.05,2.6,0,-5.9),height:lower,reconstructed:true},{points:frameRectangle(frame,1.05,2.6,4.825,-5.9),height:upper,reconstructed:true}]:[];
 const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z),apron=frameRectangle(frame,frame.width+1.3,frame.length+1.3),hedge=frameRectangle(frame,.4,frame.length-.6,frame.width/2+.38,0);
 return {frame,at,local,base,maximum,eave,roofPoints,roofHeight,ridge,main,arrival,target,heading:heading(arrival,target),stair,treads,galleries,landings,apron,hedge,reconstructed:true};
}
export const BARKER_EAST_TREE={x:119,z:212,height:14,radius:.45,reconstructed:true,note:'Aerial / panorama-led gum form and position; not a species or individual tree survey.'};
export function inBarkerEastGround(x,z){return x>108&&x<129&&z>179&&z<218;}
