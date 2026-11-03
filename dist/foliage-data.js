// Procedural drawings, not photograph pixels or measured individual leaves.
// Species-level silhouettes guide these small reusable texture atlases.
export function foliageKind(name=''){
 if(/^Ficus\b/i.test(name))return 'fig';
 if(/^Populus\b/i.test(name))return 'poplar';
 if(/^(Eucalyptus|Corymbia|Angophora|Podocarpus)\b/i.test(name))return 'lanceolate';
 if(/^(Araucaria|Cupressus|Taxodium|Callitris|Pinus|Casuarina|Allocasuarina)\b/i.test(name))return 'needle';
 return 'broad';
}
export const columnarPoplar=name=>/^Populus nigra\b.*\bItalica\b/i.test(name);
const profiles={broad:{count:260,width:4.5,length:9},fig:{count:250,width:5.5,length:10},poplar:{count:280,width:4.5,length:7},lanceolate:{count:340,width:2,length:11},needle:{count:600,width:.9,length:9}};
export function foliageSprites(kind='broad'){
 const profile=profiles[kind]||profiles.broad;let seed=620;
 const random=()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296;};
 return Array.from({length:profile.count},()=>{
  const angle=random()*Math.PI*2,r=Math.sqrt(random())*103;
  return {x:128+Math.cos(angle)*r,y:128+Math.sin(angle)*r,rx:profile.width*(.75+random()*.5),ry:profile.length*(.75+random()*.5),angle:random()*Math.PI*2,light:57+random()*25};
 });
}
