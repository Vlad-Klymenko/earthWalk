import {CAMPUS as RAW} from './campus-data.js?v=7e037edcfeb5';
import {civilGeometry,lectureFacadeRing} from './lecture-precinct-data.js?v=7e037edcfeb5';
import {scientiaPoint} from './scientia-data.js?v=7e037edcfeb5';
export const CIVIL_ID='osm-way-45230790';
export const CIVIL_HEIGHT={linkLabel:'Height source · UNSW GIS',height:35.38,reportedFloors:11,objectId:52,url:'https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer/18',title:'Public UNSW H20 building labels · H20 height field',note:'University GIS Building Height35.38m and No. of Floors11 are reported fields, not a component/absolute-RL survey. Original OSM40m and10-level tags remain independently retained. Display follows the university height; façade rows and rooftop plant remain reconstructed.'};
export const CIVIL_WEST_REFERENCE='https://fjcstudio.com/projects/john-niland-scientia-building/';
export const CIVIL_WEST_COLUMNS=[.22,.39,.56,.73,.90];
export function civilWestFacade(b){
 const g=civilGeometry(b),f=g.frame,ring=lectureFacadeRing(b.points),signed=ring.reduce((s,a,i)=>{const c=ring[(i+1)%ring.length];return s+a.x*c.z-c.x*a.z;},0),ordered=signed>0?ring:[...ring].reverse();
 const faces=ordered.map((a,i)=>{const c=ordered[(i+1)%ordered.length],length=Math.hypot(c.x-a.x,c.z-a.z),normal={x:(c.z-a.z)/length,z:-(c.x-a.x)/length};return {a,c,length,normal,nu:normal.x*f.u.x+normal.z*f.u.z};}),face=faces.find(p=>p.nu<-.8),windows=[];
 for(let row=0;row<g.rows;row++)for(let column=0;column<CIVIL_WEST_COLUMNS.length;column++){
  const centre=CIVIL_WEST_COLUMNS[column]*face.length,bottom=g.upperBase+row*g.pitch+.85;windows.push({row,column,left:centre-.51,right:centre+.51,bottom,top:bottom+1.04,recess:.14,frame:.075,reconstructed:true});
 }
 const masonry=[];let previous=0;for(let row=0;row<g.rows;row++){
  const cells=windows.filter(w=>w.row===row);masonry.push({left:0,right:face.length,bottom:previous,top:cells[0].bottom});let x=0;for(const w of cells){masonry.push({left:x,right:w.left,bottom:w.bottom,top:w.top});x=w.right;}masonry.push({left:x,right:face.length,bottom:cells[0].bottom,top:cells[0].top});previous=cells[0].top;
 }masonry.push({left:0,right:face.length,bottom:previous,top:g.bodyRoof});
 return {...face,roof:g.bodyRoof,upperBase:g.upperBase,windows,masonry,pipes:[.10,.115,.13,.145].map(s=>({s:s*face.length,radius:.035,bottom:g.upperBase-.25,top:g.bodyRoof-.3,reconstructed:true})),reconstructed:true,note:'Brick, small square openings and pale service pipes follow the western end visible in the architect photographs. Upper openings corroborated; full eight-row grid, depths, size and unphotographed lower portions are fitted estimates, not a measured elevation.'};
}
const source=RAW.buildings.find(b=>b.id===CIVIL_ID),end=civilWestFacade({...source,height:CIVIL_HEIGHT.height}),arrival=scientiaPoint(-8.8,2.65),target={x:(end.a.x+end.c.x)/2,z:(end.a.z+end.c.z)/2};
export const CIVIL_WEST_VIEW={id:'civil-west-brick-end',name:'Civil Engineering · brick western end',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:.62,kind:'engineering',code:'H20',showSign:false,description:'H20 · Brick western end with small square windows and pale service pipes, visible behind Scientia. University GIS reports35.38m/11 floors; OSM40m/10 levels retained separately. Full window grid, façade details, component levels and exact pipe positions remain photo-fitted estimates'};
