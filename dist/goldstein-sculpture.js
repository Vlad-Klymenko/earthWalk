import * as THREE from './vendor/three.module.js?v=5683e7ad2066';
import { GOLDSTEIN_ART } from './goldstein-courtyard-data.js?v=5683e7ad2066';
// Simplified, pierced figurative silhouettes reconstructed from the linked
// public catalogue and restoration photographs; not a scan of the artwork.
const figures=[
 {points:[[-2.1,0],[-2.16,.35],[-2.05,.7],[-2.12,1.04],[-1.96,1.5],[-1.83,1.75],[-1.85,2.07],[-1.7,2.12],[-1.63,1.78],[-1.4,1.55],[-1.44,.9],[-1.66,.55],[-1.57,.08],[-1.76,0]],holes:[[-1.89,1.15,.13,.27],[-1.73,.43,.12,.18]],depth:.39,offset:-.1},
 {points:[[-1.61,.08],[-1.48,.61],[-1.5,1.33],[-1.42,1.66],[-1.25,1.73],[-1.25,2.24],[-1.08,2.28],[-1.03,2.16],[-1.1,1.78],[-.7,1.64],[-.64,1.24],[-.84,.84],[-.88,.2],[-1.05,0],[-1.17,.3],[-1.3,.59],[-1.41,.1]],holes:[[-1.22,1.36,.16,.28],[-1.05,.82,.12,.3]],depth:.37,offset:-.08},
 {points:[[-.85,.06],[-.8,.38],[-.99,.72],[-1.01,1.1],[-.77,1.53],[-.64,1.8],[-.58,2.14],[-.41,2.25],[-.29,2.09],[-.38,1.81],[-.13,1.56],[-.1,1.02],[-.39,.67],[-.52,.12],[-.67,0]],holes:[[-.55,1.65,.16,.25],[-.58,.97,.17,.32]],depth:.43,offset:-.14},
 {points:[[-.08,0],[-.18,.4],[-.13,.79],[-.24,1.05],[-.12,1.46],[.06,1.79],[.05,2.4],[.25,2.4],[.32,2.25],[.23,1.9],[.47,1.65],[.49,1.18],[.4,.93],[.43,.56],[.29,.33],[.33,.04],[.17,0],[.09,.29]],holes:[[.15,1.56,.12,.21],[.14,1.05,.14,.18],[.17,.58,.11,.15]],depth:.35,offset:-.02},
 {points:[[.47,.02],[.47,.39],[.33,.74],[.39,1.18],[.65,1.48],[.95,1.68],[1.04,2.09],[1.23,2.19],[1.38,2.08],[1.28,1.83],[1.52,1.66],[1.72,1.2],[1.65,.79],[1.43,.54],[1.31,.08],[1.09,0],[.95,.34],[.78,.12]],holes:[[.74,1.12,.21,.31],[1.27,1.3,.14,.27],[1.12,.57,.15,.19]],depth:.45,offset:-.2},
 {points:[[1.62,.04],[1.6,.51],[1.64,.96],[1.58,1.37],[1.69,1.77],[1.78,1.91],[1.77,2.19],[1.94,2.27],[2.09,2.2],[1.98,1.94],[2.12,1.72],[2.16,1.15],[2.09,.67],[2.16,.02],[1.98,0],[1.91,.43],[1.83,.06]],holes:[[1.89,1.65,.12,.16],[1.87,1.17,.12,.22],[1.91,.64,.11,.2]],depth:.34,offset:.02}
];
function outline(points){
 const shape=new THREE.Shape(),mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
 shape.moveTo(...mid(points.at(-1),points[0]));for(let i=0;i<points.length;i++){const q=mid(points[i],points[(i+1)%points.length]);shape.quadraticCurveTo(...points[i],...q);}shape.closePath();return shape;
}
export function goldsteinSculptureGeometry(){
 const chunks=figures.map(f=>{const shape=outline(f.points);for(const [x,y,rx,ry]of f.holes){const hole=new THREE.Path();hole.absellipse(x,y,rx,ry,0,Math.PI*2,true);shape.holes.push(hole);}const geometry=new THREE.ExtrudeGeometry(shape,{depth:f.depth,steps:1,bevelEnabled:true,bevelThickness:.028,bevelSize:.025,bevelSegments:1,curveSegments:5});geometry.translate(0,0,f.offset);return geometry;});
 const positions=[],normals=[],uvs=[];for(const geo of chunks){positions.push(...geo.attributes.position.array);normals.push(...geo.attributes.normal.array);uvs.push(...geo.attributes.uv.array);geo.dispose();}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.computeBoundingBox();
 const box=geometry.boundingBox.clone(),size=box.getSize(new THREE.Vector3()),scale=new THREE.Vector3(GOLDSTEIN_ART.width/size.x,GOLDSTEIN_ART.height/size.y,GOLDSTEIN_ART.depth/size.z),centre=box.getCenter(new THREE.Vector3());
 geometry.translate(-centre.x,-box.min.y,-centre.z);geometry.scale(scale.x,scale.y,scale.z);geometry.computeVertexNormals();geometry.computeBoundingBox();
 const colors=[],pos=geometry.attributes.position;for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i),grain=Math.sin(x*71.3+y*83.7+z*41.2)*.055,c=new THREE.Color('#99987e').multiplyScalar(.83+grain+.12*y/GOLDSTEIN_ART.height);colors.push(c.r,c.g,c.b);}geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
 geometry.userData.figureCount=6;geometry.userData.reportedDimensions={width:GOLDSTEIN_ART.width,height:GOLDSTEIN_ART.height,depth:GOLDSTEIN_ART.depth};geometry.userData.reconstructed=true;
 geometry.userData.holeCentres=figures.flatMap(f=>f.holes.map(([x,y])=>({x:(x-centre.x)*scale.x,y:(y-box.min.y)*scale.y})));
 return geometry;
}
