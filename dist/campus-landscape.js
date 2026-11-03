import { CAMPUS as MAPPED_CAMPUS } from './campus-data.js?v=1815a9b0ff0f';

// The garden boundary is OSM geometry. Paving extent, edging height and planting
// are visual reconstructions from public Street View and the architect's photos.
const garden=MAPPED_CAMPUS.greens.find(g=>g.id==='osm-way-926419123');
export const COLLEGE_GARDEN={...garden,name:'Kensington Colleges courtyard garden',raisedBy:.55,
  source:'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-33.916244,151.231936&heading=90',
  dimensionsSource:'visual reconstruction'};

export const COLLEGE_PAVING={
  id:'kensington-colleges-courtyard-paving',name:'Kensington Colleges courtyard',surface:'stone',reconstructed:true,
  points:[{x:310.622,z:-208.046},{x:344.302,z:-202.197},{x:337,z:-110.8},{x:297.1,z:-117.3}],
  holes:[garden.points],source:COLLEGE_GARDEN.source,
};

// Public panorama location, projected into the same metre-based campus frame.
const lat=-33.9162366,lon=151.23194,radians=Math.PI/180,radius=6371008.8;
export const COLLEGE_COURTYARD_VIEW={
  id:'kensington-colleges-courtyard',name:'Kensington Colleges courtyard',code:'TKC',kind:'courtyard',showSign:false,
  x:(lon-MAPPED_CAMPUS.center.lon)*radians*radius*Math.cos(MAPPED_CAMPUS.center.lat*radians),
  z:(MAPPED_CAMPUS.center.lat-lat)*radians*radius,heading:Math.PI/2,
  description:'TKC · Brick college wings, balconies, planted edges and courtyard seating',
};
