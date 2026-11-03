// Illustrative Sydney afternoon lighting, guided by campus photographs.
// These profiles are artistic fits, not measured irradiance or a solar clock.
export const CAMPUS_LIGHTING={
 day:{sun:'#fff7ed',sunIntensity:2.8,skyLight:'#dce9f7',groundLight:'#a29b90',fill:1.05,environmentIntensity:.72,fog:'#cfdee8',sunOffset:{x:-110,y:155,z:-75},sky:[[0,'#5487bb'],[.30,'#98b8d4'],[.48,'#d7e3eb'],[.53,'#c6c3ba'],[1,'#86817a']]},
 golden:{sun:'#ffd1a2',sunIntensity:2.6,skyLight:'#cbd8ed',groundLight:'#a69683',fill:.82,environmentIntensity:.58,fog:'#d7c8b7',sunOffset:{x:-130,y:62,z:-45},sky:[[0,'#6883a6'],[.30,'#aeb9c7'],[.48,'#ead6b9'],[.53,'#b6a18a'],[1,'#796c5f']]},
};
export const campusLightingMode=value=>value==='golden'?'golden':'day';
export function campusSunPose(mode,x,z,ground){
 const offset=CAMPUS_LIGHTING[campusLightingMode(mode)].sunOffset;
 return {position:{x:x+offset.x,y:ground+offset.y,z:z+offset.z},target:{x,y:ground,z}};
}
export function paintCampusSky(ctx,width,height,mode){
 const profile=CAMPUS_LIGHTING[campusLightingMode(mode)],gradient=ctx.createLinearGradient(0,0,0,height);
 for(const [position,color] of profile.sky)gradient.addColorStop(position,color);
 ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
}

// Cache one sky / PMREM pair per mode. Repeated toggles reuse GPU resources,
// while the background and standard-material environment always stay paired.
export function createCampusLighting({THREE,renderer,scene,canvasTexture}){
 const hemisphere=new THREE.HemisphereLight('#ffffff','#ffffff',1),sunlight=new THREE.DirectionalLight('#ffffff',1),pmrem=new THREE.PMREMGenerator(renderer),cache=new Map();
 sunlight.castShadow=true;sunlight.shadow.mapSize.set(2048,2048);
 Object.assign(sunlight.shadow.camera,{left:-105,right:105,top:105,bottom:-105,near:1,far:420});
 sunlight.shadow.bias=-.00025;sunlight.shadow.normalBias=.08;sunlight.shadow.radius=3;
 scene.add(hemisphere,sunlight,sunlight.target);scene.fog=new THREE.Fog('#cfdee8',170,850);
 let mode='day',anchor={x:0,z:0,ground:0},disposed=false;
 const setSunAnchor=(x,z,ground)=>{
  if(disposed)return;
  anchor={x,z,ground};const pose=campusSunPose(mode,x,z,ground);
  sunlight.position.set(pose.position.x,pose.position.y,pose.position.z);
  sunlight.target.position.set(pose.target.x,pose.target.y,pose.target.z);sunlight.target.updateMatrixWorld();
 };
 const setMode=value=>{
  if(disposed)return mode;
  mode=campusLightingMode(value);const profile=CAMPUS_LIGHTING[mode];
  if(!cache.has(mode)){
   const sky=canvasTexture(1024,512,(ctx,w,h)=>paintCampusSky(ctx,w,h,mode));sky.mapping=THREE.EquirectangularReflectionMapping;
   cache.set(mode,{sky,environment:pmrem.fromEquirectangular(sky)});
  }
  const resource=cache.get(mode);
  scene.background=resource.sky;scene.environment=resource.environment.texture;scene.environmentIntensity=profile.environmentIntensity;
  scene.fog.color.set(profile.fog);sunlight.color.set(profile.sun);sunlight.intensity=profile.sunIntensity;
  hemisphere.color.set(profile.skyLight);hemisphere.groundColor.set(profile.groundLight);hemisphere.intensity=profile.fill;
  setSunAnchor(anchor.x,anchor.z,anchor.ground);return mode;
 };
 const dispose=()=>{
  if(disposed)return;disposed=true;
  for(const {sky,environment} of cache.values()){
   if(scene.background===sky)scene.background=null;if(scene.environment===environment.texture)scene.environment=null;
   environment.dispose();sky.dispose();
  }
  cache.clear();pmrem.dispose();sunlight.shadow.dispose();scene.remove(hemisphere,sunlight,sunlight.target);
 };
 setMode('day');return {setMode,setSunAnchor,dispose};
}
