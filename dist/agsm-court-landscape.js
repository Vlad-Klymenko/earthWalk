import {AGSM_COURT_TRIANGLES} from './agsm-court-parts.js?v=5683e7ad2066';
const cells=new Map(),size=3;
for(const tri of AGSM_COURT_TRIANGLES){const xs=tri.map(p=>p.x),zs=tri.map(p=>p.z);for(let x=Math.floor(Math.min(...xs)/size);x<=Math.floor(Math.max(...xs)/size);x++)for(let z=Math.floor(Math.min(...zs)/size);z<=Math.floor(Math.max(...zs)/size);z++){const key=x+','+z;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(tri);}}
// The visible court and broad stepped edge use the exact same walking mesh.
export function agsmCourtHeight(x,z){
 let height=-Infinity;for(const [a,b,c] of cells.get(Math.floor(x/size)+','+Math.floor(z/size))||[]){const den=(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z),u=((b.z-c.z)*(x-c.x)+(c.x-b.x)*(z-c.z))/den,v=((c.z-a.z)*(x-c.x)+(a.x-c.x)*(z-c.z))/den,w=1-u-v;if(u>=-1e-8&&v>=-1e-8&&w>=-1e-8)height=Math.max(height,a.y*u+b.y*v+c.y*w);}
 return Number.isFinite(height)?height:undefined;
}
