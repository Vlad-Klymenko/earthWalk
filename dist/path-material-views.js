import {CAMPUS} from './campus-data.js?v=0ec802769c04';
// Outdoor viewpoints on retained source routes; no traffic or current-access claims.
const along=(id,index,reverse=false)=>{const p=CAMPUS.paths.find(p=>p.id===id),a=p.points[index],b=p.points[index+1],t=.45,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;return {x,z,heading:Math.atan2((b.x-a.x)*(reverse?-1:1),-(b.z-a.z)*(reverse?-1:1))};};
export const PATH_MATERIAL_VIEWS=[
 {id:'engineering-road-pavers',name:'Engineering Road · interlocking paving',...along('osm-way-9784408',7),pitch:-.1,description:'Mapped paving-stone lane, with grey / mauve interlocking units guided by July 2015 Street View. Detailed unit shapes and colours are reconstructed; map route geometry remains separate from this material treatment'},
 {id:'science-road-paving',name:'Science Road · Physics Lawn',...along('osm-way-9784674',0),pitch:-.1,description:'July 2015 Street View shows interlocking blocks beside Physics Lawn. This photo-fitted material conflicts with the retained map pebblestone tag; present-day resurfacing has not been verified. Source route geometry and height offsets remain separate'},
 {id:'k14-concrete-lane',name:'K14 Lane · concrete surface',...along('osm-way-45560308',1),pitch:-.08,description:'Public map surface tag: concrete. Cast-concrete texture and joint scale are reconstructed; source centreline, width and the existing terrain-following walking grade are retained'},
 {id:'high-street-asphalt-path',name:'High Street · asphalt shared path',...along('osm-way-556947482',0),pitch:-.07,description:'Public map surface tag: asphalt. This is still a mapped pedestrian / shared-path section; surface appearance does not reclassify it as a road or establish current traffic rules'}
].map(p=>({...p,kind:'courtyard',showSign:false}));
