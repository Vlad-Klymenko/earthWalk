import {OLD_MAIN_MAIN_STAIRS,OLD_MAIN_MAIN_ARRIVAL,OLD_MAIN_WEST_PROFILE} from './old-main-front-data.js?v=916c3fc1320a';
import {OLD_MAIN_EAST_ROWS,OLD_MAIN_SOUTH_LOWER,OLD_MAIN_VISUAL_ROOF} from './old-main-entry-data.js?v=916c3fc1320a';
import { orientedFrame, framePoint } from './geometry.js?v=916c3fc1320a';
import { buildingBase } from './terrain.js?v=916c3fc1320a';
export const OLD_MAIN_ID='osm-way-45490050';
export const OLD_MAIN_PHYSICS={url:'https://newt.phys.unsw.edu.au/jw/maps.html',title:'UNSW Physics · Old Main description and courtyard photographs',describedStoreys:4};
// Original source outline, 24 m maximum and six-level tag remain intact.
// Eastern lower windows use public survey levels. Other bands, the roof,
// entrance plan dimensions and relief geometry remain fitted estimates.
export function oldMainGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const signed=b.points.reduce((s,p,i)=>{const q=b.points[(i+1)%b.points.length];return s+p.x*q.z-q.x*p.z;},0),ring=signed<0?[...b.points].reverse():b.points;
  const faces=ring.map((a,i)=>{const c=ring[(i+1)%ring.length],len=Math.hypot(c.x-a.x,c.z-a.z),normal={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};const q0=b.points[0],q1=b.points[1],same=(p,q)=>Math.hypot(p.x-q.x,p.z-q.z)<1e-6;return {a,c,len,normal,surveyEast:same(a,q0)&&same(c,q1)||same(a,q1)&&same(c,q0)};});
  const relative=p=>({low:p.sill-base,high:p.head-base,basis:p.basis,reconstructed:p.basis.startsWith('estimated')}),eastRows=OLD_MAIN_EAST_ROWS.map(relative),rows=eastRows.map(p=>({...p,basis:'photo-fitted-from-eastern-evidence',reconstructed:true})),southRows=[relative(OLD_MAIN_SOUTH_LOWER),...rows.slice(1)],roof=OLD_MAIN_VISUAL_ROOF.rl-base;
  const stairs=OLD_MAIN_MAIN_STAIRS;
  const arrival=framePoint(frame,-25,63),target=framePoint(frame,8,29),entryArrival=OLD_MAIN_MAIN_ARRIVAL.arrival,entryTarget=OLD_MAIN_MAIN_ARRIVAL.target;
  const westRows=OLD_MAIN_WEST_PROFILE.rows.map(p=>({...relative(p),reconstructed:p.basis.startsWith('estimated')})),westRoof=OLD_MAIN_WEST_PROFILE.roofRL-base;
  const northArrival=framePoint(frame,-40,-35),northTarget=framePoint(frame,-40,8);
  const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
  return {frame,base,local,faces,rows,eastRows,southRows,roof,estimatedRoofRL:OLD_MAIN_VISUAL_ROOF.rl,stairs,westRows,westRoof,westRoofEstimated:true,arrival,target,heading:heading(arrival,target),entryArrival,entryTarget,entryHeading:heading(entryArrival,entryTarget),northArrival,northTarget,northHeading:heading(northArrival,northTarget),reconstructed:true};
}
