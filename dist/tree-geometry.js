import {columnarPoplar} from './foliage-data.js?v=fbfc5011f3c1';
// Source ranges remain strings. These representative sizes and tree shapes are reconstructions.
export function treeBand(value){
 const range=String(value).match(/^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/);
 if(range)return {min:+range[1],max:+range[2],value:(+range[1]+ +range[2])/2,open:false};
 if(value==='<5')return {min:0,max:5,value:3.25,open:true};
 if(value==='>30')return {min:30,max:null,value:34,open:true};
 throw new Error('Unknown tree size band: '+value);
}
export function treeForm(name){
 if(/^Ficus\b/i.test(name))return 'fig';
 if(/^(Livistona|Phoenix|Archontophoenix|Howea|Syagrus|Washingtonia|Chamaerops|Rhapis)\b/i.test(name))return 'palm';
 if(/^(Eucalyptus|Corymbia|Angophora|Melaleuca)\b/i.test(name))return 'gum';
 if(/^Populus\b/i.test(name))return 'poplar';
 if(/^(Araucaria|Cupressus|Taxodium|Callitris|Pinus|Casuarina|Allocasuarina|Podocarpus)\b/i.test(name))return 'conifer';
 return 'broadleaf';
}
export function inventoryTree(record){
 const heightRange=treeBand(record.heightBand),canopyRange=treeBand(record.canopyBand),height=heightRange.value,canopy=canopyRange.value;
 const radius=record.dbhMm>0?record.dbhMm/2000:Math.max(.055,height*.015);
 return {...record,heightRange,canopyRange,height,canopy,radius,form:treeForm(record.botanicalName),columnar:columnarPoplar(record.botanicalName),dimensionsReconstructed:true,dbhEstimated:!(record.dbhMm>0)};
}
export function treeClearsRoutes(tree,segments,clearance=.34){
 return segments.every(s=>{const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,t=Math.max(0,Math.min(1,((tree.x-s.a.x)*dx+(tree.z-s.a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(tree.x-s.a.x-dx*t,tree.z-s.a.z-dz*t)>=s.width/2+tree.radius+clearance;});
}
const rng=seed=>()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296;};
// Local metres. All geometry fits the chosen height and horizontal canopy envelope.
export function inventoryTreeGeometry(tree){
 const random=rng(tree.fid),H=tree.height,R=tree.canopy/2,form=tree.form,palm=form==='palm',fig=form==='fig',gum=form==='gum',conifer=form==='conifer',poplar=form==='poplar',columnar=tree.columnar;
 const segments=[],leaves=[],fronds=[],fork=H*(palm?.82:fig?.23:gum?.49:conifer?.15:.32),bark=gum?'#c3bca5':fig?'#8d8870':palm?'#8a8066':'#a19c83';
 const point=(x,y,z)=>({x,y,z}),stemTop=point(palm||conifer||columnar?0:Math.min(R*.07,.3),palm?H*.89:conifer||columnar?H*.96:fork,0);
 segments.push({a:point(0,0,0),b:stemTop,radius:tree.radius,color:bark});
 if(palm){
  for(let i=0;i<14;i++){const angle=i/14*Math.PI*2,reach=R*(.78+random()*.2),base=point(0,H*.87,0),mid=point(Math.cos(angle)*reach*.5,H*.96,Math.sin(angle)*reach*.5),tip=point(Math.cos(angle)*reach,H*.77,Math.sin(angle)*reach),width=Math.min(.5,R*.18);fronds.push({base,mid,tip,width});}
  return {segments,leaves,fronds};
 }
 const branches=fig?7:5,phase=random()*Math.PI*2;
 if(conifer){
  for(let tier=0;tier<7;tier++)for(let j=0;j<6;j++){
   const a=phase+j/6*Math.PI*2+tier*.37,reach=R*(.8-tier*.095),y=H*(.2+tier*.1),start=point(0,y,0),mid=point(Math.cos(a)*reach*.5,y+H*.02,Math.sin(a)*reach*.5),tip=point(Math.cos(a)*reach,y+H*.055,Math.sin(a)*reach);
   segments.push({a:start,b:mid,radius:Math.min(tree.radius*(.46-tier*.045),R*.028),color:bark},{a:mid,b:tip,radius:Math.min(tree.radius*.16,R*.012),color:bark});
  }
 }else if(columnar){
  // Italica's ascending branches attach at different heights on one leader.
  // Other Populus retain broad crowns; no nursery size replaces campus bands.
  for(let tier=0;tier<7;tier++)for(let j=0;j<4;j++){
   const a=phase+j/4*Math.PI*2+tier*.61,y=H*(.22+tier*.087),reach=R*(.66-tier*.065),start=point(0,y,0),mid=point(Math.cos(a)*reach*.48,y+H*.095,Math.sin(a)*reach*.48),tip=point(Math.cos(a)*reach,y+H*.17,Math.sin(a)*reach);
   segments.push({a:start,b:mid,radius:Math.min(tree.radius*.29,R*.018),color:bark},{a:mid,b:tip,radius:Math.min(tree.radius*.12,R*.008),color:bark});
  }
 }else for(let j=0;j<branches;j++){
  const a=phase+j/branches*Math.PI*2,reach=R*(fig?.72:gum?.67:.63),mid=point(Math.cos(a)*reach*.5,H*(fig?.49:gum?.7:.57),Math.sin(a)*reach*.5),tip=point(Math.cos(a)*reach,H*(.73+(j%3)*.055),Math.sin(a)*reach);
  segments.push({a:stemTop,b:mid,radius:Math.min(tree.radius*.5,R*.028),color:bark},{a:mid,b:tip,radius:Math.min(tree.radius*.22,R*.013),color:bark});
  // Connected fine forks give foliage a woody support rather than a bare broom.
  for(let k=0;k<3;k++){
   const t=.25+k*.25,start=point(mid.x+(tip.x-mid.x)*t,mid.y+(tip.y-mid.y)*t,mid.z+(tip.z-mid.z)*t),turn=a+(k%2?-.65:.65),end=point(start.x+Math.cos(turn)*R*.17,start.y+H*(.065+k*.014),start.z+Math.sin(turn)*R*.17);
   segments.push({a:start,b:end,radius:Math.min(tree.radius*.075,R*.005),color:bark});
  }
 }
 const count=fig?448:gum?320:conifer?256:poplar?384:384,colors=fig?['#587344','#6a824f','#7e935d','#506c40']:gum?['#829576','#a2b18e','#738b71','#94a789']:['#71894f','#869d62','#5e7c49','#9aaa70'];
 for(let i=0;i<count;i++){
  const angle=random()*Math.PI*2,vertical=random(),top=H*.99,bottom=H*(fig?.44:gum?.62:conifer?.21:columnar?.27:.46),y=bottom+(top-bottom)*vertical;
  const profile=conifer?1-vertical*.88:columnar?Math.sin(Math.PI*(.13+vertical*.86))**.55:Math.sqrt(Math.max(0,1-((vertical-.5)*1.95)**2)),reach=R*profile*(columnar?.72:.85)*Math.sqrt(random()),size=Math.min(H*.16,R*.44)*(fig?1.12:.95)*(.8+random()*.35);
  // Card corners stay inside the source-band representative envelope, including at the top.
  const margin=size*Math.SQRT2/2,x=Math.cos(angle)*Math.min(reach,Math.max(0,R-margin)),z=Math.sin(angle)*Math.min(reach,Math.max(0,R-margin));
  leaves.push({x,y:Math.max(margin,Math.min(H-margin,y)),z,size,rx:random()*Math.PI,ry:random()*Math.PI*2,rz:random()*Math.PI,color:colors[i%colors.length]});
 }
 return {segments,leaves,fronds};
}
