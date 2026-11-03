import {oldNorthPoint,oldNorthLocal,oldNorthRectangle} from './old-main-north-data.js?v=5c7d3bba5015';
import {terrainHeight} from './terrain.js?v=5c7d3bba5015';
export {oldNorthPoint as chancellorPoint,oldNorthLocal as chancellorLocal};
export const CHANCELLOR_SCOPE={u0:32.15,u1:59.5,v0:-34.2,v1:13.1};
export const CHANCELLOR_SCOPE_RING=oldNorthRectangle(32.15,59.5,-34.2,13.1);
export const CHANCELLOR_ART={title:'Fountain figure',artist:'Tom Bass',year:1959,height:.72,width:1.86,depth:.87,medium:'Electrolytic Copper',url:'https://www.unsw.edu.au/estate/about-us/public-art',reconstructed:true,note:'Catalogue dimensions constrain the sculpture envelope. Pose, orientation and plan position are simplified from photographs; pool dimensions / levels are not catalogue measurements.'};
export const CHANCELLOR_TREES=[100890,100891,100892,100893,100894,100895].map(id=>'unsw-tree-'+id);
export const CHANCELLOR_FLOWERING_TREES=[100891,100892,100894].map(id=>'unsw-tree-'+id);
// Seasonal colour is illustrative, not a live flowering inventory. Keep each
// smaller blossom card inside its retained tree's representative envelope.
export const chancellorBlossoms=(tree,geometry)=>CHANCELLOR_FLOWERING_TREES.includes(tree.id)?geometry.leaves.flatMap(p=>[0,1,2].map(k=>({...p,y:p.y+.03,size:p.size*.85,rx:p.rx+k*Math.PI/3,ry:p.ry+k*Math.PI/3}))):[];
export const chancellorPavingHeight=(x,z)=>terrainHeight(x,z)+.22;
export const CHANCELLOR_VIEWS=[
 {id:'chancellors-garden',name:'Chancellor’s Garden',...oldNorthPoint(45,-33.1),heading:Math.atan2(oldNorthPoint(45,0).x-oldNorthPoint(45,-33.1).x,oldNorthPoint(45,-33.1).z-oldNorthPoint(45,0).z),pitch:.09},
 {id:'fountain-figure',name:'Fountain figure · Chancellor’s Garden',...oldNorthPoint(39.6,-13.5),heading:Math.atan2(oldNorthPoint(44,-11.8).x-oldNorthPoint(39.6,-13.5).x,oldNorthPoint(39.6,-13.5).z-oldNorthPoint(44,-11.8).z),pitch:-.2}
].map(p=>({...p,kind:'garden',showSign:false,description:'Old Main’s eastern lawn court. Public GIS supplies lawn / garden plan edges, and the tree inventory supplies retained species, points and size bands. Tom Bass’s Fountain figure uses the university catalogue dimensions with a simplified photo-fitted pose. Pool placement / levels, materials, shrub sizes and flowering appearance are estimates; interiors and current access are not represented'}));
