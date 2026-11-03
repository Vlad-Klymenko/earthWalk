import { CAMPUS } from './campus-data.js?v=26b79da8da82';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=26b79da8da82';
import { terrainHeight, buildingBase } from './terrain.js?v=26b79da8da82';
export const QUADRANGLE_ID='osm-way-45229649';
export const QUADRANGLE_PHOTO={title:'Sardaka · Quadrangle sundial and courtyard, March 2019',url:'https://commons.wikimedia.org/wiki/File:(1)UNSW_Quadrangle_002.jpg',linkLabel:'Height · photograph-led tower estimate'};
export function quadrangleGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  // The small northward projection is the actual mapped sundial-tower base.
  const u=(local(b.points[11]).u+local(b.points[13]).u)/2,northV=(local(b.points[11]).v+local(b.points[13]).v)/2;
  const towerPoint=framePoint(frame,u,northV),courtRL=terrainHeight(towerPoint.x,towerPoint.z);
  const tower={u,v:northV+3.6,northV,width:6.6,depth:7.2,ground:courtRL,height:27,reconstructed:true};
  const roofRL=courtRL+15,ceilingRL=courtRL+4.25,galleryTopRL=courtRL+7.7,clerestoryRL=courtRL+11.55;
  const roofAt=p=>{const q=local(p);return roofRL-(q.v>2?Math.max(0,23-q.v)*.045:q.u<0?Math.max(0,q.u+48)*.045:Math.max(0,72-q.u)*.045);};
  const central=frameRectangle(frame,4.2,25.5,u,12),westRoute=['osm-way-45488658','osm-way-45488661'].map(id=>CAMPUS.paths.find(p=>p.id===id));
  const wa=westRoute[0].points[0],wc=westRoute.at(-1).points.at(-1),wl=Math.hypot(wc.x-wa.x,wc.z-wa.z),wx=(wc.x-wa.x)/wl,wz=(wc.z-wa.z)/wl;
  const westArrival={x:wa.x-wx*6,z:wa.z-wz*6},westTarget={x:wc.x+wx*4,z:wc.z+wz*4};
  const eastRoute=CAMPUS.paths.find(p=>p.id==='osm-way-280268479');
  const ea=eastRoute.points[0],ec=eastRoute.points.at(-1),el=Math.hypot(ec.x-ea.x,ec.z-ea.z),ex=(ec.x-ea.x)/el,ez=(ec.z-ea.z)/el;
  const eastArrival={x:ec.x+ex*6,z:ec.z+ez*6},eastTarget={x:ea.x-ex*4,z:ea.z-ez*4};
  const eastBottom=Math.max(...eastRoute.points.map(p=>terrainHeight(p.x,p.z)))+3.4;
  const column=(u,v)=>({...framePoint(frame,u,v),u,v,width:.48,reconstructed:true});
  const columns=[];
  for(let x=-28;x<51;x+=4.4)if(x<u-4.7||x>u+4.7)columns.push(column(x,5.65));
  for(let z=-41;z<4;z+=4.4)columns.push(column(-30.35,z));
  for(let z=-35.5;z<4;z+=4.4)columns.push(column(54.1,z));
  // Keep the west diagonal through-link and the eastern road portal clear.
  const nearSegment=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
  const freeColumns=columns.filter(p=>![...westRoute,eastRoute].some(route=>route.points.some((a,i)=>i&&nearSegment(p,route.points[i-1],a)<(route.width||3)/2+.65)));
  const arrival=framePoint(frame,10,-24),target=framePoint(frame,u,7),portalArrival=framePoint(frame,u,-2.5),portalTarget=framePoint(frame,u,28);
  const basserRoute=CAMPUS.paths.find(p=>p.id==='osm-way-588521806');
  const basserFloor=p=>{
    const q=local(p);let index=basserRoute.points.length-2;
    for(let i=0;i<basserRoute.points.length-1;i++)if(q.u<=local(basserRoute.points[i+1]).u){index=i;break;}
    const a=basserRoute.points[index],c=basserRoute.points[index+1],u0=local(a).u,u1=local(c).u,t=Math.max(0,Math.min(1,(q.u-u0)/(u1-u0)));
    return terrainHeight(a.x,a.z)+(terrainHeight(c.x,c.z)-terrainHeight(a.x,a.z))*t+.17;
  };
  const basser={startU:51.8,endU:82,centreV:-42,width:4.8,leaves:4,clearance:3.2,rise:.85,reconstructed:true,arrival:framePoint(frame,48.4,-41.3),target:framePoint(frame,84.5,-41.3),floorAt:basserFloor};
  basser.roofAt=p=>{const v=local(p).v,q=(v-basser.centreV)/(basser.width/2);return basser.floorAt(p)+basser.clearance+basser.rise*(1-q*q);};
  basser.supports=Array.from({length:basser.leaves+1},(_,i)=>[basser.centreV-basser.width/2,basser.centreV+basser.width/2].map(v=>{const u=basser.startU+(basser.endU-basser.startU)*i/basser.leaves;return {...framePoint(frame,u,v),u,v,reconstructed:true};})).flat();
  return {frame,base,local,tower,courtRL,roofRL,roofAt,ceilingRL,galleryTopRL,clerestoryRL,maximumRL:tower.ground+tower.height,central,westRoute,eastRoute,eastBottom,westArrival,westTarget,westHeading:Math.atan2(westTarget.x-westArrival.x,westArrival.z-westTarget.z),eastArrival,eastTarget,eastHeading:Math.atan2(eastTarget.x-eastArrival.x,eastArrival.z-eastTarget.z),columns:freeColumns,arrival,target,
    heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),portalArrival,portalTarget,portalHeading:Math.atan2(portalTarget.x-portalArrival.x,portalArrival.z-portalTarget.z),basser,reconstructed:true};
}
