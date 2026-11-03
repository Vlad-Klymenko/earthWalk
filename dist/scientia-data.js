import {CAMPUS as RAW} from './campus-data.js?v=1247eefc625e';
import {buildingBase,terrainHeight} from './terrain.js?v=1247eefc625e';
export const SCIENTIA_ID='osm-way-1178531037';
export const SCIENTIA_NORTH_ID='osm-way-1116164557';
export const SCIENTIA_SOURCE='https://fjcstudio.com/projects/john-niland-scientia-building/';
export const SCIENTIA_GIS='https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer/18';
const canopy=RAW.buildings.find(b=>b.id===SCIENTIA_ID),a=canopy.points[0],c=canopy.points[3],length=Math.hypot(c.x-a.x,c.z-a.z),u={x:(c.x-a.x)/length,z:(c.z-a.z)/length};
export const SCIENTIA_FRAME={x:a.x,z:a.z,u,v:{x:-u.z,z:u.x}};
export const scientiaPoint=(u,v)=>({x:SCIENTIA_FRAME.x+SCIENTIA_FRAME.u.x*u+SCIENTIA_FRAME.v.x*v,z:SCIENTIA_FRAME.z+SCIENTIA_FRAME.u.z*u+SCIENTIA_FRAME.v.z*v});
export const scientiaLocal=p=>({u:(p.x-SCIENTIA_FRAME.x)*u.x+(p.z-SCIENTIA_FRAME.z)*u.z,v:(p.x-SCIENTIA_FRAME.x)*SCIENTIA_FRAME.v.x+(p.z-SCIENTIA_FRAME.z)*SCIENTIA_FRAME.v.z});
export const scientiaRectangle=(u0,u1,v0,v1)=>[[u0,v0],[u1,v0],[u1,v1],[u0,v1]].map(p=>scientiaPoint(...p));
const base=buildingBase(canopy.points),north=RAW.buildings.find(b=>b.id===SCIENTIA_NORTH_ID);
export const SCIENTIA={base,reportedHeight:19.32,reportedFloors:5,roofRL:base+19.32,valleyRL:base+16.3,podiumRL:base+7.1,hallRoofRL:buildingBase(north.points)+north.height,footprint:canopy.points,reconstructed:true,note:'GIS height19.32m and5-floor field are retained. Canopy roof RL is derived against the coarse DEM base, not a surveyed absolute level. Valley, podium and hall levels are estimates.'};
// Bilinear points stay within the original slightly tapered OSM canopy outline.
export const scientiaRoofPoint=(t,s)=>{const p=canopy.points[0],q=canopy.points[3],r=canopy.points[1],w=canopy.points[2];return {x:(p.x+(q.x-p.x)*t)*(1-s)+(r.x+(w.x-r.x)*t)*s,z:(p.z+(q.z-p.z)*t)*(1-s)+(r.z+(w.z-r.z)*t)*s,y:SCIENTIA.valleyRL+Math.abs(s-.5)*2*(SCIENTIA.roofRL-SCIENTIA.valleyRL)};};
export const SCIENTIA_TREES=[2,14,26].map(u=>{const p=scientiaPoint(u,4.55);return {...p,u,v:4.55,radius:.24,root:terrainHeight(p.x,p.z)+.04,forkRL:base+8.25,reconstructed:true};});
export const SCIENTIA_VIEWS=[
 {id:'scientia-butterfly-canopy',name:'Scientia · butterfly canopy',...scientiaPoint(-13,4.5),pitch:.52},
 {id:'scientia-covered-passage',name:'Scientia · open central passage',...scientiaPoint(5.4,3.1),pitch:.55}
].map(p=>({...p,code:'G19',heading:Math.atan2(SCIENTIA_FRAME.u.x,-SCIENTIA_FRAME.u.z),kind:'scientia',showSign:false,description:'G19 · Butterfly glass roof, branching jarrah supports, sandstone podium and louvred metal halls. Public GIS height19.32m; roof elevation derived from the coarse measured terrain base. Detailed levels, hall partition, branch geometry and cladding are photo-fitted estimates. Outdoor passage only; interiors closed'}));
