import { CAMPUS as SOURCE } from './campus-data.js?v=5d6025d5a108';
import { BUILDING_PARTS } from './building-parts.js?v=5d6025d5a108';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=5d6025d5a108';
import { buildingBase } from './terrain.js?v=5d6025d5a108';

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
  const canopy={points:[[-2.5,-48.6],[13.5,-48.4],[17.5,-57],[-6.5,-57]].map(([u,v])=>framePoint(frame,u,v)),heightAt:p=>10.2+Math.max(0,Math.min(1,(-local(p).v-48.5)/8.5))*4.3,thickness:.26,reconstructed:true};
  const columns=[[-3.3,-51.4],[13.8,-51.4]].map(([u,v])=>({...framePoint(frame,u,v),u,v,points:frameRectangle(frame,1.05,1.65,u,v),top:10.0,reconstructed:true}));
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
