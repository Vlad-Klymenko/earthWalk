import { NEWTON_ID, KEITH_ID, PHYSICS_ID, newtonGeometry, keithGeometry, physicsGeometry } from './physics-precinct-data.js?v=06356e0af2e9';
import { WILLIS_ID, K17_VISUAL_HEIGHT, k17Geometry, willisGeometry } from './engineering-lane-data.js?v=06356e0af2e9';
import { RUPERT_ID, rupertGeometry } from './rupert-data.js?v=06356e0af2e9';
import { RUPERT_LAWN } from './rupert-parts.js?v=06356e0af2e9';
import { sirfGeometry, agsmGeometry } from './eastern-landmarks-data.js?v=06356e0af2e9';
import { CAMPUS as MAPPED_CAMPUS } from './campus-data.js?v=06356e0af2e9';
import { applyReportedHeight } from './building-heights.js?v=06356e0af2e9';
import { COLLEGE_GARDEN, COLLEGE_PAVING, COLLEGE_COURTYARD_VIEW } from './campus-landscape.js?v=06356e0af2e9';
import { VILLAGE_SPORTS } from './sports-data.js?v=06356e0af2e9';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=06356e0af2e9';
import { heritageGeometry, whiteHouseStair, goldsteinGeometry, HERITAGE_FIGS } from './heritage-data.js?v=06356e0af2e9';
import { scienceTheatreGeometry, websterTheatresGeometry } from './modernism-data.js?v=06356e0af2e9';
import { clancyGeometry, chancelleryGeometry, CLANCY_HOODS } from './upper-campus-data.js?v=06356e0af2e9';
import { bioscienceGeometry, mathewsTheatreGeometry, MATHEWS_COVERED_ROUTES } from './bioscience-data.js?v=06356e0af2e9';
import { civilGeometry, patriciaGeometry } from './lecture-precinct-data.js?v=06356e0af2e9';
import { samuelsGeometry, goodsellGeometry } from './eastern-faculty-data.js?v=06356e0af2e9';
import { medicalGeometry, WALLACE_HEIGHT_REPORT } from './medical-data.js?v=06356e0af2e9';

const fieldFrame=orientedFrame(VILLAGE_SPORTS.find(s=>s.sport==='soccer').points);
const standFrame=orientedFrame(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-1178531040').points,fieldFrame.v);
const standView=framePoint(standFrame,standFrame.width/2+17,0);
const cafeFrame=orientedFrame(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-1178531047').points);
const cafeShade={...cafeFrame,...framePoint(cafeFrame,0,cafeFrame.length/2+4.8)};
const cafePlazas=[
  {id:'home-ground-forecourt',name:'Home Ground forecourt',points:frameRectangle(cafeFrame,cafeFrame.width+6,cafeFrame.length+6)},
  {id:'home-ground-outdoor-seating',name:'Home Ground covered seating',points:frameRectangle(cafeShade,8,9)}
].map(p=>({...p,surface:'stone',reconstructed:true,source:'https://samcrawfordarchitects.com.au/project/unsw-village-green-home-ground-cafe'}));
const scienceForecourt=scienceTheatreGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='science-theatre'));
const theatrePassage=websterTheatresGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-45488789'));
const clancyForecourt=clancyGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-45230512'));
const chancelleryForecourt=chancelleryGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='chancellery'));
const bioscienceForecourt=bioscienceGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='biological-north'));
const mathewsForecourt=mathewsTheatreGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='mathews-theatres'));

