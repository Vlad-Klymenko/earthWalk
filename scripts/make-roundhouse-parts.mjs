import fs from 'node:fs';
import clip from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { roundhouseGeometry,ROUNDHOUSE_ID } from '../dist/roundhouse-data.js';
import { roundhouseEntryGeometry } from '../dist/roundhouse-entry.js';
import { frameRectangle } from '../dist/geometry.js';
const poly=(points,holes=[])=>[points,...holes].map(r=>r.map(p=>[p.x,p.z]));
const clean=r=>(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-9?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const emit=(regions,props={})=>regions.map(p=>({...props,points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true}));
const b=CAMPUS.buildings.find(b=>b.id===ROUNDHOUSE_ID),g=roundhouseGeometry(b),source=[poly(b.points,b.holes)],main=clip.intersection(source,poly(g.outline)),annex=clip.difference(source,main);
const wedge=poly([g.center,g.at(-43*Math.PI/180,55),g.at(-20*Math.PI/180,55),g.at(4*Math.PI/180,55),g.at(29*Math.PI/180,55)]),lower=clip.intersection(main,clip.union(poly(g.lowerOutline),wedge)),upper=clip.intersection(main,poly(g.upperOutline));
const oculus=poly(Array.from({length:64},(_,i)=>g.at(i*Math.PI/32,g.oculusRadius)));
const ground=[...emit(lower,{kind:'hall'}),...emit(annex,{kind:'annex'}),...emit(clip.difference(main,lower),{kind:'arcade'})];
const roofs=[...emit(clip.difference(main,oculus),{kind:'cone'}),...emit([oculus],{kind:'oculus'}),...emit(annex,{kind:'annex'})];
const deck=emit(clip.difference(main,upper)),parapet=emit(clip.difference(main,poly(g.parapetInner),...g.stairs.map(s=>poly(s.opening))));
const steps=[];for(const [stair,s]of g.stairs.entries())for(let i=0;i<s.count;i++){const v0=s.run*(1-(i+1)/s.count),v1=s.run*(1-i/s.count);steps.push({stair,index:i,points:frameRectangle(s.frame,s.width,v1-v0,0,(v0+v1)/2),rl:s.lowRL+(s.highRL-s.lowRL)*(i+1)/s.count,reconstructed:true});}
const buffer=(points,width)=>{const out=[];for(let i=0;i<points.length-1;i++){const a=points[i],c=points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2;out.push([[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[c.x-nx,c.z-nz],[c.x+nx,c.z+nz]]]);}return clip.union(...out);};
const others=clip.union(...CAMPUS.buildings.filter(b=>b.id!==ROUNDHOUSE_ID&&!b.walkableUnder).map(b=>poly(b.points,b.holes))),paths=clip.union(...CAMPUS.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.center.x,p.z-g.center.z)<100)).map(p=>buffer(p.points,(p.width||3)+.16)));
// Arc's completed-landscape photographs show broad paving south of the hall.
// Its detailed boundary is reconstructed; keep source buildings / path ribbons clear.
const forecourt=poly([g.center,...Array.from({length:35},(_,i)=>g.at((26+i*2.5)*Math.PI/180,54))]);
const entry=roundhouseEntryGeometry(b);
const canopy=emit(clip.difference(poly(entry.points),...ground.filter(p=>p.kind!=='arcade').map(p=>poly(p.points,p.holes)),others));
const paving=emit(clip.difference(clip.union(poly(g.scale(1.15)),forecourt,poly(entry.paving),...g.stairs.map(s=>poly(s.apron))),source,others,paths));
const data={ROUNDHOUSE_MAIN:emit(main),ROUNDHOUSE_UPPER:emit(upper),ROUNDHOUSE_GROUND:ground,ROUNDHOUSE_ROOFS:roofs,ROUNDHOUSE_DECK:deck,ROUNDHOUSE_PARAPET:parapet,ROUNDHOUSE_STEPS:steps,ROUNDHOUSE_PAVING:paving,ROUNDHOUSE_CANOPY:canopy};
fs.writeFileSync(new URL('../dist/roundhouse-parts.js',import.meta.url),'// Reconstructed Roundhouse components partition its retained mapped perimeter.\n// Regenerate with node scripts/make-roundhouse-parts.mjs.\n'+Object.entries(data).map(([k,v])=>'export const '+k+' = '+JSON.stringify(v,null,2)+';').join('\n')+'\n');
console.log(`${roofs.length} Roundhouse roof regions, ${ground.length} ground regions, ${steps.length} treads`);
