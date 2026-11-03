import * as THREE from './vendor/three.module.js?v=0a6497e5d72b';
import {GLOBE} from './globe-data.js?v=0a6497e5d72b';
// An original procedural interpretation of the photographed organic tracery.
// Both families spiral between oblique poles; no opaque sphere fills the cells.
export function globeLatticeGeometry(){
 const positions=[],normals=[],colors=[],indices=[],sides=4,steps=80,curves=112;
 const tilt=new THREE.Quaternion().setFromEuler(new THREE.Euler(.82,0,-.38));
 const centre=new THREE.Vector3(0,GLOBE.diameter/2,0),r=GLOBE.diameter/2-GLOBE.wireRadius;
 const colour=new THREE.Color(),point=(phase,t,family)=>{
  const phi=.004+(Math.PI-.008)*t;
  const theta=phase+(family===0?2.1:-1.5)*phi+.026*Math.sin(phi*14+phase*9)*Math.sin(phi)**2;
  return new THREE.Vector3(Math.sin(phi)*Math.cos(theta),Math.cos(phi),Math.sin(phi)*Math.sin(theta)).multiplyScalar(r).applyQuaternion(tilt);
 };
 for(let family=0;family<2;family++)for(let curve=0;curve<curves;curve++){
  const phase=(curve+(family?.41:0))*Math.PI*2/curves,radius=family?GLOBE.wireRadius*.72:GLOBE.wireRadius;
  const start=positions.length/3;
  for(let j=0;j<=steps;j++){
   const t=j/steps,p=point(phase,t,family),tangent=point(phase,Math.min(1,t+.0001),family).sub(point(phase,Math.max(0,t-.0001),family)).normalize();
   const u=p.clone().normalize(),v=new THREE.Vector3().crossVectors(tangent,u).normalize();
   u.crossVectors(v,tangent).normalize();
   for(let k=0;k<sides;k++){
    const a=k*Math.PI*2/sides,n=u.clone().multiplyScalar(Math.cos(a)).addScaledVector(v,Math.sin(a));
    const q=p.clone().addScaledVector(n,radius).add(centre);
    positions.push(q.x,q.y,q.z);normals.push(n.x,n.y,n.z);
    colour.set('#686657').multiplyScalar(.87+.13*Math.sin(curve*2.39+family*.8)+.1*Math.cos(t*8));colors.push(colour.r,colour.g,colour.b);
   }
   if(j<steps)for(let k=0;k<sides;k++){
    const a=start+j*sides+k,b=start+j*sides+(k+1)%sides,c=b+sides,d=a+sides;
    indices.push(a,b,d,b,c,d);
   }
  }
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeBoundingBox();g.computeBoundingSphere();
 g.userData={reconstructed:true,source:GLOBE.source,diameter:GLOBE.diameter,alternateDiameter:GLOBE.alternateDiameter,curveCount:curves*2,steps,sides,openLattice:true};return g;
}
// Small spherical lower cap, resting just above four short feet. All dimensions
// here are photo fits, distinct from the conflicting catalogue sphere sizes.
export function globeCupGeometry(){
 const R=GLOBE.diameter/2,profile=[];
 for(let i=0;i<=8;i++){const h=.045+i*.031;profile.push(new THREE.Vector2(Math.sqrt(R*R-(R-h)**2),h));}
 profile.push(new THREE.Vector2(profile.at(-1).x-.016,profile.at(-1).y-.006));
 for(let i=8;i>=0;i--){const h=.045+i*.031;profile.push(new THREE.Vector2(Math.sqrt(R*R-(R-h)**2)-.016,h+.012));}
 profile.push(profile[0].clone());const g=new THREE.LatheGeometry(profile,48);g.userData={reconstructed:true,feet:4,source:GLOBE.alternateSource};return g;
}
