import { CAMPUS } from './campus-data.js?v=2c6e10d9fbfe';
import { terrainHeight } from './terrain.js?v=2c6e10d9fbfe';
import { orientedFrame,framePoint,frameRectangle } from './geometry.js?v=2c6e10d9fbfe';
import { UNSW_GIS_LABEL_EVIDENCE,UNSW_GIS_SOURCE } from './unsw-gis-evidence.js?v=2c6e10d9fbfe';
export const NCPV_ID='new-college-village';
export const NCPV_RED_ID='osm-way-609912645';
export const NCPV_CORNER_ID='osm-way-609912647';
export const NCPV_SOURCE_IDS=[NCPV_ID,NCPV_RED_ID,NCPV_CORNER_ID];
export const NCPV_COLLEGE={title:'New College Postgraduate Village · official facilities',url:'https://newcollege.unsw.edu.au/live-at-unsw/new-college-postgraduate-village',floors:7};
export const NCPV_HEIGHT={title:'Randwick Council · GR1/24 context report, 30 April 2024',url:'https://randwick.infocouncil.biz/RedirectToDoc.aspx?URL=Open%2F2024%2F06%2FPPP_04062024_AGN_3784_AT.PDF',pdfPage:37,printedPage:35,innerPrintedPage:6,height:21.6,approximate:true};
export const NCPV_GIS={...UNSW_GIS_LABEL_EVIDENCE.find(p=>p.code==='H3'),source:UNSW_GIS_SOURCE};
export const NCPV_STREET={east:'https://www.google.com/maps/@?api=1&map_action=pano&pano=eI9WugTY9c1nUehUEc0Vzg&heading=270&pitch=12',south:'https://www.google.com/maps/@?api=1&map_action=pano&pano=8BJR-CmJS2esGSh39GSzJg&heading=0&pitch=10'};
export function ncpvGeometry(b=CAMPUS.buildings.find(b=>b.id===NCPV_ID)){
 const f=orientedFrame(b.points,{x:-.155,z:.988}),local=p=>({u:(p.x-f.x)*f.u.x+(p.z-f.z)*f.u.z,v:(p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z}),street=framePoint(f,27,24),base=terrainHeight(street.x,street.z)+.22;
 const screen={u:24.55,v0:-14.1,v1:4.65,bottom:3.1,top:21.6,standOff:1.05},redHeight=9.6,bodyHeight=20.95;
 const arrival={x:-227,z:3},target=framePoint(f,24,-5),northView=framePoint(f,0,-31),northTarget=framePoint(f,0,-15),southView=framePoint(f,0,31),courtView=framePoint(f,0,-1.5);
 const trees=[-18,-10,-2,6,14].map((u,i)=>({...framePoint(f,u,21.7),height:8.5+i%2*.7,radius:.22,u,v:21.7,reconstructed:true}));
 const hedges=[],path=CAMPUS.paths.find(p=>p.id==='osm-way-600500163'),a=path.points[2],c=path.points[3];
 // The screen-side hedge follows the next diagonal street-side footway edge.
 const d=path.points[4],dx=d.x-c.x,dz=d.z-c.z,len=Math.hypot(dx,dz),nx=dz/len,nz=-dx/len;
 for(let i=0;i<=30;i++){const t=i/30,p={x:c.x+dx*t+nx*2.45,z:c.z+dz*t+nz*2.45},q=local(p);if(q.v>-14&&q.v<5)hedges.push({...p,radius:.38,height:1.45,reconstructed:true});}
 const courtPaving=frameRectangle(f,26.2,19,0,-1.6),courtSamples=[];
 for(let u=-13.1;u<=13.1;u+=.5)for(let v=-11.1;v<=7.9;v+=.5){const p=framePoint(f,u,v);courtSamples.push(terrainHeight(p.x,p.z));}
 const courtFloor=Math.max(...courtSamples)+.08;
 return {frame:f,local,base,maximum:NCPV_HEIGHT.height,bodyHeight,redHeight,rows:7,redRows:2,screen,courtFloor,courtLawn:frameRectangle(f,20.5,13,0,-1.5),courtPaving,redTerrace:frameRectangle(f,23.4,6.2,.5,-15.2),redRoom:frameRectangle(f,22,5.1,.5,-15.2),trees,hedges,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),northView,northHeading:Math.atan2(northTarget.x-northView.x,northView.z-northTarget.z),southView,southHeading:Math.atan2(f.x-southView.x,southView.z-f.z),courtView,courtHeading:Math.atan2(northTarget.x-courtView.x,courtView.z-northTarget.z),reconstructed:true};
}
const g=ncpvGeometry();
export function inNcpvStreet(x,z){const p=g.local({x,z});return p.u>-25&&p.u<36&&p.v>-22&&p.v<24;}
