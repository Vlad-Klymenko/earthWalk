import { orientedFrame, framePoint, clipFrameStrip } from './geometry.js?v=4f63f148a8ac';
import { buildingBase, terrainHeight } from './terrain.js?v=4f63f148a8ac';
export const REX_ID='osm-way-280411955',REX_LINK_ID='osm-way-45230027',SDN_ID='osm-way-45561523';
export const REX_VISUAL_HEIGHT=5.8,SDN_VISUAL_HEIGHT=4.7;
export const SDN_CURRENT_NAME='SDN Kensington at UNSW Sydney';
export const SDN_RENAME_SOURCE={title:'SDN official centre history · renamed 2 June 2025',url:'https://www.sdn.org.au/about-sdn/sdn-history/beginnings-of-sdn-kensington-at-unsw/'};
export function rexGeometry(b,link){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const roofAt=p=>{const v=(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z;return REX_VISUAL_HEIGHT-.2-.35*(v+frame.length/2)/frame.length;};
  // Reconstructed canopy in the actual gap between the retained F17 and G17
  // boundaries. Its route is separate from the occupied theatre footprint.
  const bridge={points:link.points,holes:link.holes||[],reconstructed:true};
  bridge.base=buildingBase(link.points);
  bridge.roofRL=Math.max(...bridge.points.map(p=>terrainHeight(p.x,p.z)))+3.15;
  const bridgeArrival={x:266.1,z:-20.7},bridgeTarget={x:286.5,z:-18.1};
  const arrival={x:290,z:-22.5},target={x:277,z:-21};
  return {frame,base,roofAt,bridge,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),bridgeArrival,bridgeTarget,bridgeHeading:Math.atan2(bridgeTarget.x-bridgeArrival.x,bridgeArrival.z-bridgeTarget.z),reconstructed:true};
}
export function sdnGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points),east=7.2,verandaV=5;
  const wing=clipFrameStrip(b.points,{...frame,v:frame.u},east,100),west=clipFrameStrip(b.points,{...frame,v:frame.u},-100,east);
  const hall=clipFrameStrip(west,frame,verandaV,100),veranda=clipFrameStrip(west,frame,-100,verandaV);
  const regions=[{kind:'wing',points:wing},{kind:'hall',points:hall},{kind:'veranda',points:veranda}].map(p=>({...p,floor:buildingBase(p.points)-base,reconstructed:true}));
  const roofAt=(p,kind)=>{const u=(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v=(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z;
    const floor=regions.find(r=>r.kind===kind).floor;
    return kind==='wing'?SDN_VISUAL_HEIGHT-.21*Math.abs(u-12.6):kind==='hall'?floor+3.2-.05*Math.abs(v-10.7):floor+2.8+(v-1)*.025;};
  const yard=[framePoint(frame,-16.9,-17.5),framePoint(frame,7.3,-17.5),framePoint(frame,7.3,1),framePoint(frame,-16.9,1)];
  const fences=[{a:yard[0],b:yard[1]},{a:yard[3],b:yard[0]}];
  const arrival=framePoint(frame,0,-25),target=framePoint(frame,6,-1),signEdge=[framePoint(frame,10.2,-16.83),framePoint(frame,14.1,-16.83)];
  const trees=[{...framePoint(frame,-9,-5.5),height:6.8},{...framePoint(frame,3,-11),height:5.5}].map((p,i)=>({...p,id:`sdn-reconstructed-garden-tree-${i}`,form:'sdn-garden',reconstructed:true,source:'sdn-garden-photo'}));
  return {frame,base,regions,roofAt,yard,fences,trees,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),signEdge,reconstructed:true};
}
