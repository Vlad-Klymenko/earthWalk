import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=fafc541ec63f';

// These separately mapped roof outlines are rendered with the auditorium's
// copper hoods, avoiding a second generic roof and invented support posts.
export const CLANCY_HOODS=['osm-way-1178531028','osm-way-1178531029','osm-way-1178531030'];

// Photo-led geometry anchored to the retained OSM outlines. Overall Clancy
// height is estimated from the architect's scaled section, not surveyed.
export function clancyGeometry(b){
  const frame=orientedFrame(b.points),centreU=-.74,glassV=-18.94;
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const core=[[-17.4,-1.4],[-6,-5.8],[6,-5.8],[17.4,-1.4],[17.4,7],[10,17.4],[-10,17.4],[-17.4,7]].map(([u,v])=>framePoint(frame,u,v));
  const hood={centreU,width:23,glassV,glassHeight:10,backV:-6,backHeight:7.1,lipV:-25,lipHeight:14.5,lipWidth:28};
  const roofHeight=v=>hood.backHeight+(hood.lipHeight-hood.backHeight)*(hood.backV-v)/(hood.backV-hood.lipV);
  const arrival=framePoint(frame,centreU,-45);
  return {frame,local,core,hood,roofHeight,arrival,heading:Math.atan2(frame.v.x,-frame.v.z),
    paving:frameRectangle(frame,33,13,centreU,-25)};
}

export function chancelleryGeometry(b){
  const frame=orientedFrame(b.points),west={minU:-38.94,maxU:4.15,minV:-8.51,maxV:4.33,bays:12,eave:14.15,rise:.85};
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const pitch=(west.maxU-west.minU)/west.bays;
  const roofHeight=p=>{const {u}=local(p),t=Math.max(0,Math.min(west.bays-1e-8,(u-west.minU)/pitch))%1;return west.eave+west.rise*Math.sin(Math.PI*t);};
  const entry=framePoint(frame,15.53,0),arrival=framePoint(frame,33.53,0);
  const ferns=[-13,-6,7,14].map((v,i)=>({...framePoint(frame,19.3+(i%2)*.8,v),height:2.3+(i%3)*.35,reconstructed:true}));
  const paving=frameRectangle(frame,18,32,24.53,0);
  const beds=[-10,10].map(v=>frameRectangle(frame,3,9,20,v));
  return {frame,local,west,pitch,roofHeight,entry,arrival,ferns,paving,beds,heading:Math.atan2(-frame.u.x,frame.u.z)};
}
