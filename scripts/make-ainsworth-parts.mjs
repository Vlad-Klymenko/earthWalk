import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { CAMPUS } from '../dist/campus-data.js';
import { ainsworthGeometry, AINSWORTH_ID } from '../dist/ainsworth-data.js';
import { clipFrameStrip } from '../dist/geometry.js';
const poly=(p,holes=[])=>[p,...holes].map(p=>p.map(p=>[p.x,p.z]));
const clean=r=>(Math.hypot(r[0][0]-r.at(-1)[0],r[0][1]-r.at(-1)[1])<1e-9?r.slice(0,-1):r).map(([x,z])=>({x,z}));
const buffer=(points,width)=>{
 const pieces=[];
 for(let i=0;i<points.length-1;i++){const a=points[i],c=points[i+1],len=Math.hypot(c.x-a.x,c.z-a.z),nx=-(c.z-a.z)/len*width/2,nz=(c.x-a.x)/len*width/2;pieces.push([[[a.x+nx,a.z+nz],[a.x-nx,a.z-nz],[c.x-nx,c.z-nz],[c.x+nx,c.z+nz]]]);}
 for(const p of points)pieces.push([Array.from({length:24},(_,i)=>[p.x+Math.cos(i*Math.PI/12)*width/2,p.z+Math.sin(i*Math.PI/12)*width/2])]);
 return clipping.union(...pieces);
};
const b=CAMPUS.buildings.find(b=>b.id===AINSWORTH_ID),g=ainsworthGeometry(b),source=[poly(b.points,b.holes)],old=[poly(clipFrameStrip(b.points,g.frame,-100,g.splitV))],modern=clipping.difference(source,old),recess=clipping.intersection(source,clipping.union(poly(g.northRecess.points),poly(g.courtRecess.points)));
const upper=[],ground=[],roofs=[],canopy=[],paving=[];
const emit=(out,regions,props={})=>{for(const p of regions)out.push({...props,points:clean(p[0]),holes:p.slice(1).map(clean),reconstructed:true});};
emit(upper,old,{kind:'north'});emit(upper,modern,{kind:'south'});
emit(ground,clipping.difference(old,recess),{kind:'north'});emit(ground,clipping.difference(modern,recess),{kind:'south'});emit(ground,recess,{kind:'arcade',bottomRL:g.soffitRL});
for(const [region,core,kind] of [[old,g.lift,'north'],[modern,g.plant,'south']]){
 const top=clipping.intersection(region,poly(core.points));emit(roofs,clipping.difference(region,top),{kind,rl:g.bodyRoofRL});emit(roofs,top,{kind:kind==='north'?'lift':'plant',rl:core.topRL});
}
emit(canopy,clipping.difference(poly(g.canopy.points),source));
const near=CAMPUS.paths.filter(p=>p.points.some(p=>Math.hypot(p.x-g.frame.x,p.z-g.frame.z)<90)),open=clipping.union(recess,...canopy.map(p=>poly(p.points,p.holes)));
emit(paving,clipping.difference(open,clipping.union(...near.map(p=>buffer(p.points,(p.renderWidth||p.width||3)+.16)))));
fs.writeFileSync(new URL('../dist/ainsworth-parts.js',import.meta.url),'// Photo-led Ainsworth wings / recesses partition its exact retained footprint.\n// Regenerate with node scripts/make-ainsworth-parts.mjs.\nexport const AINSWORTH_UPPER = '+JSON.stringify(upper,null,2)+';\nexport const AINSWORTH_GROUND = '+JSON.stringify(ground,null,2)+';\nexport const AINSWORTH_ROOFS = '+JSON.stringify(roofs,null,2)+';\nexport const AINSWORTH_CANOPY = '+JSON.stringify(canopy,null,2)+';\nexport const AINSWORTH_PAVING = '+JSON.stringify(paving,null,2)+';\n');
console.log(`${upper.length} Ainsworth wings, ${ground.length} ground regions, ${roofs.length} roof phases`);
