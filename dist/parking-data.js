import { orientedFrame, framePoint, frameRectangle, clipFrameStrip } from './geometry.js?v=ddae060d1036';
import { buildingBase, terrainHeight } from './terrain.js?v=ddae060d1036';

export const BARKER_PARKING_ID='osm-way-9784728',BOTANY_PARKING_ID='osm-way-9784749';
export const BARKER_EXISTING_REPORT={title:'Architectus N18 drawings · existing levels in section SSDA25, December 2025',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-79257208%2120260303T065439.425+GMT',pdfPage:22,linkLabel:'Height source · existing architectural levels',screenRL:47.64,deckTops:[42.9,44.49,45.84],groundRLs:[32.4,33.73,35.04]};
const heading=(a,b)=>Math.atan2(b.x-a.x,a.z-b.z);
const signedArea=r=>r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p.x*q.z-q.x*p.z;},0)/2;
const localU=(f,p)=>(p.x-f.x)*f.u.x+(p.z-f.z)*f.u.z;
function outerEdges(points,source){
  const ring=signedArea(points)<0?[...points].reverse():points;
  return ring.map((a,i)=>({a,b:ring[(i+1)%ring.length]})).filter(({a,b})=>source.some((p,i)=>{
    const q=source[(i+1)%source.length],dx=q.x-p.x,dz=q.z-p.z,len=Math.hypot(dx,dz);
    return Math.abs(dx*(a.z-p.z)-dz*(a.x-p.x))/len<.015&&Math.abs(dx*(b.z-p.z)-dz*(b.x-p.x))/len<.015;
  }));
}

export function parkingGeometry(b){
  const frame=orientedFrame(b.points,{x:-.16,z:1}),base=buildingBase(b.points),barker=b.id===BARKER_PARKING_ID,half=frame.width/2;
  const cuts=barker?[-half,-half+frame.width*.2823,-half+frame.width*.7177,half]:[-half,half];
  const regions=cuts.slice(0,-1).map((lo,i)=>{
    const points=clipFrameStrip(b.points,{...frame,v:frame.u},lo,cuts[i+1]);
    const low=barker?BARKER_EXISTING_REPORT.groundRLs[i]:base,high=barker?BARKER_EXISTING_REPORT.deckTops[i]:base+b.height-1.2,count=barker?5:6;
    const decks=Array.from({length:count},(_,k)=>low+(high-low)*k/(count-1));
    return {points,decks,screenRL:high+(barker?1.8:1.2),faces:outerEdges(points,b.points),reconstructed:true};
  });
  const roofAt=p=>regions[cuts.findIndex((c,i)=>i<cuts.length-1&&localU(frame,p)>=c-.01&&localU(frame,p)<=cuts[i+1]+.01)]?.screenRL??regions.at(-1).screenRL;
  const coreSpecs=barker?[{u:-13,v:frame.length/2-2.9,w:3.8,l:4.8},{u:14,v:frame.length/2-2.9,w:3.8,l:4.8}]:[];
  const cores=coreSpecs.map(c=>{const centre=framePoint(frame,c.u,c.v);return {points:frameRectangle(frame,c.w,c.l,c.u,c.v),topRL:roofAt(centre),reconstructed:true};});
  if(!barker)cores.push({points:clipFrameStrip(clipFrameStrip(b.points,{...frame,v:frame.u},half-4.5,half),frame,-100,-8.5),topRL:regions[0].screenRL,reconstructed:true});
  const entryTarget=framePoint(frame,barker?-half:half-18,barker?11:-frame.length/2),arrival=framePoint(frame,barker?-half-8:10,barker?11:-frame.length/2-21);
  const ramps=[];
  if(barker)for(let i=0;i<2;i++)for(let level=0;level<5;level++){
    const u=cuts[i+1],v=level%2?9:-9,points=frameRectangle(frame,8.2,5.2,u,v);
    ramps.push({points,lowRL:regions[i].decks[level],highRL:regions[i+1].decks[level],reconstructed:true});
  }
  return {frame,base,barker,regions,cores,ramps,roofAt,arrival,target:entryTarget,heading:heading(arrival,entryTarget),reconstructed:true};
}

export function parkingEntry(g){
  let best=null;
  for(const region of g.regions)for(const {a,b:c} of region.faces){
    const dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz),nx=dz/len,nz=-dx/len;
    if(len<12||(g.barker?nx*g.frame.u.x+nz*g.frame.u.z:nx*g.frame.v.x+nz*g.frame.v.z)>-.75)continue;
    const t=Math.max(6/len,Math.min(1-6/len,((g.target.x-a.x)*dx+(g.target.z-a.z)*dz)/(len*len))),mid={x:a.x+dx*t,z:a.z+dz*t},score=Math.hypot(mid.x-g.target.x,mid.z-g.target.z);
    if(!best||score<best.score)best={a:{x:mid.x-dx/len*5.8,z:mid.z-dz/len*5.8},c:{x:mid.x+dx/len*5.8,z:mid.z+dz/len*5.8},region,score};
  }
  return best;
}
const contains=(p,ring)=>{let yes=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if(((a.z>p.z)!==(b.z>p.z))&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)yes=!yes;}return yes;};
export function parkingCars(b,g=parkingGeometry(b)){
  const result=[],colors=['#b9c5bd','#5c7380','#783c3c','#d6d3bd','#444c4e','#939b90'];
  for(const region of g.regions)for(const [level,rl] of region.decks.entries()){
    if(level%2&&level!==region.decks.length-1)continue;
    for(const {a,b:c} of region.faces){
      const dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz),nx=dz/len,nz=-dx/len,angle=Math.atan2(nx,nz);
      for(let d=5;d<len-4;d+=9.1){
        const x=a.x+dx*d/len-nx*2.3,z=a.z+dz*d/len-nz*2.3;
        const points=[[-.97,-2],[.97,-2],[.97,2],[-.97,2]].map(([u,v])=>({x:x+u*Math.cos(angle)+v*Math.sin(angle),z:z-u*Math.sin(angle)+v*Math.cos(angle)}));
        if(!points.every(p=>contains(p,region.points)&&!g.cores.some(core=>contains(p,core.points))))continue;
        if(points.some(p=>terrainHeight(p.x,p.z)>rl-.05))continue;
        result.push({x,z,rl:rl+.03,angle,points,color:colors[result.length%colors.length],roof:level===region.decks.length-1,reconstructed:true});
      }
    }
  }
  return result;
}
