// Publicly reported dimensions, separate from ground elevation and OSM tags.
// The report gives overall heights, not a survey of every roof part.
import { NIDA_PARTS } from './nida-parts.js?v=acaf3f7bcacf';
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
    label: building.heightSource==='reported' ? 'NSW planning report' : building.heightSource==='mapped' ? 'OSM height tag' : building.heightSource==='mapped-parts'?'OSM building-part tags':'estimated',
    reference: building.heightReference||null,
  };
}
