import {CAMPUS} from './campus-data.js?v=4ebc60430f42';
import {buildingBase} from './terrain.js?v=4ebc60430f42';
import {campusTerrainHeight as terrainHeight} from './spiral-landscape.js?v=4ebc60430f42';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=4ebc60430f42';
import {libraryGeometry} from './library-data.js?v=4ebc60430f42';
export const LIBRARY_WALK_ID='osm-way-1178531022';
export const LIBRARY_WALK_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=udqW0IAOm1AM4MOkgMDr5w&heading=180&pitch=12';
export const LIBRARY_LAWN_REFRESH='https://www.unsw.edu.au/estate/campus-development/projects/library-lawn-refresh';
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
const pathDistance=(p,path)=>Math.min(...path.points.slice(1).map((c,i)=>{const a=path.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t)-path.width/2;}));
// Source envelope / path coordinates remain fixed. Roof curvature, steelwork,
// skylight dimensions and height above the retained DEM are photo-fitted.
export function libraryWalkGeometry(b=CAMPUS.buildings.find(b=>b.id===LIBRARY_WALK_ID)){
 const frame=orientedFrame(b.points,{x:-.16,z:1}),at=(u,v)=>framePoint(frame,u,v),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z}),rect=(u0,u1,v0,v1)=>frameRectangle(frame,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2),base=buildingBase(b.points),library=libraryGeometry(CAMPUS.buildings.find(b=>b.id==='library'));
 const branches=[
  {id:'west-upper',axis:'u',u0:-72,u1:-22,v0:-13.9,v1:-7.45,cross:-10.9,half:2.95},
  {id:'main-east-west',axis:'u',u0:-41.2,u1:65.25,v0:-7.75,v1:.65,cross:-3.65,half:3.95},
  {id:'morven-lawn',axis:'v',u0:-4.55,u1:1.85,v0:-68,v1:-7.4,cross:-1.33,half:3.1},
  {id:'north-hook',axis:'u',u0:-4.6,u1:14,v0:-75.6,v1:-67.3,cross:-71.35,half:4.1},
  {id:'library-east',axis:'v',u0:65,u1:71.5,v0:-7.9,v1:75.6,cross:68.2,half:3.2},
  {id:'south-hook',axis:'u',u0:48.3,u1:71.5,v0:71.4,v1:75.6,cross:73.45,half:2.0},
  {id:'cafe-link',axis:'v',u0:50.9,u1:57.3,v0:-30.6,v1:-7.05,cross:54.1,half:3.1},
  {id:'west-spur',axis:'v',u0:-52,u1:-47.4,v0:-19.5,v1:-13.2,cross:-49.75,half:2.2}
 ];
 for(const branch of branches){const from=branch.axis==='u'?branch.u0:branch.v0,to=branch.axis==='u'?branch.u1:branch.v1,atAxis=n=>at(branch.axis==='u'?n:branch.cross,branch.axis==='u'?branch.cross:n);branch.taperStart=inside(atAxis(from-.2),b.points);branch.taperEnd=inside(atAxis(to+.2),b.points);}
 const junctions=[{u:-1.33,v:-3.65,halfU:3.25,halfV:3.9},{u:68.2,v:-3.65,halfU:3.2,halfV:4.0}].map(p=>({...p,points:rect(p.u-p.halfU,p.u+p.halfU,p.v-p.halfV,p.v+p.halfV)}));
 const branchAt=p=>{const q=local(p);return branches.filter(b=>q.u>=b.u0&&q.u<=b.u1&&q.v>=b.v0&&q.v<=b.v1).sort((a,b)=>Math.abs((a.axis==='u'?q.v:q.u)-a.cross)-Math.abs((b.axis==='u'?q.v:q.u)-b.cross))[0]||branches[1];};
 const roofOffset=p=>{const q=local(p),valid=branches.filter(b=>q.u>=b.u0&&q.u<=b.u1&&q.v>=b.v0&&q.v<=b.v1),arch=Math.max(3.25,...valid.map(b=>{const along=b.axis==='u'?q.u:q.v,start=b.axis==='u'?b.u0:b.v0,end=b.axis==='u'?b.u1:b.v1,taper=Math.max(0,Math.min(1,b.taperStart?(along-start)/1.8:1,b.taperEnd?(end-along)/1.8:1));return 3.25+.55*Math.max(0,1-(((b.axis==='u'?q.v:q.u)-b.cross)/b.half)**2)*taper;})),hip=Math.max(0,...junctions.map(j=>.4*Math.max(0,1-Math.max(Math.abs(q.u-j.u)/j.halfU,Math.abs(q.v-j.v)/j.halfV))));return arch+hip;};
 const roofAt=p=>terrainHeight(p.x,p.z)+roofOffset(p),isGlass=p=>{if(junctions.some(j=>inside(p,j.points)))return true;const q=local(p),a=branchAt(p);return Math.abs((a.axis==='u'?q.v:q.u)-a.cross)<.34;};
 const proposals=[];for(const branch of branches){const from=branch.axis==='u'?branch.u0+2:branch.v0+2,to=branch.axis==='u'?branch.u1-1:branch.v1-1;for(let n=from;n<to;n+=5.6)for(const side of [-1,1]){const cross=branch.cross+side*(branch.half-.35),u=branch.axis==='u'?n:cross,v=branch.axis==='u'?cross:n;proposals.push({u,v,branch:branch.id,axis:branch.axis,...at(u,v),radius:.12});}}
 const occupied=CAMPUS.buildings.filter(p=>!p.walkableUnder),bounds=occupied.map(b=>({b,minX:Math.min(...b.points.map(p=>p.x))-.3,maxX:Math.max(...b.points.map(p=>p.x))+.3,minZ:Math.min(...b.points.map(p=>p.z))-.3,maxZ:Math.max(...b.points.map(p=>p.z))+.3})),columns=[];
 const nearOccupied=p=>bounds.some(e=>{if(p.x<e.minX||p.x>e.maxX||p.z<e.minZ||p.z>e.maxZ)return false;const b=e.b;if(inside(p,b.points)&&!b.holes.some(h=>inside(p,h)))return true;return [b.points,...b.holes].some(r=>pathDistance(p,{points:[...r,r[0]],width:0})<.3);});
 for(const p of proposals){if(!inside(p,b.points)||inside(p,library.canopy.points)||nearOccupied(p)||CAMPUS.paths.some(path=>pathDistance(p,path)<.30)||columns.some(c=>Math.hypot(c.x-p.x,c.z-p.z)<2.2))continue;columns.push(p);}
 const benches=[-58,-46,-34,-22].map(v=>({...at(3.1,v),u:3.1,v,length:2.6,width:.62,reconstructed:true})).filter(p=>occupied.every(b=>!inside(p,b.points))&&CAMPUS.paths.every(path=>pathDistance(p,path)>1.65));
 const lamps=branches.flatMap(branch=>{const from=branch.axis==='u'?branch.u0+5:branch.v0+5,to=branch.axis==='u'?branch.u1-3:branch.v1-3,out=[];for(let n=from;n<to;n+=11.2){const u=branch.axis==='u'?n:branch.cross+.75,v=branch.axis==='u'?branch.cross+.75:n,p=at(u,v);if(inside(p,b.points)&&!inside(p,library.canopy.points))out.push({...p,u,v});}return out;});
 const arrival=at(-1.33,-50),target=at(-1.33,-10),crossArrival=at(-10,-3.65),crossTarget=at(5,-3.65),eastArrival=at(68.2,48),eastTarget=at(68.2,12),westArrival=at(-64,-10.9),westTarget=at(-25,-10.9),heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z);
 return {frame,at,local,rect,base,library,branches,junctions,branchAt,roofOffset,roofAt,isGlass,columns,benches,lamps,arrival,target,crossArrival,crossTarget,eastArrival,eastTarget,westArrival,westTarget,heading:heading(arrival,target),crossHeading:heading(crossArrival,crossTarget),eastHeading:heading(eastArrival,eastTarget),westHeading:heading(westArrival,westTarget),reconstructed:true};
}
const sourceRoof=CAMPUS.buildings.find(b=>b.id===LIBRARY_WALK_ID),maskFrame=orientedFrame(sourceRoof.points,{x:-.16,z:1});
export function inLibraryCoveredWalk(x,z){if(inside({x,z},sourceRoof.points))return true;const u=(x-maskFrame.x)*maskFrame.u.x+(z-maskFrame.z)*maskFrame.u.z,v=(x-maskFrame.x)*maskFrame.v.x+(z-maskFrame.z)*maskFrame.v.z;return Math.abs(u-3.1)<1.6&&[-58,-46,-34,-22].some(q=>Math.abs(v-q)<2);}
