// Original procedural interpretations of the university reference photographs.
// Normalized coordinates use the catalogue panel aspect. No source pixels used.
const polygon=(color,points)=>({type:'polygon',color,points}),ellipse=(color,x,y,rx,ry,rotation=0)=>({type:'ellipse',color,x,y,rx,ry,rotation});
function star(cx,cy,rx,ry,n,phase=0,inner=.88){return Array.from({length:n*2},(_,i)=>{const a=phase+i*Math.PI/n,r=i%2?inner:1;return [cx+Math.cos(a)*rx*r,cy+Math.sin(a)*ry*r];});}
export function daltonMosaicComposition(kind){
 if(kind==='blue')return {background:'#347f94',reference:'full',shapes:[
  polygon('#ded85e',[[.23,.24],[.26,.26],[.27,.22],[.31,.25],[.35,.23],[.36,.3],[.41,.29],[.4,.37],[.44,.4],[.42,.45],[.45,.49],[.42,.53],[.43,.6],[.38,.61],[.37,.66],[.33,.64],[.29,.68],[.27,.61],[.23,.63],[.24,.55],[.21,.51],[.24,.44],[.22,.4],[.24,.35]]),
  polygon('#e9e6d2',[[.31,.27],[.39,.29],[.43,.34],[.41,.4],[.45,.43],[.42,.48],[.45,.53],[.4,.58],[.38,.64],[.34,.61],[.36,.52],[.33,.47],[.35,.38]]),
  polygon('#4a605a',[[.29,.37],[.31,.34],[.33,.43],[.31,.51],[.31,.59],[.28,.55],[.3,.48]]),
  polygon('#365b98',[[.64,.3],[.66,.18],[.69,.34],[.72,.23],[.74,.12],[.76,.3],[.8,.17],[.82,.32],[.85,.39],[.85,.48],[.81,.55],[.8,.69],[.76,.76],[.73,.7],[.69,.79],[.68,.65],[.63,.7],[.64,.56],[.61,.5],[.63,.42]]),
  polygon('#708db3',[[.67,.4],[.71,.35],[.75,.37],[.79,.32],[.82,.43],[.79,.52],[.76,.67],[.73,.61],[.7,.66],[.68,.55]]),
  polygon('#d5cbb6',[[.72,.42],[.75,.36],[.77,.43],[.76,.47],[.79,.5],[.77,.56],[.74,.53],[.72,.56],[.71,.49]]),ellipse('#d6c95b',.75,.38,.008,.023)]};
 if(kind==='burst'){
  const shapes=[polygon('#e5d75a',star(.29,.44,.27,.39,27,.1,.92)),polygon('#eae6d2',star(.29,.44,.243,.35,24,.16,.91))];
  // Branching red fissures are fitted to the observed radial composition.
  for(let i=0;i<18;i++){const a=i*Math.PI*2/18+.18,px=.29+Math.cos(a)*.22,py=.44+Math.sin(a)*.32,mx=.29+Math.cos(a+.06)*.115,my=.44+Math.sin(a+.06)*.17;shapes.push({type:'line',color:'#c75c3c',width:.009,points:[[.29,.44],[mx,my],[px,py]]});if(i%2===0)shapes.push({type:'line',color:'#c75c3c',width:.006,points:[[mx,my],[.29+Math.cos(a+.25)*.18,.44+Math.sin(a+.25)*.26]]});}
  return {background:'#287a69',reference:'full',shapes};
 }
 if(kind==='spindles'){
  const shapes=[
   polygon('#e1c448',[[.12,0],[.2,0],[.19,.22],[.17,.38],[.15,.43],[.13,.33]]),
   polygon('#d77e3e',[[.13,.46],[.18,.47],[.2,.69],[.18,1],[.14,1],[.12,.75]]),
   polygon('#e6dec4',[[.25,0],[.34,0],[.33,.12],[.29,.32],[.3,.45],[.35,.67],[.32,.85],[.28,.94],[.25,.8],[.25,.62],[.28,.39],[.26,.17]]),
   polygon('#bcb59b',[[.28,.04],[.3,.05],[.29,.29],[.3,.43],[.28,.64],[.3,.78],[.29,.86],[.27,.78],[.28,.58],[.27,.42]]),
   polygon('#c9d7c4',[[.39,.25],[.44,.25],[.45,.41],[.47,.52],[.45,.59],[.42,.58],[.4,.52],[.42,.41]]),
   polygon('#d7dbc9',[[.4,.8],[.45,.78],[.46,.91],[.48,1],[.4,1],[.39,.91]]),
   polygon('#e8c842',[[.58,0],[.67,0],[.65,.22],[.63,.34],[.61,.39],[.58,.3]]),
   polygon('#e2c94b',[[.59,.43],[.64,.43],[.67,.56],[.65,.72],[.62,.81],[.65,1],[.57,1],[.59,.78],[.6,.64],[.57,.52]]),
   ellipse('#e6dfc5',.79,.2,.08,.23,.15),ellipse('#c8d6c4',.79,.2,.055,.18,.15),ellipse('#8bada2',.79,.2,.037,.13,.15),ellipse('#ece6d4',.79,.2,.025,.105,.15),
   ellipse('#e4d7b5',.8,.78,.075,.22,-.12),ellipse('#a3b4a0',.8,.78,.05,.17,-.12),ellipse('#be5740',.8,.78,.022,.12,-.12)
  ];
  for(const x of [.16,.3,.62])for(const [i,y] of [.36,.43,.7,.76,.83].entries())shapes.push(polygon(['#d25938','#3b6589','#e8d66b'][i%3],[[x-.037,y],[x+.035,y],[x+.03,y+.025],[x-.032,y+.025]]));
  for(let y=.05;y<.94;y+=.085)shapes.push(polygon('#dedac0',[[.515,y],[.523,y],[.523,y+.048],[.515,y+.048]]));
  return {background:'#347c71',reference:'detail',shapes};
 }
 if(kind==='orb'){
  const shapes=[ellipse('#cf6135',.53,.49,.36,.64)];for(const [x,y,rx,ry,color] of [[.35,.17,.045,.19,'#e8e1c5'],[.47,.15,.05,.2,'#d9bf39'],[.62,.1,.08,.18,'#e8e0c2'],[.76,.17,.04,.14,'#c5b447'],[.31,.51,.05,.11,'#e2dac4'],[.44,.65,.055,.22,'#cec7b3'],[.59,.67,.075,.22,'#e8ca3d'],[.73,.51,.065,.1,'#e6deca'],[.78,.74,.04,.12,'#e2d8be']])shapes.push(polygon(color,[[x,y-ry],[x+rx*.65,y-ry*.55],[x+rx,y],[x+rx*.5,y+ry*.55],[x,y+ry],[x-rx*.75,y+ry*.45],[x-rx,y-ry*.1],[x-rx*.5,y-ry*.6]]));shapes.push(ellipse('#3d7297',.6,.67,.018,.075));for(let i=0;i<5;i++)shapes.push({type:'line',color:'#9f9578',width:.004,points:[[.31,.08+i*.045],[.37,.08+i*.045]]});return {background:'#4b637b',reference:'detail',shapes};
 }
 throw new Error('Unknown Dalton mosaic motif: '+kind);
}
