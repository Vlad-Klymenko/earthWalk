import {CAMPUS as RAW} from './campus-data.js?v=dfa1c50ac01f';
import {agsmGeometry} from './eastern-landmarks-data.js?v=dfa1c50ac01f';
import {terrainHeight} from './terrain.js?v=dfa1c50ac01f';
import {framePoint,frameRectangle} from './geometry.js?v=dfa1c50ac01f';
export const AGSM_ID='osm-way-101505149';
export const AGSM_BUILDING=RAW.buildings.find(b=>b.id===AGSM_ID);
export const AGSM_COURT=agsmGeometry(AGSM_BUILDING);
export const agsmCourtPoint=(u,v)=>framePoint(AGSM_COURT.frame,u,v);
export const AGSM_COURT_SCOPE=AGSM_BUILDING.points.slice(20,37);
export const AGSM_COURT_NOTE='Photo-fitted café courtyard from UNSW’s public Short Stays gallery and Learning Environments exterior. Paving extent, 0.15 m risers, furniture positions, trellis sections, leaf cover and shade dimensions are reconstructions. Raw building outline, 20 m mapped maximum, five-level tag, paths, public DEM samples and inventory trees remain separate and unchanged; local court grading is reconstructed';
// Public 5 m DEM samples anchor a gently graded court; the photograph shows
// a paved plane rather than the coarse DEM's rise against the curved wall.
const sample=(u,v)=>{const p=agsmCourtPoint(u,v);return terrainHeight(p.x,p.z);};
export const AGSM_COURT_GRADE={u:4,v:16,y:sample(4,16),du:(sample(8,16)-sample(0,16))/8,dv:(sample(4,22)-sample(4,6))/16,reconstructed:true};
export function agsmCourtGrade(x,z){const f=AGSM_COURT.frame,u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z,g=AGSM_COURT_GRADE;return g.y+(u-g.u)*g.du+(v-g.v)*g.dv;}
export const AGSM_PERGOLA={back:3.78,front:4.05,reconstructed:true};
export const AGSM_STEPS={topWidth:.75,tread:.4,rise:.15,count:3,pavingOffset:.22,reconstructed:true};
const f=AGSM_COURT.frame;
export const AGSM_TABLES=[[-1,8,true],[5,9,false],[2,17,true]].map(([u,v,shade],i)=>{const centre=agsmCourtPoint(u,v);return {id:'agsm-cafe-table-'+i,u,v,...centre,shade,radius:.58,shadeRadius:1.8,shadeEave:2.35,shadePeak:2.78,points:frameRectangle(f,.85,.85,u,v),chairs:[0,1,2,3].map(j=>{const theta=j*Math.PI/2,p=agsmCourtPoint(u+Math.cos(theta)*1.05,v+Math.sin(theta)*1.05);return {...p,theta,radius:.32};}),reconstructed:true};});
export const AGSM_TRELLISES=[2,6].map((index,i)=>{const a=AGSM_COURT.pergola[index],c=AGSM_COURT.pergola[index+1],length=Math.hypot(c.x-a.x,c.z-a.z),t={x:(c.x-a.x)/length,z:(c.z-a.z)/length},n={x:t.z,z:-t.x},centre={x:(a.x+c.x)/2+n.x*2.15,z:(a.z+c.z)/2+n.z*2.15},width=1.55,height=2.65;
 const at=(along,off)=>({x:centre.x+t.x*along+n.x*off,z:centre.z+t.z*along+n.z*off});
 return {id:'agsm-vine-screen-'+i,...centre,t,n,width,height,points:[at(-width/2,-.13),at(width/2,-.13),at(width/2,.13),at(-width/2,.13)],planter:[at(-width/2-.12,-.25),at(width/2+.12,-.25),at(width/2+.12,.25),at(-width/2-.12,.25)],bench:[at(-width/2-.22,.32),at(width/2+.22,.32),at(width/2+.22,.78),at(-width/2-.22,.78)],seed:1950+i,reconstructed:true};});
export function agsmVineForm(screen){
 let seed=screen.seed;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;},branches=[],leaves=[];
 for(let stem=0;stem<5;stem++){let last=[(stem-2)*.24,.28,0];for(let i=1;i<=8;i++){const p=[(stem-2)*.24+Math.sin(stem+i*.9)*.15,.28+i*.30,(random()-.5)*.1];branches.push({a:last,b:p});last=p;}}
 for(let i=0;i<360;i++){const along=(random()-.5)*screen.width,y=.4+random()*2.2;if(Math.sin(along*4+y*2.2)+random()<-.2)continue;leaves.push({along,y,off:(random()-.5)*.25,rx:random()*Math.PI,ry:random()*Math.PI,rz:random()*Math.PI,size:.13+random()*.09});}
 return {branches,leaves};
}
const view=(id,name,u,v,tu,tv,pitch)=>{const p=agsmCourtPoint(u,v),t=agsmCourtPoint(tu,tv);return {id,name,code:'G27',kind:'courtyard',...p,heading:Math.atan2(t.x-p.x,p.z-t.z),pitch,showSign:false,description:AGSM_COURT_NOTE};};
export const AGSM_COURT_VIEWS=[view('agsm-cafe-courtyard','AGSM · café courtyard',7,22,-3,10,.12),view('agsm-curved-steps','AGSM · curved courtyard steps',-3.5,16,-8.2,16,.15)];
