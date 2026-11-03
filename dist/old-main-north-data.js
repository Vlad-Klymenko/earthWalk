import {CAMPUS} from './campus-data.js?v=dfa1c50ac01f';
import {orientedFrame,framePoint,frameRectangle} from './geometry.js?v=dfa1c50ac01f';
import {TREE_INVENTORY} from './tree-inventory-data.js?v=dfa1c50ac01f';
import {terrainHeight} from './terrain.js?v=dfa1c50ac01f';
export const OLD_NORTH_FRAME=orientedFrame(CAMPUS.buildings.find(b=>b.id==='osm-way-45490050').points,{x:-.16,z:1});
export const oldNorthPoint=(u,v)=>framePoint(OLD_NORTH_FRAME,u,v);
export const oldNorthRectangle=(u0,u1,v0,v1)=>frameRectangle(OLD_NORTH_FRAME,u1-u0,v1-v0,(u0+u1)/2,(v0+v1)/2);
export const oldNorthLocal=p=>({u:(p.x-OLD_NORTH_FRAME.x)*OLD_NORTH_FRAME.u.x+(p.z-OLD_NORTH_FRAME.z)*OLD_NORTH_FRAME.u.z,v:(p.x-OLD_NORTH_FRAME.x)*OLD_NORTH_FRAME.v.x+(p.z-OLD_NORTH_FRAME.z)*OLD_NORTH_FRAME.v.z});
export const oldNorthPavingHeight=(x,z)=>terrainHeight(x,z)+.22;
export const OLD_NORTH_SCOPE={u0:-52.7,u1:-28.1,v0:-34.1,v1:11.8};
export const OLD_NORTH_ANNEX_SCOPE={u0:-52.7,u1:-43.8,v0:-29.3,v1:10.8};
export const OLD_NORTH_ANNEX={floorRL:29.7,roofRL:33.2,fasciaBottomRL:32.5,reconstructed:true,note:'Curved plan follows the public secondary building footprint. Floor / roof levels, glazing divisions, materials and doors are photo-fitted estimates, not measured GIS heights.'};
const bridgePoints=oldNorthRectangle(-51.8,-28.95,-32.05,-28.3),floorRL=Math.ceil((Math.max(...bridgePoints.map(p=>terrainHeight(p.x,p.z)))+3.6)*10)/10;
export const OLD_NORTH_BRIDGE={points:bridgePoints,holes:[],floorRL,bottomRL:floorRL-.2,roofRL:floorRL+2.65,reconstructed:true,note:'Enclosed corrugated link at the western court mouth, fitted to the labelled northern photograph and aerial context. Clear ground passage retained. Detailed plan, levels, cladding and underside structure are estimated; no bridge interior is provided.'};
const tree=TREE_INVENTORY.find(t=>t.id==='unsw-tree-100911');
export const OLD_NORTH_PLANTER={treeId:tree.id,x:tree.x,z:tree.z,width:3.2,length:3.2,height:.5,points:frameRectangle(OLD_NORTH_FRAME,3.2,3.2,oldNorthLocal(tree).u,oldNorthLocal(tree).v),holes:[frameRectangle(OLD_NORTH_FRAME,2.2,2.2,oldNorthLocal(tree).u,oldNorthLocal(tree).v)],reconstructed:true,note:'Photo-fitted timber planter / bench around the retained public inventory Pyrus calleryana point. Exact box dimensions and tree condition are not surveyed. The tree is not moved.'};
export const OLD_NORTH_POST_CANDIDATES=[-50,-46.5,-43,-39.5,-36,-32.5].map((u,i)=>({id:'old-north-post-'+i,...oldNorthPoint(u,-30.7),radius:.075,height:.95,reconstructed:true}));
const head=(p,q)=>Math.atan2(q.x-p.x,p.z-q.z),under=oldNorthPoint(-38,-30),front=oldNorthPoint(-37,-18),target=oldNorthPoint(-46,-19);
export const OLD_NORTH_VIEWS=[
 {id:'old-main-north-link',name:'Old Main · northern covered link',...under,heading:head(under,oldNorthPoint(-38,5)),pitch:.15},
 {id:'old-main-green-frontage',name:'Old Main · curved green frontage',...front,heading:head(front,target),pitch:.08}
].map(p=>({...p,kind:'courtyard',showSign:false,description:'Public GIS supplies courtyard and curved annex plan edges. Enclosed northern bridge, green glazing, blue posts and timber tree planter follow the labelled northern photograph. Exact fixture dimensions / positions and all added levels are reconstructed. The separate red / blue service gallery remains unlocated; interiors and current access are not represented'}));
