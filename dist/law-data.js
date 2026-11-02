import { orientedFrame, framePoint } from './geometry.js?v=2793186f071d';
import { buildingBase } from './terrain.js?v=2793186f071d';
export const LAW_ID='law';
export const LAW_ARCHITECT={title:'Lyons · Faculty of Law, completed 2006',url:'https://www.lyonsarch.com.au/project/faculty-of-law-university-of-nsw/',visibleLevels:4};
export const LAW_MATERIAL_SOURCE='https://www.hunterdouglasarchitectural.com/referenceprojects/article.jsp?pId=8a4383491149a36401114cc0a5ba0033';
export function lawGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points);
  const local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  // Photographs and the architect's unscaled section establish a folded roof,
  // not its measured angles. Keep every fold below the retained 15 m map tag.
  const weight=p=>{const q=local(p);return Math.abs(q.u-3)+.22*Math.abs(q.v+2);},maximum=Math.max(...b.points.map(weight));
  const roofAt=p=>b.height-1.75+1.75*Math.min(1,weight(p)/maximum);
  const signed=b.points.reduce((s,p,i)=>{const q=b.points[(i+1)%b.points.length];return s+p.x*q.z-q.x*p.z;},0);
  const ring=signed<0?[...b.points].reverse():b.points;
  const faces=ring.map((a,i)=>{
    const c=ring[(i+1)%ring.length],len=Math.hypot(c.x-a.x,c.z-a.z),normal={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},mid=local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
    const along=normal.x*frame.u.x+normal.z*frame.u.z,across=normal.x*frame.v.x+normal.z*frame.v.z;
    const kind=across>.65?'mall':across<-.65?'union':along<0?'west':'east';
    return {a,c,len,normal,kind,mid,reconstructed:true};
  });
  const arrival=framePoint(frame,-17,50),target=framePoint(frame,-14,20),unionArrival=framePoint(frame,-35,-33),unionTarget=framePoint(frame,8,-24),westArrival=framePoint(frame,-54,0),westTarget=framePoint(frame,-33,0);
  return {frame,base,local,roofAt,faces,visibleLevels:LAW_ARCHITECT.visibleLevels,reconstructed:true,
    mallBands:[[5.6,6.8],[8.7,10.0],[11.9,12.85]],unionBands:[[3.35,4.7],[6.8,8.05],[10.15,11.45]],
    arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),
    unionArrival,unionTarget,unionHeading:Math.atan2(unionTarget.x-unionArrival.x,unionArrival.z-unionTarget.z),
    westArrival,westTarget,westHeading:Math.atan2(westTarget.x-westArrival.x,westArrival.z-westTarget.z)};
}
