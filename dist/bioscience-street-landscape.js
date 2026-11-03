import {BIO_STREET_SOIL_TRIANGLES} from './bioscience-street-parts.js?v=ef86122637ee';
import {BIO_STREET_TREE_IDS} from './bioscience-street-data.js?v=ef86122637ee';
const cells=new Map(),size=3;
for(const tri of BIO_STREET_SOIL_TRIANGLES){const xs=tri.map(p=>p.x),zs=tri.map(p=>p.z);for(let x=Math.floor(Math.min(...xs)/size);x<=Math.floor(Math.max(...xs)/size);x++)for(let z=Math.floor(Math.min(...zs)/size);z<=Math.floor(Math.max(...zs)/size);z++){const key=x+','+z;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(tri);}}
// The same triangles supply the visible bank and walking height; the public
// DEM and the surrounding campus terrain remain unchanged.
export function bioStreetWalkingHeight(x,z){
 for(const [a,b,c] of cells.get(Math.floor(x/size)+','+Math.floor(z/size))||[]){const den=(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z),u=((b.z-c.z)*(x-c.x)+(c.x-b.x)*(z-c.z))/den,v=((c.z-a.z)*(x-c.x)+(a.x-c.x)*(z-c.z))/den,w=1-u-v;if(u>=-1e-8&&v>=-1e-8&&w>=-1e-8)return a.y*u+b.y*v+c.y*w;}
 return undefined;
}
export const bioStreetTreeRoot=t=>BIO_STREET_TREE_IDS.has(t.id)?bioStreetWalkingHeight(t.x,t.z):undefined;
