import * as THREE from './vendor/three.module.js?v=01be76894552';
import {CHANCELLOR_ART} from './chancellors-garden-data.js?v=01be76894552';
// A small low-poly interpretation of the photographed reclining copper form,
// constrained to catalogue dimensions. This is not a scan or exact replica.
export function fountainFigureGeometry(){
 const chunks=[],body=(p,s,rotation=0)=>{const g=new THREE.SphereGeometry(1,12,8);g.scale(...s);g.rotateZ(rotation);g.translate(...p);chunks.push(g.toNonIndexed());g.dispose();},limb=(a,b,r0,r1)=>{const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),d=B.clone().sub(A),g=new THREE.CylinderGeometry(r1,r0,d.length(),10,1);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize()));g.translate(...A.add(B).multiplyScalar(.5).toArray());chunks.push(g.toNonIndexed());g.dispose();};
 body([-.22,.29,0],[.39,.18,.19],-.17);body([.12,.19,-.01],[.25,.14,.2],-.12);body([-.42,.36,-.01],[.17,.17,.2],-.2);
 limb([-.43,.4,-.015],[-.68,.43,-.01],.095,.075);body([-.75,.46,-.01],[.145,.16,.125],-.65);body([-.765,.455,.018],[.15,.16,.12],-.65);body([-.72,.49,.1],[.035,.045,.048],-.4);
 // Supporting elbow and forearm, raised shoulder, shell-holding arm.
 limb([-.43,.35,-.13],[-.57,.03,-.11],.075,.057);body([-.57,.045,-.11],[.065,.06,.065]);limb([-.57,.045,-.11],[-.79,.35,-.09],.06,.045);body([-.79,.36,-.09],[.06,.065,.05]);
 limb([-.39,.42,.13],[-.23,.64,.13],.075,.06);body([-.23,.64,.13],[.065,.055,.065]);limb([-.23,.64,.13],[-.46,.55,.25],.058,.04);body([-.46,.55,.25],[.095,.035,.06],.2);
 // Two gently bent legs and tapered feet, as distinct overlapping forms.
 limb([.12,.19,.1],[.49,.12,.13],.13,.085);body([.47,.125,.13],[.1,.085,.085]);limb([.49,.12,.13],[.83,.065,.17],.08,.04);body([.86,.065,.18],[.115,.04,.07],-.1);
 limb([.12,.12,-.13],[.48,.065,-.06],.12,.075);limb([.48,.065,-.06],[.83,.045,.07],.07,.035);body([.86,.045,.08],[.11,.035,.065],-.1);
 // Fine raised hair ridges remain abstract, without a copied texture.
 for(let i=0;i<8;i++){const z=-.11+i*.028;limb([-.86,.4,z],[-.85,.23,z*.7],.009,.007);}
 const positions=[],normals=[],uv=[];for(const g of chunks){positions.push(...g.attributes.position.array);normals.push(...g.attributes.normal.array);uv.push(...g.attributes.uv.array);g.dispose();}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.computeBoundingBox();const box=geometry.boundingBox.clone(),size=box.getSize(new THREE.Vector3()),centre=box.getCenter(new THREE.Vector3());geometry.translate(-centre.x,-box.min.y,-centre.z);geometry.scale(CHANCELLOR_ART.width/size.x,CHANCELLOR_ART.height/size.y,CHANCELLOR_ART.depth/size.z);geometry.computeBoundingBox();
 const colors=[],p=geometry.attributes.position;for(let i=0;i<p.count;i++){const grain=.05*Math.sin(p.getX(i)*149+p.getY(i)*117+p.getZ(i)*83),c=new THREE.Color('#716653').multiplyScalar(.86+grain+.15*p.getY(i)/CHANCELLOR_ART.height);colors.push(c.r,c.g,c.b);}geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.userData={reconstructed:true,reportedDimensions:{width:CHANCELLOR_ART.width,height:CHANCELLOR_ART.height,depth:CHANCELLOR_ART.depth},pose:'simplified photo-fitted reclining figure'};return geometry;
}
