import {CAMPUS} from './campus-data.js?v=b468e6aa825e';
import {terrainHeight,buildingBase} from './terrain.js?v=b468e6aa825e';
import {orientedFrame,framePoint,frameRectangle,roundedFrameRectangle} from './geometry.js?v=b468e6aa825e';
export const MATHEWS_PAVILIONS_ID='osm-relation-15937009-0';
export const MATHEWS_PAVILIONS_REFERENCE='https://studentvip.com.au/unsw/kensington/maps/133719';
export const MATHEWS_PAVILIONS_PANORAMA='https://www.google.com/maps/@-33.9173922,151.2344323,3a,90y,100t/data=!3m4!1e1!3m2!1sCIHM0ogKEICAgICmuczLEg!2e10';
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
// Retained OSM roof perimeter / courtyard, with photo-fitted barrel divisions.
// No surveyed roof height was found. A common estimated roof reference clears
// the retained regional DEM, which still controls the outdoor paved ground.
export function mathewsPavilionsGeometry(b=CAMPUS.buildings.find(b=>b.id===MATHEWS_PAVILIONS_ID)){
 const frame=orientedFrame(b.points,{x:-.16,z:1}),at=(u,v)=>framePoint(frame,u,v),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z}),rect=(u0,u1,v0,v1)=>frameRectangle(frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2),base=buildingBase(b.points);
 const eaveRL=Math.max(...[b.points,...b.holes].flat().map(p=>terrainHeight(p.x,p.z)))+2.95,peakRL=eaveRL+1.55;
 const roofAt=(kind,p)=>{const {u,v}=local(p);if(kind==='link')return terrainHeight(p.x,p.z)+3.8;const cross=kind==='north'?(v+16.15)/8.55:kind==='south'?(v-20.6)/7.1:kind==='west'?(u+15.3)/5.1:(u-17.8)/5.2;const end=kind==='north'?Math.max(0,(Math.abs(u)-22)/6.5):0;const taper=['west','east'].includes(kind)?Math.max(0,Math.min(1,(v+7.6)/4,(13.5-v)/4)):1;return eaveRL+1.55*Math.max(0,1-Math.max(cross*cross,end*end))*taper;};
 const rooms=[{kind:'north',points:rect(-23,23,-23.5,-10.2)},{kind:'west',points:rect(-18.6,-12.1,-7.6,13.5)},{kind:'east',points:rect(14.6,21.2,-7.6,13.5)},{kind:'south',points:rect(-13,16.2,15.5,22.4)}];
 const proposals=[...[-22.8,24.5].flatMap(u=>[-21,-11.2].map(v=>({u,v,kind:'north',du:0,dv:1}))),...[-18,-6,6,18].flatMap(u=>[-24,-8.9].map(v=>({u,v,kind:'north',du:1,dv:0}))),...[-12,0,12].flatMap(u=>[14.5,23.0].map(v=>({u,v,kind:'south',du:1,dv:0}))),...[-3,6,12].flatMap(v=>[{u:-19.7,v,kind:'west',du:0,dv:1},{u:-11,v,kind:'west',du:0,dv:1},{u:13.5,v,kind:'east',du:0,dv:1},{u:22.2,v,kind:'east',du:0,dv:1}]),...[-4,6,17].map(v=>({u:-26.35,v,kind:'link',du:0,dv:1}))];
 const columns=proposals.map(p=>({...p,...at(p.u,p.v),radius:.12})).filter(p=>inside(p,b.points)&&!b.holes.some(r=>inside(p,r))).filter(p=>CAMPUS.paths.every(path=>path.points.every((c,i)=>{if(!i)return true;const a=path.points[i-1],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)>path.width/2+p.radius+.08;})));
 const tree={...at(1.2,2.7),u:1.2,v:2.7,height:14,radius:.48,reconstructed:true},planter={points:roundedFrameRectangle(frame,8.6,10.8,1.3,1.2,2.7)};
 const benches=[{u:-6.8,v:-1.8,along:'v'},{u:-6.8,v:6.5,along:'v'},{u:8.4,v:-1.8,along:'v'},{u:8.4,v:6.5,along:'v'},{u:-5,v:11.2,along:'u',lime:true},{u:7,v:11.2,along:'u'}].map(p=>({...p,...at(p.u,p.v),length:3.3,width:.65,reconstructed:true}));
 const pots=[[-7.8,-5.9],[9.1,-5.9]].map(([u,v])=>({...at(u,v),u,v,radius:.37,height:2.8,reconstructed:true}));
 const arrival=at(32,-16.2),target=at(19,-16.2),courtArrival=at(10.4,9.2),courtTarget=at(10.4,-12),linkArrival=at(-24.4,21.3),linkTarget=at(-25,-24),heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z);
 return {frame,at,local,rect,base,eaveRL,peakRL,apron:{points:rect(23,33,-21.8,-10.4)},maximum:peakRL-base,roofAt,rooms,columns,tree,planter,benches,pots,arrival,target,courtArrival,courtTarget,linkArrival,linkTarget,heading:heading(arrival,target),courtHeading:heading(courtArrival,courtTarget),linkHeading:heading(linkArrival,linkTarget),reconstructed:true};
}
const f=mathewsPavilionsGeometry().frame;
export function inMathewsPavilions(x,z){const u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z;return u>-29&&u<29&&v>-28&&v<28;}
