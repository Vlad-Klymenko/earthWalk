import {CAMPUS as RAW} from './campus-data.js?v=e9883400adb4';
import {redCentreGeometry,RED_CENTRE_FRAME} from './red-centre-data.js?v=e9883400adb4';
import {framePoint} from './geometry.js?v=e9883400adb4';
export const LAWRENCE_SCREEN_SOURCE='https://fjcstudio.com/projects/red-centre/';
export const LAWRENCE_WEST_SCREEN={pitch:.58,rootOffset:.20,depth:.68,lower:6.2,upper:34.5,bands:[[6.35,15.45],[15.70,24.75],[25.00,34.35]],reconstructed:true};
const raw=RAW.buildings.find(b=>b.id==='red-centre-west');
const sourceFaces=redCentreGeometry(raw).faces.filter(f=>!f.north&&f.mid.u< -64&&f.len>7);
const same=(a,c)=>Math.hypot(a.x-c.x,a.z-c.z)<1e-6;
export const isLawrenceWestScreenFace=(a,c)=>sourceFaces.some(f=>same(a,f.a)&&same(c,f.c)||same(a,f.c)&&same(c,f.a));
export function lawrenceWestEndGeometry(b=raw){
 const g=redCentreGeometry(b),P=LAWRENCE_WEST_SCREEN;
 const screens=g.faces.filter(f=>isLawrenceWestScreenFace(f.a,f.c)).map(f=>{
  const tx=(f.c.x-f.a.x)/f.len,tz=(f.c.z-f.a.z)/f.len,point=(s,y,d=0)=>[f.a.x+tx*s+f.n.x*d,y,f.a.z+tz*s+f.n.z*d],count=Math.max(1,Math.floor((f.len-.6)/P.pitch)),pitch=(f.len-.6)/count;
  // Original shallow folded blade, fitted to the overall screen character.
  // No fabrication profile or photograph texture is copied.
  const section=[[-.025,0],[-.07,.58],[-.015,.68],[.045,.60],[.025,0]].map(([s,d])=>({s:s-d*.15,d:P.rootOffset+d}));
  const fins=Array.from({length:count},(_,i)=>{const s=.3+(i+.5)*pitch;return {s,section,points:section.map(p=>{const q=point(s+p.s,0,p.d);return {x:q[0],z:q[2]};}),reconstructed:true};});
  return {...f,tx,tz,point,fins,pitch,bands:P.bands.map(([bottom,top])=>({bottom,top,reconstructed:true})),reconstructed:true};
 });
 return {...g,screens};
}
const arrival=framePoint(RED_CENTRE_FRAME,-97.5,-22.5),target=framePoint(RED_CENTRE_FRAME,-74.5,-3.5);
export const LAWRENCE_WEST_END_VIEW={id:'lawrence-western-screen',name:'Lawrence Centre · western screen',code:'H13',kind:'viewpoint',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:.40,showSign:false,description:'The Anita B. Lawrence Centre / former Red Centre west end beside Newton: three fitted fields of pale folded blades, dark carrier frames and finer glazed return. FJC photographs and dated Newton context identify this volume; it is separate from Hilmer farther north. Screen profile, pitch, band levels, materials and frame details are estimates; original footprints and building height tags remain'};
