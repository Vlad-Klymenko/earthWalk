import { CAMPUS as SOURCE } from './campus-data.js?v=ef86122637ee';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=ef86122637ee';
import { buildingBase } from './terrain.js?v=ef86122637ee';
export const BLOCKHOUSE_ID='blockhouse';
export const BLOCKHOUSE_PHOTO={url:'https://www.learningenvironments.unsw.edu.au/physical-spaces/k-g6',title:'UNSW Learning Environments · Blockhouse exterior'};
export const BLOCKHOUSE_FRAME=orientedFrame(SOURCE.buildings.find(b=>b.id===BLOCKHOUSE_ID).points,{x:-.16,z:1});
export function blockhouseGeometry(b){
 const frame=BLOCKHOUSE_FRAME,base=buildingBase(b.points),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
 const route=SOURCE.paths.find(p=>p.id==='osm-way-280268493');
 const southRecess={points:frameRectangle(frame,64,3.4,-2,7.5),ceiling:3.8,reconstructed:true};
 const core={points:frameRectangle(frame,3.8,7,1.1,-5.5),top:b.height,bounds:{u0:-.8,u1:3,v0:-9,v1:-2},reconstructed:true};
 const canopy={points:frameRectangle(frame,74.5,8.5,-.1,-8.6),bottom:3.72,top:3.95,reconstructed:true};
 const apron=frameRectangle(frame,75,4.6,0,11.0);
 const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z),arrival=framePoint(frame,17,30),target=framePoint(frame,-2,5),northArrival=framePoint(frame,15,-17),northTarget=framePoint(frame,-5,-5);
 const passageArrival=framePoint(frame,-26.2,16),passageTarget=framePoint(frame,-25.5,-14),arcadeArrival=framePoint(frame,28,-8),arcadeTarget=framePoint(frame,11,-8);
 const hedges=[[-35.1,13.9,4],[-16,13.9,15],[6,13.9,17],[25,13.9,8],[34.4,13.9,4]].map(([u,v,width])=>({...framePoint(frame,u,v),u,v,width,points:frameRectangle(frame,width,.7,u,v),reconstructed:true}));
 const trees=[[-15,24,14],[25,22,13]].map(([u,v,height])=>({...framePoint(frame,u,v),u,v,height,form:'heritage-fig',reconstructed:true}));
 return {frame,base,local,route,southRecess,core,canopy,apron,hedges,trees,roof:11.8,rows:[{low:4.15,high:7.4},{low:8.1,high:11.35}],passageCeiling:3.8,passageWidth:3.8,arrival,target,heading:heading(arrival,target),northArrival,northTarget,northHeading:heading(northArrival,northTarget),passageArrival,passageTarget,passageHeading:heading(passageArrival,passageTarget),arcadeArrival,arcadeTarget,arcadeHeading:heading(arcadeArrival,arcadeTarget),reconstructed:true};
}
// Only generated trees are suppressed in the reconstructed southern forecourt.
export function inBlockhouseForecourt(x,z){const f=BLOCKHOUSE_FRAME,u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z;return u>-40&&u<40&&v>12&&v<32;}
