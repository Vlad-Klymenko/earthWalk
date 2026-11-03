import { orientedFrame, framePoint } from './geometry.js?v=08020e70591f';
import { NIDA_PARTS } from './nida-parts.js?v=08020e70591f';

// Photograph-led details, expressed in the same world-metre frame as OSM.
// Roof pitch is reconstructed; the D-shaped theatre outline / heights now use
// actual OSM parts. The original 12 m overall tag remains separately retained.
// The 11 m curtain wall is stated by the original architect.
export const NIDA_REFERENCE='https://www.hassellstudio.com/conversation/nida-21-years-in-the-limelight';
export function theatreGeometry(building){
  const front=[building.points[4],building.points[3]];
  const drum=NIDA_PARTS.find(p=>p.osmId===609912640);
  const centre=drum.points.reduce((s,p)=>({x:s.x+p.x/drum.points.length,z:s.z+p.z/drum.points.length}),{x:0,z:0});
  const opening=drum.points.map(p=>({x:centre.x+(p.x-centre.x)*1.025,z:centre.z+(p.z-centre.z)*1.025}));
  const roofHeight=p=>10.05+Math.max(0,Math.min(1,(p.x+344)/86))*.95;
  return {front,drum,opening,roofHeight,curtainWallHeight:11,source:NIDA_REFERENCE};
}

export function newCollegeRoof(building){
  const frame=orientedFrame(building.points);
  const eave=building.height-3.25,clerestory=building.height-.72;
  return {frame,eave,clerestory,ridge:building.height,
    vertex:(x,z,y)=>{const p=framePoint(frame,x,z);return [p.x,y,p.z];}};
}
