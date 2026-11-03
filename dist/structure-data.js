import { Vector3 } from './vendor/three.module.js?v=ef86122637ee';

// Outward-facing low-poly tubes, also used for square rails / beams. The
// vertex order matters: inward side faces disappear when viewed from outside.
export function tubeFaces(a,b,r,sides=8,capped=true){
  const start=new Vector3(...a),end=new Vector3(...b),axis=end.clone().sub(start).normalize();
  const side=new Vector3().crossVectors(axis,Math.abs(axis.y)>.9?new Vector3(1,0,0):new Vector3(0,1,0)).normalize();
  const other=new Vector3().crossVectors(axis,side).normalize();
  const at=(p,t)=>p.clone().addScaledVector(side,Math.cos(t)*r).addScaledVector(other,Math.sin(t)*r).toArray();
  const faces=[];
  for(let i=0;i<sides;i++){
    const t=i/sides*Math.PI*2,u=(i+1)/sides*Math.PI*2;
    const s=at(start,t),q=at(start,u),e=at(end,t),f=at(end,u);
    faces.push([s,q,f,e]);
    if(capped)faces.push([a,q,s],[b,e,f]);
  }
  return faces;
}
