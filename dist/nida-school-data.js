import {CAMPUS} from './campus-data.js?v=fbfc5011f3c1';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=fbfc5011f3c1';
import {buildingBase,terrainHeight} from './terrain.js?v=fbfc5011f3c1';

export const NIDA_SCHOOL_ID='osm-way-164558661';
export const NIDA_WEST_ID='osm-way-609912643';
export const NIDA_SCHOOL_IDS=[NIDA_SCHOOL_ID,NIDA_WEST_ID];
export const NIDA_SCHOOL_AERIAL='https://www.google.com/maps/@-33.91562,151.22525,180m/data=!3m1!1e3';
export const NIDA_SCHOOL_STREET={pano:'JeU0s-ijUvRcaPgVPePJ6Q',lat:-33.9155442,lon:151.2255537,date:'September 2024',url:'https://www.google.com/maps/@?api=1&map_action=pano&pano=JeU0s-ijUvRcaPgVPePJ6Q&heading=270&pitch=12'};
export const NIDA_ORIGINAL_PLAN='https://aphref.aph.gov.au/house/committee/reports/1983/1983_pp241.pdf';
export const NIDA_SCHOOL_PLANNING='https://apps.planningportal.nsw.gov.au/prweb/PRRestService/DocMgmt/v1/PublicDocuments/DATA-WORKATTACH-FILE%20PEC-DPE-EP-WORK%20PPS-2012SYE102%2120190614T191516.533%20GMT';
const west=CAMPUS.buildings.find(b=>b.id===NIDA_WEST_ID);
export const NIDA_SCHOOL_FRAME=orientedFrame(west.points);
export const nidaPoint=(u,v)=>framePoint(NIDA_SCHOOL_FRAME,u,v);
export const nidaLocal=p=>({u:(p.x-NIDA_SCHOOL_FRAME.x)*NIDA_SCHOOL_FRAME.u.x+(p.z-NIDA_SCHOOL_FRAME.z)*NIDA_SCHOOL_FRAME.u.z,v:(p.x-NIDA_SCHOOL_FRAME.x)*NIDA_SCHOOL_FRAME.v.x+(p.z-NIDA_SCHOOL_FRAME.z)*NIDA_SCHOOL_FRAME.v.z});
export const nidaRectangle=(u0,u1,v0,v1)=>frameRectangle(NIDA_SCHOOL_FRAME,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2);
export const NIDA_SCHOOL_STREET_PATH='osm-way-712447765';
const streetPath=CAMPUS.paths.find(p=>p.id===NIDA_SCHOOL_STREET_PATH);
function streetPoint(desired){let result=desired,best=Infinity;for(let i=1;i<streetPath.points.length;i++){const a=streetPath.points[i-1],c=streetPath.points[i],dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((desired.x-a.x)*dx+(desired.z-a.z)*dz)/(dx*dx+dz*dz))),p={x:a.x+dx*t,z:a.z+dz*t},d=Math.hypot(p.x-desired.x,p.z-desired.z);if(d<best){best=d;result=p;}}return result;}
const streetNorth=nidaLocal(streetPath.points.at(-1)),streetSouth=nidaLocal(streetPath.points.at(-2));
const streetU=v=>streetNorth.u+(streetSouth.u-streetNorth.u)*(v-streetNorth.v)/(streetSouth.v-streetNorth.v);
function boundaryU(v){let u=streetU(v)-4.2;for(let i=0;i<50;i++){const p=nidaPoint(u,v);if(!CAMPUS.paths.some(path=>path.points.slice(1).some((c,i)=>segmentDistance(p,path.points[i],c)<(path.width||3)/2+.35)))break;u-=.1;}return u;}
const schoolRing=CAMPUS.buildings.find(b=>b.id===NIDA_SCHOOL_ID).points.map(nidaLocal);
function frontEdge(v){const hits=[];for(let i=0;i<schoolRing.length;i++){const a=schoolRing[i],c=schoolRing[(i+1)%schoolRing.length];if(v>=Math.min(a.v,c.v)&&v<=Math.max(a.v,c.v)&&Math.abs(c.v-a.v)>1e-8)hits.push(a.u+(c.u-a.u)*(v-a.v)/(c.v-a.v));}return Math.max(...hits);}

// Photograph / aerial fitted boundaries, not new OSM building parts. Both
// original outer rings and their independent two-level tags are retained.
export function nidaSchoolDefinitions(id){
 if(id===NIDA_WEST_ID)return [
  {key:'west-back-gallery',kind:'gallery',points:nidaRectangle(-50,-7,-60,100)},
  ...[[-30,-7.55],[-7.55,10.8],[10.8,27]].map(([v0,v1],i)=>({key:`west-teaching-${i+1}`,kind:'hip',points:nidaRectangle(-7,40,v0,v1)}))
 ];
 return [
  {key:'anzac-room-band',kind:'front',points:[nidaPoint(.373*-60+16.2,-60),nidaPoint(100,-60),nidaPoint(100,100),nidaPoint(.373*100+16.2,100)]},
  {key:'south-school-link',kind:'flat',points:nidaRectangle(-50,100,78.5,100)},
  {key:'main-back-gallery',kind:'gallery',points:nidaRectangle(-50,-7,-60,100)},
  {key:'north-school-link',kind:'flat',points:nidaRectangle(-7,100,-60,-23)},
  ...[[28.7,43.8],[46.5,61.8],[64.2,78.5]].map(([v0,v1],i)=>({key:`main-teaching-${i+1}`,kind:'hip',points:nidaRectangle(-7,12.3,v0,v1)})),
  {key:'northern-court-gallery',kind:'cover',points:nidaRectangle(-7,100,-23,26.7)},
 ];
}

