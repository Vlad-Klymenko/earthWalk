import { CAMPUS as SOURCE } from './campus-data.js?v=fba683d592b3';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=fba683d592b3';
import { buildingBase, terrainHeight } from './terrain.js?v=fba683d592b3';
export const TYREE_ID='tyree',TYREE_CANOPY_ID='osm-way-926419128';
export const TYREE_ARCHITECT={url:'https://fjcstudio.com/projects/tyree-energy-technologies-building/',title:'FJC Studio · Tyree completed exterior photographs'};
export const TYREE_HEIGHT_REPORT={url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=MP09_0163%2120190826T023421.077+GMT',title:'FJMT PA14 · East Elevation, 10 December 2009',linkLabel:'Planning component levels · PA14',groundRL:28.2,level1RL:32.7,pvRL:50.7,plantRoofRL:55.2,lowScreenRL:56.7,screenRL:59.7};
export const TYREE_REPLACED_STEPS=['osm-way-584174366'];
export const TYREE_FRAME=orientedFrame(SOURCE.buildings.find(b=>b.id===TYREE_ID).points,{x:-.16,z:1});
export function tyreeGeometry(b){
 const frame=TYREE_FRAME,base=buildingBase(b.points),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
 const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z),report=TYREE_HEIGHT_REPORT;
 // The parabolic spoon profile is reconstructed within the elevation's
 // component envelope. These curved points are not surveyed roof coordinates.
 const roofRL=p=>{const {u,v}=local(p);if(v>=8)return report.pvRL;const t=((v+33.6)%6+6)%6/6,spoon=46.0+(v+30)*.115+1.85*(2*t-1)**2,westernPlane=50.7-(8-v)*.08,blend=Math.max(0,Math.min(1,(u+16)/8));return westernPlane+(spoon-westernPlane)*blend;};
 const canopy=SOURCE.buildings.find(b=>b.id===TYREE_CANOPY_ID),canopyHeight=Math.max(...canopy.points.map(roofRL))-buildingBase(canopy.points),route=SOURCE.paths.find(p=>p.id==='osm-way-584174367');
 const platform={points:frameRectangle(frame,76,6.5,4.8,-30.45),rl:report.groundRL,reconstructed:true};
 const apron={points:frameRectangle(frame,76,3.5,4.8,-38.05),heightAt:p=>terrainHeight(p.x,p.z)+.22,reconstructed:true};
 const flights=Array.from({length:19},(_,j)=>{const u=-33.2+(j+.5)*4,approach=framePoint(frame,u,-36.3),low=terrainHeight(approach.x,approach.z)+.22,rise=report.groundRL-low;return {u,width:4,low,rise,steps:Array.from({length:5},(_,i)=>({points:frameRectangle(frame,4,.52,u,-36.3+(i+.5)*.52),rl:low+rise*(i+1)/5,index:i,reconstructed:true}))};});
 const plants=[{u:6,v:13,w:26,d:10,bottom:report.pvRL,top:report.plantRoofRL},{u:10,v:13,w:14,d:8,bottom:report.plantRoofRL,top:report.lowScreenRL},{u:-3,v:13,w:8,d:8,bottom:report.plantRoofRL,top:report.screenRL}].map(p=>({...p,points:frameRectangle(frame,p.w,p.d,p.u,p.v),reconstructed:true}));
 const columns=[-29,-9,11,33].map(u=>({...framePoint(frame,u,-32.4),u,v:-32.4,radius:.16,reconstructed:true}));
 const westColumns=[[-35,-18],[-28.7,1],[-20.5,20]].map(([u,v])=>({...framePoint(frame,u,v),u,v,radius:.18,reconstructed:true}));
 const tables=[-13,0,8].map(u=>({...framePoint(frame,u,-29.6),u,v:-29.6,width:1.15,reconstructed:true}));
 const trees=[[-30,-40,15],[-6,-40.8,14],[16,-40.5,15]].map(([u,v,height])=>({...framePoint(frame,u,v),u,v,height,form:'heritage-fig',reconstructed:true}));
 const arrival=framePoint(frame,38,-46),target=framePoint(frame,12,-27),stairArrival=framePoint(frame,16,-38.6),stairTarget=framePoint(frame,16,-28),westArrival=framePoint(frame,-64,-9),westTarget=framePoint(frame,-24,4),eastArrival=framePoint(frame,67,24),eastTarget=framePoint(frame,38,-3),passageArrival=framePoint(frame,-24.9,-38.6),passageTarget=framePoint(frame,-25.6,14);
 const passageFloor=p=>Math.max(terrainHeight(p.x,p.z)+.23,report.groundRL-Math.max(0,local(p).v+27.5)*.045);
 return {frame,base,local,report,roofRL,canopy,canopyHeight,route,platform,apron,flights,plants,columns,westColumns,tables,trees,passageFloor,passageCeilingRL:report.level1RL,passageWidth:3.8,arrival,target,heading:heading(arrival,target),stairArrival,stairTarget,stairHeading:heading(stairArrival,stairTarget),westArrival,westTarget,westHeading:heading(westArrival,westTarget),eastArrival,eastTarget,eastHeading:heading(eastArrival,eastTarget),passageArrival,passageTarget,passageHeading:heading(passageArrival,passageTarget),reconstructed:true};
}
export function inTyreeForecourt(x,z){const f=TYREE_FRAME,u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z;return u>-48&&u<46&&v>-44&&v<-26;}
