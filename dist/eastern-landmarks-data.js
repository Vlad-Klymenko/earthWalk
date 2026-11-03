import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=26b79da8da82';
import { buildingBase } from './terrain.js?v=26b79da8da82';
const frameFor=b=>orientedFrame(b.points,{x:-.16,z:1});
const heading=(from,to)=>Math.atan2(to.x-from.x,from.z-to.z);

// Public photographs establish the folded cladding / triangular glazing, not
// exact bay dimensions. All portal divisions and projection depths are estimates.
export function sirfGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),arrival=framePoint(frame,0,-27),target=framePoint(frame,0,0);
  const facades=[{a:b.points[3],c:b.points[0],index:3,layout:[{start:.035,end:.30,peak:.165,glassRatio:.58,outerRatio:.78,recess:1,corner:false},{start:.55,end:1,peak:1,glassRatio:.78,outerRatio:.94,recess:3,corner:true}]},{a:b.points[0],c:b.points[1],index:0,layout:[{start:0,end:.9,peak:0,glassRatio:.78,outerRatio:.94,recess:3,corner:true}]}].map(face=>{
    const dx=face.c.x-face.a.x,dz=face.c.z-face.a.z,len=Math.hypot(dx,dz),normal={x:dz/len,z:-dx/len};
    const portals=face.layout.map(p=>({...p,bottom:.25,glassPeak:b.height*p.glassRatio,outerPeak:b.height*p.outerRatio,projection:0,reconstructed:true}));
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
