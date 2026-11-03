import {CAMPUS as RAW} from './campus-data.js?v=ef86122637ee';
import {MORVEN_ID,morvenGeometry} from './morven-brown-data.js?v=ef86122637ee';
import {framePoint} from './geometry.js?v=ef86122637ee';
import {terrainHeight} from './terrain.js?v=ef86122637ee';
export const BOURKE_SOURCE='https://www.unsw.edu.au/estate/about-us/public-art';
export const BOURKE_PORTRAIT={artist:'Tom Bass',date:1967,commissioned:1966,width:.24,height:.30,depth:.04,medium:'bronze',source:BOURKE_SOURCE,note:'University dimensions refer to the small bronze portrait only, not the standing stone or whole fountain. Relief likeness is a procedural interpretation.'};
const building=RAW.buildings.find(b=>b.id===MORVEN_ID),g=morvenGeometry(building);
export const BOURKE_FRAME=g.frame;
export const bourkePoint=(u,v)=>framePoint(g.frame,g.pool.u+u,g.pool.v+v);
// Local u goes toward the eastern wall; v runs along the longer pool axis.
// The retained courtyard location and photo-fitted 4 × 5.3 m envelope are
// estimates. No measured fountain plan / surveyed stone heights are available.
const outline=[[-1.1,-2.1],[-1.65,-1.4],[-1.92,-.4],[-1.88,.9],[-1.52,1.9],[-.8,2.48],[.2,2.65],[1.28,2.35],[1.7,1.55],[1.7,.5],[1.3,-.6],[.95,-1.65],[.15,-2.5],[-.55,-2.65]];
const points=outline.map(([u,v])=>bourkePoint(u,v)),rim=outline.map(([u,v])=>bourkePoint(u*1.13,v*1.09));
const rimRL=Math.max(...rim.map(p=>terrainHeight(p.x,p.z)))+.13;
export const BOURKE_POOL={points,rim,outline,rimRL,waterRL:rimRL-.055,bottomRL:rimRL-.10,reconstructed:true};
export const BOURKE_STONES=[
 {id:'portrait-standing-stone',u:1.02,v:.85,width:.95,depth:.72,height:1.72,lean:-.14,seed:67},
 {id:'north-round-stone',u:.5,v:-2.25,width:.84,depth:.8,height:.59,lean:.06,seed:68},
 {id:'north-low-ledge',u:.9,v:-1.05,width:.55,depth:1.4,height:.30,lean:0,seed:69},
 {id:'sloping-stone',u:.68,v:-.05,width:.96,depth:.82,height:.70,lean:.28,seed:70},
 {id:'south-round-stone',u:.85,v:2.02,width:1.02,depth:1.06,height:.64,lean:-.1,seed:71},
 {id:'south-foot-stone',u:1.24,v:2.57,width:.55,depth:.56,height:.27,lean:.1,seed:72}
].map(s=>({...s,...bourkePoint(s.u,s.v),baseRL:rimRL-.035,reconstructed:true}));
export const BOURKE_DISH={u:.24,v:.9,width:1.17,length:.74,backRL:rimRL+.36,lipRL:rimRL+.29,frontU:-.37,reconstructed:true};
export const BOURKE_PLAQUE={...BOURKE_PORTRAIT,u:.39,v:.86,bottomRL:rimRL+.95,normalU:-1};
const arrival=bourkePoint(-4.4,.7),target=bourkePoint(.6,.7);
export const BOURKE_VIEW={id:'morven-bourke-fountain',name:'Joseph Bourke memorial fountain',code:'C20',kind:'artwork',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:-.24,showSign:false,description:'Morven Brown courtyard · Rough standing stones, bronze portrait and shallow spill dish beside an irregular pool. Tom Bass, 1967; university lists the portrait alone as 30 × 24 × 4 cm. Fountain plan, stone sizes, orientation and water levels are photo-fitted estimates; relief is simplified. No current water operation is asserted.'};
