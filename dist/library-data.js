import { CAMPUS as SOURCE } from './campus-data.js?v=0471b93d3b95';
import { BUILDING_PARTS } from './building-parts.js?v=0471b93d3b95';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=0471b93d3b95';
import { buildingBase } from './terrain.js?v=0471b93d3b95';

export const LIBRARY_ID='library';
export const LIBRARY_ANNEX_IDS=['osm-way-926419120','osm-way-926419121'];
export const LIBRARY_PHOTO={title:'Main Library · public exterior photographs',url:'https://studentvip.com.au/unsw/kensington/maps/132751'};
export const LIBRARY_FRAME=orientedFrame(SOURCE.buildings.find(b=>b.id===LIBRARY_ID).points,{x:-.16,z:1});

// Source parts / DEM remain separate from the photo-led architectural detail.
// Window rows are visible façade bands, not a replacement for OSM storeys.
export function libraryGeometry(b){
  const frame=LIBRARY_FRAME,base=buildingBase(b.points),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const parts=BUILDING_PARTS.filter(p=>p.parent===LIBRARY_ID);
  const annexes=SOURCE.buildings.filter(b=>LIBRARY_ANNEX_IDS.includes(b.id));
  const tower=parts.find(p=>p.id==='osm-part-926419114');
  // The separately mapped network supplies the actual four canopy corners.
  // Earlier 24 m / 8.6 m trapezoid and 62.5–66.8 RL slope were visual guesses.
  const covered=SOURCE.buildings.find(b=>b.id==='osm-way-1178531022'),walkFrame=orientedFrame(covered.points,{x:-.16,z:1});
  const canopyPoints=[14,15,41,42].map(i=>({...covered.points[i]})),frontV=Math.min(...canopyPoints.map(p=>local(p).v)),backV=Math.max(...canopyPoints.map(p=>local(p).v));
  const canopy={points:canopyPoints,eaveRL:59.8,lipRL:63.8,thickness:.26,reconstructed:true,sourceRoof:covered.id,heightAt:p=>59.8-base+4*Math.max(0,Math.min(1,(backV-local(p).v)/(backV-frontV)))**1.55};
  canopy.low=canopy.eaveRL-base;canopy.high=canopy.lipRL-base;
  const columns=[26.5,38.0].map(u=>{const point=framePoint(walkFrame,u,1.4),q=local(point);return {...point,u:q.u,v:q.v,points:frameRectangle(frame,1.05,1.65,q.u,q.v),top:59.35-base,reconstructed:true};});
  const portal={u:-19.1,v:-1.2,top:4.1,posts:[-4.4,2.05].map(v=>({u:-19.1,v,points:frameRectangle(frame,.5,.35,-19.1,v)})),reconstructed:true};
  const northRows=Array.from({length:7},(_,i)=>({low:17.0+i*5.12,high:20.35+i*5.12}));
  const slotRows=Array.from({length:12},(_,i)=>({low:3.4+i*4.16,high:5.45+i*4.16}));
  const arrival=framePoint(frame,5,-83),target=framePoint(frame,5,-40),westArrival=framePoint(frame,-53,49),westTarget=framePoint(frame,-14,4),coveredArrival=framePoint(frame,5,-60),coveredTarget=framePoint(frame,5,-48.5);
  const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
  return {frame,base,local,parts,annexes,tower,canopy,columns,portal,northRows,slotRows,fasciaBottom:53.4,arrival,target,heading:heading(arrival,target),westArrival,westTarget,westHeading:heading(westArrival,westTarget),coveredArrival,coveredTarget,coveredHeading:heading(coveredArrival,coveredTarget),reconstructed:true};
}

// Merge nearly collinear survey vertices for continuous façade bays only.
// Roofs and collision volumes continue to use the exact original rings.
export function libraryFacadeRing(points){
  const ring=points.map(p=>({...p}));
  let changed=true;
  while(changed&&ring.length>3){
    changed=false;
    for(let i=0;i<ring.length;i++){
      const a=ring[(i+ring.length-1)%ring.length],p=ring[i],c=ring[(i+1)%ring.length],dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz);
      const t=((p.x-a.x)*dx+(p.z-a.z)*dz)/(len*len);
      if(t>0&&t<1&&Math.abs((p.x-a.x)*dz-(p.z-a.z)*dx)/len<.075){ring.splice(i,1);changed=true;break;}
    }
  }
  return ring;
}
