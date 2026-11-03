import {CAMPUS as RAW} from './campus-data.js?v=2345090190a8';
import {MORVEN_ID,morvenGeometry} from './morven-brown-data.js?v=2345090190a8';
import {framePoint,frameRectangle} from './geometry.js?v=2345090190a8';
import {terrainHeight} from './terrain.js?v=2345090190a8';
const b=RAW.buildings.find(b=>b.id===MORVEN_ID);
export const MORVEN_GARDEN_FRAME=morvenGeometry(b).frame;
export const morvenGardenPoint=(u,v)=>framePoint(MORVEN_GARDEN_FRAME,u,v);
export const MORVEN_GARDEN_NOTE='Photo-fitted courtyard planting, timber-and-metal benches and brick-pattern paving. Layout/counts, plant heights, species, seasonal flowers and fine ground levels are estimates from public photos and July 2015 Street View. Mapped lawn, routes, mature tree inventory and building dimensions remain separate and unchanged.';
export const MORVEN_BEDS=[[-18.35,-17.45,-15.9,15.7],[17.25,17.95,-15.9,15.7],[-6.3,17.95,-16.1,-15.35]].map(([u0,u1,v0,v1])=>({points:frameRectangle(MORVEN_GARDEN_FRAME,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2),reconstructed:true}));
export const morvenBenchPoint=(bench,along,across)=>morvenGardenPoint(bench.u+along*Math.cos(bench.yaw)+across*Math.sin(bench.yaw),bench.v-along*Math.sin(bench.yaw)+across*Math.cos(bench.yaw));
const benchSites=[...[-10,-3,4,11].flatMap(v=>[{u:-15.8,v:v-1.1,yaw:Math.PI},{u:-15.8,v:v+1.1,yaw:0}]),...[-11.5,-7.6,-3.7,.2].map(v=>({u:15.8,v,yaw:Math.PI/2})),...[0,7.5].map(u=>({u,v:-14.25,yaw:Math.PI}))];
export const MORVEN_BENCHES=benchSites.map((s,i)=>{
 const bench={...s,...morvenGardenPoint(s.u,s.v),id:'morven-garden-bench-'+i,width:2.5,depth:.6,reconstructed:true};
 bench.points=[[-1.35,-.4],[1.35,-.4],[1.35,.4],[-1.35,.4]].map(([u,v])=>morvenBenchPoint(bench,u,v));
 bench.pad=[[-1.47,-.65],[1.47,-.65],[1.47,.65],[-1.47,.65]].map(([u,v])=>morvenBenchPoint(bench,u,v));
 bench.baseRL=Math.max(...bench.points.map(p=>terrainHeight(p.x,p.z)))+.22;
 return bench;
});
export const MORVEN_BANDS=[...[-6.8,1.5,10.4].map(u=>({points:frameRectangle(MORVEN_GARDEN_FRAME,.24,33,u,0)})),...[-12.8,-5.1,2.8,10.7].map(v=>({points:frameRectangle(MORVEN_GARDEN_FRAME,38,.24,0,v)}))];
const sites=[...Array.from({length:12},(_,i)=>({u:-17.88,v:-14.9+i*2.65,side:'west'})),...Array.from({length:12},(_,i)=>({u:17.58,v:-14.9+i*2.65,side:'east'})),...Array.from({length:8},(_,i)=>({u:-4.8+i*2.75,v:-15.73,side:'north'}))];
export const MORVEN_SHRUBS=sites.map((s,i)=>({...s,...morvenGardenPoint(s.u,s.v),id:'morven-underplanting-'+i,height:1.7+.85*(.5+.5*Math.sin(i*2.33)),radius:.85+.1*Math.cos(i),flowering:s.side==='west'&&i%3!==0,reconstructed:true,inventoryTree:false,seed:1965+i}));
export function morvenShrubForm(plant){
 let seed=plant.seed;const random=()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296;},branches=[],leaves=[],flowers=[];
 for(let i=0;i<5;i++){
  const a=i/5*Math.PI*2+.2,end=[Math.cos(a)*plant.radius*.62,plant.height*(.66+random()*.22),Math.sin(a)*plant.radius*.62],fork=[Math.cos(a)*.08,plant.height*.30,Math.sin(a)*.08];
  branches.push({a:[0,0,0],b:fork,radius:.016},{a:fork,b:end,radius:.011});
  for(let j=0;j<13;j++){
   const r=plant.radius*Math.sqrt(random()),theta=random()*Math.PI*2,p={x:Math.cos(theta)*r*(plant.side==='north'?1:.58),y:plant.height*(.30+random()*.65),z:Math.sin(theta)*r*(plant.side==='north'?.58:1),rx:random()*Math.PI,ry:random()*Math.PI,rz:random()*Math.PI,size:.49+random()*.2};
   leaves.push(p);if(plant.flowering&&j%6===0)flowers.push({...p,x:p.x*1.04,z:p.z*1.04,size:.10+random()*.035});
  }
 }
 return {branches,leaves,flowers};
}
const arrival=morvenGardenPoint(-11.6,7.5),target=morvenGardenPoint(-17,7.5);
export const MORVEN_GARDEN_VIEW={id:'morven-garden-seating',name:'Morven Brown · garden benches',code:'C20',kind:'garden',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:-.08,showSign:false,description:'Paired dark timber benches, pale metal frames, wall-side flowering shrubs and brick-pattern paving. '+MORVEN_GARDEN_NOTE};
