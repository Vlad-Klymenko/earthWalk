import { CAMPUS } from './campus-data.js?v=2793186f071d';
import { terrainHeight as demHeight, buildingBase } from './terrain.js?v=2793186f071d';
import { ELECTRICAL_ID, electricalGeometry } from './electrical-data.js?v=2793186f071d';
import { REX_ID, REX_LINK_ID } from './small-buildings-data.js?v=2793186f071d';
import { framePoint, frameRectangle, clipFrameStrip } from './geometry.js?v=2793186f071d';

export const ELECTRICAL_LANDSCAPE_REPORT={
  title:'Hassell landscape strategy and plan · February 2016, printed pp. 18–19',
  url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-7370%2120190227T103632.167+GMT',
  pdfPages:[9,10],
};
export const ELECTRICAL_FLOOR_REPORT={
  title:'Hassell lower-ground plan · DA_A_1101 Rev C, 4 February 2016',
  url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-7370%2120190227T103552.133+GMT',
  rexEntryRL:34.780,southEntryRL:35.470,southPavingRL:[35.495,36.021],
};
const b=CAMPUS.buildings.find(p=>p.id===ELECTRICAL_ID),rex=CAMPUS.buildings.find(p=>p.id===REX_ID);
const frame=electricalGeometry(b).frame;
const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
const inRing=(x,z,points)=>{let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],c=points[j],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz)));if(Math.hypot(x-a.x-t*dx,z-a.z-t*dz)<1e-7)return true;if((a.z>z)!==(c.z>z)&&x<(c.x-a.x)*(z-a.z)/(c.z-a.z)+a.x)inside=!inside;}return inside;};
const startU=-8.1,endU=2.25,aisleV=20.1;
const p=b.points[1],q=b.points[2],atEnd=(endU-local(p).u)/(local(q).u-local(p).u);
const eastEnd={x:p.x+(q.x-p.x)*atEnd,z:p.z+(q.z-p.z)*atEnd};
const roadU=5,roadT=(roadU-local(p).u)/(local(q).u-local(p).u),roadEnd={x:p.x+(q.x-p.x)*roadT,z:p.z+(q.z-p.z)*roadT};
const ramp=[framePoint(frame,endU,10),framePoint(frame,roadU,10),roadEnd,eastEnd];
const arena=[rex.points[1],framePoint(frame,endU,10),eastEnd,b.points[1],b.points[0],rex.points[0]];
const bridge=CAMPUS.buildings.find(p=>p.id===REX_LINK_ID).points;
// The planning RLs are retained above as evidence. This reconstruction anchors
// the low court to the existing model's theatre foundation and the upper court
// to DEM ground at College Road. It does not silently treat unlike datums or
// the coarse DEM as an as-built terrace survey.
const lowGround=buildingBase(rex.points),roadPoint=framePoint(frame,endU,14),highGround=demHeight(roadPoint.x,roadPoint.z),rise=highGround-lowGround;
const range=(points,u0,u1)=>clipFrameStrip(points,{...frame,v:frame.u},u0,u1);
const seating=clipFrameStrip(arena,frame,-100,aisleV),aisle=clipFrameStrip(arena,frame,aisleV,100);
const tiers=Array.from({length:6},(_,i)=>({kind:'seat',points:range(seating,startU+i*(endU-startU)/6,startU+(i+1)*(endU-startU)/6),ground:lowGround+rise*(i+1)/6,reconstructed:true})).filter(p=>p.points.length>2);
const steps=Array.from({length:18},(_,i)=>({kind:'step',points:range(aisle,startU+i*(endU-startU)/18,startU+(i+1)*(endU-startU)/18),ground:lowGround+rise*i/18,reconstructed:true})).filter(p=>p.points.length>2);
const lowParts=[range(arena,-100,startU)];
const arrival=framePoint(frame,-8.9,22.8),target=framePoint(frame,2.25,22.8);
export const ELECTRICAL_LANDSCAPE={frame,arena,ramp,roadU,bridge,local,startU,endU,aisleV,lowGround,highGround,rise,tiers,steps,lowParts,arrival,target,
  heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),reconstructed:true,
  apron:frameRectangle(frame,94,7.7,1.5,49.25),
  rail:frameRectangle(frame,27,.10,3.9,53.05),
  seats:[-36,-28].map(u=>({u,v:48.6,points:frameRectangle(frame,2.5,.48,u,48.6),reconstructed:true})),
  beds:[{u0:-43,u1:-25,v:52.51,depth:.22},{u0:29,u1:43,v:52.25,depth:.65}].map(p=>({...p,points:frameRectangle(frame,p.u1-p.u0,p.depth,(p.u0+p.u1)/2,p.v),reconstructed:true})),
};
export function inElectricalCourt(x,z){return inRing(x,z,arena)||inRing(x,z,ramp);}
export function inElectricalLink(x,z){return inRing(x,z,bridge);}
export function courtGround(x,z){
  const {u,v}=local({x,z});
  if(u>=endU-1e-8&&u<=roadU+1e-8){const road=framePoint(frame,roadU,v),t=Math.max(0,Math.min(1,(u-endU)/(roadU-endU)));return highGround*(1-t)+demHeight(road.x,road.z)*t;}
  const t=Math.max(0,Math.min(1,(u-startU)/(endU-startU)));
  const fraction=v>=aisleV?Math.floor((t+1e-9)*18)/18:Math.ceil((t-1e-9)*6)/6;
  return lowGround+rise*fraction;
}
export function campusTerrainHeight(x,z){
  if(inElectricalCourt(x,z))return courtGround(x,z);
  const raw=demHeight(x,z);return inElectricalLink(x,z)?Math.min(raw,lowGround):raw;
}
export const ELECTRICAL_REPLACED_STEPS=['osm-way-280411957'];
