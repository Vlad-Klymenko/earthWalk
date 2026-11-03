import {CAMPUS as RAW} from './campus-data.js?v=bc9eb748a7cf';
import {orientedFrame,framePoint,clipFrameStrip} from './geometry.js?v=bc9eb748a7cf';
import {terrainHeight,buildingBase} from './terrain.js?v=bc9eb748a7cf';
export const DALTON_ID='dalton';
export const DALTON_ART_SOURCE='https://www.unsw.edu.au/estate/about-us/public-art';
export const DALTON_ART_CATALOGUE='https://artcollection.unsw.edu.au/collection/items/2010212159_052144.html';
export const DALTON_COMMONS_SOURCE='https://nbrs.com.au/projects/unsw-teaching-commons';
export const DALTON_MOSAIC={artist:'Douglas Annand',catalogueDate:1958,installed:1960,commissioned:1957,width:5.68,height:3.675,count:4,medium:'glass tile mosaic',source:DALTON_ART_CATALOGUE,note:'Catalogue measures each of four faces at 367.5 × 568 cm. Signed 1958, installed January 1960 according to the university. Two complete photographs and two detail views guide simplified procedural reconstructions. Exact tesserae, unseen compositions, orientation and duct positions are not surveyed.'};
const source=RAW.buildings.find(b=>b.id===DALTON_ID);
export const DALTON_FRAME=orientedFrame(source.points);
export const daltonPoint=(u,v)=>framePoint(DALTON_FRAME,u,v);
export const daltonLocal=p=>({u:(p.x-DALTON_FRAME.x)*DALTON_FRAME.u.x+(p.z-DALTON_FRAME.z)*DALTON_FRAME.u.z,v:(p.x-DALTON_FRAME.x)*DALTON_FRAME.v.x+(p.z-DALTON_FRAME.z)*DALTON_FRAME.v.z});
const f=DALTON_FRAME,v0=f.length/2-18,points=clipFrameStrip(source.points,f,v0,f.length/2+.001),floor=Math.max(...points.map(p=>terrainHeight(p.x,p.z)))+.22;
export const DALTON_COMMONS={points,v0,v1:f.length/2,floor,ceiling:floor+4.05,base:buildingBase(source.points),ductU:-1.8,ductThickness:.42,ductCentres:[v0+4.35,v0+12.35],reconstructed:true,note:'2023 Teaching Commons enclosure and furniture follow NBRS/UNSW photos. Floor, ceiling, supports, duct coordinates, screen waveform and furniture positions are fitted; source footprint / 15 m height/three-level tags remain. Retained university GIS independently reports 14.87 m/four floors, without component/base definitions. Closed glass doors remain exterior boundaries.'};
export const DALTON_PANELS=[['blue',0,-1,'full'],['burst',1,-1,'full'],['spindles',0,1,'detail'],['orb',1,1,'detail']].map(([motif,duct,side,reference])=>({id:'dalton-annand-'+motif,motif,duct,side,reference,u:DALTON_COMMONS.ductU+side*(DALTON_COMMONS.ductThickness/2+.008),v:DALTON_COMMONS.ductCentres[duct],bottom:floor+.08,width:DALTON_MOSAIC.width,height:DALTON_MOSAIC.height,reconstructed:true}));
export function daltonFacadeSpans(a,b){
 const av=daltonLocal(a).v,bv=daltonLocal(b).v,t=(v0-av)/(bv-av),cuts=t>0&&t<1?[0,t,1]:[0,1];return cuts.slice(1).map((hi,i)=>{const lo=cuts[i],middle=av+(bv-av)*(lo+hi)/2;return {a:{x:a.x+(b.x-a.x)*lo,z:a.z+(b.z-a.z)*lo},b:{x:a.x+(b.x-a.x)*hi,z:a.z+(b.z-a.z)*hi},commons:middle>v0-1e-6};});
}
// Three-sided hanging screen; dimensions/waveform reconstructed from photos.
export const DALTON_SCREEN=[];
for(const side of [-1,1])for(let v=v0+.35;v<f.length/2-.35;v+=.16){const t=(v-v0)/18,length=.62+1.65*(.5+.5*Math.sin(t*Math.PI*2+side*.6));DALTON_SCREEN.push({u:side*(f.width/2-.37),v,top:DALTON_COMMONS.ceiling-.05,bottom:DALTON_COMMONS.ceiling-.05-length,width:.035});}
for(let u=-f.width/2+.35;u<f.width/2-.35;u+=.16){const t=(u/f.width+.5),length=.62+1.55*(.5+.5*Math.cos(t*Math.PI*2));DALTON_SCREEN.push({u,v:f.length/2-.37,top:DALTON_COMMONS.ceiling-.05,bottom:DALTON_COMMONS.ceiling-.05-length,width:.035});}
export const DALTON_MEETING_TABLES=[{u:2.7,v:v0+4.4,width:2.3,length:.85},{u:2.7,v:v0+6.1,width:2.3,length:.85},{u:4.7,v:v0+5.25,width:.85,length:2.5},{u:2.7,v:v0+12.1,width:2.3,length:.85},{u:4.7,v:v0+12.1,width:.85,length:2.5}];
export const DALTON_LOUNGE_CHAIRS=[{u:-5.15,v:v0+3.8,yaw:1.2},{u:-4.6,v:v0+6.1,yaw:-1},{u:-5.15,v:v0+11.6,yaw:1.2},{u:-4.6,v:v0+14.0,yaw:-1}];
const heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z),west=daltonPoint(-f.width/2-2.25,v0+5),east=daltonPoint(f.width/2+2.25,v0+12),targetW=daltonPoint(DALTON_COMMONS.ductU,v0+4.35),targetE=daltonPoint(DALTON_COMMONS.ductU,v0+12.35);
export const DALTON_COMMONS_VIEWS=[{id:'dalton-annand-west',name:'Dalton · Annand mosaics through western glass',...west,heading:heading(west,targetW),pitch:.02},{id:'dalton-commons-east',name:'Dalton Teaching Commons · eastern glass',...east,heading:heading(east,targetE),pitch:.02}].map(p=>({...p,code:'F12',kind:'artwork',showSign:false,description:'F12 · Clear Teaching Commons enclosure with Douglas Annand’s four glass-mosaic faces, warm hanging timber screen, green lounge chairs and meeting tables. Catalogue panels 5.68 × 3.675 m; fine artwork, duct positions, screen waveform, furniture and floor/ceiling levels are photo-fitted reconstructions. Exterior viewing only; closed interiors remain boundaries'}));
