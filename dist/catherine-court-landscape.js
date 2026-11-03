import {terrainHeight} from './terrain.js?v=e9883400adb4';
import {CATHERINE_PATTERN as P} from './catherine-court-data.js?v=e9883400adb4';
import {CATHERINE_GROUND,CATHERINE_SOIL,CATHERINE_CURBS,CATHERINE_BENCHES} from './catherine-court-parts.js?v=e9883400adb4';
const inRing=(x,z,ring)=>{let inside=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++)if((ring[i].z>z)!==(ring[j].z>z)&&x<(ring[j].x-ring[i].x)*(z-ring[i].z)/(ring[j].z-ring[i].z)+ring[i].x)inside=!inside;return inside;};
export const inCatherinePart=(x,z,p)=>inRing(x,z,p.points)&&!(p.holes||[]).some(r=>inRing(x,z,r));
export const inCatherineCourt=(x,z)=>CATHERINE_GROUND.some(p=>inCatherinePart(x,z,p));
const benchSurfaces=CATHERINE_BENCHES.flatMap(b=>b.surfaces);
export function catherineCourtHeight(x,z,referenceY=-Infinity){
 if(!inCatherineCourt(x,z))return undefined;
 const offset=CATHERINE_SOIL.some(p=>inCatherinePart(x,z,p))?P.soilOffset:CATHERINE_CURBS.some(p=>inCatherinePart(x,z,p))?P.curbOffset:P.pavingOffset;
 const raised=benchSurfaces.filter(p=>referenceY>=p.minimumY&&inCatherinePart(x,z,p));
 return raised.length?Math.max(...raised.map(p=>p.height)):terrainHeight(x,z)+offset;
}
