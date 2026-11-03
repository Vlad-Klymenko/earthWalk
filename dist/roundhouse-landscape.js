import { CAMPUS } from './campus-data.js?v=0dd17659ccd5';
import { roundhouseGeometry } from './roundhouse-data.js?v=0dd17659ccd5';
import { terrainHeight } from './terrain.js?v=0dd17659ccd5';
export const ROUNDHOUSE_LANDSCAPE_SOURCE='https://www.arc.unsw.edu.au/roundhouse/about/roundhouse-blog/roundhouse-exterior-renovations';
const g=roundhouseGeometry(CAMPUS.buildings.find(b=>b.id==='roundhouse'));
export const roundDisc=(p,r,n=64)=>Array.from({length:n},(_,i)=>({x:p.x+Math.cos(i*Math.PI*2/n)*r,z:p.z+Math.sin(i*Math.PI*2/n)*r}));
// Photo-led positions and dimensions, not mapped trees or surveyed furniture.
// The photographed plane tree is distinct from the 30 m figs in Arc's text.
const p=g.at(42*Math.PI/180,47);
export const ROUNDHOUSE_PLANE={...p,base:terrainHeight(p.x,p.z)+.22,height:21,radius:4.2,innerRadius:3.45,seatHeight:.46,form:'plane',reconstructed:true,source:ROUNDHOUSE_LANDSCAPE_SOURCE};
export const ROUNDHOUSE_GARDEN_SEATS=[72,100].map(deg=>{const p=g.at(deg*Math.PI/180,32.7);return {...p,angle:deg*Math.PI/180,base:terrainHeight(p.x,p.z)+.22,radius:.8,height:4.4,reconstructed:true};});
// Suppress only invented procedural trees inside this reconstructed forecourt.
export function inRoundhouseForecourt(x,z){const r=Math.hypot(x-g.center.x,z-g.center.z),a=Math.atan2(z-g.center.z,x-g.center.x)*180/Math.PI;return a>24&&a<120&&r>28&&r<55;}