function enhanceBuilding(b){
  if(b.id===NEWTON_ID)return {...b,heightNote:'The 16 m height and five-level map tag remain. Four photographed window rows, patterned brickwork, pale infill panels, turquoise entrance treatment and a shallow stair / ramp are reconstructed. Exact access dimensions and levels are estimates, not an accessibility survey.'};
  if(b.id===KEITH_ID)return {...b,heightNote:'The 8 m height and single-level map tag remain. The curved brick upper volume projects over recessed lower glazing. The 1.3 m inset and soffit level are reconstructed from public photographs, not measured dimensions.'};
  if(b.id===PHYSICS_ID)return {...b,heightNote:'The 8 m height and single-level map tag remain. A public service-elevation photograph guides brick above a rendered base, high narrow windows, downpipes and a pale roof enclosure. Exact face assignment, roof levels and service placement are estimated. The official image shows the separate Old Main entrance approach.'};
  if(b.id==='k17')return {...b,previousEstimate:b.height,height:K17_VISUAL_HEIGHT,heightSource:'estimated',heightReference:{title:'Photo-led massing estimate; no measured height found',url:'https://studentvip.com.au/unsw/kensington/maps/133065',linkLabel:'Model height · exterior photographs'},heightNote:'The original generic 19.2 m estimate is replaced by an estimated 26 m massing from exterior proportions and visible rear window rows. The six-level map tag remains. Concrete panel joints, rear bays, projecting landings, screen pitch, glass foyer and orange stair are reconstructed, not surveyed.'};
  if(b.id===WILLIS_ID)return {...b,heightNote:'The 12 m height and three-level map tags remain. Public photographs show two tall workshop window rows, brick piers, dark tile bands and a low-pitched roof. The rows do not replace the map level tag. Roof pitch, northern breeze-block motif and glazed laneway cover are photo-led reconstructions.'};
  if(b.id===RUPERT_ID)return {...b,heightNote:'The 20 m height and five-level OSM tag remain. The north entrance has a lower white-panel block, open steel frame and suspended upper floor; the principal wings remain taller. Component heights, cladding and columns are reconstructed from architect photographs and July 2015 Street View. The mapped Southern Drive and northern footways pass beneath raised floors.'};
  if(b.id==='osm-way-45604880')return {...b,heightNote:'The mapped 8 m height and two-level tag remain. Folded silver cladding and triangular glazed openings follow public photographs and July 2015 Street View. Bay divisions, projection and detailed dimensions are reconstructed; service faces are approximate.'};
  if(b.id==='osm-way-101505149')return {...b,heightNote:'The mapped 20 m height and five-level tag remain. Pale brick street faces and curved courtyard glazing follow official exterior photographs and February 2022 Street View. Exact floor divisions, pergola dimensions and unseen elevations are reconstructed.'};
  if(b.id==='osm-way-45230790')return {...b,heightNote:'The 40 m height and ten-level OSM tag are retained. Eight upper window rows, pale projecting bands, a dark teaching base and separate rooftop plant follow the public exterior. Their component dimensions are reconstructed.'};
  if(b.id==='osm-way-45230803')return {...b,heightNote:'The 12 m height and three-level OSM tag remain. Brick lecture halls, faceted foyer panels, glazed canopies and an exterior stair follow public photographs. Stair dimensions, terrace height and detailed placement are reconstructed.'};
  if(b.id==='osm-way-290473701')return {...b,heightNote:'The 28 m height and seven-level OSM tag are retained. Brick base, narrow window strips, white mesh sun screens and rooftop glasshouse follow public photographs; detailed dimensions and roof placement are reconstructed.'};
  if(b.id==='osm-way-45604203')return {...b,heightNote:'The 15 m height and six-level OSM tag are retained. The courtyard shows four visible window rows; lower levels vary with the slope. The roof is placed 15 m above the courtyard entrance; lower masonry extends down the DEM slope. That foundation choice, window bays and the red-column canopy are reconstructions.'};
  if(b.id==='wallace-wurth'){
    const g=medicalGeometry(b);
    return {...b,previousEstimate:b.height,previousVisualEstimate:24,height:WALLACE_HEIGHT_REPORT.flueRL-g.base,heightSource:'derived',heightQuantity:'Flue top above model base',heightReference:WALLACE_HEIGHT_REPORT,
      heightNote:'Planning elevations distinguish the 87.01 m parapet, 90.55 m plant and 95.00 m exhaust flues. The displayed value subtracts the NSW DEM foundation from the flue RL, assuming compatible datums; it is not an as-built survey. Main wings remain lower. Missing map-level tags are retained; façade and internal splits are reconstructed.'};
  }
  if(b.id==='osm-way-45230537')return {...b,heightNote:'The 32 m height and eight-level OSM tag are retained. Concrete street faces, green courtyard screens and the raised occupied link follow photographs and architect elevations; their detailed dimensions are reconstructed. Later recladding retained the original appearance.'};
  if(['biological-north','biological-south'].includes(b.id)){
    const g=bioscienceGeometry(b);
    return {...b,previousEstimate:b.height,height:g.report.roofRL-g.base,heightSource:'derived',heightQuantity:'Plant roof above model base',heightReference:g.report,
      heightNote:'Planning roof elevation minus NSW DEM foundation, assuming compatible vertical datums. Built photographs corroborate the massing; this is not an as-built height survey. Internal massing, cladding pitch and plant footprints are reconstructed. The source has no measured OSM height or level tag.'};
  }
  if(MATHEWS_COVERED_ROUTES.includes(b.id))return {...b,previousEstimate:b.height,height:3.8,heightSource:'estimated',terrainCanopy:true,heightNote:'Estimated 3.8 m cover above local terrain, following the mapped roof outline. Supports and roof pitch are photo-led approximations, not surveyed dimensions.'};
  if(CLANCY_HOODS.includes(b.id))return {...b,modelledWith:'osm-way-45230512',heightNote:'Mapped roof outline retained. Rendered with Clancy’s reconstructed copper hoods; the original generic 9.6 m estimate is not a measured roof height.'};
  if(b.id==='osm-way-45230512')return {...b,mappedHeight:b.height,height:14.5,heightSource:'estimated',heightReference:{title:'Architect scaled section and exterior photographs',url:'https://www.lahznimmo.com/gate-9-unsw',linkLabel:'Model height · architect section'},heightNote:'Overall 14.5 m is a scaled-section model estimate; the original 8 m map tag remains. The architect describes 10 m glazing and the engineer describes 8 m frontage / a 23 m portal: these are differing component figures, not surveyed overall heights.'};
  if(b.id==='chancellery')return {...b,heightNote:'The 15 m height is the retained OSM tag. The NBRS survey describes five storeys including basement and sub-basement; visible rows change with the slope. Façade divisions and vault dimensions are reconstructed.',heightReference:{title:'Retained OSM height tag',url:'https://www.openstreetmap.org/way/265881082',linkLabel:'Height · OSM tag'}};
  if(b.id==='osm-way-71500653')return {...b,mappedHeight:b.height,height:12,heightSource:'estimated',heightReference:{title:'Photograph-led model estimate',url:'https://www.tkda.com.au/projects/university-of-nsw-goldstein-hall/',linkLabel:'Model height · exterior reference'},heightNote:'The original 20 m map tag is retained as conflicting evidence; the 12 m model height is a photograph-led estimate, not a measured replacement.'};
  if(b.id==='osm-way-1178531037')return {...b,name:'John Niland Scientia · glass canopy',named:true,campusRef:'G19',height:13,heightSource:'estimated',aliases:['Scientia','Leighton Hall','G19']};
  if(b.id==='osm-way-1116164557')return {...b,name:'John Niland Scientia · north wing',campusRef:'G19',aliases:['Scientia','G19']};
  if(b.id==='osm-way-1178531047')return {...b,name:'Home Ground Café',campusRef:'H11',aliases:[...b.aliases,'H11','Home Ground Kiosk'],identityReference:'https://www.google.com/maps/search/?api=1&query=Home+Ground+Cafe+UNSW'};
  return applyReportedHeight(b);
}

