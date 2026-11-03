import * as THREE from './vendor/three.module.js?v=a5f9f679a82f';
import {FALCONER} from './old-main-front-data.js?v=a5f9f679a82f';
// Procedural relief interpretation from the linked university photographs.
// The 14m catalogue envelope includes the upper sky elements, not just rider.
export function falconerGeometry(){
 const chunks=[],components=new Set(),plate=(name,points,depth=.07,z=.025)=>{components.add(name);const shape=new THREE.Shape();shape.moveTo(...points[0]);for(const p of points.slice(1))shape.lineTo(...p);shape.closePath();const g=new THREE.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:1});g.translate(0,0,z);chunks.push(g.index?g.toNonIndexed():g.clone());g.dispose();},rod=(name,a,b,r=.025,z=.085)=>{components.add(name);const A=new THREE.Vector3(a[0],a[1],z),B=new THREE.Vector3(b[0],b[1],z),d=B.clone().sub(A),g=new THREE.CylinderGeometry(r,r,d.length(),7,1);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize()));g.translate(...A.add(B).multiplyScalar(.5).toArray());chunks.push(g.index?g.toNonIndexed():g.clone());g.dispose();},chain=(name,ps,r=.025,z=.085)=>{for(let i=1;i<ps.length;i++)rod(name,ps[i-1],ps[i],r,z);},disc=(name,x,y,rx,ry=rx,z=.09)=>{components.add(name);const g=new THREE.SphereGeometry(1,14,8);g.scale(rx,ry,.07);g.translate(x,y,z);chunks.push(g.index?g.toNonIndexed():g.clone());g.dispose();};
 plate('earth',[[-1.5,.05],[-1.35,.18],[1.15,.2],[1.5,.06],[1.12,0],[-1.35,0]],.09);
 plate('horse',[[-1.15,1.18],[-1.22,1.72],[-.8,1.91],[.35,1.88],[.92,1.56],[.6,1.07],[-.05,1.12],[-.7,1.01]],.105);
 plate('horse',[[.35,1.5],[.66,2.1],[.78,2.91],[1.07,3.17],[1.18,2.77],[1.08,1.45],[.81,1.05]],.12);
 plate('horse',[[.76,2.86],[.86,3.38],[1.01,3.15],[1.35,3.25],[1.57,3.03],[1.24,2.89],[1.07,2.62]],.12);
 for(const leg of [[[-1.02,1.35],[-1.25,.75],[-1.2,.2]],[[-.63,1.2],[-.42,.67],[.06,.23]],[[.43,1.2],[.43,.2],[.83,.15]],[[.91,1.25],[1.22,.72],[.91,.24]],[[-1.1,1.76],[-1.45,1.28],[-1.5,.6]]])chain('horse',leg,.075,.1);
 plate('rider',[[-.64,1.67],[-.57,2.28],[-.54,3.06],[-.22,3.22],[.09,2.92],[.02,1.91],[-.2,1.61]],.11,.065);
 plate('rider',[[-.72,3.08],[-.8,3.43],[-.58,3.61],[-.26,3.43],[-.04,3.35],[-.32,3.22],[-.32,3.05]],.12,.065);
 chain('rider',[[-.47,1.79],[-.14,1.33],[-.2,.67],[.19,.36]],.085,.15);chain('rider',[[-.47,2.96],[-1.19,3.46],[-1.22,4.14]],.085,.13);chain('rider',[[.02,2.95],[.61,3.13],[.95,3.46]],.085,.13);
 for(const [a,b]of [[[-.62,3.42],[-.26,3.35]],[[-.48,3.04],[-.22,1.9]],[[-1.03,1.65],[.62,1.46]],[[.84,2.93],[.92,1.6]]])rod('raised folds',a,b,.025,.185);
 plate('falcon',[[-1.49,4.02],[-1.53,4.46],[-1.43,4.97],[-1.24,5.16],[-1.08,4.97],[-.95,4.91],[-1.16,4.8],[-1.04,4.24],[-.83,4.03],[-1.15,4.08]],.09,.08);
 chain('falcon',[[-1.39,4.85],[-1.27,4.37],[-1.11,4.11]],.024,.19);chain('falcon',[[-1.34,4.8],[-1.17,4.27],[-.97,4.1]],.024,.19);rod('falcon',[-1.49,4.01],[-.87,4.01],.04,.13);
 chain('tree',[[.87,3.38],[.6,3.85],[.78,4.1],[.78,4.97]],.085,.105);for(const [x,y]of [[.18,5.12],[.5,5.4],[.83,5.5],[1.15,5.35],[1.42,5.15]]){chain('tree',[[.78,4.7],[x,4.99],[x,y]],.045,.13);plate('tree',[[x-.15,y-.1],[x-.12,y+.13],[x+.02,y+.31],[x+.19,y+.05],[x+.14,y-.11],[x,y-.2]],.065,.11);}
 const sun=[-.25,7.75],star=[];for(let i=0;i<16;i++){const a=Math.PI/2+i*Math.PI/8,r=i%2?.24:.83;star.push([sun[0]+Math.cos(a)*r,sun[1]+Math.sin(a)*r]);}plate('sun',star,.075,.08);disc('sun',...sun,.22,.22,.13);
 for(const end of [[-1.38,5.13],[.9,5.58],[-1.95,10.75],[1.78,10.0],[2.72,8.25],[.4,13.65],[-1.9,7.72],[.95,6.14]])chain('connecting rays',[sun,end],.014,.07);
 chain('connecting rays',[[-1.38,5.13],[-1.95,6.32],sun,[.95,6.14],[.9,5.58]],.019,.07);
 plate('rain cloud',[[-2.52,10.4],[-2.44,11.48],[-1.7,11.5],[-1.23,11.37],[-1.19,11.04],[-2.14,10.83],[-2.22,10.39]],.07,.045);
 for(let i=0;i<7;i++)rod('rain',[-2.2+i*.075,10.83],[-1.78+i*.075,7.12],.008,.06);
 disc('constellation',1.78,9.94,.28,.32,.11);disc('constellation',2.02,11.83,.19,.25,.115);disc('constellation',1.26,13.07,.055,.07,.1);disc('constellation',1.04,11.48,.05,.07,.1);disc('constellation',1.6,8.88,.06,.14,.1);
 for(const ps of [[[1.26,13.07],[2.02,11.83],[1.78,9.94]],[[1.04,11.48],[1.2,10.28],[1.78,9.94]],[[1.78,9.94],[1.6,8.88]]])chain('constellation',ps,.013,.07);
 plate('arrow',[[2.31,8.08],[2.74,8.37],[2.29,8.29],[2.19,8.01]],.065,.07);
 plate('dove',[[-.14,13.62],[-.02,14],[.12,13.64],[.25,13.48],[.52,13.67],[.7,14.03],[.65,13.61],[.39,13.27],[.07,13.24],[-.23,13.41]],.07,.075);
 const positions=[],normals=[],uv=[];for(const g of chunks){positions.push(...g.attributes.position.array);normals.push(...g.attributes.normal.array);uv.push(...g.attributes.uv.array);g.dispose();}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.computeBoundingBox();const box=geometry.boundingBox.clone(),size=box.getSize(new THREE.Vector3()),centre=box.getCenter(new THREE.Vector3());geometry.translate(-centre.x,-box.min.y,-box.min.z);geometry.scale(FALCONER.width/size.x,FALCONER.height/size.y,FALCONER.depth/size.z);geometry.computeBoundingBox();
 const colors=[],p=geometry.attributes.position;for(let i=0;i<p.count;i++){const c=new THREE.Color('#4e554f').multiplyScalar(.86+.12*Math.sin(p.getX(i)*31+p.getY(i)*23)+p.getZ(i)*.65);colors.push(c.r,c.g,c.b);}geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.userData={reconstructed:true,components:[...components],reportedDimensions:{width:FALCONER.width,height:FALCONER.height,depth:FALCONER.depth},source:FALCONER.url};return geometry;
}
