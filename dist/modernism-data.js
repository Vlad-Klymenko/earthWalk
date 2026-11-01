import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=acaf3f7bcacf';

// Footprints and overall heights come from the retained map. Roof pitch,
// panel spacing, glazing bands and canopy dimensions are photo-led estimates.
export function scienceTheatreGeometry(b){
  const frame=orientedFrame(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const roofHeight=p=>b.height*(.67+.33*Math.max(0,Math.min(1,(frame.length/2-local(p).v)/frame.length)));
  const canopy={width:frame.width+1.2,depth:5.6,height:3.9,front:frame.length/2+5.6};
  const arrival=framePoint(frame,0,canopy.front+13);
  const paving=frameRectangle(frame,canopy.width+1.4,canopy.depth+1.3,0,frame.length/2+canopy.depth/2);
  const trees=[-10,9].map((u,i)=>({...framePoint(frame,u,frame.length/2+10),id:`reconstructed-science-tree-${i}`,height:9+i,reconstructed:true,source:'science-theatre-exterior'}));
  return {frame,local,roofHeight,canopy,paving,trees,arrival,heading:Math.atan2(-frame.v.x,frame.v.z)};
}

export function modernFacadeFrame(b){
  const frame=orientedFrame(b.points);
  const classify=(a,c)=>{
    const len=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
    return {length:len,nx,nz,u:nx*frame.u.x+nz*frame.u.z,v:nx*frame.v.x+nz*frame.v.z};
  };
  return {frame,classify};
}

export function scienceTheatreFoundation(b,heightAt){
  const {frame}=scienceTheatreGeometry(b),front=framePoint(frame,0,frame.length/2);
  return Math.max(...b.points.map(p=>heightAt(p.x,p.z)),heightAt(front.x,front.z));
}
