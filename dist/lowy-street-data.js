import {CAMPUS as RAW} from './campus-data.js?v=eb4acc4e0f1c';
import {medicalGeometry} from './medical-data.js?v=eb4acc4e0f1c';
import {lowyFacadeFaces,LOWY_ID} from './lowy-facade-data.js?v=eb4acc4e0f1c';
import {framePoint} from './geometry.js?v=eb4acc4e0f1c';
export const LOWY_STREET_BUILDING=RAW.buildings.find(b=>b.id===LOWY_ID);
export const LOWY_STREET_GEOMETRY=medicalGeometry(LOWY_STREET_BUILDING);
export const LOWY_STREET_FRAME=LOWY_STREET_GEOMETRY.frame;
export const lowyStreetLocal=LOWY_STREET_GEOMETRY.local;
export const lowyStreetPoint=(u,v)=>framePoint(LOWY_STREET_FRAME,u,v);
export const LOWY_STREET_FACE=lowyFacadeFaces().find(f=>f.nv<-.99&&f.length>60);
export const LOWY_STREET={beam:5.1,recess:1.15,taperBaseU:-33,taperTopU:lowyStreetLocal(LOWY_STREET_FACE.a).u,cutV:-10.615766395,collisionSlice:.2,reconstructed:true,note:'Photo-fitted High Street recessed base and west-end tapered underside. Dimensions and fine levels are estimates; original mapped footprint and 32 m height remain separate.'};
export const LOWY_STREET_WINDOW={start:.28,end:.86,bottom:22.6,top:27.7,frame:.28,projection:1.45,glass:.12,panePitch:1.05,reconstructed:true};
export const LOWY_NORTH_BOX={bottom:17.8,top:28.4,frame:.35,projection:.75,glass:.10,rows:2,reconstructed:true};
export function lowyStreetBottom(p){const u=lowyStreetLocal(p).u;return LOWY_STREET.beam*Math.max(0,Math.min(1,(LOWY_STREET.taperBaseU-u)/(LOWY_STREET.taperBaseU-LOWY_STREET.taperTopU)));}
export function lowyStreetFeature(face){
 const a=lowyStreetLocal(face.a),c=lowyStreetLocal(face.c),u=(a.u+c.u)/2,v=(a.v+c.v)/2;
 if(face.nu<-.95&&u>-35&&u<-31&&v>-10&&v<-3)return 'west-core-glass';
 if(face.nv>.9&&u<-35&&v<-9)return 'west-core-return';
 if(face.nv<-.99&&face.length>60)return 'north-wall';
 if(face.nu<-.95&&u<-37&&v>3&&face.length>6)return 'west-screen';
 if(u<-35&&v>3&&v<7&&face.nv<-.7)return 'west-screen-side';
 if(u>31&&v<-26&&face.nv<-.8&&face.length>4)return 'north-box';
 return null;
}
const view=(id,name,u,v,tu,tv,pitch,description)=>{const p=lowyStreetPoint(u,v),target=lowyStreetPoint(tu,tv);return {id,name,code:'C25',kind:'academic',...p,heading:Math.atan2(target.x-p.x,p.z-target.z),pitch,showSign:false,description};};
export const LOWY_STREET_VIEWS=[
 view('lowy-high-street-window','Lowy · High Street laboratory window',-8,-44,-8,-22,.53,'Deep pale frame, recessed glazing and tall narrow service louvres follow built architect photographs and the northern elevation. Original 32 m mapped maximum retained; fine facade dimensions reconstructed'),
 view('lowy-tapered-plinth','Lowy · tapered street plinth',-44,-23,-36,-20,.03,'Recessed High Street base and sloping west-end concrete underside. Visible surface and conservative collision slices share the same photo-fitted taper; dimensions are estimates above retained DEM terrain'),
 view('lowy-west-framed-screen','Lowy · western framed screen',-49,18,-38,8,.48,'Separate western green frame with dark vertical shading, pale service core and low glazed base, observed in the architect courtyard photo. Frame and blade dimensions are reconstructed'),
 view('lowy-north-green-box','Lowy · High Street green box',35,-42,33,-27,.65,'Small upper green projecting box beside the pale service core and Wallace Wurth. Photo-fitted recess, frame and pane divisions; source outline and map height remain unchanged')
];

export const LOWY_WEST_POST={...lowyStreetPoint(-38.8,10.8),radius:.24,top:LOWY_STREET.beam,reconstructed:true,note:'Single round support fitted to the built western courtyard photograph; exact position and section estimated'};
