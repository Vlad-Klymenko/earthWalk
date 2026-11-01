import { CAMPUS as MAPPED_CAMPUS } from './campus-data.js?v=af4aa1dbb222';
import { applyReportedHeight } from './building-heights.js?v=af4aa1dbb222';
import { COLLEGE_GARDEN, COLLEGE_PAVING, COLLEGE_COURTYARD_VIEW } from './campus-landscape.js?v=af4aa1dbb222';
import { VILLAGE_SPORTS } from './sports-data.js?v=af4aa1dbb222';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=af4aa1dbb222';

const fieldFrame=orientedFrame(VILLAGE_SPORTS.find(s=>s.sport==='soccer').points);
const standFrame=orientedFrame(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-1178531040').points,fieldFrame.v);
const standView=framePoint(standFrame,standFrame.width/2+17,0);
const cafeFrame=orientedFrame(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-1178531047').points);
const cafeShade={...cafeFrame,...framePoint(cafeFrame,0,cafeFrame.length/2+4.8)};
const cafePlazas=[
  {id:'home-ground-forecourt',name:'Home Ground forecourt',points:frameRectangle(cafeFrame,cafeFrame.width+6,cafeFrame.length+6)},
  {id:'home-ground-outdoor-seating',name:'Home Ground covered seating',points:frameRectangle(cafeShade,8,9)}
].map(p=>({...p,surface:'stone',reconstructed:true,source:'https://samcrawfordarchitects.com.au/project/unsw-village-green-home-ground-cafe'}));

function enhanceBuilding(b){
  if(b.id==='osm-way-1178531037')return {...b,name:'John Niland Scientia · glass canopy',named:true,campusRef:'G19',height:13,heightSource:'estimated',aliases:['Scientia','Leighton Hall','G19']};
  if(b.id==='osm-way-1116164557')return {...b,name:'John Niland Scientia · north wing',campusRef:'G19',aliases:['Scientia','G19']};
  if(b.id==='osm-way-1178531047')return {...b,name:'Home Ground Café',campusRef:'H11',aliases:[...b.aliases,'H11','Home Ground Kiosk'],identityReference:'https://www.google.com/maps/search/?api=1&query=Home+Ground+Cafe+UNSW'};
  return applyReportedHeight(b);
}

function enhanceLandmark(p){
  if(p.id==='new-college-village')return {...p,x:-227,z:3,heading:-.89,showSign:false,description:'H3 · Blue-glass screen and stepped residential wings. Height split is reconstructed'};
  if(p.id==='osm-way-45560897')return {...p,x:-47,z:210,heading:-.1,showSign:false,description:'N9 · Pale brickwork and two upper balcony rows. Visible storeys differ from the retained four-level map tag'};
  if(p.id==='osm-relation-1178128-0')return {...p,showSign:false,description:'C6 · Light brick courtyard college with a shaded water garden'};
  if(p.id==='osm-relation-2637829-0')return {...p,showSign:false,description:'B10 · Tall residential wings, lower screened blocks and mapped through-passages. Massing heights are reconstructed'};
  if(p.id==='osm-way-164558658')return {...p,x:-246,z:-181,heading:-Math.PI/2,showSign:false,description:'E2 · Glazed foyer, sloping roof and louvred Parade Theatre drum. Detail dimensions are reconstructed'};
  if(p.id==='osm-way-164558661')return {...p,showSign:false};
  if(p.id==='osm-way-45560472')return {...p,x:-201,z:143,heading:Math.PI/2,showSign:false,description:'M7 · Brick college with paired vertical window strips'};
  if(p.id==='osm-way-45560776')return {...p,x:-127,z:64,heading:-Math.PI/2,showSign:false,description:'L6 · Brick accommodation, green-glass bay and raised clerestory roof'};
  if(p.id==='mathews')return {...p,description:'F23 · Concrete tower with horizontal window bands'};
  if(p.id==='osm-way-1178531040')return {...p,...standView,heading:Math.atan2(-standFrame.u.x,standFrame.u.z),showSign:false,description:'Three canopy leaves above yellow and black seating. Roof height and seating details are reconstructed'};
  if(p.id==='pavilion')return {...p,x:-80,z:15,heading:Math.atan2(-18,24),showSign:false};
  if(p.id==='osm-way-1178531047')return {...p,name:'Home Ground Café',code:'H11',x:-10,z:30,heading:Math.atan2(16,2),showSign:false,description:'H11 · Glazed café and covered outdoor seating beside the running track'};
  return p;
}

// The OSM outlines existed without names. Identity cross-checked against the
// official G19 campus map and Google's public Scientia place listing.
export const CAMPUS={
  ...MAPPED_CAMPUS,
  sportsAreas:VILLAGE_SPORTS,
  paths:[...MAPPED_CAMPUS.paths,{...VILLAGE_SPORTS.find(s=>s.kind==='track'),kind:'track',name:'Village Green running track',width:3.2,widthSource:'estimated from aerial reference'}],
  greens:MAPPED_CAMPUS.greens.map(g=>g.id===COLLEGE_GARDEN.id?COLLEGE_GARDEN:g),
  plazas:[...MAPPED_CAMPUS.plazas,COLLEGE_PAVING,...cafePlazas],
  buildings:MAPPED_CAMPUS.buildings.map(enhanceBuilding),
  landmarks:[...MAPPED_CAMPUS.landmarks.map(enhanceLandmark),COLLEGE_COURTYARD_VIEW,
    {id:'village-courtyard',name:'UNSW Village courtyard',x:35,z:-228.31,heading:1.7313,code:'B10',kind:'courtyard',showSign:false,description:'Mapped courtyard and east-west footway beneath reconstructed residential bridges'},
    {id:'international-courtyard',name:'International House courtyard',x:-125.5,z:-218.1,heading:.16,code:'C6',kind:'courtyard',showSign:false,description:'Mapped courtyard opening; pond, pergola and planting are photo-led estimates'},
    {id:'osm-way-1178531037',name:'John Niland Scientia',x:323,z:22,heading:1.38,code:'G19',kind:'scientia',description:'G19 · Sandstone podium and tree-like glass canopy at the top of the main steps'}],
};
