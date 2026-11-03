import {scienceTheatreGeometry,modernFacadeFrame} from './modernism-data.js?v=b468e6aa825e';
import {buildingBase} from './terrain.js?v=b468e6aa825e';

// Photo-fitted openings cut through the wall mesh. All intervals refer to the
// original mapped elevation; the source footprint is never enlarged.
export function scienceTheatreFacades(b){
 const g=scienceTheatreGeometry(b),f=g.frame,signed=b.points.reduce((s,p,i)=>{const q=b.points[(i+1)%b.points.length];return s+p.x*q.z-q.x*p.z;},0),ring=signed>0?b.points:[...b.points].reverse(),classify=modernFacadeFrame(b).classify;
 // Classify against the deliberately south-facing theatre frame rather than
 // modernFacadeFrame's default longest edge, used by unrelated buildings.
 return ring.map((a,i)=>{
  const c=ring[(i+1)%ring.length],e=classify(a,c),nu=e.nx*f.u.x+e.nz*f.u.z,nv=e.nx*f.v.x+e.nz*f.v.z,mode=nv>.9?'south':nu>.9?'east':nu<-.9?'west':'north',localA=g.local(a),localC=g.local(c),coordinate=mode==='south'?'u':'v',start=localA[coordinate],end=localC[coordinate],toT=value=>(value-start)/(end-start),holes=[];
  const opening=(id,left,right,bottom,top)=>{let lo=toT(left),hi=toT(right);if(lo>hi)[lo,hi]=[hi,lo];lo=Math.max(0,lo);hi=Math.min(1,hi);if(hi>lo)holes.push({id,left:lo,right:hi,bottom,top,recess:.16,reconstructed:true});};
  if(mode==='south'){
   opening('south-doors',-f.width*.19,f.width*.47,.06,3.35);
   opening('south-gallery',-f.width*.35,f.width*.47,4.18,7.48);
   opening('south-slit',-f.width*.44,-f.width*.23,1.25,2.1);
  }
  if(mode==='east')opening('east-glazed-foyer',-f.length*.47,f.length*.47,.06,8.22);
  const point=(t,y,offset=0)=>({x:a.x+(c.x-a.x)*t+e.nx*offset,y,z:a.z+(c.z-a.z)*t+e.nz*offset}),roof=t=>g.roofHeight(point(t,0)),bottom=buildingBase(b.points)-g.floor,xs=[...new Set([0,1,...holes.flatMap(h=>[h.left,h.right])])].sort((a,b)=>a-b),ys=[...new Set([bottom,...holes.flatMap(h=>[h.bottom,h.top])])].sort((a,b)=>a-b),masonry=[];
  for(let xi=0;xi<xs.length-1;xi++)for(let yi=0;yi<ys.length;yi++){
   const left=xs[xi],right=xs[xi+1],low=ys[yi],high=ys[yi+1]??Infinity,mid=(left+right)/2;
   if(holes.some(h=>mid>h.left&&mid<h.right&&low>=h.bottom&&low<h.top))continue;
   const topLeft=Math.min(high,roof(left)),topRight=Math.min(high,roof(right));if(Math.min(topLeft,topRight)>low)masonry.push({left,right,bottom:low,topLeft,topRight});
  }
  return {...e,a,c,mode,point,roof,holes,masonry};
 });
}

export function scienceTheatreCanopy(g){
 const f=g.frame,c=g.canopy,posts=[];
 for(const v of [f.length/2+.38,c.front])for(let i=0;i<5;i++)posts.push({u:(i/4-.5)*(c.width-1),v,bottom:0,top:c.height+.67,reconstructed:true});
 return {posts,rows:[f.length/2+.38,c.front],slats:Array.from({length:Math.floor(c.width/.9)+1},(_,i)=>-c.width/2+i*.9),reconstructed:true};
}
