import {CAMPUS} from './campus-data.js?v=4ade268cca69';
export const MALL_GIS='https://gis.unsw.edu.au/server/rest/services/Kensington_Campus_2026/MapServer/7';
export const MALL_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=cS5jh1B90bA6I0Sxn5VPsA&heading=90&pitch=-8';
export const MALL_PATH_IDS=['osm-way-976039261','osm-way-45558517','osm-way-170061857','osm-way-183691277'];
export const mallPathKey=p=>p.id+':'+p.points.map(q=>q.x+','+q.z).join(';');
export const MALL_AXIS={x:1/Math.hypot(1,.165),z:.165/Math.hypot(1,.165)};
export const MALL_PATTERN={paverWidth:.4,paverLength:.8,bandWidth:.18,bandSpacing:5.6,reconstructed:true};
export const MALL_LIGHT={height:5.4,width:.24,depth:.19,diffuserBottom:3.85,diffuserTop:5.18,spacing:18,reconstructed:true};
const sourcePaths=MALL_PATH_IDS.filter(id=>id!=='osm-way-976039261').map(id=>CAMPUS.paths.find(p=>p.id===id));
// Candidate positions are photo-fitted at regular chainage; final geometry masks / collision checks apply.
export function mallLightCandidates(){
 const out=[];let chainage=0,next=9;
 for(const path of sourcePaths){const points=[...path.points].sort((a,b)=>a.x-b.x);for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i],length=Math.hypot(b.x-a.x,b.z-a.z),dx=(b.x-a.x)/length,dz=(b.z-a.z)/length;
  while(next<chainage+length){const t=(next-chainage)/length;for(const side of [-1,1]){const offset=path.width/2+.95;out.push({id:`mall-light-${Math.round(next)}-${side}`,x:a.x+(b.x-a.x)*t-dz*offset*side,z:a.z+(b.z-a.z)*t+dx*offset*side,angle:Math.atan2(-dz,dx),side,chainage:next,radius:.16,...MALL_LIGHT});}next+=MALL_LIGHT.spacing;}chainage+=length;
 }}return out;
}
export function mallCoordinates(p){return {u:p.x*MALL_AXIS.x+p.z*MALL_AXIS.z,v:-p.x*MALL_AXIS.z+p.z*MALL_AXIS.x};}
