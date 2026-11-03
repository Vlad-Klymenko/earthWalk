import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {BIOSCIENCE_PARTS} from '../dist/bioscience-parts.js';
import {bioscienceGeometry} from '../dist/bioscience-data.js';
import {BIOSCIENCE_SCREEN as S,BIOSCIENCE_CLAY,BIOSCIENCE_GREY,BIOSCIENCE_GLASS,BIOSCIENCE_PIER,bioscienceFin,bioscienceGreyPanel,biosciencePanelGrid,baguetteProfile,BIOSCIENCE_GREY_VIEW} from '../dist/bioscience-facade-data.js';
const poly=(r,h=[])=>[r,...h].map(r=>r.map(p=>[p.x,p.z]));
const area=m=>m.reduce((sum,p)=>sum+p.reduce((s,r,i)=>s+(i?-1:1)*Math.abs(r.reduce((a,v,k)=>{const q=r[(k+1)%r.length];return a+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const disc=(p,r)=>Array.from({length:32},(_,i)=>({x:p.x+Math.cos(i*Math.PI/16)*r,z:p.z+Math.sin(i*Math.PI/16)*r}));
test('lower screen course uses the retained raised-glass planning level without changing massing or height sources',()=>{
 const raw=RAW.buildings.find(b=>b.id==='biological-south'),shown=CAMPUS.buildings.find(b=>b.id===raw.id),g=bioscienceGeometry(raw);assert.equal(S.firstRL,g.levels[1]);assert.equal(S.firstRL,57.57);assert.ok(S.firstRL<61.53);
 assert.deepEqual(shown.points,raw.points);assert.deepEqual(shown.tags,raw.tags);assert.equal(shown.levels,null);assert.equal(shown.heightSource,'derived');assert.equal(g.report.roofRL,89.5);assert.equal(BIOSCIENCE_PARTS.find(p=>p.buildingId===raw.id&&p.kind==='glass-box').roofRL,85.98);
});
test('chamfered terracotta sections fit the pitch and remain inside each floor course',()=>{
 const g=bioscienceGeometry(RAW.buildings.find(b=>b.id==='biological-south'));
 for(let row=1;row<g.levels.length-1;row++)for(let i=0;i<100;i++){
  const fin=bioscienceFin(i,row,100),profile=baguetteProfile(fin.width,fin.depth);assert.deepEqual(fin,bioscienceFin(i,row,100));assert.ok(BIOSCIENCE_CLAY.includes(fin.color));assert.ok(fin.width<S.pitch*.3);assert.ok(fin.depth>S.offset/2);
  assert.equal(profile.length,8);for(const [x,z] of profile){assert.ok(Math.abs(x)<=fin.width/2+1e-9);assert.ok(Math.abs(z)<=fin.depth/2+1e-9);}
  const a=area([[[...profile,profile[0]]]]);assert.ok(a>fin.width*fin.depth*.85&&a<fin.width*fin.depth);
  assert.ok(g.levels[row+1]-g.levels[row]-.22-fin.trimBottom-fin.trimTop>3.3);
 }
});
test('grey panel proportions and broad fields are stable across different wall sizes',()=>{
 for(const [length,height] of [[18.1,32.85],[20,31],[12,28]]){
  const {columns,rows}=biosciencePanelGrid(length,height);assert.ok(Math.abs(length/columns-.55)<.025);assert.ok(Math.abs(height/rows-.85)<.025);assert.ok(rows>30);
  const colours=new Set();let same=0,total=0;for(let r=0;r<rows;r++)for(let c=0;c<columns;c++){const colour=bioscienceGreyPanel(c,r,columns,rows);assert.ok(BIOSCIENCE_GREY.includes(colour));colours.add(colour);if(c){total++;if(colour===bioscienceGreyPanel(c-1,r,columns,rows))same++;}}
  assert.ok(colours.size>=4);assert.ok(same/total>.6,'broad fields rather than isolated random tiles');
 }
});
test('finer glazing fits floor heights and tapered piers remain inside conservative collision and glass-box bounds',()=>{
 const g=bioscienceGeometry(RAW.buildings.find(b=>b.id==='biological-south')),glass=BIOSCIENCE_PARTS.find(p=>p.buildingId==='biological-south'&&p.kind==='glass-box');assert.ok(BIOSCIENCE_GLASS.midTransom>0&&BIOSCIENCE_GLASS.midTransom<1);assert.ok(BIOSCIENCE_GLASS.lowerSpandrel<1);
 assert.ok(BIOSCIENCE_PIER.bottomWidth<BIOSCIENCE_PIER.topWidth);assert.ok(BIOSCIENCE_PIER.collisionRadius>=Math.SQRT2*BIOSCIENCE_PIER.topWidth/2);
 for(const support of g.supports)assert.ok(area(clip.difference([poly(disc(support,BIOSCIENCE_PIER.collisionRadius))],[poly(glass.points)]))<1e-7);
 const view=BIOSCIENCE_GREY_VIEW;assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));assert.ok(view.x<RAW.bounds.maxX-.5);for(const b of RAW.buildings)assert.ok(area(clip.intersection([poly(disc(view,.45))],[poly(b.points,b.holes)]))<1e-7,b.id);
});
