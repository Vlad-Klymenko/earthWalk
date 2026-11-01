import { orientedFrame, framePoint } from './geometry.js';

// Photograph-led details, expressed in the same world-metre frame as OSM.
// These are reconstructions, not surveyed building parts. Overall tagged heights
// remain unchanged. The 11 m curtain wall is stated by the original architect.
export const NIDA_REFERENCE='https://www.hassellstudio.com/conversation/nida-21-years-in-the-limelight';
export function theatreGeometry(building){
  const front=[building.points[4],building.points[3]];
  const drum={x:-307,z:-182,radius:19.5,height:building.height};
  const opening=Array.from({length:64},(_,i)=>({x:drum.x+Math.cos(i/64*Math.PI*2)*(drum.radius+.45),z:drum.z+Math.sin(i/64*Math.PI*2)*(drum.radius+.45)}));
  const roofHeight=p=>10.05+Math.max(0,Math.min(1,(p.x+344)/86))*.95;
  return {front,drum,opening,roofHeight,curtainWallHeight:11,source:NIDA_REFERENCE};
}

export function newCollegeRoof(building){
  const frame=orientedFrame(building.points);
  const eave=building.height-3.25,clerestory=building.height-.72;
  return {frame,eave,clerestory,ridge:building.height,
    vertex:(x,z,y)=>{const p=framePoint(frame,x,z);return [p.x,y,p.z];}};
}
