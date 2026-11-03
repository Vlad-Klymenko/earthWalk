import {CAMPUS as RAW} from './campus-data.js?v=0f1aa578e721';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=0f1aa578e721';
import {terrainHeight,buildingBase} from './terrain.js?v=0f1aa578e721';
export const WEBSTER_ID='robert-webster';
export const WEBSTER_REPLACED_STEP_ID='osm-way-297836299';
export const WEBSTER_HEIGHT={height:18.78,reportedFloors:5,objectId:65,url:'https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer/18',title:'Public UNSW G14 height field',linkLabel:'Height source · UNSW GIS',note:'Retained public Building Labels Feb2023 snapshot reports G14 height18.78m/five floors; G15 separately reports the same height/four floors. Roof component/base definition and update date unspecified. Display selects the G14 reported height; original OSM16m/four-level tags remain separate. Fine component levels are reconstructed, not surveyed.'};
export const WEBSTER_PHOTO='https://s3.studentvip.com.au/photos/robert-webster-building-main-ent-176890-small.jpg';
export const WEBSTER_PANO='https://www.google.com/maps/@?api=1&map_action=pano&pano=h4UZ9JQplfNwS7Ha2DPGUg&heading=9&pitch=0';
const source=RAW.buildings.find(b=>b.id===WEBSTER_ID);
export const WEBSTER_FRAME=orientedFrame(source.points);
export const websterPoint=(u,v)=>framePoint(WEBSTER_FRAME,u,v);
export const websterLocal=p=>({u:(p.x-WEBSTER_FRAME.x)*WEBSTER_FRAME.u.x+(p.z-WEBSTER_FRAME.z)*WEBSTER_FRAME.u.z,v:(p.x-WEBSTER_FRAME.x)*WEBSTER_FRAME.v.x+(p.z-WEBSTER_FRAME.z)*WEBSTER_FRAME.v.z});
export const websterRect=(u0,u1,v0,v1)=>frameRectangle(WEBSTER_FRAME,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2);
const anchor=websterPoint(-17.5,22.2),mainRL=terrainHeight(anchor.x,anchor.z)+.22+1.35;
export const WEBSTER_ENTRY={mainRL,middleRL:mainRL-.75,upperCount:5,upperStart:-14.6,upperEnd:-12.95,front:-18.45,lowerEnd:-15.75,west:15.95,east:27.6,back:-5.6,ceilingRL:mainRL+3.2,base:buildingBase(source.points),reconstructed:true,note:'Two flights and three lower bays follow July2015 Street View and labelled exterior photos. Fine XY, counts, cross grades and levels fit the coarse public DEM; no stair, floor-RL or accessibility survey is claimed.'};
const E=WEBSTER_ENTRY;
export const WEBSTER_RECESS={points:websterRect(-11.75,E.back,E.west,E.east),holes:[],reconstructed:true};
const bays=[[10.6,19.05],[19.85,26.4],[27.2,35.4]];
export const WEBSTER_LOWER_FLIGHTS=bays.map(([v0,v1],i)=>{
 const at=v=>{const p=websterPoint(E.front,v);return terrainHeight(p.x,p.z)+.22;},low0=at(v0),low1=at(v1),count=Math.max(2,Math.ceil((E.middleRL-Math.min(low0,low1))/.16));
 return {id:'webster-lower-flight-'+i,u0:E.front,u1:E.lowerEnd,v0,v1,low0,low1,count,reconstructed:true};
});
export const WEBSTER_SURFACES=[
 {id:'webster-middle-landing',u0:E.lowerEnd,u1:E.upperStart,v0:10.6,v1:35.4,rl:E.middleRL},
 {id:'webster-west-terrace',u0:E.upperStart,u1:-11.65,v0:10.6,v1:E.west,rl:E.middleRL},
 {id:'webster-east-terrace',u0:E.upperStart,u1:-6.65,v0:E.east,v1:35.4,rl:E.middleRL},
 {id:'webster-upper-landing',u0:E.upperEnd,u1:E.back,v0:E.west,v1:E.east,rl:E.mainRL},
 ...Array.from({length:E.upperCount},(_,i)=>({id:'webster-upper-tread-'+i,u0:E.upperStart+(E.upperEnd-E.upperStart)*i/E.upperCount,u1:E.upperStart+(E.upperEnd-E.upperStart)*(i+1)/E.upperCount,v0:E.west,v1:E.east,rl:E.middleRL+(E.mainRL-E.middleRL)*(i+1)/E.upperCount})),
 ...WEBSTER_LOWER_FLIGHTS.flatMap(f=>Array.from({length:f.count},(_,i)=>({id:f.id+'-tread-'+i,u0:f.u0+(f.u1-f.u0)*i/f.count,u1:f.u0+(f.u1-f.u0)*(i+1)/f.count,v0:f.v0,v1:f.v1,low0:f.low0,low1:f.low1,fraction:(i+1)/f.count})))
].map(p=>({...p,points:websterRect(p.u0,p.u1,p.v0,p.v1),holes:[],reconstructed:true}));
export function websterSurfaceRL(part,p){if(part.rl!==undefined)return part.rl;const v=websterLocal(p).v,t=Math.max(0,Math.min(1,(v-part.v0)/(part.v1-part.v0))),low=part.low0+(part.low1-part.low0)*t;return low+(E.middleRL-low)*part.fraction;}
export function websterEntrySurface(x,z){const p=websterLocal({x,z}),part=WEBSTER_SURFACES.find(s=>p.u>=s.u0-1e-7&&p.u<=s.u1+1e-7&&p.v>=s.v0-1e-7&&p.v<=s.v1+1e-7);return part?websterSurfaceRL(part,{x,z}):undefined;}
export const WEBSTER_ISLANDS=[[19.05,19.85],[26.4,27.2]].map(([v0,v1])=>({points:websterRect(E.front,E.lowerEnd,v0,v1),holes:[],top:E.middleRL+.08,reconstructed:true}));
export const WEBSTER_PIERS=[19.35,22.05,24.75,27.25].map(v=>({u:-11.25,v,width:.48,depth:.65,bottom:E.mainRL,top:E.ceilingRL,reconstructed:true}));
export function websterFacadeSpans(a,b){
 const p=websterLocal(a),q=websterLocal(b),cuts=[0,1];for(const [axis,values] of [['u',[-11.75,E.back]],['v',[E.west,E.east]]])for(const value of values){const t=(value-p[axis])/(q[axis]-p[axis]);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,b)=>a-b);
 return cuts.slice(1).map((t1,i)=>{const t0=cuts[i],t=(t0+t1)/2,u=p.u+(q.u-p.u)*t,v=p.v+(q.v-p.v)*t;return {a:{x:a.x+(b.x-a.x)*t0,z:a.z+(b.z-a.z)*t0},b:{x:a.x+(b.x-a.x)*t1,z:a.z+(b.z-a.z)*t1},recess:u>=-11.75-1e-6&&u<=E.back+1e-6&&v>=E.west-1e-6&&v<=E.east+1e-6};});
}
const head=(p,q)=>Math.atan2(q.x-p.x,p.z-q.z),arrival=websterPoint(-25,20.7),upper=websterPoint(-9.5,20.7),target=websterPoint(-6,20.7);
export const WEBSTER_VIEWS=[
 {id:'webster-mall-steps',name:'Robert Webster · Mall entrance steps',...arrival,heading:head(arrival,target),pitch:.16},
 {id:'webster-mall-portico',name:'Robert Webster · raised entrance portico',...upper,walkFloor:E.mainRL,heading:head(upper,target),pitch:.04}
].map(p=>({...p,code:'G14',kind:'courtyard',showSign:false,description:'G14 · Two fitted stair flights, three lower bays, stone landings, silver rails and four portico piers. July2015 Street View and labelled public photographs guide this reconstruction. Original source footprint/paths remain; fine levels, counts and details are estimates. G14 GIS18.78m/five floors is separate from OSM16m/four levels. Closed interiors remain exterior boundaries'}));
