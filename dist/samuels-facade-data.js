import {CAMPUS as RAW} from './campus-data.js?v=26b79da8da82';
import {samuelsGeometry} from './eastern-faculty-data.js?v=26b79da8da82';
import {framePoint} from './geometry.js?v=26b79da8da82';
export const SAMUELS_ID='osm-way-290473701';
export const SAMUELS_BUILDING=RAW.buildings.find(b=>b.id===SAMUELS_ID);
export const SAMUELS=samuelsGeometry(SAMUELS_BUILDING);
// The inspected Library Walk elevation is raw edge 8. Do not project its
// detailed screen section onto unverified elevations or alter the source roof.
const a=SAMUELS_BUILDING.points[8],c=SAMUELS_BUILDING.points[9],length=Math.hypot(c.x-a.x,c.z-a.z);
export const SAMUELS_LIBRARY_FACE={a,c,length,t:{x:(c.x-a.x)/length,z:(c.z-a.z)/length},n:{x:(c.z-a.z)/length,z:-(c.x-a.x)/length},index:8};
export const SAMUELS_SCREEN={claddingBase:7.2,rows:5,rowPitch:(SAMUELS.bodyRoof-7.2)/5,front:1.05,root:.14,width:1.04,bottom:6.65,top:SAMUELS.bodyRoof+.15,reconstructed:true};
export function samuelsFacadePoint(d,y,offset=0){const f=SAMUELS_LIBRARY_FACE;return {x:f.a.x+f.t.x*d+f.n.x*offset,y,z:f.a.z+f.t.z*d+f.n.z*offset};}
export const SAMUELS_UPPER_WINDOWS=[],SAMUELS_UPPER_PANELS=[];
const bays=Math.round(length/2.7);
for(let i=0;i<bays;i++){
 const l=i*length/bays,r=(i+1)*length/bays,wl=l+.17*(r-l),wr=l+.83*(r-l),S=SAMUELS_SCREEN;
 SAMUELS_UPPER_PANELS.push({l,r:wl,bottom:S.claddingBase,top:SAMUELS.bodyRoof},{l:wr,r,bottom:S.claddingBase,top:SAMUELS.bodyRoof});
 let previous=S.claddingBase;
 for(let row=0;row<S.rows;row++){
  const bottom=S.claddingBase+row*S.rowPitch+.85,top=bottom+1.02;
  SAMUELS_UPPER_PANELS.push({l:wl,r:wr,bottom:previous,top:bottom});
  SAMUELS_UPPER_WINDOWS.push({l:wl,r:wr,bottom,top,row,bay:i,recess:.18,reconstructed:true});previous=top;
 }
 SAMUELS_UPPER_PANELS.push({l:wl,r:wr,bottom:previous,top:SAMUELS.bodyRoof});
}
export const SAMUELS_SCREEN_PANELS=[],SAMUELS_SCREEN_BLADES=[],SAMUELS_SCREEN_SUPPORTS=[];
const panel=(kind,local,uv)=>SAMUELS_SCREEN_PANELS.push({kind,local,points:local.map(p=>samuelsFacadePoint(...p)),uv:uv.map(p=>p.map(v=>v*2)),reconstructed:true});
const support=(a,c,radius=.022)=>SAMUELS_SCREEN_SUPPORTS.push({a:samuelsFacadePoint(...a),c:samuelsFacadePoint(...c),radius});
const S=SAMUELS_SCREEN,count=Math.round(length/8.2);
for(let i=1;i<count;i++){
 const d=i*length/count,l=d-S.width/2,r=d+S.width/2;
 panel('vertical-front',[[l,S.bottom,S.front],[l,S.top,S.front],[r,S.top,S.front],[r,S.bottom,S.front]],[[0,S.bottom],[0,S.top],[S.width,S.top],[S.width,S.bottom]]);
 // Visible lower triangular web and standoffs establish depth. Its complete
 // plate section is a fitted reconstruction, not a verified fabrication detail.
 panel('vertical-web',[[d,6.75,.04],[d,S.top,.04],[d,S.top,1.25],[d,6.75,1.25]],[[0,6.75],[0,S.top],[1.21,S.top],[1.21,6.75]]);
 const blade=[[d,6.05,.04],[d,6.75,1.25],[d,6.75,.04]];
 SAMUELS_SCREEN_BLADES.push({points:blade.map(p=>samuelsFacadePoint(...p)),local:blade,reconstructed:true});
 for(const x of [l,r])support([x,S.bottom,S.front],[x,S.top,S.front]);
 support([d,6.75,1.25],[d,S.top,1.25]);
 for(let row=0;row<=S.rows;row++){const y=S.claddingBase+row*S.rowPitch-.15;support([l,y,S.root],[l,y,S.front]);support([r,y,S.root],[r,y,S.front]);}
}
for(let row=0;row<=S.rows;row++){
 const bottom=S.claddingBase+row*S.rowPitch-.45,top=bottom+.48;
 panel('horizontal-front',[[.08,bottom,S.front],[.08,top,S.front],[length-.08,top,S.front],[length-.08,bottom,S.front]],[[0,0],[0,.48],[length-.16,.48],[length-.16,0]]);
 panel('horizontal-top',[[.08,top,S.root],[.08,top,S.front],[length-.08,top,S.front],[length-.08,top,S.root]],[[0,0],[0,S.front-S.root],[length-.16,S.front-S.root],[length-.16,0]]);
 for(const y of [bottom,top])support([.08,y,S.front],[length-.08,y,S.front],.025);
 for(let d=1;d<length;d+=2.7)support([d,top,S.root],[d,top,S.front],.018);
}
const arrival=framePoint(SAMUELS.frame,-26,24),target=framePoint(SAMUELS.frame,-8,7);
export const SAMUELS_SCREEN_VIEW={id:'samuels-library-screens',name:'Samuels · mesh fins and recessed windows',code:'F25',kind:'academic',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:.47,showSign:false,description:'Library Walk mesh front panels, projecting support webs, shade shelves and recessed window rows reconstructed from July 2015 Street View. The raw footprint, mapped 28 m height, seven-level tag and existing rooftop glasshouse remain. Screen sections / spacing and window dimensions are photo-fitted estimates; less-visible elevations remain approximate'};
