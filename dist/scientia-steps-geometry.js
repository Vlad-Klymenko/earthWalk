import {SCIENTIA_STEP_TIERS,SCIENTIA_STEP_GROUND} from './scientia-steps-parts.js?v=5c7d3bba5015';
import {scientiaPoint,scientiaLocal} from './scientia-data.js?v=5c7d3bba5015';
import {scientiaStepHeight} from './scientia-steps-data.js?v=5c7d3bba5015';
import {CAMPUS as RAW} from './campus-data.js?v=5c7d3bba5015';
import {terrainHeight} from './terrain.js?v=5c7d3bba5015';
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
export const inScientiaSteps=(x,z)=>SCIENTIA_STEP_GROUND.some(p=>inside({x,z},p.points)&&!p.holes.some(h=>inside({x,z},h)));
const segmentDistance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
export const SCIENTIA_HEDGES=[];
for(let index=0;index<SCIENTIA_STEP_TIERS.length;index++){
 const part=SCIENTIA_STEP_TIERS[index],ps=part.points.map(scientiaLocal),u0=Math.min(...ps.map(p=>p.u)),u1=Math.max(...ps.map(p=>p.u)),v0=Math.min(...ps.map(p=>p.v)),v1=Math.max(...ps.map(p=>p.v));
 for(let u=u0+.34;u<u1-.3;u+=.52)for(let v=v0+.34;v<v1-.3;v+=.52){const p=scientiaPoint(u,v);if(!inside(p,part.points)||part.holes.some(h=>inside(p,h)))continue;if([part.points,...part.holes].some(r=>r.some((a,i)=>segmentDistance(p,a,r[(i+1)%r.length])<.32)))continue;SCIENTIA_HEDGES.push({...p,radius:.3,height:.43+.07*Math.sin(u*1.7+v*2.3),root:part.soil,tier:index,reconstructed:true});}
}
// Southern parapet follows the bordering ramp grade. Gaps retain cross paths.
export const SCIENTIA_STEP_PARAPET=[];
const gates=RAW.paths.filter(p=>!['road','service','residential'].includes(p.kind));
for(const part of SCIENTIA_STEP_GROUND)for(const r of [part.points,...part.holes])for(let i=0;i<r.length;i++){
 const a=r[i],b=r[(i+1)%r.length],A=scientiaLocal(a),B=scientiaLocal(b);if(Math.min(A.v,B.v)<14||Math.abs(A.u-B.u)<.5)continue;
 const count=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.65);
 for(let j=0;j<count;j++){const at=t=>({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t}),p=at(j/count),q=at((j+1)/count),mid=at((j+.5)/count);if(gates.some(path=>path.points.slice(1).some((b,i)=>segmentDistance(mid,path.points[i],b)<(path.width||2.4)/2+.5)))continue;
  const dx=q.x-p.x,dz=q.z-p.z,len=Math.hypot(dx,dz),n={x:-dz/len*.075,z:dx/len*.075};SCIENTIA_STEP_PARAPET.push({a:p,b:q,low:Math.min(scientiaStepHeight(p.x,p.z),scientiaStepHeight(q.x,q.z),terrainHeight(p.x,p.z),terrainHeight(q.x,q.z))-.1,topA:terrainHeight(p.x,p.z)+.72,topB:terrainHeight(q.x,q.z)+.72,points:[{x:p.x+n.x,z:p.z+n.z},{x:q.x+n.x,z:q.z+n.z},{x:q.x-n.x,z:q.z-n.z},{x:p.x-n.x,z:p.z-n.z}],reconstructed:true});
 }
}
