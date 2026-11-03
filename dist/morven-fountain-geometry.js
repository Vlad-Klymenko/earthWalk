import * as THREE from './vendor/three.module.js?v=ef86122637ee';
// Original faceted rocks, not scanned geometry. Local x/z follow campus u/v.
export function bourkeStoneGeometry(stone){
 const vertices=[],N=18,levels=stone.id==='portrait-standing-stone'?[[0,.83],[.12,1],[.4,1],[.72,.99],[.9,.83],[.97,.55],[1,.20]]:[[0,.83],[.12,1],[.46,.96],[.81,.77],[1,.26]],rings=[];
 for(let j=0;j<levels.length;j++){
  const [y,r]=levels[j];rings.push(Array.from({length:N},(_,i)=>{
   const a=i/N*Math.PI*2,wobble=1+.075*Math.sin(i*2.4+stone.seed)+.055*Math.cos(i*5.1+j*.6+stone.seed);
   return [Math.cos(a)*r*wobble*stone.width/2+stone.lean*y,y*stone.height,Math.sin(a)*r*wobble*stone.depth/2+.035*Math.sin(y*2.5+stone.seed)];
  }));
 }
 const tri=(a,b,c)=>vertices.push(...a,...b,...c);
 for(let j=1;j<rings.length;j++)for(let i=0;i<N;i++){const k=(i+1)%N,a=rings[j-1][i],b=rings[j][i],c=rings[j][k],d=rings[j-1][k];tri(a,b,c);tri(a,c,d);}
 for(let i=0;i<N;i++){const k=(i+1)%N;tri([stone.lean,stone.height,0],rings.at(-1)[k],rings.at(-1)[i]);tri([0,0,0],rings[0][i],rings[0][k]);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();geometry.computeBoundingBox();return geometry;
}
