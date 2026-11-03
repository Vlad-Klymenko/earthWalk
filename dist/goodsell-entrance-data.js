import {CAMPUS as RAW} from './campus-data.js?v=dfa1c50ac01f';
import {goodsellGeometry} from './eastern-faculty-data.js?v=dfa1c50ac01f';
import {framePoint,frameRectangle} from './geometry.js?v=dfa1c50ac01f';
export const GOODSELL_ID='osm-way-45604203';
export const GOODSELL_BUILDING=RAW.buildings.find(b=>b.id===GOODSELL_ID);
export const GOODSELL=goodsellGeometry(GOODSELL_BUILDING);
const a=GOODSELL_BUILDING.points[9],c=GOODSELL_BUILDING.points[8],length=Math.hypot(c.x-a.x,c.z-a.z);
export const GOODSELL_ENTRY_FACE={a,c,length,t:{x:(c.x-a.x)/length,z:(c.z-a.z)/length},n:{x:(c.z-a.z)/length,z:-(c.x-a.x)/length}};
export function goodsellFacePoint(d,y,o=0){const f=GOODSELL_ENTRY_FACE;return {x:f.a.x+f.t.x*d+f.n.x*o,y,z:f.a.z+f.t.z*d+f.n.z*o};}
const centre=(GOODSELL.entry.x-a.x)*GOODSELL_ENTRY_FACE.t.x+(GOODSELL.entry.z-a.z)*GOODSELL_ENTRY_FACE.t.z;
export const GOODSELL_DOOR={l:centre-1.8,r:centre+1.8,bottom:.08,top:3.05,glassTop:2.64,recess:.18,kind:'door',reconstructed:true};
export const GOODSELL_WINDOWS=[];
const bays=Math.round(length/2.55),pitch=(GOODSELL_BUILDING.height-.6)/4;
for(let bay=0;bay<bays;bay++)for(let row=0;row<4;row++){
 const mid=(bay+.5)*length/bays,w={l:mid-.53,r:mid+.53,bottom:row*pitch+.55,top:row*pitch+2.85,row,bay,recess:.32,header:.36,kind:'window',reconstructed:true};
 if(!(w.l<GOODSELL_DOOR.r&&w.r>GOODSELL_DOOR.l&&w.bottom<GOODSELL_DOOR.top))GOODSELL_WINDOWS.push(w);
}
export const GOODSELL_OPENINGS=[...GOODSELL_WINDOWS,GOODSELL_DOOR];
// Exact rectilinear complement: no opaque wall remains behind a recessed pane.
const xs=[...new Set([0,length,...GOODSELL_OPENINGS.flatMap(w=>[w.l,w.r])])].sort((a,b)=>a-b),ys=[...new Set([0,GOODSELL_BUILDING.height,...GOODSELL_OPENINGS.flatMap(w=>[w.bottom,w.top])])].sort((a,b)=>a-b);
export const GOODSELL_BRICK_PANELS=[];
for(let j=0;j<ys.length-1;j++)for(let i=0;i<xs.length-1;i++){
 const l=xs[i],r=xs[i+1],bottom=ys[j],top=ys[j+1],x=(l+r)/2,y=(bottom+top)/2;
 if(!GOODSELL_OPENINGS.some(w=>x>w.l&&x<w.r&&y>w.bottom&&y<w.top))GOODSELL_BRICK_PANELS.push({l,r,bottom,top});
}
export const GOODSELL_CANOPY={width:7.8,beams:[-1.35,1.43],mainBottom:3.05,mainTop:3.38,columnTop:2.72,bracketTop:3.05,reconstructed:true};
export function goodsellCanopyPoint(u,v,y){const p=framePoint(GOODSELL.canopy.frame,u,v);return {...p,y};}
export const GOODSELL_RAFTERS=Array.from({length:7},(_,i)=>({u:-3.5+i*7/6,profile:[[-2.1,3.92],[-1.35,3.38],[1.75,3.38],[1.75,3.67]],webWidth:.04,flangeWidth:.17,reconstructed:true}));
export const goodsellCanopyGlassHeight=v=>3.92-(v+2.1)*.25/3.85-.045;
export const GOODSELL_GLASS_PANES=GOODSELL_RAFTERS.slice(0,-1).map((r,i)=>({l:r.u+.055,r:GOODSELL_RAFTERS[i+1].u-.055,front:-1.75,back:1.7,reconstructed:true}));
export const GOODSELL_CANOPY_COLLISION={points:frameRectangle(GOODSELL.canopy.frame,7.8,3.85,0,-.175),bottom:3.05,top:3.92,reconstructed:true};
const f=GOODSELL.frame,n=GOODSELL.normal,entry=GOODSELL.entry,arrival={x:entry.x+n.x*9.5+f.u.x*.5,z:entry.z+n.z*9.5+f.u.z*.5};
export const GOODSELL_CANOPY_VIEW={id:'goodsell-shaped-canopy',name:'Goodsell · red columns and shaped steel canopy',code:'F20',kind:'academic',...arrival,heading:Math.atan2(entry.x-arrival.x,arrival.z-entry.z),pitch:.22,showSign:false,description:'Recessed courtyard windows, variegated grey-brown brick, shaped I-section rafters, separated glass panes and steel bearing brackets over red columns. Reconstructed from the November 2025 entrance photograph and July 2015 Street View. Raw footprint, mapped 15 m maximum and six-level tag retained; detailed component dimensions are photo-fitted estimates'};