function enhanceLandmark(p){
  if([NEWTON_ID,KEITH_ID,PHYSICS_ID].includes(p.id)){const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),g=p.id===NEWTON_ID?newtonGeometry(b):p.id===KEITH_ID?keithGeometry(b):physicsGeometry(b);return {...p,...g.arrival,heading:g.heading,pitch:p.id===NEWTON_ID?.2:.12,showSign:false,description:p.id===NEWTON_ID?'J12 · Patterned brickwork, pale window panels and turquoise west entrance; dimensions reconstructed':p.id===KEITH_ID?'J14 · Curved brick auditorium above recessed glazing and a pale projecting soffit':'K14 · Brick service volume, rendered base, narrow high windows and roof services; details reconstructed'};}

  if(p.id==='k17'||p.id===WILLIS_ID){const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),k17=p.id==='k17',g=k17?k17Geometry(b):willisGeometry(b);return {...p,...g.arrival,heading:g.heading,pitch:k17?.23:.12,showSign:false,description:k17?'K17 · Concrete stair tower, screened upper façade, glass foyer and orange stair; overall height is a photo-led estimate':'J18 · Brick workshops, dark tiled spandrels, tall windows and the northern entrance; detailed dimensions are reconstructed'};}

  if(p.id===RUPERT_ID){const g=rupertGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===p.id));return {...p,...g.arrival,heading:g.heading,pitch:.25,showSign:false,description:'M15 · Black steel frame, tilted white entrance panels, pale vertical fins and raised wings above Southern Drive; detailed dimensions are reconstructed'};}
  if(['osm-way-45604880','osm-way-101505149'].includes(p.id)){
    const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),sirf=p.id==='osm-way-45604880',g=sirf?sirfGeometry(b):agsmGeometry(b);
    return {...p,...g.arrival,heading:g.heading,pitch:sirf?.12:.35,showSign:false,description:sirf?'G23 · Folded silver cladding and triangular glazed openings; detailed dimensions are reconstructed':'G27 · Pale brick wings, curved courtyard glazing and slatted pergola; details are photo-led estimates'};
  }
  if(['osm-way-45230790','osm-way-45230803'].includes(p.id)){
    const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),civil=p.id==='osm-way-45230790',g=civil?civilGeometry(b):patriciaGeometry(b);
    return {...p,...g.arrival,heading:g.heading,pitch:civil?.42:.1,showSign:false,description:civil?'H20 · Projecting pale concrete bands, eight upper window rows, dark entrance base and rooftop services':'E19 · Brick lecture halls, pale faceted entrance panels, glass awnings and red-column upper gallery'};
  }
  if(['osm-way-290473701','osm-way-45604203'].includes(p.id)){
    const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),samuels=p.id==='osm-way-290473701',g=samuels?samuelsGeometry(b):goodsellGeometry(b);
    return {...p,...g.arrival,heading:g.heading,pitch:samuels?.32:.25,showSign:false,description:samuels?'F25 · Pale metal cladding, narrow horizontal windows and white mesh screens above a brick base; glazed research rooms on the roof':'F20 · Pale brick, tall narrow windows and a glazed entrance canopy on red columns in the courtyard'};
  }
  // The original map export measures heading from south. The first-person
  // renderer measures it from north; explicit photo-view overrides below
  // already use the renderer convention.
  if(Number.isFinite(p.heading))p={...p,heading:Math.atan2(Math.sin(p.heading),-Math.cos(p.heading))};
  if(['wallace-wurth','osm-way-45230537'].includes(p.id)){
    const g=medicalGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===p.id));
    return {...p,...g.arrival,heading:g.heading,pitch:g.wallace?.2:.28,showSign:false,description:g.wallace?'C27 · Pale folded precast, amber shutters, recessed upper office floor and raised teaching base. Separate planning levels guide the massing':'C25 · Pale laboratory shell, green glazed courtyard façade and occupied bridge on circular columns. The mapped overall height remains'};
  }
  if(['biological-north','biological-south'].includes(p.id)){
    const g=bioscienceGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===p.id));
    return {...p,...g.arrival,heading:g.heading,pitch:.27,showSign:false,description:g.north?'D26 · Silver aluminium fins, patterned panels and stepped rooftop plant. Planning elevations and photo-led reconstruction':'E26 · Terracotta fins, projecting blue-glass box and glazed connecting atrium. Planning elevations and photo-led reconstruction'};
  }
  if(p.id==='mathews-theatres'){
    const g=mathewsTheatreGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===p.id));
    return {...p,...g.arrival,heading:g.heading,pitch:.08,showSign:false,description:'D23 · Concrete auditorium shell, glazed entrance and covered pedestrian route. Entrance details are reconstructed from public photographs'};
  }
  if(p.id==='osm-way-45230512')return {...p,...clancyForecourt.arrival,heading:clancyForecourt.heading,pitch:.1,showSign:false,description:'C24 · Flared copper hood, golden soffit and tall glazed northern foyer. Overall height and hood geometry are reconstructed'};
  if(p.id==='chancellery'){
    const g=chancelleryGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===p.id));
    return {...p,...g.arrival,heading:g.heading,pitch:.08,showSign:false,description:'C22 · Brick wings, recessed glazing and the eastern entrance facing Michael Birt Gardens'};
  }
  if(p.id==='chemical-sciences')return {...p,x:51.434,z:-25.375,heading:-40*Math.PI/180,pitch:16*Math.PI/180,showSign:false,description:'F10 · Banded tower, lower finned glazing and glazed stair bay. Viewpoint follows the inspected public panorama; massing and mechanical details are reconstructed'};
  if(p.id==='osm-way-45488789')return {...p,...theatrePassage.arrival,heading:theatrePassage.heading,pitch:.06,showSign:false,description:'G15 · Glazed entrance and curved canopy panels beside the Quadrangle. Canopy and panel dimensions are reconstructed'};
  if(p.id==='science-theatre'){
    const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),g=scienceTheatreGeometry(b);
    return {...p,...g.arrival,heading:g.heading,pitch:.08,showSign:false,description:'F13 · Panelled auditorium, tall glazed entrance and covered forecourt. The five-level map tag is retained; the façade follows exterior photographs'};
  }
  if(p.id==='dalton'){
    const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),f=orientedFrame(b.points),view=framePoint(f,0,f.length/2+18);
    return {...p,...view,heading:Math.atan2(-f.v.x,f.v.z),pitch:.15,showSign:false,description:'F12 · Blank aggregate end wall, two upper window bands and glazed Teaching Commons. Façade dimensions are reconstructed'};
  }
  if(p.id==='robert-webster')return {...p,showSign:false,description:'G14 · Reflective mall elevation, dense white end fins and brown ground floor. Glazing details and unseen elevations are reconstructed'};
  if(p.id==='osm-way-164552439'){
    const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),{frame}=heritageGeometry(b,'figtree'),view=framePoint(frame,0,frame.length/2+15);
    return {...p,...view,heading:Math.atan2(-frame.v.x,frame.v.z),showSign:false,description:'B14d · Corrugated theatre hut, gabled main roof and lower side annex'};
  }
  if(p.id==='osm-way-306785257')return {...p,showSign:false,description:'B15 · Three-storey former totalisator building. The original two-level map tag is retained; height is reconstructed'};
  if(p.id==='osm-way-196250617')return {...p,showSign:false,description:'C15 · Timber weatherboards, two-level verandah and exterior stair. Detail dimensions are reconstructed'};
  if(p.id==='osm-way-71500653'){
    const b=MAPPED_CAMPUS.buildings.find(b=>b.id===p.id),{frame,courtyard}=goldsteinGeometry(b),view=framePoint(courtyard,0,-8);
    return {...p,...view,heading:Math.atan2(frame.v.x,-frame.v.z),showSign:false,description:'D16 · Concrete frame and tall timber glazing beside the formal courtyard'};
  }
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
  trees:[...rupertGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===RUPERT_ID)).trees,...HERITAGE_FIGS,...scienceForecourt.trees,...civilGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-45230790')).trees,...samuelsGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-290473701')).trees,...MAPPED_CAMPUS.trees],
  sportsAreas:VILLAGE_SPORTS,
  paths:[...MAPPED_CAMPUS.paths,{...VILLAGE_SPORTS.find(s=>s.kind==='track'),kind:'track',name:'Village Green running track',width:3.2,widthSource:'estimated from aerial reference'}],
  greens:[...MAPPED_CAMPUS.greens.map(g=>g.id===COLLEGE_GARDEN.id?COLLEGE_GARDEN:g),...RUPERT_LAWN.map((points,i)=>({id:'rupert-courtyard-lawn-'+i,name:'Rupert Myers courtyard lawn',points,reconstructed:true,source:'https://studentvip.com.au/unsw/kensington/maps/133844'}))],
  plazas:[...MAPPED_CAMPUS.plazas,{id:'k17-foyer-footway',name:'K17 glazed foyer footway',points:k17Geometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='k17')).paving,surface:'stone',color:'#a6b2a0',reconstructed:true,source:'https://commons.wikimedia.org/wiki/File:CSE-K17-UNSW-Front.jpg'},{id:'rupert-north-entry-paving',name:'Rupert Myers north entrance paving',points:frameRectangle(rupertGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===RUPERT_ID)).frame,28,10.4,-22,-12.8),surface:'stone',color:'#a49b85',reconstructed:true,source:'https://dentoncorkermarshall.com/projects/rupert-myers-building-university-of-new-south-wales/'},{id:'rupert-courtyard-paving',name:'Rupert Myers courtyard paving',points:MAPPED_CAMPUS.buildings.find(b=>b.id===RUPERT_ID).holes[0],holes:RUPERT_LAWN,surface:'brick',color:'#9e9884',reconstructed:true,source:'https://www.google.com/maps/@?api=1&map_action=pano&pano=MY7rSxmegZUS33zB5RS9iA&heading=69&pitch=0&fov=90'},{id:'sirf-north-paving',name:'SIRF northern footway',points:sirfGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-45604880')).paving,surface:'stone',color:'#a4b0a5',reconstructed:true,source:'https://www.google.com/maps/@?api=1&map_action=pano&pano=-TC9UCgCuGSTseqqjeCIXg&heading=180&pitch=5&fov=90'},{id:'mathews-theatres-entry',name:'Mathews Theatres entrance paving',points:mathewsForecourt.paving,surface:'stone',color:'#baaa8b',reconstructed:true,source:'https://studentvip.com.au/unsw/kensington/maps/133153'},{id:'bioscience-north-terrace',name:'Biosciences northern entrance terrace',points:bioscienceForecourt.forecourt,surface:'stone',reconstructed:true,source:'https://www.woodsbagot.com/projects/university-of-new-south-wales-biological-sciences/'},COLLEGE_PAVING,...cafePlazas,{id:'science-theatre-forecourt',name:'Science Theatre covered forecourt',points:scienceForecourt.paving,surface:'stone',reconstructed:true,source:'https://www.learningenvironments.unsw.edu.au/physical-spaces/k-f13/k-f13-g09'},{id:'webster-theatres-passage',name:'Webster Theatres covered passage',points:theatrePassage.paving,surface:'stone',reconstructed:true,source:'https://studentvip.com.au/unsw/kensington/maps/135193'},{id:'clancy-north-forecourt',name:'Clancy northern forecourt',points:clancyForecourt.paving,surface:'stone',reconstructed:true,source:'https://www.lahznimmo.com/gate-9-unsw'},{id:'chancellery-entry-paving',name:'Chancellery eastern forecourt',points:chancelleryForecourt.paving,holes:chancelleryForecourt.beds,surface:'stone',color:'#ad9d89',reconstructed:true,source:'https://studentvip.com.au/unsw/kensington/maps/135096'}],
  buildings:MAPPED_CAMPUS.buildings.map(enhanceBuilding),
  landmarks:[...MAPPED_CAMPUS.landmarks.map(enhanceLandmark),COLLEGE_COURTYARD_VIEW,
    (()=>{const g=newtonGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===NEWTON_ID));return {id:'newton-entry-stair',name:'Newton west entrance steps',...g.stairArrival,heading:g.stairHeading,pitch:.08,showSign:false,code:'J12',kind:'courtyard',description:'Reconstructed shallow stair and turquoise-sided ramp to the west entrance; exact rise and placement are estimated'};})(),
    (()=>{const g=willisGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===WILLIS_ID));return {id:'willis-covered-lane',name:'Willis Annexe covered laneway',...g.laneView,heading:g.laneHeading,pitch:.05,showSign:false,code:'J18',kind:'courtyard',description:'Reconstructed glass roof between Ainsworth and Willis Annexe. The original laneway and sloping ground remain walkable'};})(),
    (()=>{const g=rupertGeometry(MAPPED_CAMPUS.buildings.find(b=>b.id===RUPERT_ID));return {id:'rupert-courtyard',name:'Rupert Myers courtyard and undercroft',...g.courtyardView,heading:g.courtyardHeading,pitch:.18,showSign:false,code:'M15',kind:'courtyard',description:'Public panorama comparison view; walk east or west beneath reconstructed upper floors along the mapped Southern Drive'};})(),
    (()=>{const b=MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-45230803'),g=patriciaGeometry(b);return {id:'patricia-foyer-stair',name:'Patricia O’Shane exterior stair',...g.stairArrival,heading:g.stairHeading,pitch:.18,showSign:false,code:'E19',kind:'courtyard',description:'Photo-led stair in the north-east recess to a walkable upper gallery; exact dimensions and level are reconstructed'};})(),
    {id:'chancellery-vaults',name:'Chancellery Executive wing vaults',x:477,z:-116,heading:-.03,pitch:.12,code:'C22',kind:'courtyard',showSign:false,description:'Library Lawn view of the repeated concrete vaults; bay spacing is reconstructed'},
    {id:'chemical-mall-view',name:'June Griffith tower from the Mall',x:12,z:10,heading:.25,pitch:.22,showSign:false,code:'F10',kind:'courtyard',description:'Comparison view of the reconstructed low teaching wings and retained 45 m tower maximum'},
    {id:'webster-west-view',name:'Robert Webster west façade',x:107,z:-12,heading:1.08,pitch:.14,showSign:false,code:'G14',kind:'courtyard',description:'Photo comparison view of the white end fins and reflective University Mall elevation'},
    {id:'dalton-east-view',name:'Dalton east façade',x:117,z:-18,heading:-.83,pitch:.1,showSign:false,code:'F12',kind:'courtyard',description:'Photo comparison view of Dalton’s broader eastern window bands and Teaching Commons glazing'},
    (()=>{const b=MAPPED_CAMPUS.buildings.find(b=>b.id==='osm-way-196250617'),s=whiteHouseStair(b);return {id:'whitehouse-verandah',name:'White House verandah stair',x:s.a.x-s.direction.x*1.4,z:s.a.z-s.direction.z*1.4,heading:Math.atan2(s.direction.x,-s.direction.z),showSign:false,code:'C15',kind:'courtyard',description:'Photo-led exterior stair to the upper verandah; dimensions are estimated'};})(),
    {id:'village-courtyard',name:'UNSW Village courtyard',x:35,z:-228.31,heading:1.7313,code:'B10',kind:'courtyard',showSign:false,description:'Mapped courtyard and east-west footway beneath reconstructed residential bridges'},
    {id:'international-courtyard',name:'International House courtyard',x:-125.5,z:-218.1,heading:.16,code:'C6',kind:'courtyard',showSign:false,description:'Mapped courtyard opening; pond, pergola and planting are photo-led estimates'},
    {id:'osm-way-1178531037',name:'John Niland Scientia',x:323,z:22,heading:1.38,code:'G19',kind:'scientia',description:'G19 · Sandstone podium and tree-like glass canopy at the top of the main steps'}],
};
