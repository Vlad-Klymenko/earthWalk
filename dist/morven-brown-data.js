import { CAMPUS as SOURCE } from './campus-data.js?v=0f1aa578e721';
import { orientedFrame, framePoint } from './geometry.js?v=0f1aa578e721';
import { buildingBase } from './terrain.js?v=0f1aa578e721';
export const MORVEN_ID='osm-relation-2328645-0';
export const MORVEN_PHOTO={url:'https://www.unsw.edu.au/arts-design-architecture/our-schools/education/about-us/contact-us',title:'UNSW School of Education · Morven Brown courtyard'};
export function morvenGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const routes=[{id:'osm-way-301644933',ceiling:4.6},{id:'osm-way-301644935',ceiling:6.8}].map(r=>({...r,points:SOURCE.paths.find(p=>p.id===r.id).points,width:3.8,reconstructed:true}));
  const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z),arrival=framePoint(frame,-10,-9),target=framePoint(frame,10,13);
  const passageViews=[[-8.55,-31,-8.8,0,'north','Morven Brown · northern courtyard passage'],[-9.5,31,-9.2,0,'south','Morven Brown · University Walk passage']].map(([u,v,tu,tv,id,name])=>{const arrival=framePoint(frame,u,v),target=framePoint(frame,tu,tv);return {id:`morven-${id}-passage`,name,arrival,target,heading:heading(arrival,target)};});
  // The source lawn retains its asymmetric diagonal edge. Furniture and the
  // curved canopy are photo-led estimates, not surveyed positions.
  const pool={u:12,v:5,width:4.0,length:5.3,reconstructed:true};
  return {frame,base,local,routes,arrival,target,heading:heading(arrival,target),passageViews,pool,rows:[.55,3.9,7.3,10.7,14.1].map(low=>({low,high:low+2.65})),roof:17.65,reconstructed:true};
}
export function inMorvenCourt(x,z){const b=SOURCE.buildings.find(b=>b.id===MORVEN_ID),f=orientedFrame(b.points,{x:-.16,z:1}),u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z;return u>-19&&u<18.4&&v>-16.8&&v<16.8;}
