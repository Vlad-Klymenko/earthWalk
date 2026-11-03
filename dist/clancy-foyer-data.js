import {CAMPUS as RAW} from './campus-data.js?v=b468e6aa825e';
import {clancyGeometry} from './upper-campus-data.js?v=b468e6aa825e';
import {framePoint} from './geometry.js?v=b468e6aa825e';
export const CLANCY_ID='osm-way-45230512';
export const CLANCY_FOYER=clancyGeometry(RAW.buildings.find(b=>b.id===CLANCY_ID));
const g=CLANCY_FOYER,h=g.hood;
// Contractor reports 23 m awning width / 10 m glazing. Depth, sections,
// hanger positions and pane divisions are photo-fitted reconstructions.
export const CLANCY_CANOPY={width:23,frontV:h.glassV-3.8,backV:h.glassV+.15,height:3.65,thickness:.055,beamDepth:.13,bays:10,hangers:6,slatPitch:.19,reconstructed:true};
export const CLANCY_GLAZING={height:h.glassHeight,bays:12,finDepth:.48,finThickness:.026,reconstructed:true};
export const CLANCY_COPPER={tileMetres:4,diamondsAcross:8,rows:16,seamPitch:.48,reconstructed:true};
export const CLANCY_CANOPY_POINTS=[[-CLANCY_CANOPY.width/2,CLANCY_CANOPY.frontV],[CLANCY_CANOPY.width/2,CLANCY_CANOPY.frontV],[CLANCY_CANOPY.width/2,CLANCY_CANOPY.backV],[-CLANCY_CANOPY.width/2,CLANCY_CANOPY.backV]].map(([u,v])=>framePoint(g.frame,h.centreU+u,v));
export const CLANCY_HANGERS=Array.from({length:CLANCY_CANOPY.hangers},(_,i)=>{const u=h.centreU-10+i*4,v=CLANCY_CANOPY.frontV+.55;return {u,v,bottom:CLANCY_CANOPY.height+.04,top:g.roofHeight(v)-.27};});
export const CLANCY_GLASS_FINS=Array.from({length:CLANCY_GLAZING.bays+1},(_,i)=>({u:h.centreU-h.width/2+i*h.width/CLANCY_GLAZING.bays,frontV:h.glassV-.035,backV:h.glassV+CLANCY_GLAZING.finDepth,bottom:.08,top:h.glassHeight}));
// Project onto each face's own 3D basis. World-XZ UVs collapse on vertical
// reveals and distort shingle size on the sloping soffit.
export function clancySurfaceUV(points,scale=CLANCY_COPPER.tileMetres){
 const a=points[0],edge=points[1].map((n,i)=>n-a[i]),len=Math.hypot(...edge),u=edge.map(n=>n/len),r=points[2].map((n,i)=>n-a[i]),dot=r.reduce((s,n,i)=>s+n*u[i],0),v0=r.map((n,i)=>n-dot*u[i]),vl=Math.hypot(...v0),v=v0.map(n=>n/vl);
 return points.map(p=>{const d=p.map((n,i)=>n-a[i]);return [d.reduce((s,n,i)=>s+n*u[i],0)/scale,d.reduce((s,n,i)=>s+n*v[i],0)/scale];});
}
const view=(id,name,u,v,tu,tv,pitch)=>{const p=framePoint(g.frame,u,v),t=framePoint(g.frame,tu,tv);return {id,name,code:'C24',kind:'academic',...p,heading:Math.atan2(t.x-p.x,p.z-t.z),pitch,showSign:false,description:'Copper diamond shingles, ribbed oxidised outer hood, tall glass fins and suspended steel / glass canopy reconstructed from architect and facade-contractor photographs. Reported 23 m awning width and 10 m glazing retained separately from estimated 14.5 m overall height; fine sections, panel counts and depth are estimates'};};
export const CLANCY_DETAIL_VIEWS=[view('clancy-copper-hood','Clancy · copper hood and glass fins',-18,-37,h.centreU,-18,.43),view('clancy-suspended-canopy','Clancy · suspended entrance canopy',h.centreU,-27,h.centreU,-18,.24)];
