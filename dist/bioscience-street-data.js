import {CAMPUS as RAW} from './campus-data.js?v=159c90d42d57';
import {bioscienceGeometry} from './bioscience-data.js?v=159c90d42d57';
import {framePoint} from './geometry.js?v=159c90d42d57';
import {terrainHeight} from './terrain.js?v=159c90d42d57';
import {TREE_INVENTORY} from './tree-inventory-data.js?v=159c90d42d57';
export const BIO_STREET_FRAME=bioscienceGeometry(RAW.buildings.find(b=>b.id==='biological-south')).frame;
export const bioStreetPoint=(u,v)=>framePoint(BIO_STREET_FRAME,u,v);
export const bioStreetLocal=p=>({u:(p.x-BIO_STREET_FRAME.x)*BIO_STREET_FRAME.u.x+(p.z-BIO_STREET_FRAME.z)*BIO_STREET_FRAME.u.z,v:(p.x-BIO_STREET_FRAME.x)*BIO_STREET_FRAME.v.x+(p.z-BIO_STREET_FRAME.z)*BIO_STREET_FRAME.v.z});
export const BIO_STREET_ROUTE=RAW.paths.find(p=>p.id==='osm-way-1100783035');
const route=BIO_STREET_ROUTE.points.map(bioStreetLocal);
export function bioStreetPathU(v){const a=route[0],b=route[1];return a.u+(b.u-a.u)*(v-a.v)/(b.v-a.v);}
export const BIO_STREET_GARDEN={v0:-44,v1:18.8,u0:27,reconstructed:true,wallWidth:.24,wallHeight:.62,pathGap:.20,source:'https://www.google.com/maps/@?api=1&map_action=pano&pano=qoZ46Cc4gByr1ND5ajcxkg&heading=270&pitch=-8&fov=75',note:'Photo-fitted raised planted frontage, clipped behind the retained cycleway and outside all mapped buildings. Soil / wall heights, widths and planting forms are estimated from February 2022 Street View and built photographs, not surveyed landscape levels.'};
export const bioStreetWallU=v=>bioStreetPathU(v)-BIO_STREET_ROUTE.width/2-BIO_STREET_GARDEN.pathGap-BIO_STREET_GARDEN.wallWidth/2;
export function bioStreetWallBase(v){const p=bioStreetPoint(bioStreetWallU(v),v);return terrainHeight(p.x,p.z)+.22;}
export const bioStreetWallTop=v=>bioStreetWallBase(v)+BIO_STREET_GARDEN.wallHeight;
export const BIO_STREET_SCOPE=[bioStreetPoint(27,-44),bioStreetPoint(bioStreetWallU(-44)-.12,-44),bioStreetPoint(bioStreetWallU(18.8)-.12,18.8),bioStreetPoint(27,18.8)];
export function bioStreetSoilRL(x,z){
 const p=bioStreetLocal({x,z}),front=bioStreetPoint(bioStreetWallU(p.v)-.12,p.v),d=Math.max(0,bioStreetWallU(p.v)-.12-p.u),t=Math.max(0,1-d/4),blend=t*t*(3-2*t),lift=Math.max(0,bioStreetWallTop(p.v)-.08-terrainHeight(front.x,front.z)-.06);
 return terrainHeight(x,z)+.06+lift*blend;
}
export const BIO_STREET_TREES=TREE_INVENTORY.filter(t=>{const p=bioStreetLocal(t);return p.u>27&&p.u<bioStreetWallU(p.v)-.12&&p.v>-44&&p.v<18.8;});
export const BIO_STREET_TREE_IDS=new Set(BIO_STREET_TREES.map(t=>t.id));
const arrival=bioStreetPoint(bioStreetPathU(-30),-30),target=bioStreetPoint(34,-30);
export const BIO_STREET_VIEW={id:'bioscience-street-garden',name:'Biosciences · Botany Street garden',code:'D26 / E26',kind:'garden',...arrival,heading:Math.atan2(target.x-arrival.x,arrival.z-target.z),pitch:-.10,showSign:false,description:'Raised planted bank, grey-brown brick retaining wall and pale coping behind the mapped cycleway. Public tree inventory supplies the retained tree points; ornamental planting, wall height and detailed soil levels are photo-fitted. The original 2.5 m cycleway remains clear. February 2022 appearance evidence; current planting condition unverified.'};
