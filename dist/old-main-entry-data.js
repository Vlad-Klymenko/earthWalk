import {CAMPUS} from './campus-data.js?v=85dc72730a69';
import {campusTerrainHeight as baselineTerrain} from './spiral-landscape.js?v=85dc72730a69';
import {engineeringPoint,engineeringCoordinates,engineeringRectangle} from './engineering-street-data.js?v=85dc72730a69';
export const OLD_MAIN_SURVEY_URL='https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-84220206%2120260115T061908.681+GMT';
export const OLD_MAIN_ENTRY={lowerRL:30.65,upperRL:32.68,southStart:-10,lowerStart:-4,flightStart:5.8,flightEnd:10.2,topEnd:14.7,exitEnd:15.8,west:-9.65,east:-5.95,treads:12,reconstructedPlan:true,note:'Floor / landing and lower window RL anchors follow public survey sheets 27–28. XY placement, tread count, width, connecting grades and all fine dimensions are reconstructed. Survey datum is A.H.D.; detailed XY fitting and connection to the coarse NSW terrain are reconstructed. No interior or present accessibility is asserted.'};
export const OLD_MAIN_EAST_ROWS=[{sill:30.65,head:32.95,basis:'survey-sheet-27'},{sill:34.7,head:37.1,basis:'survey-sheet-27'},{sill:38.75,head:41.15,basis:'estimated-upper-band'},{sill:42.8,head:45.2,basis:'estimated-upper-band'}];
export const OLD_MAIN_SOUTH_LOWER={sill:30.75,head:32.45,basis:'survey-sheet-28'};
// GIS reports 15.32 m without its base / method. A roof near RL 46 m fits the
// photographed four bands, but remains an estimate, not a surveyed roof RL.
export const OLD_MAIN_VISUAL_ROOF={rl:46,estimated:true,gisHeight:15.32,gisFloors:5};
const E=OLD_MAIN_ENTRY,rect=(s0,s1,o0=E.west,o1=E.east)=>engineeringRectangle(s0,s1,o0,o1);
export const OLD_MAIN_ENTRY_ZONES=[
 {id:'south-approach',s0:E.southStart,s1:E.lowerStart,o0:E.west,o1:E.east},
 {id:'lower-court',s0:E.lowerStart,s1:E.flightStart,o0:E.west,o1:E.east},
 {id:'flight',s0:E.flightStart,s1:E.flightEnd,o0:E.west,o1:E.east},
 {id:'upper-platform',s0:E.flightEnd,s1:E.topEnd,o0:E.west,o1:E.east},
 {id:'street-exit',s0:E.topEnd,s1:E.exitEnd,o0:E.west,o1:-3.01}
].map(p=>({...p,points:rect(p.s0,p.s1,p.o0,p.o1),holes:[],reconstructed:true}));
const clamp=t=>Math.max(0,Math.min(1,t));
export function oldMainEntryHeight(x,z){
 const {s,o}=engineeringCoordinates({x,z}),zone=OLD_MAIN_ENTRY_ZONES.find(p=>s>=p.s0-1e-5&&s<=p.s1+1e-5&&o>=p.o0-1e-5&&o<=p.o1+1e-5);if(!zone)return undefined;
 let inside=false,edgeDistance=Infinity;for(let i=0,j=source.points.length-1;i<source.points.length;j=i++){
  const a=source.points[j],b=source.points[i],dx=b.x-a.x,dz=b.z-a.z,t=clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1));edgeDistance=Math.min(edgeDistance,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));
  if((a.z>z)!==(b.z>z)&&x<(b.x-a.x)*(z-a.z)/(b.z-a.z)+a.x)inside=!inside;
 }if(inside&&edgeDistance>.0001)return undefined;
 if(zone.id==='south-approach'){const t=clamp((s-E.southStart)/(E.lowerStart-E.southStart)),q=engineeringPoint(E.southStart,o);return (baselineTerrain(q.x,q.z)+.055)*(1-t)+E.lowerRL*t;}
 if(zone.id==='lower-court')return E.lowerRL;
 if(zone.id==='flight'){const i=Math.min(E.treads-1,Math.floor(clamp((s-E.flightStart)/(E.flightEnd-E.flightStart))*E.treads));return E.lowerRL+(i+1)*(E.upperRL-E.lowerRL)/E.treads;}
 if(zone.id==='upper-platform')return E.upperRL;
 const t=clamp((o-E.east)/(-3.01-E.east)),q=engineeringPoint(s,-3.01);return E.upperRL*(1-t)+(baselineTerrain(q.x,q.z)+.055)*t;
}
export const OLD_MAIN_ENTRY_TREADS=Array.from({length:E.treads},(_,i)=>{const depth=(E.flightEnd-E.flightStart)/E.treads,s0=E.flightStart+i*depth,s1=s0+depth;return {id:'old-main-lower-tread-'+i,s0,s1,points:rect(s0,s1),holes:[],height:E.lowerRL+(i+1)*(E.upperRL-E.lowerRL)/E.treads,reconstructed:true};});
export const OLD_MAIN_ENTRY_SURFACES=[...OLD_MAIN_ENTRY_ZONES.filter(p=>p.id!=='flight'),...OLD_MAIN_ENTRY_TREADS];
export const oldMainEntryFloorHeight=(part,x,z)=>part.height??oldMainEntryHeight(x,z);
export const oldMainEntryWalkingPatches=parts=>parts.map(part=>({...part,priority:true,heightAt:(x,z)=>oldMainEntryFloorHeight(part,x,z)}));
export const OLD_MAIN_ENTRY_BIKES={sourceOsmId:913079170,s0:11.3,s1:13.7,o0:-6.9,o1:-6.1,count:5,points:rect(11.3,13.7,-6.9,-6.1),height:.8,reconstructed:true,note:'Source bike point remains in CAMPUS_DETAILS. The rendered rack is fitted to the photographed upper platform, avoiding the reconstructed flight; exact location / count / dimensions remain estimates.'};
const source=CAMPUS.buildings.find(b=>b.id==='osm-way-45490050'),a=source.points[0],b=source.points[1],sa=engineeringCoordinates(a).s,sb=engineeringCoordinates(b).s,len=Math.hypot(b.x-a.x,b.z-a.z);
export function oldMainEastFacadePoint(s,offset=.08){const t=(s-sa)/(sb-sa);return {x:a.x+(b.x-a.x)*t+(b.z-a.z)/len*offset,z:a.z+(b.z-a.z)*t-(b.x-a.x)/len*offset};}
// Offset toward the exterior of the original eastern source edge.
export const OLD_MAIN_LOWER_DOOR={s0:4.1,s1:5.65,bottom:E.lowerRL,top:32.95,reconstructed:true};
// The surveyed low windows belong to the sunken southern court, not every
// northern bay. Their exact horizontal limits are photo / plan fitted.
export const oldMainEastWindowBayVisible=(row,p)=>row!==0||engineeringCoordinates(p).s<OLD_MAIN_LOWER_DOOR.s0-.35;
const head=(p,q)=>Math.atan2(q.x-p.x,p.z-q.z),lower=engineeringPoint(1,-7.55),upper=engineeringPoint(12.5,-7.55),south=engineeringPoint(-9,-7.55),target=engineeringPoint(8,-7.55);
export const OLD_MAIN_ENTRY_VIEWS=[
 {id:'old-main-lower-court',name:'Old Main · lower entrance court',...lower,walkFloor:E.lowerRL,heading:head(lower,target),pitch:.06},
 {id:'old-main-lower-stair-top',name:'Old Main · lower stair upper landing',...upper,walkFloor:E.upperRL,heading:head(upper,target),pitch:-.25},
 {id:'old-main-lower-south-approach',name:'Old Main · lower entrance approach',...south,heading:head(south,target),pitch:.05}
].map(p=>({...p,kind:'courtyard',showSign:false,description:'Sunken exterior court and stair with published lower-floor / upper-landing RL anchors from public 2025 survey sheets. Plan placement, tread count, connecting grades, upper façade and roof remain reconstructions. Current access and interiors are not represented'}));
