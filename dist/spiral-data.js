import {CAMPUS} from './campus-data.js?v=08020e70591f';
import {terrainHeight as demHeight,buildingBase} from './terrain.js?v=08020e70591f';
import {orientedFrame,framePoint,frameRectangle,clipFrameStrip} from './geometry.js?v=08020e70591f';

export const SPIRAL_ID='osm-way-45604251';
export const SPIRAL_STREET={url:'https://www.google.com/maps/@?api=1&map_action=pano&pano=1dC04C0YehTEFE6402oxMA&heading=0&pitch=25',date:'July 2015',lat:-33.9168641,lon:151.2323067};
export const SPIRAL_APPROACH_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=B6Q8PnJ3eaTvydnCUhpQdQ&heading=80&pitch=15';
export const GRAD_SHOP_SOURCE='https://thegradshop.arc.unsw.edu.au/pages/contact';
export const SPIRAL_STEPS_ID='osm-way-10203385';
const source=CAMPUS.buildings.find(b=>b.id===SPIRAL_ID),frame=orientedFrame(source.points),base=buildingBase(source.points);
const endpoint=CAMPUS.paths.find(p=>p.id===SPIRAL_STEPS_ID).points.at(-1);
const floor=demHeight(endpoint.x,endpoint.z)+.22,upper=floor+3.55,roof=base+source.height;
// Fitted circle centre / radii and all component levels are reconstructions.
// The floor anchors to the original NSW DEM at the mapped approach endpoint;
// it is not a new surveyed building RL. Raw samples and OSM rings stay intact.
export const SPIRAL_FRAME=frame;
export const spiralAt=(u,v)=>framePoint(frame,u,v);
export const spiralLocal=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
export const SPIRAL_CENTER={x:358.35,z:-106.98};
export const spiralPoint=(angle,radius)=>({x:SPIRAL_CENTER.x+Math.cos(angle)*radius,z:SPIRAL_CENTER.z+Math.sin(angle)*radius});
export const SPIRAL_LEVELS={base,floor,upper,roof,previousEstimate:source.height,quantity:'Estimated roof above retained map foundation',reconstructed:true};
export const SPIRAL_STAIRS={start:140*Math.PI/180,end:340*Math.PI/180,inner:3.6,outer:5.6,count:24,rise:upper-floor,reconstructed:true};
export const SPIRAL_ROOM=clipFrameStrip(source.points,frame,-100,.5);
const wedge=(a,c,r0,r1)=>[spiralPoint(a,r0),spiralPoint(a,r1),spiralPoint(c,r1),spiralPoint(c,r0)];
export const SPIRAL_TREADS=Array.from({length:SPIRAL_STAIRS.count},(_,i)=>{const s=SPIRAL_STAIRS,a=s.start+(s.end-s.start)*i/s.count,c=s.start+(s.end-s.start)*(i+1)/s.count;return {id:`spiral-tread-${i}`,points:wedge(a,c,s.inner,s.outer),height:floor+s.rise*i/s.count,angle:(a+c)/2,reconstructed:true};});
export const SPIRAL_LANDING={points:wedge(SPIRAL_STAIRS.end-.04,SPIRAL_STAIRS.end+.25,3.6,7.5),height:upper,reconstructed:true};
export const SPIRAL_RING=Array.from({length:96},(_,i)=>({points:wedge(i/96*Math.PI*2,(i+1)/96*Math.PI*2,5.6,7.5),height:upper,reconstructed:true}));
const inside=(p,ring)=>{let yes=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)yes=!yes;}return yes;};
export const inSpiralSource=(x,z)=>inside({x,z},source.points);
const segment=(a,c,width,h0,h1,delay=0)=>{const length=Math.hypot(c.x-a.x,c.z-a.z),u={x:(c.x-a.x)/length,z:(c.z-a.z)/length},f={x:(a.x+c.x)/2,z:(a.z+c.z)/2,u,v:{x:-u.z,z:u.x}};return {a,c,width,points:frameRectangle(f,length+.02,width),heightAt:(x,z)=>{const t=Math.max(0,Math.min(1,((x-a.x)*u.x+(z-a.z)*u.z)/length));return h0+(h1-h0)*Math.max(0,(t-delay)/(1-delay));},reconstructed:true};};
const sourceSteps=CAMPUS.paths.find(p=>p.id===SPIRAL_STEPS_ID),north=CAMPUS.paths.find(p=>p.id==='osm-way-260848246'),east=CAMPUS.paths.find(p=>p.id==='osm-way-45559840');
const northLevels=north.points.map((p,i)=>i>=2?floor-.22:demHeight(p.x,p.z));
export const SPIRAL_GRADES=[
 {points:source.points,heightAt:()=>floor-.22,reconstructed:true},
 segment(sourceSteps.points[0],sourceSteps.points[1],sourceSteps.width+.2,demHeight(sourceSteps.points[0].x,sourceSteps.points[0].z),floor-.22),
 ...north.points.slice(1).map((c,i)=>segment(north.points[i],c,north.width+.2,northLevels[i],northLevels[i+1])),
 segment(east.points[0],east.points[1],8,floor-.22,floor-.22),
 segment(east.points[1],east.points[2],8,floor-.22,demHeight(east.points[2].x,east.points[2].z),.1),
];
export function spiralGroundHeight(x,z){for(const part of SPIRAL_GRADES)if(inside({x,z},part.points))return part.heightAt(x,z);return undefined;}
export function spiralGeometry(){
 const start=spiralPoint(SPIRAL_STAIRS.start-.12,4.6),target=spiralPoint(SPIRAL_STAIRS.start+.18,4.6),upperArrival=spiralPoint(SPIRAL_STAIRS.end+.11,6.5),upperTarget=spiralPoint(SPIRAL_STAIRS.end+.5,6.5),arrival={x:347.855,z:-94.9},view={x:358.35,z:-106.98};
 const columns=Array.from({length:10},(_,i)=>({...spiralPoint(i/10*Math.PI*2,6.65),angle:i/10*Math.PI*2,radius:.38})).filter(p=>inSpiralSource(p.x,p.z)&&!inside(p,SPIRAL_ROOM)&&!CAMPUS.paths.some(path=>path.points.slice(1).some((c,i)=>{const a=path.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz))),d=Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);return d<(path.width||3)/2+.65;})));
 const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
 return {frame,base,floor,upper,roof,room:SPIRAL_ROOM,columns,arrival,target:view,heading:heading(arrival,view),start,targetStart:target,startHeading:heading(start,target),upperArrival,upperTarget,upperHeading:heading(upperArrival,upperTarget),reconstructed:true};
}
export function inSpiralGround(x,z){const p=spiralLocal({x,z});return p.u>-14&&p.u<36&&p.v>-17&&p.v<19;}
