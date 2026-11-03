import {CAMPUS} from './campus-data.js?v=4ebc60430f42';
import {terrainHeight} from './terrain.js?v=4ebc60430f42';
export const ENGINEERING_STREET_PHOTO='https://www.google.com/maps/@?api=1&map_action=pano&pano=kxmjWQj6VdFPCiEIGY81mQ&heading=270&pitch=-12';
const route=CAMPUS.paths.find(p=>p.id==='osm-way-9784408'),a=route.points[7],b=route.points[8],length=Math.hypot(b.x-a.x,b.z-a.z);
export const ENGINEERING_FRAME={origin:a,north:{x:(b.x-a.x)/length,z:(b.z-a.z)/length},east:{x:-(b.z-a.z)/length,z:(b.x-a.x)/length}};
export function engineeringPoint(s,o){const f=ENGINEERING_FRAME;return {x:f.origin.x+f.north.x*s+f.east.x*o,z:f.origin.z+f.north.z*s+f.east.z*o};}
export function engineeringCoordinates(p){const f=ENGINEERING_FRAME,dx=p.x-f.origin.x,dz=p.z-f.origin.z;return {s:dx*f.north.x+dz*f.north.z,o:dx*f.east.x+dz*f.east.z};}
export const engineeringRectangle=(s0,s1,o0,o1)=>[[s0,o0],[s1,o0],[s1,o1],[s0,o1]].map(([s,o])=>engineeringPoint(s,o));
export const ENGINEERING_SCOPE={s0:-1,s1:35,o0:-8.6,o1:30};
export const ENGINEERING_EDGE={bollardRadius:.11,bollardHeight:.95,bollardSpacing:3.7,wallOffset:-5.8,wallWidth:.28,wallHeight:.4,railHeight:1.04,pavingOffset:.055,soilOffset:.078,reconstructed:true,note:'Bounded July 2015 photo-led reconstruction. Fixture positions, counts, dimensions, fine levels, planting forms and current condition are not surveyed. Public GIS supplies garden plan outlines only. The sunken entrance now has separate public-survey RL anchors; its plan placement and connecting grades remain reconstructed.'};
export const engineeringPavingHeight=(x,z,ground=terrainHeight)=>ground(x,z)+ENGINEERING_EDGE.pavingOffset;
// Narrow bent ribbons, rather than filled triangular fans, keep the tufts open.
export function engineeringPlantLeaves(p,index){return Array.from({length:7},(_,j)=>{
 const a=j*Math.PI*2/7+index*.7,reach=p.radius*(.7+((index+j)%3)*.12),h=p.height*(.8+((index+j)%4)*.06),w=.014+((index+j)%3)*.002,nx=-Math.sin(a)*w,nz=Math.cos(a)*w;
 const base={x:p.x,y:.015,z:p.z},mid={x:p.x+Math.cos(a)*reach*.35,y:h,z:p.z+Math.sin(a)*reach*.35},tip={x:p.x+Math.cos(a)*reach,y:h*.4,z:p.z+Math.sin(a)*reach};
 return {baseLeft:{x:base.x-nx*.35,y:base.y,z:base.z-nz*.35},baseRight:{x:base.x+nx*.35,y:base.y,z:base.z+nz*.35},midLeft:{x:mid.x-nx,y:mid.y,z:mid.z-nz},midRight:{x:mid.x+nx,y:mid.y,z:mid.z+nz},tip,color:['#3f6245','#536e47','#687e4e'][(index+j)%3]};
 });}
export const ENGINEERING_WALLS=[[-4,14.7]].map(([s0,s1])=>({s0,s1,o:ENGINEERING_EDGE.wallOffset,width:ENGINEERING_EDGE.wallWidth,height:ENGINEERING_EDGE.wallHeight,points:engineeringRectangle(s0,s1,ENGINEERING_EDGE.wallOffset-ENGINEERING_EDGE.wallWidth/2,ENGINEERING_EDGE.wallOffset+ENGINEERING_EDGE.wallWidth/2),reconstructed:true}));
export const ENGINEERING_BOLLARD_CANDIDATES=[-3.48,3.4].flatMap(o=>Array.from({length:10},(_,i)=>({id:'engineering-blue-'+(o<0?'west':'east')+'-'+i,...engineeringPoint(1+i*ENGINEERING_EDGE.bollardSpacing,o),radius:ENGINEERING_EDGE.bollardRadius,height:ENGINEERING_EDGE.bollardHeight,reconstructed:true})));
const arrival=engineeringPoint(6.2,0),target=engineeringPoint(8,-7.65);
export const ENGINEERING_STREET_VIEW={id:'engineering-old-main-street',name:'Engineering Road · Old Main streetscape',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:-.08,kind:'courtyard',showSign:false,description:'Public GIS supplies garden outlines; blue bollards, low brick wall, rail and planted edges are reconstructed from July 2015 Street View. The sunken entrance uses separate published survey RL anchors; its plan, connecting grades and current access remain reconstructed or unverified'};
