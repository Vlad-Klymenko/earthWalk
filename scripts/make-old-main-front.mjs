import fs from 'node:fs';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {OLD_MAIN_MAIN_STAIRS,OLD_MAIN_WEST_PROFILE,OLD_MAIN_FIN} from '../dist/old-main-front-data.js';
import {oldNorthRectangle} from '../dist/old-main-north-data.js';
import {CHANCELLOR_REMNANTS} from '../dist/chancellors-garden-parts.js';
import {OLD_NORTH_REMNANTS} from '../dist/old-main-north-parts.js';
import {OLD_MAIN_ENTRY_REMNANTS} from '../dist/old-main-entry-parts.js';
import {ENGINEERING_REMNANTS} from '../dist/engineering-street-parts.js';
import {MALL_REMNANTS} from '../dist/mall-landscape-parts.js';
import {SOUTHERN_REMNANTS} from '../dist/southern-drive-parts.js';
import {mallPathKey} from '../dist/mall-landscape-data.js';
import {pathGeometry} from '../dist/path-materials.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),snap=n=>Math.round(n*1e6)/1e6,parts=m=>m.map(p=>({points:p[0].slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})),holes:p.slice(1).map(r=>r.slice(0,-1).map(([x,z])=>({x:snap(x),z:snap(z)})))})),union=ps=>ps.length?clip.union(...ps):[],diff=(a,...bs)=>a.length?clip.difference(a,...bs.filter(b=>b.length)):[];
const b=RAW.buildings.find(b=>b.id==='osm-way-45490050'),westScope=poly({points:oldNorthRectangle(-100,OLD_MAIN_WEST_PROFILE.splitU,-100,100)}),roofs={west:parts(clip.intersection(poly(b),westScope)),east:parts(diff(poly(b),westScope))},stairGround=union([...OLD_MAIN_MAIN_STAIRS.parts.map(poly),poly(OLD_MAIN_FIN)]),apron=diff(poly({points:oldNorthRectangle(-12.5,15.2,33.55,42)}),stairGround,...RAW.buildings.filter(b=>!b.walkableUnder).map(poly)),ground=union([stairGround,apron]),remnants={greens:{},plazas:{},paths:{}};
const ribbon=(p,w)=>p.points.slice(1).map((b,i)=>{const a=p.points[i],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz)||1,nx=-dz/len*w/2,nz=dx/len*w/2;return [[[a.x+nx,a.z+nz],[b.x+nx,b.z+nz],[b.x-nx,b.z-nz],[a.x-nx,a.z-nz]]];});
for(const key of ['greens','plazas'])for(const p of CAMPUS[key]){const base=union((CHANCELLOR_REMNANTS[key][p.id]||OLD_NORTH_REMNANTS[key][p.id]||OLD_MAIN_ENTRY_REMNANTS[key][p.id]||MALL_REMNANTS[key][p.id]||SOUTHERN_REMNANTS[key][p.id]||[p]).map(poly));if(clip.intersection(base,ground).length)remnants[key][p.id]=parts(diff(base,ground));}
for(const p of CAMPUS.paths){if(p.kind==='steps')continue;const previous=CHANCELLOR_REMNANTS.paths[mallPathKey(p)]||OLD_NORTH_REMNANTS.paths[mallPathKey(p)]||ENGINEERING_REMNANTS.paths[mallPathKey(p)]||MALL_REMNANTS.paths[mallPathKey(p)]||SOUTHERN_REMNANTS.paths[p.id],w=pathGeometry(p).width,edge=union(previous?previous.edge.map(poly):ribbon(p,w+.5));if(clip.intersection(edge,ground).length)remnants.paths[mallPathKey(p)]={edge:parts(diff(edge,ground)),surface:parts(diff(union(previous?previous.surface.map(poly):ribbon(p,w)),ground))};}
fs.writeFileSync(new URL('../dist/old-main-front-parts.js',import.meta.url),'// Derived roof partition and main entrance masks. Source room / route geometry is unchanged.\nexport const OLD_MAIN_ROOFS = '+JSON.stringify(roofs)+';\nexport const OLD_MAIN_FRONT_APRON = '+JSON.stringify(parts(apron))+';\nexport const OLD_MAIN_FRONT_REMNANTS = '+JSON.stringify(remnants)+';\n');console.log({roofs:Object.fromEntries(Object.entries(roofs).map(([k,v])=>[k,v.length])),routes:Object.keys(remnants.paths).length});
