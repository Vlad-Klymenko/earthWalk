import {CAMPUS as RAW} from './campus-data.js?v=dfa1c50ac01f';
import {medicalGeometry} from './medical-data.js?v=dfa1c50ac01f';
import {MEDICAL_PARTS} from './medical-parts.js?v=dfa1c50ac01f';
import {framePoint} from './geometry.js?v=dfa1c50ac01f';
export const LOWY_ID='osm-way-45230537';
export const LOWY_SOURCE='https://www.lahznimmo.com/lowy-cancer-research-centre-unsw';
// Photo-fitted detail, separate from the retained 32 m / eight-level map tags.
export const LOWY_SCREEN={sill:6.4,headInset:.85,mullion:.035,panePitch:1.15,panelDepth:.16,bladeDepth:.42,reconstructed:true};
export const LOWY_LINK={jamb:.56,head:1.0,sill:.72,projection:.58,glassOffset:.075,rows:4,panePitch:1.35,spandrel:.38,reconstructed:true};
export const LOWY_GREEN=['#75a63b','#82ad42','#90b34b','#6e9c35'];
export function lowyScreenPanels(length){
 const widths=[1.65,.62,.18,1.15,.28,1.85,.48,.16,1.05,.32,.68,.18],gaps=[2.1,1.05,1.6,1.1,1.85,1.2,.95,1.7,1.1,1.4,.9,1.6],panels=[];
 // Original irregular grouping fitted to the built courtyard overview. It is
 // not a tracing of the architect's exact cladding fabrication schedule.
 let cursor=.12,index=0;while(cursor<length-.12){const width=Math.min(widths[index%widths.length],length-.12-cursor),blade=width<.3;panels.push({start:cursor,end:cursor+width,depth:blade?LOWY_SCREEN.bladeDepth:LOWY_SCREEN.panelDepth,color:LOWY_GREEN[(Math.floor(index/3)+index%2)%4],blade,reconstructed:true});cursor+=width+gaps[index%gaps.length];index++;}
 return panels;
}
const signed=r=>r.reduce((sum,p,i)=>{const q=r[(i+1)%r.length];return sum+p.x*q.z-q.x*p.z;},0);
// Boolean partitions can retain a zero-area backtracking source vertex at a
// cut. Remove only collinear points from the facade walk, never source data.
const cleanRing=points=>{const ring=[...points];let changed=true;while(changed&&ring.length>3){changed=false;for(let i=0;i<ring.length;i++){const a=ring[(i+ring.length-1)%ring.length],p=ring[i],c=ring[(i+1)%ring.length],length=Math.hypot(c.x-a.x,c.z-a.z);if(length>1e-9&&Math.abs((c.x-a.x)*(p.z-a.z)-(c.z-a.z)*(p.x-a.x))/length<1e-7){ring.splice(i,1);changed=true;break;}}}return ring;};
const onSegment=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,l=dx*dx+dz*dz,t=((p.x-a.x)*dx+(p.z-a.z)*dz)/l;return t>=-1e-7&&t<=1+1e-7&&Math.abs(dx*(p.z-a.z)-dz*(p.x-a.x))/Math.sqrt(l)<1e-6;};
export function lowyFacadeFaces(building=RAW.buildings.find(b=>b.id===LOWY_ID)){
 const g=medicalGeometry(building),faces=[];
 for(const part of MEDICAL_PARTS.filter(p=>p.buildingId===LOWY_ID)){
  const cleaned=cleanRing(part.points),ring=signed(cleaned)>0?cleaned:[...cleaned].reverse(),bridge=part.kind==='bridge',low=bridge?g.bridgeBottom:0,high=bridge?g.bridgeRoof:g.roofRL-g.base;
  for(let i=0;i<ring.length;i++){
   const a=ring[i],c=ring[(i+1)%ring.length],length=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,nu=nx*g.frame.u.x+nz*g.frame.u.z,nv=nx*g.frame.v.x+nz*g.frame.v.z;
   const external=building.points.some((p,j)=>onSegment(a,p,building.points[(j+1)%building.points.length])&&onSegment(c,p,building.points[(j+1)%building.points.length]));
   const emit=(bottom,top)=>{if(top>bottom+1e-7)faces.push({a,c,length,nu,nv,bridge,external,bottom,top,kind:!external?'joint':bridge?(nu<-.9&&length>8?'link-frame':'link-panel'):(nv>.65?'courtyard':'laboratory'),reconstructed:true});};
   if(external)emit(low,high);
   // The occupied bridge meets the main body: no duplicated skin inside it.
   else if(!bridge){emit(0,g.bridgeBottom);emit(g.bridgeRoof,high);}
  }
 }
 return faces;
}
const g=medicalGeometry(RAW.buildings.find(b=>b.id===LOWY_ID));
const view=(id,name,u,v,tu,tv,pitch)=>{const arrival=framePoint(g.frame,u,v),target=framePoint(g.frame,tu,tv);return {id,name,code:'C25',kind:'academic',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch,showSign:false,description:'Photo-fitted green panel fields, narrow projecting blades and recessed glazed link frame. Original mapped outline, 32 m height and eight-level tag retained. Panel dimensions, pane count and detailed finishes are estimates from built architect photographs; current conditions unverified'};};
export const LOWY_VIEWS=[view('lowy-green-courtyard','Lowy · green courtyard façade',-5,36,-5,6,.35),view('lowy-projecting-link','Lowy · green projecting link',12,13,32,22,.53)];
