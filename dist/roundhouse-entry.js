import { ROUNDHOUSE_CENTER,roundhouseGeometry } from './roundhouse-data.js?v=0ec802769c04';
export const ROUNDHOUSE_ENTRY_PHOTO={url:'https://www.arc.unsw.edu.au/roundhouse/about/roundhouse-blog/roundhouse-exterior-renovations',photo:'https://www.arc.unsw.edu.au/generated/hero-large/renovations-main-doors-with-canopy-jpg.jpg'};
export function inRoundhouseEntrance(x,z){const a=Math.atan2(z-ROUNDHOUSE_CENTER.z,x-ROUNDHOUSE_CENTER.x)*180/Math.PI,r=Math.hypot(x-ROUNDHOUSE_CENTER.x,z-ROUNDHOUSE_CENTER.z);return a>128&&a<177&&r>28&&r<45;}
// TZG's unscaled roof plan places this swept canopy on the southwestern arc.
// All component dimensions and positions below remain photo-led reconstructions.
export function roundhouseEntryGeometry(b){
 const g=roundhouseGeometry(b),start=136*Math.PI/180,end=167*Math.PI/180;
 const outer=Array.from({length:25},(_,i)=>g.at(start+(end-start)*i/24,39)),inner=Array.from({length:25},(_,i)=>{const a=end-(end-start)*i/24;return g.at(a,g.radiusAt(a)*.947);});
 const heightAt=p=>{const a=Math.atan2(p.z-g.center.z,p.x-g.center.x),r=Math.hypot(p.x-g.center.x,p.z-g.center.z),t=Math.max(0,Math.min(1,(a-start)/(end-start)));return g.base+3.08+.25*Math.max(0,Math.min(1,(r-29.5)/9.5))+.12*Math.sin(t*Math.PI);};
 const columns=[140,160.5].map(degrees=>{const angle=degrees*Math.PI/180,p=g.at(angle,34.7);return {...p,angle,radius:.58,top:heightAt(p)-.24,reconstructed:true};});
 const a=153*Math.PI/180,arrival=g.at(135*Math.PI/180,49),target=g.at(a,30),screenAngle=131*Math.PI/180,screen=g.at(screenAngle,g.radiusAt(screenAngle)*.947+.14);
 return {points:[...outer,...inner],heightAt,thickness:.24,columns,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),screen:{...screen,angle:screenAngle,width:2.7,height:1.5,bottom:g.base+1.3},paving:[g.center,...Array.from({length:33},(_,i)=>g.at((128+i*1.5)*Math.PI/180,44))],base:g.base,reconstructed:true};
}
