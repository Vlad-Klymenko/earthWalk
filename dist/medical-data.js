import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=a5f9f679a82f';
import { buildingBase } from './terrain.js?v=a5f9f679a82f';

export const WALLACE_HEIGHT_REPORT={
  title:'NSW Wallace Wurth modification assessment · Figure 4',
  url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=MP09_0075-MOD-1%2120190826T023213.121+GMT',
  printedPage:5,pdfPage:7,parapetRL:87.01,plantRL:90.55,flueRL:95,approximate:true,
};

export function medicalGeometry(b){
  const frame=orientedFrame(b.points,{x:-.2,z:1}),base=buildingBase(b.points),wallace=b.id==='wallace-wurth';
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const roofRL=wallace?WALLACE_HEIGHT_REPORT.parapetRL:base+b.height-1.4;
  const arrival=wallace?{x:748,z:-157}:framePoint(frame,-8,44);
  const target=wallace?framePoint(frame,12,-12):framePoint(frame,4,-5);
  // The public architect plan shows a glazed atrium in this mapped recess.
  // Its perimeter reuses six source vertices; enclosure and floor levels are
  // reconstructed, and it is not relabelled as an OSM building footprint.
  const atrium=wallace?[1,2,3,4,5,6].map(i=>({...b.points[i]})):null;
  const plants=wallace?[
    {points:frameRectangle(frame,10,24,14,-24),bottomRL:87.01,roofRL:90.55},
  ]:[{points:frameRectangle(frame,42,10,-5,-7),bottomRL:roofRL,roofRL:base+b.height}];
  const flues=wallace?[[-1,-29],[1,-29],[3,-29],[5,-29]].map(([u,v])=>({...framePoint(frame,14+u,v),radius:.2,reconstructed:true})):[];
  const supports=wallace?[-31,-10,11,34].map(v=>({...framePoint(frame,18.5,v),radius:.55,reconstructed:true})):
    [10,16,22].flatMap(v=>[32,35.5].map(u=>({...framePoint(frame,u,v),radius:.24,reconstructed:true})));
  return {frame,local,base,wallace,roofRL,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),atrium,plants,flues,supports,
    groundRL:57.57,upperBaseRL:65.53,upperOfficeRL:81.37,officeTopRL:85.5,
    bridgeBottom:6.4,bridgeRoof:b.height-3.2};
}
