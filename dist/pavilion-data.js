import {CAMPUS} from './campus-data.js?v=916c3fc1320a';
import {terrainHeight} from './terrain.js?v=916c3fc1320a';
import {UNSW_GIS_LABEL_EVIDENCE} from './unsw-gis-evidence.js?v=916c3fc1320a';
export const PAVILION_ID='pavilion';
export const PAVILION_ARCHITECT={title:'Sam Crawford Architects · Sam Cracknell Pavilion upgrade',url:'https://samcrawfordarchitects.com.au/project/unsw-village-green-sam-cracknell-pavilion-upgrade',completion:2023};
export const PAVILION_GIS=UNSW_GIS_LABEL_EVIDENCE.find(p=>p.code==='H8');
export const PAVILION_FIELD_VIEW='https://www.google.com/maps/@?api=1&map_action=pano&pano=zgl5vdlU7sJnmSeg1miMVQ&heading=0&pitch=10';
export const PAVILION_ENTRY_VIEW='https://www.google.com/maps/@?api=1&map_action=pano&pano=r5V61kbRloT2FO7xwMhk5g&heading=230&pitch=8';
export function pavilionRibbon(a,b,inside,outside=0,extend=.15){
 const dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),u={x:dx/len,z:dz/len},n={x:u.z,z:-u.x};
 return [{x:a.x-u.x*extend+n.x*outside,z:a.z-u.z*extend+n.z*outside},{x:b.x+u.x*extend+n.x*outside,z:b.z+u.z*extend+n.z*outside},{x:b.x+u.x*extend-n.x*inside,z:b.z+u.z*extend-n.z*inside},{x:a.x-u.x*extend-n.x*inside,z:a.z-u.z*extend-n.z*inside}];
}
export function pavilionGeometry(b=CAMPUS.buildings.find(b=>b.id===PAVILION_ID)){
 const a=b.points[0],c=b.points[1],len=Math.hypot(c.x-a.x,c.z-a.z),u={x:(c.x-a.x)/len,z:(c.z-a.z)/len},n={x:u.z,z:-u.x},at=(t,inward=0)=>({x:a.x+(c.x-a.x)*t-n.x*inward,z:a.z+(c.z-a.z)*t-n.z*inward});
 const approach=at(.67,-1.2),base=terrainHeight(approach.x,approach.z)+.22,floor=3.2,roof=6.8,curve=b.points.slice(4,14);
 const stair={a:at(.67,-.12),b:at(.67,5.0),width:2.4,count:20,h0:base,h1:base+floor};
 const stairTreads=Array.from({length:stair.count},(_,i)=>{const at=t=>({x:stair.a.x+(stair.b.x-stair.a.x)*t,z:stair.a.z+(stair.b.z-stair.a.z)*t}),a=at(i/stair.count),c=at((i+1)/stair.count),p=(q,side)=>({x:q.x+u.x*stair.width/2*side,z:q.z+u.z*stair.width/2*side});return {points:[p(a,1),p(c,1),p(c,-1),p(a,-1)],rl:base+floor*i/stair.count+.075};});
 const stairNormal={x:u.x,z:u.z},stairBox=(start,end,width)=>[{x:start.x+u.x*width/2,z:start.z+u.z*width/2},{x:start.x-u.x*width/2,z:start.z-u.z*width/2},{x:end.x-u.x*width/2,z:end.z-u.z*width/2},{x:end.x+u.x*width/2,z:end.z+u.z*width/2}];
 const landingA=at(.67,5),landingB=at(.67,6.6),landing={points:stairBox(landingA,landingB,3.0)},entryHole=stairBox(at(.67,-1),landingB,3.0);
 const segments=curve.slice(1).map((c,i)=>{const a=curve[i],len=Math.hypot(c.x-a.x,c.z-a.z);return {a,b:c,len,u:{x:(c.x-a.x)/len,z:(c.z-a.z)/len},n:{x:(c.z-a.z)/len,z:-(c.x-a.x)/len},sourceEdge:i+4};}).filter(s=>s.len>2.5);
 const columns=segments.filter(s=>s.len>3).flatMap(s=>[.18,.82].map(t=>({x:s.a.x+(s.b.x-s.a.x)*t-s.n.x*.48,z:s.a.z+(s.b.z-s.a.z)*t-s.n.z*.48,radius:.18,roof:7.15})));
 const seats=[];for(const s of segments.filter(s=>s.len>4))for(let row=0;row<3;row++)for(let d=.75;d<s.len-.65;d+=.57){const inward=1.0+row*.78;seats.push({x:s.a.x+s.u.x*d-s.n.x*inward,z:s.a.z+s.u.z*d-s.n.z*inward,u:s.u,n:s.n,row,width:.49,depth:.48,seat:.42+row*.28,reconstructed:true});}
 const target={x:-99,z:-11},arrival={x:-80,z:15},entryView=at(.67,-8),balconyView={x:-96.7,z:-2.6};
 return {base,floor,floorRL:base+floor,roof,maximum:8,landingStepHeight:.27,a,c,u,n,at,curve,segments,columns,seats,stair,stairTreads,stairNormal,stairPoints:stairBox(stair.a,stair.b,stair.width),landing,entryHole,approach,arrival,target,entryView,balconyView,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),entryHeading:Math.atan2(-n.x,n.z),balconyHeading:Math.atan2(.5,-.86),reconstructed:true};
}
export function inPavilionGround(x,z){return x>-116&&x<-78&&z>-34&&z<12;}
