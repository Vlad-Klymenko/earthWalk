import {CAMPUS as RAW} from './campus-data.js?v=26b79da8da82';
import {agsmGeometry} from './eastern-landmarks-data.js?v=26b79da8da82';
import {framePoint} from './geometry.js?v=26b79da8da82';
export const AGSM_FACADE_ID='osm-way-101505149';
export const AGSM_FACADE_BUILDING=RAW.buildings.find(b=>b.id===AGSM_FACADE_ID);
export const AGSM_FACADE=agsmGeometry(AGSM_FACADE_BUILDING);
// Photo-led component levels, not surveyed heights. The source maximum and
// five-level tag are kept separately, including the less visible rear mass.
export const AGSM_MASSING={courtRoof:12.2,upperRoof:16,maximum:20,firstSetback:2.4,secondSetback:7.8,reconstructed:true};
export const AGSM_COURT_BANDS={groundBottom:.45,groundTop:3.65,screenBottom:4.25,screenTop:7.55,galleryFloor:8.1,galleryTop:11.65,roofBottom:12.04,reconstructed:true};
const b=AGSM_FACADE_BUILDING;
export const AGSM_COURT_FACES=b.points.slice(20,35).map((a,j)=>{const index=20+j,c=b.points[index+1],length=Math.hypot(c.x-a.x,c.z-a.z);return {index,a,c,length,nx:(c.z-a.z)/length,nz:-(c.x-a.x)/length,kind:index===20?'brick':'glazed'};});
let arc=0;
export const AGSM_CURVE_FACES=AGSM_COURT_FACES.filter(f=>f.index>=26).map(f=>{const q={...f,start:arc,end:arc+f.length};arc+=f.length;return q;});
export const AGSM_CURVE_GRID={length:arc,count:Math.round(arc/2.35)};AGSM_CURVE_GRID.pitch=arc/AGSM_CURVE_GRID.count;
export function agsmFacadeFace(a,c){const x=(a.x+c.x)/2,z=(a.z+c.z)/2;return AGSM_COURT_FACES.find(f=>{const dx=f.c.x-f.a.x,dz=f.c.z-f.a.z,t=((x-f.a.x)*dx+(z-f.a.z)*dz)/(f.length*f.length);return t>=-1e-7&&t<=1+1e-7&&Math.hypot(x-f.a.x-dx*t,z-f.a.z-dz*t)<1e-6;});}
// Adjacent translated planes otherwise leave sight lines through the shell.
// Miter both ends against the source neighbours so recesses / brows join.
export function agsmOffsetPoint(face,d,offset){
 const ring=AGSM_FACADE_BUILDING.points,n=ring.length;
 const normal=i=>{const a=ring[(i+n)%n],c=ring[(i+1+n)%n],l=Math.hypot(c.x-a.x,c.z-a.z);return {x:(c.z-a.z)/l,z:-(c.x-a.x)/l};};
 const at=(p,left,right)=>{const scale=offset/Math.max(.15,1+left.x*right.x+left.z*right.z),dx=(left.x+right.x)*scale,dz=(left.z+right.z)*scale,limit=Math.min(1,Math.abs(offset)*2/(Math.hypot(dx,dz)||1));return {x:p.x+dx*limit,z:p.z+dz*limit};};
 const a=at(face.a,normal(face.index-1),normal(face.index)),c=at(face.c,normal(face.index),normal(face.index+1)),t=d/face.length;return {x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};
}
export function agsmFaceCells(face){
 const curve=AGSM_CURVE_FACES.find(f=>f.index===face.index),start=curve?.start??0,end=curve?.end??face.length,count=curve?AGSM_CURVE_GRID.count:Math.max(1,Math.round(face.length/2.35)),pitch=curve?AGSM_CURVE_GRID.pitch:face.length/count,cells=[];
 for(let index=0;index<count;index++){const lo=Math.max(start,index*pitch),hi=Math.min(end,(index+1)*pitch);if(hi-lo>1e-7)cells.push({index,start:lo-start,end:hi-start,anchor:index*pitch-start,pitch,fullStart:index*pitch-start,fullEnd:(index+1)*pitch-start});}return cells;
}
export function agsmScreen(cell){const fraction=[1,.73,.42,.9][cell.index%4];return {bottom:AGSM_COURT_BANDS.screenTop-(AGSM_COURT_BANDS.screenTop-AGSM_COURT_BANDS.screenBottom)*fraction,top:AGSM_COURT_BANDS.screenTop,bottomProjection:.55,topProjection:.12,reconstructed:true};}
const f=AGSM_FACADE.frame,p=framePoint(f,3,13),target=framePoint(f,-8,13);
export const AGSM_FACADE_VIEW={id:'agsm-curved-facade',name:'AGSM · curved glass and sun screens',code:'G27',kind:'academic',...p,heading:Math.atan2(target.x-p.x,p.z-target.z),pitch:.45,showSign:false,description:'Photo-fitted pale adjustable screens, warm structural piers, shaded gallery and set-back upper glazing. Original mapped maximum 20 m and five-level tag remain; lower component levels, setbacks and mixed screen positions are reconstructed from historical / university photographs'};
