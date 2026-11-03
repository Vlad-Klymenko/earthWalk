import {CAMPUS} from './campus-data.js?v=7fad9d71f5fd';
import {terrainHeight,buildingBase} from './terrain.js?v=7fad9d71f5fd';
import {orientedFrame,framePoint,frameRectangle,clipFrameStrip} from './geometry.js?v=7fad9d71f5fd';
import {UNSW_GIS_LABEL_EVIDENCE} from './unsw-gis-evidence.js?v=7fad9d71f5fd';

export const BANK_ID='osm-way-45230422';
export const BANK_STEPS_ID='osm-way-606543940';
export const BANK_SOURCE={title:'UNSW · ADA x Health at The Bank (F22), 2023',url:'https://www.unsw.edu.au/arts-design-architecture/our-research/ada-x-health',photo:'https://www.unsw.edu.au/content/unsw-sites/au/en/arts-design-architecture/our-research/ada-x-health/_jcr_content/root/responsivegrid-layout-fixed-width/responsivegrid-full-top/column_layout_2084041220/par_2_1_50/image.coreimg.jpeg/1757670452836/2023-10-ada-x-health-the-bank.jpeg'};
export const BANK_GIS=UNSW_GIS_LABEL_EVIDENCE.find(p=>p.code==='F22');

// Only the outline / path centrelines are mapped. The entry is fitted to the
// northern source notch: its photograph orientation, levels and details are
// reconstructions, not an as-built survey or accessibility specification.
export function bankGeometry(b=CAMPUS.buildings.find(b=>b.id===BANK_ID)){
 const frame=orientedFrame(b.points,{x:-.16,z:.987}),at=(u,v)=>framePoint(frame,u,v),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
 const rectangle=(u0,u1,v0,v1)=>frameRectangle(frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2);
 const base=buildingBase(b.points),sourceStair=CAMPUS.paths.find(p=>p.id===BANK_STEPS_ID),[a,c]=sourceStair.points;
 const start=at(4.45,-14),low=Math.max(terrainHeight(a.x,a.z),terrainHeight(start.x,start.z))+.24,high=low+.96,mid=low+.48;
 const stair={a,b:c,width:sourceStair.width,count:6,h0:low-.045,h1:high-.045,pathId:BANK_STEPS_ID};
 const normal={x:(c.z-a.z)/Math.hypot(c.x-a.x,c.z-a.z),z:-(c.x-a.x)/Math.hypot(c.x-a.x,c.z-a.z)};
 const stairTreads=Array.from({length:stair.count},(_,i)=>{const p=(t,side)=>({x:a.x+(c.x-a.x)*t+normal.x*side*stair.width/2,z:a.z+(c.z-a.z)*t+normal.z*side*stair.width/2});return {points:[p(i/6,-1),p(i/6,1),p((i+1)/6,1),p((i+1)/6,-1)],rl:low+i*.16+.015};});
 const ramp=(u0,u1,v,y0,y1)=>({points:rectangle(Math.min(u0,u1),Math.max(u0,u1),v-.65,v+.65),heightAt:(x,z)=>{const u=local({x,z}).u,t=Math.max(0,Math.min(1,(u-u0)/(u1-u0)));return y0+(y1-y0)*t;},reconstructed:true});
 const rampParts=[ramp(4.45,-2.95,-12.7,low,mid),{points:rectangle(-3.95,-2.55,-13.35,-10.5),heightAt:()=>mid,reconstructed:true},ramp(-2.95,4.45,-11.15,mid,high)];
 const landing={points:rectangle(-2.95,8.85,-10.5,-9.35),heightAt:()=>high,reconstructed:true};
 // A short graded connector meets the original northern path without a step.
 const topApron={points:rectangle(4.45,5.5,-11.8,-9.35),heightAt:()=>high,reconstructed:true};
 const approach={points:rectangle(3.8,5.1,-14.1,-12.05),heightAt:(x,z)=>Math.max(terrainHeight(x,z)+.22,low),reconstructed:true};
 const rampRails=[{u0:3.8,u1:-2.95,v:-13.38,y0:low+.0422,y1:mid},{u0:3.8,u1:-2.3,v:-12.02,y0:low+.0422,y1:mid-.0422},{u0:-2.3,u1:4.45,v:-11.83,y0:mid,y1:high}];
 // Full roof perimeter stays intact; the occupied west wall is inset to leave
 // the complete mapped Library-side footway clear below the roof edge.
 const room=clipFrameStrip(b.points,{...frame,v:frame.u},-7.05,100);
 const arrival=at(11,-19),target=at(0,-10),rampArrival=at(4.45,-14.35),stairArrival=at(7.25,-16);
 return {frame,at,local,rectangle,base,roof:6.4,fascia:5.82,room,low,high,mid,entryFloor:high-base,stair,stairTreads,rampParts,rampRails,landing,topApron,approach,arrival,target,rampArrival,stairArrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),entryHeading:Math.atan2(frame.v.x,-frame.v.z),reconstructed:true};
}
const frame=bankGeometry().frame;
export function inBankForecourt(x,z){const u=(x-frame.x)*frame.u.x+(z-frame.z)*frame.u.z,v=(x-frame.x)*frame.v.x+(z-frame.z)*frame.v.z;return u>-8&&u<10&&v>-15&&v<-9;}
