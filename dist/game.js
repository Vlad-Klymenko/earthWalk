import * as THREE from './vendor/three.module.js?v=74cfa9848604';
import { terrainHeight, buildingBase, TERRAIN_GRID } from './terrain.js?v=74cfa9848604';
import { buildingAppearance } from './visual-data.js?v=74cfa9848604';
import { BUILDING_PARTS } from './building-parts.js?v=74cfa9848604';
import { CAMPUS_DETAILS } from './campus-details.js?v=74cfa9848604';
import { VILLAGE_SPORTS } from './sports-data.js?v=74cfa9848604';
import { theatreGeometry, newCollegeRoof } from './architecture-data.js?v=74cfa9848604';
import { NIDA_PARTS } from './nida-parts.js?v=74cfa9848604';
import { CHEMICAL_PARTS } from './chemical-parts.js?v=74cfa9848604';
import { tubeFaces } from './structure-data.js?v=74cfa9848604';
import { clancyGeometry, chancelleryGeometry } from './upper-campus-data.js?v=74cfa9848604';
import { CHANCELLERY_ROOFS } from './chancellery-roofs.js?v=74cfa9848604';
import { bioscienceGeometry, mathewsTheatreGeometry } from './bioscience-data.js?v=74cfa9848604';
import { BIOSCIENCE_PARTS } from './bioscience-parts.js?v=74cfa9848604';
import { medicalGeometry } from './medical-data.js?v=74cfa9848604';
import { sirfGeometry, agsmGeometry } from './eastern-landmarks-data.js?v=74cfa9848604';
import { civilGeometry, patriciaGeometry, lectureFacadeRing } from './lecture-precinct-data.js?v=74cfa9848604';
import { samuelsGeometry, goodsellGeometry } from './eastern-faculty-data.js?v=74cfa9848604';
import { MEDICAL_PARTS, MEDICAL_GROUND_FLOORS } from './medical-parts.js?v=74cfa9848604';
import { RESIDENTIAL_PARTS } from './residential-parts.js?v=74cfa9848604';
import { heritageGeometry, whiteHouseStair, goldsteinGeometry } from './heritage-data.js?v=74cfa9848604';
import { scienceTheatreGeometry, modernFacadeFrame, scienceTheatreFoundation, websterTheatresGeometry } from './modernism-data.js?v=74cfa9848604';
import { orientedFrame, framePoint, frameRectangle, roundedFrameRectangle, clipFrameStrip } from './geometry.js?v=74cfa9848604';

// Everything is measured in metres. East is +x; south is +z.
const UP = new THREE.Vector3(0, 1, 0);
const TAU = Math.PI * 2;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const distance2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const point = (p) => Array.isArray(p) ? { x: p[0], z: p[1] } : p;

function polygonArea(points) {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    area += a.x * b.z - b.x * a.z;
  }
  return area / 2;
}

function inPolygon(x, z, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if (((a.z > z) !== (b.z > z)) && x < (b.x - a.x) * (z - a.z) / (b.z - a.z) + a.x) inside = !inside;
  }
  return inside;
}

function nearestOnSegment(x, z, a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const t = clamp(((x - a.x) * dx + (z - a.z) * dz) / (dx * dx + dz * dz || 1), 0, 1);
  return { x: a.x + dx * t, z: a.z + dz * t, t };
}

function circleTouchesPolygon(x, z, radius, points, holes = []) {
  if (inPolygon(x, z, points) && !holes.some(hole => inPolygon(x, z, hole))) return true;
  for (const loop of [points, ...holes]) {
    for (let i = 0; i < loop.length; i++) {
      const q = nearestOnSegment(x, z, loop[i], loop[(i + 1) % loop.length]);
      if (Math.hypot(x - q.x, z - q.z) < radius) return true;
    }
  }
  return false;
}

function extent(points) {
  const xs = points.map(p => p.x), zs = points.map(p => p.z);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minZ = Math.min(...zs), maxZ = Math.max(...zs);
  return { minX, maxX, minZ, maxZ, x: (minX + maxX) / 2, z: (minZ + maxZ) / 2, width: maxX - minX, depth: maxZ - minZ };
}

function rng(seed = 48271) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
}

// Small triangle batches keep the campus inexpensive even with all its windows.
class Batch {
  constructor() { this.positions = []; this.colors = []; this.uvs = []; this.base = null; }
  triangle(a, b, c, color, uv = null) {
    const col = color instanceof THREE.Color ? color : new THREE.Color(color);
    for (let i = 0; i < 3; i++) {
      const p = [a, b, c][i];
      this.positions.push(p[0], p[1] + (this.base ?? terrainHeight(p[0],p[2])), p[2]);
      this.colors.push(col.r, col.g, col.b);
      this.uvs.push(...(uv?.[i] || [p[0] / 2, p[2] / 2]));
    }
  }
  quad(a, b, c, d, color, uv = null) { this.triangle(a, b, c, color, uv && [uv[0],uv[1],uv[2]]); this.triangle(a, c, d, color, uv && [uv[0],uv[2],uv[3]]); }
  box(x, y, z, width, height, depth, color, angle = 0) {
    const co = Math.cos(angle), si = Math.sin(angle);
    const v = (a, b, c) => [x + a * co + c * si, y + b, z - a * si + c * co];
    const w = width / 2, h = height / 2, d = depth / 2;
    const a = v(-w,-h,-d), b = v(w,-h,-d), c = v(w,h,-d), e = v(-w,h,-d);
    const f = v(-w,-h,d), g = v(w,-h,d), i = v(w,h,d), j = v(-w,h,d);
    this.quad(a,e,c,b,color); this.quad(f,g,i,j,color); this.quad(a,f,j,e,color);
    this.quad(b,c,i,g,color); this.quad(e,j,i,c,color); this.quad(a,b,g,f,color);
  }
  mesh(material, castShadow = true) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(this.uvs, 2));
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = castShadow; mesh.receiveShadow = true;
    return mesh;
  }
}

function polygon(batch, points, y, color, holes = []) {
  if (points.length < 3) return;
  const contour = points.map(p => new THREE.Vector2(p.x, p.z));
  const holeContours = holes.map(hole => hole.map(p => new THREE.Vector2(p.x, p.z)));
  const allPoints = [...points, ...holes.flat()];
  for (const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour, holeContours)) {
    const vertices = [a,c,b].map(i=>[allPoints[i].x,y,allPoints[i].z]);
    const subdivide=(v,depth=0)=>{
      const lengths=v.map((p,i)=>Math.hypot(p[0]-v[(i+1)%3][0],p[2]-v[(i+1)%3][2]));
      if(batch.base!==null||Math.max(...lengths)<3||depth>11){batch.triangle(...v,color);return;}
      const edge=lengths.indexOf(Math.max(...lengths)),next=(edge+1)%3,other=(edge+2)%3;
      const mid=v[edge].map((n,i)=>(n+v[next][i])/2);
      subdivide([v[edge],mid,v[other]],depth+1);subdivide([mid,v[next],v[other]],depth+1);
    };
    subdivide(vertices);
  }
}

function shapedRoof(batch,points,heightAt,color){
  const contour=points.map(p=>new THREE.Vector2(p.x,p.z));
  const triangle=(a,b,c)=>{
    if(Math.max(distance2(a,b),distance2(b,c),distance2(c,a))>.65){
      const ab={x:(a.x+b.x)/2,z:(a.z+b.z)/2},bc={x:(b.x+c.x)/2,z:(b.z+c.z)/2},ca={x:(c.x+a.x)/2,z:(c.z+a.z)/2};
      triangle(a,ab,ca);triangle(ab,b,bc);triangle(ca,bc,c);triangle(ab,bc,ca);return;
    }
    batch.triangle(...[a,b,c].map(p=>[p.x,heightAt(p),p.z]),color);
  };
  for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour,[]))triangle(points[a],points[c],points[b]);
}

function batchBeam(batch,a,b,r,color){
  for(const face of tubeFaces(a,b,r,4,false))batch.quad(...face,color);
}

function batchPipe(batch,a,b,r,color){
  for(const face of tubeFaces(a,b,r,8,true)){
    if(face.length===3)batch.triangle(...face,color);else batch.quad(...face,color);
  }
}

function ribbon(batch, points, width, y, color) {
  if(points.length<2)return;
  const sampled=[];
  for(let i=0;i<points.length-1;i++){
    const a=points[i],b=points[i+1],count=Math.max(1,Math.ceil(distance2(a,b)));
    for(let k=0;k<count;k++)sampled.push({x:a.x+(b.x-a.x)*k/count,z:a.z+(b.z-a.z)*k/count});
  }
  sampled.push(points.at(-1));
  const across=Math.max(1,Math.ceil(width)),rows=[];
  for(let i=0;i<sampled.length;i++){
    const p=sampled[i],a=sampled[Math.max(0,i-1)],b=sampled[Math.min(sampled.length-1,i+1)];
    const dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz)||1,nx=-dz/length,nz=dx/length;
    const row=[];
    for(let j=0;j<=across;j++){const offset=(j/across-.5)*width;row.push([p.x+nx*offset,y,p.z+nz*offset]);}
    rows.push(row);
  }
  for(let i=0;i<rows.length-1;i++)for(let j=0;j<across;j++)batch.quad(rows[i][j+1],rows[i+1][j+1],rows[i+1][j],rows[i][j],color);
}

