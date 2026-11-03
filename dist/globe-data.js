import {CAMPUS} from './campus-data.js?v=4ebc60430f42';
import {campusTerrainHeight} from './old-main-entry-landscape.js?v=4ebc60430f42';
export const GLOBE_SOURCE='https://www.celebratingwomen.unsw.edu.au/profile/brownyn-oliver-globe';
export const GLOBE_GALLERY='https://www.roslynoxley9.com.au/exhibition/globe/pghxp';
export const GLOBE_LAWN_SOURCE='https://www.student.unsw.edu.au/events/2026/04/welcome-country-ceremony-o-week-term-2-2026';
export const GLOBE_NODE={type:'node',id:5332274045,version:1,timestamp:'2018-01-11T02:19:53Z',lat:-33.9179966,lon:151.2313026};
const metres=6371008.8*Math.PI/180;
export const GLOBE={
 title:'Globe',artist:'Bronwyn Oliver',year:2002,medium:'copper',diameter:3,
 alternateDiameter:2.5,source:GLOBE_SOURCE,alternateSource:GLOBE_GALLERY,
 x:(GLOBE_NODE.lon-CAMPUS.center.lon)*metres*Math.cos(CAMPUS.center.lat*Math.PI/180),
 z:(CAMPUS.center.lat-GLOBE_NODE.lat)*metres,
 supportLift:.04,soilRadius:1.04,wireRadius:.0036,
 reconstructed:true,
 note:'University catalogue diameter 3m selected; artist gallery reports 2.5m. This unresolved source discrepancy is retained. Position follows the public 2018 OSM node, not a current survey. Copper filigree, orientation, cup profile, feet and fitted ground lights are photo-led estimates.'
};
export const globeGround=(x=GLOBE.x,z=GLOBE.z)=>campusTerrainHeight(x,z);
export const GLOBE_LIGHTS=Array.from({length:4},(_,i)=>{const a=.55+i*Math.PI/2;return {x:GLOBE.x+Math.cos(a)*2.25,z:GLOBE.z+Math.sin(a)*2.25,radius:.12,reconstructed:true};});
const view=(id,name,dx,dz)=>{const x=GLOBE.x+dx,z=GLOBE.z+dz;return {id,name,x,z,heading:Math.atan2(GLOBE.x-x,z-GLOBE.z),pitch:-.035,kind:'artwork',showSign:false,description:'H17 · Bronwyn Oliver’s Globe (2002), International Square / Eleonora Kopalinsky Lawn, also known as Globe Lawn. Public mapped position and measured terrain; university diameter 3m, conflicting gallery diameter 2.5m. Organic copper lattice, low bronze cup, four short feet and ground fixtures are photo-led estimates'};};
export const GLOBE_VIEWS=[
 view('globe-sculpture','Globe · Bronwyn Oliver copper sculpture',-5.8,3.2),
 view('eleonora-kopalinsky-lawn','Eleonora Kopalinsky Lawn (Globe Lawn / International Square)',-7.5,-5)
];
