import { CAMPUS } from './campus-data.js?v=159c90d42d57';
import { frameRectangle } from './geometry.js?v=159c90d42d57';
export const VILLAGE_ID='osm-relation-2637829-0';
export const VILLAGE_ARCHITECT={title:'Clare / Architectus · UNSW Village',url:'https://claredesign.com.au/portfolio/residential/unsw-village/'};
export const VILLAGE_AXIS={x:.9867962476101311,z:.16196655735850177};
export const VILLAGE_CROSS={x:-VILLAGE_AXIS.z,z:VILLAGE_AXIS.x};
export const VILLAGE_FACADE={mainHeight:25.6,mainFloors:8,level:3.2,bandParapet:1.08,balconyDepth:.58,screenDepth:.72,slatPitch:.11,slatHeight:.048,reconstructed:true};
const raw=CAMPUS.buildings.find(b=>b.id===VILLAGE_ID),i=raw.points.findIndex(p=>p.x===-8.425&&p.z===-220.155);
export const VILLAGE_SECURITY_EDGE=[raw.points[i],raw.points[i+1]];
const [a,b]=VILLAGE_SECURITY_EDGE,len=Math.hypot(b.x-a.x,b.z-a.z),tangent={x:(b.x-a.x)/len,z:(b.z-a.z)/len},normal={x:-tangent.z,z:tangent.x};
// Photo-led signed glazing on the existing occupied wall; the door stays closed.
export const VILLAGE_SECURITY={frame:{x:(a.x+b.x)/2,z:(a.z+b.z)/2,u:tangent,v:normal},edge:VILLAGE_SECURITY_EDGE,width:len,arrival:{x:-13.75,z:-216.4},target:{x:(a.x+b.x)/2,z:(a.z+b.z)/2},reconstructed:true};
VILLAGE_SECURITY.heading=Math.atan2(VILLAGE_SECURITY.target.x-VILLAGE_SECURITY.arrival.x,VILLAGE_SECURITY.arrival.z-VILLAGE_SECURITY.target.z);
export const VILLAGE_SECURITY_PAVING=frameRectangle(VILLAGE_SECURITY.frame,len+1.6,3.5,0,1.85);
export const VILLAGE_WEST_VIEW={id:'village-west-courtyard',name:'UNSW Village · western residential façade',x:-10,z:-230,heading:Math.PI/2,pitch:.42,code:'B10',kind:'courtyard',showSign:false,description:'Continuous pale balcony bands, grey sliding panels, glazed ground rooms and tall entry bays. Main-wing heights and detailed dimensions are reconstructed from architect photographs; seven mapped levels remain separate from eight-storey design evidence'};
