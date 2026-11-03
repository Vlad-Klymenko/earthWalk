import {SCIENTIA as S,scientiaPoint,scientiaRoofPoint,scientiaRectangle} from './scientia-data.js?v=edb7a7e79d1b';
import {SCIENTIA_NORTH} from './scientia-parts.js?v=edb7a7e79d1b';
import {terrainHeight} from './terrain.js?v=edb7a7e79d1b';
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const contains=(p,part)=>inside(p,part.points)&&!part.holes.some(h=>inside(p,h));
// Fitted overhead links, with no claim of interior/upper-gallery access.
export const SCIENTIA_LINKS=[10,24].map(u=>({u,...scientiaPoint(u,4.7),points:scientiaRectangle(u-.85,u+.85,0,9.4),bottom:S.podiumRL-.145+(u>20?.7:0),top:S.podiumRL+.205+(u>20?.7:0),rail:S.podiumRL+.9+(u>20?.7:0),reconstructed:true}));
export const SCIENTIA_SOLAR=[];
for(let u=6;u<30;u+=3.3)for(let v=-35;v<-2;v+=2.05){const points=scientiaRectangle(u-1.425,u+1.425,v-.86,v+.86);if(SCIENTIA_NORTH.some(part=>points.every(p=>contains(p,part))))SCIENTIA_SOLAR.push({u,v,...scientiaPoint(u,v),points,width:2.85,depth:1.72,bottom:S.hallRoofRL+.06,top:S.hallRoofRL+.215,reconstructed:true});}
// Fine terrain-following cells avoid a large planar slab across the slope.
export const SCIENTIA_PASSAGE=[];
const ground=(t,s)=>{const p=scientiaRoofPoint(t,s);return {x:p.x,z:p.z,y:terrainHeight(p.x,p.z)+.06};};
for(let i=0;i<36;i++)for(let j=0;j<10;j++)SCIENTIA_PASSAGE.push([ground(i/36,j/10),ground(i/36,(j+1)/10),ground((i+1)/36,(j+1)/10),ground((i+1)/36,j/10)]);
