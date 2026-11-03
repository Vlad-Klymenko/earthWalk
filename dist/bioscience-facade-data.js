import {CAMPUS as RAW} from './campus-data.js?v=0a6497e5d72b';
import {bioscienceGeometry} from './bioscience-data.js?v=0a6497e5d72b';
import {framePoint} from './geometry.js?v=0a6497e5d72b';
// Original procedural interpretations of built exterior photographs, not
// sampled photo colours / pixels or surveyed manufacturing schedules.
export const BIOSCIENCE_FACADE_SOURCE='https://www.woodsbagot.com/projects/university-of-new-south-wales-biological-sciences/';
export const BIOSCIENCE_SCREEN={firstRL:57.57,pitch:.55,offset:.30,depth:.32,bevel:.018,reconstructed:true,note:'Lowest terracotta course is fitted to the existing 57.57 m planning floor / glass underside. Built photos show screening below the old 61.53 m visual cutoff. This is not a surveyed screen sill.'};
export const BIOSCIENCE_CLAY=['#aa744e','#bb8759','#c7a270','#d4c19a','#ddd3b6','#927653'];
export function bioscienceFin(index,level,count){
 const t=(index+.5)/count,group=Math.floor(index/4),field=Math.sin(t*7.5+level*.34)+.60*Math.cos(t*17-level*.22),ivory=field>.45;
 const colour=ivory?BIOSCIENCE_CLAY[3+(group+level)%2]:BIOSCIENCE_CLAY[Math.abs(group+Math.floor(level/2))%3];
 return {width:[.085,.105,.115,.095][(index+level)%4],depth:BIOSCIENCE_SCREEN.depth,color:colour,trimBottom:(index+level*5)%29===0?.17:0,trimTop:(index*3+level)%31===0?.12:0,reconstructed:true};
}
export const BIOSCIENCE_GREY=['#c9cbc2','#bdc1b7','#b0b7ae','#a3aca4','#929e98','#82918d'];
export function bioscienceGreyPanel(column,row,columns,rows){
 const x=(column+.5)/columns,y=(row+.5)/rows;
 // Broad interlocking grey fields follow the overall photographed character.
 // Exact pixel-art contours are intentionally not represented as a survey.
 const centre1=.29+.16*Math.sin(y*8.2-.8),centre2=.83-.11*Math.sin(y*7.1+.6),d1=Math.abs(x-centre1),d2=Math.abs(x-centre2),w1=.13+.035*Math.sin(y*6),w2=.12+.03*Math.cos(y*5);
 if(d1<w1)return BIOSCIENCE_GREY[y>.62?4:3];
 if(d2<w2)return BIOSCIENCE_GREY[y>.2&&y<.7?3:2];
 return BIOSCIENCE_GREY[d1<w1+.05||d2<w2+.05?1:0];
}
export function biosciencePanelGrid(length,height){return {columns:Math.max(1,Math.round(length/.55)),rows:Math.max(1,Math.round(height/.85))};}
export const BIOSCIENCE_GLASS={midTransom:.5,lowerSpandrel:.65,mullionWidth:.035,reconstructed:true,note:'Finer curtain-wall grid and lower blue spandrels follow built photos. Detailed pane count, glazing tint and spandrel sizes are estimates.'};
export function baguetteProfile(width,depth,bevel=BIOSCIENCE_SCREEN.bevel){
 const x=width/2,z=depth/2,b=Math.min(bevel,x*.6,z*.6);
 return [[-x+b,-z],[x-b,-z],[x,-z+b],[x,z-b],[x-b,z],[-x+b,z],[-x,z-b],[-x,-z+b]];
}

export const BIOSCIENCE_PIER={topWidth:.78,bottomWidth:.58,collisionRadius:.57,reconstructed:true,note:'Tapered pale concrete supports follow the built east photo; source support centres and 57.57 m underside stay unchanged.'};

const north=bioscienceGeometry(RAW.buildings.find(b=>b.id==='biological-north')),arrival=framePoint(north.frame,83,-18),target=framePoint(north.frame,53,-18);
export const BIOSCIENCE_GREY_VIEW={id:'bioscience-grey-panel-wall',name:'Biosciences North · grey panel wall',code:'D26',kind:'academic',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:.30,showSign:false,description:'Smaller grey metal panels form broad interlocking fields beside the glazed atrium and raised glass volume. Panel size, pattern, tint and fine façade dimensions are reconstructed from built photographs and February 2022 Street View. Existing planning roof RLs and source building footprints remain separate and unchanged.'};
