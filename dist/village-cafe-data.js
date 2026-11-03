import { framePoint,frameRectangle } from './geometry.js?v=7e037edcfeb5';
import { buildingBase,terrainHeight } from './terrain.js?v=7e037edcfeb5';
export const VILLAGE_CAFE_ID='osm-way-584816505';
export const VILLAGE_CAFE_HEIGHT=3.3;
export const VILLAGE_CAFE_PHOTO={url:'https://studentvip.com.au/unsw/kensington/maps/135472',photo:'https://s3.studentvip.com.au/photos/cafe-177858-small.jpg'};
export const VILLAGE_CAFE_PANO={url:'https://www.google.com/maps/@?api=1&map_action=pano&pano=ZZaU3z1N2LG9xLUPJfiN2g&heading=90&pitch=6',lat:-33.9157297,lon:151.2282992,date:'July 2015'};
// The source outline is retained. Every deck, stair, roof and furniture dimension
// below is a visual reconstruction; the sources provide no surveyed kiosk height.
export function villageCafeGeometry(b){
 const a=b.points[1],c=b.points[2],len=Math.hypot(c.x-a.x,c.z-a.z),u={x:(c.x-a.x)/len,z:(c.z-a.z)/len},v={x:-u.z,z:u.x},us=b.points.map(p=>p.x*u.x+p.z*u.z),vs=b.points.map(p=>p.x*v.x+p.z*v.z),minU=Math.min(...us),maxU=Math.max(...us),minV=Math.min(...vs),maxV=Math.max(...vs),cu=(minU+maxU)/2,cv=(minV+maxV)/2;
 const frame={x:cu*u.x+cv*v.x,z:cu*u.z+cv*v.z,u,v,width:maxU-minU,length:maxV-minV},base=buildingBase(b.points),floor=base+.55;
 const deck=[frameRectangle(frame,10.7,10.8,-9.1,-1),frameRectangle(frame,7.6,2.4,0,3)],tree={...framePoint(frame,-9,.1),height:13.5,radius:.6,planterRadius:1.05,reconstructed:true,form:'village-cafe-tree'};
 const top=framePoint(frame,-14.45,2),stairFrame={...top,u:v,v:{x:u.x,z:u.z}},bottom=framePoint(frame,-16.95,2),lowRL=terrainHeight(bottom.x,bottom.z)+.22,count=Math.ceil((floor-lowRL)/.17),steps=[];
 for(let i=0;i<count;i++){const lo=-2.5+i*2.5/count,hi=-2.5+(i+1)*2.5/count;steps.push({points:frameRectangle(stairFrame,2,hi-lo,0,(lo+hi)/2),rl:lowRL+(floor-lowRL)*(i+1)/count,reconstructed:true});}
 const canopies=[{u:-10.9,v:-3.5,size:4.5},{u:-5.9,v:-2.7,size:3.9}].map(p=>({...p,points:frameRectangle(frame,p.size,p.size,p.u,p.v),centre:framePoint(frame,p.u,p.v),eave:floor+2.55,peak:floor+3.35,reconstructed:true}));
 const tables=[[-11.1,-3.7],[-5.9,-2.7],[-12.6,-.1]].map(([u,v])=>{const p=framePoint(frame,u,v);return {...p,radius:.5,chairs:Array.from({length:4},(_,i)=>{const a=i*Math.PI/2;return {...framePoint(frame,u+Math.cos(a),v+Math.sin(a)),angle:a,radius:.28};}),reconstructed:true};});
 const arrival=framePoint(frame,-18.4,2),target=framePoint(frame,-5,2.5),heading=Math.atan2(target.x-arrival.x,arrival.z-target.z);
 return {frame,base,floor,deck,tree,stairs:{frame:stairFrame,top,bottom,lowRL,highRL:floor,count,run:2.5,width:2,steps,apron:frameRectangle(stairFrame,2.4,.8,0,-2.9)},canopies,tables,arrival,target,heading,canopyPosts:canopies.flatMap(p=>[-1,1].flatMap(x=>[-1,1].map(z=>({...framePoint(frame,p.u+x*p.size/2,p.v+z*p.size/2),top:p.eave})))),reconstructed:true};
}
