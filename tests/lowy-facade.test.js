import test from 'node:test';
import assert from 'node:assert/strict';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {MEDICAL_PARTS} from '../dist/medical-parts.js';
import {medicalGeometry} from '../dist/medical-data.js';
import {terrainHeight} from '../dist/terrain.js';
import {LOWY_ID,LOWY_SCREEN,LOWY_LINK,LOWY_VIEWS,lowyScreenPanels,lowyFacadeFaces} from '../dist/lowy-facade-data.js';
const b=RAW.buildings.find(b=>b.id===LOWY_ID),g=medicalGeometry(b),faces=lowyFacadeFaces(b);
const length=(a,c)=>Math.hypot(c.x-a.x,c.z-a.z);
const area=m=>m.reduce((s,p)=>s+p.reduce((a,r,i)=>a+(i?-1:1)*Math.abs(r.reduce((n,v,j)=>{const q=r[(j+1)%r.length];return n+v[0]*q[1]-q[0]*v[1];},0))/2,0),0);
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z]));
test('Lowy external skins exactly cover the source perimeter and shared faces leave the occupied link open',()=>{
 const perimeter=b.points.reduce((s,p,i)=>s+length(p,b.points[(i+1)%b.points.length]),0),external=faces.filter(f=>f.external);
 assert.ok(Math.abs(external.reduce((s,f)=>s+f.length,0)-perimeter)<1e-7);
 for(const f of faces){assert.ok(f.top>f.bottom&&Number.isFinite(f.length));if(!f.external){assert.equal(f.kind,'joint');assert.ok(f.top<=g.bridgeBottom||f.bottom>=g.bridgeRoof,'no hidden skin through the occupied bridge');}}
 assert.equal(external.filter(f=>f.kind==='link-frame').length,1);
 const frame=external.find(f=>f.kind==='link-frame');assert.ok(frame.nu<-.9&&frame.length>10&&frame.length<12);assert.ok(faces.some(f=>f.kind==='courtyard'&&f.length>45));
});
test('courtyard panel fields remain separated with broad panels and deeper slender blades',()=>{
 for(const f of faces.filter(f=>f.kind==='courtyard')){const panels=lowyScreenPanels(f.length);assert.ok(panels.length);for(let i=0;i<panels.length;i++){const p=panels[i];assert.ok(p.start>=0&&p.end<=f.length&&p.end>p.start);if(i)assert.ok(p.start>panels[i-1].end);assert.ok(p.depth>LOWY_SCREEN.panelDepth-.001);}}
 const panels=lowyScreenPanels(49.8688239283824);assert.ok(panels.some(p=>p.end-p.start>1.5));assert.ok(panels.some(p=>p.blade&&p.depth>.4));assert.ok(new Set(panels.map(p=>p.color)).size>=3);
});
test('recessed link frame stays above walking and jumping space without changing supports or roof',()=>{
 const f=faces.find(f=>f.kind==='link-frame');assert.ok(LOWY_LINK.projection-LOWY_LINK.glassOffset>.4);assert.ok(f.length>2*LOWY_LINK.jamb);assert.ok(f.top-LOWY_LINK.head>f.bottom+LOWY_LINK.sill);
 for(let i=0;i<=20;i++){const t=i/20,p={x:f.a.x+(f.c.x-f.a.x)*t,z:f.a.z+(f.c.z-f.a.z)*t};assert.ok(g.base+f.bottom-terrainHeight(p.x,p.z)>3.1);}
 const shown=CAMPUS.buildings.find(p=>p.id===b.id);assert.deepEqual(shown.points,b.points);assert.deepEqual(shown.tags,b.tags);assert.equal(shown.height,32);assert.equal(shown.levels,8);
 assert.equal(g.supports.length,6);assert.ok(g.supports.every(p=>p.radius===.24));assert.equal(g.bridgeBottom,6.4);assert.equal(g.bridgeRoof,28.8);
});
test('new Lowy courtyard viewpoints stay outside occupied ground and retain source map paths',()=>{
 for(const view of LOWY_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));const circle=[Array.from({length:32},(_,i)=>[view.x+.4*Math.cos(i*Math.PI/16),view.z+.4*Math.sin(i*Math.PI/16)])];for(const p of RAW.buildings)assert.ok(area(clip.intersection([circle],poly(p)))<1e-7,view.id+' clears '+p.id);assert.ok(Number.isFinite(terrainHeight(view.x,view.z)));}
 for(const id of [LOWY_ID,'wallace-wurth'])assert.deepEqual(CAMPUS.buildings.find(p=>p.id===id).points,RAW.buildings.find(p=>p.id===id).points);
 assert.ok(MEDICAL_PARTS.filter(p=>p.buildingId===LOWY_ID).every(p=>p.reconstructed));
});
