import {CAMPUS} from './campus-data.js?v=e438308695cd';
import {buildingBase} from './terrain.js?v=e438308695cd';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=e438308695cd';
export const REPOSITORY_ID='osm-way-1178531023',REPOSITORY_ANNEX_ID='osm-way-1178531024',REPOSITORY_EAST_ID='osm-way-1178531025';
export const REPOSITORY_IDS=[REPOSITORY_ID,REPOSITORY_ANNEX_ID,REPOSITORY_EAST_ID];
export const REPOSITORY_GIS={url:'https://gis.unsw.edu.au/server/rest/services/Kensington_Campus/MapServer/18',code:'B21',name:'Repository',floorCount:2,heightField:0,note:'GIS compound identity / floor count; zero height is unavailable. Source parts and GIS perimeter differ; adjoining annex use is unverified.'};
export const REPOSITORY_AERIAL='https://www.google.com/maps/@-33.91623,151.23354,90m/data=!3m1!1e3';
export const REPOSITORY_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=KMh-2etKeJWf249tSftABw&heading=10&pitch=5';
const raw=id=>CAMPUS.buildings.find(b=>b.id===id),main=raw(REPOSITORY_ID),frame=orientedFrame(main.points,{x:-.17,z:1});
export const repositoryAt=(u,v)=>framePoint(frame,u,v);
export function repositoryGeometry(b=main){
 const f=orientedFrame(b.points,{x:-.17,z:1}),at=(u,v)=>framePoint(f,u,v),local=p=>({u:(p.x-f.x)*f.u.x+(p.z-f.z)*f.u.z,v:(p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z}),base=buildingBase(b.points),isMain=b.id===REPOSITORY_ID,isAnnex=b.id===REPOSITORY_ANNEX_ID;
 // Roof components / floor heights are photo-fitted estimates. The GIS two
 // floors have unspecified counting conventions and do not set visible rows.
 const eave=isMain?6.4:isAnnex?3.4:3.5,maximum=isMain?7.15:isAnnex?4.1:3.8;
 const roofHeight=p=>isAnnex?3.4+.7*Math.max(0,Math.min(1,(f.length/2-local(p).v)/f.length)):eave;
 const vents=isMain?[-8,0,8].flatMap(u=>[-1.55,1.55].map(v=>({...at(u,v),u,v,points:frameRectangle(f,.95,.95,u,v),height:maximum,reconstructed:true}))):[];
 const arrival=isMain?repositoryAt(0,-23):isAnnex?repositoryAt(-9,17):repositoryAt(20,21),target=isMain?repositoryAt(0,0):{x:f.x,z:f.z};
 return {frame:f,at,local,base,eave,maximum,roofHeight,vents,isMain,isAnnex,arrival,target,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),reconstructed:true};
}
export const REPOSITORY_YARD=frameRectangle(frame,39,31,3,8);
export function inRepositoryYard(x,z){const u=(x-frame.x)*frame.u.x+(z-frame.z)*frame.u.z,v=(x-frame.x)*frame.v.x+(z-frame.z)*frame.v.z;return u>-17&&u<23&&v>-8&&v<24;}

// Aerial-led mature canopy positions, not individual tree surveys. Trunks
// clear source paths / occupied rooms and existing mapped trees.
export function repositoryTrees(){
 const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
 const distance=(p,a,c)=>{const dx=c.x-a.x,dz=c.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);};
 return [[-18,-13,13],[-5,-15,14],[10,-13,12],[-22,8,12],[24,10,13]].map(([u,v,height])=>({...repositoryAt(u,v),u,v,height,radius:.46,reconstructed:true})).filter(p=>CAMPUS.paths.every(path=>path.points.slice(1).every((c,i)=>distance(p,path.points[i],c)>path.width/2+.9))&&CAMPUS.buildings.every(b=>!inside(p,b.points)&&b.points.every((a,i)=>distance(p,a,b.points[(i+1)%b.points.length])>1))&&CAMPUS.trees.every(t=>Math.hypot(p.x-t.x,p.z-t.z)>6));
}
