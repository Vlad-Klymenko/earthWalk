import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import clip from 'polygon-clipping';
import {CAMPUS as RAW} from '../dist/campus-data.js';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {DALTON_ID,DALTON_COMMONS as G,DALTON_FRAME as F,DALTON_MOSAIC as ART,DALTON_PANELS,DALTON_SCREEN,DALTON_MEETING_TABLES,DALTON_LOUNGE_CHAIRS,DALTON_COMMONS_VIEWS,daltonPoint,daltonLocal,daltonFacadeSpans} from '../dist/dalton-commons-data.js';
import {daltonMosaicComposition} from '../dist/dalton-mosaic-data.js';
import {PlaneGeometry,Matrix4,Vector3} from '../dist/vendor/three.module.js';
const poly=p=>[p.points,...p.holes||[]].map(r=>r.map(p=>[p.x,p.z])),ra=r=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2,area=ps=>ps.reduce((s,p)=>s+ra(p[0])-p.slice(1).reduce((s,h)=>s+ra(h),0),0),source=RAW.buildings.find(b=>b.id===DALTON_ID),b=CAMPUS.buildings.find(b=>b.id===DALTON_ID),evidence=JSON.parse(fs.readFileSync(new URL('../sources/dalton-commons-evidence.json',import.meta.url)));
const inside=(p,r)=>{let yes=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if((r[i].z>p.z)!==(r[j].z>p.z)&&p.x<(r[j].x-r[i].x)*(p.z-r[i].z)/(r[j].z-r[i].z)+r[i].x)yes=!yes;return yes;};
test('catalogue dimensions and partial visual evidence remain distinct from retained map and university height fields',()=>{
 assert.equal(ART.width,evidence.catalogue.widthCm/100);assert.equal(ART.height,evidence.catalogue.heightCm/100);assert.equal(ART.count,4);assert.equal(ART.installed,1960);assert.equal(evidence.universityPhotographs.filter(p=>p.scope==='full').length,2);assert.equal(evidence.universityPhotographs.filter(p=>p.scope==='detail').length,2);
 const bytes=fs.readFileSync(new URL('../sources/unsw-gis-label-height-fields.json',import.meta.url));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),evidence.heightEvidence.sha256);const record=JSON.parse(bytes).features.find(p=>p.attributes.egdb_ES_14==='F12');assert.deepEqual(record,evidence.heightEvidence.record);assert.equal(record.attributes.egdb_ES_26,14.87);assert.equal(record.attributes.egdb_ES_18,4);
 assert.deepEqual(b.points,source.points);assert.deepEqual(b.tags,source.tags);assert.equal(b.height,15);assert.equal(b.levels,3);assert.equal(b.heightSource,'mapped');assert.equal(b.walkableUnder,false);assert.match(b.heightNote,/detail-led/);
});
test('the three-sided transparent room and its facade splits stay bounded to the original occupied footprint',()=>{
 assert.ok(area([poly({points:G.points})])>200&&area([poly({points:G.points})])<260);assert.ok(area(clip.difference(poly({points:G.points}),poly(source)))<1e-6);let clearLength=0;
 for(let i=0;i<source.points.length;i++){const a=source.points[i],c=source.points[(i+1)%source.points.length],spans=daltonFacadeSpans(a,c),length=Math.hypot(c.x-a.x,c.z-a.z);assert.ok(Math.abs(spans.reduce((s,p)=>s+Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),0)-length)<1e-7);for(const s of spans)if(s.commons){clearLength+=Math.hypot(s.b.x-s.a.x,s.b.z-s.a.z);assert.ok(daltonLocal({x:(s.a.x+s.b.x)/2,z:(s.a.z+s.b.z)/2}).v>G.v0-1e-6);}}
 assert.ok(clearLength>48&&clearLength<51);assert.ok(G.ceiling-G.floor>ART.height+.25);
});
test('all four catalogue-sized mural planes sit just outside their supporting ducts and fit the reconstructed room',()=>{
 assert.equal(DALTON_PANELS.length,4);assert.equal(new Set(DALTON_PANELS.map(p=>p.motif)).size,4);
 for(const p of DALTON_PANELS){assert.equal(p.width,ART.width);assert.equal(p.height,ART.height);assert.ok(p.bottom>G.floor&&p.bottom+p.height<G.ceiling);assert.ok(Math.abs(p.u-G.ductU)>G.ductThickness/2);for(const v of [p.v-p.width/2,p.v+p.width/2])assert.ok(inside(daltonPoint(p.u,v),G.points));
  const geometry=new PlaneGeometry(p.width,p.height),q=daltonPoint(p.u,p.v),transform=new Matrix4().makeRotationY(Math.atan2(p.side*F.u.x,p.side*F.u.z));transform.setPosition(q.x,p.bottom+p.height/2,q.z);geometry.applyMatrix4(transform);geometry.computeBoundingBox();const size=geometry.boundingBox.getSize(new Vector3());assert.ok(Math.abs(size.y-ART.height)<1e-5);assert.ok(Math.abs(Math.hypot(size.x,size.z)-ART.width)<1e-5);geometry.dispose();
  const art=daltonMosaicComposition(p.motif);assert.equal(art.reference,p.reference);assert.deepEqual(art,daltonMosaicComposition(p.motif));assert.ok(art.shapes.length);for(const s of art.shapes){assert.match(s.color,/^#[0-9a-f]{6}$/);if(s.points)assert.ok(s.points.flat().every(Number.isFinite));else assert.ok([s.x,s.y,s.rx,s.ry,s.rotation].every(Number.isFinite)&&s.rx>0&&s.ry>0);}
 }
 assert.throws(()=>daltonMosaicComposition('unknown'));
});
test('screen, table and lounge furniture remain inside the room and outside viewpoints remain clear of occupied buildings',()=>{
 for(const s of DALTON_SCREEN){assert.ok(s.top<G.ceiling&&s.bottom>G.floor+1.5&&s.bottom<s.top);assert.ok(inside(daltonPoint(s.u,s.v),G.points));}
 for(const t of DALTON_MEETING_TABLES)for(const u of [t.u-t.width/2,t.u+t.width/2])for(const v of [t.v-t.length/2,t.v+t.length/2])assert.ok(inside(daltonPoint(u,v),G.points));for(const c of DALTON_LOUNGE_CHAIRS)for(let i=0;i<16;i++)assert.ok(inside(daltonPoint(c.u+Math.cos(i*Math.PI/8)*.65,c.v+Math.sin(i*Math.PI/8)*.65),G.points));
 for(const view of DALTON_COMMONS_VIEWS){assert.ok(CAMPUS.landmarks.some(p=>p.id===view.id));for(const room of RAW.buildings.filter(p=>!p.walkableUnder)){const circle={points:Array.from({length:24},(_,i)=>({x:view.x+Math.cos(i*Math.PI/12)*.4,z:view.z+Math.sin(i*Math.PI/12)*.4}))};assert.ok(area(clip.intersection(poly(circle),poly(room)))<1e-7,room.id);}}
});
