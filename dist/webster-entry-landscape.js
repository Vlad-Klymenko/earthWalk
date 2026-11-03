import {WEBSTER_FLOORS,WEBSTER_GROUND} from './webster-entry-parts.js?v=4ebc60430f42';
import {websterSurfaceRL,WEBSTER_ENTRY} from './webster-entry-data.js?v=4ebc60430f42';
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const contains=(p,q)=>inside(p,q.points)&&!(q.holes||[]).some(h=>inside(p,h));
// The surrounding terrain renderer retains its original height function.
// Only walking inside the exactly clipped exterior adopts these fitted levels.
export function websterWalkingHeight(x,z){const p={x,z};if(!WEBSTER_GROUND.some(q=>contains(p,q)))return undefined;const floor=WEBSTER_FLOORS.find(q=>contains(p,q));return floor?websterSurfaceRL(floor,p):WEBSTER_ENTRY.middleRL;}
