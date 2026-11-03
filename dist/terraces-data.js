import { CAMPUS } from './campus-data.js?v=4ade268cca69';
import { buildingBase } from './terrain.js?v=4ade268cca69';
import { orientedFrame,framePoint,frameRectangle } from './geometry.js?v=4ade268cca69';
export const TERRACES_ID='osm-way-45490780';
export const TERRACES_ARCHITECT={title:'fjcstudio · University Terraces Student Housing',url:'https://dev.fjcstudio.com/projects/university-terraces-student-housing/'};
export const TERRACES_HEIGHT_REPORT={title:'Grimshaw SSD built-form context, July 2016 · p. 30',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-7518%2120190227T232843.857+GMT',printedPage:30,pdfPage:3,roofRL:56.71};
export const TERRACES_STREET_VIEW={title:'University Terraces · Gate 2 Street View, July 2015',url:'https://www.google.com/maps/@?api=1&map_action=pano&pano=vDm24CJVy0XpD72glTmApw&heading=270&pitch=10'};
export const TERRACES_PASSAGE_ID='osm-way-655894584';
// Source envelope retained. Court, part boundaries, level split and landscape
// are explicitly photo-led reconstructions rather than measured OSM parts.
export function terracesGeometry(b=CAMPUS.buildings.find(b=>b.id===TERRACES_ID)){
 const f=orientedFrame(b.points,{x:-.15653592229916213,z:.9876722660022152}),base=buildingBase(b.points),maximum=TERRACES_HEIGHT_REPORT.roofRL-base;
 const passage=CAMPUS.paths.find(p=>p.id===TERRACES_PASSAGE_ID),a=passage.points[0],c=passage.points.at(-1),len=Math.hypot(c.x-a.x,c.z-a.z),dir={x:(c.x-a.x)/len,z:(c.z-a.z)/len};
 const westArrival={x:a.x-dir.x*5,z:a.z-dir.z*5},eastArrival={x:c.x+dir.x*5,z:c.z+dir.z*5};
 const columns=[];
 for(const side of [-1,1])for(let v=-f.length/2+4;v<f.length/2-2;v+=6){const p=framePoint(f,side*(f.width/2-1.7),v);const blocked=CAMPUS.paths.some(path=>path.points.slice(1).some((c,i)=>{const a=path.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)<(path.width||2.1)/2+.4;}));if(!blocked)columns.push({...p,radius:.28});}
 const streetArrival=framePoint(f,f.width/2+23,-9),streetHeading=Math.atan2(f.x-streetArrival.x,streetArrival.z-f.z);
 const court={points:frameRectangle(f,22.6,48,0,5)},gardens=[{points:frameRectangle(f,22.6,15,0,-11.5)},{points:frameRectangle(f,22.6,25,0,16.5)}];
 return {frame:f,base,maximum,retail:4.2,northHeight:14.2,upperRows:7,northRows:3,court,gardens,gardenFloor:base+4.2,gardenSlab:.22,balconyDepth:1.1,balconyRail:1.1,panelPitch:4.2,
  passage,westArrival,eastArrival,columns,heading:Math.atan2(dir.x,-dir.z),streetArrival,streetHeading,
  trees:[{...framePoint(f,-3,-11),height:7.2},{...framePoint(f,3,13),height:6.5},{...framePoint(f,-3,23),height:5.8}],reconstructed:true};
}
