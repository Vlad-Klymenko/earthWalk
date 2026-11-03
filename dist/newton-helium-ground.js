import {HELIUM_MESH} from './newton-helium-parts.js?v=26b79da8da82';
import {heliumField} from './newton-helium-data.js?v=26b79da8da82';
export function heliumWalkingHeight(x,z){
 for(const tri of HELIUM_MESH){const [a,b,c]=tri.points,d=(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z),u=((b.z-c.z)*(x-c.x)+(c.x-b.x)*(z-c.z))/d,v=((c.z-a.z)*(x-c.x)+(a.x-c.x)*(z-c.z))/d,w=1-u-v;if(u>=-1e-7&&v>=-1e-7&&w>=-1e-7)return u*a.y+v*b.y+w*c.y;}
 return heliumField({x,z});
}
