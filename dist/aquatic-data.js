import { orientedFrame, clipFrameStrip } from './geometry.js?v=0dd17659ccd5';
import { buildingBase } from './terrain.js?v=0dd17659ccd5';

export const POOL_ID='osm-way-45604576',GYM_ID='osm-way-45604587';
const heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z);
function edgeAprons(points,accept,width=2.1){
  const signed=points.reduce((s,p,i)=>{const q=points[(i+1)%points.length];return s+p.x*q.z-q.x*p.z;},0),ring=signed<0?[...points].reverse():points,result=[];
  for(let i=0;i<ring.length;i++){
    const a=ring[i],b=ring[(i+1)%ring.length],length=Math.hypot(b.x-a.x,b.z-a.z),nx=(b.z-a.z)/length,nz=-(b.x-a.x)/length;
    if(length>7&&accept(a,b,nx,nz)){
      const dx=(b.x-a.x)/length,dz=(b.z-a.z)/length,start={x:a.x+dx*.12,z:a.z+dz*.12},end={x:b.x-dx*.12,z:b.z-dz*.12};
      result.push([start,end,{x:end.x+nx*width,z:end.z+nz*width},{x:start.x+nx*width,z:start.z+nz*width}]);
    }
  }
  return result;
}

export function poolGeometry(b){
  // The low southern reception strip is reconstructed within the retained outline.
  const frame=orientedFrame(b.points,{x:0,z:1}),splitZ=-268.68;
  const hall=clipFrameStrip(b.points,frame,-100,splitZ-frame.z),front=clipFrameStrip(b.points,frame,splitZ-frame.z,100);
  const minZ=Math.min(...hall.map(p=>p.z)),maxZ=Math.max(...hall.map(p=>p.z));
  const ridgeZ=(minZ+maxZ)/2,eave=b.height-1,frontTop=4.8;
  const roofHeight=p=>b.height-Math.min(1,Math.abs(p.z-ridgeZ)/((maxZ-minZ)/2));
  const arrival={x:-213,z:-239},target={x:-202,z:-254};
  const paving=edgeAprons(front,(a,b,nx,nz)=>nz>.45);
  return {frame,base:buildingBase(b.points),hall,front,splitZ,ridgeZ,eave,frontTop,roofHeight,paving,arrival,target,heading:heading(arrival,target),reconstructed:true};
}

export function gymGeometry(b){
  const frame=orientedFrame(b.points,{x:-.164,z:.986}),eave=b.height-.55;
  const roofHeight=p=>b.height-.55*Math.min(1,Math.abs((p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z)/(frame.length/2));
  const entryEdge=[b.points[1],b.points[2]],paving=edgeAprons(b.points,(a,c)=>entryEdge.includes(a)&&entryEdge.includes(c));
  const target={x:(entryEdge[0].x+entryEdge[1].x)/2,z:(entryEdge[0].z+entryEdge[1].z)/2},arrival={x:target.x+frame.v.x*12,z:target.z+frame.v.z*12};
  return {frame,base:buildingBase(b.points),eave,roofHeight,entryEdge,paving,arrival,target,heading:heading(arrival,target),reconstructed:true};
}
