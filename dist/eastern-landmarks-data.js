import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=372bc6d4b821';
import { buildingBase } from './terrain.js?v=372bc6d4b821';
const frameFor=b=>orientedFrame(b.points,{x:-.16,z:1});
const heading=(from,to)=>Math.atan2(to.x-from.x,from.z-to.z);

// Public photographs establish the folded cladding / triangular glazing, not
// exact bay dimensions. All portal divisions and projection depths are estimates.
export function sirfGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),arrival=framePoint(frame,0,-27),target=framePoint(frame,0,0);
  const facades=[{a:b.points[3],c:b.points[0],count:3},{a:b.points[0],c:b.points[1],count:1}].map(face=>{
    const dx=face.c.x-face.a.x,dz=face.c.z-face.a.z,len=Math.hypot(dx,dz),normal={x:dz/len,z:-dx/len};
    const portals=Array.from({length:face.count},(_,i)=>({start:i/face.count,end:(i+1)/face.count,peak:(i+.5)/face.count,bottom:.25,glassPeak:b.height*.76,outerPeak:b.height*.94,projection:1.05,reconstructed:true}));
    return {...face,len,normal,portals};
  });
  return {frame,base,facades,paving:frameRectangle(frame,frame.width+1,5.4,0,-14.2),arrival,target,heading:heading(arrival,target)};
}

export function agsmGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),arrival=framePoint(frame,2,23),target=framePoint(frame,-5,10);
  // Original curved recess vertices are retained, not replaced by a bounding box.
  const courtyard=b.points.slice(21,36),pergola=b.points.slice(26,36);
  return {frame,base,courtyard,pergola,arrival,target,heading:heading(arrival,target),rowPitch:b.height/5};
}
