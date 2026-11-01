import { CAMPUS as MAPPED_CAMPUS } from './campus-data.js';

// The OSM outlines existed without names. Identity cross-checked against the
// official G19 campus map and Google's public Scientia place listing.
export const CAMPUS={
  ...MAPPED_CAMPUS,
  buildings:MAPPED_CAMPUS.buildings.map(b=>b.id==='osm-way-1178531037'?{...b,name:'John Niland Scientia · glass canopy',named:true,campusRef:'G19',height:13,heightSource:'estimated',aliases:['Scientia','Leighton Hall','G19']}:b.id==='osm-way-1116164557'?{...b,name:'John Niland Scientia · north wing',campusRef:'G19',aliases:['Scientia','G19']}:b),
  landmarks:[...MAPPED_CAMPUS.landmarks,{id:'osm-way-1178531037',name:'John Niland Scientia',x:323,z:22,heading:1.38,code:'G19',kind:'scientia',description:'G19 · Sandstone podium and tree-like glass canopy at the top of the main steps'}],
};
