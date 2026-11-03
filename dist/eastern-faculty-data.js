import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=e9883400adb4';
import { buildingBase, terrainHeight } from './terrain.js?v=e9883400adb4';

// Photo-led details in metres. These are reconstruction dimensions, not a
// surveyed replacement for the retained parent outlines or height tags.
const frameFor=b=>orientedFrame(b.points,{x:-.16,z:1});
export function samuelsGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points),bodyRoof=b.height-3.8;
  const glasshouse={points:frameRectangle(frame,54,8,-6,0),floor:bodyRoof,low:b.height-1.4,high:b.height,reconstructed:true};
  const roofHeight=p=>{const v=(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z;return glasshouse.low+(v+4)/8*(glasshouse.high-glasshouse.low);};
  const plant={points:frameRectangle(frame,5,6,-36,-.5),bottom:bodyRoof,top:b.height-.6,reconstructed:true};
  const arrival=framePoint(frame,-2,33),target=framePoint(frame,-2,0);
  const trees=[-29,-15,-1,13].map((u,i)=>({...framePoint(frame,u,8.5),height:11+(i%2),form:'samuels-gum',reconstructed:true,source:'https://www.google.com/maps/@?api=1&map_action=pano&pano=WqdgjG-stUw4krMeGjTaZA&heading=345&pitch=30&fov=100'}));
  return {frame,base,bodyRoof,glasshouse,roofHeight,plant,arrival,target,trees,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z)};
}

export function goodsellGeometry(b){
  const frame=frameFor(b),base=buildingBase(b.points);
  // North courtyard entrance lies on the retained north-east wing edge.
  const entry={x:407.45,z:-38.506},normal={x:frame.v.x*-1,z:frame.v.z*-1};
  const entryGround=terrainHeight(entry.x+normal.x*.5,entry.z+normal.z*.5);
  const canopy={frame:{...frame,...{x:entry.x+normal.x*1.65,z:entry.z+normal.z*1.65}},width:7.4,depth:3.5,bottomRL:entryGround+3.05,roofRL:entryGround+3.92,reconstructed:true};
  const points=frameRectangle(canopy.frame,canopy.width,canopy.depth);
  const supports=[-3.2,3.2].map(u=>({...framePoint(frame,u+(entry.x-frame.x)*frame.u.x+(entry.z-frame.z)*frame.u.z,((entry.x-frame.x)*frame.v.x+(entry.z-frame.z)*frame.v.z)-3),radius:.22,reconstructed:true}));
  const arrival={x:entry.x+normal.x*14-frame.u.x*4,z:entry.z+normal.z*14-frame.u.z*4};
  return {frame,base:entryGround,minimumGround:base,entry,normal,entryGround,canopy:{...canopy,points},supports,arrival,heading:Math.atan2(entry.x-arrival.x,arrival.z-entry.z)};
}
