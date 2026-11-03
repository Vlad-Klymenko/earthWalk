import {terrainHeight} from './terrain.js?v=9473ccb108ea';
import {scientiaPoint,scientiaLocal,SCIENTIA_FRAME} from './scientia-data.js?v=9473ccb108ea';
export const SCIENTIA_STEP_IDS=['osm-way-45558687','osm-way-260845786'];
export const SCIENTIA_STEP_SCOPE={u0:-56,u1:-8.317631880155464,v0:-1.8,v1:22.3};
export const SCIENTIA_STEP_AXIS=4.7;
// Landing heights are derived terrain references, not surveyed spot levels.
const refs=[-55,-45.5,-36.6,-26.4,-16.87,-8.317631880155464];
export const SCIENTIA_LANDING_LEVELS=refs.map(u=>{const p=scientiaPoint(u,SCIENTIA_STEP_AXIS);return {u,x:p.x,z:p.z,dem:terrainHeight(p.x,p.z),height:terrainHeight(p.x,p.z)+.23};});
const runs=[[-51.66,-48.83],[-42.16,-39.45],[-33.75,-29.8034],[-23.055674,-20.247033],[-13.498903,-10.7]];
export const SCIENTIA_FLIGHTS=runs.map(([u0,u1],i)=>{const low=SCIENTIA_LANDING_LEVELS[i].height,high=SCIENTIA_LANDING_LEVELS[i+1].height,count=Math.max(1,Math.round((high-low)/.15));return {id:'scientia-main-flight-'+(i+1),u0,u1,low,high,count,rise:(high-low)/count,tread:(u1-u0)/count,reconstructed:true};});
export const SCIENTIA_STEP_SECTIONS=[];
for(let i=0;i<=runs.length;i++){
 const u0=i?runs[i-1][1]:SCIENTIA_STEP_SCOPE.u0,u1=i<runs.length?runs[i][0]:SCIENTIA_STEP_SCOPE.u1;
 SCIENTIA_STEP_SECTIONS.push({kind:'landing',landing:i,u0,u1,height:SCIENTIA_LANDING_LEVELS[i].height});
 if(i<runs.length){const f=SCIENTIA_FLIGHTS[i];for(let j=0;j<f.count;j++)SCIENTIA_STEP_SECTIONS.push({kind:'tread',flight:i,tread:j,u0:f.u0+(f.u1-f.u0)*j/f.count,u1:f.u0+(f.u1-f.u0)*(j+1)/f.count,height:f.low+f.rise*(j+1),bottom:f.low+f.rise*j});}
}
export function scientiaSectionHeight(section,x,z){
 const {u,v}=scientiaLocal({x,z});
 if(section.kind==='landing'&&section.landing===0){const t=Math.max(0,Math.min(1,(u-SCIENTIA_STEP_SCOPE.u0)/1.6));const edge=scientiaPoint(SCIENTIA_STEP_SCOPE.u0,v);return (terrainHeight(edge.x,edge.z)+.23)*(1-t)+section.height*t;}
 if(section.kind==='landing'&&section.landing===5){const t=Math.max(0,Math.min(1,(u-(SCIENTIA_STEP_SCOPE.u1-1.2))/1.2));const edge=scientiaPoint(SCIENTIA_STEP_SCOPE.u1,v);return section.height*(1-t)+(terrainHeight(edge.x,edge.z)+.23)*t;}
 return section.height;
}
export function scientiaStepHeight(x,z){const local=scientiaLocal({x,z}),u=Math.max(SCIENTIA_STEP_SCOPE.u0,Math.min(SCIENTIA_STEP_SCOPE.u1,local.u)),s=SCIENTIA_STEP_SECTIONS.find(s=>u>=s.u0-1e-8&&u<s.u1-1e-8)||SCIENTIA_STEP_SECTIONS.at(-1);return scientiaSectionHeight(s,x,z);}
// Only a short outside remnant of the long lower source stair remains. Its
// raw map way is kept; the five fitted flights replace its upper continuous run.
export function scientiaOutsideStepSegments(path){
 const out=[];for(let i=1;i<path.points.length;i++){
  const a=path.points[i-1],b=path.points[i],la=scientiaLocal(a),lb=scientiaLocal(b),ts=[0,1];
  for(const bound of [SCIENTIA_STEP_SCOPE.u0,SCIENTIA_STEP_SCOPE.u1]){const t=(bound-la.u)/(lb.u-la.u);if(t>0&&t<1)ts.push(t);}ts.sort((a,b)=>a-b);
  for(let j=1;j<ts.length;j++){const t=(ts[j-1]+ts[j])/2,u=la.u+(lb.u-la.u)*t;if(u>SCIENTIA_STEP_SCOPE.u0&&u<SCIENTIA_STEP_SCOPE.u1)continue;const at=t=>({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t}),p=at(ts[j-1]),q=at(ts[j]);out.push({a:p,b:q,width:path.width||3,pathId:path.id,h0:terrainHeight(p.x,p.z)+.17,h1:terrainHeight(q.x,q.z)+.17,count:Math.max(1,Math.ceil(Math.abs(terrainHeight(p.x,p.z)-terrainHeight(q.x,q.z))/.17))});}
 }return out;
}
export const SCIENTIA_STEPS_VIEWS=[
 {id:'scientia-main-steps-bottom',name:'Scientia main steps · lower landing',...scientiaPoint(-55,2.65),heading:Math.atan2(SCIENTIA_FRAME.u.x,-SCIENTIA_FRAME.u.z),pitch:.22},
 {id:'scientia-main-steps-top',name:'Scientia main steps · upper landing',...scientiaPoint(-8.8,2.65),heading:Math.atan2(-SCIENTIA_FRAME.u.x,SCIENTIA_FRAME.u.z),pitch:-.15}
].map(p=>({...p,code:'G19',kind:'steps',showSign:false,walkFloor:scientiaStepHeight(p.x,p.z),description:'Five photo-fitted main flights, broad landings, centre rails, stone planters, low planting and mapped grass panels below Scientia. Public GIS landscape plan and NSW5m terrain retained. Tread counts, fine levels, rail / planter dimensions and planting are estimates; this is an outdoor reconstruction, not accessibility guidance'}));
