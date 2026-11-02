import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=5b2998530615';
import { buildingBase, terrainHeight } from './terrain.js?v=5b2998530615';
export const WILLIS_ID='osm-way-45229601';
export const K17_VISUAL_HEIGHT=26;
export const K17_FRONT_PHOTO={title:'Aaron.Quigley · K17 glass foyer, 31 May 2020',url:'https://commons.wikimedia.org/wiki/File:CSE-K17-UNSW-Front.jpg'};
const frameFor=b=>orientedFrame(b.points,{x:-.16,z:1});
export function k17Geometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),a=b.points[7],c=b.points[0],len=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
  const along=(t,offset=0)=>({x:a.x+(c.x-a.x)*t+nx*offset,z:a.z+(c.z-a.z)*t+nz*offset});
  const midpoint=along(.5),floor=terrainHeight(midpoint.x,midpoint.z)-base-.15,foyerTop=floor+6.6;
  const arrival=framePoint(frame,-30,-23),target=along(.45);
  const foyerFloor=[along(0),along(1),along(1,-4.1),along(0,-4.1)],paving=[along(0,.1),along(.985,.1),along(.985,3.1),along(0,3.1)];
  const screen={bottom:foyerTop+1.05,top:K17_VISUAL_HEIGHT-.2,offset:.74,end:1-.25/len,columns:9,bands:6,reconstructed:true};
  const screenPanels=Array.from({length:screen.columns*screen.bands},(_,i)=>{const col=i%screen.columns,row=Math.floor(i/screen.columns),h=(screen.top-screen.bottom)/screen.bands;return {start:(col+.012)/screen.columns*screen.end,end:(col+.988)/screen.columns*screen.end,bottom:screen.bottom+row*h+.035,top:screen.bottom+(row+1)*h-.035,reconstructed:true};});
  const westA=b.points[6],westC=b.points[7],westLen=Math.hypot(westC.x-westA.x,westC.z-westA.z),westNx=(westC.z-westA.z)/westLen,westNz=-(westC.x-westA.x)/westLen;
  const westAlong=(t,offset=0)=>({x:westA.x+(westC.x-westA.x)*t+westNx*offset,z:westA.z+(westC.z-westA.z)*t+westNz*offset});
  const west={a:westA,c:westC,len:westLen,nx:westNx,nz:westNz,along:westAlong,slotStart:.22,slotEnd:.39,depth:1.45,projection:.85,returnStart:.88,reconstructed:true};
  west.landings=Array.from({length:6},(_,i)=>({points:[westAlong(west.slotStart,-west.depth),westAlong(west.slotEnd,-west.depth),westAlong(west.slotEnd,west.projection),westAlong(west.slotStart,west.projection)],bottom:(i+1)*K17_VISUAL_HEIGHT/7-.09,top:(i+1)*K17_VISUAL_HEIGHT/7+1.05,reconstructed:true}));
  const screenArrival=along(.05,20),screenTarget=along(.52),westArrival=westAlong(.34,13),westTarget=westAlong(.34),rearArrival=framePoint(frame,-28,24),rearTarget=framePoint(frame,-4,12),head=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
  // The front garden already belongs to the source John Lions Garden. Only
  // these bounded additions have reconstructed locations; terrain is retained.
  const beds=[[.17,.79,4.0,6.0]].map(([s,e,near,far])=>({points:[along(s,near),along(e,near),along(e,far),along(s,far)],reconstructed:true}));
  const shrubs=Array.from({length:11},(_,i)=>({...along(.2+i*.053,4.6+(i%3)*.35),height:.7+(i%3)*.18,reconstructed:true}));
  return {frame,base,front:{a,c,len,nx,nz,along},floor,foyerTop,foyerFloor,paving,arrival,target,heading:head(arrival,target),rows:7,pitch:K17_VISUAL_HEIGHT/7,stairBay:{start:.15,end:.7,depth:3.2},screen,screenPanels,west,beds,shrubs,screenArrival,screenTarget,screenHeading:head(screenArrival,screenTarget),westArrival,westTarget,westHeading:head(westArrival,westTarget),rearArrival,rearTarget,rearHeading:head(rearArrival,rearTarget),reconstructed:true};
}
export function willisGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),entry=framePoint(frame,-3,-55),entryGround=terrainHeight(entry.x,entry.z);
  const arrival=framePoint(frame,-5,-70),target=framePoint(frame,-3,-54),laneView=framePoint(frame,-19.3,-44);
  const cover={points:frameRectangle(frame,6.5,39,-19.35,-25),u0:-22.6,u1:-16.1,v0:-44.5,v1:-5.5,clearance:3.8,reconstructed:true};
  return {frame,base,entry,entryGround,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),laneView,laneHeading:Math.atan2(frame.v.x,-frame.v.z),cover,eave:b.height-.55};
}
