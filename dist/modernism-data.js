import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=159c90d42d57';
import {terrainHeight} from './terrain.js?v=159c90d42d57';

export const SCIENCE_THEATRE_HEIGHT={height:11.73,reportedFloors:5,objectId:9,url:'https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer/18',title:'UNSW public building labels · Science Theatre F13',linkLabel:'Height source · UNSW GIS',note:'Retained public Building Labels Feb2023 snapshot reports height11.73m and five floors. Original OSM15m/five-level tags remain. Height-field definition and roof reference are unspecified; this is not a roof-RL or component survey.'};

// Footprints and overall heights come from the retained map. Roof pitch,
// panel spacing, glazing bands and canopy dimensions are photo-led estimates.
export function scienceTheatreGeometry(b){
  // The original eastern footprint edge defines the north/south axis. The
  // pergola faces Science Theatre Lawn on the SOUTH, not the eastern passage.
  const frame=orientedFrame(b.points,{x:b.points[1].x-b.points[0].x,z:b.points[1].z-b.points[0].z});
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const roofHeight=p=>b.height-1.85*Math.max(0,Math.min(1,(local(p).v+frame.length/2)/frame.length));
  const canopy={width:frame.width-.8,depth:5,height:3.9,front:frame.length/2+5};
  // Align the arrival with the fitted double doors, between pergola posts.
  const arrival=framePoint(frame,frame.width*.14,canopy.front+10.5);
  const paving=frameRectangle(frame,frame.width+.4,canopy.depth+.5,0,frame.length/2+(canopy.depth+.5)/2);
  const floor=scienceTheatreFoundation(b,terrainHeight);
  const pavingField=p=>{const t=Math.max(0,Math.min(1,(local(p).v-frame.length/2)/(canopy.depth+.5))),outer=framePoint(frame,local(p).u,frame.length/2+canopy.depth+.5);return Math.max(terrainHeight(p.x,p.z)+.22,floor+(terrainHeight(outer.x,outer.z)+.22-floor)*t);};
  const cols=Math.ceil(frame.width+.4),rows=Math.ceil(canopy.depth+.5),vertices=[],triangles=[];
  for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){const p=framePoint(frame,(i/cols-.5)*(frame.width+.4),frame.length/2+j/rows*(canopy.depth+.5));vertices.push({...p,y:pavingField(p)});}
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=j*(cols+1)+i,c=a+cols+1;triangles.push([a,c,a+1],[a+1,c,c+1]);}
  const pavingHeight=p=>{const q=local(p),x=Math.max(0,Math.min(cols,(q.u/(frame.width+.4)+.5)*cols)),z=Math.max(0,Math.min(rows,(q.v-frame.length/2)/(canopy.depth+.5)*rows)),i=Math.min(cols-1,Math.floor(x)),j=Math.min(rows-1,Math.floor(z)),tx=x-i,tz=z-j,a=j*(cols+1)+i,at=k=>vertices[k].y;return tx+tz<=1?at(a)+tx*(at(a+1)-at(a))+tz*(at(a+cols+1)-at(a)):at(a+cols+2)+(1-tx)*(at(a+cols+1)-at(a+cols+2))+(1-tz)*(at(a+1)-at(a+cols+2));};
  const trees=[-10,9].map((u,i)=>({...framePoint(frame,u,frame.length/2+10),id:`reconstructed-science-tree-${i}`,height:9+i,reconstructed:true,source:'science-theatre-exterior'}));
  const eastArrival=framePoint(frame,frame.width/2+12,0),eastTarget=framePoint(frame,frame.width/2,0);
  return {frame,local,roofHeight,canopy,paving,pavingMesh:{vertices,triangles},pavingHeight,floor,trees,arrival,heading:Math.atan2(-frame.v.x,frame.v.z),eastArrival,eastHeading:Math.atan2(eastTarget.x-eastArrival.x,eastArrival.z-eastTarget.z),reconstructed:true};
}

export function modernFacadeFrame(b){
  const frame=orientedFrame(b.points);
  const classify=(a,c)=>{
    const len=Math.hypot(c.x-a.x,c.z-a.z),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
    return {length:len,nx,nz,u:nx*frame.u.x+nz*frame.u.z,v:nx*frame.v.x+nz*frame.v.z};
  };
  return {frame,classify};
}

export function scienceTheatreFoundation(b,heightAt){
  // The coarse DEM has an eastern mid-edge rise missed by corner-only
  // sampling. This is a fitted level foundation, not a surveyed floor RL.
  let top=-Infinity;
  for(let i=0;i<b.points.length;i++){const a=b.points[i],c=b.points[(i+1)%b.points.length],steps=Math.ceil(Math.hypot(c.x-a.x,c.z-a.z));for(let j=0;j<=steps;j++)top=Math.max(top,heightAt(a.x+(c.x-a.x)*j/steps,a.z+(c.z-a.z)*j/steps));}
  return top+.22;
}

export function websterTheatresGeometry(b){
  const frame=orientedFrame(b.points),west=-frame.width/2;
  const canopy={depth:4.2,start:-5.5,end:9,length:14.5,west:west-4.2,height:3.5};
  const roofHeight=t=>canopy.height+.45*Math.sin(Math.PI*t)+.2*(1-t);
  const posts=[-5,-1,3,7,8.8].map(v=>framePoint(frame,west-3.9,v));
  const paving=frameRectangle(frame,canopy.depth+.5,canopy.length+1.5,west-canopy.depth/2,(canopy.start+canopy.end)/2);
  const arrival=framePoint(frame,west-8.5,-1.5);
  return {frame,west,canopy,roofHeight,posts,paving,arrival,heading:Math.atan2(frame.u.x,-frame.u.z)};
}