function canvasTexture(width, height, draw) {
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function brickTexture() {
  return canvasTexture(512, 512, (ctx) => {
    const random = rng(17);
    ctx.fillStyle = '#a9a296'; ctx.fillRect(0,0,512,512);
    for (let row = 0; row < 16; row++) {
      for (let col = -1; col < 9; col++) {
        const l = 50 + random()*13;
        ctx.fillStyle = `hsl(${19+random()*8} 26% ${l}%)`;
        ctx.fillRect(col*64+(row%2)*32+1,row*32+1,62,30);
      }
    }
    ctx.fillStyle = '#fff2';
    for (let i = 0; i < 8000; i++) ctx.fillRect(random()*512,random()*512,1,1);
  });
}

function clinkerTexture() {
  return canvasTexture(512,512,ctx=>{
    const random=rng(718);ctx.fillStyle='#a9a9a1';ctx.fillRect(0,0,512,512);
    const bh=512/26,bw=512/9;
    for(let row=0;row<26;row++)for(let col=-1;col<10;col++){
      const light=71+Math.floor(random()*4)*4+random()*3;
      ctx.fillStyle=`hsl(${24+random()*12} ${3+random()*9}% ${light}%)`;
      ctx.fillRect(col*bw+(row%2)*bw/2+.8,row*bh+.8,bw-1.6,bh-1.6);
    }
    for(let i=0;i<14000;i++){ctx.fillStyle=random()>.5?'#ffffff18':'#34332d15';ctx.fillRect(random()*512,random()*512,1,1);}
  });
}

function copperShingles(){
  const texture=canvasTexture(512,512,ctx=>{
    const random=rng(390);ctx.fillStyle='#c4a256';ctx.fillRect(0,0,512,512);
    for(let row=-1;row<10;row++)for(let col=-1;col<10;col++){
      const x=col*64+(row%2)*32,y=row*32,light=51+random()*15;
      ctx.beginPath();ctx.moveTo(x,y-32);ctx.lineTo(x+32,y);ctx.lineTo(x,y+32);ctx.lineTo(x-32,y);ctx.closePath();
      ctx.fillStyle=`hsl(${39+random()*7} ${42+random()*17}% ${light}%)`;ctx.fill();ctx.strokeStyle='#7e622c88';ctx.lineWidth=1;ctx.stroke();
    }
  });texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;return texture;
}

const surfaceCache = new Map();
function surfaceTexture(kind) {
  if(surfaceCache.has(kind))return surfaceCache.get(kind);
  const texture=canvasTexture(512,512,ctx=>{
    const random=rng(kind==='brick'?200:kind==='paving'?300:400);
    ctx.fillStyle=kind==='brick'?'#b6b3a7':kind==='grass'?'#a7b195':'#d7d6cc';ctx.fillRect(0,0,512,512);
    if(kind==='paving'||kind==='brick'){
      const rows=kind==='brick'?24:5,cols=kind==='brick'?9:3,bw=512/cols,bh=512/rows;
      for(let row=0;row<rows;row++)for(let col=-1;col<cols+1;col++){
        const light=(kind==='brick'?80:82)+random()*12;
        ctx.fillStyle=`hsl(${kind==='brick'?33:28} ${kind==='brick'?9:7}% ${light}%)`;
        ctx.fillRect(col*bw+(row%2)*bw/2+1,row*bh+1,bw-2,bh-2);
      }
    }
    if(kind==='bark')for(let i=0;i<180;i++){
      ctx.fillStyle=['#a9a99b','#8e9487','#c0bfb0','#aaa491'][i%4];ctx.beginPath();ctx.ellipse(random()*512,random()*512,8+random()*25,15+random()*70,random(),0,TAU);ctx.fill();
    }
    if(kind==='aggregate')for(let i=0;i<42000;i++){
      const light=42+random()*50;ctx.fillStyle=`hsl(${27+random()*12} ${5+random()*12}% ${light}%)`;
      ctx.fillRect(random()*512,random()*512,.5+random()*2,.5+random()*2);
    }
    for(let i=0;i<24000;i++){
      const c=kind==='grass'?90+random()*80:random()>.5?255:70;
      ctx.fillStyle=kind==='grass'?`rgba(${c*.8},${c},${c*.63},.2)`:`rgba(${c},${c},${c},${kind==='concrete'?.05:.07})`;
      ctx.fillRect(random()*512,random()*512,random()*2+.4,kind==='grass'?random()*5+1:random()*2+.4);
    }
    if(kind==='concrete'){
      ctx.strokeStyle='#77777717';ctx.lineWidth=1;
      for(let y=0;y<512;y+=128){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(512,y);ctx.stroke();}
    }
  });
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;surfaceCache.set(kind,texture);return texture;
}

function foliageTexture(){
  return canvasTexture(256,256,ctx=>{
    const random=rng(620);ctx.clearRect(0,0,256,256);
    for(let i=0;i<95;i++){
      const a=random()*TAU,r=Math.sqrt(random())*105,x=128+Math.cos(a)*r,y=128+Math.sin(a)*r;
      const light=40+random()*36;ctx.fillStyle=`hsl(${82+random()*18} ${18+random()*13}% ${light}%)`;
      ctx.beginPath();ctx.ellipse(x,y,3+random()*5,6+random()*7,random()*TAU,0,TAU);ctx.fill();
      ctx.strokeStyle='#4e674c66';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(x,y-5);ctx.lineTo(x,y+5);ctx.stroke();
    }
  });
}

function textTexture(title, subtitle = '') {
  return canvasTexture(640,1024,(ctx,w,h)=>{
    ctx.fillStyle='#293b3b';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e0b844';ctx.fillRect(0,0,22,h);
    ctx.fillStyle='#f0f0e7';ctx.font='700 65px sans-serif';ctx.fillText('UNSW',60,118);
    ctx.fillStyle='#e0b844';ctx.font='600 52px sans-serif';ctx.fillText(subtitle||'KENSINGTON',60,210,520);
    ctx.strokeStyle='#9ca39b66';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(60,270);ctx.lineTo(580,270);ctx.stroke();
    ctx.fillStyle='#f1f1e8';ctx.font='500 56px sans-serif';let line='',y=365;
    for(const word of title.split(' ')){
      if(ctx.measureText(line+word).width>510&&line){ctx.fillText(line,60,y);y+=78;line='';}
      line+=word+' ';
    }
    ctx.fillText(line,60,y);ctx.font='42px sans-serif';ctx.fillText('Campus map',60,900);ctx.fillText('↗',520,900);
  });
}

export function createGame({ canvas, minimap, onUpdate = () => {}, onError = () => {} }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .94;
  const scene = new THREE.Scene();
  const skyTexture=canvasTexture(1024,512,(ctx,w,h)=>{
    const gradient=ctx.createLinearGradient(0,0,0,h);gradient.addColorStop(0,'#5f91bd');gradient.addColorStop(.46,'#cbdbe1');gradient.addColorStop(.51,'#c8c6b5');gradient.addColorStop(1,'#66715e');ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
  });
  skyTexture.mapping=THREE.EquirectangularReflectionMapping;
  const pmrem=new THREE.PMREMGenerator(renderer),environmentMap=pmrem.fromEquirectangular(skyTexture);scene.environment=environmentMap.texture;pmrem.dispose();
  scene.background = skyTexture; scene.fog = new THREE.Fog('#c6d8df', 170, 850);
  const camera = new THREE.PerspectiveCamera(68, 1, .08, 950); camera.rotation.order = 'YXZ';
  const hemisphere = new THREE.HemisphereLight('#e3f0ff', '#8b916f', 1.5); scene.add(hemisphere);
  const sunlight = new THREE.DirectionalLight('#fff0cf', 2.25);
  sunlight.position.set(-100,150,65); sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(2048,2048);
  Object.assign(sunlight.shadow.camera, { left:-105,right:105,top:105,bottom:-105,near:1,far:420 });
  sunlight.shadow.bias = -.00025; sunlight.shadow.normalBias = .08; sunlight.shadow.radius = 3;
  scene.add(sunlight,sunlight.target);

  let world = new THREE.Group(); scene.add(world);
  let stairSegments=[],surfaceCells=new Map(),groundPatches=[];
  let campus = null, buildings = [], paths = [], greens = [], landmarks = [], bounds = null;
  let colliders = [], spatial = new Map(), spawn = {x:0,z:0,heading:Math.PI/2};
  let paused = true, hidden = false, destroyed = false, locked = false, dragging = false, timeOfDay = 'day', hasStarted = false;
  let player = {x:0,y:0,z:0,vx:0,vz:0,vy:0,heading:Math.PI/2,pitch:0,grounded:true};
  let totalDistance = 0, lastFrame = performance.now(), reportTime = 0, elapsed = 0, animation = 0;
  let curiosities = [], found = new Set(), ball = null, ballSpawn = null, lastInteraction = '';
  let minimapBase = null, minimapInfo = null, shadowAnchor = { x:1e6,z:1e6 };
  const campusReflections=[];
  const inputs = {forward:false,backward:false,left:false,right:false,sprint:false};
  const listeners = [];
  const listen = (target,type,fn,options) => { target.addEventListener(type,fn,options); listeners.push(() => target.removeEventListener(type,fn,options)); };
  const style = (color, extras={}) => new THREE.MeshStandardMaterial({color,roughness:.88,flatShading:false,envMapIntensity:.35,...extras});
  const pointCache = new WeakMap();
  const validPoints = (item) => {
    if(pointCache.has(item))return pointCache.get(item);
    const points=(item.points || item.polygon || item.coordinates || []).map(point).filter(p => Number.isFinite(p.x) && Number.isFinite(p.z));
    pointCache.set(item,points);return points;
  };

  function addCollider(c) {
    const e = c.points ? extent(c.points) : {minX:c.x-c.radius,maxX:c.x+c.radius,minZ:c.z-c.radius,maxZ:c.z+c.radius};
    const base=c.base ?? (c.points?buildingBase(c.points):terrainHeight(c.x,c.z));
    c.bottom=(c.bottom||0)+base;c.top=(c.top||100)+base;
    c.extent = e; const index = colliders.push(c)-1;
    for (let x = Math.floor(e.minX/20); x <= Math.floor(e.maxX/20); x++) {
      for (let z = Math.floor(e.minZ/20); z <= Math.floor(e.maxZ/20); z++) {
        const key = `${x},${z}`; if (!spatial.has(key)) spatial.set(key,[]); spatial.get(key).push(index);
      }
    }
  }

  function nearbyColliders(x,z,radius=.5) {
    const result = new Set();
    for (let gx=Math.floor((x-radius)/20);gx<=Math.floor((x+radius)/20);gx++) {
      for (let gz=Math.floor((z-radius)/20);gz<=Math.floor((z+radius)/20);gz++) {
        for (const index of spatial.get(`${gx},${gz}`)||[]) result.add(colliders[index]);
      }
    }
    return result;
  }

  function blocked(x,z,y=null,radius=.34) {
    y=y??terrainHeight(x,z);
    if (!bounds || x < bounds.minX+1 || x > bounds.maxX-1 || z < bounds.minZ+1 || z > bounds.maxZ-1) return true;
    for (const c of nearbyColliders(x,z,radius)) {
      if (y >= colliderTop(c,x,z)-(c.stepHeight||.1) || y+1.65 <= colliderBottom(c,x,z)+.03) continue;
      if (c.points ? circleTouchesPolygon(x,z,radius,c.points,c.holes) : Math.hypot(x-c.x,z-c.z) < radius+c.radius) return true;
    }
    return false;
  }

  function colliderTop(c,x,z){return c.terrainOffset!==undefined?terrainHeight(x,z)+c.terrainOffset:c.top;}
  function colliderBottom(c,x,z){return c.terrainBottom!==undefined?terrainHeight(x,z)+c.terrainBottom:(c.bottom||0);}

  function clearInputs() { for (const key in inputs) inputs[key]=false; dragging=false; }
  function surfaceHeight(x,z){
    for(const s of stairSegments){
      const q=nearestOnSegment(x,z,s.a,s.b);
      if(Math.hypot(x-q.x,z-q.z)<=s.width/2+.04){
        return s.h0+(s.h1-s.h0)*Math.floor(q.t*s.count)/s.count+.06;
      }
    }
    let offset=0;
    for(const plaza of campus?.plazas||[])if(plaza.surface==='stone'&&inPolygon(x,z,plaza.points)&&!(plaza.holes||[]).some(h=>inPolygon(x,z,h)))offset=.22;
    for(const garden of greens)if(garden.raisedBy&&inPolygon(x,z,garden.points))offset=Math.max(offset,garden.raisedBy);
    for(const s of surfaceCells.get(`${Math.floor(x/20)},${Math.floor(z/20)}`)||[]){
      const q=nearestOnSegment(x,z,s.a,s.b);
      if(Math.hypot(x-q.x,z-q.z)<=s.width/2)offset=Math.max(offset,s.road?.055:.22);
    }
    let height=terrainHeight(x,z)+offset;
    for(const patch of groundPatches)if(inPolygon(x,z,patch.points))height=Math.max(height,patch.heightAt(x,z));
    return height;
  }
  function safePoint(desired) {
    if (!blocked(desired.x,desired.z)) return desired;
    for (let radius=1;radius<90;radius+=radius<10?1:2) for (let i=0;i<24;i++) {
      const p={...desired,x:desired.x+Math.cos(i/24*TAU)*radius,z:desired.z+Math.sin(i/24*TAU)*radius};
      if (!blocked(p.x,p.z)) return p;
    }
    return {...spawn};
  }

  function groundAndPaths() {
    const grid=TERRAIN_GRID,pad=65,gx=grid.cols-1+pad*2,gz=grid.rows-1+pad*2;
    const groundGeo=new THREE.PlaneGeometry(gx*grid.dx,gz*grid.dz,gx,gz);groundGeo.rotateX(-Math.PI/2);groundGeo.translate(grid.x0+(grid.cols-1)*grid.dx/2,0,grid.z0+(grid.rows-1)*grid.dz/2);
    const groundVertices=groundGeo.getAttribute('position');
    for(let i=0;i<groundVertices.count;i++)groundVertices.setY(i,terrainHeight(groundVertices.getX(i),groundVertices.getZ(i))-.08);
    groundGeo.computeVertexNormals();
    const groundTexture=surfaceTexture('grass');groundTexture.repeat.set(280,190);
    const ground = new THREE.Mesh(groundGeo,style('#82916b',{map:groundTexture,flatShading:false}));
    ground.receiveShadow=true; world.add(ground);
    const landscape = new Batch(), paving = new Batch(), asphalt = new Batch(), edges = new Batch(),stairs=new Batch(),rails=new Batch();
    stairs.base=rails.base=0;
    for (const green of greens) {
      const pts=validPoints(green); if (pts.length<3) continue;
      const sport=/pitch|sport|village|field/i.test(`${green.kind} ${green.name} ${green.id}`);
      polygon(landscape,pts,green.raisedBy||.005,sport?'#739a70':'#9daf89');
      if(green.raisedBy)addCollider({points:pts,top:green.raisedBy,base:0,terrainOffset:green.raisedBy});
    }
    for(const plaza of campus.plazas||[])polygon(plaza.surface==='stone'?paving:edges,validPoints(plaza),plaza.surface==='stone'?.22:.022,plaza.color||'#d6d1c6',plaza.holes||[]);
    for (const path of paths) {
      const pts=validPoints(path); if(pts.length<2) continue;
      const road=/road|service|residential|street/i.test(path.kind || path.type || '');
      const width=path.width || (/mall/i.test(path.name||'')?12:road?7:3.4);
      if(path.kind!=='steps')ribbon(edges,pts,width+.5,.035,road?'#d9d6c7':'#b0aea0');
      if(path.kind!=='steps')ribbon(road?asphalt:paving,pts,width,road?.055:.22,road?'#666b69':'#b9b6b0');
      if(/mall/i.test(path.name||'')){
        for(let i=0;i<pts.length-1;i++){
          const a=pts[i],b=pts[i+1],len=distance2(a,b),nx=-(b.z-a.z)/(len||1),nz=(b.x-a.x)/(len||1);
          for(let d=5;d<len;d+=6){const x=a.x+(b.x-a.x)*d/len,z=a.z+(b.z-a.z)*d/len;ribbon(edges,[{x:x-nx*width/2,z:z-nz*width/2},{x:x+nx*width/2,z:z+nz*width/2}],.14,.163,'#6b7370');}
        }
      }
    }
    for(const s of stairSegments){
      const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len;
      for(let i=0;i<s.count;i++){
        const t=i/s.count,u=(i+1)/s.count,h=s.h0+(s.h1-s.h0)*t+.05,previous=s.h0+(s.h1-s.h0)*Math.max(0,i-1)/s.count+.05;
        const p=(v,side,y)=>[s.a.x+dx*v+nx*s.width/2*side,y,s.a.z+dz*v+nz*s.width/2*side];
        stairs.quad(p(t,1,h),p(u,1,h),p(u,-1,h),p(t,-1,h),'#b5b3a7');
        stairs.quad(p(t,1,previous),p(t,1,h),p(t,-1,h),p(t,-1,previous),'#93958c');
      }
      if(Math.abs(s.h1-s.h0)>1.1&&len>5)for(const side of [-1,1]){
        for(let d=0;d<=len;d+=2.5){const t=d/len,x=s.a.x+dx*t+nx*(s.width/2-.2)*side,z=s.a.z+dz*t+nz*(s.width/2-.2)*side;rails.box(x,s.h0+(s.h1-s.h0)*t+.5,z,.055,1,.055,'#727c78');}
      }
    }
    const texture=surfaceTexture('paving');
    const lawnTexture=surfaceTexture('grass').clone();lawnTexture.repeat.set(1,1);
    world.add(landscape.mesh(style('#ffffff',{vertexColors:true,map:lawnTexture,bumpMap:lawnTexture,bumpScale:.018}),false));
    world.add(edges.mesh(style('#ffffff',{vertexColors:true}),false));
    world.add(paving.mesh(style('#ffffff',{map:texture,bumpMap:texture,bumpScale:.035,vertexColors:true}),false));
    world.add(asphalt.mesh(style('#ffffff',{vertexColors:true}),false));
    world.add(stairs.mesh(style('#ffffff',{vertexColors:true})),rails.mesh(style('#ffffff',{vertexColors:true,metalness:.3})));
  }

  function wallPanel(batch,a,b,bottom,top,color,offset=0,start=0,end=1) {
    const dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz)||1;
    const nx=dz/length, nz=-dx/length;
    const p=(t,y)=>[a.x+dx*t+nx*offset,y,a.z+dz*t+nz*offset];
    batch.quad(p(start,bottom),p(start,top),p(end,top),p(end,bottom),color,[[length*start/2,bottom/2],[length*start/2,top/2],[length*end/2,top/2],[length*end/2,bottom/2]]);
  }

  function ceramicScreen(a,b,height,glass,detail,profile) {
    // Photo-led Ainsworth reconstruction: five pleated screen rows above glazing.
    // Panel pitch and storey heights are estimates, not measured facade drawings.
    const dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),nx=dz/len,nz=-dx/len;
    const p=(t,y,off)=>[a.x+dx*t+nx*off,y,a.z+dz*t+nz*off];
    const ground=5.4,storey=(height-ground)/5,bays=Math.max(1,Math.round(len/1.45));
    wallPanel(glass,a,b,.5,height-.3,profile.glass,.07,.01,.99);
    wallPanel(detail,a,b,1.1,2.05,'#8b3931',.08,.02,.98);
    for(let d=1.5;d<len;d+=2.9)wallPanel(detail,a,b,.5,ground,'#697e7d',.13,(d-.04)/len,(d+.04)/len);
    const shades=['#d3aa7d','#bb825f','#b98a65','#d8ba8c','#bd956e','#ce9d74'];
    for(let floor=0;floor<5;floor++){
      const low=ground+floor*storey,high=ground+(floor+1)*storey-.16;
      wallPanel(detail,a,b,low-.12,low+.02,'#a9aeaa',.52,.005,.995);
      for(let bay=0;bay<bays;bay++){
        const t0=(bay+.03)/bays,t1=(bay+.95)/bays,rows=Math.ceil((high-low)/.20);
        for(let row=0;row<rows;row++){
          const y=low+(high-low)*row/rows,top=low+(high-low)*(row+1)/rows-.015;
          const shade=shades[(row+bay*3+floor)%shades.length];
          detail.quad(p(t0,y,.18),p(t0,top,.18),p(t1,top,.45),p(t1,y,.45),shade);
          const end=(bay+.98)/bays;
          detail.quad(p(t1,y,.45),p(t1,top,.45),p(end,top,.18),p(end,y,.18),shade);
        }
        detail.quad(p(t1,low,.45),p(t1,high,.45),p(t1+.015/bays,high,.45),p(t1+.015/bays,low,.45),'#626e69');
      }
    }
    wallPanel(detail,a,b,ground-.3,ground,'#5b6c6b',.7);
  }

  function collegeFacade(b,a,c,profile,brick,glass,detail) {
    // Room rhythm and balcony depths are reconstructed from the architect's
    // journal, contractor aerial and public courtyard Street View, not surveyed.
    const dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz),nx=dz/len,nz=-dx/len;
    const midpoint={x:(a.x+c.x)/2,z:(a.z+c.z)/2};
    const inner=profile.courtyard&&(profile.courtyard.x-midpoint.x)*nx+(profile.courtyard.z-midpoint.z)*nz>1;
    const color=inner?profile.innerColor:profile.color,floors=profile.floors||6,level=b.height/floors;
    const count=Math.max(1,Math.round(len/3.3)),phase=Math.abs(Math.round((midpoint.x+midpoint.z)/3.3));
    const p=(t,y,off=0)=>[a.x+dx*t+nx*off,y,a.z+dz*t+nz*off];
    const panel=(batch,start,end,low,high,shade,offA=.02,offB=offA)=>{
      batch.quad(p(start,low,offA),p(start,high,offA),p(end,high,offB),p(end,low,offB),shade,
        [[start*len/2,low/2],[start*len/2,high/2],[end*len/2,high/2],[end*len/2,low/2]]);
    };
    wallPanel(brick,a,c,0,b.height,color);
    wallPanel(detail,a,c,0,.48,'#878d83',.03);
    for(let floor=0;floor<floors;floor++){
      const bottom=floor*level,top=(floor+1)*level;
      if(floor===0&&inner&&len>8){
        panel(glass,.02,.98,.45,level-.25,profile.glass,.06);
        for(let d=.6;d<len;d+=5.3){const t=d/len;panel(detail,t-.22/len,t+.22/len,0,level,profile.trim,.78);}
        panel(detail,.005,.995,level-.22,level,profile.trim,.9);
        continue;
      }
      for(let bay=0;bay<count;bay++){
        const start=(bay+.04)/count,end=(bay+.96)/count,width=(end-start)*len;
        const balcony=floor>0&&len>2.5&&(inner?(bay+phase)%3===1:(bay+floor+phase)%4===1);
        const faceted=inner&&!profile.footprintFacets&&count>2;
        const offA=.08,offB=faceted?.7:.08;
        const offset=t=>offA+(offB-offA)*(t-start)/(end-start);
        if(balcony){
          panel(glass,start+.06/count,end-.06/count,bottom+.12,top-.22,'#263b42',.075);
          // Horizontal slab with narrow vertical metal balusters.
          const front=inner?1.05:1.2,back=.07;
          detail.quad(p(start,bottom+.18,back),p(end,bottom+.18,back),p(end,bottom+.18,front),p(start,bottom+.18,front),profile.trim);
          detail.quad(p(start,bottom,back),p(start,bottom,front),p(end,bottom,front),p(end,bottom,back),profile.trim);
          panel(detail,start,end,bottom,bottom+.18,profile.trim,front);
          panel(detail,start,end,bottom+1.23,bottom+1.28,'#424d4d',front);
          for(let d=.05;d<width;d+=.14){const t=start+d/len;panel(detail,t,t+.025/len,bottom+.18,bottom+1.25,'#424d4d',front);}
          if(!inner)for(const side of [start,end]){
            detail.quad(p(side,bottom,back),p(side,top-.2,back),p(side,top-.2,front),p(side,bottom,front),profile.color);
            detail.quad(p(side,bottom,front),p(side,top-.2,front),p(side,top-.2,back),p(side,bottom,back),profile.color);
          }
        }else{
          if(faceted)panel(brick,start,end,bottom+.05,top-.13,color,offA,offB);
          const centre=start+(end-start)*(inner?.72:.48),half=Math.min(.49/len,(end-start)*.22);
          const left=centre-half,right=centre+half,low=bottom+.5,high=top-.3;
          panel(glass,left,right,low,high,profile.glass,offset(left)+.025,offset(right)+.025);
          for(const t of [left,right])panel(detail,t-.035/len,t+.035/len,low-.02,high+.02,'#657472',offset(t)+.05,offset(t)+.05);
          panel(detail,left,right,low-.05,low,'#8a9186',offset(left)+.06,offset(right)+.06);
          panel(detail,centre-.025/len,centre+.025/len,low,high,'#5f716f',offset(centre)+.06);
          if(faceted){
            panel(brick,end,(bay+1)/count,bottom+.05,top-.13,color,offB,.08);
            detail.quad(p(start,top-.12,.03),p(start,top-.12,offA+.2),p(end,top-.12,offB+.2),p(end,top-.12,.03),profile.trim);
            detail.quad(p(start,top,.03),p(end,top,.03),p(end,top,offB+.2),p(start,top,offA+.2),profile.trim);
            panel(detail,start,end,top-.12,top,profile.trim,offA+.2,offB+.2);
          }
        }
      }
      if(inner||profile.footprintFacets)panel(detail,0,1,top-.13,top,profile.trim,.18);
    }
    wallPanel(detail,a,c,b.height-.13,b.height+.25,profile.trim,.23);
    // Light concrete end blades contrast with the brick accommodation wings.
    if(len>12)wallPanel(detail,a,c,0,b.height+.3,'#b6b8ae',.11,0,Math.min(.8/len,.07));
  }

  function collegeRoof(b,profile,detail,roofs){
    const ring=b.points,e=extent(ring),co=Math.cos(.165),si=Math.sin(.165);
    const local=(x,z,centre)=>({x:centre.x+x*co-z*si,z:centre.z+x*si+z*co});
    const garden=profile.roofGarden;
    if(garden){
      const corners=[[-4,-2.5],[4,-2.5],[4,2.5],[-4,2.5]].map(([x,z])=>local(x,z,garden));
      if(corners.every(p=>inPolygon(p.x,p.z,ring))){
        polygon(roofs,corners,b.height+.17,'#84986a');
        for(let i=0;i<4;i++){
          const a=corners[i],c=corners[(i+1)%4],len=distance2(a,c);
          wallPanel(detail,a,c,b.height+.1,b.height+.35,'#bfc1b2');
          wallPanel(detail,a,c,b.height+1.12,b.height+1.17,'#53625f');
          for(let d=.15;d<len;d+=.65){const x=a.x+(c.x-a.x)*d/len,z=a.z+(c.z-a.z)*d/len;detail.box(x,b.height+.74,z,.035,.94,.035,'#53625f');}
        }
        const h=b.height+2.6;
        for(const x of [-1.8,1.8])for(const z of [-1.5,1.5]){const p=local(x,z,garden);detail.box(p.x,b.height+1.38,p.z,.07,2.5,.07,'#969f99');}
        for(let x=-1.8;x<2;x+=.45){const p=local(x,0,garden);detail.box(p.x,h,p.z,.055,.09,3.15,'#a9b1a9',-.165);}
      }
    }
    // Small ventilation terminals are visible in repeated rows in the aerial.
    for(let x=e.minX+4;x<e.maxX-2;x+=6)for(let z=e.minZ+4;z<e.maxZ-2;z+=7){
      if(!inPolygon(x,z,ring)||[[-1,-1],[1,-1],[1,1],[-1,1]].some(([dx,dz])=>!inPolygon(x+dx,z+dz,ring)))continue;
      if(garden&&Math.hypot(x-garden.x,z-garden.z)<6)continue;
      for(let i=0;i<8;i++){
        const a=i/8*TAU,c=(i+1)/8*TAU,low=b.height+.05,high=b.height+.36;
        detail.quad([x+Math.cos(a)*.13,low,z+Math.sin(a)*.13],[x+Math.cos(a)*.13,high,z+Math.sin(a)*.13],[x+Math.cos(c)*.13,high,z+Math.sin(c)*.13],[x+Math.cos(c)*.13,low,z+Math.sin(c)*.13],'#979e96');
        detail.triangle([x,high+.05,z],[x+Math.cos(c)*.23,high,z+Math.sin(c)*.23],[x+Math.cos(a)*.23,high,z+Math.sin(a)*.23],'#b6bcb2');
      }
    }
  }

  function residence(b,profile,brick,glass,detail,roofs){
    const warrane=profile.facade==='warrane',roof=warrane?null:newCollegeRoof(b);
    const top=warrane?b.height:roof.eave,ground=warrane?3.15:2.7;
    const ordered=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ordered.length;i++){
      const a=ordered[i],c=ordered[(i+1)%ordered.length],len=distance2(a,c);if(len<.3)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,off=.1)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      wallPanel(brick,a,c,ground,top,profile.color);
      wallPanel(detail,a,c,0,ground,profile.trim);
      wallPanel(detail,a,c,0,.45,'#8b8e84',.04);
      if(warrane){
        wallPanel(glass,a,c,.5,ground-.35,profile.glass,.08,.02,.98);
        for(let d=.5;d<len;d+=6){wallPanel(detail,a,c,0,ground,profile.trim,.25,d/len,Math.min(1,(d+.3)/len));}
        wallPanel(detail,a,c,ground-.2,ground+.08,profile.trim,.38);
        // Eight accommodation rows over the communal base. Window pairs sit
        // in continuous pale spandrel strips, rather than a generic glass grid.
        const count=Math.max(1,Math.round(len/7.4)),storey=(top-ground)/8;
        for(let bay=0;bay<count;bay++)for(const offset of [-.65,.65]){
          const centre=(bay+.5)/count+offset/len,half=.43/len;
          wallPanel(detail,a,c,ground,top-.25,'#b5b1a0',.055,centre-half,centre+half);
          for(let floor=0;floor<8;floor++){
            const low=ground+floor*storey+.65,high=ground+(floor+1)*storey-.25;
            wallPanel(glass,a,c,low,high,profile.glass,.09,centre-half+.065/len,centre+half-.065/len);
            wallPanel(detail,a,c,low-.08,low,'#ded9c6',.12,centre-half,centre+half);
          }
        }
        wallPanel(detail,a,c,top-.22,top+.04,'#8a8d80',.3);
      }else{
        const storey=(top-ground-2.5)/3,count=Math.max(1,Math.round(len/2.8));
        for(let bay=0;bay<count;bay++){
          const centre=(bay+.5)/count;
          wallPanel(glass,a,c,.55,ground-.5,'#7b9187',.055,centre-.62/len,centre+.62/len);
          wallPanel(detail,a,c,.55,ground-.5,'#bac6b7',.08,centre-.025/len,centre+.025/len);
        }
        for(let floor=0;floor<3;floor++){
          const low=ground+floor*storey,high=low+storey;
          wallPanel(detail,a,c,high-.12,high,'#d0d1c3',.1);
          for(let bay=0;bay<count;bay++){
            const centre=(bay+.5)/count,left=centre-.38/len,right=centre+.38/len;
            wallPanel(detail,a,c,low+.44,high-.35,'#d8d4bd',.055,left-.065/len,right+.065/len);
            wallPanel(glass,a,c,low+.5,high-.42,profile.glass,.08,left,right);
            detail.quad(p(left-.12/len,low+.39,.05),p(right+.12/len,low+.39,.05),p(right+.12/len,low+.39,.46),p(left-.12/len,low+.39,.46),'#d7d4bd');
          }
        }
        const upper=top-2.5;
        wallPanel(detail,a,c,upper,top,'#c1cfb1',.09);
        for(let d=.15;d<len;d+=.35)wallPanel(detail,a,c,upper,top,'#879c82',.12,d/len,Math.min(1,(d+.025)/len));
        for(let bay=0;bay<count;bay++){
          const centre=(bay+.5)/count;
          wallPanel(glass,a,c,upper+.35,top-.35,profile.glass,.15,centre-.38/len,centre+.38/len);
        }
        // The large eastern glass bay is visible in UNSW's aerial photograph.
        const centreV=((a.x+c.x)/2-roof.frame.x)*roof.frame.v.x+((a.z+c.z)/2-roof.frame.z)*roof.frame.v.z;
        if(nx>.7&&len>6&&Math.abs(centreV)<6){
          const half=Math.min(.48,3.7/len);
          wallPanel(glass,a,c,.15,top+.35,'#6b9d96',.42,.5-half,.5+half);
          for(let d=-3.7;d<=3.8;d+=1.85)wallPanel(detail,a,c,.15,top+.4,'#526f68',.51,.5+(d-.045)/len,.5+(d+.045)/len);
          for(let y=ground;y<top+.5;y+=storey)wallPanel(detail,a,c,y,y+.09,'#586f68',.54,.5-half,.5+half);
        }
        wallPanel(detail,a,c,top-.12,top+.08,'#b2c1a9',.48);
      }
    }
    if(warrane)polygon(roofs,b.points,b.height,'#8d9185');
    else{
      const {frame:f,eave,clerestory,ridge,vertex:v}=roof,w=f.width/2+.45,l=f.length/2+.45,inner=f.width*.26;
      const roofQuad=(a,b,c,d,color)=>{
        const up=(b[2]-a[2])*(c[0]-a[0])-(b[0]-a[0])*(c[2]-a[2]);
        if(up<0)roofs.quad(d,c,b,a,color);else roofs.quad(a,b,c,d,color);
      };
      // Green low roof with a raised white clerestory / gabled roof above it.
      for(const side of [-1,1]){
        roofQuad(v(side*w,-l,eave),v(side*inner,-l+2,eave+.8),v(side*inner,l-2,eave+.8),v(side*w,l,eave),'#a8baa5');
        const a=framePoint(f,side*inner,side*(-l+2)),c=framePoint(f,side*inner,side*(l-2));
        wallPanel(detail,a,c,eave+.8,clerestory,'#d9dcd0');
        wallPanel(glass,a,c,eave+.92,clerestory-.18,'#4e635e',.06,.01,.99);
        for(let z=-l+2;z<l-2;z+=2.8){const p=framePoint(f,side*inner,z);detail.box(p.x,(eave+.8+clerestory)/2,p.z,.09,clerestory-eave-.8,.09,'#d1d8c9');}
        roofQuad(v(side*(inner+.4),-l+1.6,clerestory),v(0,-l+1.6,ridge),v(0,l-1.6,ridge),v(side*(inner+.4),l-1.6,clerestory),'#d1d6ce');
        for(let z=-l+2;z<l-2;z+=1.1){
          roofQuad(v(side*(inner+.4),z,clerestory+.015),v(0,z,ridge+.015),v(0,z+.025,ridge+.015),v(side*(inner+.4),z+.025,clerestory+.015),'#aab4a9');
        }
      }
      for(const side of [-1,1]){
        roofQuad(v(-w,side*l,eave),v(-inner,side*(l-2),eave+.8),v(inner,side*(l-2),eave+.8),v(w,side*l,eave),'#a8baa5');
        detail.triangle(v(side*inner,side*(l-1.6),clerestory),v(0,side*(l-1.6),ridge),v(-side*inner,side*(l-1.6),clerestory),'#c2cbbd');
      }
    }
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function nidaTheatre(b,concrete,detail,roofs){
    const {front,drum,opening,roofHeight,curtainWallHeight}=theatreGeometry(b);
    const ordered=polygonArea(b.points)<0?[...b.points].reverse():b.points,glazing=new Batch();glazing.base=b.base;
    polygon(concrete,b.points,.12,'#8a9290');
    for(let i=0;i<ordered.length;i++){
      const a=ordered[i],c=ordered[(i+1)%ordered.length],len=distance2(a,c);if(len<.3)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      const visible=nx>.45||nz>.7;
      if(visible){
        glazing.quad(p(0,.2,.02),p(0,roofHeight(a)),p(1,roofHeight(c)),p(1,.2,.02),'#8aa9ad');
        const count=Math.max(1,Math.round(len/2.25));
        for(let j=0;j<=count;j++){
          const t=j/count,roof=roofHeight({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
          wallPanel(detail,a,c,.12,roof,'#6c7975',.07,Math.max(0,t-.055/len),Math.min(1,t+.055/len));
        }
        for(const y of [3.45,7.1])wallPanel(detail,a,c,y,y+.045,'#6a7a78',.08);
      }else wallPanel(concrete,a,c,0,9.8,'#a6aaa0');
      wallPanel(detail,a,c,0,.2,'#687b77',.14);
      const h0=roofHeight(a),h1=roofHeight(c);
      roofs.quad(p(0,h0-.22,.8),p(0,h0,.8),p(1,h1,.8),p(1,h1-.22,.8),'#b9bfb5');
      roofs.quad(p(0,h0-.22,.8),p(1,h1-.22,.8),p(1,h1-.22,-.2),p(0,h0-.22,-.2),'#b2b9b0');
    }
    // Triangulated roof with an actual opening around the reconstructed drum.
    const contours=[ordered,opening],vertices=contours.flat();
    for(const [a,c,d] of THREE.ShapeUtils.triangulateShape(ordered.map(p=>new THREE.Vector2(p.x,p.z)),[opening.map(p=>new THREE.Vector2(p.x,p.z))])){
      const v=i=>[vertices[i].x,roofHeight(vertices[i]),vertices[i].z];
      roofs.triangle(v(a),v(d),v(c),'#c4c9bd');
      const under=i=>[vertices[i].x,roofHeight(vertices[i])-.22,vertices[i].z];
      roofs.triangle(under(a),under(c),under(d),'#b8c0b6');
    }
    const drumRing=polygonArea(drum.points)<0?[...drum.points].reverse():drum.points;
    polygon(roofs,drumRing,drum.height,'#929d93');
    for(let i=0;i<drumRing.length;i++){
      const a=drumRing[i],c=drumRing[(i+1)%drumRing.length];
      wallPanel(concrete,a,c,0,drum.height,'#4b5550');
      for(let y=3.3;y<drum.height-.1;y+=.27){
        wallPanel(detail,a,c,y,y+.08,'#b7bdb1',.18);
      }
    }
    // The public OSM parts distinguish the 17 m auditorium shell from two
    // 19 m upper volumes. Their min_height=12 tags locate the added storeys.
    for(const part of NIDA_PARTS.filter(p=>p.osmId!==drum.osmId)){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      polygon(roofs,ring,part.height,'#b4bdb7');
      const floor=new Batch();floor.base=b.base;
      polygon(floor,ring,part.minHeight,'#b4bdb7');
      world.add(floor.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
        const glazed=nz>.7&&len<25;
        wallPanel(glazed?glazing:concrete,a,c,part.minHeight,part.height,glazed?'#486b70':'#9eaca9');
        for(let d=.12;d<len;d+=glazed?1.45:1.1)wallPanel(detail,a,c,part.minHeight,part.height,glazed?'#344f50':'#7a8b87',.055,d/len,Math.min(1,(d+.035)/len));
        for(let y=part.minHeight+1;y<part.height;y+=glazed?2.4:.55)wallPanel(detail,a,c,y,y+.035,'#7a8b87',.06);
        // Pale structural frame and thin edge reveal around the added boxes.
        wallPanel(detail,a,c,part.height-.13,part.height+.04,'#c9cec0',.2);
        for(const p of [a,c])detail.box(p.x+nx*.05,part.minHeight/2,p.z+nz*.05,.16,part.minHeight,.16,'#879b91');
      }
    }
    const a=front[0],c=front[1],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,t=.1;
    const x=a.x+(c.x-a.x)*t,z=a.z+(c.z-a.z)*t,angle=Math.atan2(-(c.z-a.z),c.x-a.x);
    detail.box(x+nx*.7,3.75,z+nz*.7,7.6,.24,2.4,'#c6cbbb',angle);
    const tex=canvasTexture(1024,128,(ctx,w,h)=>{ctx.fillStyle='#36413e';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e7e9db';ctx.font='500 74px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('NIDA THEATRES',w/2,h/2);});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(7.4,.92),new THREE.MeshBasicMaterial({map:tex}));
    sign.position.set(x+nx*1.92,b.base+4.4,z+nz*1.92);sign.rotation.y=Math.atan2(nx,nz);world.add(sign);
    world.add(glazing.mesh(style('#c0d4d1',{vertexColors:true,transparent:true,opacity:.3,roughness:.13,metalness:.18,depthWrite:false,side:THREE.DoubleSide}),false));
    // Preserve the mapped solid building boundary: the detailed foyer is viewed
    // from outside. The architect's 11 m dimension describes the curtain wall.
    addCollider({points:b.points,top:Math.max(b.height,curtainWallHeight),base:b.base});
  }

  function residentialComplex(b,profile,concrete,glass,detail,roofs){
    const village=profile.facade==='village',parts=RESIDENTIAL_PARTS.filter(p=>p.parent===b.id);
    for(const part of parts){
      const base=buildingBase(part.points),bottom=part.minHeight||0,height=part.height,level=height/part.floors;
      for(const batch of [concrete,glass,detail,roofs])batch.base=base;
      polygon(roofs,part.points,height,'#9aa79c',part.holes);
      if(bottom){
        const underside=new Batch();underside.base=base;polygon(underside,part.points,bottom,'#c9cbbc',part.holes);
        world.add(underside.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
      }
      const outer=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      for(const ring of [outer,...part.holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.35)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
        const southern=nz>.7,screen=village&&Math.abs(nz)>.7;
        const color=village?(screen?'#c5b38c':'#bac0b7'):(height<20?'#c3ad78':'#687f85');
        wallPanel(concrete,a,c,bottom,height,color);
        wallPanel(detail,a,c,height-.12,height+.18,'#cdd1c0',.16);
        for(let f=Math.floor(bottom/level);f<part.floors;f++){
          const low=Math.max(bottom,f*level+(village&&f>0?1.2:.5)),top=(f+1)*level-.3;if(top<=low)continue;
          if(!village&&southern&&len>20){
            wallPanel(glass,a,c,low,top,'#548e97',.5,.005,.995);
            wallPanel(detail,a,c,f*level+.05,f*level+.13,'#c0d2c9',.57);
            for(let d=.25;d<len;d+=2.8)wallPanel(detail,a,c,low,top,'#9db7b0',.56,d/len,Math.min(1,(d+.045)/len));
          }else{
            const bays=Math.max(1,Math.round(len/(screen?3.6:4.2)));
            for(let bay=0;bay<bays;bay++){
              const start=(bay+.12)/bays,end=(bay+.9)/bays;
              wallPanel(glass,a,c,low,top,profile.glass,.065,start,end);
              if(screen){
                for(let y=low;y<top;y+=.19)wallPanel(detail,a,c,y,y+.045,'#bca16b',.28,start,end);
                wallPanel(detail,a,c,low,top,'#a7b5a8',.32,start,start+.06/len);
              }else{
                const fascia=village?(f%3===1?'#98a49e':'#d4d6c9'):'#c5cebe';
                wallPanel(detail,a,c,Math.max(bottom,f*level),low,fascia,village?.55:.22);
                if(village&&f>0&&f*level>=bottom){
                  const p=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
                  detail.quad(p(start,f*level+.08,.05),p(end,f*level+.08,.05),p(end,f*level+.08,.55),p(start,f*level+.08,.55),'#c5cdbd');
                  detail.quad(p(start,f*level,.05),p(start,top,.05),p(start,top,.55),p(start,f*level,.55),'#b7c0b5');
                }
                for(const t of [start,end])wallPanel(detail,a,c,low,top,'#c5cebf',.1,t-.025/len,t+.025/len);
                if(village&&(bay+f)%4===1)wallPanel(detail,a,c,low,top,'#cfad3d',.12,start,Math.min(end,start+.75/len));
              }
            }
          }
        }
      }
      addCollider({points:part.points,holes:part.holes,bottom,top:height,base});
    }
  }

  function olderResidence(b,profile,brick,glass,detail,roofs){
    const shalom=profile.facade==='shalom',floors=shalom?3:2,level=b.height/floors;
    const ordered=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    polygon(roofs,b.points,b.height,'#737d71',b.holes);
    for(const ring of [ordered,...b.holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.3)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      wallPanel(brick,a,c,0,b.height,profile.color);
      wallPanel(detail,a,c,b.height-.35,b.height+.1,'#655f4f',.45);
      if(!shalom)wallPanel(detail,a,c,level+.3,b.height-.6,'#c6cbbb',.035,.14,.86);
      const bays=Math.max(1,Math.round(len/(shalom?3.5:3.1)));
      for(let f=0;f<floors;f++)for(let bay=0;bay<bays;bay++){
        const mid=(bay+.5)/bays,half=(shalom?.55:1.05)/len;
        const low=f*level+(shalom?.25:f?2.05:.55),top=Math.min((f+1)*level-.6,low+(shalom?2.8:1.35));
        wallPanel(glass,a,c,low,top,profile.glass,.075,mid-half,mid+half);
        for(const t of [mid-half,mid+half])wallPanel(detail,a,c,low-.04,top+.04,'#444f45',.1,t-.035/len,t+.035/len);
        if(shalom&&f>0&&len>6){
          const left=mid-.82/len,right=mid+.82/len,y=f*level+.12,depth=1.05;
          detail.quad(p(left,y,.03),p(right,y,.03),p(right,y,depth),p(left,y,depth),'#9c9d89');
          wallPanel(detail,a,c,y-.16,y,'#b2ad94',depth,left,right);
          wallPanel(detail,a,c,y+1.08,y+1.14,'#615742',depth,left,right);
          for(let d=-.8;d<=.8;d+=.15)wallPanel(detail,a,c,y,y+1.12,'#675c47',depth,mid+(d-.015)/len,mid+(d+.015)/len);
          for(const t of [left,right]){
            for(let d=0;d<=depth;d+=.15){const q=p(t,y+.56,d);detail.box(q[0],q[1],q[2],.025,1.12,.025,'#675c47');}
            const q=p(t,y+1.11,depth/2);detail.box(q[0],q[1],q[2],depth,.045,.04,'#615742',Math.atan2(-nz,nx));
          }
        }
      }
    }
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    if(!shalom)internationalCourtyard(b);
  }

  function internationalCourtyard(b){
    const f=orientedFrame(b.holes[0]),base=terrainHeight(f.x,f.z),stone=new Batch(),wood=new Batch(),plants=new Batch(),water=new Batch();
    for(const batch of [stone,wood,plants,water])batch.base=base;
    // Pond and pergola positions are photograph-led estimates inside the mapped
    // courtyard opening. No survey of the individual garden features is claimed.
    const pond=roundedFrameRectangle(f,3.8,10,.75,1.5,0),ring=polygonArea(pond)<0?[...pond].reverse():pond;
    polygon(water,pond,.12,'#3b6460');
    for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],-.1,.3,'#778b72',.12);
    addCollider({points:pond,top:.5,base});
    const beamAngle=Math.atan2(-f.v.z,f.v.x),crossAngle=Math.atan2(-f.u.z,f.u.x);
    for(const u of [-f.width/2+1,f.width/2-1])for(const v of [-f.length/2+1,f.length/2-1]){
      const p=framePoint(f,u,v);wood.box(p.x,1.5,p.z,.16,3,.16,'#5d6450');addCollider({x:p.x,z:p.z,radius:.13,top:3,base});
    }
    for(let v=-f.length/2+1;v<f.length/2;v+=2.7){const p=framePoint(f,0,v);wood.box(p.x,3,p.z,f.width-2,.14,.13,'#59634e',crossAngle);}
    for(const u of [-f.width/2+1,f.width/2-1]){const p=framePoint(f,u,0);wood.box(p.x,2.97,p.z,f.length-2,.18,.16,'#59634e',beamAngle);}
    for(const v of [-f.length/2+3,f.length/2-3]){
      const p=framePoint(f,-2.6,v);wood.box(p.x,.8,p.z,2,.12,1.25,'#867353',beamAngle);
      for(const u of [-3.05,-2.15])for(const dv of [-.7,.7]){const q=framePoint(f,u,v+dv);wood.box(q.x,.37,q.z,.09,.74,.09,'#64664f');}
      for(const u of [-3.5,-1.7]){
        const q=framePoint(f,u,v);wood.box(q.x,.46,q.z,2,.1,.32,'#867353',beamAngle);
        for(const dv of [-.7,.7]){const leg=framePoint(f,u,v+dv);wood.box(leg.x,.2,leg.z,.08,.4,.08,'#64664f');}
      }
      addCollider({x:p.x,z:p.z,radius:1.05,top:.9,base});
    }
    for(let v=-f.length/2+2;v<f.length/2-1;v+=1.05)for(const u of [-f.width/2+.6,-f.width/2+1.3,f.width/2-.6,f.width/2-1.3]){
      const p=framePoint(f,u,v);
      for(let leaf=0;leaf<12;leaf++){
        const a=leaf/12*TAU,dx=Math.cos(a),dz=Math.sin(a),h=1.1+(leaf%3)*.25,shade=leaf%2?'#466936':'#658543';
        const left=[p.x+dx*.4-dz*.14,h*.8,p.z+dz*.4+dx*.14],right=[p.x+dx*.4+dz*.14,h*.8,p.z+dz*.4-dx*.14];
        plants.quad([p.x-dz*.025,.05,p.z+dx*.025],left,right,[p.x+dz*.025,.05,p.z-dx*.025],shade);
        plants.triangle(left,[p.x+dx*.95,h*.65,p.z+dz*.95],right,shade);
      }
    }
    for(const u of [-f.width/2+1,f.width/2-1])for(const v of [-6,0,6]){
      const p=framePoint(f,u,v),height=3.5+(v+6)/30;
      for(let i=0;i<8;i++){
        const a=i/8*TAU,c=(i+1)/8*TAU;
        wood.quad([p.x+Math.cos(a)*.085,0,p.z+Math.sin(a)*.085],[p.x+Math.cos(a)*.065,height,p.z+Math.sin(a)*.065],[p.x+Math.cos(c)*.065,height,p.z+Math.sin(c)*.065],[p.x+Math.cos(c)*.085,0,p.z+Math.sin(c)*.085],'#89916b');
      }
      for(let leaf=0;leaf<10;leaf++){
        const a=leaf/10*TAU+v*.2,dx=Math.cos(a),dz=Math.sin(a),px=-dz,pz=dx;
        for(let i=0;i<12;i++){
          const t=i/12,q={x:p.x+dx*1.9*t,z:p.z+dz*1.9*t},y=height+.55*Math.sin(t*Math.PI)-.8*t*t,w=.5*(1-t)+.08;
          for(const side of [-1,1])plants.triangle([q.x-dx*.025,y,q.z-dz*.025],[q.x+dx*.025,y,q.z+dz*.025],[q.x+px*w*side+dx*.1,y-.15,q.z+pz*w*side+dz*.1],leaf%2?'#688846':'#8aa357');
        }
      }
      addCollider({x:p.x,z:p.z,radius:.11,top:height,base});
    }
    world.add(stone.mesh(style('#ffffff',{vertexColors:true})),wood.mesh(style('#ffffff',{vertexColors:true})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),water.mesh(style('#ffffff',{vertexColors:true,roughness:.13,metalness:.35})));
  }

  function heritageBuilding(b,type,masonry,brick,glass,detail,roofs){
    const g=heritageGeometry(b,type),f=g.frame,white=type==='whitehouse',theatre=type==='figtree';
    const body=white?g.body:b.points,ordered=polygonArea(body)<0?[...body].reverse():body,wallTop=white?6.4:8.8;
    for(let i=0;i<ordered.length;i++){
      const a=ordered[i],c=ordered[(i+1)%ordered.length],len=distance2(a,c);if(len<.2)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      if(theatre){
        const count=Math.ceil(len/.18);
        for(let j=0;j<count;j++){
          const t=j/count,u=(j+1)/count,q=v=>({x:a.x+(c.x-a.x)*v,z:a.z+(c.z-a.z)*v});
          masonry.quad(p(t,0),p(t,g.roofHeight(q(t))-.06),p(u,g.roofHeight(q(u))-.06),p(u,0),j%2?'#8d9792':'#9ca6a0');
          wallPanel(detail,a,c,.12,Math.min(g.roofHeight(q(t)),g.roofHeight(q(u)))-.08,'#6d7e78',.035,t,t+.018/len);
        }
        continue;
      }
      wallPanel(masonry,a,c,0,wallTop,white?'#d5d0bf':'#c5c6b9');
      if(!white){
        const count=Math.ceil(len/.4);
        for(let j=0;j<count;j++){
          const t=j/count,u=(j+1)/count,q=v=>({x:a.x+(c.x-a.x)*v,z:a.z+(c.z-a.z)*v});
          masonry.quad(p(t,wallTop),p(t,g.roofHeight(q(t))),p(u,g.roofHeight(q(u))),p(u,wallTop),'#c5c6b9');
        }
      }
      if(white){for(let y=.3;y<wallTop;y+=.18)wallPanel(detail,a,c,y,y+.012,'#9fa590',.025);}
      else{
        wallPanel(brick,a,c,0,1.15,'#735b4c',.035);
        wallPanel(detail,a,c,2.85,3.04,'#d9dacb',.14);wallPanel(detail,a,c,5.85,6.02,'#d9dacb',.14);
      }
      const floors=white?2:3,storey=white?3.15:2.9,bays=Math.max(1,Math.round(len/(white?2.8:2.5)));
      for(let floor=0;floor<floors;floor++)for(let bay=0;bay<bays;bay++){
        const mid=(bay+.5)/bays,half=(white?.47:floor===2?.36:.5)/len;
        const low=(white?.25:.1)+floor*storey+.45,top=low+(white?2.2:floor===2?1.25:2.1);
        const shutter=!white&&floor===1;
        wallPanel(shutter?masonry:glass,a,c,low,top,shutter?'#acb3a2':'#48605a',.06,mid-half,mid+half);
        for(const t of [mid-half,mid,mid+half])wallPanel(detail,a,c,low-.04,top+.04,white?'#e0e1ce':'#747f74',.1,t-.035/len,t+.035/len);
        for(const y of [low-.06,top])wallPanel(detail,a,c,y,y+.07,'#dddcc8',.12,mid-half-.04/len,mid+half+.04/len);
        if(!shutter)wallPanel(detail,a,c,(low+top)/2,(low+top)/2+.04,'#b8c3af',.105,mid-half,mid+half);
      }
    }
    shapedRoof(roofs,b.points,g.roofHeight,theatre?'#929e96':white?'#d4d9ce':'#9fa99f');
    if(theatre){
      const mainU=(-f.width/2+f.width*.18)/2,angle=Math.atan2(-f.u.z,f.u.x),centre=framePoint(f,mainU,f.length/2+.85);
      detail.box(centre.x,1.35,centre.z,4.2,2.7,1.7,'#a2aca3',angle);
      polygon(roofs,frameRectangle(f,4.45,1.95,mainU,f.length/2+.85),2.78,'#9ca79b');
      const front=(batch,u0,u1,v,y0,y1,color)=>{
        const a=framePoint(f,u1,v),c=framePoint(f,u0,v);wallPanel(batch,a,c,y0,y1,color);
      };
      front(glass,mainU-1.65,mainU+1.65,f.length/2+1.711,.75,2.3,'#6b8274');
      for(let u=mainU-1.65;u<mainU+1.7;u+=.825)front(detail,u-.03,u+.03,f.length/2+1.73,.7,2.35,'#d3cfb3');
      for(const y of [.7,1.72,2.3])front(detail,mainU-1.7,mainU+1.7,f.length/2+1.73,y,y+.055,'#d3cfb3');
      const door=f.width*.18+1.35;
      front(glass,door-.7,door+.7,f.length/2+.07,.05,2.4,'#445e54');
      for(const u of [door-.78,door+.72])front(detail,u,u+.07,f.length/2+.1,0,2.5,'#cbb778');
      addCollider({points:frameRectangle(f,4.2,1.7,mainU,f.length/2+.85),top:2.8,base:b.base});
      addCollider({points:b.points,top:b.height,base:b.base});
    }else if(white)whiteHouseVerandah(b,g,masonry,detail,roofs);
    else addCollider({points:b.points,top:b.height,base:b.base});
  }

  function whiteHouseVerandah(b,g,concrete,detail,roofs){
    const {body}=g,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,s=whiteHouseStair(b),upper=3.35;
    polygon(detail,b.points,.25,'#b9bca6',[body]);polygon(detail,b.points,upper,'#b4b7a1',[body]);
    groundPatches.push({points:b.points,heightAt:()=>b.base+.25});
    addCollider({points:body,top:6.4,base:b.base});
    addCollider({points:b.points,holes:[body],bottom:upper-.16,top:upper,stepHeight:.27,base:b.base});
    addCollider({points:b.points,bottom:6.5,top:b.height,base:b.base});
    const ceiling=new Batch();ceiling.base=b.base;polygon(ceiling,b.points,6.5,'#c8d0be');
    world.add(ceiling.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),dx=(c.x-a.x)/len,dz=(c.z-a.z)/len;
      const p=(d,y)=>[a.x+dx*d,y,a.z+dz*d],bays=Math.max(1,Math.round(len/2.7));
      wallPanel(detail,a,c,upper-.18,upper+.02,'#d0d4bd',.035);wallPanel(detail,a,c,6.37,6.65,'#dce0cc',.08);
      for(let j=0;j<bays;j++){
        const d=j*len/bays,u=(j+1)*len/bays,post=p(d,3.3);detail.box(post[0],3.3,post[2],.12,6.5,.12,'#e0e2cf');
        addCollider({x:post[0],z:post[2],radius:.075,top:6.6,base:b.base});
        const landing=i===s.index&&Math.abs((d+u)/2-(s.length-.7))<1.4;
        if(!landing){
          batchBeam(detail,p(d,upper+1.05),p(u,upper+1.05),.045,'#dbe0c9');
          batchBeam(detail,p(d+.08,upper+.18),p(u-.08,upper+1.01),.032,'#dbe0c9');
          batchBeam(detail,p(d+.08,upper+1.01),p(u-.08,upper+.18),.032,'#dbe0c9');
          const nx=dz*.045,nz=-dx*.045,start=p(d,0),end=p(u,0);
          addCollider({points:[{x:start[0]+nx,z:start[2]+nz},{x:end[0]+nx,z:end[2]+nz},{x:end[0]-nx,z:end[2]-nz},{x:start[0]-nx,z:start[2]-nz}],bottom:upper+.02,top:upper+1.1,base:b.base});
        }
        for(const direction of [-1,1]){
          const arc=[p(d,6.25),p(d+direction*.24,6.24),p(d+direction*.32,6.0),p(d+direction*.17,5.85)];
          for(let k=0;k<arc.length-1;k++)batchBeam(detail,arc[k],arc[k+1],.034,'#dde1cb');
        }
      }
    }
    // The photo shows an exterior stair. Its position, treads and landing are
    // reconstructed; the upper deck is a real physical surface in this model.
    stairSegments.push({a:s.a,b:s.b,width:s.width,count:s.count,h0:b.base+s.low,h1:b.base+s.high});
    const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len;
    const p=(t,side,y)=>[s.a.x+dx*t+nx*s.width/2*side,y,s.a.z+dz*t+nz*s.width/2*side];
    for(let i=0;i<s.count;i++){
      const t=i/s.count,u=(i+1)/s.count,y=s.low+(s.high-s.low)*i/s.count;
      detail.quad(p(t,1,y),p(u,1,y),p(u,-1,y),p(t,-1,y),'#c8ceba');
      detail.quad(p(t,1,y-(s.high-s.low)/s.count),p(t,1,y),p(t,-1,y),p(t,-1,y-(s.high-s.low)/s.count),'#b3bea8');
    }
    for(const side of [-1,1]){
      batchBeam(detail,p(0,side,s.low+1.05),p(1,side,s.high+1.05),.04,'#e0e2ca');
      for(let i=0;i<=s.count;i+=2){const t=i/s.count,y=s.low+(s.high-s.low)*t;batchBeam(detail,p(t,side,y),p(t,side,y+1.05),.027,'#e0e2ca');}
    }
    const start={x:s.b.x+s.direction.x*s.landingOffset,z:s.b.z+s.direction.z*s.landingOffset};
    const landing=[start,{x:start.x+s.direction.x*1.1,z:start.z+s.direction.z*1.1},
      {x:start.x+s.direction.x*1.1-s.nx*1.4,z:start.z+s.direction.z*1.1-s.nz*1.4},{x:start.x-s.nx*1.4,z:start.z-s.nz*1.4}];
    polygon(detail,landing,upper,'#bfc6b0');addCollider({points:landing,bottom:upper-.16,top:upper,stepHeight:.27,base:b.base});
    const peak=g.frame;detail.box(peak.x,9.4,peak.z,.12,.4,.12,'#e0e2ce');
  }

  function goldsteinHall(b,concrete,brick,glass,detail,roofs){
    const {frame:f,split}=goldsteinGeometry(b),axis={...f,v:f.u};
    for(const [points,high] of [[clipFrameStrip(b.points,axis,-f.width,split),true],[clipFrameStrip(b.points,axis,split,f.width),false]]){
      const ring=polygonArea(points)<0?[...points].reverse():points;
      const roofAt=p=>(high?12:7.5)-((p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z+f.length/2)*.045;
      shapedRoof(roofs,points,roofAt,'#b6bfb2');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.2)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,north=nx*(-f.v.x)+nz*(-f.v.z)>.8,top=Math.min(roofAt(a),roofAt(c));
        wallPanel(brick,a,c,0,top,'#776a54');
        if(north){
          wallPanel(glass,a,c,.2,2.85,'#3f5c54',.08,.01,.99);
          wallPanel(glass,a,c,3.65,top-1.55,'#4c655a',.08,.01,.99);
          wallPanel(detail,a,c,3.05,3.65,'#c7cdbb',.65);
          wallPanel(concrete,a,c,top-.75,top+.1,'#c9cfbd',.95);
          for(let d=.2;d<len;d+=1.1)wallPanel(detail,a,c,.15,top-1.4,'#7b6548',.14,d/len,Math.min(1,(d+.09)/len));
          for(let d=0;d<=len;d+=len/3){const x=a.x+(c.x-a.x)*d/len+nx*.45,z=a.z+(c.z-a.z)*d/len+nz*.45;detail.box(x,top/2,z,.55,top,.6,'#c4cbbb');}
          wallPanel(detail,a,c,6.65,6.78,'#7a6244',.17);
        }else{
          wallPanel(detail,a,c,top-.35,top+.08,'#bdc6b4',.18);
          const bays=Math.max(1,Math.round(len/5));
          for(let j=0;j<bays;j++)wallPanel(glass,a,c,3.8,Math.min(6.1,top-1),'#405b51',.06,(j+.3)/bays,(j+.7)/bays);
        }
      }
      addCollider({points,top:high?12:7.5,base:b.base});
    }
  }

  function facadeLabel(b,a,c,title,code,width,y,color='#252c29'){
    const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
    const texture=canvasTexture(1536,320,(ctx,w,h)=>{
      ctx.clearRect(0,0,w,h);ctx.fillStyle=color;ctx.textBaseline='middle';
      ctx.font='600 65px sans-serif';ctx.fillText(code,30,65);
      ctx.font='600 155px sans-serif';ctx.fillText(title,30,210,w-60);
    });
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(width,width*320/1536),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));
    sign.position.set((a.x+c.x)/2+nx*.16,b.base+y,(a.z+c.z)/2+nz*.16);sign.rotation.y=Math.atan2(nx,nz);world.add(sign);
  }

  function scienceTheatre(b,masonry,glass,detail,roofs){
    const g=scienceTheatreGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    const foundationLow=Math.min(0,buildingBase(b.points)-b.base);
    const frame=modernFacadeFrame(b);
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],e=frame.classify(a,c);if(e.length<.25)continue;
      const p=(t,y,offset=0)=>[a.x+(c.x-a.x)*t+e.nx*offset,y,a.z+(c.z-a.z)*t+e.nz*offset];
      const count=Math.ceil(e.length/1.7);
      for(let j=0;j<count;j++){
        const t=j/count,u=(j+1)/count,q=v=>({x:a.x+(c.x-a.x)*v,z:a.z+(c.z-a.z)*v});
        masonry.quad(p(t,foundationLow),p(t,g.roofHeight(q(t))),p(u,g.roofHeight(q(u))),p(u,foundationLow),'#c3c6bc');
        detail.quad(p(t,g.roofHeight(q(t))-.18,.07),p(t,g.roofHeight(q(t))+.02,.07),p(u,g.roofHeight(q(u))+.02,.07),p(u,g.roofHeight(q(u))-.18,.07),'#8f9a93');
        wallPanel(detail,a,c,.15,Math.min(g.roofHeight(q(t)),g.roofHeight(q(u)))-.15,'#929e94',.025,t,t+.018/e.length);
      }
      const top=Math.min(g.roofHeight(a),g.roofHeight(c));
      for(let y=1.7;y<top-.3;y+=1.7)wallPanel(detail,a,c,y,y+.015,'#9da79c',.03);
      if(e.v>.9){
        // The east entrance is two glazed rows below a largely blank fascia.
        wallPanel(glass,a,c,.25,3.35,'#59716b',.06,.12,.96);
        wallPanel(glass,a,c,4.25,7.5,'#6d8580',.06,.12,.96);
        for(const y of [3.35,4.08,7.5])wallPanel(detail,a,c,y,y+.16,'#d7ddce',.14,.1,.98);
        for(let d=e.length*.12;d<e.length*.97;d+=1.65)wallPanel(detail,a,c,.2,7.6,'#dce1d5',.17,d/e.length,(d+.095)/e.length);
        wallPanel(detail,a,c,5.8,5.89,'#c7d1c5',.18,.12,.96);
      }else if(Math.abs(e.u)>.9){
        // High clerestory along the auditorium sides, rather than an office grid.
        for(let j=0;j<count;j++){
          const t=j/count,u=(j+1)/count,q=v=>({x:a.x+(c.x-a.x)*v,z:a.z+(c.z-a.z)*v});
          glass.quad(p(t,g.roofHeight(q(t))-1.1,.04),p(t,g.roofHeight(q(t))-.3,.04),p(u,g.roofHeight(q(u))-.3,.04),p(u,g.roofHeight(q(u))-1.1,.04),'#596e6b');
        }
        for(const start of [.13,.73]){
          wallPanel(glass,a,c,.2,2.8,'#52655f',.06,start,start+.075);
          for(const d of [start,start+.075])wallPanel(detail,a,c,.2,2.9,'#cbd4c6',.1,d,d+.06/e.length);
        }
      }
    }
    shapedRoof(roofs,b.points,g.roofHeight,'#7d8d87');
    const angle=Math.atan2(-f.u.z,f.u.x),canopy=g.canopy;
    for(const v of [f.length/2+.5,canopy.front]){
      const p=framePoint(f,0,v);detail.box(p.x,canopy.height,p.z,canopy.width,.2,.22,'#85928a',angle);
      for(let u=-f.width/2;u<=f.width/2+.1;u+=f.width/6){
        const q=framePoint(f,u,v),bottom=Math.min(0,terrainHeight(q.x,q.z)-b.base),h=canopy.height-bottom;
        detail.box(q.x,bottom+h/2,q.z,.23,h,.23,'#929f94',angle);
        addCollider({x:q.x,z:q.z,radius:.17,bottom,top:canopy.height+.1,base:b.base});
      }
    }
    for(let u=-f.width/2-.4;u<=f.width/2+.5;u+=.9){
      const a=framePoint(f,u,f.length/2+.4),c=framePoint(f,u,canopy.front+.3);
      batchBeam(detail,[a.x,canopy.height+.05,a.z],[c.x,canopy.height+.05,c.z],.055,'#a5aea3');
    }
    // Small round forecourt lights visible above the entrance canopy.
    for(const u of [-f.width*.3,0,f.width*.3]){
      const p=framePoint(f,u,f.length/2+2.8);detail.box(p.x,4.16,p.z,.055,.5,.055,'#63776d');
      const globe=new THREE.Mesh(new THREE.SphereGeometry(.19,8,6),style('#e5e7d2',{emissive:'#c8cdb7',emissiveIntensity:.2}));
      globe.position.set(p.x,b.base+4.47,p.z);world.add(globe);
    }
    addCollider({points:b.points,bottom:foundationLow,top:b.height,base:b.base});
  }

  function daltonBuilding(b,masonry,aggregate,glass,detail,roofs){
    const {frame:f,classify}=modernFacadeFrame(b),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],e=classify(a,c);if(e.length<.25)continue;
      const end=Math.abs(e.v)>.9;
      wallPanel(end?aggregate:masonry,a,c,3.3,b.height,end?'#b6a592':'#d0d4ce');
      wallPanel(masonry,a,c,0,3.3,'#b6b3a2');
      wallPanel(detail,a,c,b.height-.16,b.height+.04,'#c4c9be',.16);
      if(end){
        const bays=Math.max(2,Math.round(e.length/2.4));
        for(let j=1;j<bays;j++)wallPanel(detail,a,c,3.3,b.height-.2,'#cecab9',.025,j/bays,j/bays+.018/e.length);
        for(let y=5.6;y<b.height-.5;y+=2.4)wallPanel(detail,a,c,y,y+.017,'#c8bca8',.03);
        if(e.v>.9){
          wallPanel(glass,a,c,.2,3.2,'#637b75',.08,.015,.985);
          for(let d=.2;d<e.length;d+=2.5)wallPanel(detail,a,c,.1,3.3,'#424f4b',.14,d/e.length,Math.min(1,(d+.055)/e.length));
          const middle=(a.x+c.x)/2; // Structural pier visible in the current exterior.
          detail.box(middle,1.65,(a.z+c.z)/2,.32,3.3,.32,'#b9bcae');
          facadeLabel(b,a,c,'Dalton Building','F12',Math.min(9,e.length*.75),5.15);
        }
      }else{
        const eastern=e.u>.7,band=eastern?[[5.25,7.5],[10.25,12.55]]:[[6.9,7.8],[11.9,12.8]];
        for(const [lo,hi] of band){
          wallPanel(glass,a,c,lo,hi,eastern?'#778c8a':'#596c69',.065);
          wallPanel(detail,a,c,lo-.055,lo,'#9da89e',.12);wallPanel(detail,a,c,hi,hi+.055,'#d8ddd2',.12);
        }
        for(let d=.2;d<e.length;d+=2.3){
          wallPanel(detail,a,c,3.35,b.height-.1,'#e0e3d9',.13,d/e.length,Math.min(1,(d+.065)/e.length));
          // Occasional dark ventilation panels interrupt the narrow western band.
          if(!eastern&&Math.round(d/2.3)%6===2)for(const [lo,hi] of band){
            wallPanel(detail,a,c,lo+.02,hi-.02,'#485953',.14,d/e.length,Math.min(1,(d+1.1)/e.length));
            for(let y=lo+.1;y<hi;y+=.13)wallPanel(detail,a,c,y,y+.025,'#a4afa3',.16,d/e.length,Math.min(1,(d+1.1)/e.length));
          }
        }
        // The southern glazed Commons wraps onto both long sides.
        const steps=Math.ceil(e.length/2);
        for(let j=0;j<steps;j++){
          const t=j/steps,u=(j+1)/steps,p={x:a.x+(c.x-a.x)*(t+u)/2,z:a.z+(c.z-a.z)*(t+u)/2};
          const v=(p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z;
          if(v>f.length/2-18){
            wallPanel(glass,a,c,.2,3.2,'#5c756e',.08,t,u);
            wallPanel(detail,a,c,.1,3.3,'#535e58',.14,t,t+.055/e.length);
          }else wallPanel(glass,a,c,2.2,3,'#4b615b',.06,t+.08/steps,u-.08/steps);
        }
      }
      wallPanel(detail,a,c,3.2,3.4,'#d8dccf',.22);
    }
    polygon(roofs,b.points,b.height,'#a0aaa0');
    // The current Commons photograph shows a clipped hedge in front of the
    // glazed end. Its extent and planting height are reconstructed.
    const hedgePoint=framePoint(f,0,f.length/2+2.5),hedgeBase=terrainHeight(hedgePoint.x,hedgePoint.z),angle=Math.atan2(-f.u.z,f.u.x);
    const hedge=new THREE.Mesh(new THREE.BoxGeometry(f.width+1.1,.65,1.05),style('#5d7749',{map:surfaceTexture('grass')}));
    hedge.position.set(hedgePoint.x,hedgeBase+.475,hedgePoint.z);hedge.rotation.y=angle;hedge.castShadow=true;hedge.receiveShadow=true;world.add(hedge);
    addCollider({points:frameRectangle(f,f.width+1.1,1.05,0,f.length/2+2.5),bottom:.1,top:.8,base:hedgeBase});
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function websterBuilding(b,masonry,glass,detail,roofs){
    const {frame:f,classify}=modernFacadeFrame(b),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    const mirror=new Batch();mirror.base=b.base;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],e=classify(a,c);if(e.length<.25)continue;
      wallPanel(masonry,a,c,0,b.height,'#bfc8bf');
      wallPanel(masonry,a,c,0,3.55,'#947b61',.025);
      const south=e.u<-.8,west=e.v<-.8;
      if(south){
        wallPanel(mirror,a,c,3.6,b.height-.14,'#b5c8ce',.085);
        for(let y=3.6;y<b.height;y+=.92)wallPanel(detail,a,c,y,y+.035,'#758a87',.15);
        const bays=Math.max(1,Math.round(e.length/1.55));
        for(let j=0;j<=bays;j++)wallPanel(detail,a,c,3.55,b.height,'#b0bcb3',.17,j/bays,Math.min(1,j/bays+.045/e.length));
        for(let j=3;j<bays-1;j+=6){
          const t=j/bays,u=(j+.75)/bays,y=7.3;
          const p=(v,h,off)=>[a.x+(c.x-a.x)*v+e.nx*off,h,a.z+(c.z-a.z)*v+e.nz*off];
          // Small top-hung opening lights break the curtain-wall grid.
          mirror.quad(p(t,y,.28),p(t,y+.65,.09),p(u,y+.65,.09),p(u,y,.28),'#9cafb6');
          batchBeam(detail,p(t,y,.3),p(u,y,.3),.025,'#87958c');
        }
      }else{
        wallPanel(glass,a,c,4,b.height-1.25,'#647b75',.07);
        for(let y=4;y<b.height-1;y+=3.5)wallPanel(detail,a,c,y,y+.16,'#c4cfc1',.14);
        for(let d=.12;d<e.length;d+=west?.43:.7){
          const p={x:a.x+(c.x-a.x)*d/e.length+e.nx*.2,z:a.z+(c.z-a.z)*d/e.length+e.nz*.2};
          const angle=Math.atan2(-e.nz,e.nx);
          detail.box(p.x,(4+b.height-1.25)/2,p.z,.32,b.height-5.25,.055,'#d7ddcf',angle);
        }
        wallPanel(detail,a,c,b.height-1.25,b.height,'#d6dace',.12);
        if(west&&e.length>10)facadeLabel(b,a,c,'Robert Webster Building','G14',Math.min(8,e.length*.6),2.4,'#e1e3d3');
      }
      const bays=Math.max(1,Math.round(e.length/3.1));
      for(let j=0;j<bays;j++){
        if(west&&j>bays*.5)continue;
        wallPanel(glass,a,c,.15,3.25,'#4f6c62',.07,(j+.12)/bays,(j+.88)/bays);
        wallPanel(detail,a,c,.1,3.4,'#c1c9b7',.13,j/bays,Math.min(1,j/bays+.1/e.length));
      }
    }
    polygon(roofs,b.points,b.height,'#acb5a8');
    // The entrance portico follows the mapped projecting section of the mall
    // façade. Its floor level follows local terrain; its dimensions are estimated.
    const entry=framePoint(f,-f.width/2-.7,20),floor=terrainHeight(entry.x,entry.z)-b.base,top=floor+3.3,angle=Math.atan2(-f.v.z,f.v.x);
    detail.box(entry.x,top-.25,entry.z,9,.5,2.1,'#a5a393',angle);
    for(const v of [15.7,24.3]){
      const p=framePoint(f,-f.width/2-.8,v),bottom=terrainHeight(p.x,p.z)-b.base;
      detail.box(p.x,(bottom+top)/2,p.z,.46,top-bottom,.46,'#a9ac9c',angle);
      addCollider({x:p.x,z:p.z,radius:.3,top,base:b.base,bottom});
    }
    const ea=framePoint(f,-f.width/2-1.8,24.2),ec=framePoint(f,-f.width/2-1.8,15.8);
    facadeLabel(b,ea,ec,'Robert Webster Building','G14',7.5,top-.18,'#eef0dd');
    const mesh=mirror.mesh(style('#ffffff',{vertexColors:true,roughness:.035,metalness:.82,envMapIntensity:1.2}));world.add(mesh);
    const front=framePoint(f,-f.width/2-1.5,0),target=new THREE.WebGLCubeRenderTarget(512,{type:THREE.HalfFloatType,generateMipmaps:true,minFilter:THREE.LinearMipmapLinearFilter});
    const probe=new THREE.CubeCamera(.3,380,target);probe.position.set(front.x,b.base+9,front.z);
    campusReflections.push({mesh,probe,target});mesh.material.envMap=target.texture;
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function updateCampusReflection(){
    // Three static local probes update after loading or a lighting change;
    // walking never triggers six additional scene renders per probe per frame.
    for(const {mesh}of campusReflections)mesh.visible=false;
    try{for(const {probe}of campusReflections)probe.update(renderer,scene);}
    finally{for(const {mesh}of campusReflections)mesh.visible=true;}
  }

  function chemicalComplex(b,masonry,brick,glass,detail,roofs){
    const f=orientedFrame(b.points),classify=modernFacadeFrame(b).classify;
    const parts=CHEMICAL_PARTS.filter(p=>p.parent===b.id);
    for(const part of parts){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points,tower=part.role==='tower',roof=tower?b.height-.12:part.roof;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],e=classify(a,c);if(e.length<.15)continue;
        if(tower){
          wallPanel(brick,a,c,0,roof,'#9b6d50');
          if(Math.abs(e.u)>.8){
            wallPanel(masonry,a,c,7.3,roof,'#d2d1c1',.04);
            const storey=(roof-7.3)/11;
            for(let row=0;row<11;row++){
              const lo=7.3+row*storey+.22,hi=lo+1.12;
              wallPanel(glass,a,c,lo,hi,'#687f7d',.08,.015,.985);
              for(let d=.6;d<e.length-.3;d+=1.05)wallPanel(detail,a,c,lo,hi,'#c5cbbd',.15,d/e.length,Math.min(.99,(d+.045)/e.length));
              wallPanel(detail,a,c,hi,hi+.13,'#e1e0d1',.28,.01,.99);
              wallPanel(detail,a,c,lo-.06,lo,'#a2afa5',.17,.01,.99);
            }
          }else{
            for(let row=0;row<11;row++){
              const y=8+row*3.1;
              wallPanel(glass,a,c,y,y+.55,'#596f69',.065,.42,.57);
              wallPanel(detail,a,c,y-.04,y,'#b0b7a5',.12,.41,.58);
            }
          }
          wallPanel(detail,a,c,roof-.18,roof+.12,'#aeb6a8',.13);
        }else{
          const front=e.u<-.8,east=e.v>.8;
          wallPanel(masonry,a,c,0,part.height,'#a0a9a3');
          if(front){
            wallPanel(glass,a,c,.15,3.8,'#899d86',.07);
            wallPanel(glass,a,c,4.0,14.7,'#91a9ae',.07);
            for(let d=.2;d<e.length;d+=1.1){
              const p={x:a.x+(c.x-a.x)*d/e.length+e.nx*.3,z:a.z+(c.z-a.z)*d/e.length+e.nz*.3};
              detail.box(p.x,9.4,p.z,.42,10.8,.07,'#d6ddd4',Math.atan2(-e.nz,e.nx));
              wallPanel(detail,a,c,.1,3.85,'#354b44',.14,d/e.length,Math.min(1,(d+.065)/e.length));
            }
            for(const y of [1.2,2.4,3.8])wallPanel(detail,a,c,y,y+.075,'#344941',.15);
            for(const y of [7.5,11.15])wallPanel(detail,a,c,y,y+.13,'#8f9c96',.22);
            if(e.length>20){
              const sub=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
              wallPanel(detail,a,c,.75,2.8,'#394942',.19,.78,.98);
              facadeLabel(b,sub(.78),sub(.98),'June Griffith Building','F10',Math.min(5,e.length*.19),1.8,'#e7e9da');
            }
          }else if(east){
            // Glazed stair bay visible beside the eastern front wing.
            wallPanel(glass,a,c,1.1,part.height-.18,'#819fa9',.08);
            for(let y=1.2;y<part.height;y+=1.6)wallPanel(detail,a,c,y,y+.08,'#c5d2c9',.16);
            const bays=Math.max(1,Math.round(e.length/2));
            for(let j=0;j<=bays;j++)wallPanel(detail,a,c,1,part.height,'#d0d9ce',.18,j/bays,Math.min(1,j/bays+.06/e.length));
            for(const y of [4.5,8.5,12.5])wallPanel(detail,a,c,y,y+.28,'#849b9b',.11);
          }else{
            const bays=Math.max(1,Math.round(e.length/3.1));
            for(let row=0;row<3;row++)for(let j=0;j<bays;j++){
              const mid=(j+.45+(row%2)*.2)/bays,lo=3.8+row*3.4;
              wallPanel(glass,a,c,lo,lo+1.9,'#526c68',.07,mid-.16/e.length,Math.min(.99,mid+.16/e.length));
            }
            for(let d=.1;d<e.length;d+=1.55)wallPanel(detail,a,c,3.3,part.height-.1,'#7f918b',.03,d/e.length,Math.min(1,(d+.014)/e.length));
            wallPanel(glass,a,c,.2,3.2,'#748d83',.06,.03,.97);
            for(let d=.2;d<e.length;d+=2.2)wallPanel(detail,a,c,.15,3.3,'#c1ccc0',.12,d/e.length,Math.min(1,(d+.075)/e.length));
          }
          wallPanel(detail,a,c,part.height-.18,part.height+.02,'#c2cec4',.18);
        }
      }
      polygon(roofs,part.points,roof,tower?'#82918a':'#a0aba1',part.holes);
      addCollider({points:part.points,holes:part.holes,top:roof,base:b.base});
      if(tower){
        const tf=orientedFrame(part.points);
        for(const v of [-tf.length*.3,0,tf.length*.3]){
          const p=framePoint(tf,0,v);detail.box(p.x,roof+.75,p.z,4.8,1.4,3.2,'#94a49b',Math.atan2(-tf.u.z,tf.u.x));
        }
        for(let i=0;i<6;i++){
          const u=-tf.width/2+(i<2?2.4+i*1.2:5.3+(i-2)*.45);
          const p=framePoint(tf,u,tf.length/2+.6),r=i<2?.48:.16,lo=7.2,hi=roof+2.4;
          batchPipe(detail,[p.x,lo,p.z],[p.x,hi,p.z],r,i<2?'#83938e':'#d8dcd2');
          for(let y=lo+2;y<hi;y+=2.4)batchPipe(detail,[p.x,y,p.z],[p.x,y+.08,p.z],r+.028,'#b4c0b5');
          detail.box(p.x,hi+.08,p.z,r*2.1,.16,r*2.1,'#4c625b');
        }
      }else{
        // The repeated white service banks occupy the lower northeast roof,
        // distinct from the old tower's mixed rooftop plant and tall flues.
        const at=(u,v,y)=>{const p=framePoint(f,u,v);return[p.x,y,p.z];};
        for(let u=-3;u<19;u+=4.5)for(let v=27;v<39;v+=2.8){
          const points=[at(u,v,roof+.12),at(u,v,roof+1.3),at(u+.35,v,roof+1.65),at(u+.9,v,roof+1.65),at(u+1.2,v,roof+1.35)];
          if(points.some(p=>!inPolygon(p[0],p[2],part.points)))continue;
          for(let k=0;k<points.length-1;k++)batchPipe(detail,points[k],points[k+1],.12,'#d2d8d0');
        }
      }
    }
    chemicalPlanting(b,f);
  }

  function chemicalPlanting(b,f){
    const beds=new Batch(),plants=new Batch(),random=rng(211);plants.base=0;
    // Photo-led succulent beds along the main glazed wing, outside its mapped
    // perimeter. Dimensions and individual plant positions are estimates.
    for(const [lo,hi]of [[-32,-12],[-7,14]]){
      const points=frameRectangle(f,2.4,hi-lo,-f.width/2-2.7,(lo+hi)/2);
      polygon(beds,points,.13,'#9c9d85');
      for(let v=lo+.8;v<hi;v+=1.25){
        const p=framePoint(f,-f.width/2-2.7+(random()-.5)*.6,v),base=terrainHeight(p.x,p.z)+.16;
        const path=nearestPath(p.x,p.z);if(path.distance<(path.path?.width||3)/2+.3)continue;
        for(let leaf=0;leaf<11;leaf++){
          const a=leaf/11*TAU+random()*.25,dx=Math.cos(a),dz=Math.sin(a),px=-dz,pz=dx,len=.55+random()*.55,w=.1;
          const left=[p.x+dx*len*.5+px*w,base+.35,p.z+dz*len*.5+pz*w],right=[p.x+dx*len*.5-px*w,base+.35,p.z+dz*len*.5-pz*w];
          plants.quad([p.x,base,p.z],left,[p.x+dx*len,base+.6+random()*.2,p.z+dz*len],right,leaf%2?'#6d9281':'#8ca49a');
        }
      }
    }
    world.add(beds.mesh(style('#ffffff',{vertexColors:true})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function websterTheatres(b,masonry,aggregate,glass,detail,roofs){
    const g=websterTheatresGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,classify=modernFacadeFrame(b).classify;
    const low=buildingBase(b.points)-b.base;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],e=classify(a,c);if(e.length<.2)continue;
      const west=e.u<-.8;
      wallPanel(west?masonry:aggregate,a,c,low,b.height,west?'#c9d1c7':'#b1b5a8');
      wallPanel(detail,a,c,b.height-.12,b.height+.03,'#cbd2c5',.12);
      for(let y=1.5;y<b.height;y+=1.5)wallPanel(detail,a,c,y,y+.014,'#a9b8ac',.025);
      if(Math.abs(e.u)>.8){
        wallPanel(glass,a,c,4.55,5.05,'#415b53',.06,.04,.96);
        for(let d=.7;d<e.length;d+=1.9)wallPanel(detail,a,c,4.5,5.1,'#dce2d4',.14,d/e.length,Math.min(1,(d+.18)/e.length));
        if(west){
          wallPanel(glass,a,c,.15,3.15,'#68867e',.07,.08,.92);
          wallPanel(glass,a,c,3.75,5.95,'#92aaa3',.07,.32,.68);
          wallPanel(detail,a,c,3.25,3.65,'#bfc8b6',.5,.3,.7);
          for(let d=.6;d<e.length;d+=1.7)wallPanel(detail,a,c,.1,3.25,'#d4ddd1',.16,d/e.length,Math.min(1,(d+.065)/e.length));
          wallPanel(detail,a,c,1.5,1.56,'#cbd6ca',.17,.08,.92);
          const t=.5,door=[a.x+(c.x-a.x)*t+e.nx*.2,a.z+(c.z-a.z)*t+e.nz*.2];
          detail.box(door[0],1.5,door[1],.045,.6,.045,'#b7c8ba');
        }
      }
    }
    polygon(roofs,b.points,b.height,'#aeb8ab');
    const canopy=new Batch();canopy.base=b.base;
    for(let v=g.canopy.start;v<g.canopy.end;v+=3.6){
      for(let i=0;i<10;i++){
        const t=i/10,u=(i+1)/10,point=(s,w)=>{const p=framePoint(f,g.canopy.west+s*g.canopy.depth,w);return[p.x,g.roofHeight(s),p.z];};
        canopy.quad(point(t,v),point(u,v),point(u,Math.min(g.canopy.end,v+3.5)),point(t,Math.min(g.canopy.end,v+3.5)),'#d2d3be');
        if(v===g.canopy.start||v+3.6>=g.canopy.end){const end=v===g.canopy.start?g.canopy.start:g.canopy.end;batchBeam(detail,point(t,end),point(u,end),.06,'#3e5551');}
      }
      const a=framePoint(f,g.canopy.west,v),c=framePoint(f,g.west,v);
      batchBeam(detail,[a.x,g.roofHeight(0)-.08,a.z],[c.x,g.roofHeight(1)-.08,c.z],.07,'#405550');
    }
    for(const p of g.posts){
      const bottom=terrainHeight(p.x,p.z)-b.base,top=g.roofHeight(0)-.02;
      detail.box(p.x,(bottom+top)/2,p.z,.13,top-bottom,.13,'#3c5550');
      addCollider({x:p.x,z:p.z,radius:.105,bottom,top,base:b.base});
    }
    world.add(canopy.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.86})));
    addCollider({points:b.points,bottom:low,top:b.height,base:b.base});
    addCollider({points:frameRectangle(f,g.canopy.depth,g.canopy.length,g.west-g.canopy.depth/2,(g.canopy.start+g.canopy.end)/2),bottom:3.38,top:4.05,base:b.base});
  }

  function clancyAuditorium(b,detail){
    const g=clancyGeometry(b),f=g.frame,h=g.hood,concrete=new Batch(),outer=new Batch(),gold=new Batch(),glazing=new Batch(),floor=new Batch();
    for(const batch of [concrete,outer,gold,glazing,floor])batch.base=b.base;
    const p=(u,v,y)=>{const q=framePoint(f,u,v);return[q.x,y,q.z];};
    const low=Math.min(0,buildingBase(b.points)-b.base),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    // The opaque auditorium is inset from the glazed wraparound foyer.
    const core=polygonArea(g.core)<0?[...g.core].reverse():g.core;
    for(let i=0;i<core.length;i++)wallPanel(concrete,core[i],core[(i+1)%core.length],0,12.5,'#adb6aa');
    polygon(concrete,g.core,12.5,'#9fa99e');
    polygon(floor,b.points,.055,'#233d72');
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.2)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,normalV=nx*f.v.x+nz*f.v.z,normalU=nx*f.u.x+nz*f.u.z;
      wallPanel(concrete,a,c,low,.04,'#a4aea1');
      // Long side faces are glazed; diagonal corners and the stage end retain
      // the faceted concrete shell seen around the new foyer hoods.
      if(normalV<-.9)continue;
      if(Math.abs(normalU)>.9)continue;
      const top=q=>normalV>.8?8.5:Math.max(2.6,8.8-(Math.abs(g.local(q).u)-12)*.5);
      concrete.quad([a.x,0,a.z],[a.x,top(a),a.z],[c.x,top(c),c.z],[c.x,0,c.z],'#bdc3b5');
      if(normalV>.8){wallPanel(detail,a,c,.2,2.6,'#696d59',.07,.46,.54);wallPanel(detail,a,c,7.9,8.4,'#a3ac9b',.08);}
    }
    // North civic hood: oxidised outer copper and a warm shingle-lined interior.
    const rearLeft=p(h.centreU-h.width/2,h.backV,h.backHeight),rearRight=p(h.centreU+h.width/2,h.backV,h.backHeight);
    const lipLeft=p(h.centreU-h.lipWidth/2,h.lipV,h.lipHeight),lipRight=p(h.centreU+h.lipWidth/2,h.lipV,h.lipHeight);
    outer.quad(rearLeft,rearRight,lipRight,lipLeft,'#42463e');
    const beneath=q=>[q[0],q[1]-.24,q[2]];
    gold.quad(beneath(lipLeft),beneath(lipRight),beneath(rearRight),beneath(rearLeft),'#d8b469');
    outer.quad(lipLeft,lipRight,beneath(lipRight),beneath(lipLeft),'#343e38');
    for(const side of [-1,1]){
      const base=p(h.centreU+side*h.width/2,h.glassV,0),backBase=p(h.centreU+side*h.width/2,h.backV,0),rear=side<0?rearLeft:rearRight,lip=side<0?lipLeft:lipRight;
      gold.quad(base,lip,rear,backBase,'#d2aa55');
      const shift=q=>[q[0]+f.u.x*side*.2,q[1],q[2]+f.u.z*side*.2];
      outer.quad(shift(backBase),shift(rear),shift(lip),shift(base),'#4a4940');
      outer.quad(base,shift(base),shift(lip),lip,'#3c443c');
    }
    const ga=framePoint(f,h.centreU-h.width/2,h.glassV),gc=framePoint(f,h.centreU+h.width/2,h.glassV);
    wallPanel(glazing,ga,gc,.08,h.glassHeight,'#b9d0c6');
    wallPanel(gold,ga,gc,h.glassHeight,g.roofHeight(h.glassV)-.24,'#d6b268');
    for(let u=-h.width/2;u<=h.width/2+.01;u+=h.width/8){
      const a=p(h.centreU+u,h.glassV-.035,.05),c=p(h.centreU+u,h.glassV-.035,h.glassHeight);
      batchPipe(detail,a,c,.012,'#879b8f');
    }
    for(const u of [-8.6,-2.9,2.9,8.6]){
      batchPipe(detail,p(h.centreU+u,h.glassV-.12,.95),p(h.centreU+u,h.glassV-.12,1.65),.022,'#c3d0c2');
    }
    const canopyV=h.glassV-1.2,canopyWidth=24.5;
    const ca=framePoint(f,h.centreU,canopyV),angle=Math.atan2(-f.u.z,f.u.x);
    detail.box(ca.x,3.65,ca.z,canopyWidth,.08,1.7,'#8c9d92',angle);
    for(let u=-10;u<=10;u+=4){
      const a=p(h.centreU+u,canopyV,3.7),c=p(h.centreU+u,canopyV,g.roofHeight(canopyV)-.3);
      batchPipe(detail,a,c,.014,'#667f73');
      const from=p(h.centreU+u,canopyV-.85,3.72),to=p(h.centreU+u,canopyV+.85,3.72);batchBeam(detail,from,to,.035,'#536e62');
    }
    // Smaller east and west glazed hoods wrap around the original hall.
    for(const side of [-1,1]){
      const u=side*21.5,lipU=side*24.4;
      const a=framePoint(f,u,side>0?-10:12),c=framePoint(f,u,side>0?12:-10);
      wallPanel(glazing,a,c,.08,5.1,'#a7c1b7');
      for(let v=-10;v<=12;v+=2.2)batchPipe(detail,p(u,v,.1),p(u,v,5.1),.014,'#93a69a');
      gold.quad(p(u,-10,5.2),p(u,12,5.2),p(lipU,12,7),p(lipU,-10,7),'#d0a64d');
      outer.quad(p(u,12,5.43),p(u,-10,5.43),p(lipU,-10,7.23),p(lipU,12,7.23),'#454a40');
      outer.quad(p(lipU,-10,7.23),p(lipU,12,7.23),p(lipU,12,7),p(lipU,-10,7),'#3b443a');
    }
    // A restrained foyer fitout is visible through the glazing. The tapestry
    // and interior artworks are not replaced with invented reproductions.
    for(const u of [-10.5,10.5]){const q=framePoint(f,u,-8);detail.box(q.x,1.2,q.z,3,2.4,2.6,'#244477',angle);}
    for(let i=0;i<20;i++){
      const u0=-7+i*.7,u1=u0+.7,v=u=>-8.7-.7*(1-(u/7)**2),a=framePoint(f,u0,v(u0)),c=framePoint(f,u1,v(u1));
      wallPanel(concrete,a,c,.05,1.15,'#c5cabe');
      const d=framePoint(f,u0,v(u0)+1),e=framePoint(f,u1,v(u1)+1);polygon(detail,[a,c,e,d],1.18,'#a7afa4');
    }
    const logo=canvasTexture(1024,384,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#e9ead5';ctx.textAlign='center';ctx.font='500 220px sans-serif';ctx.fillText('UNSW',w/2,240);ctx.font='500 63px sans-serif';ctx.fillText('S Y D N E Y',w/2,330);});
    const wordmark=new THREE.Mesh(new THREE.PlaneGeometry(8,3),new THREE.MeshBasicMaterial({map:logo,transparent:true,opacity:.7,depthWrite:false})),q=framePoint(f,h.centreU,h.glassV-.08);
    wordmark.position.set(q.x,b.base+7,q.z);wordmark.rotation.y=Math.atan2(-f.v.x,-f.v.z);world.add(wordmark);
    const copper=copperShingles();
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.045})),outer.mesh(style('#ffffff',{vertexColors:true,metalness:.55,roughness:.6,side:THREE.DoubleSide})),gold.mesh(style('#ffffff',{vertexColors:true,map:copper,bumpMap:copper,bumpScale:.018,metalness:.58,roughness:.36,emissive:'#a37225',emissiveIntensity:.19,side:THREE.DoubleSide})),glazing.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.28,roughness:.08,metalness:.2,side:THREE.DoubleSide,depthWrite:false})),floor.mesh(style('#ffffff',{vertexColors:true})));
    addCollider({points:b.points,bottom:low,top:b.height,base:b.base});
    for(const hood of buildings.filter(q=>q.modelledWith===b.id))addCollider({points:hood.points,bottom:hood.id==='osm-way-1178531028'?6.86:5.1,top:hood.id==='osm-way-1178531028'?14.5:7.23,base:b.base});
  }

  function chancelleryBuilding(b,brick,glass,detail,roofs){
    const g=chancelleryGeometry(b),f=g.frame,w=g.west,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.2)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,normalV=nx*f.v.x+nz*f.v.z,normalU=nx*f.u.x+nz*f.u.z,mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
      const western=mid.u<4.14&&mid.v>w.minV-.1&&mid.v<w.maxV+.1;
      wallPanel(brick,a,c,0,western?w.eave:14.8,'#796d58');
      if(western&&Math.abs(normalV)>.8){
        const bays=w.bays;
        for(let j=0;j<bays;j++){
          const u=w.minU+(j+.5)*g.pitch;
          for(let floor=0;floor<4;floor++){
            const lo=2.5+floor*2.9+.4,hi=lo+1.85,p0=framePoint(f,u-g.pitch*.35,mid.v),p1=framePoint(f,u+g.pitch*.35,mid.v);
            const aa=normalV>0?p1:p0,cc=normalV>0?p0:p1;
            wallPanel(glass,aa,cc,lo,hi,'#526c66',.08);
            wallPanel(detail,aa,cc,hi,hi+.1,'#b4bfb0',.13);
            if(normalV<0&&floor===3){wallPanel(detail,aa,cc,lo-.35,lo+.55,'#bfc8b5',.75);}
          }
        }
        for(let j=0;j<=bays;j++){
          const p=framePoint(f,w.minU+j*g.pitch,mid.v),column={x:p.x+nx*.16,z:p.z+nz*.16};
          detail.box(column.x,7.2,column.z,.27,14.4,.42,'#c4ccba',Math.atan2(-f.u.z,f.u.x));
        }
      }else{
        const entrance=normalU>.85&&mid.u>15&&mid.u<16&&Math.abs(mid.v)<26,bays=Math.max(1,Math.round(len/2.5));
        for(let floor=0;floor<5;floor++)for(let bay=0;bay<bays;bay++){
          const midT=(bay+.5)/bays,half=(entrance&&floor<3?.43:.28)/bays,lo=floor*3+.38,hi=lo+2.25;
          wallPanel(glass,a,c,lo,hi,entrance&&floor<3?'#637c70':'#4b625c',.07,midT-half,midT+half);
          wallPanel(detail,a,c,hi,hi+.055,'#b4beac',.16,midT-half,midT+half);
          wallPanel(detail,a,c,(lo+hi)/2,(lo+hi)/2+.035,'#819586',.12,midT-half,midT+half);
        }
        for(let floor=1;floor<5;floor++)wallPanel(detail,a,c,floor*3-.12,floor*3+.04,'#575f50',.07);
        if(western&&Math.abs(normalU)>.8)wallPanel(detail,a,c,13.1,13.45,'#3e564b',.08,.3,.7);
      }
      if(!western)wallPanel(detail,a,c,14.6,15,'#c5ccbb',.28);
    }
    for(const region of CHANCELLERY_ROOFS){
      if(region.kind==='vaults')shapedRoof(roofs,region.points,g.roofHeight,'#c1c9b8');
      else polygon(roofs,region.points,15,'#a4afa0',region.holes);
    }
    // Thin concrete arch edges make the repeated barrel vaults legible from
    // Library Lawn and the northern courtyard.
    for(const v of [w.minV,w.maxV])for(let bay=0;bay<w.bays;bay++)for(let i=0;i<12;i++){
      const u=w.minU+(bay+i/12)*g.pitch,t=u+g.pitch/12,a=framePoint(f,u,v),c=framePoint(f,t,v),ya=g.roofHeight(a),yc=g.roofHeight(c);
      const edge=[[a.x,w.eave-.12,a.z],[a.x,ya,a.z],[c.x,yc,c.z],[c.x,w.eave-.12,c.z]];
      detail.quad(...(v===w.maxV?edge.reverse():edge),'#d4d9c8');
    }
    const entry=framePoint(f,17.2,0),angle=Math.atan2(-f.v.z,f.v.x);
    detail.box(entry.x,8.15,entry.z,10,.2,3.6,'#d6dccb',angle);
    for(const v of [-4.7,4.7]){
      const p=framePoint(f,18.6,v),bottom=terrainHeight(p.x,p.z)-b.base;
      detail.box(p.x,(bottom+8.1)/2,p.z,.16,8.1-bottom,.16,'#b8c7b4');addCollider({x:p.x,z:p.z,radius:.1,bottom,top:8.2,base:b.base});
    }
    const ea=framePoint(f,19, -4.5),ec=framePoint(f,19,4.5);
    facadeLabel(b,ea,ec,'The Chancellery','',2.4,8.16,'#354b3f');
    chancelleryGarden(b,g);
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function chancelleryGarden(b,g){
    const wood=new Batch(),fronds=new Batch();wood.base=fronds.base=0;
    const mulch=new Batch();
    for(const bed of g.beds)polygon(mulch,bed,.07,'#9b7959');
    for(const [index,fern]of g.ferns.entries()){
      const base=terrainHeight(fern.x,fern.z),top=base+fern.height;
      batchPipe(wood,[fern.x,base,fern.z],[fern.x,top,fern.z],.12,'#7b7151');
      for(let leaf=0;leaf<12;leaf++){
        const angle=leaf/12*TAU+index*.7,dx=Math.cos(angle),dz=Math.sin(angle),px=-dz,pz=dx;
        for(let i=0;i<9;i++){
          const t=i/9,r=t*2.3,y=top+.55*Math.sin(t*Math.PI)-.45*t,x=fern.x+dx*r,z=fern.z+dz*r;
          const width=.42*Math.sin((t+.1)*Math.PI);
          for(const side of [-1,1])fronds.triangle([x,y,z],[x+dx*.18,y-.02,z+dz*.18],[x+dx*.35+px*width*side,y-.12,z+dz*.35+pz*width*side],leaf%2?'#638844':'#86a85d');
        }
      }
      addCollider({x:fern.x,z:fern.z,radius:.17,top:fern.height,base});
    }
    for(const v of [-10,-5,5,10]){
      const p=framePoint(g.frame,26,v),base=terrainHeight(p.x,p.z),ball=new THREE.Mesh(new THREE.SphereGeometry(.34,10,7),style('#a3a68d',{map:surfaceTexture('aggregate'),bumpMap:surfaceTexture('aggregate'),bumpScale:.025}));
      ball.position.set(p.x,base+.29,p.z);ball.castShadow=true;world.add(ball);addCollider({x:p.x,z:p.z,radius:.34,top:.63,base});
    }
    world.add(mulch.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('aggregate')})),wood.mesh(style('#ffffff',{vertexColors:true})),fronds.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function bioscienceBuilding(b,detail,roofs){
    const g=bioscienceGeometry(b),f=g.frame,panels=new Batch(),glazing=new Batch();panels.base=glazing.base=b.base;
    const northPalette=['#c4cdc7','#aab6b1','#d4d8ce','#8b9e9a','#bdc5bd','#dae0d6'];
    const clay=['#b9653d','#bd7d50','#d3aa77','#b45236','#d8be8b','#996244','#d1cdc0'];
    for(const part of BIOSCIENCE_PARTS.filter(p=>p.buildingId===b.id)){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points,top=part.roofRL-b.base;
      const floating=part.kind==='glass-box',bottom=floating?57.57-b.base:0;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
        const mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
        const grayEnd=g.north&&part.kind==='main'&&nu>.8;
        const allGlass=floating||part.kind==='atrium'||g.north&&part.kind==='main'&&nv<-.7&&mid.u>30;
        wallPanel(panels,a,c,bottom,top,part.kind==='biolink'?'#9baba2':grayEnd?'#bdc5b8':g.north?'#a9b8b1':'#745a46');
        if(grayEnd){
          const cols=Math.max(1,Math.round(len/.5)),rows=18;
          for(let j=0;j<cols;j++)for(let r=0;r<rows;r++){
            const t=(j+.5)/cols,wave=Math.sin(j*.36+r*.48)+Math.sin(j*.15-r*.69),color=northPalette[Math.max(0,Math.min(5,Math.floor(2.5+wave*1.5)))];
            wallPanel(panels,a,c,bottom+(top-bottom)*r/rows,bottom+(top-bottom)*(r+1)/rows-.014,color,.025,(j+.02)/cols,(j+.98)/cols);
          }
        }else if(part.kind==='biolink'){
          for(let r=1;r<8;r++){
            const lo=g.levels[r]-b.base+.32,hi=Math.min(top-.25,lo+2.35);if(hi<=lo)continue;
            wallPanel(glazing,a,c,lo,hi,'#69858a',.055,.015,.985);
            wallPanel(detail,a,c,hi,hi+.19,'#d2d9ce',.17);
            for(let d=.4;d<len;d+=1.2)wallPanel(detail,a,c,lo,hi,'#b5c5bb',.09,d/len,Math.min(1,(d+.05)/len));
          }
        }else{
          // Raised glass base and repeated laboratory levels follow the
          // planning floor RLs. Missing map-level tags are never fabricated.
          const count=Math.max(1,Math.round(len/(allGlass?1.5:g.north?1.05:.55)));
          for(let r=0;r<g.levels.length-1;r++){
            const lo=Math.max(bottom,g.levels[r]-b.base+.1),hi=Math.min(top-.16,g.levels[r+1]-b.base-.12);if(hi<=lo)continue;
            const baseLevel=g.levels[r]<61.53;
            for(let j=0;j<count;j++){
              const start=j/count,end=(j+1)/count,cell=(j*13+r*7)%17;
              const blue=baseLevel?'#3e5a55':['#90abb3','#a4b9b8','#b8c8bf','#96b0b5','#c1cfc5'][Math.floor(j/4+r)%5];
              wallPanel(glazing,a,c,lo,hi,blue,.065,start+.018/count,end-.018/count);
              if(allGlass||baseLevel){
                wallPanel(detail,a,c,lo,hi,'#657f7c',.1,start,Math.min(end,start+.045/len));
              }else if(g.north){
                const shade=northPalette[(Math.floor(j/3)+r*2)%northPalette.length],width=cell<5?.8:cell<11?.52:.24;
                wallPanel(panels,a,c,lo,hi,shade,.14,start,Math.min(end,start+width/count));
                wallPanel(detail,a,c,lo,hi,'#d3dcd2',.31,Math.min(end,start+.08/count),Math.min(end,start+.15/count));
              }else{
                const shade=clay[(Math.floor(j/3)+r+Math.floor(j/11))%clay.length];
                const p={x:a.x+(c.x-a.x)*(start+end)/2+nx*.3,z:a.z+(c.z-a.z)*(start+end)/2+nz*.3};
                detail.box(p.x,(lo+hi)/2,p.z,.105,hi-lo,.36,shade,Math.atan2(-(c.z-a.z),c.x-a.x));
                if(cell<5)wallPanel(panels,a,c,lo,lo+(hi-lo)*.34,shade,.1,start,end);
              }
            }
            wallPanel(detail,a,c,hi,hi+.08,allGlass?'#5f7b7f':g.north?'#7e938e':'#826b52',.18);
          }
        }
        wallPanel(detail,a,c,top-.15,top+.04,g.north?'#c6cfc4':'#8f7963',.22);
      }
      polygon(roofs,part.points,top,g.north?'#aab7ac':'#9c9d87',part.holes);
      if(floating){
        polygon(panels,part.points,bottom,'#586e6a',part.holes);
        for(const p of g.supports){
          const ground=terrainHeight(p.x,p.z)-b.base;
          detail.box(p.x,(ground+bottom)/2,p.z,.75,bottom-ground,.75,'#b8c4b6');addCollider({x:p.x,z:p.z,radius:.47,top:bottom,base:b.base});
        }
      }
      addCollider({points:part.points,holes:part.holes,bottom,top,base:b.base});
    }
    for(const plant of g.plants){
      const low=plant.bottomRL-b.base,high=plant.roofRL-b.base,ring=polygonArea(plant.points)<0?[...plant.points].reverse():plant.points;
      polygon(roofs,ring,high,'#77867b');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(panels,a,c,low,high,g.north?'#7c877d':'#95795e');
        for(let y=low+.12;y<high;y+=.18)wallPanel(detail,a,c,y,y+.035,g.north?'#626f65':'#665e4b',.055);
      }
    }
    if(g.north){
      const c=g.canopy,start=c.start,end=c.end,roof=c.roofRL-b.base;
      const canopy=frameRectangle(f,end-start,c.depth,(start+end)/2,c.v-c.depth/2),underside=new Batch();underside.base=b.base;
      polygon(detail,canopy,roof,'#6a7c70');polygon(underside,canopy,roof-.17,'#aa7947');
      world.add(underside.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
      const a=framePoint(f,start,c.v-c.depth),z=framePoint(f,end,c.v-c.depth);wallPanel(detail,a,z,roof-.2,roof,'#344d46');
      addCollider({points:canopy,bottom:roof-.2,top:roof,base:b.base});
    }
    const mesh=glazing.mesh(style('#ffffff',{vertexColors:true,roughness:.065,metalness:.76,envMapIntensity:1.25}));
    world.add(panels.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.014,side:THREE.DoubleSide})),mesh);
    const front=framePoint(f,g.north?0:39,g.north?-29:-6),target=new THREE.WebGLCubeRenderTarget(512,{type:THREE.HalfFloatType,generateMipmaps:true,minFilter:THREE.LinearMipmapLinearFilter});
    const probe=new THREE.CubeCamera(.3,300,target);probe.position.set(front.x,72,front.z);
    mesh.material.envMap=target.texture;campusReflections.push({mesh,probe,target});
    if(!g.north)bioscienceStreetGarden(g);
  }

  function bioscienceStreetGarden(g){
    const soil=new Batch(),wall=new Batch(),plants=new Batch(),wood=new Batch();plants.base=wood.base=0;
    polygon(soil,g.streetGarden.points,.09,'#918d68');
    const a=framePoint(g.frame,47.3,-19),c=framePoint(g.frame,47.3,19);
    wallPanel(wall,a,c,0,.62,'#a3a387');wallPanel(wall,c,a,0,.62,'#a3a387');
    ribbon(wall,[a,c],.3,.65,'#c2c4ac');
    addCollider({points:frameRectangle(g.frame,.3,38,47.3,0),base:0,terrainOffset:.65});
    for(let u=42.1;u<47;u+=.8)for(let v=-18.5;v<19;v+=1.1){
      const p=framePoint(g.frame,u,v),base=terrainHeight(p.x,p.z)+.12;
      for(let i=0;i<11;i++){
        const angle=i/11*TAU+v,dx=Math.cos(angle),dz=Math.sin(angle),length=.48+((i+Math.round(v))%3+3)%3*.16,shade=['#597d46','#899c54','#63874b'][i%3];
        const left=[p.x+dx*.18-dz*.05,base+.5,p.z+dz*.18+dx*.05],right=[p.x+dx*.18+dz*.05,base+.5,p.z+dz*.18-dx*.05];
        plants.triangle([p.x,base,p.z],left,right,shade);plants.triangle(left,[p.x+dx*length,base+.25,p.z+dz*length],right,shade);
      }
    }
    for(const tree of g.streetGarden.trees){
      const base=terrainHeight(tree.x,tree.z);batchPipe(wood,[tree.x,base,tree.z],[tree.x,base+3.7,tree.z],.07,'#8e8b6e');
      for(let i=0;i<9;i++){
        const angle=i/9*TAU,x=tree.x+Math.cos(angle)*1.1,z=tree.z+Math.sin(angle)*1.1,y=base+3.7+(i%3)*.3;
        batchPipe(wood,[tree.x,base+2.3,tree.z],[x,y,z],.025,'#9b987e');
        for(let j=0;j<10;j++){
          const t=j/10,px=tree.x+(x-tree.x)*t,pz=tree.z+(z-tree.z)*t,py=base+2.3+(y-base-2.3)*t;
          plants.triangle([px-.14,py,pz],[px+.14,py+.16,pz],[px,py+.5,pz+.24],j%2?'#71965b':'#8ca36b');
        }
      }
      addCollider({x:tree.x,z:tree.z,radius:.1,top:tree.height,base});
    }
    world.add(soil.mesh(style('#ffffff',{vertexColors:true})),wall.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick')})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),wood.mesh(style('#ffffff',{vertexColors:true})));
  }

  function mathewsTheatre(b,concrete,glass,detail,roofs){
    const g=mathewsTheatreGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      wallPanel(concrete,a,c,0,b.height,'#b9b6a3');
      wallPanel(detail,a,c,0,.45,'#5b7180',.03);
      if(nu<-.8){
        wallPanel(glass,a,c,.35,3.1,'#648079',.07,.04,.96);
        wallPanel(detail,a,c,3.12,3.75,'#e0e0d0',.18);
        for(let d=.3;d<len;d+=2.7)wallPanel(detail,a,c,.15,3.75,'#ccd1bd',.24,d/len,Math.min(1,(d+.24)/len));
        for(const y of [4.2,8.2])wallPanel(detail,a,c,y,y+.35,'#b1b5a3',.55);
        const p=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
        const midV=(((a.x+c.x)/2-f.x)*f.v.x+((a.z+c.z)/2-f.z)*f.v.z);
        if(midV>-3&&midV<7){
          facadeLabel(b,p(.25),p(.75),'Mathews Theatres','A B C D',4.8,3.4,'#36443c');
          wallPanel(detail,a,c,1.05,1.1,'#d3ddd0',.09,.15,.85);
          wallPanel(detail,a,c,1.8,1.85,'#d3ddd0',.09,.15,.85);
        }
      }else{
        for(let d=.3;d<len;d+=2.2)wallPanel(detail,a,c,.5,b.height-.2,'#a2ad9f',.022,d/len,Math.min(1,(d+.025)/len));
        wallPanel(detail,a,c,5.2,5.25,'#a1ac9c',.045);
      }
      wallPanel(detail,a,c,b.height-.35,b.height,'#d1d3bf',.4);
    }
    polygon(roofs,b.points,b.height,'#9daa9b');
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function terrainCanopy(b){
    const roof=new Batch(),supports=new Batch();supports.base=0;
    polygon(roof,b.points,3.8,'#bcc5b8',b.holes||[]);
    const ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,posts=[];
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(roof,a,c,3.55,3.8,'#a0aea3');
      if(posts.some(p=>distance2(p,a)<8)||nearestPath(a.x,a.z).distance<.6)continue;
      posts.push(a);const base=terrainHeight(a.x,a.z),top=base+3.58;
      batchPipe(supports,[a.x,base,a.z],[a.x,top,a.z],.055,'#526962');addCollider({x:a.x,z:a.z,radius:.075,top:3.6,base});
    }
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),supports.mesh(style('#ffffff',{vertexColors:true,metalness:.4})));
    addCollider({points:b.points,holes:b.holes,base:0,terrainBottom:3.55,terrainOffset:3.8});
  }

  function facadeCaption(b,a,c,text,width,y,color){
    const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
    const texture=canvasTexture(2048,128,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle=color;ctx.textBaseline='middle';ctx.font='500 76px sans-serif';ctx.fillText(text,24,h/2,w-48);});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(width,width/16),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));
    sign.position.set((a.x+c.x)/2+nx*.8,b.base+y,(a.z+c.z)/2+nz*.8);sign.rotation.y=Math.atan2(nx,nz);world.add(sign);
  }

  function sirfBuilding(b,concrete,glass,detail,roofs){
    const g=sirfGeometry(b),metal=new Batch(),screen=new Batch();metal.base=screen.base=b.base;
    // Only the northern street face and eastern end are established by the
    // inspected references. Unseen service faces remain a restrained metal shell.
    for(const i of [1,2])wallPanel(concrete,b.points[i],b.points[(i+1)%b.points.length],0,b.height,'#aeb5af');
    for(const face of g.facades){
      const {a,c,len,normal:n}=face;
      const p=(t,y,offset=0)=>[a.x+(c.x-a.x)*t+n.x*offset,y,a.z+(c.z-a.z)*t+n.z*offset];
      const tri=(batch,vertices,color,uvScale=1)=>batch.triangle(...vertices.map(v=>p(...v)),color,vertices.map(v=>[v[0]*len*uvScale,v[1]*uvScale]));
      for(const q of face.portals){
        const {start:s,end:e,peak:m,bottom:low,glassPeak:h,outerPeak:high,projection:off}=q;
        const inset=.8/len,l=s+inset,r=e-inset;
        // Flat upper envelope and folded crystal seams above the portal.
        for(const [verts,col] of [
          [[[s,low],[s,b.height],[m,b.height]],'#c8cdc6'],
          [[[s,low],[m,b.height],[m,high]],'#aeb7b1'],
          [[[m,high],[m,b.height],[e,b.height]],'#c2c9c3'],
          [[[m,high],[e,b.height],[e,low]],'#b6beb7']])tri(metal,verts,col);
        const outer=[[s,low,0],[m,high,off],[e,low,0]],inner=[[l,low,.02],[m,h,.02],[r,low,.02]];
        // The dark expanded-metal transition is actual folded geometry. Its
        // perforation pattern is generated, not sampled from copyrighted photos.
        for(const j of [0,1]){tri(screen,[outer[j],outer[j+1],inner[j+1]],'#71847b',7);tri(screen,[outer[j],inner[j+1],inner[j]],'#71847b',7);}
        tri(glass,[[l,low,.04],[m,h,.04],[r,low,.04]],'#647f79');
        const heightAt=t=>low+(h-low)*(1-Math.abs((t-m)/((r-l)/2)));
        for(let t=l;t<r;t+=1.45/len){
          const y=heightAt(t);if(y>low+.1)batchBeam(detail,p(t,low,.1),p(t,y,.1),.045,'#a0ada3');
        }
        for(const y of [2.35,4.6])if(y<h){const span=(r-l)/2*(1-(y-low)/(h-low));batchBeam(detail,p(m-span,y,.11),p(m+span,y,.11),.04,'#9caaa0');}
        batchBeam(detail,p(l,low,.12),p(m,h,.12),.055,'#a7b4a6');batchBeam(detail,p(m,h,.12),p(r,low,.12),.055,'#a7b4a6');
        // Fine vertical panel seams stop at the sloping outer opening.
        for(let t=s+.8/len;t<e;t+=.8/len){
          const y=low+(high-low)*(1-Math.abs((t-m)/((e-s)/2)));
          batchBeam(detail,p(t,Math.max(low,y)+.025,.02),p(t,b.height-.03,.02),.008,'#8f9d94');
        }
        wallPanel(concrete,a,c,0,.24,'#abb5aa',.05,s,e);
      }
    }
    const meshTexture=canvasTexture(64,64,ctx=>{ctx.fillStyle='#d1d9d1';ctx.fillRect(0,0,64,64);ctx.fillStyle='#40564e';for(let y=0;y<64;y+=16)for(let x=0;x<64;x+=16){ctx.beginPath();ctx.ellipse(x+(y%32?8:0),y,5,2.4,-.35,0,TAU);ctx.fill();}});
    meshTexture.wrapS=meshTexture.wrapT=THREE.RepeatWrapping;meshTexture.anisotropy=4;
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.45,roughness:.5})),screen.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,map:meshTexture,metalness:.4,roughness:.55})));
    polygon(roofs,b.points,b.height,'#a9b5ab');
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function agsmBuilding(b,concrete,brick,glass,detail,roofs){
    const g=agsmGeometry(b),points=b.points,ring=polygonArea(points)<0?[...points].reverse():points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const court=g.courtyard.some((p,j)=>j<g.courtyard.length-1&&p===a&&g.courtyard[j+1]===c);
      wallPanel(brick,a,c,0,b.height,'#b3a27c');
      wallPanel(detail,a,c,0,.4,'#8d9383',.04);
      if(court){
        // Curved glass follows every original recess facet. Metal blind panels
        // and a projecting horizontal brow distinguish it from the brick street.
        wallPanel(glass,a,c,.45,b.height-.65,'#6e8d83',.06);
        for(let d=.2;d<len;d+=3.2){
          const end=Math.min(1,(d+2.7)/len);
          wallPanel(detail,a,c,.4,2.65,'#91a38a',.075,d/len,end);
          wallPanel(detail,a,c,.45,2.6,'#607969',.09,(d+.1)/len,Math.min(end,(d+1.25)/len));
          wallPanel(detail,a,c,1.1,1.16,'#b6c1ae',.12,(d+.75)/len,Math.min(end,(d+1.1)/len));
        }
        for(let row=0;row<5;row++){
          const y=row*g.rowPitch;
          wallPanel(detail,a,c,y+g.rowPitch-.75,y+g.rowPitch-.1,row===4?'#d4d7c8':'#aab6aa',.32);
          if(row===1)for(let j=0;j<11;j++)wallPanel(detail,a,c,y+.4+j*.23,y+.51+j*.23,'#b6c0b2',.2);
        }
        for(let t=.1;t<len;t+=1.6)wallPanel(detail,a,c,.4,b.height-.65,'#879e8d',.14,t/len,Math.min(1,(t+.06)/len));
      }else if(len>3){
        const bays=Math.max(1,Math.round(len/2.6));
        for(let row=0;row<5;row++){
          const low=row*g.rowPitch+.75,high=(row+1)*g.rowPitch-1.1;
          wallPanel(detail,a,c,low-.1,high+.12,'#46584f',.055,.015,.985);
          for(let bay=0;bay<bays;bay++){
            const s=(bay+.05)/bays,e=(bay+.95)/bays;
            wallPanel(glass,a,c,low,high,'#7c8f80',.075,s,e);
            if((bay+row)%4!==0)wallPanel(detail,a,c,low+.1,high-.05,'#bbc3ad',.085,s+.02/bays,e-.02/bays);
            wallPanel(detail,a,c,low-.08,high+.1,'#647567',.13,(bay+.96)/bays,(bay+1)/bays);
          }
          wallPanel(concrete,a,c,high+.13,high+.3,'#c8cabb',.19);
        }
      }
      wallPanel(detail,a,c,b.height-.25,b.height,'#d0d4c4',.3);
    }
    // Slatted pergola follows the mapped curved courtyard wall. The passage
    // below remains open, with physically collidable slender support posts.
    const roof=new Batch();roof.base=b.base;
    for(let i=0;i<g.pergola.length-1;i++){
      const a=g.pergola[i],c=g.pergola[i+1],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      const p=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      const high=4.05,low=3.78;
      batchBeam(roof,p(0,low,.15),p(1,low,.15),.08,'#566a5d');batchBeam(roof,p(0,high,1.8),p(1,high,1.8),.1,'#546b5b');
      for(let d=0;d<len;d+=.4)batchBeam(roof,p(d/len,low,.1),p(d/len,high,1.95),.045,'#6d8170');
      if(i%2===0){const q=p(.5,0,1.75),ground=terrainHeight(q[0],q[2])-b.base;batchPipe(detail,[q[0],ground,q[2]],[q[0],high,q[2]],.07,'#738473');addCollider({x:q[0],z:q[2],radius:.09,base:b.base,bottom:ground,top:high});}
    }
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,metalness:.35})));
    polygon(roofs,b.points,b.height,'#a6b1a0',b.holes||[]);
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function civilBuilding(b,concrete,aggregate,glass,detail,roofs){
    const g=civilGeometry(b),f=g.frame,outline=lectureFacadeRing(b.points),ring=polygonArea(outline)<0?[...outline].reverse():outline;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z;
      wallPanel(concrete,a,c,0,g.bodyRoof,'#a6aba7');
      wallPanel(detail,a,c,0,g.upperBase,'#46545a',.04);
      if(Math.abs(nv)>.7){
        const bays=Math.max(1,Math.round(len/2.35));
        for(let row=0;row<g.rows;row++){
          const low=g.upperBase+row*g.pitch,high=low+g.pitch;
          wallPanel(aggregate,a,c,low,low+g.pitch*.48,'#bdc1b8',.48);
          for(let bay=0;bay<bays;bay++){
            const left=(bay+.025)/bays,right=(bay+.975)/bays,blind=(bay*3+row*7)%11;
            wallPanel(glass,a,c,low+g.pitch*.51,high-.1,'#627977',.06,left,right);
            if(blind<4)wallPanel(detail,a,c,low+g.pitch*(blind===0?.52:.7),high-.1,'#d2d7ca',.08,left,right);
            if(blind===7)wallPanel(detail,a,c,low+g.pitch*.51,high-.1,'#7c8378',.09,left,right);
            wallPanel(detail,a,c,low+g.pitch*.74,low+g.pitch*.755,'#a4b0a4',.1,left,right);
            wallPanel(detail,a,c,low+g.pitch*.48,high,'#9ca99e',.12,(bay+.97)/bays,(bay+1)/bays);
          }
        }
        for(let d=2;d<len;d+=5.7){
          const t=d/len,x=a.x+(c.x-a.x)*t+nx*.63,z=a.z+(c.z-a.z)*t+nz*.63;
          batchPipe(detail,[x,g.upperBase-.2,z],[x,g.bodyRoof+.15,z],.045,'#4d5d56');
          for(let y=g.upperBase+1;y<g.bodyRoof;y+=g.pitch)batchBeam(detail,[x,y,z],[x-nx*.6,y,z-nz*.6],.025,'#7f8d7f');
        }
        if(nv<-.7){
          const centre=(g.entry.x-a.x)*(c.x-a.x)/(len*len)+(g.entry.z-a.z)*(c.z-a.z)/(len*len),start=Math.max(.01,centre-6/len),end=Math.min(.99,centre+6/len),ground=g.entryGround-b.base;
          wallPanel(glass,a,c,ground+.05,ground+3.1,'#687f78',.12,start,end);
          wallPanel(detail,a,c,ground+3.1,ground+4.05,'#495a60',.75,start-.015,end+.015);
          for(let d=start*len;d<end*len;d+=1.45)wallPanel(detail,a,c,ground,ground+3.1,'#bdc8b5',.18,d/len,Math.min(end,(d+.07)/len));
          const p=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
          facadeCaption(b,p(start),p(end),'Civil & Environmental Engineering · H20',10,ground+3.65,'#e0e6d6');
        }
      }else{
        // Short tower ends are mostly solid, with a service strip and small bays.
        for(let row=0;row<g.rows;row++){
          const low=g.upperBase+row*g.pitch;
          wallPanel(aggregate,a,c,low,low+g.pitch*.5,'#bdc1b8',.25);
          wallPanel(glass,a,c,low+g.pitch*.55,low+g.pitch-.2,'#5b716f',.06,.36,.6);
          wallPanel(detail,a,c,g.upperBase,g.bodyRoof,'#7e8e82',.09,.62,.66);
        }
      }
      wallPanel(aggregate,a,c,g.bodyRoof-.25,g.bodyRoof,'#c4c9bc',.5);
    }
    polygon(roofs,b.points,g.bodyRoof,'#a5b0a1');
    const p=g.plant,ringP=p.points;
    polygon(roofs,ringP,p.top,'#abb5a7');
    for(let i=0;i<ringP.length;i++)wallPanel(concrete,ringP[i],ringP[(i+1)%ringP.length],p.bottom,p.top,'#c2c7bc');
    addCollider({points:b.points,holes:b.holes,top:g.bodyRoof,base:b.base});
  }

  function patriciaBuilding(b,concrete,brick,glass,detail,roofs){
    const g=patriciaGeometry(b),f=g.frame,outline=lectureFacadeRing(b.points),ring=polygonArea(outline)<0?[...outline].reverse():outline,y=rl=>rl-b.base;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      wallPanel(brick,a,c,0,b.height,'#8d7958');
      wallPanel(detail,a,c,b.height-.2,b.height,'#a9b49f',.15);
      if(Math.abs(nu)>.8&&len>12){
        const ground=terrainHeight((a.x+c.x)/2,(a.z+c.z)/2)-b.base,baseTop=ground+3.4;
        // Faceted pale foyer panels surround an inset glass entrance.
        for(let d=0;d<len;d+=3.1){
          const t=d/len,u=Math.min(1,(d+3.1)/len),p=(t,h,off)=>[a.x+(c.x-a.x)*t+nx*off,h,a.z+(c.z-a.z)*t+nz*off];
          const entrance=nu>.8&&d>len*.3&&d<len*.68;
          if(entrance){
            wallPanel(glass,a,c,ground+.05,baseTop-.15,'#647e75',.055,t,u);
            for(const edge of [t,(t+u)/2,u])wallPanel(detail,a,c,ground,baseTop-.1,'#aab9a5',.085,edge,Math.min(1,edge+.06/len));
            wallPanel(detail,a,c,ground+1.05,ground+1.1,'#bfc9b3',.09,t,u);
          }
          else{
            concrete.quad(p(t,0,.5),p(t,baseTop,0),p(u,baseTop,0),p(u,0,.5),'#bdbfae');
            wallPanel(detail,a,c,ground+1.05,ground+1.08,'#929f91',.39,t,u);
            wallPanel(glass,a,c,baseTop-1.15,baseTop-.35,'#8b9f8d',.12,t+.12/len,Math.max(t,Math.min(u,u-.12/len)));
          }
        }
        if(nu>.8){
          wallPanel(glass,a,c,baseTop+.6,b.height-1.8,'#7c9284',.05,.39,.57);
          for(let t=.4;t<.58;t+=.04)wallPanel(detail,a,c,baseTop+.6,b.height-1.8,'#b8c3ac',.1,t,t+.002);
          // Dark ribs carry the transparent canopy along the east foyer.
          const canopy=new Batch();canopy.base=b.base;
          const p=(t,h,off)=>[a.x+(c.x-a.x)*t+nx*off,h,a.z+(c.z-a.z)*t+nz*off];
          canopy.quad(p(0,baseTop+.15,0),p(1,baseTop+.15,0),p(1,baseTop+.15,2),p(0,baseTop+.15,2),'#8baea6');
          for(let d=.1;d<len;d+=1.35)batchBeam(detail,p(d/len,baseTop+.08,0),p(d/len,baseTop+.08,2.15),.07,'#344c45');
          batchBeam(detail,p(0,baseTop+.05,2),p(1,baseTop+.05,2),.09,'#364d46');
          world.add(canopy.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,transparent:true,opacity:.55,roughness:.18})));
          facadeCaption(b,a,c,'Patricia O’Shane · E19',6.5,ground+2.7,'#d1dac7');
        }
      }
    }
    polygon(roofs,b.points,b.height,'#a0ac98');
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    // The external north-east stair occupies the mapped recess. Its dimensions
    // and terrace level are reconstructed from the publicly photographed stair.
    const s=g.stair,dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len;
    const p=(t,side,h)=>[s.a.x+dx*t+nx*s.width/2*side,y(h),s.a.z+dz*t+nz*s.width/2*side];
    stairSegments.push({a:s.a,b:s.b,width:s.width,count:s.count,h0:s.lowRL,h1:s.highRL});
    for(let i=0;i<s.count;i++){
      const t=i/s.count,u=(i+1)/s.count,h=s.lowRL+(s.highRL-s.lowRL)*i/s.count,previous=h-(s.highRL-s.lowRL)/s.count;
      detail.quad(p(t,1,h),p(u,1,h),p(u,-1,h),p(t,-1,h),'#b8bea7');
      detail.quad(p(t,1,previous),p(t,1,h),p(t,-1,h),p(t,-1,previous),'#919e87');
    }
    for(const side of [-1,1]){
      const low=s.lowRL,high=s.highRL;
      detail.quad(p(0,side,low-.15),p(0,side,low+1.03),p(1,side,high+1.03),p(1,side,high-.15),'#c7c7a5');
      detail.quad(p(1,side,high-.15),p(1,side,high+1.03),p(0,side,low+1.03),p(0,side,low-.15),'#c7c7a5');
      batchBeam(detail,p(0,side,low+1.08),p(1,side,high+1.08),.035,'#6b7966');
      for(let t=0;t<=1;t+=.1){const q=p(t,side,low+(high-low)*t+.4);addCollider({x:q[0],z:q[2],radius:.09,bottom:q[1]-.5,top:q[1]+.7,base:b.base});}
    }
    polygon(detail,g.landing,y(g.firstRL),'#b5bca4');
    addCollider({points:g.landing,bottom:y(g.firstRL)-.16,top:y(g.firstRL),stepHeight:.27,base:b.base});
    const soffit=new Batch();soffit.base=b.base;polygon(soffit,g.landing,y(g.firstRL)-.16,'#c3c8ad');world.add(soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    for(let i=0;i<g.landing.length;i++){
      const a=g.landing[i],c=g.landing[(i+1)%g.landing.length],length=distance2(a,c);
      if(i===2||i===3||i===4)continue;
      batchBeam(detail,[a.x,y(g.firstRL)+1.05,a.z],[c.x,y(g.firstRL)+1.05,c.z],.035,'#475e50');
      for(let d=.1;d<length;d+=.15){const t=d/length,x=a.x+(c.x-a.x)*t,z=a.z+(c.z-a.z)*t;batchBeam(detail,[x,y(g.firstRL)+.05,z],[x,y(g.firstRL)+1.05,z],.012,'#5e7560');if(Math.round(d/.15)%3===0)addCollider({x,z,radius:.025,bottom:y(g.firstRL),top:y(g.firstRL)+1.1,base:b.base});}
    }
    for(const q of g.columns){
      const low=terrainHeight(q.x,q.z);batchPipe(detail,[q.x,y(low),q.z],[q.x,y(g.coverRL),q.z],q.radius,'#b44135');addCollider({x:q.x,z:q.z,radius:q.radius,top:y(g.coverRL),base:b.base});
    }
    const cover=new Batch();cover.base=b.base;polygon(cover,g.landing,y(g.coverRL),'#9bb6a6');
    for(let i=0;i<g.landing.length;i++){const a=g.landing[i],c=g.landing[(i+1)%g.landing.length];batchBeam(detail,[a.x,y(g.coverRL),a.z],[c.x,y(g.coverRL),c.z],.065,'#3b5248');}
    for(let u=0;u<16.6;u+=1.4){const a=framePoint(f,u,-23),c=framePoint(f,u,-20.5);batchBeam(detail,[a.x,y(g.coverRL),a.z],[c.x,y(g.coverRL),c.z],.045,'#3b5248');}
    world.add(cover.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.55,side:THREE.DoubleSide,roughness:.18})));
    addCollider({points:g.landing,bottom:y(g.coverRL)-.1,top:y(g.coverRL)+.1,base:b.base});
  }

  function samuelsBuilding(b,concrete,brick,glass,detail,roofs){
    const g=samuelsGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,screens=new Batch();screens.base=b.base;
    const claddingBase=7.2,rows=5,pitch=(g.bodyRoof-claddingBase)/rows;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      wallPanel(brick,a,c,0,claddingBase,'#a37555');
      wallPanel(concrete,a,c,claddingBase,g.bodyRoof,'#c6cdca');
      for(let d=.15;d<len;d+=.65)wallPanel(detail,a,c,claddingBase,g.bodyRoof,'#acbab5',.015,d/len,Math.min(1,(d+.018)/len));
      const bays=Math.max(1,Math.round(len/2.7));
      for(let bay=0;bay<bays;bay++){
        const lo=(bay+.17)/bays,hi=(bay+.83)/bays;
        for(let row=0;row<rows;row++){
          const bottom=claddingBase+row*pitch+.85,top=bottom+1.02;
          wallPanel(detail,a,c,bottom-.08,top+.08,'#71837f',.04,lo-.035/bays,hi+.035/bays);
          wallPanel(glass,a,c,bottom,top,'#4d686d',.065,lo,hi);
          wallPanel(detail,a,c,bottom+.45,bottom+.49,'#91a29b',.085,lo,hi);
        }
        for(const [bottom,height] of [[1.2,.65],[4.5,1.25]]){
          wallPanel(detail,a,c,bottom-.08,bottom+height+.08,'#929b8d',.04,lo+.12/bays,hi-.12/bays);
          wallPanel(glass,a,c,bottom,bottom+height,'#526968',.07,lo+.15/bays,hi-.15/bays);
        }
      }
      if(len>12){
        const screenCount=Math.max(2,Math.round(len/8.2));
        for(let j=1;j<screenCount;j++){
          const t=j/screenCount,w=1.15/len;
          wallPanel(screens,a,c,claddingBase-.8,g.bodyRoof+.35,'#e0e5dc',.68,t-w/2,t+w/2);
          for(const side of [t-w/2,t+w/2]){
            const x=a.x+(c.x-a.x)*side+nx*.7,z=a.z+(c.z-a.z)*side+nz*.7;
            batchPipe(detail,[x,claddingBase-.8,z],[x,g.bodyRoof+.35,z],.026,'#dce5db');
          }
        }
        for(let row=0;row<=rows;row++){
          const low=claddingBase+row*pitch-.45;
          wallPanel(screens,a,c,low,low+.48,'#d9e2d7',.65);
          wallPanel(detail,a,c,low,low+.04,'#d3dfd2',.69);
        }
      }
      if(nu<-.8){
        wallPanel(glass,a,c,.25,4.1,'#648179',.085,.1,.9);
        for(let d=.5;d<len;d+=1.35)wallPanel(detail,a,c,.2,4.3,'#657b73',.13,d/len,Math.min(1,(d+.07)/len));
        wallPanel(detail,a,c,4.1,4.65,'#c3cfc0',.55);
        facadeLabel(b,a,c,'Samuels','F25',5.6,5.6,'#3f5149');
      }
      wallPanel(detail,a,c,g.bodyRoof-.22,g.bodyRoof,'#dde5d9',.24);
    }
    polygon(roofs,b.points,g.bodyRoof,'#a4afa0');
    const h=g.glasshouse,hring=h.points;
    for(let i=0;i<hring.length;i++){
      const a=hring[i],c=hring[(i+1)%hring.length],len=distance2(a,c),topA=g.roofHeight(a),topC=g.roofHeight(c);
      const p=(t,y)=>[a.x+(c.x-a.x)*t,y,a.z+(c.z-a.z)*t];
      glass.quad(p(0,h.floor+.3),p(0,topA),p(1,topC),p(1,h.floor+.3),'#89a7a3');
      wallPanel(concrete,a,c,h.floor,h.floor+.3,'#a3aea0');
      for(let d=0;d<=len;d+=1.25){const t=d/len,top=topA+(topC-topA)*t;batchPipe(detail,p(t,h.floor),p(t,top),.035,'#d4e0d5');}
      batchPipe(detail,p(0,topA),p(1,topC),.055,'#d9e3d8');
      wallPanel(detail,a,c,h.floor+1.45,h.floor+1.5,'#c5d3c6',.04);
    }
    const roofPoint=(u,v)=>{const p=framePoint(f,u,v);return [p.x,g.roofHeight(p),p.z];};
    for(let u=-33;u<21;u+=1.5){
      const end=Math.min(21,u+1.5);glass.quad(roofPoint(u,-4),roofPoint(u,4),roofPoint(end,4),roofPoint(end,-4),'#a1bdb3');
      batchPipe(detail,roofPoint(u,-4),roofPoint(u,4),.028,'#d6e1d5');
    }
    for(const v of [-4,-1.35,1.35,4])batchPipe(detail,roofPoint(-33,v),roofPoint(21,v),.035,'#d1dfd0');
    const plant=g.plant,pr=plant.points;
    polygon(roofs,pr,plant.top,'#9eaaa1');
    for(let i=0;i<pr.length;i++){
      const a=pr[i],c=pr[(i+1)%pr.length];wallPanel(detail,a,c,plant.bottom,plant.top,'#9daaa0');
      for(let y=plant.bottom+.15;y<plant.top;y+=.22)wallPanel(detail,a,c,y,y+.04,'#63796c',.06);
    }
    const meshTexture=canvasTexture(256,256,ctx=>{
      ctx.clearRect(0,0,256,256);ctx.strokeStyle='#fff';ctx.lineWidth=1.25;
      for(let i=0;i<=256;i+=8){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,256);ctx.moveTo(0,i);ctx.lineTo(256,i);ctx.stroke();}
    });
    meshTexture.wrapS=meshTexture.wrapT=THREE.RepeatWrapping;meshTexture.anisotropy=4;
    world.add(screens.mesh(style('#ffffff',{vertexColors:true,map:meshTexture,alphaTest:.25,side:THREE.DoubleSide,roughness:.75})));
    addCollider({points:b.points,holes:b.holes,top:g.bodyRoof,base:b.base});
  }

  function goodsellBuilding(b,brick,glass,detail,roofs){
    const g=goodsellGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    // Four photographed courtyard rows are kept distinct from the retained
    // six-level community map tag; lower rooms appear as terrain falls away.
    const pitch=(b.height-.6)/4;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),bays=Math.max(1,Math.round(len/2.55));
      wallPanel(brick,a,c,g.minimumGround-b.base,b.height,'#b59b79');
      for(let bay=0;bay<bays;bay++){
        const mid=(bay+.5)/bays,half=.53/len,left=mid-half,right=mid+half;
        for(let row=-2;row<4;row++){
          const low=row*pitch+.55,high=low+2.3;
          wallPanel(detail,a,c,low-.08,high+.1,'#c5c4ad',.035,left-.06/len,right+.06/len);
          wallPanel(glass,a,c,low,high,'#5a6f6c',.06,left,right);
          wallPanel(detail,a,c,high-.42,high,'#c3ccba',.075,left,right);
          wallPanel(detail,a,c,low+.72,low+.77,'#a2b3a3',.085,left,right);
          wallPanel(detail,a,c,low-.1,low,'#a0aa96',.16,left-.04/len,right+.04/len);
        }
        const t=(bay+.97)/bays;
        wallPanel(brick,a,c,0,b.height-.35,'#ac8e6e',.12,t,Math.min(1,t+.1/len));
      }
      wallPanel(detail,a,c,b.height-.5,b.height-.32,'#b4bfb0',.15);
      wallPanel(detail,a,c,b.height-.3,b.height-.15,'#cbd1bd',.23);
      wallPanel(detail,a,c,b.height-.12,b.height,'#dce0cc',.3);
    }
    polygon(roofs,b.points,b.height,'#9ba594');
    const y=rl=>rl-b.base,entry=g.entry,n=g.normal;
    const a={x:entry.x-f.u.x*2,z:entry.z-f.u.z*2},c={x:entry.x+f.u.x*2,z:entry.z+f.u.z*2};
    wallPanel(glass,a,c,y(g.entryGround)+.05,y(g.canopy.bottomRL)-.2,'#58776d',.16);
    wallPanel(detail,a,c,y(g.canopy.bottomRL)-.3,y(g.canopy.bottomRL)+.1,'#3c5149',.2);
    for(const t of [0,.32,.66,1])wallPanel(detail,a,c,y(g.entryGround),y(g.canopy.bottomRL)-.3,'#afbda9',.22,t,Math.min(1,t+.018));
    wallPanel(detail,a,c,y(g.entryGround)+1.1,y(g.entryGround)+1.16,'#c4b749',.24);
    facadeLabel(b,a,c,'John Goodsell','F20',3.4,y(g.canopy.bottomRL)-.06,'#dce2cf');
    const frame=g.canopy.frame,roofPoints=g.canopy.points,cover=new Batch();cover.base=b.base;
    polygon(cover,roofPoints,y(g.canopy.roofRL),'#95b5af');
    for(const p of g.supports){
      const ground=terrainHeight(p.x,p.z)-b.base;batchPipe(detail,[p.x,ground,p.z],[p.x,y(g.canopy.roofRL),p.z],p.radius,'#ad3f35');
      addCollider({x:p.x,z:p.z,radius:p.radius,top:y(g.canopy.roofRL),base:b.base});
    }
    const canopyPoint=(u,v,h)=>{const p=framePoint(frame,u,v);return [p.x,y(g.canopy.bottomRL)+h,p.z];};
    for(const v of [-1.7,1.7])batchBeam(detail,canopyPoint(-3.9,v,0),canopyPoint(3.9,v,0),.12,'#354c45');
    for(let u=-3.7;u<=3.7;u+=1.23)batchBeam(detail,canopyPoint(u,-1.85,.08),canopyPoint(u,1.85,.08),.08,'#3b504a');
    world.add(cover.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.6,side:THREE.DoubleSide,metalness:.25,roughness:.15})));
    addCollider({points:roofPoints,bottom:y(g.canopy.bottomRL)-.13,top:y(g.canopy.roofRL),base:b.base});
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function medicalReflection(mesh,p,y){
    const target=new THREE.WebGLCubeRenderTarget(256,{type:THREE.HalfFloatType,generateMipmaps:true,minFilter:THREE.LinearMipmapLinearFilter});
    const probe=new THREE.CubeCamera(.3,300,target);probe.position.set(p.x,y,p.z);
    mesh.material.envMap=target.texture;campusReflections.push({mesh,probe,target});
  }

  function wallaceWurth(b,concrete,detail,roofs){
    const g=medicalGeometry(b),f=g.frame,glass=new Batch(),atriumGlass=new Batch(),undersides=new Batch();glass.base=atriumGlass.base=undersides.base=b.base;
    const y=rl=>rl-b.base,angle=Math.atan2(-f.u.z,f.u.x);
    const perimeter=points=>polygonArea(points)<0?[...points].reverse():points;
    const upperFacade=(a,c)=>{
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,bays=Math.max(1,Math.round(len/2.6)),at=(t,h,off)=>[a.x+(c.x-a.x)*t+nx*off,h,a.z+(c.z-a.z)*t+nz*off];
      wallPanel(concrete,a,c,y(g.upperBaseRL),y(g.upperOfficeRL)+.6,'#b7b6a5');
      for(let row=0;row<4;row++)for(let bay=0;bay<bays;bay++){
        const start=(bay+.1)/bays,end=(bay+.91)/bays,lo=y(g.upperBaseRL)+row*3.96+.2,hi=lo+2.65;
        wallPanel(glass,a,c,lo,hi,'#788e8d',.08,start,end);
        // Coloured shutters fill only part of selected window bays.
        if((bay*3+row*5)%7<4){
          const tint=['#c28c32','#d8a84c','#ba7434','#d2b26f'][(bay+row)%4];
          wallPanel(detail,a,c,lo,hi,tint,.14,start,start+(end-start)*.45);
        }
        wallPanel(detail,a,c,hi,hi+.07,'#7a877c',.09,start,end);
      }
      for(let bay=1;bay<bays;bay++){
        const t=bay/bays,off=bay%5<3?.82:.5,low=y(g.upperBaseRL)+(bay%6===0?3.96:0),high=y(g.upperOfficeRL)+(bay%6===0?-3.96:.8),p=at(t,(low+high)/2,off/2);
        detail.box(p[0],p[1],p[2],.11,high-low,off,'#d5d8c9',Math.atan2(-(c.z-a.z),c.x-a.x));
      }
    };
    for(const part of MEDICAL_PARTS.filter(p=>p.buildingId===b.id)){
      const ring=perimeter(part.points);
      if(part.kind==='east'){
        for(let i=0;i<ring.length;i++)upperFacade(ring[i],ring[(i+1)%ring.length]);
        const inset=ring.map(p=>{const q=g.local(p);return framePoint(f,14+(q.u-14)*.65,q.v*.96);});
        for(let i=0;i<inset.length;i++){
          const a=inset[i],c=inset[(i+1)%inset.length],len=distance2(a,c);wallPanel(glass,a,c,y(g.upperOfficeRL)+.6,y(86.55),'#697f79');
          for(let d=.4;d<len;d+=1.2)wallPanel(detail,a,c,y(g.upperOfficeRL)+.6,y(86.55),'#82948a',.06,d/len,Math.min(1,(d+.045)/len));
        }
        polygon(undersides,part.points,y(g.upperBaseRL)-.15,'#8f9d90');
        polygon(roofs,part.points,y(g.roofRL),'#9daa9d');
        for(let i=0;i<ring.length;i++)wallPanel(detail,ring[i],ring[(i+1)%ring.length],y(g.roofRL)-.22,y(g.roofRL),'#d7ddcd',.5);
        addCollider({points:part.points,holes:part.holes,bottom:y(g.upperBaseRL)-.15,top:y(g.roofRL),base:b.base});
      }else if(part.kind==='west'){
        for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nv=((c.z-a.z)*f.v.x-(c.x-a.x)*f.v.z)/len;
          wallPanel(concrete,a,c,0,y(g.roofRL),'#bcbcab');
          if(nv<-.8){
            for(let d=2;d<len;d+=2.5)wallPanel(detail,a,c,.5,y(g.roofRL)-.1,'#9eaa9c',.03,d/len,Math.min(1,(d+.025)/len));
            facadeLabel(b,a,c,'Wallace Wurth','C27',Math.min(13,len*.8),y(g.roofRL)-4,'#4f5e53');
          }else{
            upperFacade(a,c);
            wallPanel(glass,a,c,y(g.groundRL)+.1,y(g.upperBaseRL)-.25,'#496961',.07,.03,.97);
            for(const rl of [61.53,65.53])wallPanel(detail,a,c,y(rl)-.18,y(rl),'#c7d0bf',.18);
          }
        }
        polygon(roofs,part.points,y(g.roofRL),'#a0aea0');addCollider({points:part.points,holes:part.holes,top:y(g.roofRL),base:b.base});
      }
    }
    for(const part of MEDICAL_GROUND_FLOORS){
      const ring=perimeter(part.points);polygon(roofs,ring,y(g.upperBaseRL)-.2,'#839a89');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(concrete,a,c,0,y(g.groundRL),'#9cae9b');
        wallPanel(glass,a,c,y(g.groundRL),y(g.upperBaseRL)-.22,'#526d69',.03);
        wallPanel(detail,a,c,y(61.53)-.12,y(61.53),'#aab9a8',.12);
        for(let d=.3;d<len;d+=1.8)wallPanel(detail,a,c,y(g.groundRL),y(g.upperBaseRL)-.2,'#859a8b',.09,d/len,Math.min(1,(d+.07)/len));
      }
      addCollider({points:part.points,holes:part.holes,top:y(g.upperBaseRL),base:b.base});
    }
    // The central glazed atrium is shown in the architect's plan, including
    // its northern recess omitted from the exterior OSM footprint.
    for(const points of [...MEDICAL_PARTS.filter(p=>p.buildingId===b.id&&p.kind==='atrium').map(p=>p.points),g.atrium]){
      const ring=perimeter(points);polygon(concrete,ring,y(g.groundRL),'#9eac9b');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(atriumGlass,a,c,y(g.groundRL),y(86.5),'#a8bcb0');
        for(let d=.1;d<len;d+=1.6)wallPanel(detail,a,c,y(g.groundRL),y(86.5),'#a0b0a2',.03,d/len,Math.min(1,(d+.045)/len));
        for(const rl of [61.53,65.53,69.49,73.45,77.41,81.37])wallPanel(detail,a,c,y(rl)-.08,y(rl),'#81988b',.04);
      }
      polygon(atriumGlass,ring,y(86.5),'#b4c9bd');addCollider({points:ring,top:y(86.5),base:b.base});
    }
    for(const support of g.supports){
      const ground=terrainHeight(support.x,support.z)-b.base,top=y(g.upperBaseRL);
      detail.box(support.x,(ground+top)/2,support.z,1.05,top-ground,1.3,'#bfcab7',angle);
      addCollider({x:support.x,z:support.z,radius:support.radius,top,base:b.base});
    }
    for(const plant of g.plants){
      const ring=perimeter(plant.points);polygon(roofs,ring,y(plant.roofRL),'#86978a');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(concrete,a,c,y(plant.bottomRL),y(plant.roofRL),'#a2af9f');
        for(let rl=plant.bottomRL+.1;rl<plant.roofRL;rl+=.18)wallPanel(detail,a,c,y(rl),y(rl)+.035,'#667f70',.06);
      }
    }
    for(const p of g.flues)batchPipe(detail,[p.x,y(90.55),p.z],[p.x,y(95),p.z],p.radius,'#c9d4c2');
    world.add(undersides.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    const mesh=glass.mesh(style('#ffffff',{vertexColors:true,metalness:.4,roughness:.18,envMapIntensity:.7}));world.add(mesh,atriumGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.25,depthWrite:false,side:THREE.DoubleSide,roughness:.13})));
    medicalReflection(mesh,framePoint(f,32,-8),66);
  }

  function lowyBuilding(b,concrete,detail,roofs){
    const g=medicalGeometry(b),f=g.frame,glass=new Batch();glass.base=b.base;
    for(const part of MEDICAL_PARTS.filter(p=>p.buildingId===b.id)){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points,bridge=part.kind==='bridge',low=bridge?g.bridgeBottom:0,high=bridge?g.bridgeRoof:g.roofRL-b.base;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z,nu=nx*f.u.x+nz*f.u.z;
        const garden=bridge||nv>.65;
        wallPanel(concrete,a,c,low,high,garden?'#6c973e':'#bfbdab');
        if(garden){
          const start=bridge?low+.9:6.4,top=high-.85,bays=Math.max(1,Math.round(len/1.15)),rows=5;
          for(let row=0;row<rows;row++){
            const lo=start+(top-start)*row/rows,hi=start+(top-start)*(row+1)/rows-.12;
            wallPanel(glass,a,c,lo,hi,'#8aa99b',.085,.035,.965);
            wallPanel(detail,a,c,hi,hi+.085,'#a9c098',.13,.035,.965);
          }
          for(let j=0;j<=bays;j++){
            const mid=j/bays,width=bridge?.12:(j%5===0?.6:.18),shade=['#7aa442','#8dac4e','#73923b','#a3bc64'][j%4];
            wallPanel(detail,a,c,start,top,shade,.25,Math.max(0,mid-width/(2*len)),Math.min(1,mid+width/(2*len)));
          }
          if(!bridge)wallPanel(glass,a,c,.25,6.1,'#587b67',.08,.03,.97);
          else{wallPanel(detail,a,c,low,low+.9,'#80a443',.18);wallPanel(detail,a,c,top,high,'#86ab4c',.18);}
        }else{
          for(let d=.1;d<len;d+=2.5)wallPanel(detail,a,c,low,high,'#9fa997',.025,d/len,Math.min(1,(d+.025)/len));
          for(let y=3.4;y<high;y+=4)wallPanel(detail,a,c,y,y+.018,'#9ca491',.026);
          if(nv<-.75&&len>20){
            for(let d=5;d<len-3;d+=3){
              const start=d/len,end=(d+.5)/len;wallPanel(detail,a,c,5.2,high-9.3,'#4b6255',.04,start,end);
              for(let y=5.3;y<high-9.3;y+=.22)wallPanel(detail,a,c,y,y+.045,'#8b9f89',.08,start,end);
            }
            wallPanel(glass,a,c,high-7.5,high-3.9,'#8ba69b',.85,.2,.75);
            wallPanel(detail,a,c,high-7.7,high-7.5,'#d3d5c2',1,.18,.77);wallPanel(detail,a,c,high-3.9,high-3.7,'#d3d5c2',1,.18,.77);
          }
          if(nu<-.75){
            wallPanel(detail,a,c,6,high-2,'#4d6357',.06,.4,.58);
            for(let y=6;y<high-2;y+=.23)wallPanel(detail,a,c,y,y+.05,'#8d9f87',.1,.4,.58);
            facadeLabel(b,a,c,'LOWY CANCER','RESEARCH CENTRE',Math.min(10,len*.85),high-4,'#53654f');
          }
        }
      }
      polygon(roofs,part.points,high,bridge?'#7a9a4b':'#9ca995');
      if(bridge){
        const underside=new Batch();underside.base=b.base;polygon(underside,part.points,low,'#c8d1b7');world.add(underside.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
      }
      addCollider({points:part.points,holes:part.holes,bottom:low,top:high,base:b.base});
    }
    for(const p of g.supports){
      const lo=terrainHeight(p.x,p.z)-b.base;batchPipe(detail,[p.x,lo,p.z],[p.x,g.bridgeBottom,p.z],p.radius,'#cbd4bc');addCollider({x:p.x,z:p.z,radius:p.radius,top:g.bridgeBottom,base:b.base});
    }
    for(const plant of g.plants){
      const ring=polygonArea(plant.points)<0?[...plant.points].reverse():plant.points,lo=plant.bottomRL-b.base,hi=plant.roofRL-b.base;
      polygon(roofs,ring,hi,'#8c9b89');
      for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(detail,a,c,lo,hi,'#8b9b87');for(let y=lo+.1;y<hi;y+=.14)wallPanel(detail,a,c,y,y+.03,'#576f5c',.05);}
    }
    const mesh=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.065,metalness:.65,envMapIntensity:1.15}));world.add(mesh);medicalReflection(mesh,framePoint(f,10,10),b.base+18);
  }

  function grandstand(b,concrete,detail,roofs){
    const pitch=orientedFrame(VILLAGE_SPORTS.find(s=>s.sport==='soccer').points);
    const f=orientedFrame(b.points,pitch.v),rows=6,rise=.37,depth=.85,front=f.width/2-1.1;
    const angle=Math.atan2(-f.v.z,f.v.x),beamAngle=Math.atan2(-f.u.z,f.u.x);
    const aisles=[-f.length*.33,0,f.length*.33],aisleWidth=1.3;
    const cuts=[-f.length/2+.4,...aisles.flatMap(z=>[z-aisleWidth/2,z+aisleWidth/2]),f.length/2-.4];
    for(let row=0;row<rows;row++){
      const x=front-(row+.5)*depth,top=(row+1)*rise;
      for(let k=0;k<cuts.length-1;k+=2){
        const z=(cuts[k]+cuts[k+1])/2,length=cuts[k+1]-cuts[k],p=framePoint(f,x,z);
        concrete.box(p.x,top/2,p.z,length,top,depth,'#b6b7a9',angle);
        addCollider({points:frameRectangle(f,depth,length,x,z),top,base:b.base});
      }
      for(let z=-f.length/2+.8,index=0;z<f.length/2-.6;z+=.56,index++){
        if(aisles.some(a=>Math.abs(z-a)<aisleWidth/2+.25))continue;
        const p=framePoint(f,x,z),back=framePoint(f,x-.19,z),color=(index+row*3)%9<2?'#333d3a':'#d5b535';
        detail.box(p.x,top+.29,p.z,.44,.085,.42,color,angle);
        detail.box(back.x,top+.55,back.z,.44,.48,.065,color,angle);
        detail.box(p.x,top+.13,p.z,.055,.26,.27,'#53605a',angle);
      }
    }
    for(const z of aisles){
      const a=framePoint(f,front,z),end=framePoint(f,front-rows*depth,z),count=rows*2;
      stairSegments.push({a,b:end,h0:b.base,h1:b.base+rows*rise,width:aisleWidth,count});
      for(let step=0;step<count;step++){
        const t=step/count,u=(step+1)/count,y=step/count*rows*rise+.05;
        const x0=front-rows*depth*t,x1=front-rows*depth*u;
        const points=[framePoint(f,x0,z-aisleWidth/2),framePoint(f,x0,z+aisleWidth/2),framePoint(f,x1,z+aisleWidth/2),framePoint(f,x1,z-aisleWidth/2)];
        polygon(concrete,points,y,'#bfc0b2');
        wallPanel(concrete,points[0],points[1],y-rise/2,y,'#939c92');
      }
    }
    // The architect's photograph shows an earth bank behind the seating. The
    // regional 5 m DEM does not resolve the bank detail: reconstruct it as
    // a small, explicitly modelled ramp, shared by drawing and walking.
    const mound=new Batch();mound.base=0;
    const inner=front-rows*depth,outer=-f.width/2-3;
    const heightAt=(x,z)=>{
      const dx=x-f.x,dz=z-f.z,u=dx*f.u.x+dz*f.u.z,v=dx*f.v.x+dz*f.v.z;
      return Math.max(terrainHeight(x,z),b.base+rows*rise*clamp((u-outer)/(inner-outer),0,1)*clamp((f.length/2-Math.abs(v))/3,0,1));
    };
    groundPatches.push({points:frameRectangle(f,inner-outer,f.length,(inner+outer)/2),heightAt});
    const nx=Math.ceil((inner-outer)/1.5),nz=Math.ceil(f.length/1.5);
    for(let i=0;i<nx;i++)for(let j=0;j<nz;j++){
      const x0=outer+(inner-outer)*i/nx,x1=outer+(inner-outer)*(i+1)/nx,z0=-f.length/2+f.length*j/nz,z1=-f.length/2+f.length*(j+1)/nz;
      const verts=[[x0,z0],[x0,z1],[x1,z1],[x1,z0]].map(([x,z])=>{const p=framePoint(f,x,z);return [p.x,heightAt(p.x,p.z)+.015,p.z];});
      mound.quad(...verts,'#829665');
    }
    world.add(mound.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')})));
    // Three softly rounded, cantilevered roof leaves, observed in SCA's photos.
    // Roof height, section sizes and seat spacing are visual estimates.
    for(let leaf=0;leaf<3;leaf++){
      const centreZ=(leaf-1)*f.length/3,height=b.height,width=f.width+.25,length=f.length/3-.45;
      const ring=roundedFrameRectangle(f,width,length,.9,0,centreZ);
      polygon(roofs,ring,height,'#d0cbb7');
      const centre=framePoint(f,0,centreZ);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length];
        detail.triangle([centre.x,height-.18,centre.z],[a.x,height-.18,a.z],[c.x,height-.18,c.z],'#aaa995');
        wallPanel(detail,a,c,height-.18,height,'#b8b8a5');
      }
      for(let z=centreZ-length/2+.8;z<centreZ+length/2-.5;z+=.28){const p=framePoint(f,0,z);detail.box(p.x,height-.2,p.z,width-.8,.025,.025,'#989d93',beamAngle);}
      for(const offset of [-length*.29,length*.29]){
        const p=framePoint(f,-f.width/2+1.8,centreZ+offset),beam=framePoint(f,.3,centreZ+offset);
        concrete.box(p.x,(height-.5)/2,p.z,.5,height-.5,.58,'#b5b8aa',angle);
        addCollider({x:p.x,z:p.z,radius:.34,top:height-.5,base:b.base});
        detail.box(beam.x,height-.4,beam.z,width-.7,.23,.22,'#343c38',beamAngle);
      }
      addCollider({points:ring,bottom:height-.18,top:height,base:b.base});
    }
  }

  function pavilionBalcony(b,detail){
    const curve=new Set(b.points.slice(4,14)),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    const railing=new Batch();railing.base=b.base;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length];if(!curve.has(a)||!curve.has(c))continue;
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,angle=Math.atan2(-(c.z-a.z),c.x-a.x);
      const p=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      detail.quad(p(0,3.45,.02),p(1,3.45,.02),p(1,3.45,1.7),p(0,3.45,1.7),'#cdd1c2');
      detail.quad(p(0,3.25,.02),p(0,3.25,1.7),p(1,3.25,1.7),p(1,3.25,.02),'#c2c8bb');
      wallPanel(detail,a,c,3.25,3.45,'#cdd2c3',1.7);
      wallPanel(railing,a,c,3.48,4.48,'#b8d0c8',1.58);
      wallPanel(detail,a,c,4.48,4.52,'#9eaaa3',1.61);
      for(let d=.35;d<len;d+=2.8){
        const x=a.x+(c.x-a.x)*d/len+nx*1.45,z=a.z+(c.z-a.z)*d/len+nz*1.45;
        detail.box(x,1.62,z,.14,3.25,.14,'#c8cebd');
        detail.box(x,5.28,z,.065,3.7,.065,'#70665d');
        addCollider({x,z,radius:.10,top:3.25,base:b.base});
      }
      wallPanel(detail,a,c,7.05,7.2,'#77695c',1.5);
      for(let d=.1;d<len;d+=.55){const t=d/len,x=a.x+(c.x-a.x)*t+nx*.9,z=a.z+(c.z-a.z)*t+nz*.9;detail.box(x,7.18,z,.06,.09,2,'#7b6e61',angle);}
      addCollider({points:[p(0,0,.02),p(1,0,.02),p(1,0,1.7),p(0,0,1.7)].map(p=>({x:p[0],z:p[2]})),bottom:3.25,top:3.45,base:b.base});
    }
    world.add(railing.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.32,depthWrite:false,side:THREE.DoubleSide,roughness:.18})));
  }

  function homeGroundCafe(b,masonry,glass,detail,roofs){
    const f=orientedFrame(b.points),ordered=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ordered.length;i++){
      const a=ordered[i],c=ordered[(i+1)%ordered.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      wallPanel(masonry,a,c,0,b.height,'#c6ccbf');wallPanel(glass,a,c,.55,b.height-.25,'#4c6769',.04,.01,.99);
      wallPanel(detail,a,c,.52,.61,'#d6dbcc',.09);
      for(let d=.15;d<len;d+=1.1){const t=d/len;wallPanel(detail,a,c,.55,b.height-.2,'#ccd4c8',.09,t-.025/len,t+.025/len);}
      if(len>7&&nx<-.4){
        const texture=canvasTexture(256,256,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#254b62';ctx.beginPath();ctx.arc(w/2,h/2,121,0,TAU);ctx.fill();ctx.fillStyle='#f1f3e7';ctx.textAlign='center';ctx.font='600 48px sans-serif';ctx.fillText('home',128,112);ctx.fillText('ground',128,166);});
        const logo=new THREE.Mesh(new THREE.PlaneGeometry(.55,.55),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));logo.position.set((a.x+c.x)/2+nx*.12,b.base+1.7,(a.z+c.z)/2+nz*.12);logo.rotation.y=Math.atan2(nx,nz);world.add(logo);
      }
    }
    addCollider({points:b.points,top:b.height,base:b.base});
    const roof=(frame,width,length,height,open)=>{
      const ring=roundedFrameRectangle(frame,width,length,Math.min(2.6,width/3)),centre=framePoint(frame,0,0);
      polygon(roofs,ring,height,'#bfc4b6');
      for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];detail.triangle([centre.x,height-.18,centre.z],[a.x,height-.18,a.z],[c.x,height-.18,c.z],'#b3baab');wallPanel(detail,a,c,height-.18,height,'#c7cbbc');}
      if(open)for(const x of [-width*.33,width*.33])for(const z of [-length*.3,length*.3]){const p=framePoint(frame,x,z);masonry.box(p.x,(height-.18)/2,p.z,.25,height-.18,.25,'#c5cdbe');addCollider({x:p.x,z:p.z,radius:.16,top:height,base:b.base});}
      addCollider({points:ring,bottom:height-.18,top:height,base:b.base});
    };
    roof(f,f.width+2.8,f.length+2.8,b.height,false);
    const outdoor=framePoint(f,0,f.length/2+4.8),shade={...f,...outdoor,width:6.5,length:7.5};
    roof(shade,6.5,7.5,b.height-.45,true);
    const apron=new Batch();polygon(apron,frameRectangle(shade,8,9),.23,'#b4b8ad');world.add(apron.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})));
    const angle=Math.atan2(-f.u.z,f.u.x);
    for(const z of [-1.6,1.6]){
      const p=framePoint(shade,0,z);detail.box(p.x,.77,p.z,2,.1,.65,'#b7837c',angle);
      for(const side of [-.62,.62]){const p=framePoint(shade,0,z+side);detail.box(p.x,.45,p.z,2,.09,.3,'#b7837c',angle);}
      for(const x of [-.7,.7]){const p=framePoint(shade,x,z);detail.box(p.x,.38,p.z,.07,.72,1.5,'#bbc7b7',angle);}
      addCollider({points:frameRectangle(shade,2,1.5,0,z),top:.82,base:b.base});
    }
    const trunks=new Batch(),fronds=new Batch(),beds=new Batch();trunks.base=fronds.base=0;
    for(const [index,z] of [-f.length*.35,0,f.length*.4].entries()){
      const p=framePoint(f,-f.width/2-1.7,z),base=terrainHeight(p.x,p.z),height=7.5+index*.6;
      polygon(beds,Array.from({length:20},(_,i)=>({x:p.x+Math.cos(i/20*TAU)*.75,z:p.z+Math.sin(i/20*TAU)*.75})),.275,'#8c7d5c');
      for(let i=0;i<8;i++){const a=i/8*TAU,c=(i+1)/8*TAU;trunks.quad([p.x+Math.cos(a)*.23,base,p.z+Math.sin(a)*.23],[p.x+Math.cos(a)*.15,base+height,p.z+Math.sin(a)*.15],[p.x+Math.cos(c)*.15,base+height,p.z+Math.sin(c)*.15],[p.x+Math.cos(c)*.23,base,p.z+Math.sin(c)*.23],'#8f7760',[[i/8,0],[i/8,height/2],[(i+1)/8,height/2],[(i+1)/8,0]]);}
      for(let leaf=0;leaf<12;leaf++){
        const angle=leaf/12*TAU+index,dx=Math.cos(angle),dz=Math.sin(angle),px=-dz,pz=dx;
        const centre=t=>({x:p.x+dx*3.1*t,y:base+height+.45*Math.sin(Math.PI*t)-1.25*t*t,z:p.z+dz*3.1*t});
        for(let i=0;i<4;i++){const a=centre(i/4),c=centre((i+1)/4);fronds.quad([a.x+px*.018,a.y,a.z+pz*.018],[c.x+px*.018,c.y,c.z+pz*.018],[c.x-px*.018,c.y,c.z-pz*.018],[a.x-px*.018,a.y,a.z-pz*.018],'#8e9f64');}
        for(let i=0;i<14;i++){
          const t=.1+i/16,q=centre(t),length=.65*(1-t)+.15;
          for(const side of [-1,1])fronds.triangle([q.x-dx*.035,q.y,q.z-dz*.035],[q.x+dx*.035,q.y,q.z+dz*.035],[q.x+px*side*length+dx*.15,q.y-.25,q.z+pz*side*length+dz*.15],leaf%2?'#71844f':'#879c61');
        }
      }
      addCollider({x:p.x,z:p.z,radius:.25,top:height,base});
    }
    world.add(trunks.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('bark')})),fronds.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),beds.mesh(style('#ffffff',{vertexColors:true})));
  }

  function buildingWorld() {
    const masonry=new Batch(),brickwork=new Batch(),clinkerwork=new Batch(),aggregatework=new Batch(),glass=new Batch(),detail=new Batch(),roofs=new Batch();
    const allBatches=[masonry,brickwork,clinkerwork,aggregatework,glass,detail,roofs],random=rng(78);
    for(const b of buildings){
      const pts=validPoints(b);if(pts.length<3)continue;
      b.points=pts;b.extent=extent(pts);b.height=Number(b.height)||12;b.base=buildingBase(pts);
      const profile=buildingAppearance(b);
      if(b.heightSource==='estimated'&&profile.heightEstimate)b.height=profile.heightEstimate;
      // A transparent foyer needs a level floor above the terrain, rather than
      // the embedded low foundation used by opaque building masses.
      if(['nida-theatre','whitehouse'].includes(profile.facade))b.base=Math.max(...pts.map(p=>terrainHeight(p.x,p.z)));
      if(profile.facade==='goodsell')b.base=goodsellGeometry(b).entryGround;
      if(profile.facade==='science-theatre')b.base=scienceTheatreFoundation(b,terrainHeight);
      if(profile.facade==='webster-theatres'){
        const g=websterTheatresGeometry(b),p=framePoint(g.frame,g.west,0);b.base=terrainHeight(p.x,p.z);
      }
      if(profile.facade==='clancy'){
        const g=clancyGeometry(b),p=framePoint(g.frame,g.hood.centreU,g.hood.glassV);b.base=terrainHeight(p.x,p.z);
      }
      for(const batch of allBatches)batch.base=b.base;
      if(b.modelledWith)continue;
      if(b.terrainCanopy){terrainCanopy(b);continue;}
      if(b.id==='osm-way-1178531037'){scientiaCanopy(b,detail,glass);continue;}
      if(b.walkableUnder){
        const h=Math.max(3,b.height),ordered=polygonArea(pts)<0?[...pts].reverse():pts;
        polygon(roofs,pts,h,'#b6b8b4');
        for(let i=0;i<ordered.length;i++)wallPanel(detail,ordered[i],ordered[(i+1)%ordered.length],h-.25,h,'#c2c3bb');
        for(let i=0;i<pts.length;i+=Math.max(1,Math.ceil(pts.length/6))){const p=pts[i];detail.box(p.x,h/2,p.z,.2,h,.2,'#939b98');addCollider({x:p.x,z:p.z,radius:.15,top:h,base:b.base});}
        addCollider({points:pts,bottom:h-.25,top:h,base:b.base});continue;
      }
      if(b.id==='roundhouse'){roundhouse(b,masonry,glass,detail,roofs);addCollider({points:b.points,top:b.height,base:b.base});continue;}
      if(profile.facade==='grandstand'){grandstand(b,masonry,detail,roofs);continue;}
      if(profile.facade==='cafe'){homeGroundCafe(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='nida-theatre'){nidaTheatre(b,masonry,detail,roofs);continue;}
      if(['whitehouse','oldtote','figtree'].includes(profile.facade)){heritageBuilding(b,profile.facade,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='goldstein'){goldsteinHall(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='science-theatre'){scienceTheatre(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='dalton'){daltonBuilding(b,masonry,aggregatework,glass,detail,roofs);continue;}
      if(profile.facade==='webster'){websterBuilding(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='chemical-complex'){chemicalComplex(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='webster-theatres'){websterTheatres(b,masonry,aggregatework,glass,detail,roofs);continue;}
      if(profile.facade==='clancy'){clancyAuditorium(b,detail);continue;}
      if(profile.facade==='bioscience'){bioscienceBuilding(b,detail,roofs);continue;}
      if(profile.facade==='sirf'){sirfBuilding(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='agsm'){agsmBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='civil'){civilBuilding(b,masonry,aggregatework,glass,detail,roofs);continue;}
      if(profile.facade==='patricia'){patriciaBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='samuels'){samuelsBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='goodsell'){goodsellBuilding(b,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='wallace'){wallaceWurth(b,masonry,detail,roofs);continue;}
      if(profile.facade==='lowy'){lowyBuilding(b,masonry,detail,roofs);continue;}
      if(profile.facade==='mathews-theatre'){mathewsTheatre(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='chancellery'){chancelleryBuilding(b,brickwork,glass,detail,roofs);continue;}
      if(['village','postgraduate'].includes(profile.facade)){residentialComplex(b,profile,masonry,glass,detail,roofs);continue;}
      if(['shalom','international'].includes(profile.facade)){olderResidence(b,profile,clinkerwork,glass,detail,roofs);continue;}
      if(['warrane','new-college'].includes(profile.facade)){residence(b,profile,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='college'){
        const ordered=polygonArea(pts)<0?[...pts].reverse():pts;
        polygon(roofs,pts,b.height,'#b5a58b',b.holes||[]);
        for(let i=0;i<ordered.length;i++)if(distance2(ordered[i],ordered[(i+1)%ordered.length])>.2)collegeFacade(b,ordered[i],ordered[(i+1)%ordered.length],profile,clinkerwork,glass,detail);
        collegeRoof(b,profile,detail,roofs);
        addCollider({points:pts,holes:b.holes||[],top:b.height,base:b.base});continue;
      }
      const pieces=b.id==='library'?[{...b,height:5.6,podium:true},...BUILDING_PARTS.filter(p=>p.parent==='library').map(p=>({...b,...p}))]:[b];
      for(const piece of pieces){
        const ring=piece.points,holes=piece.holes||[],height=piece.height;
        const floors=piece.podium?1:((piece.parent?piece.levels:profile.floors)||piece.levels||Math.max(1,Math.round(height/3.7))),level=height/floors;
        const ordered=polygonArea(ring)<0?[...ring].reverse():ring;
        polygon(roofs,ring,height,'#858c8b',holes);
        for(const loop of [ordered,...holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<loop.length;i++){
          const a=loop[i],next=loop[(i+1)%loop.length],length=distance2(a,next);if(length<.2)continue;
          const nx=(next.z-a.z)/length,nz=-(next.x-a.x)/length,angle=Math.atan2(-(next.z-a.z),next.x-a.x);
          const along=(d,y=0,offset=0)=>({x:a.x+(next.x-a.x)*d/length+nx*offset,z:a.z+(next.z-a.z)*d/length+nz*offset,y});
          const type=piece.podium?'bands':profile.facade==='pleated'&&length<=25?'brick':profile.facade;
          const wallBatch=/brick|arcade/.test(type)?brickwork:masonry;
          wallPanel(wallBatch,a,next,0,height,type==='pleated'?'#667571':profile.color);
          // A weathered stone/concrete plinth and roof coping anchor every mass.
          wallPanel(detail,a,next,0,.48,'#8e9286',.03);
          wallPanel(detail,a,next,height-.25,height+.45,profile.trim,.12);
          wallPanel(detail,a,next,height+.43,height+.54,'#aaa99e',.19);
          if(type==='pleated'){ceramicScreen(a,next,height,glass,detail,profile);continue;}
          for(let f=0;f<floors;f++){
            const low=f*level+(f===0?.55:.72),high=Math.min(height-.45,(f+1)*level-.38);
            if(high<=low)continue;
            if(type==='slots'){
              wallPanel(glass,a,next,f*level+1.25,Math.min(high,f*level+2.02),profile.glass,.045,.015,.985);
              wallPanel(detail,a,next,f*level+2.02,Math.min(high+.13,f*level+2.13),'#794535',.14,.015,.985);
            }else if(['bands','fins','terracotta-fins','green','parking'].includes(type)){
              wallPanel(glass,a,next,low,high,profile.glass,.06,.008,.992);
              wallPanel(detail,a,next,high,high+.12,profile.trim,.14);
              if(type==='green')wallPanel(detail,a,next,f*level+.08,low, f%2?'#91ac55':'#6f8c36',.13);
              for(let d=1;d<length;d+=1.45){const t=d/length;wallPanel(detail,a,next,low,high,'#748285',.1,t-.012/length,t+.012/length);}
            }else{
              const count=Math.max(1,Math.floor(length/(profile.spacing||3.2)));
              for(let k=0;k<count;k++){
                const pad=profile.windowFraction?(1-profile.windowFraction)/2:(type==='library'?.31:.13);
                const start=(k+pad)/count,end=(k+1-pad)/count;
                const tint=new THREE.Color(profile.glass).multiplyScalar(.86+random()*.28);
                wallPanel(glass,a,next,low,high,tint,.055,start,end);
                const frame=type==='brick'?'#c0c4bd':'#8c9694';
                const fw=Math.min(.06/length,(end-start)*.12);
                wallPanel(detail,a,next,low-.04,high+.04,frame,.082,start-fw,start);
                wallPanel(detail,a,next,low-.04,high+.04,frame,.082,end,end+fw);
                wallPanel(detail,a,next,low-.05,low,frame,.085,start,end);
                wallPanel(detail,a,next,high,high+.06,frame,.085,start,end);
                if(type==='library'){
                  const p=along((k+.08)*length/count);detail.box(p.x+nx*.24,height/2,p.z+nz*.24,.2,height,.65,'#b6b2a6',angle);
                }
                if(type==='amber'){
                  const p=along((k+.04)*length/count);detail.box(p.x+nx*.35,(low+high)/2,p.z+nz*.35,.4,high-low,.62,k%3?'#cda038':'#e5bb59',angle+.22);
                }
              }
            }
            if(profile.shopfront&&f===0&&length>10){
              wallPanel(glass,a,next,.3,Math.min(3.2,level-.4),profile.glass,.11,.01,.99);
              wallPanel(detail,a,next,Math.min(3.2,level-.4),Math.min(3.65,level-.1),'#c4c9bb',.3);
              for(let d=.5;d<length;d+=4){const p=along(d);detail.box(p.x+nx*.2,1.7,p.z+nz*.2,.14,3.4,.18,'#b9c2b8',angle);}
            }
            if(type==='faceted'&&length>4){
              const count=Math.max(1,Math.floor(length/4.2));
              for(let k=0;k<count;k++){
                const t0=k/count,t1=(k+1)/count,p=(t,y,off)=>[a.x+(next.x-a.x)*t+nx*off,y,a.z+(next.z-a.z)*t+nz*off];
                const y=f*level,top=Math.min(height,y+.8+(k%3)*.35);
                detail.quad(p(t0,y,.12),p(t0,top,.15),p(t1,Math.min(height,top+.55),.42),p(t1,y,.4),k%3===0?'#424947':k%3===1?'#b09b6a':'#8f815c');
              }
            }
            if(type==='arcade'&&f===0&&length>10){
              wallPanel(glass,a,next,.15,3.05,'#293d40',.09,.015,.985);
              for(let d=1;d<length;d+=5.5){const p=along(d);detail.box(p.x+nx*.5,1.7,p.z+nz*.5,.45,3.4,.55,profile.trim,angle);}
              wallPanel(detail,a,next,3.05,3.35,profile.trim,.6);
            }
          }
          if(['fins','terracotta-fins'].includes(type)&&length>5){
            const spacing=profile.spacing||1.6;
            for(let d=.35;d<length;d+=spacing){const p=along(d);detail.box(p.x+nx*.46,height/2+.8,p.z+nz*.46,type==='fins'?.16:.32,height-1.5,type==='fins'?1.05:.68,profile.trim,angle+.35);}
          }
          if(type==='slots')for(let d=3;d<length;d+=6){const p=along(d);detail.box(p.x+nx*.08,height/2,p.z+nz*.08,.055,height,.08,'#6e3f31',angle);}
          // Recessed glazed entry and thin canopy on long faces.
          if(length>15&&i%2===0){
            const ground=(terrainHeight((a.x+next.x)/2,(a.z+next.z)/2)-b.base),t=.5,w=Math.min(.07,1.4/length);
            wallPanel(glass,a,next,ground+.05,ground+2.7,'#263f45',.14,t-w,t+w);
            for(const side of [-1,1])wallPanel(detail,a,next,ground+.05,ground+2.7,'#929f9e',.16,t+side*w-.025/length,t+side*w+.025/length);
            const p=along(length*.5);detail.box(p.x+nx*.9,ground+2.95,p.z+nz*.9,Math.min(5,length*.35),.12,1.9,profile.trim,angle);
          }
        }
        const e=extent(ring);
        // Roof service cores, ducts and vents stay inside each real footprint.
        if(e.width>18&&e.depth>18&&inPolygon(e.x,e.z,ring)&&!holes.some(h=>inPolygon(e.x,e.z,h))){
          detail.box(e.x,height+1,e.z,4.2,2,3.6,'#878e8d');
          for(let j=0;j<4;j++)detail.box(e.x-1.5+j,height+2.02,e.z,.55,.08,2.6,'#4c595a');
          if(profile.solar)for(let x=e.minX+8;x<e.maxX-5;x+=4)for(let z=e.minZ+6;z<e.maxZ-5;z+=3){if(!inPolygon(x,z,ring))continue;detail.box(x,height+.62,z,3.3,.12,1.8,'#283f51');for(let k=-1;k<=1;k++)detail.box(x+k,height+.69,z,.025,.015,1.8,'#73848b');}
        }
        if(b.id==='library'&&height>40){
          for(const loop of [ordered])for(let i=0;i<loop.length;i++){
            const a=loop[i],c=loop[(i+1)%loop.length],len=distance2(a,c);if(len<12)continue;
            const tex=canvasTexture(1024,256,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#f4f3e9';ctx.font='700 180px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('UNSW',w/2,h/2);});
            const sign=new THREE.Mesh(new THREE.PlaneGeometry(Math.min(16,len*.8),4),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));
            sign.position.set((a.x+c.x)/2+(c.z-a.z)/len*.26,b.base+height-3,(a.z+c.z)/2-(c.x-a.x)/len*.26);sign.rotation.y=Math.atan2((c.z-a.z)/len,-(c.x-a.x)/len);world.add(sign);
          }
        }
      }
      if(b.id==='pavilion')pavilionBalcony(b,detail,glass);
      if(b.id==='osm-way-45229649')quadrangleTower(b,masonry,detail);
      addCollider({points:pts,holes:b.holes||[],top:b.height,base:b.base});
    }
    const concrete=surfaceTexture('concrete'),brick=surfaceTexture('brick');
    world.add(masonry.mesh(style('#ffffff',{vertexColors:true,map:concrete,bumpMap:concrete,bumpScale:.035})));
    world.add(brickwork.mesh(style('#ffffff',{vertexColors:true,map:brick,bumpMap:brick,bumpScale:.075})));
    const clinker=clinkerTexture();clinker.wrapS=clinker.wrapT=THREE.RepeatWrapping;clinker.anisotropy=8;
    world.add(clinkerwork.mesh(style('#ffffff',{vertexColors:true,map:clinker,bumpMap:clinker,bumpScale:.028})));
    const aggregate=surfaceTexture('aggregate');
    world.add(aggregatework.mesh(style('#ffffff',{vertexColors:true,map:aggregate,bumpMap:aggregate,bumpScale:.018})));
    world.add(glass.mesh(style('#ffffff',{vertexColors:true,roughness:.16,metalness:.45,envMapIntensity:1.25})));
    world.add(detail.mesh(style('#ffffff',{vertexColors:true,roughness:.72})));
    world.add(roofs.mesh(style('#ffffff',{vertexColors:true,roughness:.95})));
  }

  function scientiaCanopy(b,detail,glass){
    const e=b.extent,cx=e.x,cz=e.z,base=b.base;
    // Existing OSM canopy footprint; structural form from the architect's photos.
    const roof=new Batch();roof.base=base;
    const half=15,depth=4.8;
    roof.quad([cx-half,13,cz-depth],[cx-half,11,cz+depth],[cx+half,11,cz+depth],[cx+half,13,cz-depth],'#89a5a7');
    world.add(roof.mesh(style('#b4c9c9',{vertexColors:true,metalness:.2,roughness:.12,transparent:true,opacity:.68,side:THREE.DoubleSide})));
    const beam=(from,to,r=.17,color='#7e4936')=>{
      const a=new THREE.Vector3(from[0],from[1]+base,from[2]),c=new THREE.Vector3(to[0],to[1]+base,to[2]);
      const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,a.distanceTo(c),10),style(color));mesh.position.copy(a).add(c).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(UP,c.sub(a).normalize());mesh.castShadow=true;world.add(mesh);
    };
    for(const x of [cx-9,cx+9]){
      beam([x,0,cz],[x,6.6,cz],.27);
      for(const side of [-1,1]){beam([x,6,cz],[x+side*5,12.6,cz-depth],.2);beam([x,6,cz],[x+side*5,10.8,cz+depth],.18);}
    }
    for(let x=cx-half;x<=cx+half;x+=3)beam([x,13,cz-depth],[x,11,cz+depth],.055,'#8d9696');
    addCollider({points:b.points,bottom:10.7,top:13.3,base});
  }

  function quadrangleTower(b,masonry,detail){
    const pts=b.points,e=b.extent;
    // Sundial form is reconstructed; its dimensions are not a surveyed plan.
    const x=e.minX+14,z=e.maxZ-10,base=terrainHeight(x,z),height=24;
    const tower=new Batch();tower.base=base;tower.box(x,height/2,z,5.6,height,5.6,'#ad8d55');
    tower.box(x,height-2,z,6.2,.4,6.2,'#c0b398');
    for(const dx of [-2.6,2.6])for(const dz of [-2.6,2.6])tower.box(x+dx,height+1,z+dz,.16,5,.16,'#5b6259');
    world.add(tower.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick')})));
    const tex=canvasTexture(512,512,(ctx,w,h)=>{ctx.fillStyle='#bba274';ctx.fillRect(0,0,w,h);ctx.fillStyle='#484c42';ctx.font='29px serif';ctx.textAlign='center';ctx.textBaseline='middle';const numbers=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];for(let i=0;i<12;i++){const a=i/12*TAU-Math.PI/2;ctx.fillText(numbers[i],256+Math.cos(a)*195,256+Math.sin(a)*195);}ctx.font='22px serif';ctx.fillText('MMI',256,340);});
    const face=new THREE.Mesh(new THREE.PlaneGeometry(4.8,4.8),new THREE.MeshStandardMaterial({map:tex,roughness:.9}));face.position.set(x,base+17,z+2.82);world.add(face);
    const gnomon=new Batch();gnomon.base=base;gnomon.triangle([x,17,z+2.86],[x,19,z+2.86],[x,17,z+4.6],'#464d45');world.add(gnomon.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    addCollider({x,z,radius:3.3,top:29,base});
  }

  function roundhouse(b,masonry,glass,detail,roofs) {
    const e=b.extent,cx=e.x,cz=e.z,rx=e.width/2,rz=e.depth/2;
      const radius=Math.min(rx,rz),height=clamp(b.height,7.5,10.5),segments=96;
    const pts=[]; for(let i=0;i<segments;i++) pts.push({x:cx+Math.cos(i/segments*TAU)*radius,z:cz+Math.sin(i/segments*TAU)*radius});
    b.points=pts; b.height=height;
    for(let i=0;i<segments;i++) {
      const a=pts[i],next=pts[(i+1)%segments];
      wallPanel(masonry,a,next,0,height,'#c8c2a7');
      wallPanel(glass,a,next,.45,3.4,'#344448',.045,.04,.96);
      wallPanel(glass,a,next,4.65,height-.65,'#4b5a58',.045,.04,.96);
      const outerA={x:cx+(a.x-cx)*(radius+1.4)/radius,z:cz+(a.z-cz)*(radius+1.4)/radius},outerB={x:cx+(next.x-cx)*(radius+1.4)/radius,z:cz+(next.z-cz)*(radius+1.4)/radius};
      wallPanel(detail,outerA,outerB,3.5,4.7,'#deded5',.025);
      const angle=i/segments*TAU;
      detail.box(cx+Math.cos(angle)*(radius+.12),height/2,cz+Math.sin(angle)*(radius+.12),.095,height,.12,'#aca891',-angle);
    }
    polygon(roofs,pts,height,'#c1c2b4');
    const rim=new THREE.Mesh(new THREE.CylinderGeometry(radius+1.5,radius+1.5,.38,96),style('#3f5053'));
    rim.position.set(cx,b.base+height+.1,cz); rim.castShadow=true;rim.receiveShadow=true; world.add(rim);
    const canopy=new THREE.Mesh(new THREE.CylinderGeometry(radius+3.1,radius+2.9,.18,64),style('#dbd9c7'));
    canopy.position.set(cx,b.base+3.65,cz);canopy.castShadow=true;world.add(canopy);
    const cap=new THREE.Mesh(new THREE.SphereGeometry(radius*.33,40,16,0,TAU,0,Math.PI/2),style('#9bb2b6',{roughness:.14,metalness:.5}));
    cap.scale.y=.23;cap.position.set(cx,b.base+height+.25,cz); cap.castShadow=true;world.add(cap);
    // The balcony has a light, open rhythm instead of a heavy solid wall.
    for(let i=0;i<48;i++) {
      const a=i/48*TAU,x=cx+Math.cos(a)*(radius+1.4),z=cz+Math.sin(a)*(radius+1.4);
      detail.box(x,4.43,z,.06,.75,.06,'#586660');
    }
    const rail=new THREE.Mesh(new THREE.TorusGeometry(radius+1.4,.055,5,64),style('#65706a'));
    rail.rotation.x=Math.PI/2;rail.position.set(cx,b.base+4.8,cz);world.add(rail);
    // Broad external stair and solid white balcony fascia, visible in the
    // post-refurbishment exterior photographs.
    const ux=.6,uz=.8,normal={x:-uz,z:ux},stairAngle=Math.atan2(-ux,-uz),count=23;
    for(let i=0;i<count;i++){
      const r=radius+12-i*11/count,x=cx+ux*r,z=cz+uz*r,h=(i+1)*3.65/count;
      detail.box(x,h/2,z,3.6,h,11/count+.03,'#c9c8bc',stairAngle);
      for(const side of [-1,1])detail.box(x+normal.x*1.8*side,h+.5,z+normal.z*1.8*side,.16,1,11/count+.04,'#e0dfd5',stairAngle);
    }
    stairSegments.push({a:{x:cx+ux*(radius+12),z:cz+uz*(radius+12)},b:{x:cx+ux*(radius+1),z:cz+uz*(radius+1)},h0:b.base,h1:b.base+3.65,width:3.6,count});
    const balconyRing=pts.map(p=>({x:cx+(p.x-cx)*(radius+1.5)/radius,z:cz+(p.z-cz)*(radius+1.5)/radius}));
    addCollider({points:balconyRing,holes:[pts],bottom:3.3,top:3.65,base:b.base});
    const nameTexture=canvasTexture(1024,160,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#24383a';ctx.font='700 105px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('ROUNDHOUSE',w/2,h/2);});
    const nameSign=new THREE.Mesh(new THREE.PlaneGeometry(8,1.25),new THREE.MeshBasicMaterial({map:nameTexture,transparent:true,depthWrite:false}));nameSign.position.set(cx+ux*(radius+1.48),b.base+4.11,cz+uz*(radius+1.48));nameSign.rotation.y=Math.atan2(ux,uz);world.add(nameSign);
    const plaza=new Batch(); ribbon(plaza,[...pts,pts[0]],7,.045,'#d9d3c0');
    world.add(plaza.mesh(style('#ffffff',{vertexColors:true}),false));
  }

  function nearestPath(x,z) {
    let best={distance:Infinity};
    for(const path of paths) {
      const pts=validPoints(path);
      for(let i=0;i<pts.length-1;i++) {
        const q=nearestOnSegment(x,z,pts[i],pts[i+1]),d=Math.hypot(q.x-x,q.z-z);
        if(d<best.distance) best={...q,distance:d,path,a:pts[i],b:pts[i+1]};
      }
    }
    return best;
  }

  function courtyardLandscape(){
    const concrete=new Batch(),wood=new Batch(),plants=new Batch(),random=rng(907);
    for(const garden of greens.filter(g=>g.raisedBy)){
      const pts=validPoints(garden),ring=polygonArea(pts)<0?[...pts].reverse():pts,h=garden.raisedBy;
      let seatEdge=null,north=Infinity;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],b=ring[(i+1)%ring.length],len=distance2(a,b),nx=(b.z-a.z)/len,nz=-(b.x-a.x)/len;
        // Low concrete retaining edge follows the mapped bed and sampled ground.
        wallPanel(concrete,a,b,.03,h,'#bfc4b6',.1);
        wallPanel(concrete,b,a,.03,h,'#bfc4b6',.1);
        const steps=Math.max(1,Math.ceil(len));
        for(let j=0;j<steps;j++){
          const t=j/steps,u=(j+1)/steps,p=(v,side)=>[a.x+(b.x-a.x)*v+nx*side,h+.025,a.z+(b.z-a.z)*v+nz*side];
          concrete.quad(p(t,-.1),p(u,-.1),p(u,.1),p(t,.1),'#d0d1c5');
        }
        if((a.z+b.z)/2<north){north=(a.z+b.z)/2;seatEdge={a,b,len,nx,nz};}
        for(let d=.6;d<len-.3;d+=1)for(const inset of [.4,.8,1.2,1.6]){
          const x=a.x+(b.x-a.x)*d/len-nx*inset,z=a.z+(b.z-a.z)*d/len-nz*inset;
          if(!inPolygon(x,z,ring))continue;
          for(let leaf=0;leaf<13;leaf++){
            const angle=leaf/13*TAU+random()*.3,length=.5+random()*.55,width=.018;
            const dx=Math.cos(angle),dz=Math.sin(angle),px=-dz*width,pz=dx*width;
            const left=[x+dx*.16+px,h+length*.75,z+dz*.16+pz],right=[x+dx*.16-px,h+length*.75,z+dz*.16-pz],shade=['#657b4f','#839262','#4e724d'][leaf%3];
            plants.quad([x+px*.3,h,z+pz*.3],left,right,[x-px*.3,h,z-pz*.3],shade);
            plants.triangle(left,[x+dx*length*.65,h+length,z+dz*length*.65],right,shade);
          }
        }
      }
      // Timber slats attached to the north planter edge, as in the panorama.
      if(seatEdge){
        const {a,b,len,nx,nz}=seatEdge,margin=Math.min(1.5,len*.15),along=d=>({x:a.x+(b.x-a.x)*d/len,z:a.z+(b.z-a.z)*d/len});
        const start=along(margin),end=along(len-margin);
        for(let slat=0;slat<5;slat++){
          const off=.16+slat*.085;
          ribbon(wood,[{x:start.x+nx*off,z:start.z+nz*off},{x:end.x+nx*off,z:end.z+nz*off}],.07,h+.05,'#816c55');
        }
      }
    }
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.02})));
    world.add(wood.mesh(style('#ffffff',{vertexColors:true})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.95})));
  }

  function treesAndFurniture() {
    const random=rng(239),candidates=(campus.trees||[]).map(t=>({...t,big:true})),trees=[];
    // Double rows of spreading figs make University Mall immediately recognisable.
    for(const p of paths) {
      const pts=validPoints(p),mall=/mall/i.test(p.name||'');
      if((p.width||0)<4&&!mall) continue;
      for(let i=0;i<pts.length-1;i++) {
        const a=pts[i],b=pts[i+1],len=distance2(a,b),nx=-(b.z-a.z)/(len||1),nz=(b.x-a.x)/(len||1);
        for(let d=mall?5:12;d<len;d+=mall?17:30) for(const side of [-1,1]) {
          const offset=(p.width||8)/2+(mall?2.7:3.5);
          candidates.push({x:a.x+(b.x-a.x)*d/len+nx*offset*side,z:a.z+(b.z-a.z)*d/len+nz*offset*side,big:mall});
        }
      }
    }
    for(const g of greens) {
      const pts=validPoints(g);if(pts.length<3)continue;
      for(let i=0;i<pts.length;i++) {
        const a=pts[i],b=pts[(i+1)%pts.length],len=distance2(a,b);
        for(let d=8;d<len;d+=20) candidates.push({x:a.x+(b.x-a.x)*d/len,z:a.z+(b.z-a.z)*d/len,big:random()>.5});
      }
    }
    for(let i=0;i<100;i++) candidates.push({x:bounds.minX+8+random()*(bounds.maxX-bounds.minX-16),z:bounds.minZ+8+random()*(bounds.maxZ-bounds.minZ-16),big:false});
    for(const c of candidates) {
      const fig=c.form==='heritage-fig',fixedTree=['samuels-gum','civil-poplar'].includes(c.form);
      if(c.x<bounds.minX+3||c.x>bounds.maxX-3||c.z<bounds.minZ+3||c.z>bounds.maxZ-3)continue;
      if(blocked(c.x,c.z,null,fixedTree?.55:fig?1:3))continue;
      if(trees.some(t=>distance2(c,t)<(fixedTree?3:c.big?10:8)))continue;
      const n=nearestPath(c.x,c.z);if(n.distance<(n.path?.width||3)/2+(fixedTree?.5:fig?.35:1.4))continue;
      // Keep the actual playing surface clear.
      if(greens.some(g=>/village|pitch|sport|field/i.test(`${g.kind} ${g.name} ${g.id}`)&&inPolygon(c.x,c.z,validPoints(g))))continue;
      trees.push({...c,scale:c.height?c.height/9.5:(c.big?1.1:.8)+random()*.25,rotation:random()*TAU});
      addCollider({x:c.x,z:c.z,radius:fig?.75:c.big?.52:.32,top:c.height||9});
    }
    const branchCount=trees.length*9;
    const branches=new THREE.InstancedMesh(new THREE.CylinderGeometry(.72,1,1,9),style('#c2bfb0',{map:surfaceTexture('bark')}),branchCount);
    const leafCount=trees.reduce((sum,t)=>sum+(t.form==='heritage-fig'?160:64),0);
    const leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(1.9,1.9),style('#8b9d7b',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide,roughness:.93}),leafCount);
    branches.castShadow=true;branches.receiveShadow=true;leaves.castShadow=true;leaves.receiveShadow=true;
    const dummy=new THREE.Object3D();let branchIndex=0,leafIndex=0;
    const branch=(a,b,radius,color)=>{
      const direction=new THREE.Vector3(b.x-a.x,b.y-a.y,b.z-a.z);
      dummy.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);dummy.quaternion.setFromUnitVectors(UP,direction.clone().normalize());dummy.scale.set(radius,direction.length(),radius);dummy.updateMatrix();branches.setMatrixAt(branchIndex,dummy.matrix);branches.setColorAt(branchIndex++,new THREE.Color(color));
    };
    for(const t of trees){
      const fig=t.form==='heritage-fig',poplar=t.form==='civil-poplar',s=t.scale*.86,base=terrainHeight(t.x,t.z),fork=base+(fig?2.7:poplar?3.8:4.4)*s,color=fig?'#887f69':poplar?'#a19c87':'#ffffff';
      branch({x:t.x,y:base,z:t.z},{x:t.x+.12*s,y:fork,z:t.z},(fig?.65:.34)*s,color);
      for(let j=0;j<4;j++){
        const a=t.rotation+j/4*TAU,mid={x:t.x+Math.cos(a)*(fig?3.1:poplar?.4:1.5)*s,y:fork+(fig?3.4:2.6)*s,z:t.z+Math.sin(a)*(fig?3.1:poplar?.4:1.5)*s};
        branch({x:t.x,y:fork-.5*s,z:t.z},mid,(fig?.32:.18)*s,color);
        branch(mid,{x:t.x+Math.cos(a)*(fig?5.8:poplar?.8:3)*s,y:base+(9.2+(j%2))*s,z:t.z+Math.sin(a)*(fig?5.8:poplar?.8:3)*s},(fig?.18:.09)*s,color);
      }
      for(let j=0;j<(fig?160:64);j++){
        const a=random()*TAU,r=Math.sqrt(random())*(fig?6:poplar?.7:3.7)*s,cy=base+(poplar?4.8+(j%6):((fig?8.1:8.8)+Math.sin(j)*1.2))*s;
        dummy.position.set(t.x+Math.cos(a)*r,cy+(random()-.5)*(poplar?.6:2.6)*s,t.z+Math.sin(a)*r);
        dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);const size=(.75+random()*.5)*s*(fig?1.45:poplar?.55:1);dummy.scale.set(size,size,size);dummy.updateMatrix();leaves.setMatrixAt(leafIndex,dummy.matrix);leaves.setColorAt(leafIndex,new THREE.Color((fig?['#587148','#6a8052','#788956','#556d43']:['#8e9d7b','#b4bd9d','#a1b48b','#b9c29f'])[j%4]));leafIndex++;
      }
    }
    world.add(branches,leaves);
    const furniture=new Batch(),metal=new Batch();
    const mallPaths=paths.filter(p=>/mall/i.test(p.name||''));
    const benchSites=[];
    for(const p of mallPaths) {
      const pts=validPoints(p);
      for(let i=0;i<pts.length-1;i++) {
        const a=pts[i],b=pts[i+1],len=distance2(a,b),dx=(b.x-a.x)/(len||1),dz=(b.z-a.z)/(len||1);
        for(let d=16;d<len;d+=36) {
          const side=(Math.floor(d/36)%2)?1:-1,off=(p.width||10)/2+1.3;
          const x=a.x+dx*d-dz*off*side,z=a.z+dz*d+dx*off*side;
          if(blocked(x,z,null,1.6))continue;
          const angle=Math.atan2(-dz,dx);benchSites.push({x,z,angle});
          for(let slat=0;slat<5;slat++)furniture.box(x+Math.sin(angle)*(slat-2)*.12,.48,z+Math.cos(angle)*(slat-2)*.12,2.3,.09,.095,'#88745a',angle);
          const nx=Math.sin(angle),nz=Math.cos(angle);
          for(let slat=0;slat<3;slat++)furniture.box(x+nx*.27,.72+slat*.16,z+nz*.27,2.3,.12,.08,'#88745a',angle);
          for(const s of [-.8,.8]) metal.box(x+dx*s,.24,z+dz*s,.1,.5,.48,'#52615a',angle);
          const co=Math.cos(angle),si=-Math.sin(angle),ptsBench=[[-1.2,-.36],[1.2,-.36],[1.2,.36],[-1.2,.36]].map(([xx,zz])=>({x:x+xx*co-zz*si,z:z+xx*si+zz*co}));
          addCollider({points:ptsBench,top:.58});
          const lx=x-dz*1.8,lz=z+dx*1.8;
          metal.box(lx,2.6,lz,.13,5.2,.13,'#55655c');metal.box(lx,5.25,lz,.75,.15,.75,'#e8e4cb');
        }
      }
    }
    for(const item of CAMPUS_DETAILS){
      const {x,z,type}=item;if(blocked(x,z,null,.4))continue;
      const near=nearestPath(x,z),angle=near.a?Math.atan2(-(near.b.z-near.a.z),near.b.x-near.a.x):0;
      if(type==='bench'&&!benchSites.some(p=>Math.hypot(p.x-x,p.z-z)<4)){
        for(let k=0;k<5;k++)furniture.box(x+Math.sin(angle)*(k-2)*.12,.46,z+Math.cos(angle)*(k-2)*.12,1.9,.09,.095,'#82765c',angle);
        for(let k=0;k<3;k++)furniture.box(x+Math.sin(angle)*.27,.7+k*.15,z+Math.cos(angle)*.27,1.9,.1,.08,'#82765c',angle);
        for(const side of [-.7,.7])metal.box(x+Math.cos(angle)*side,.24,z-Math.sin(angle)*side,.09,.48,.48,'#4c5957',angle);
      }else if(type==='bin'){
        metal.box(x,.49,z,.62,.98,.6,'#3e5551',angle);metal.box(x,1.01,z,.65,.12,.64,'#b8a044',angle);metal.box(x,.8,z+.305,.4,.12,.025,'#273d39',angle);
      }else if(type==='bikes'){
        const count=Math.min(6,Math.max(2,Math.ceil((item.capacity||6)/2)));
        for(let i=0;i<count;i++){const dx=(i-(count-1)/2)*.75;for(const side of [-.28,.28])metal.box(x+dx,.4,z+side,.045,.8,.045,'#929e9c');metal.box(x+dx,.8,z,.045,.045,.6,'#929e9c');}
      }else if(type==='water'){
        metal.box(x,.48,z,.18,.96,.18,'#596d64');metal.box(x,.98,z,.5,.12,.42,'#a6b2ae');metal.box(x,1.09,z-.1,.04,.15,.04,'#a6b2ae');
      }else if(type==='bollard')metal.box(x,.45,z,.14,.9,.14,'#626e66');
    }
    world.add(furniture.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('bark')})),metal.mesh(style('#ffffff',{vertexColors:true,roughness:.45,metalness:.35})));
  }

  function sportsField() {
    const area=VILLAGE_SPORTS.find(s=>s.sport==='soccer');if(!area)return;
    const f=orientedFrame(area.points),pitch=new Batch(),mark=new Batch(),yellow=new Batch(),metal=new Batch(),track=new Batch(),courts=new Batch();
    const w=Math.min(68,f.width-5),d=Math.min(105,f.length-6),angle=Math.atan2(-f.u.z,f.u.x);
    for(let row=0;row<12;row++)polygon(pitch,clipFrameStrip(area.points,f,-f.length/2+row*f.length/12,-f.length/2+(row+1)*f.length/12),.09,row%2?'#4c714a':'#557b50');
    const line=(frame,a,b,width=.12,batch=mark,height=.125)=>ribbon(batch,[framePoint(frame,...a),framePoint(frame,...b)],width,height,batch===yellow?'#cfb954':'#eeeede');
    const rect=(frame,width,length,x=0,z=0,batch=mark,height=.125)=>{const pts=frameRectangle(frame,width,length,x,z);ribbon(batch,[...pts,pts[0]],.12,height,batch===yellow?'#d8bd57':'#eeeede');};
    const circle=(frame,x,z,radius,batch=mark,height=.125)=>{const pts=[];for(let i=0;i<=64;i++)pts.push(framePoint(frame,x+Math.cos(i/64*TAU)*radius,z+Math.sin(i/64*TAU)*radius));ribbon(batch,pts,.1,height,'#e9eadc');};
    rect(f,w,d);line(f,[-w/2,0],[w/2,0]);circle(f,0,0,9.15);
    for(const side of [-1,1]){
      rect(f,40.32,16.5,0,side*(d/2-8.25));rect(f,18.32,5.5,0,side*(d/2-2.75));
      circle(f,0,side*(d/2-11),.12);
      const arc=[];for(let i=0;i<=96;i++){const t=i/96*TAU,x=Math.cos(t)*9.15,z=side*(d/2-11)+Math.sin(t)*9.15;if(side*z<d/2-16.5)arc.push(framePoint(f,x,z));}ribbon(mark,arc,.1,.125,'#eeeeDF');
      const gz=side*d/2,post=(x,z)=>framePoint(f,x,z),a=post(-3.66,gz),b=post(3.66,gz),centre=post(0,gz);
      metal.box(a.x,1.25,a.z,.1,2.5,.1,'#e1e4d7');metal.box(b.x,1.25,b.z,.1,2.5,.1,'#e1e4d7');metal.box(centre.x,2.45,centre.z,7.42,.1,.1,'#e1e4d7',angle);
      for(let j=0;j<=16;j++){const p=post(-3.66+j*7.32/16,gz+side*1.5);metal.box(p.x,1.15,p.z,.012,2.3,.012,'#aab9a6');}
      for(let j=0;j<9;j++){const p=post(0,gz+side*1.5);metal.box(p.x,.2+j*.27,p.z,7.32,.012,.012,'#aab9a6',angle);}
      // The aerial also shows the multi-sport field's yellow rugby markings.
      for(const distance of [10,28,50]){const z=side*distance;ribbon(yellow,[framePoint(f,-w/2,z),framePoint(f,w/2,z)],.085,.13,'#cfb954');}
      for(let x=-w/2;x<w/2;x+=5)line(f,[x,side*40],[Math.min(w/2,x+1),side*40],.085,yellow,.13);
    }
    const run=VILLAGE_SPORTS.find(s=>s.kind==='track');
    if(run){ribbon(track,run.points,3.2,.265,'#3b8eb9');ribbon(mark,run.points,.08,.276,'#cce0e4');}
    const hoopGeometry=new THREE.TorusGeometry(.23,.018,6,24),hoopMaterial=style('#c36d3f');
    for(const court of VILLAGE_SPORTS.filter(s=>s.kind==='pitch'&&['multi','basketball'].includes(s.sport))){
      const frame=orientedFrame(court.points),cw=Math.min(15,frame.width-1),half=court.id==='osm-way-1178531044',cl=Math.min(half?14:28,frame.length-1),rotation=Math.atan2(-frame.u.z,frame.u.x);
      polygon(courts,frameRectangle(frame,frame.width+2.4,frame.length+2.4),.265,'#3988b6',[court.points]);
      polygon(courts,court.points,.28,'#b87692');rect(frame,cw,cl,0,0,mark,.30);
      if(!half){line(frame,[-cw/2,0],[cw/2,0],.085,mark,.30);circle(frame,0,0,1.8,mark,.30);}
      for(const side of half?[1]:[-1,1]){
        rect(frame,4.9,5.8,0,side*(cl/2-2.9),mark,.30);
        const p=framePoint(frame,0,side*(cl/2+1)),board=framePoint(frame,0,side*(cl/2-.35)),bracket=framePoint(frame,0,side*(cl/2+.3)),rim=framePoint(frame,0,side*(cl/2-.85));
        metal.box(p.x,1.9,p.z,.12,3.8,.12,'#566562');metal.box(bracket.x,3.65,bracket.z,.09,.09,1.5,'#566562',rotation);
        metal.box(board.x,3.55,board.z,1.8,1.05,.08,'#d7dfd8',rotation);
        const hoop=new THREE.Mesh(hoopGeometry,hoopMaterial);hoop.rotation.x=Math.PI/2;hoop.position.set(rim.x,terrainHeight(rim.x,rim.z)+3.05,rim.z);world.add(hoop);
        for(let i=0;i<8;i++){const t=i/8*TAU;metal.box(rim.x+Math.cos(t)*.19,2.86,rim.z+Math.sin(t)*.19,.014,.36,.014,'#d7dfd8');}
      }
    }
    for(const feature of VILLAGE_SPORTS.filter(s=>s.sport==='fitness'||s.sport==='bouldering'))polygon(courts,feature.points,.265,feature.sport==='fitness'?'#3e8db6':'#d1c8ac');
    const texture=surfaceTexture('grass');
    world.add(pitch.mesh(style('#ffffff',{vertexColors:true,map:texture}),false),track.mesh(style('#ffffff',{vertexColors:true}),false),courts.mesh(style('#ffffff',{vertexColors:true}),false));
    world.add(mark.mesh(style('#ffffff',{vertexColors:true}),false),yellow.mesh(style('#ffffff',{vertexColors:true}),false),metal.mesh(style('#ffffff',{vertexColors:true})));
    const spawn=framePoint(f,-w*.2,-d*.26);ballSpawn={...spawn,y:surfaceHeight(spawn.x,spawn.z)+.29};createBall();
  }

  function createBall() {
    const group=new THREE.Group();
    const sphere=new THREE.Mesh(new THREE.SphereGeometry(.28,24,16),style('#eee8d8',{roughness:.72}));sphere.castShadow=true;group.add(sphere);
    const ico=new THREE.IcosahedronGeometry(1,0),attr=ico.getAttribute('position'),unique=new Map();
    for(let i=0;i<attr.count;i++) {
      const v=new THREE.Vector3().fromBufferAttribute(attr,i).normalize();unique.set(`${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`,v);
    }
    const patchGeo=new THREE.CircleGeometry(.096,5),patchMat=style('#3f4944',{side:THREE.DoubleSide});
    for(const v of unique.values()) {
      const patch=new THREE.Mesh(patchGeo,patchMat);patch.position.copy(v).multiplyScalar(.279);patch.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),v);group.add(patch);
    }
    ico.dispose();world.add(group);
    ball={mesh:group,x:ballSpawn.x,y:ballSpawn.y,z:ballSpawn.z,vx:0,vy:0,vz:0};group.position.set(ball.x,ball.y,ball.z);
  }

  function signsAndCuriosities() {
    // The map MVP uses real building wayfinding, with no collectible overlays.
    const selected=[];
    for(const l of landmarks) {
      const b=buildings.find(b=>b.id===l.id),pos=l.position||l;
      let x=pos.x,z=pos.z;
      if(!Number.isFinite(x)||!Number.isFinite(z))continue;
      if(b&&inPolygon(x,z,b.points)) {
        const q=nearestPath(b.extent.x,b.extent.z);x=q.x;z=q.z;
      }
      const safe=safePoint({x,z});
      l.walkPoint={x:safe.x,z:safe.z};
      if(l.showSign===false)continue;
      const near=nearestPath(safe.x,safe.z);
      let angle=near.a?Math.atan2(near.b.x-near.a.x,-(near.b.z-near.a.z)):0;
      const sign=new THREE.Group();
      const board=new THREE.Mesh(new THREE.BoxGeometry(.9,1.68,.14),style('#293b3b'));
      board.position.y=1.55;board.castShadow=true;sign.add(board);
      const face=new THREE.Mesh(new THREE.PlaneGeometry(.86,1.64),new THREE.MeshBasicMaterial({map:textTexture(l.name||b?.name||l.id,l.code||b?.campusRef||'')}));
      face.position.set(0,1.55,.077);sign.add(face);
      const post=new THREE.Mesh(new THREE.BoxGeometry(.14,.8,.14),style('#354440'));post.position.set(0,.4,0);post.castShadow=true;sign.add(post);
      sign.position.set(safe.x+Math.cos(angle)*2.5,terrainHeight(safe.x,safe.z),safe.z+Math.sin(angle)*2.5);sign.rotation.y=-angle;world.add(sign);
    }
    curiosities=selected.map((l,index)=> {
      let p=l.walkPoint||{x:l.x,z:l.z};
      if(!Number.isFinite(p.x)){const e=l.extent||extent(l.points);p={x:e.x,z:e.z};}
      p=safePoint({x:p.x+((index%2)?-1.7:1.7),z:p.z+1.8});
      const group=new THREE.Group();
      const pedestal=new THREE.Mesh(new THREE.CylinderGeometry(.48,.58,.28,8),style('#d9d5bd'));pedestal.position.y=.14;pedestal.receiveShadow=true;group.add(pedestal);
      const token=new THREE.Group();
      const disc=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.12,24),style('#eaa85d',{metalness:.25,roughness:.37}));disc.rotation.x=Math.PI/2;disc.castShadow=true;token.add(disc);
      const starShape=new THREE.Shape();for(let i=0;i<10;i++){const a=i/10*TAU-Math.PI/2,r=i%2?.095:.21;if(i===0)starShape.moveTo(Math.cos(a)*r,Math.sin(a)*r);else starShape.lineTo(Math.cos(a)*r,Math.sin(a)*r);}starShape.closePath();
      const star=new THREE.Mesh(new THREE.ShapeGeometry(starShape),new THREE.MeshBasicMaterial({color:'#fff4d5',side:THREE.DoubleSide}));star.position.z=.067;token.add(star);
      token.position.y=1.1;group.add(token);
      const ring=new THREE.Mesh(new THREE.TorusGeometry(.58,.022,5,32),style('#e5ad65'));ring.rotation.x=Math.PI/2;ring.position.y=.3;group.add(ring);
      group.position.set(p.x,terrainHeight(p.x,p.z),p.z);world.add(group);
      return{id:l.id||`curiosity-${index}`,name:l.name||'Campus curiosity',x:p.x,z:p.z,mesh:group,token,index};
    });
  }


  function disposeWorld() {
    const geometries=new Set(),materials=new Set(),textures=new Set();
    world.traverse(object=>{if(object.geometry)geometries.add(object.geometry);for(const mat of Array.isArray(object.material)?object.material:object.material?[object.material]:[]){materials.add(mat);for(const value of Object.values(mat))if(value?.isTexture)textures.add(value);}});
    for(const {target}of campusReflections){textures.delete(target.texture);target.dispose();}campusReflections.length=0;
    for(const geo of geometries)geo.dispose();for(const mat of materials)mat.dispose();for(const texture of textures)texture.dispose();
    scene.remove(world);world=new THREE.Group();scene.add(world);
  }

  function loadCampus(data) {
    try {
      clearInputs();disposeWorld();campus=data;
      buildings=(data.buildings||[]).map(b=>({...b,points:validPoints(b)})).filter(b=>b.points.length>=3);
      paths=data.paths||data.roads||[];greens=data.greens||data.parks||[];landmarks=(data.landmarks||[]).map(l=>({...l,...(l.position||{})}));
      stairSegments=[];surfaceCells=new Map();groundPatches=[];
      for(const path of paths)for(let i=0;i<path.points.length-1;i++){
        const a=path.points[i],b=path.points[i+1],width=path.width||3,road=/road|service|residential|street/i.test(path.kind||path.type||'');
        const item={a,b,width,road};
        for(let x=Math.floor((Math.min(a.x,b.x)-width)/20);x<=Math.floor((Math.max(a.x,b.x)+width)/20);x++)for(let z=Math.floor((Math.min(a.z,b.z)-width)/20);z<=Math.floor((Math.max(a.z,b.z)+width)/20);z++){
          const key=`${x},${z}`;if(!surfaceCells.has(key))surfaceCells.set(key,[]);surfaceCells.get(key).push(item);
        }
      }
      for(const path of paths.filter(p=>p.kind==='steps'))for(let i=0;i<path.points.length-1;i++){
        const a=path.points[i],b=path.points[i+1],h0=terrainHeight(a.x,a.z)+.17,h1=terrainHeight(b.x,b.z)+.17;
        if(distance2(a,b)>.2)stairSegments.push({a,b,h0,h1,width:path.width||3,count:Math.max(1,Math.ceil(Math.abs(h1-h0)/.17))});
      }
      const bb=data.bounds||{minX:-245,maxX:290,minZ:-240,maxZ:190};
      bounds={minX:bb.minX??bb.west??-245,maxX:bb.maxX??bb.east??290,minZ:bb.minZ??bb.north??-240,maxZ:bb.maxZ??bb.south??190};
      colliders=[];spatial=new Map();found=new Set();curiosities=[];ball=null;totalDistance=0;
      spawn={x:data.spawn?.x??-125,z:data.spawn?.z??-35,heading:data.spawn?.heading??Math.PI/2};
      groundAndPaths();buildingWorld();courtyardLandscape();treesAndFurniture();sportsField();signsAndCuriosities();
      updateCampusReflection();
      spawn=safePoint(spawn);reset();makeMinimap();report();
    }catch(error){onError(error);throw error;}
  }

  function reset() {
    clearInputs();player={x:spawn.x,y:surfaceHeight(spawn.x,spawn.z),z:spawn.z,vx:0,vz:0,vy:0,heading:spawn.heading??Math.PI/2,pitch:0,grounded:true};
    if(ball&&ballSpawn){Object.assign(ball,{x:ballSpawn.x,y:ballSpawn.y,z:ballSpawn.z,vx:0,vy:0,vz:0});ball.mesh.position.set(ball.x,ball.y,ball.z);}
    totalDistance=0;lastInteraction='';updateCamera(0);report();
  }

  function teleport(id) {
    let l=landmarks.find(l=>l.id===id)||curiosities.find(l=>l.id===id);
    const building=buildings.find(b=>b.id===id);
    if(!l&&building){const e=building.extent,q=nearestPath(e.x,e.z);l={x:q.x,z:q.z};}
    if(!l)return false;
    const p=safePoint(l.walkPoint||l.teleport||l);
    Object.assign(player,{x:p.x,y:surfaceHeight(p.x,p.z),z:p.z,vx:0,vz:0,vy:0,grounded:true,pitch:Number.isFinite(l.pitch)?clamp(l.pitch,-1.1,1.1):0});
    const b=buildings.find(b=>b.id===id);
    if(Number.isFinite(l.heading))player.heading=l.heading;
    else if(b)player.heading=Math.atan2(b.extent.x-p.x,-(b.extent.z-p.z));
    clearInputs();updateCamera(0);report();return true;
  }

  function teleportTo(position) {
    if(!campus||!Number.isFinite(position?.x)||!Number.isFinite(position?.z))return false;
    const p=safePoint({x:clamp(position.x,bounds.minX+2,bounds.maxX-2),z:clamp(position.z,bounds.minZ+2,bounds.maxZ-2)});
    Object.assign(player,{x:p.x,y:surfaceHeight(p.x,p.z),z:p.z,vx:0,vz:0,vy:0,grounded:true,pitch:0});
    if(Number.isFinite(position.heading))player.heading=position.heading;
    clearInputs();updateCamera(0);report();return true;
  }

  function setPaused(value) {
    paused=Boolean(value);clearInputs();lastFrame=performance.now();
    if(!paused)hasStarted=true;
    if(paused&&document.pointerLockElement===canvas)document.exitPointerLock?.();
    report();
  }

  function setTime(value) {
    timeOfDay=value==='golden'?'golden':'day';
    const golden=timeOfDay==='golden';
    sunlight.color.set(golden?'#ffd2a0':'#fff0cf');sunlight.intensity=golden?2.5:2.25;
    hemisphere.color.set(golden?'#e3e4ee':'#e3f0ff');hemisphere.intensity=golden?1.15:1.5;
    const skyCtx=skyTexture.image.getContext('2d'),gradient=skyCtx.createLinearGradient(0,0,0,512);
    gradient.addColorStop(0,golden?'#718eb0':'#5f91bd');gradient.addColorStop(.48,golden?'#ead6b1':'#cbdbe1');gradient.addColorStop(.52,'#b6b6a2');gradient.addColorStop(1,'#66715e');skyCtx.fillStyle=gradient;skyCtx.fillRect(0,0,1024,512);skyTexture.needsUpdate=true;
    scene.fog.color.set(golden?'#e3d9c8':'#c6d8df');
    shadowAnchor.x=1e6;updateSun();updateCampusReflection();report();
  }

  function setInput(action,value) {
    const alias={back:'backward',reverse:'backward',down:'backward',up:'forward',run:'sprint'};
    const key=alias[action]||action;
    if(key in inputs)inputs[key]=Boolean(value);
    else if(action==='jump'&&value)jump();else if(action==='interact'&&value)interact();
  }

  function look(dx,dy) {
    if(paused||hidden)return;
    player.heading+=Number(dx||0)*.0023;player.pitch=clamp(player.pitch-Number(dy||0)*.0023,-1.35,1.35);
  }

  function jump() {
    if(paused||hidden||!player.grounded)return;
    player.vy=6.3;player.grounded=false;
  }

  function interact() {
    if(paused||hidden||!ball||Math.hypot(ball.x-player.x,ball.z-player.z)>2.8)return false;
    const dx=Math.sin(player.heading),dz=-Math.cos(player.heading);
    ball.vx=dx*11.5+player.vx*.5;ball.vz=dz*11.5+player.vz*.5;ball.vy=4.6;lastInteraction='kick';report();return true;
  }

  function movePlayer(dt) {
    const forward=Number(inputs.forward)-Number(inputs.backward),right=Number(inputs.right)-Number(inputs.left),norm=Math.hypot(forward,right)||1;
    const speed=inputs.sprint?7.1:3.8;
    const targetX=(Math.sin(player.heading)*forward+Math.cos(player.heading)*right)/norm*speed;
    const targetZ=(-Math.cos(player.heading)*forward+Math.sin(player.heading)*right)/norm*speed;
    const damp=1-Math.exp(-dt*(player.grounded?14:5));
    player.vx+=(targetX-player.vx)*damp;player.vz+=(targetZ-player.vz)*damp;
    const dx=player.vx*dt,dz=player.vz*dt,steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.16));
    const oldX=player.x,oldZ=player.z;
    for(let i=0;i<steps;i++) {
      if(!blocked(player.x+dx/steps,player.z,player.y))player.x+=dx/steps;else player.vx=0;
      if(!blocked(player.x,player.z+dz/steps,player.y))player.z+=dz/steps;else player.vz=0;
    }
    const previousY=player.y;player.vy-=18*dt;player.y+=player.vy*dt;
    let floor=surfaceHeight(player.x,player.z);
    for(const c of nearbyColliders(player.x,player.z,.32)) {
      const top=colliderTop(c,player.x,player.z);
      if(previousY<top-(c.stepHeight||.08)||player.y>top)continue;
      if(c.points?circleTouchesPolygon(player.x,player.z,.26,c.points):Math.hypot(player.x-c.x,player.z-c.z)<c.radius+.26)floor=Math.max(floor,top);
    }
    if(player.y<=floor){player.y=floor;player.vy=0;player.grounded=true;}else player.grounded=false;
    totalDistance+=Math.hypot(player.x-oldX,player.z-oldZ);
    for(const c of curiosities) {
      if(!found.has(c.id)&&Math.hypot(player.x-c.x,player.z-c.z)<1.65){found.add(c.id);c.mesh.visible=false;lastInteraction=`discovered:${c.id}`;report();}
    }
  }

  function moveBall(dt) {
    if(!ball)return;
    ball.vy-=13*dt;ball.y+=ball.vy*dt;
    const ballFloor=surfaceHeight(ball.x,ball.z)+.28;
    if(ball.y<ballFloor){ball.y=ballFloor;ball.vy=Math.abs(ball.vy)>.8?-ball.vy*.48:0;const drag=Math.exp(-dt*1.05);ball.vx*=drag;ball.vz*=drag;}
    const dx=ball.vx*dt,dz=ball.vz*dt;
    if(!blocked(ball.x+dx,ball.z,Math.max(0,ball.y-.25),.29))ball.x+=dx;else ball.vx*=-.5;
    if(!blocked(ball.x,ball.z+dz,Math.max(0,ball.y-.25),.29))ball.z+=dz;else ball.vz*=-.5;
    const separation=Math.hypot(ball.x-player.x,ball.z-player.z);
    if(separation<.65&&Math.hypot(player.vx,player.vz)>.4){ball.vx+=player.vx*dt*6;ball.vz+=player.vz*dt*6;}
    ball.mesh.position.set(ball.x,ball.y,ball.z);
    ball.mesh.rotation.x+=ball.vz*dt/.28;ball.mesh.rotation.z-=ball.vx*dt/.28;
  }

  function updateSun() {
    if(Math.hypot(player.x-shadowAnchor.x,player.z-shadowAnchor.z)<28)return;
    shadowAnchor={x:Math.round(player.x/20)*20,z:Math.round(player.z/20)*20};
    const golden=timeOfDay==='golden';sunlight.position.set(shadowAnchor.x-110, golden?65:155,shadowAnchor.z+75);
    sunlight.target.position.set(shadowAnchor.x,terrainHeight(shadowAnchor.x,shadowAnchor.z),shadowAnchor.z);sunlight.target.updateMatrixWorld();
  }

  function updateCamera(dt) {
    const speed=Math.hypot(player.vx,player.vz),bob=player.grounded?Math.sin(elapsed*(inputs.sprint?14:10))*.018*Math.min(1,speed/3):0;
    camera.position.set(player.x,player.y+1.7+bob,player.z);camera.rotation.set(player.pitch,-player.heading,0,'YXZ');
    const targetFov=inputs.sprint&&speed>4?72:68;
    const fov=camera.fov+(targetFov-camera.fov)*Math.min(1,dt*5);
    if(Math.abs(camera.fov-fov)>.005){camera.fov=fov;camera.updateProjectionMatrix();}
    updateSun();
  }

  function areaName() {
    if(!campus)return 'Kensington campus';
    for(const green of greens)if(green.name&&inPolygon(player.x,player.z,validPoints(green)))return green.name;
    const nearest=nearestPath(player.x,player.z);
    if(nearest.distance<Math.max(8,(nearest.path?.width||4))) {
      const name=nearest.path?.name;if(name)return name;
    }
    let nearestLandmark=null,distance=Infinity;
    for(const l of landmarks){const p=l.walkPoint||l,d=Math.hypot(player.x-p.x,player.z-p.z);if(d<distance){nearestLandmark=l;distance=d;}}
    return distance<48?nearestLandmark.name:'UNSW Kensington';
  }

  function getState() {
    const nearBall=Boolean(ball&&Math.hypot(ball.x-player.x,ball.z-player.z)<2.8);
    return {position:{x:player.x,y:player.y,z:player.z},speed:Math.hypot(player.vx,player.vz),elevation:player.y,groundElevation:terrainHeight(player.x,player.z),distance:totalDistance,area:areaName(),found:[...found],discoveries:curiosities.filter(c=>found.has(c.id)).map(c=>({id:c.id,name:c.name})),totalDiscoveries:curiosities.length,locked,paused:paused||hidden,nearBall,canInteract:nearBall,interactionHint:nearBall?'Press E to kick the ball':'',heading:player.heading,pitch:player.pitch,grounded:player.grounded,time:timeOfDay,ball:ball?{x:ball.x,y:ball.y,z:ball.z}:null,interaction:lastInteraction};
  }

  function report() { onUpdate(getState());drawMinimap(); }

  function makeMinimap() {
    if(!minimap||!bounds)return;
    const w=640,h=540,pad=22,scale=Math.min((w-pad*2)/(bounds.maxX-bounds.minX),(h-pad*2)/(bounds.maxZ-bounds.minZ));
    const ox=(w-(bounds.maxX-bounds.minX)*scale)/2-bounds.minX*scale,oz=(h-(bounds.maxZ-bounds.minZ)*scale)/2-bounds.minZ*scale;
    minimapBase=document.createElement('canvas');minimapBase.width=w;minimapBase.height=h;minimapInfo={w,h,scale,ox,oz};
    const ctx=minimapBase.getContext('2d');ctx.fillStyle='#e8ecdf';ctx.fillRect(0,0,w,h);
    const poly=(pts,fill,holes=[])=>{if(!pts.length)return;ctx.beginPath();for(const loop of [pts,...holes]){ctx.moveTo(ox+loop[0].x*scale,oz+loop[0].z*scale);for(const p of loop.slice(1))ctx.lineTo(ox+p.x*scale,oz+p.z*scale);ctx.closePath();}ctx.fillStyle=fill;ctx.fill('evenodd');};
    for(const g of greens)poly(validPoints(g),'#b2c8a2');
    for(const plaza of campus.plazas||[])poly(plaza.points,'#eeeede',plaza.holes||[]);
    for(const area of campus.sportsAreas||[])if(area.sport!=='soccer'&&area.kind!=='track')poly(area.points,area.sport==='fitness'?'#92bad0':area.sport==='bouldering'?'#d6cdbb':'#c99caf');
    ctx.lineCap='round';ctx.lineJoin='round';
    for(const p of paths){const pts=validPoints(p);if(!pts.length)continue;ctx.beginPath();ctx.moveTo(ox+pts[0].x*scale,oz+pts[0].z*scale);for(const q of pts.slice(1))ctx.lineTo(ox+q.x*scale,oz+q.z*scale);ctx.lineWidth=Math.max(1,(p.width||3)*scale);ctx.strokeStyle=p.kind==='track'?'#69acc8':/road|service/i.test(p.kind||'')?'#c0c5bd':'#f9f5e9';ctx.stroke();}
    for(const b of buildings)poly(b.points,/red|lawrence/.test(b.id||'')?'#bc8973':/law/.test(b.id||'')?'#c2ad7e':'#aeb7ac');
    ctx.font='600 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    const labels={'roundhouse':'ROUNDHOUSE','squarehouse':'SQUAREHOUSE','law':'LAW','business-school':'BUSINESS','red-centre-west':'RED CENTRE','village-green':'VILLAGE GREEN'};
    for(const l of landmarks){if(!labels[l.id])continue;const b=buildings.find(b=>b.id===l.id),p=b?b.extent:l;const x=ox+p.x*scale,z=oz+p.z*scale;ctx.strokeStyle='#f6f4e9';ctx.lineWidth=3;ctx.strokeText(labels[l.id],x,z);ctx.fillStyle='#465c50';ctx.fillText(labels[l.id],x,z);}
    ctx.fillStyle='#52675a';ctx.font='600 13px sans-serif';ctx.textAlign='right';ctx.fillText('N ↑',w-18,21);
    drawMinimap();
  }

  function drawMinimap() {
    if(!minimap||!minimapBase||!minimapInfo)return;
    const width=minimap.clientWidth||256,height=minimap.clientHeight||216,dpr=Math.min(window.devicePixelRatio||1,2);
    if(minimap.width!==Math.round(width*dpr)||minimap.height!==Math.round(height*dpr)){minimap.width=Math.round(width*dpr);minimap.height=Math.round(height*dpr);}
    const ctx=minimap.getContext('2d'),{w,h,scale,ox,oz}=minimapInfo;
    ctx.setTransform(minimap.width/w,0,0,minimap.height/h,0,0);ctx.drawImage(minimapBase,0,0);
    for(const c of curiosities){if(found.has(c.id))continue;ctx.beginPath();ctx.arc(ox+c.x*scale,oz+c.z*scale,4.5,0,TAU);ctx.fillStyle='#d99c52';ctx.fill();}
    const x=ox+player.x*scale,z=oz+player.z*scale;
    ctx.save();ctx.translate(x,z);ctx.rotate(player.heading);ctx.beginPath();ctx.moveTo(0,-13);ctx.lineTo(9,9);ctx.lineTo(0,5);ctx.lineTo(-9,9);ctx.closePath();ctx.strokeStyle='#fbf8ed';ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#2c6d62';ctx.fill();ctx.restore();
  }

  function resize() {
    const width=canvas.clientWidth||window.innerWidth,height=canvas.clientHeight||window.innerHeight;
    if(canvas.width!==Math.round(width*renderer.getPixelRatio())||canvas.height!==Math.round(height*renderer.getPixelRatio())) {
      renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
    }
  }

  function frame(now) {
    if(destroyed)return;
    animation=requestAnimationFrame(frame);
    const dt=clamp((now-lastFrame)/1000,0,.04);lastFrame=now;
    if(!paused&&!hidden&&campus){elapsed+=dt;movePlayer(dt);moveBall(dt);}
    for(const c of curiosities){if(found.has(c.id))continue;c.token.rotation.y=elapsed*.7+c.index;c.token.position.y=1.08+Math.sin(elapsed*2+c.index)*.1;}
    updateCamera(dt);resize();renderer.render(scene,camera);
    if(now-reportTime>125){reportTime=now;report();}
  }

  function formTarget(target) { return target?.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName||''); }
  const keyActions={KeyW:'forward',ArrowUp:'forward',KeyS:'backward',ArrowDown:'backward',KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right',ShiftLeft:'sprint',ShiftRight:'sprint'};
  listen(window,'keydown',event=>{
    if(formTarget(event.target)||event.metaKey||event.ctrlKey||event.altKey)return;
    const action=keyActions[event.code];
    if(action){if(!paused){event.preventDefault();setInput(action,true);}return;}
    if(event.code==='Space'){if(!paused)event.preventDefault();if(!event.repeat)jump();}
    else if(event.code==='KeyE'&&!event.repeat)interact();
    else if(event.code==='KeyR'&&!event.repeat)reset();
    else if(event.code==='Escape'&&!event.repeat&&hasStarted&&!document.querySelector('dialog[open]'))setPaused(!paused);
  });
  listen(window,'keyup',event=>{const action=keyActions[event.code];if(action)setInput(action,false);});
  listen(window,'blur',()=>{clearInputs();if(!paused)setPaused(true);});
  listen(document,'visibilitychange',()=>{hidden=document.hidden;clearInputs();lastFrame=performance.now();report();});
  listen(document,'pointerlockchange',()=>{const was=locked;locked=document.pointerLockElement===canvas;if(was&&!locked)clearInputs();report();});
  listen(document,'pointerlockerror',()=>{locked=false;report();});
  listen(canvas,'pointerdown',event=>{
    if(paused||event.button!==0)return;dragging=true;
    if(!locked&&canvas.requestPointerLock){try{const result=canvas.requestPointerLock();if(result?.catch)result.catch(()=>{});}catch{/* Embedded browsers can deny pointer lock; dragging still works. */}}
    if(!locked){try{canvas.setPointerCapture(event.pointerId);}catch{}}
  });
  listen(window,'pointerup',()=>{dragging=false;});
  listen(document,'mousemove',event=>{if(locked||dragging)look(event.movementX,event.movementY);});
  listen(canvas,'contextmenu',event=>event.preventDefault());
  listen(window,'resize',resize);
  const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;observer?.observe(canvas);
  resize();animation=requestAnimationFrame(frame);

  function destroy() {
    destroyed=true;cancelAnimationFrame(animation);clearInputs();observer?.disconnect();for(const remove of listeners)remove();
    if(document.pointerLockElement===canvas)document.exitPointerLock?.();disposeWorld();environmentMap.dispose();skyTexture.dispose();renderer.dispose();
  }

  return{loadCampus,setPaused,reset,teleport,teleportTo,setTime,setInput,look,jump,interact,getState,destroy};
}