export function nidaSchoolGeometry(b=CAMPUS.buildings.find(b=>b.id===NIDA_SCHOOL_ID)){
 const base=buildingBase(b.points),arrival=nidaPoint(28,49),target=nidaPoint(3,54),northArrival=nidaPoint(10.4,1),northTarget=nidaPoint(1,-19),streetArrival=streetPoint(nidaPoint(45.7,46)),streetTarget=nidaPoint(34.5,45),galleryArrival=nidaPoint(-9,52),galleryTarget=nidaPoint(-9,72);
 const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
 return {frame:NIDA_SCHOOL_FRAME,at:nidaPoint,local:nidaLocal,base,maximum:6.4,
  arrival,target,heading:heading(arrival,target),northArrival,northTarget,northHeading:heading(northArrival,northTarget),streetArrival,streetTarget,streetHeading:heading(streetArrival,streetTarget),galleryArrival,galleryTarget,galleryHeading:heading(galleryArrival,galleryTarget),
  // Fitted positions follow the open gardens visible in the aerial view.
  trees:[{u:23.5,v:56,height:8,radius:.35},{u:31,v:70,height:10,radius:.4},{u:7,v:-16,height:7,radius:.3}].map(p=>({...p,...nidaPoint(p.u,p.v)})),
  benches:[{u:16.4,v:51},{u:27.5,v:73}].map(p=>({...p,...nidaPoint(p.u,p.v),length:2.5})),
  canopy:[nidaPoint(17,32),nidaPoint(29,35),nidaPoint(29,46),nidaPoint(17,43)],
  boundaryWall:Array.from({length:37},(_,i)=>{const v=streetNorth.v+(72-streetNorth.v)*i/36;return nidaPoint(boundaryU(v),v);}),
  streetTrees:[-10,4,18,32,46,60].map((v,i)=>({...nidaPoint((boundaryU(v)+frontEdge(v))/2,v),v,height:13+i%4,radius:.45})).filter(p=>!CAMPUS.trees.some(t=>Math.hypot(p.x-t.x,p.z-t.z)<3)),
  canopyHeight:p=>terrainHeight(p.x,p.z)+3.9+.7*Math.abs((nidaLocal(p).u-23)/6),reconstructed:true};
}

// Every hip rises from an estimated 4.7 m eave to a low 5.8 m plateau;
// small clerestory lanterns reach the retained 6.4 m maximum. This is not
// the 14 m James Fairfax Foyer extension discussed in the separate DA.
export function nidaSchoolRoofHeight(part,p){
 if(['cover','gallery'].includes(part.kind))return terrainHeight(p.x,p.z)+3.35;
 if(part.kind!=='hip')return part.base+6.1;
 // Distance to the actual clipped perimeter keeps each eave attached to its
 // wall, including the source's diagonal / stepped eastern edges.
 const d=Math.min(...part.points.map((a,i)=>segmentDistance(p,a,part.points[(i+1)%part.points.length])));
 return part.base+4.7+1.1*Math.min(1,d/2.6);
}
export function inNidaSchoolGround(x,z){const q=nidaLocal({x,z});return q.u>-12&&q.u<55&&q.v>-31&&q.v<83;}
export function nidaSchoolBoundarySegments(wall){return wall.slice(1).map((c,i)=>{const a=wall[i],length=Math.hypot(c.x-a.x,c.z-a.z),u={x:(c.x-a.x)/length,z:(c.z-a.z)/length},frame={x:(a.x+c.x)/2,z:(a.z+c.z)/2,u,v:{x:-u.z,z:u.x}};return {a,c,length,points:frameRectangle(frame,length,.22)};});}

const segmentDistance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
const inside=(p,ring)=>{let yes=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)yes=!yes;}return yes;};
export function nidaSchoolColumns(parts){
 const occupied=parts.filter(p=>!['cover','gallery'].includes(p.kind)),columns=[];
 for(const cover of parts.filter(p=>['cover','gallery'].includes(p.kind)))for(let i=0;i<cover.points.length;i++){
  const a=cover.points[i],c=cover.points[(i+1)%cover.points.length],length=Math.hypot(c.x-a.x,c.z-a.z),steps=Math.max(1,Math.ceil(length/3.8));
  for(let j=0;j<steps;j++){
   const p={x:a.x+(c.x-a.x)*j/steps,z:a.z+(c.z-a.z)*j/steps};
   if(occupied.some(r=>inside(p,r.points)||r.points.some((a,i)=>segmentDistance(p,a,r.points[(i+1)%r.points.length])<.35)))continue;
   if(CAMPUS.buildings.filter(b=>!NIDA_SCHOOL_IDS.includes(b.id)&&!b.walkableUnder).some(b=>inside(p,b.points)||b.points.some((a,i)=>segmentDistance(p,a,b.points[(i+1)%b.points.length])<.35)))continue;
   if(CAMPUS.paths.some(path=>path.points.slice(1).some((c,i)=>segmentDistance(p,path.points[i],c)<(path.width||3)/2+.3)))continue;
   if(columns.some(q=>Math.hypot(p.x-q.x,p.z-q.z)<1.2))continue;
   columns.push({...p,sourceId:cover.sourceId,height:3.17,radius:.065});
  }
 }
 return columns;
}
