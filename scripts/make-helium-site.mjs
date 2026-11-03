import fs from 'node:fs';
import clip from 'polygon-clipping';
import * as THREE from '../dist/vendor/three.module.js';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {HELIUM_WORK,HELIUM_BODIES,HELIUM_BED,HELIUM_CHILLER,HELIUM_OLD_ANNEX,heliumPoint,heliumField} from '../dist/newton-helium-data.js';
import {OLD_MAIN_ROOFS,OLD_MAIN_FRONT_REMNANTS} from '../dist/old-main-front-parts.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x,z})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x,z}))),reconstructed:true}));
const occupied=clip.union(...RAW.buildings.filter(b=>!b.walkableUnder).map(poly),...HELIUM_BODIES.map(poly),poly(HELIUM_CHILLER)),ground=clip.difference(poly(HELIUM_WORK),occupied),paving=clip.difference(ground,poly(HELIUM_BED)),bed=clip.intersection(ground,poly(HELIUM_BED)),mesh=[];
for(let v=32.23;v<42.23-.001;v+=.5)for(let u=-8.5;u<13.8-.001;u+=.5){const at=(u,v)=>{const p=heliumPoint(u,v);return [p.x,p.z];},a=at(u,v),b=at(Math.min(u+.5,13.8),v),c=at(u,Math.min(v+.5,42.23)),d=at(Math.min(u+.5,13.8),Math.min(v+.5,42.23));for(const triangle of [[a,b,c],[b,d,c]])for(const [kind,shape,offset] of [['paving',paving,0],['soil',bed,.012]])for(const part of parts(clip.intersection([triangle],shape))){const all=[...part.points,...part.holes.flat()];for(const tri of THREE.ShapeUtils.triangulateShape(part.points.map(p=>new THREE.Vector2(p.x,p.z)),part.holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z)))))mesh.push({kind,points:[...tri].reverse().map(i=>({...all[i],y:heliumField(all[i])+offset}))});}}
const roofs=Object.fromEntries(Object.entries(OLD_MAIN_ROOFS).map(([kind,ps])=>[kind,parts(clip.difference(clip.union(...ps.map(poly)),poly(HELIUM_OLD_ANNEX)))]));
const remnants={greens:{},plazas:{}};
for(const kind of ['greens','plazas'])for(const p of RAW[kind]||[]){const prior=OLD_MAIN_FRONT_REMNANTS[kind]?.[p.id]||[p],shape=clip.union(...prior.map(poly));if(clip.intersection(shape,poly(HELIUM_WORK)).length)remnants[kind][p.id]=parts(clip.difference(shape,poly(HELIUM_WORK)));}
// Clipping at coincident grid / bed edges can emit collinear numerical slivers.
for(let i=mesh.length-1;i>=0;i--){const [a,b,c]=mesh[i].points;if(Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))<1e-10)mesh.splice(i,1);}
const result={HELIUM_GROUND:parts(ground),HELIUM_PAVING:parts(paving),HELIUM_SOIL:parts(bed),HELIUM_MESH:mesh,HELIUM_OLD_MAIN_ROOFS:roofs,HELIUM_REMNANTS:remnants};
fs.writeFileSync(new URL('../dist/newton-helium-parts.js',import.meta.url),'// Fitted completed-project addition; original map building / route data remains separate.\n'+Object.entries(result).map(([k,v])=>'export const '+k+'='+JSON.stringify(v)+';\n').join(''));
console.log({triangles:mesh.length,groundParts:parts(ground).length,landscapeMasks:Object.values(remnants).map(p=>Object.keys(p))});
