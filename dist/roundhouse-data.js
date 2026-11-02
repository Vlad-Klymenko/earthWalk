import { CAMPUS as SOURCE } from './campus-data.js?v=382061cd44e1';
import { frameRectangle } from './geometry.js?v=382061cd44e1';
import { buildingBase, terrainHeight } from './terrain.js?v=382061cd44e1';
export const ROUNDHOUSE_ID='roundhouse';
export const ROUNDHOUSE_ARCHITECT={title:'TZG · UNSW Roundhouse, 2015–2017',url:'https://tzg.com.au/project/unsw-roundhouse/'};
const raw=SOURCE.buildings.find(b=>b.id===ROUNDHOUSE_ID),curve=[...raw.points.slice(0,13),...raw.points.slice(22)];
// Algebraic circle fit locates the circular portion of the mapped perimeter;
// it never replaces that perimeter with a circle or removes the east annex.
const m=Array.from({length:3},()=>[0,0,0,0]);
for(const p of curve){const a=[p.x,p.z,1],rhs=-(p.x*p.x+p.z*p.z);for(let i=0;i<3;i++){for(let j=0;j<3;j++)m[i][j]+=a[i]*a[j];m[i][3]+=a[i]*rhs;}}
for(let i=0;i<3;i++){const d=m[i][i];for(let j=i;j<4;j++)m[i][j]/=d;for(let k=0;k<3;k++)if(k!==i){const q=m[k][i];for(let j=i;j<4;j++)m[k][j]-=q*m[i][j];}}
export const ROUNDHOUSE_CENTER={x:-m[0][3]/2,z:-m[1][3]/2};
const center=ROUNDHOUSE_CENTER,r0=Math.hypot(raw.points[12].x-center.x,raw.points[12].z-center.z),r1=Math.hypot(raw.points[22].x-center.x,raw.points[22].z-center.z),a0=Math.atan2(raw.points[12].z-center.z,raw.points[12].x-center.x),a1=Math.atan2(raw.points[22].z-center.z,raw.points[22].x-center.x);
const reconstructedArc=Array.from({length:15},(_,i)=>{const t=(i+1)/16,a=a0+(a1-a0)*t,r=r0+(r1-r0)*t;return {x:center.x+Math.cos(a)*r,z:center.z+Math.sin(a)*r};});
const outline=[...raw.points.slice(0,13),...reconstructedArc,...raw.points.slice(22)];
export function roundhouseGeometry(b){
 const base=buildingBase(b.points),at=(angle,r)=>({x:center.x+Math.cos(angle)*r,z:center.z+Math.sin(angle)*r}),scale=(s,points=outline)=>points.map(p=>({x:center.x+(p.x-center.x)*s,z:center.z+(p.z-center.z)*s}));
 const radiusAt=angle=>{const dx=Math.cos(angle),dz=Math.sin(angle);let best=Infinity;for(let i=0;i<outline.length;i++){const a=outline[i],c=outline[(i+1)%outline.length],ex=c.x-a.x,ez=c.z-a.z,den=dx*ez-dz*ex;if(Math.abs(den)<1e-10)continue;const ax=a.x-center.x,az=a.z-center.z,r=(ax*ez-az*ex)/den,t=(ax*dz-az*dx)/den;if(r>0&&t>=-1e-8&&t<=1+1e-8)best=Math.min(best,r);}return best;};
 const deck=3.5,underside=3.26,eave=6.9,roofInner=9.2,oculusBase=9.35,oculusRadius=3.9;
 const roofHeight=p=>{const r=Math.hypot(p.x-center.x,p.z-center.z),outer=radiusAt(Math.atan2(p.z-center.z,p.x-center.x));return eave+(roofInner-eave)*Math.max(0,Math.min(1,(outer-r)/(outer-oculusRadius)));};
 const stairs=[55,-125].map(degrees=>{const angle=degrees*Math.PI/180,dx=Math.cos(angle),dz=Math.sin(angle),r=radiusAt(angle)+1.3,top=at(angle,r),bottom=at(angle,r+7.2),frame={...top,u:{x:dz,z:-dx},v:{x:dx,z:dz}},lowRL=terrainHeight(bottom.x,bottom.z)+.22,highRL=base+deck,count=Math.ceil((highRL-lowRL)/.17);
 return {angle,degrees,frame,bottom,top,width:3.4,run:7.2,lowRL,highRL,count,landing:{points:frameRectangle(frame,3.4,2.4,0,-.8),rl:highRL},opening:frameRectangle(frame,4.1,4,0,-1.3),apron:frameRectangle(frame,4.2,2,0,8.0),arrival:at(angle,r+11.5),heading:Math.atan2(-dx,dz),reconstructed:true};});
 const arrival={...stairs[0].arrival},target=at(85*Math.PI/180,25),westArrival=at(Math.PI,48),westTarget=at(Math.PI,28),heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
 return {base,center,outline,at,scale,radiusAt,deck,underside,eave,roofInner,oculusBase,oculusRadius,roofHeight,stairs,arrival,target,heading:heading(arrival,target),westArrival,westTarget,westHeading:heading(westArrival,westTarget),lowerOutline:scale(.947),upperOutline:scale(.875),parapetInner:scale(.985),reconstructed:true};
}
