import { CAMPUS as SOURCE } from './campus-data.js?v=372bc6d4b821';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=372bc6d4b821';
import { buildingBase, terrainHeight } from './terrain.js?v=372bc6d4b821';

export const MATHEWS_ID='mathews';
export const MATHEWS_SHARED_LANE={id:'osm-way-1384227356',renderWidth:5.8,url:'https://www.google.com/maps/@?api=1&map_action=pano&pano=Xg7JfVHtHLbiVeBYlHBtkg&heading=350&pitch=20'};
export const MATHEWS_PHOTO={title:'Mathews · façade engineering photograph, 20 June 2014',url:'https://images.squarespace-cdn.com/content/v1/53c62e33e4b0b5f8dc88ebe8/1408358912728-WCO519PQRMNXIA2E97X2/Mathews%2BBuilding%2BUNSW%2B%2B.JPG'};
export const MATHEWS_FRAME=orientedFrame(SOURCE.buildings.find(b=>b.id===MATHEWS_ID).points,{x:-.16,z:1});

// Photo / aerial-led internal subdivisions, never surveyed building parts.
// The source L-shaped outer perimeter and reported 54 m maximum stay intact.
export function mathewsGeometry(b){
  const frame=MATHEWS_FRAME,base=buildingBase(b.points),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const tower={points:frameRectangle(frame,56.7,15.1,10.15,7.75),top:51.4,reconstructed:true};
  const plant={points:frameRectangle(frame,25,14,7.6,7.75),top:54,reconstructed:true};
  const entry={points:frameRectangle(frame,3.0,7.5,-38.0,-2.3),ceiling:5.35,posts:[-6.4,1.8].map(v=>({...framePoint(frame,-38.8,v),u:-38.8,v})),reconstructed:true};
  const entryApron=frameRectangle(frame,7.9,7.5,-40.45,-2.3);
  const towerRows=[{low:3.95,high:6.5},...Array.from({length:13},(_,i)=>({low:7.6+i*3.35,high:8.9+i*3.35}))];
  const podiumRows=Array.from({length:4},(_,i)=>({low:5.8+i*3.2,high:8.25+i*3.2}));
  const towerBays=[[-14.7,7.25],[13.05,35.0]].flatMap(([left,right])=>Array.from({length:3},(_,i)=>({left:left+(right-left)*i/3+.3,right:left+(right-left)*(i+1)/3-.3})));
  const planters=[[-28,15],[-11,15]].map(([u,width])=>({points:frameRectangle(frame,width,2.3,u,29.5),height:.58,reconstructed:true}));
  const palms=[-32,-24,-15,-7].map((u,i)=>({...framePoint(frame,u,29.5),u,v:29.5,height:4.5+(i%2)*.8,reconstructed:true}));
  const arrival=framePoint(frame,-55,37),target=framePoint(frame,5,8),courtArrival=framePoint(frame,7,-34),courtTarget=framePoint(frame,7,7),entryArrival=framePoint(frame,-42.1,-2.3),entryTarget=framePoint(frame,-36.8,-2.3);
  const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
  return {frame,base,local,tower,plant,entry,entryApron,towerRows,podiumRows,towerBays,planters,palms,podiumHeight:18.3,arrival,target,heading:heading(arrival,target),courtArrival,courtTarget,courtHeading:heading(courtArrival,courtTarget),entryArrival,entryTarget,entryHeading:heading(entryArrival,entryTarget),entryFloor:p=>terrainHeight(p.x,p.z)+.22,reconstructed:true};
}
export function inMathewsForecourt(x,z){const f=MATHEWS_FRAME,u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z;return u>-41&&u<43&&v>26.5&&v<42;}
