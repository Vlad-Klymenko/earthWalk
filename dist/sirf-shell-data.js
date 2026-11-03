import {CAMPUS as RAW} from './campus-data.js?v=5c6b85277d47';
import {sirfGeometry} from './eastern-landmarks-data.js?v=5c6b85277d47';
export const SIRF_ID='osm-way-45604880';
export const SIRF_BUILDING=RAW.buildings.find(b=>b.id===SIRF_ID);
export const SIRF=sirfGeometry(SIRF_BUILDING);
// Source roof perimeter / maximum remain. Two photo-fitted openings on the
// long face and one wrapping corner side replace uniform repeated triangles.
export function sirfPoint(face,t,y,offset=0){
 const b=SIRF_BUILDING,normal=i=>{const a=b.points[(i+4)%4],c=b.points[(i+1+4)%4],l=Math.hypot(c.x-a.x,c.z-a.z);return {x:(c.z-a.z)/l,z:-(c.x-a.x)/l};},at=(p,n,m)=>{const d=offset/Math.max(.2,1+n.x*m.x+n.z*m.z);return {x:p.x+(n.x+m.x)*d,z:p.z+(n.z+m.z)*d};};
 const a=at(face.a,normal(face.index-1),normal(face.index)),c=at(face.c,normal(face.index),normal(face.index+1));return {x:a.x+(c.x-a.x)*t,y,z:a.z+(c.z-a.z)*t};
}
export function sirfPortal(face,q){
 const l=q.start+(q.start===0?0:.8/face.len),r=q.end-(q.end===1?0:.8/face.len),outer=[[q.start,q.bottom],[q.peak,q.outerPeak],[q.end,q.bottom]],inner=[[l,q.bottom],[q.peak,q.glassPeak],[r,q.bottom]],outerWorld=outer.map(([t,y])=>sirfPoint(face,t,y)),innerWorld=inner.map(([t,y])=>sirfPoint(face,t,y,-q.recess)),hood=[];
 for(let i=0;i<2;i++){if(q.corner&&((q.peak===q.end&&i===1)||(q.peak===q.start&&i===0)))continue;hood.push([outerWorld[i],outerWorld[i+1],innerWorld[i+1],innerWorld[i]]);}
 return {faceIndex:face.index,l,r,...q,outer,inner,outerWorld,innerWorld,hood,reconstructed:true};
}
export const SIRF_PORTALS=SIRF.facades.flatMap(f=>f.portals.map(q=>sirfPortal(f,q)));
const p=SIRF_BUILDING.points[0],arrival={x:p.x+12,z:p.z-13},target={x:p.x-3,z:p.z+3};
export const SIRF_CORNER_VIEW={id:'sirf-recessed-corner',name:'SIRF · folded corner and triangular glazing',code:'G23',kind:'academic',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:.22,showSign:false,description:'Asymmetric triangulated metal shell, perforated reveal and recessed corner glazing reconstructed from full university exterior photographs and July 2015 Street View. Raw roof outline / 8 m map height / two-level tag retained; opening positions, recesses and panel sections are estimates'};

// Both corner triangles have their apex at an end; avoid the symmetric-bay
// formula, which incorrectly pinches the glazing grid around a centre point.
export function sirfGlassTop(q,t){
 if(t<q.l||t>q.r)return q.bottom;
 if(t<=q.peak&&q.peak>q.l)return q.bottom+(q.glassPeak-q.bottom)*(t-q.l)/(q.peak-q.l);
 return q.bottom+(q.glassPeak-q.bottom)*(q.r-t)/(q.r-q.peak);
}
export function sirfGlassSpan(q,y){
 const k=(y-q.bottom)/(q.glassPeak-q.bottom);
 return [q.l+(q.peak-q.l)*k,q.r+(q.peak-q.r)*k];
}
