import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../dist/vendor/three.module.js';
import {CAMPUS_LIGHTING,campusSunPose,paintCampusSky,createCampusLighting} from '../dist/campus-lighting.js';

function harness(){
 const targets=[],skies=[];let generatorDisposals=0;
 class PMREMGenerator{fromEquirectangular(sky){const target={texture:{sourceSky:sky},disposals:0,dispose(){this.disposals++;}};targets.push(target);return target;}dispose(){generatorDisposals++;}}
 const canvasTexture=(w,h,paint)=>{const stops=[],ctx={createLinearGradient:()=>({addColorStop:(p,c)=>stops.push([p,c])}),fillRect(){}};paint(ctx,w,h);const sky={stops,disposals:0,dispose(){this.disposals++;}};skies.push(sky);return sky;};
 const scene=new THREE.Scene(),lighting=createCampusLighting({THREE:{...THREE,PMREMGenerator},renderer:{},scene,canvasTexture});
 return {scene,lighting,targets,skies,get generatorDisposals(){return generatorDisposals;}};
}
test('sun direction and relative elevation remain constant across the campus slope',()=>{
 for(const mode of ['day','golden']){
  const a=campusSunPose(mode,-140,80,25),b=campusSunPose(mode,620,-120,65);
  const delta=p=>({x:p.position.x-p.target.x,y:p.position.y-p.target.y,z:p.position.z-p.target.z});assert.deepEqual(delta(a),delta(b));assert.equal(a.target.y,25);assert.equal(b.target.y,65);assert.ok(a.position.x<a.target.x&&a.position.z<a.target.z,'illustrative afternoon sun is northwest');
 }
 const day=campusSunPose('day',0,0,0),golden=campusSunPose('golden',0,0,0);assert.ok(golden.position.y<day.position.y);
});
test('sky background, reflected environment and light colours switch as a single profile',()=>{
 const h=harness(),sun=h.scene.children.find(c=>c.isDirectionalLight),fill=h.scene.children.find(c=>c.isHemisphereLight),day=h.scene.environment;
 assert.equal(h.scene.environment.sourceSky,h.scene.background);assert.deepEqual(h.scene.background.stops,CAMPUS_LIGHTING.day.sky);
 assert.equal(h.lighting.setMode('golden'),'golden');assert.notEqual(h.scene.environment,day);assert.equal(h.scene.environment.sourceSky,h.scene.background);assert.deepEqual(h.scene.background.stops,CAMPUS_LIGHTING.golden.sky);assert.equal(sun.color.getHexString(),CAMPUS_LIGHTING.golden.sun.slice(1));assert.equal(fill.groundColor.getHexString(),CAMPUS_LIGHTING.golden.groundLight.slice(1));assert.equal(h.scene.environmentIntensity,CAMPUS_LIGHTING.golden.environmentIntensity);
 h.lighting.setMode('day');assert.equal(h.scene.environment,day);assert.equal(h.scene.environment.sourceSky,h.scene.background);assert.equal(fill.color.getHexString(),CAMPUS_LIGHTING.day.skyLight.slice(1));h.lighting.dispose();
});
test('repeated time changes reuse at most two GPU environment pairs and release ownership on destroy',()=>{
 const h=harness();for(let i=0;i<30;i++)h.lighting.setMode(i%2?'day':'golden');assert.equal(h.skies.length,2);assert.equal(h.targets.length,2);assert.ok(h.targets.every(t=>t.disposals===0));h.lighting.dispose();h.lighting.dispose();assert.ok(h.targets.every(t=>t.disposals===1));assert.ok(h.skies.every(t=>t.disposals===1));assert.equal(h.generatorDisposals,1);assert.equal(h.scene.background,null);assert.equal(h.scene.environment,null);assert.equal(h.scene.children.length,0);h.lighting.setMode('golden');assert.equal(h.targets.length,2);
});
test('daylight fill and lower sky avoid the former uniform green ambient cast',()=>{
 for(const profile of Object.values(CAMPUS_LIGHTING)){const ground=new THREE.Color(profile.groundLight),lowerSky=new THREE.Color(profile.sky.at(-1)[1]);assert.ok(ground.r>=ground.g&&ground.g>=ground.b);assert.ok(lowerSky.r>=lowerSky.g&&lowerSky.g>=lowerSky.b);}
 const stops=[];let bounds=null;paintCampusSky({createLinearGradient:()=>({addColorStop:(p,c)=>stops.push([p,c])}),fillRect:(...v)=>bounds=v},1024,512,'day');assert.deepEqual(bounds,[0,0,1024,512]);assert.equal(stops[0][0],0);assert.equal(stops.at(-1)[0],1);assert.ok(stops.every(([p],i)=>i===0||p>stops[i-1][0]));
});
test('moving the shadow anchor translates sun and target together without disturbing mode resources',()=>{
 const h=harness(),sun=h.scene.children.find(c=>c.isDirectionalLight);h.lighting.setMode('golden');const env=h.scene.environment;h.lighting.setSunAnchor(500,-130,61.2);const p=campusSunPose('golden',500,-130,61.2);assert.deepEqual(sun.position.toArray(),[p.position.x,p.position.y,p.position.z]);assert.deepEqual(sun.target.position.toArray(),[500,61.2,-130]);assert.equal(h.scene.environment,env);assert.equal(h.targets.length,2);h.lighting.dispose();
});
