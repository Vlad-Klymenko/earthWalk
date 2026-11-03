import {MALL_PAVING} from './mall-landscape-parts.js?v=372bc6d4b821';
const edges=MALL_PAVING.flatMap(p=>[p.points,...p.holes].flatMap(r=>r.map((a,i)=>({a,b:r[(i+1)%r.length]}))));
export function mallGreenOffset(x,z){
 let distance=Infinity;for(const {a,b} of edges){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1)));distance=Math.min(distance,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));}
 // Small fitted verge grade keeps paving flush with grass and blends toward the unchanged DEM away from the paving.
 return .005+.215*Math.max(0,1-distance/2.5);
}
