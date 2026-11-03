// A surface tag describes material, not road access or a surveyed ground level.
export const ENGINEERING_PAVERS_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=kxmjWQj6VdFPCiEIGY81mQ&heading=270&pitch=-12';
export const SCIENCE_PAVERS_STREET='https://www.google.com/maps/@?api=1&map_action=pano&pano=a3kxg9d7a2YvrXr9my_HnA&heading=90&pitch=-15';
export const PATH_MATERIALS={
  asphalt:{texture:'path-asphalt',color:'#727773',bump:.006},
  concrete:{texture:'path-concrete',color:'#b6b6ab',bump:.008},
  concretePlates:{texture:'path-plates',color:'#b6b6ab',bump:.01},
  paving:{texture:'paving',color:'#b9b6b0',bump:.035},
  roadPavers:{texture:'path-pavers',color:'#aaa397',bump:.012},
  interlockingPavers:{texture:'path-interlocking',color:'#aa9691',bump:.012},
  pebble:{texture:'path-pebble',color:'#aba38e',bump:.018},
  wood:{texture:'path-timber',color:'#977b59',bump:.014}
};
export function pathGeometry(path){
 const road=path.renderSurface==='asphalt'||path.renderSurface!=='paving'&&/road|service|residential|street/i.test(path.kind||path.type||'');
 return {road,width:path.renderWidth||path.width||(/mall/i.test(path.name||'')?12:road?7:3.4),height:road?.055:.22};
}
export function pathMaterial(path){
 const geometry=pathGeometry(path),override={asphalt:'asphalt',paving:'paving',concrete:'concrete',wood:'wood'}[path.renderSurface];
 if(override)return {material:override,basis:'reconstruction-override',sourceSurface:path.surface??null,...geometry};
 let material=({asphalt:'asphalt',concrete:'concrete','concrete:plates':'concretePlates',paving_stones:geometry.road?'roadPavers':'paving',pebblestone:'pebble',wood:'wood'})[path.surface];
 const basis=material?'surface-tag':'estimated-default';material??=geometry.road?'asphalt':'paving';
 if(path.id==='osm-way-9784408'&&material==='roadPavers')return {material:'interlockingPavers',basis:'surface-tag-and-photo',sourceSurface:path.surface,reference:ENGINEERING_PAVERS_STREET,...geometry};
 if(path.id==='osm-way-9784674'&&path.surface==='pebblestone')return {material:'interlockingPavers',basis:'photo-reference-with-map-conflict',sourceSurface:path.surface,reference:SCIENCE_PAVERS_STREET,...geometry};
 return {material,basis,sourceSurface:path.surface??null,...geometry};
}
