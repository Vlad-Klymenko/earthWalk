// Publicly reported heights and parapet levels, separate from ground and OSM
// tags. A roof RL minus coarse DEM ground is explicitly a derived estimate.
import { NIDA_PARTS } from './nida-parts.js?v=ea018f24b958';
import { buildingBase } from './terrain.js?v=ea018f24b958';
export const CHEMICAL_ROOF_REPORT={
  title:'Science and Engineering Building · Grimshaw SSD report, July 2016',
  url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-7518%2120190227T232843.857+GMT',
  printedPage:30,pdfPage:3,parapetRL:75.6,approximate:true,
};
export const HEIGHT_REPORT = {
  title: 'UNSW B22 Redevelopment · NSW assessment report, June 2020',
  url: 'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-9673%2120200623T070714.309+GMT',
  printedPage: 22,
  pdfPage: 28,
};

export const REPORTED_HEIGHTS = {
  library: {height:57.74, source:HEIGHT_REPORT},
  mathews: {height:54, source:HEIGHT_REPORT},
};

export function applyReportedHeight(building) {
  if(building.id==='chemical-sciences')return {...building,mappedHeight:building.height,height:CHEMICAL_ROOF_REPORT.parapetRL-buildingBase(building.points),heightSource:'derived',heightReference:CHEMICAL_ROOF_REPORT,
    heightNote:'The 2016 drawing gives an approximate parapet RL of 75.6 m, an elevation rather than a building height. The displayed height subtracts the model’s NSW DEM foundation, assuming compatible datums. Original 45 m / 14-level map tags remain; lower wings and roof services are reconstructed.'};
  if(building.id==='osm-way-164558658')return {...building,mappedHeight:building.height,height:Math.max(...NIDA_PARTS.map(p=>p.height)),heightSource:'mapped-parts',heightReference:{title:'OpenStreetMap building-part height tags',url:'https://www.openstreetmap.org/way/609912635'}};
  const report=REPORTED_HEIGHTS[building.id];
  return report ? {...building, mappedHeight:building.height, height:report.height,
    heightSource:'reported', heightReference:report.source} : building;
}

export function heightDescription(building, appearance={}) {
  if(!building)return null;
  const estimated=building.heightSource==='estimated';
  return {
    metres: estimated ? (appearance.heightEstimate||building.height) : building.height,
    quantity:building.heightQuantity||(building.heightSource==='derived'?'Parapet above model base':'Building'),
    label: building.heightLabel|| (building.heightSource==='derived'?'approx. planning RL minus DEM':building.heightSource==='reported' ? 'NSW planning report' : building.heightSource==='mapped' ? 'OSM height tag' : building.heightSource==='mapped-parts'?'OSM building-part tags':'estimated'),
    reference: building.heightReference||null,
  };
}
