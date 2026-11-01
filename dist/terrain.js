import { ELEVATION } from './elevation-data.js?v=ec6a90b777fd';

// Local campus coordinates: east +x, south +z. Elevations remain in real metres.
const EARTH = 6371008.8, RAD = Math.PI / 180;
const CENTER = {lat: -33.9178, lon: 151.2285};
const eastScale = EARTH * RAD * Math.cos(CENTER.lat * RAD);
const northScale = EARTH * RAD;
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

export function terrainHeight(x,z) {
  const lon = CENTER.lon + x / eastScale, lat = CENTER.lat - z / northScale;
  // GeoTIFF is pixel-is-area: the first value is half a pixel inside the bounds.
  const col = clamp((lon-ELEVATION.west)/ELEVATION.longitudeStep-.5,0,ELEVATION.cols-1);
  const row = clamp((ELEVATION.north-lat)/ELEVATION.latitudeStep-.5,0,ELEVATION.rows-1);
  const x0=Math.floor(col),z0=Math.floor(row),x1=Math.min(x0+1,ELEVATION.cols-1),z1=Math.min(z0+1,ELEVATION.rows-1);
  const tx=col-x0,tz=row-z0,at=(c,r)=>ELEVATION.values[r*ELEVATION.cols+c];
  // Match the two rendered triangles in each DEM cell exactly. This prevents
  // the walking surface and the visible terrain from disagreeing on slopes.
  if(tx+tz<=1)return at(x0,z0)+tx*(at(x1,z0)-at(x0,z0))+tz*(at(x0,z1)-at(x0,z0));
  return at(x1,z1)+(1-tx)*(at(x0,z1)-at(x1,z1))+(1-tz)*(at(x1,z0)-at(x1,z1));
}

export const TERRAIN_GRID={cols:ELEVATION.cols,rows:ELEVATION.rows,x0:(ELEVATION.west+ELEVATION.longitudeStep*.5-CENTER.lon)*eastScale,z0:(CENTER.lat-ELEVATION.north+ELEVATION.latitudeStep*.5)*northScale,dx:ELEVATION.longitudeStep*eastScale,dz:ELEVATION.latitudeStep*northScale};

export function buildingBase(points) {
  // A level building foundation, embedded in the slope on its uphill edge.
  return Math.min(...points.map(p=>terrainHeight(p.x,p.z)));
}

export const TERRAIN_SOURCE = {
  name: 'NSW Spatial Services 5 m elevation',
  url: ELEVATION.source,
  resolution: ELEVATION.nominalSourceResolutionMetres,
  min: ELEVATION.minimum,
  max: ELEVATION.maximum,
  attribution: ELEVATION.attribution,
};
