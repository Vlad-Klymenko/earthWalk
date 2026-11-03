import { orientedFrame, framePoint, frameRectangle, clipFrameStrip } from './geometry.js?v=e9883400adb4';
import { buildingBase, terrainHeight } from './terrain.js?v=e9883400adb4';

export const ESME_ID='osm-way-961744566';
export const SCIENCE_HEIGHT_REPORT={title:'Grimshaw SSD built-form report, July 2016 · pp. 30–32',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-7518%2120190227T232843.857+GMT',printedPage:30,pdfPage:3,parapetRL:68.9,plantRL:73.8};
export const SCIENCE_FLUE_REPORT={title:'Science and Engineering EIS, September 2016 · p. 27',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-7518%2120190227T232858.240+GMT',printedPage:27,pdfPage:33,flueRL:79.8};
export const ESME_HEIGHT_REPORT={title:'Ethos Urban podium modification, August 2017 · pp. 2–3',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-7518-MOD-1%2120190226T083350.800+GMT',printedPage:2,pdfPage:2,liftRL:35.1,podiumRL:33.14};
const FACADE_LEVELS=[33.14,37.1,41.6,46.1,50.6,55.1,59.6,64.1,68.9];
const frameFor=b=>orientedFrame(b.points,{x:-.162,z:.987});
const heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z);
const localU=(f,p)=>(p.x-f.x)*f.u.x+(p.z-f.z)*f.u.z;

export function esmeGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),half=frame.width/2,start=-half+12,end=11.5;
  // The built amphitheatre faces east into Alumni Lawn. Its lift is on the west landing.
  const cutFrame={...frame,v:frame.u},strip=(lo,hi)=>clipFrameStrip(b.points,cutFrame,lo,hi);
  const lowPoints=strip(end,half),lowRL=Math.max(...lowPoints.map(p=>terrainHeight(p.x,p.z)))+.1,topRL=ESME_HEIGHT_REPORT.podiumRL,count=32;
  const regions=[{points:strip(-half,start),rl:topRL},{points:lowPoints,rl:lowRL}];
  for(let k=0;k<count;k++)regions.push({points:strip(start+(end-start)*k/count,start+(end-start)*(k+1)/count),rl:topRL-(topRL-lowRL)*(k+1)/count});
  const surfaceRL=p=>{const u=localU(frame,p);if(u<=start)return topRL;if(u>=end)return lowRL;return topRL-(topRL-lowRL)*Math.min(count,Math.floor((u-start)/(end-start)*count)+1)/count;};
  const lift={points:frameRectangle(frame,5.5,5,-half+3.5,-6),bottomRL:topRL,topRL:ESME_HEIGHT_REPORT.liftRL};
  const arrival=framePoint(frame,half+8,0),target=framePoint(frame,start,0),stairArrival=framePoint(frame,half+1.5,0);
  return {frame,base,start,end,count,lowRL,topRL,regions,surfaceRL,lift,arrival,target,heading:heading(arrival,target),stairArrival,stairHeading:heading(stairArrival,target),reconstructed:true};
}

export function scienceLabGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),seb=b.id==='science-engineering';
  const maximumRL=seb?SCIENCE_FLUE_REPORT.flueRL:SCIENCE_HEIGHT_REPORT.parapetRL;
  // Hilmer's separate plant-wall elevation is not supplied: the 3.8 m zone is reconstructed.
  const mainRL=seb?SCIENCE_HEIGHT_REPORT.parapetRL:SCIENCE_HEIGHT_REPORT.parapetRL-3.8;
  const plantRL=seb?SCIENCE_HEIGHT_REPORT.plantRL:SCIENCE_HEIGHT_REPORT.parapetRL;
  const plant={points:frameRectangle(frame,frame.width-9,frame.length-9,0,0),bottom:mainRL-base,top:plantRL-base};
  const flues=seb?Array.from({length:6},(_,i)=>({...framePoint(frame,-8+i*3.2,1.5),bottom:plantRL-base,top:maximumRL-base,radius:.28})):[];
  const arrival=framePoint(frame,seb?-frame.width/2-5:10,seb?15:-frame.length/2-15),target=framePoint(frame,seb?-frame.width/2:10,seb?5:-frame.length/2);
  const bands=FACADE_LEVELS.slice(0,-1).filter(rl=>rl<mainRL).map((rl,i)=>({low:rl-base,high:Math.min(mainRL,FACADE_LEVELS[i+1])-base}));
  return {frame,base,seb,mainRL,mainHeight:mainRL-base,maximumRL,plantRL,plant,flues,rows:bands.length,bands,foyerTop:ESME_HEIGHT_REPORT.podiumRL-base,arrival,target,heading:heading(arrival,target),reconstructed:true};
}

export function scienceLinks(seb,hilmer){
  const a=seb.points[9],b=seb.points[10],c=hilmer.points[5],d=hilmer.points[4],mix=(p,q,t)=>({x:p.x+(q.x-p.x)*t,z:p.z+(q.z-p.z)*t});
  const points=[mix(a,b,.28),mix(c,d,.28),mix(c,d,.65),mix(a,b,.65)];
  const levels=FACADE_LEVELS.slice(0,7).map((floor,i)=>({bottomRL:floor-.18,topRL:FACADE_LEVELS[i+1]-.1}));
  const near=mix(a,b,.94),far=mix(c,d,.94),arrival={x:(near.x+far.x)/2,z:(near.z+far.z)/2};
  return {points,levels,topRL:levels.map(l=>l.topRL),arrival,reconstructed:true};
}
