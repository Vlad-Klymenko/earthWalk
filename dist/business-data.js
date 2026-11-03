import { CAMPUS as SOURCE } from './campus-data.js?v=b468e6aa825e';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=b468e6aa825e';
import { terrainHeight, buildingBase } from './terrain.js?v=b468e6aa825e';
export const BUSINESS_ID='business-school';
export const BUSINESS_ARCHITECT={url:'https://www.lahznimmo.com/australian-school-of-business-unsw',title:'lahznimmo / FJC · Heffron refurbishment, 2008',describedStoreys:6};
export function businessGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const rows=[5.25,9.6,14.1,18.1,22.1,26.1].map((low,i)=>({low,high:[8.95,13.45,17.45,21.45,25.45,30.3][i],reconstructed:true}));
  const signed=b.points.reduce((s,p,i)=>{const q=b.points[(i+1)%b.points.length];return s+p.x*q.z-q.x*p.z;},0),ring=signed<0?[...b.points].reverse():b.points;
  const faces=ring.map((a,i)=>{
    const c=ring[(i+1)%ring.length],len=Math.hypot(c.x-a.x,c.z-a.z),normal={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},mid=local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
    const across=normal.x*frame.v.x+normal.z*frame.v.z,along=normal.x*frame.u.x+normal.z*frame.u.z;
    return {a,c,len,normal,mid,kind:mid.v<-5.4&&mid.u>-37&&mid.u<-25?'stair-core':across>.7?'south-grid':across<-.7?'north-shades':along<0?'west-cladding':'east-brick'};
  });
  // Stair count / rise / canopy geometry are estimated from the labeled photo.
  // The seven treads and landing fit between the wall and the retained 4 m path.
  const stairU=-33,stairWidth=10,bottomV=17.55,topV=15.0,wallV=14.14;
  const arena=frameRectangle(frame,stairWidth,bottomV-wallV,stairU,(bottomV+wallV)/2);
  const low=Math.max(...arena.map(p=>terrainHeight(p.x,p.z)))+.18,rise=1.05,count=7;
  const steps=Array.from({length:count},(_,i)=>({points:frameRectangle(frame,stairWidth,(bottomV-topV)/count,stairU,bottomV-(i+.5)*(bottomV-topV)/count),rl:low+rise*i/count+.05}));
  const landing={points:frameRectangle(frame,stairWidth,topV-wallV,stairU,(topV+wallV)/2),rl:low+rise+.05};
  const stairs={u:stairU,width:stairWidth,bottomV,topV,wallV,arena,low,rise,count,steps,landing,reconstructed:true};
  const canopy={u:stairU,width:13.4,backV:14.0,frontV:17.5,back:6.4,front:6.0,backBottom:5.85,frontBottom:4.8,thickness:.16,reconstructed:true};
  const northArrival=framePoint(frame,52,-45),northTarget=framePoint(frame,-6,-5),southArrival=framePoint(frame,-63,27),southTarget=framePoint(frame,8,14),stairArrival=framePoint(frame,stairU,25.8),stairTarget=framePoint(frame,stairU,14.0);
  const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);};
  const clearOfPaths=p=>SOURCE.paths.every(path=>path.points.slice(0,-1).every((a,i)=>distance(p,a,path.points[i+1])>(path.width||3)/2+2.2));
  const benches=[-16,6,29].map(u=>({u,v:-18,...framePoint(frame,u,-18),width:2.2,depth:.65,reconstructed:true})).filter(clearOfPaths);
  return {frame,base,local,faces,rows,stairs,canopy,benches,awningHeight:5.4,awningDepth:1.8,roof:b.height,
    northArrival,northTarget,northHeading:Math.atan2(northTarget.x-northArrival.x,northArrival.z-northTarget.z),
    southArrival,southTarget,southHeading:Math.atan2(southTarget.x-southArrival.x,southArrival.z-southTarget.z),
    stairArrival,stairTarget,stairHeading:Math.atan2(stairTarget.x-stairArrival.x,stairArrival.z-stairTarget.z),reconstructed:true};
}

export function businessCanopyFaces(g){
  const c=g.canopy,w=c.width/2,point=(u,v,y)=>{const p=framePoint(g.frame,c.u+u,v);return [p.x,y,p.z];};
  const top=[point(-w,c.backV,c.back),point(-w,c.frontV-.35,c.front),point(w,c.frontV-.35,c.front),point(w,c.backV,c.back)];
  const bottom=[point(-w,c.backV,c.backBottom),point(-w,c.frontV,c.frontBottom),point(w,c.frontV,c.frontBottom),point(w,c.backV,c.backBottom)];
  return {top,bottom:[...bottom].reverse(),sides:top.map((p,i)=>{const j=(i+1)%4;return [bottom[j],top[j],p,bottom[i]];})};
}
