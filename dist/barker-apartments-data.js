import { orientedFrame, framePoint } from './geometry.js?v=76d2b31977e7';
import { buildingBase, terrainHeight } from './terrain.js?v=76d2b31977e7';
export const BARKER_APARTMENTS_ID='osm-way-45561234';
// Five retained OSM footway sections locate the existing Gate 15 thoroughfare.
export const BARKER_PASSAGE_PATH=[{x:28.356,z:207.023},{x:30.866,z:189.977},{x:31.835,z:182.66},{x:32.988,z:174.02},{x:33.966,z:166.637},{x:34.188,z:164.202},{x:34.52,z:160.555}];
export function barkerApartmentsGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points),arrival=BARKER_PASSAGE_PATH[0],target=BARKER_PASSAGE_PATH.at(-1);
  // Existing angular roofs are corroborated by the 2025 design report's site
  // context. Ridge positions / pitches remain reconstructed within the 12 m tag.
  const roofAt=p=>{const u=(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,phase=((u+61.1)%14.4+14.4)%14.4;return b.height-2.05*Math.abs(phase-7.2)/7.2;};
  const passageBottom=points=>Math.max(...points.map(p=>terrainHeight(p.x,p.z)))+3.2-base;
  const courtyardViews=[framePoint(frame,-44,1.2),framePoint(frame,44,1.2)];
  return {frame,base,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),roofAt,passageBottom,courtyardViews,reconstructed:true};
}
