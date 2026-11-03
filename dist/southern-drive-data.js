// GIS supplies plan boundaries only. All fixtures / materials / fine levels are reconstructed.
import {framePoint} from './geometry.js?v=1815a9b0ff0f';
export const SOUTHERN_SCOPE={minX:109,maxX:146,minZ:167,maxZ:228};
export const SOUTHERN_GIS='https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer';
export const SOUTHERN_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=b6Ha54RA0wf4y1dP-q2aCA&heading=180&pitch=-5';
export const SOUTHERN_FRAME={x:134.4385,z:188.5255,u:{x:.98744063,z:.1579905},v:{x:-.1579905,z:.98744063}};
export const southernPoint=(u,v)=>framePoint(SOUTHERN_FRAME,u,v);
export const inSouthernGround=(x,z)=>x>SOUTHERN_SCOPE.minX&&x<SOUTHERN_SCOPE.maxX&&z>SOUTHERN_SCOPE.minZ&&z<SOUTHERN_SCOPE.maxZ;
export const SOUTHERN_FIXTURES={
  refugeLamp:{...southernPoint(0,-3.5),height:6.8,radius:.085},
  bins:[-.45,.45].map(u=>({...southernPoint(u,2.5),radius:.32,height:1.05})),
  board:{...southernPoint(0,6.5),width:1.4,height:2.15},
  reconstructed:true,
  note:'July 2015 panorama-led forms / positions. No fixture height survey, current planting or traffic arrangement is asserted.'
};
export const SOUTHERN_DESTINATIONS=[
  {id:'southern-drive-median',name:'Southern Drive · planted median',x:123.85,z:208.024,heading:Math.PI/2,pitch:.12},
  {id:'southern-drive-crossing',name:'Southern Drive · Gate 14 crossing',x:139.223,z:189.376,heading:-Math.PI/2,pitch:.1}
].map(p=>({...p,kind:'courtyard',showSign:false,description:'Road / garden boundaries from public UNSW GIS. Brick refuge, Y lamps, bins, noticeboard, planting and fine levels are photo-fitted estimates from July 2015; this recreation does not establish current traffic or access conditions'}));
