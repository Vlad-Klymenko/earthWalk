import {CAMPUS} from './campus-data.js?v=41994a53b8ae';
import {terrainHeight,buildingBase} from './terrain.js?v=41994a53b8ae';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=41994a53b8ae';
import {UNSW_GIS_LABEL_EVIDENCE} from './unsw-gis-evidence.js?v=41994a53b8ae';
export const WARRANE_ID='osm-way-45560472';
export const WARRANE_GIS=UNSW_GIS_LABEL_EVIDENCE.find(p=>p.code==='M7');
export const WARRANE_LIVING={title:'Warrane College · facilities and courtyard',url:'https://warrane.unsw.edu.au/living/',residentialFloors:5};
export const WARRANE_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=G32oRbvQna4M5GhNqHhwxg&heading=90&pitch=20';
export const WARRANE_COURT='https://www.google.com/maps/@-33.9190021,151.2268004,3a,82.2y,334.89h,88.74t/data=!3m4!1e1!3m2!1sAF1QipOadxIxuE6eYLsVVzlctBHuHwWHCnWDAaqn1amh!2e10';

// The eight source outline points / 27 m height remain authoritative map
// evidence. Every internal boundary, courtyard and detailed level is a
// photograph-led reconstruction, not a measured building-part footprint.
export function warraneGeometry(b=CAMPUS.buildings.find(b=>b.id===WARRANE_ID)){
 const a=b.points[1],c=b.points[0],frame=orientedFrame(b.points,{x:c.x-a.x,z:c.z-a.z}),at=(u,v)=>framePoint(frame,u,v),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
 const rect=(u0,u1,v0,v1)=>frameRectangle(frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2),base=buildingBase(b.points);
 const court={points:rect(-3.2,9.6,-22.8,1)},deck={points:rect(-.8,6.5,-20.2,-6.3)},entryHole={points:rect(-18.5,-13,-4.8,.8)};
 const approach=at(-22.5,-2),low=terrainHeight(approach.x,approach.z)+.22;
 const floorRL=Math.max(low+1.8,...Array.from({length:15},(_,i)=>Array.from({length:25},(_,j)=>{const p=at(-3.2+12.8*i/14,-22.8+23.8*j/24);return terrainHeight(p.x,p.z)+.18;})).flat()),floor=floorRL-base;
 const stair={a:at(-21.7,-2),b:at(-18.1,-2),width:5.6,count:12,h0:low+.015,h1:floorRL+.015};
 const stairTreads=Array.from({length:stair.count},(_,i)=>{const p=(t,side)=>at(-21.7+3.6*t,-2+stair.width/2*side);return {points:[p(i/12,-1),p((i+1)/12,-1),p((i+1)/12,1),p(i/12,1)],rl:stair.h0+(stair.h1-stair.h0)*i/stair.count+.05};});
 const landing={points:rect(-18.1,-13,-4.8,.8)},apron={points:rect(-23.4,-21.7,-5,.95)};
 const entryArrival=at(-24.5,-2),arrival=at(-43,18),target=at(-8,-5),courtArrival=at(3,-3.5),courtTarget=at(2.8,-17.8);
 const trees=[[-20.2,-23],[-20.2,-12],[-20.2,8]].map(([u,v],i)=>({...at(u,v),u,v,height:7.2+i*.35,radius:.13,reconstructed:true}));
 const garden=[{points:rect(-3.05,-1.15,-21.2,-7.0)},{points:rect(7.2,9.45,-21.2,-7.0)}],magnolia={...at(-1.7,-18.1),u:-1.7,v:-18.1,height:7.0,radius:.16,reconstructed:true};
 const columns=[...[-21.8,-14.8,-7.8,.1].flatMap(v=>[-2.35,8.7].map(u=>({...at(u,v),u,v}))),...[[1,-5.6],[6.2,-5.6]].map(([u,v])=>({...at(u,v),u,v}))];
 const pergola={u0:-.8,u1:6.5,v0:-20.2,v1:-6.3,height:3.0,posts:[[-.7,-20.1],[6.4,-20.1],[-.7,-6.4],[6.4,-6.4]].map(([u,v])=>({...at(u,v),u,v,radius:.11}))};
 const heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z);
 return {frame,at,local,rect,base,court,deck,entryHole,low,floor,floorRL,podium:6.45,wingRoof:25.8,maximum:27,upperRows:6,stair,stairTreads,landing,apron,arrival,target,entryArrival,courtArrival,courtTarget,trees,garden,magnolia,columns,pergola,heading:heading(arrival,target),entryHeading:Math.atan2(frame.u.x,-frame.u.z),courtHeading:heading(courtArrival,courtTarget),reconstructed:true};
}
const frame=warraneGeometry().frame;
export function inWarraneGround(x,z){const u=(x-frame.x)*frame.u.x+(z-frame.z)*frame.u.z,v=(x-frame.x)*frame.v.x+(z-frame.z)*frame.v.z;return u>-22&&u<18&&v>-32&&v<32;}
