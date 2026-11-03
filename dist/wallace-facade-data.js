import {CAMPUS as RAW} from './campus-data.js?v=b468e6aa825e';
import {MEDICAL_PARTS} from './medical-parts.js?v=b468e6aa825e';
import {medicalGeometry} from './medical-data.js?v=b468e6aa825e';
import {framePoint,frameRectangle} from './geometry.js?v=b468e6aa825e';
export const WALLACE_ID='wallace-wurth';
export const WALLACE_GEOMETRY=medicalGeometry(RAW.buildings.find(b=>b.id===WALLACE_ID));
export const WALLACE_SCREEN={baseRL:65.53,topRL:81.97,pitch:2.65,sill:.55,windowHeight:2.65,finDepth:.95,finRun:.35,finWidth:.11,eave:.85,reconstructed:true};
export const WALLACE_FLOORS=[65.53,69.49,73.45,77.41];
const area=points=>points.reduce((sum,p,i)=>{const c=points[(i+1)%points.length];return sum+p.x*c.z-c.x*p.z;},0);
const nvNorth=(nx,nz)=>nx*WALLACE_GEOMETRY.frame.v.x+nz*WALLACE_GEOMETRY.frame.v.z<-.8;
const east=MEDICAL_PARTS.find(p=>p.buildingId===WALLACE_ID&&p.kind==='east'),ring=area(east.points)>0?east.points:[...east.points].reverse();
export const WALLACE_EAST_FACES=ring.map((a,i)=>{const c=ring[(i+1)%ring.length],length=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length;return {a,c,length,nx,nz,nu:nx*WALLACE_GEOMETRY.frame.u.x+nz*WALLACE_GEOMETRY.frame.u.z,nv:nx*WALLACE_GEOMETRY.frame.v.x+nz*WALLACE_GEOMETRY.frame.v.z,axis:nvNorth(nx,nz)?'north':'east',v0:nvNorth(nx,nz)?0:WALLACE_GEOMETRY.local(a).v,v1:nvNorth(nx,nz)?length:WALLACE_GEOMETRY.local(c).v};}).filter(f=>f.length>.001);
const longs=WALLACE_EAST_FACES.filter(f=>f.nu>.98),v0=Math.min(...longs.map(f=>f.v0)),v1=Math.max(...longs.map(f=>f.v1));
export const WALLACE_GRID={v0,v1,count:Math.round((v1-v0)/WALLACE_SCREEN.pitch)};WALLACE_GRID.pitch=(v1-v0)/WALLACE_GRID.count;
export const wallaceFaceKind=f=>f.nu>.98?'folded-east':f.nv<-.8&&f.length>10?'folded-north':f.nv>.8?'south-end':'atrium-grid';
export function wallaceWestSurface(a,c){const len=Math.hypot(c.x-a.x,c.z-a.z),nv=((c.z-a.z)*WALLACE_GEOMETRY.frame.v.x-(c.x-a.x)*WALLACE_GEOMETRY.frame.v.z)/len;return nv>.8?'south-brick':nv<-.8?'north-pale':'retrofitted-grid';}
export function wallaceCells(face){
 const grid=face.axis==='north'?{v0:0,v1:face.length,count:5,pitch:face.length/5}:WALLACE_GRID,cells=[];for(let i=0;i<grid.count;i++){const gridStart=grid.v0+i*grid.pitch,gridEnd=gridStart+grid.pitch,start=Math.max(face.v0,gridStart),end=Math.min(face.v1,gridEnd);if(end-start>1e-8)cells.push({axis:face.axis,count:grid.count,pitch:grid.pitch,index:i,start,end,gridStart,gridEnd,windowStart:Math.max(start,gridStart+.4),windowEnd:Math.min(end,gridEnd-.12)});}return cells;
}
export function wallaceFacePoint(face,v,rl,offset=0){const t=(v-face.v0)/(face.v1-face.v0);return {x:face.a.x+(face.c.x-face.a.x)*t+face.nx*offset,y:rl,z:face.a.z+(face.c.z-face.a.z)*t+face.nz*offset};}
export function wallaceBandProfile(cell){
 const profile=[[cell.gridStart,.10],[cell.gridStart+.35,.95],[cell.gridStart+.46,.95],[cell.gridStart+.7,.10],[cell.gridEnd,.10]];
 const at=v=>{for(let i=1;i<profile.length;i++)if(v<=profile[i][0]+1e-8){const a=profile[i-1],b=profile[i],t=(v-a[0])/(b[0]-a[0]);return {v,d:a[1]+(b[1]-a[1])*t};}return {v,d:.1};};
 return [at(cell.start),...profile.filter(p=>p[0]>cell.start+1e-8&&p[0]<cell.end-1e-8).map(([v,d])=>({v,d})),at(cell.end)];
}
export const WALLACE_BANDS=[{bottom:65.53,top:66.08},...WALLACE_FLOORS.map((floor,i)=>({bottom:floor+.55+2.65,top:i<3?WALLACE_FLOORS[i+1]+.55:81.97}))];
export function wallaceBayAppearance(cell,row){
 const south=(cell.index+.5)/cell.count,selected=cell.axis==='north'?(cell.index+row*2)%5!==0:((cell.index*3+row*5)%11)/11<.42+.42*south;
 return {selected,color:(cell.index+row)%3?'#c38b32':'#d59a32',accent:(cell.index+row)%2?'#dca33b':'#a96f2e',panelEnd:cell.gridStart+.4+(cell.gridEnd-cell.gridStart-.52)*(.38+((cell.index+row)%3)*.055),louvre:(cell.index+row*2)%4!==2,reconstructed:true};
}
export function wallaceFins(face,cell,row){
 const floor=WALLACE_FLOORS[row],lo=floor+.55,hi=lo+2.65,out=[],add=(anchor,depth,run,width,bottom,top,extra)=>{if(anchor>=face.v0-1e-8&&anchor<face.v1-1e-8)out.push({anchor,depth,run,width,bottom,top,extra,reconstructed:true});};
 add(cell.gridStart,.95,.35,.11,lo,hi,false);
 const north=1-(cell.index+.5)/cell.count,extra=(cell.index+row*3)%7<(cell.axis==='north'?3:north>.5?4:1);
 if(extra){const hang=(cell.index+row)%2===0,anchor=cell.gridStart+.4+(cell.pitch-.52)*.55;add(anchor,.78,.18,.085,hang?lo+.55:lo-.3,hang?hi+.3:hi-.6,true);}
 return out;
}
export function wallaceFinPoints(face,fin){return [[0,.09],[fin.run,fin.depth],[fin.run+fin.width,fin.depth],[fin.width,.09]].map(([dv,d])=>{const p=wallaceFacePoint(face,fin.anchor+dv,0,d);return {x:p.x,z:p.z};});}
export function wallaceEave(points,offset=WALLACE_SCREEN.eave){
 const r=area(points)>0?points:[...points].reverse();return r.map((p,i)=>{const a=r[(i+r.length-1)%r.length],c=r[(i+1)%r.length],l0=Math.hypot(p.x-a.x,p.z-a.z),l1=Math.hypot(c.x-p.x,c.z-p.z),n0={x:(p.z-a.z)/l0,z:-(p.x-a.x)/l0},n1={x:(c.z-p.z)/l1,z:-(c.x-p.x)/l1},scale=offset/Math.max(.2,1+n0.x*n1.x+n0.z*n1.z),dx=(n0.x+n1.x)*scale,dz=(n0.z+n1.z)*scale,len=Math.hypot(dx,dz),clamp=Math.min(1,offset*1.6/(len||1));return {x:p.x+dx*clamp,z:p.z+dz*clamp};});
}
export const WALLACE_PIERS=WALLACE_GEOMETRY.supports.map(p=>({...p,bottomWidth:.9,bottomDepth:1.1,topWidth:1.05,topDepth:1.3,points:frameRectangle(WALLACE_GEOMETRY.frame,1.05,1.3,WALLACE_GEOMETRY.local(p).u,WALLACE_GEOMETRY.local(p).v),reconstructed:true}));
const f=WALLACE_GEOMETRY.frame,view=(id,name,u,v,tu,tv,pitch)=>{const p=framePoint(f,u,v),target=framePoint(f,tu,tv);return {id,name,code:'C27',kind:'academic',...p,heading:Math.atan2(target.x-p.x,p.z-target.z),pitch,showSign:false,description:'Folded pale precast, staggered sunshades, amber panels and fine curtain glazing reconstructed from completed architect photographs and October 2020 / February 2022 Street View. Existing planning roof and floor RLs retained; detailed panel dimensions and colour placement are estimates'};};
export const WALLACE_FACADE_VIEWS=[view('wallace-folded-botany','Wallace Wurth · folded Botany Street façade',45,-10,21,-10,.48),view('wallace-north-atrium','Wallace Wurth · High Street return',3,-61,-3,-41,.4),view('wallace-southern-gateway','Wallace Wurth · southern covered gateway',13,47,13,32,.3)];
