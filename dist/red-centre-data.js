import { CAMPUS as SOURCE } from './campus-data.js?v=916c3fc1320a';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=916c3fc1320a';
import { buildingBase } from './terrain.js?v=916c3fc1320a';
export const RED_CENTRE_IDS=['red-centre-west','red-centre-east'];
export const LAWRENCE_RENAME={url:'https://www.unsw.edu.au/arts-design-architecture/our-schools/built-environment/about-us/facilities-services',title:'UNSW Built Environment · April 2023 rename to Anita B. Lawrence Centre'};
export const RED_CENTRE_ARCHITECT={url:'https://fjcstudio.com/projects/red-centre/',title:'FJC Studio · Red Centre exterior photographs and massing sketch'};
export const RED_CENTRE_FRAME=orientedFrame(SOURCE.buildings.filter(b=>RED_CENTRE_IDS.includes(b.id)).flatMap(b=>b.points),{x:-.16,z:1});
export function redCentreGeometry(b){
  const frame=RED_CENTRE_FRAME,base=buildingBase(b.points),west=b.id===RED_CENTRE_IDS[0];
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const ring=b.points.reduce((s,p,i)=>{const q=b.points[(i+1)%b.points.length];return s+p.x*q.z-q.x*p.z;},0)<0?[...b.points].reverse():b.points;
  const faces=ring.map((a,i)=>{const c=ring[(i+1)%ring.length],len=Math.hypot(c.x-a.x,c.z-a.z),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},mid=local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});return {a,c,len,n,mid,north:n.x*frame.v.x+n.z*frame.v.z<-.7&&mid.v<-10};});
  const routeIds=west?[['osm-way-297836318','osm-way-297836320','osm-way-297836319','osm-way-297836317'],['osm-way-45560218','osm-way-297836316','osm-way-280268487']]:[['osm-way-1099961651','osm-way-297836302','osm-way-297836303','osm-way-297836308','osm-way-297836309']];
  const routes=routeIds.map(ids=>{const parts=ids.map(id=>SOURCE.paths.find(p=>p.id===id)),unique=new Map(parts.flatMap(p=>p.points).map(p=>[`${p.x},${p.z}`,p]));return {id:ids.join(' + '),sourceIds:ids,points:[...unique.values()].sort((a,c)=>local(a).v-local(c).v),width:Math.max(...parts.map(p=>p.width||2.1))};});
  const recess=west?{u0:-48,u1:-4,v0:-14,v1:-5.2,ceiling:11.8}:{u0:44.8,u1:54.0,v0:-14,v1:-6.0,ceiling:8.0};
  const rows=[13.3,14.85,17.25,18.8,21.2,22.75,25.15,26.7].map(low=>({low,high:low+1.02,reconstructed:true}));
  const stacks=(west?[-68,-48,-27,-5]:[17,37,65]).map((u,i)=>({u,v:-10.1,count:[2,3,5,2][i%4],bottom:30,top:40,reconstructed:true}));
  const plants=(west?[-48,-27,-5]:[17,37,65]).map((u,i)=>({points:frameRectangle(frame,4.6,3.8,u,-7),u,v:-7,bottom:33.4,top:i%2?37.9:37.4,reconstructed:true}));
  const arrival=framePoint(frame,west?-26:95,west?-51:-29),target=framePoint(frame,west?-25:43,-9);
  const passageViews=routes.map((route,i)=>{const north=route.points.reduce((a,c)=>local(c).v<local(a).v?c:a),south=route.points.reduce((a,c)=>local(c).v>local(a).v?c:a),a=local(north),c=local(south);const arrival=framePoint(frame,a.u,-20.8),target=framePoint(frame,c.u,20);return {id:`red-centre-${west?'west':'east'}-passage-${i}`,name:`Lawrence Centre · ${west?(i?'central':'western'):'eastern'} covered link`,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),reconstructed:true};});
  const gallery=west?{points:frameRectangle(frame,44,1.45,-26,-5.95),floor:5.8,columns:[-43,-33,-23,-6].map(u=>({...framePoint(frame,u,-6.4),u,v:-6.4})),reconstructed:true}:null;
  const benches=west?[-42,-31,-8].map(u=>({...framePoint(frame,u,-7.2),u,v:-7.2,width:2.4,depth:.65,reconstructed:true})):[];
  return {frame,base,west,local,faces,routes,recess,rows,stacks,plants,benches,gallery,bodyRoof:34.5,screenTop:30,passageCeiling:5.8,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),passageViews,reconstructed:true};
}

// Only procedural trees are excluded from this photo-led open forecourt.
// Source tree points remain eligible and the mapped green boundary is intact.
export function inLawrenceForecourt(x,z){const f=RED_CENTRE_FRAME,u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z;return u>-52&&u<-2&&v>-58&&v<-13;}
