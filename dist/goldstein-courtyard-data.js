import { CAMPUS } from './campus-data.js?v=93d09dddcf6c';
import { terrainHeight } from './terrain.js?v=93d09dddcf6c';
import { goldsteinGeometry } from './heritage-data.js?v=93d09dddcf6c';
import { framePoint,frameRectangle } from './geometry.js?v=93d09dddcf6c';
export const GOLDSTEIN_ID='osm-way-71500653';
export const GOLDSTEIN_COURT_ARCHITECT={title:'TKD Architects · Goldstein Hall restoration',url:'https://www.tkda.com.au/projects/university-of-nsw-goldstein-hall/'};
export const GOLDSTEIN_ART={title:'Untitled (six figure group)',artist:'Bert Flugelman',year:1964,material:'cast bronze',height:2.4,width:4.32,depth:.59,heightSource:'reported',source:'https://artcollection.unsw.edu.au/collection/items/201021215140_052164.html',osmId:5332274053,lat:-33.9163551,lon:151.2313472,mappedStartDate:'1965'};
export const GOLDSTEIN_ART_POINT={x:(GOLDSTEIN_ART.lon-CAMPUS.center.lon)*Math.PI/180*6371008.8*Math.cos(CAMPUS.center.lat*Math.PI/180),z:(CAMPUS.center.lat-GOLDSTEIN_ART.lat)*Math.PI/180*6371008.8};
export function goldsteinCourtGeometry(b=CAMPUS.buildings.find(b=>b.id===GOLDSTEIN_ID)){
 const f=goldsteinGeometry(b).frame,local=p=>({u:(p.x-f.x)*f.u.x+(p.z-f.z)*f.u.z,v:(p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z}),s=local(GOLDSTEIN_ART_POINT),lane=CAMPUS.paths.find(p=>p.id==='osm-way-301754221').points[0];
 const low=terrainHeight(lane.x,lane.z)+.22,floor=low+.51,pool={...framePoint(f,s.u,s.v-2.4),width:17.8,depth:5.5,u:s.u,v:s.v-2.4};
 pool.points=frameRectangle(f,pool.width,pool.depth,pool.u,pool.v);pool.waterRL=floor-.17;pool.copingRL=floor+.025;pool.outer=frameRectangle(f,pool.width+.42,pool.depth+.42,pool.u,pool.v);
 const plinth={points:frameRectangle(f,5.5,1.28,s.u,s.v),top:floor+.2,bottom:pool.waterRL-.14};
 const entry={u0:-20.6,u1:-18.95,v:-27.55,width:18.6,low,high:floor,count:3};
 entry.apron={points:frameRectangle(f,1.2,entry.width,-21.2,entry.v),heightAt:p=>{const u=local(p).u,t=Math.max(0,Math.min(1,(u+21.8)/1.2)),base=terrainHeight(p.x,p.z)+.22;return Math.max(base,base+(low-base)*t);}};
 entry.steps=Array.from({length:3},(_,i)=>({points:frameRectangle(f,(entry.u1-entry.u0)/3,entry.width,entry.u0+(i+.5)*(entry.u1-entry.u0)/3,entry.v),rl:low+(i+1)*.17}));
 const court=frameRectangle(f,28,19,-4.95,-27.5),tree={...framePoint(f,-14.15,-26.2),height:12,radius:.38,pit:frameRectangle(f,3.2,3.5,-14.15,-26.2),reconstructed:true};
 const benches=[{u:-13.5,v:-33.1,width:3.4,depth:.72},{u:-6.6,v:-33.1,width:3.4,depth:.72}].map(q=>({...q,...framePoint(f,q.u,q.v),points:frameRectangle(f,q.width,q.depth,q.u,q.v)}));
 const bollards=[[-16.3,-20.7],[7.5,-30.5]].map(([u,v])=>({...framePoint(f,u,v),height:.86,radius:.12}));
 const stair=CAMPUS.paths.find(p=>p.id==='osm-way-301754238'),a=stair.points[0],c=stair.points[1],len=Math.hypot(c.x-a.x,c.z-a.z),u={x:(c.x-a.x)/len,z:(c.z-a.z)/len},v={x:-u.z,z:u.x};
 const stairFrame={x:(a.x+c.x)/2,z:(a.z+c.z)/2,u,v},cheeks=[-1,1].map(side=>({points:frameRectangle(stairFrame,len*.86,.28,0,side*(stair.width/2+.24)),reconstructed:true}));
 const arrival=framePoint(f,-22.7,-27.8),view=framePoint(f,-2.4,-35.3),target=GOLDSTEIN_ART_POINT;
 return {frame:f,local,floor,hallFloor:floor-.1,pool,plinth,entry,court,tree,benches,bollards,cheeks,stair:{a,c,width:stair.width,h0:terrainHeight(a.x,a.z)+.22,h1:terrainHeight(c.x,c.z)+.22},arrival,view,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),viewHeading:Math.atan2(target.x-view.x,view.z-target.z),floorAt:p=>Math.max(floor,terrainHeight(p.x,p.z)+.22),reconstructed:true};
}
const courtFrame=goldsteinCourtGeometry().frame;
export function inGoldsteinCourt(x,z){const u=(x-courtFrame.x)*courtFrame.u.x+(z-courtFrame.z)*courtFrame.u.z,v=(x-courtFrame.x)*courtFrame.v.x+(z-courtFrame.z)*courtFrame.v.z;return u>-19.5&&u<9.5&&v>-38&&v<-17.5;}
