import { ainsworthGeometry, inAinsworthGarden } from './ainsworth-data.js?v=5b2998530615';
import { AINSWORTH_UPPER, AINSWORTH_GROUND, AINSWORTH_ROOFS, AINSWORTH_CANOPY, AINSWORTH_PAVING } from './ainsworth-parts.js?v=5b2998530615';
import { mathewsGeometry, inMathewsForecourt } from './mathews-data.js?v=5b2998530615';
import { MATHEWS_ROOFS, MATHEWS_LOWER, MATHEWS_TOWER, MATHEWS_ENTRY_FLOOR, MATHEWS_PODIUM_FACES } from './mathews-parts.js?v=5b2998530615';
import { libraryGeometry, libraryFacadeRing } from './library-data.js?v=5b2998530615';
import { tyreeGeometry, inTyreeForecourt, TYREE_REPLACED_STEPS } from './tyree-data.js?v=5b2998530615';
import { TYREE_PARTS, TYREE_ROOFS, TYREE_PLATFORM, TYREE_STEPS, TYREE_APRON } from './tyree-parts.js?v=5b2998530615';
import { blockhouseGeometry, inBlockhouseForecourt } from './blockhouse-data.js?v=5b2998530615';
import { BLOCKHOUSE_PARTS, BLOCKHOUSE_ROOFS, BLOCKHOUSE_AWNING, BLOCKHOUSE_PAVING } from './blockhouse-parts.js?v=5b2998530615';
import { morvenGeometry, inMorvenCourt } from './morven-brown-data.js?v=5b2998530615';
import { MORVEN_PARTS, MORVEN_PAVING } from './morven-brown-parts.js?v=5b2998530615';
import { squarehouseGeometry } from './squarehouse-data.js?v=5b2998530615';
import { SQUAREHOUSE_PARTS } from './squarehouse-parts.js?v=5b2998530615';
import { redCentreGeometry, inLawrenceForecourt } from './red-centre-data.js?v=5b2998530615';
import { RED_CENTRE_PARTS, RED_CENTRE_ROOFS, RED_CENTRE_PAVING } from './red-centre-parts.js?v=5b2998530615';
import { oldMainGeometry } from './old-main-data.js?v=5b2998530615';
import { businessGeometry, businessCanopyFaces } from './business-data.js?v=5b2998530615';
import { lawGeometry } from './law-data.js?v=5b2998530615';
import { BASSER_STEP_IDS, BASSER_REMOVED_TRIANGLES, BASSER_GROUND_EDGES } from './basser-ground-parts.js?v=5b2998530615';
import { quadrangleGeometry } from './quadrangle-data.js?v=5b2998530615';
import { QUADRANGLE_PARTS } from './quadrangle-parts.js?v=5b2998530615';
import { ELECTRICAL_LANDSCAPE as electricalGround, campusTerrainHeight as terrainHeight, inElectricalCourt, courtGround, ELECTRICAL_REPLACED_STEPS } from './electrical-landscape.js?v=5b2998530615';
import { ELECTRICAL_REMOVED_TRIANGLES, ELECTRICAL_GROUND_EDGES } from './electrical-landscape-parts.js?v=5b2998530615';
import { electricalGeometry, ELECTRICAL_LEVELS } from './electrical-data.js?v=5b2998530615';
import { REX_LINK_ID, rexGeometry, sdnGeometry } from './small-buildings-data.js?v=5b2998530615';
import { BARKER_APARTMENTS_PARTS } from './barker-apartments-parts.js?v=5b2998530615';
import { barkerApartmentsGeometry } from './barker-apartments-data.js?v=5b2998530615';
import { vallentineGeometry } from './vallentine-data.js?v=5b2998530615';
import { parkingGeometry, parkingEntry, parkingCars } from './parking-data.js?v=5b2998530615';
import { esmeGeometry, scienceLabGeometry, scienceLinks } from './science-precinct-data.js?v=5b2998530615';
import { poolGeometry, gymGeometry } from './aquatic-data.js?v=5b2998530615';
import { newtonGeometry, keithGeometry, physicsGeometry } from './physics-precinct-data.js?v=5b2998530615';
import { k17Geometry, willisGeometry } from './engineering-lane-data.js?v=5b2998530615';
import { RUPERT_ID, rupertGeometry } from './rupert-data.js?v=5b2998530615';
import { RUPERT_PARTS } from './rupert-parts.js?v=5b2998530615';
import * as THREE from './vendor/three.module.js?v=5b2998530615';
import { terrainHeight as demHeight, buildingBase, TERRAIN_GRID } from './terrain.js?v=5b2998530615';
import { buildingAppearance } from './visual-data.js?v=5b2998530615';
import { CAMPUS_DETAILS } from './campus-details.js?v=5b2998530615';
import { VILLAGE_SPORTS } from './sports-data.js?v=5b2998530615';
import { theatreGeometry, newCollegeRoof } from './architecture-data.js?v=5b2998530615';
import { NIDA_PARTS } from './nida-parts.js?v=5b2998530615';
import { CHEMICAL_PARTS } from './chemical-parts.js?v=5b2998530615';
import { tubeFaces } from './structure-data.js?v=5b2998530615';
import { clancyGeometry, chancelleryGeometry } from './upper-campus-data.js?v=5b2998530615';
import { CHANCELLERY_ROOFS } from './chancellery-roofs.js?v=5b2998530615';
import { bioscienceGeometry, mathewsTheatreGeometry } from './bioscience-data.js?v=5b2998530615';
import { BIOSCIENCE_PARTS } from './bioscience-parts.js?v=5b2998530615';
import { medicalGeometry } from './medical-data.js?v=5b2998530615';
import { sirfGeometry, agsmGeometry } from './eastern-landmarks-data.js?v=5b2998530615';
import { civilGeometry, patriciaGeometry, lectureFacadeRing } from './lecture-precinct-data.js?v=5b2998530615';
import { samuelsGeometry, goodsellGeometry } from './eastern-faculty-data.js?v=5b2998530615';
import { MEDICAL_PARTS, MEDICAL_GROUND_FLOORS } from './medical-parts.js?v=5b2998530615';
import { RESIDENTIAL_PARTS } from './residential-parts.js?v=5b2998530615';
import { heritageGeometry, whiteHouseStair, goldsteinGeometry } from './heritage-data.js?v=5b2998530615';
import { scienceTheatreGeometry, modernFacadeFrame, scienceTheatreFoundation, websterTheatresGeometry } from './modernism-data.js?v=5b2998530615';
import { orientedFrame, framePoint, frameRectangle, roundedFrameRectangle, clipFrameStrip } from './geometry.js?v=5b2998530615';

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
    // Local face UVs keep vertical masonry / concrete surfaces from sampling
    // a single horizontal texture row and stretching it into vertical stripes.
    const uw=width/2,uh=height/2,ud=depth/2;
    this.quad(a,e,c,b,color,[[0,0],[0,uh],[uw,uh],[uw,0]]);
    this.quad(f,g,i,j,color,[[0,0],[uw,0],[uw,uh],[0,uh]]);
    this.quad(a,f,j,e,color,[[0,0],[ud,0],[ud,uh],[0,uh]]);
    this.quad(b,c,i,g,color,[[0,0],[0,uh],[ud,uh],[ud,0]]);
    this.quad(e,j,i,c,color,[[0,0],[0,ud],[uw,ud],[uw,0]]);
    this.quad(a,b,g,f,color,[[0,0],[uw,0],[uw,ud],[0,ud]]);
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

function polygon(batch, points, y, color, holes = [], down = false) {
  if (points.length < 3) return;
  const contour = points.map(p => new THREE.Vector2(p.x, p.z));
  const holeContours = holes.map(hole => hole.map(p => new THREE.Vector2(p.x, p.z)));
  const allPoints = [...points, ...holes.flat()];
  for (const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour, holeContours)) {
    const vertices = (down?[a,b,c]:[a,c,b]).map(i=>[allPoints[i].x,y,allPoints[i].z]);
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

function shapedRoof(batch,points,heightAt,color,holes=[]){
  const contour=points.map(p=>new THREE.Vector2(p.x,p.z)),holeContours=holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z))),all=[...points,...holes.flat()];
  const triangle=(a,b,c)=>{
    if(Math.max(distance2(a,b),distance2(b,c),distance2(c,a))>.65){
      const ab={x:(a.x+b.x)/2,z:(a.z+b.z)/2},bc={x:(b.x+c.x)/2,z:(b.z+c.z)/2},ca={x:(c.x+a.x)/2,z:(c.z+a.z)/2};
      triangle(a,ab,ca);triangle(ab,b,bc);triangle(ca,bc,c);triangle(ab,bc,ca);return;
    }
    batch.triangle(...[a,b,c].map(p=>[p.x,heightAt(p),p.z]),color);
  };
  for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour,holeContours))triangle(all[a],all[c],all[b]);
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
    if(inElectricalCourt(x,z))return courtGround(x,z)+.22;
    for(const s of stairSegments){
      const q=nearestOnSegment(x,z,s.a,s.b);
      if(Math.hypot(x-q.x,z-q.z)<=s.width/2+.04){
        return s.h0+(s.h1-s.h0)*(s.continuous?q.t:Math.floor(q.t*s.count)/s.count)+.06;
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
    for(let i=0;i<groundVertices.count;i++)groundVertices.setY(i,demHeight(groundVertices.getX(i),groundVertices.getZ(i))-.08);
    // Exact clipped DEM boundaries avoid stretching coarse terrain triangles
    // across the reconstructed court and through the visible bleacher floors.
    const removed=new Set([...ELECTRICAL_REMOVED_TRIANGLES,...BASSER_REMOVED_TRIANGLES].map(([col,row,i])=>((row+pad)*gx+col+pad)*2+i));
    const oldIndex=groundGeo.index.array,kept=[];
    for(let triangle=0;triangle<oldIndex.length/3;triangle++)if(!removed.has(triangle))kept.push(...oldIndex.subarray(triangle*3,triangle*3+3));
    groundGeo.setIndex(kept);groundGeo.computeVertexNormals();
    const groundTexture=surfaceTexture('grass');groundTexture.repeat.set(280,190);
    const ground = new THREE.Mesh(groundGeo,style('#82916b',{map:groundTexture,flatShading:false}));
    ground.receiveShadow=true; world.add(ground);
    const groundEdges=new Batch();groundEdges.base=0;
    for(const part of [...ELECTRICAL_GROUND_EDGES,...BASSER_GROUND_EDGES]){
      const all=[...part.points,...part.holes.flat()],contour=part.points.map(p=>new THREE.Vector2(p.x,p.z)),holes=part.holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z)));
      for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour,holes))groundEdges.triangle(...[a,c,b].map(i=>[all[i].x,demHeight(all[i].x,all[i].z)-.08,all[i].z]),'#82916b');
    }
    world.add(groundEdges.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')}),false));
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
      const road=path.renderSurface==='asphalt'||path.renderSurface!=='paving'&&/road|service|residential|street/i.test(path.kind || path.type || '');
      const width=path.renderWidth || path.width || (/mall/i.test(path.name||'')?12:road?7:3.4);
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
        if(BASSER_STEP_IDS.includes(s.pathId)){
          for(const side of [-1,1]){
            const a=p(t,side,h),b=p(u,side,h),lo=Math.min(h,terrainHeight(a[0],a[2]),terrainHeight(b[0],b[2]))-.2,ha=Math.max(h,terrainHeight(a[0],a[2])+.02),hb=Math.max(h,terrainHeight(b[0],b[2])+.02),v=[[a[0],lo,a[2]],[a[0],ha,a[2]],[b[0],hb,b[2]],[b[0],lo,b[2]]];
            stairs.quad(...(side<0?v:v.reverse()),'#a8ad9c');
          }
          if(i===0||i===s.count-1){const v=i===0?t:u,lo=Math.min(h,s.h0,s.h1)-.15,a=p(v,1,h),b=p(v,-1,h),face=[[a[0],lo,a[2]],[a[0],h,a[2]],[b[0],h,b[2]],[b[0],lo,b[2]]];stairs.quad(...(i===0?face:face.reverse()),'#a6ad9b');}
        }
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
    // Static local probes update after loading or a lighting change;
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

  function ainsworthBuilding(b){
    const g=ainsworthGeometry(b),f=g.frame,brick=new Batch(),concrete=new Batch(),metal=new Batch(),officeGlass=new Batch(),lowerGlass=new Batch(),northGlass=new Batch(),clay=new Batch(),roof=new Batch(),cover=new Batch(),floor=new Batch(),red=new Batch(),garden=new Batch(),lattice=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    for(const batch of [brick,concrete,metal,officeGlass,lowerGlass,northGlass,clay,roof,cover,floor,red,garden,lattice])batch.base=0;
    const ordered=(points,hole=false)=>(polygonArea(points)>0)!==hole?points:[...points].reverse();
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    for(const part of AINSWORTH_GROUND){
      if(part.kind==='arcade'){
        polygon(cover,part.points,g.soffitRL,'#d3d7c6',part.holes,true);
        groundPatches.push({points:part.points,heightAt:(x,z)=>g.floorAt({x,z})});continue;
      }
      // A simple floor behind the closed glazing keeps the outdoor terrain
      // from appearing as lawn inside the visible foyer / theatre envelope.
      shapedRoof(floor,part.points,g.floorAt,'#a5ad9b',part.holes);
      const glazingBatch=part.kind==='north'?northGlass:lowerGlass;
      for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.15)continue;
        const la=g.local(a),lc=g.local(c),p=(t,y,off=0)=>{const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;return [a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];};
        const lower=g.base-.25;
        if(part.kind==='south'&&Math.abs(lc.v-la.v)>15){
          const t0=(-5.6-la.v)/(lc.v-la.v),t1=(25.3-la.v)/(lc.v-la.v),l=Math.max(0,Math.min(t0,t1)),r=Math.min(1,Math.max(t0,t1));
          if(l>0)wallPanel(brick,a,c,lower,g.soffitRL,'#a88966',0,0,l);if(r<1)wallPanel(brick,a,c,lower,g.soffitRL,'#a88966',0,r,1);
          if(r>l)wallPanel(glazingBatch,a,c,lower,g.soffitRL,'#a7c0b1',.055,l,r);
        }else wallPanel(glazingBatch,a,c,lower,g.soffitRL,'#729487',.055);
        for(let d=.15;d<len;d+=2.0)batchBeam(metal,p(d/len,lower,.09),p(d/len,g.soffitRL,.09),.07,'#465e58');
        for(const y of [36.6,40.35])wallPanel(metal,a,c,y,y+.1,'#50665b',.11);
      }}
      addCollider({points:part.points,holes:part.holes,base:0,bottom:g.base-1,top:g.soffitRL});
    }
    addCollider({points:b.points,holes:b.holes,base:0,bottom:g.soffitRL,top:g.bodyRoofRL});
    const palette=['#bd8966','#c7956e','#d2ab82','#af7857','#d9b98a','#c48e67','#b97e5b','#cfaa7f'];
    for(const part of AINSWORTH_UPPER){
      const ring=ordered(part.points);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.15)continue;
        const la=g.local(a),lc=g.local(c),du=lc.u-la.u,dv=lc.v-la.v,n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
        const north=part.kind==='north'&&n.x*f.v.x+n.z*f.v.z<-.7,screen=part.kind==='south'&&Math.abs(dv)>20;
        wallPanel(brick,a,c,g.soffitRL,g.bodyRoofRL,part.kind==='north'?'#b3946b':'#a48664');
        if(screen){
          const tv=v=>(v-la.v)/dv,l=Math.max(0,Math.min(tv(-5.6),tv(25.3))),r=Math.min(1,Math.max(tv(-5.6),tv(25.3)));
          if(r>l){
            wallPanel(officeGlass,a,c,g.screenBottomRL,g.bodyRoofRL-.2,'#3f5b55',.04,l,r);
            const count=Math.max(1,Math.round((r-l)*len/1.4));
            for(const [floor,row] of g.rows.entries()){
              wallPanel(metal,a,c,row.low-.16,row.low-.035,'#a5afa2',1.06,l,r);
              for(let k=0;k<count;k++){
                const t0=l+(r-l)*(k+.025)/count,t1=l+(r-l)*(k+.82)/count,t2=l+(r-l)*(k+.88)/count,tiles=Math.ceil((row.high-row.low)/.2);
                for(let j=0;j<tiles;j++){
                  const low=row.low+j*(row.high-row.low)/tiles,high=row.low+(j+1)*(row.high-row.low)/tiles-.012,color=palette[(j+floor*2+(k%3===0?1:0))%palette.length];
                  clay.quad(p(t0,low,.22),p(t0,high,.22),p(t1,high,.92),p(t1,low,.92),color);
                  clay.quad(p(t1,low,.92),p(t1,high,.92),p(t2,high,.22),p(t2,low,.22),color);
                }
                batchBeam(metal,p(t2,row.low,.24),p(t2,row.high,.24),.035,'#687b70');
              }
            }
          }
        }else{
          const bays=north?g.northBays:Array.from({length:Math.max(1,Math.round(len/5.8))},(_,k)=>({l:(k+.12)/Math.max(1,Math.round(len/5.8)),r:(k+.88)/Math.max(1,Math.round(len/5.8))}));
          for(const bay of bays){
            let l=bay.l,r=bay.r;
            if(north){const left=Math.max(Math.min(la.u,lc.u),bay.left),right=Math.min(Math.max(la.u,lc.u),bay.right);if(right-left<.15)continue;const t0=(left-la.u)/du,t1=(right-la.u)/du;l=Math.min(t0,t1);r=Math.max(t0,t1);}
            for(const row of g.rows){
              wallPanel(concrete,a,c,row.low,row.low+.95,'#7e8c7b',.045,l,r);
              for(let y=row.low+.12;y<row.low+.95;y+=.16)wallPanel(metal,a,c,y,y+.014,'#a2ad98',.06,l,r);
              wallPanel(officeGlass,a,c,row.low+1.0,row.high-.1,'#4e6d68',.07,l,r);
              wallPanel(metal,a,c,row.low+.94,row.low+1.0,'#c5d0bd',.15,l,r);wallPanel(metal,a,c,row.high-.1,row.high,'#c7d1bf',.15,l,r);
              for(let k=0;k<=4;k++){const t=l+(r-l)*k/4;batchBeam(metal,p(t,row.low,.15),p(t,row.high,.15),.065,'#c9d2c0');}
              wallPanel(metal,a,c,row.low+1.75,row.low+1.8,'#c8d2bf',.15,l,r);
            }
          }
          if(north){
            const tu=u=>(u-la.u)/du,l=Math.max(0,Math.min(tu(1),tu(7))),r=Math.min(1,Math.max(tu(1),tu(7)));
            if(r>l){
              wallPanel(concrete,a,c,g.screenBottomRL,g.bodyRoofRL-.25,'#697a6d',.05,l,r);
              lattice.quad(p(l,g.screenBottomRL,.18),p(l,g.bodyRoofRL-.25,.18),p(r,g.bodyRoofRL-.25,.18),p(r,g.screenBottomRL,.18),'#ffffff',[[0,0],[0,(g.bodyRoofRL-.25-g.screenBottomRL)/.24],[(r-l)*len/.24,(g.bodyRoofRL-.25-g.screenBottomRL)/.24],[(r-l)*len/.24,0]]);
              for(const row of g.rows)wallPanel(concrete,a,c,row.low,row.low+.1,'#d0d6c4',.2,l,r);
              for(const t of [l,r])batchBeam(concrete,p(t,g.screenBottomRL,.18),p(t,g.bodyRoofRL,.18),.2,'#d4dac9');
            }
          }
        }
      }
    }
    for(const part of AINSWORTH_ROOFS){
      polygon(roof,part.points,part.rl,'#8f9b89',part.holes);
      if(['plant','lift'].includes(part.kind)){
        const ring=ordered(part.points);for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(metal,a,c,g.bodyRoofRL,part.rl,'#737f75');
          for(let y=g.bodyRoofRL+.15;y<part.rl;y+=.22)wallPanel(metal,a,c,y,y+.045,'#a5b0a0',.045);
          for(let d=.4;d<len;d+=1.5)wallPanel(metal,a,c,g.bodyRoofRL,part.rl,'#b6c0ac',.075,d/len,Math.min(1,(d+.035)/len));
        }
        addCollider({points:part.points,holes:part.holes,base:0,bottom:g.bodyRoofRL,top:part.rl});
      }
    }
    // The old north wing retains its gently scalloped / raked white cornice.
    for(let i=0;i<28;i++){
      const u0=-22+i*44/28,u1=-22+(i+1)*44/28,va=-30.15+Math.abs(Math.sin(i*Math.PI/2))*.28,vb=-30.15+Math.abs(Math.sin((i+1)*Math.PI/2))*.28;
      cover.quad(at(u0,-28.9,g.bodyRoofRL),at(u0,va,g.bodyRoofRL+.08),at(u1,vb,g.bodyRoofRL+.08),at(u1,-28.9,g.bodyRoofRL),'#dbe0cb');
      cover.quad(at(u0,va,g.bodyRoofRL-.17),at(u0,va,g.bodyRoofRL+.08),at(u1,vb,g.bodyRoofRL+.08),at(u1,vb,g.bodyRoofRL-.17),'#d0d8c2');
    }
    for(const part of AINSWORTH_CANOPY){shapedRoof(cover,part.points,g.canopy.heightAt,'#d5dcc7',part.holes);shapedRoof(cover,part.points,p=>g.canopy.heightAt(p)-.22,'#c8d3bb',part.holes);addCollider({points:part.points,holes:part.holes,base:0,bottom:g.soffitRL,top:41.02});}
    for(const part of AINSWORTH_PAVING)shapedRoof(floor,part.points,g.floorAt,'#a1a692',part.holes);
    groundPatches.push({points:g.canopy.points,heightAt:(x,z)=>g.floorAt({x,z})});
    for(const col of g.columns){const ground=terrainHeight(col.x,col.z);batchPipe(concrete,[col.x,ground,col.z],[col.x,g.soffitRL,col.z],col.radius,'#d6ddc9');addCollider({x:col.x,z:col.z,radius:col.radius,base:0,bottom:ground,top:g.soffitRL});}
    const theatre=Array.from({length:64},(_,i)=>({x:g.theatre.center.x+Math.cos(i*TAU/64)*g.theatre.radius,z:g.theatre.center.z+Math.sin(i*TAU/64)*g.theatre.radius}));
    for(let i=0;i<theatre.length;i++)wallPanel(red,theatre[i],theatre[(i+1)%theatre.length],g.theatre.bottomRL,g.theatre.topRL,i%8===0?'#bb3829':'#d53b2b');polygon(red,theatre,g.theatre.topRL,'#d95236');
    for(const bed of g.beds){shapedRoof(garden,bed.points,p=>terrainHeight(p.x,p.z)+.08,'#74684e');const local=bed.points.map(g.local),minV=Math.min(...local.map(p=>p.v)),maxV=Math.max(...local.map(p=>p.v));for(let v=minV+.3;v<maxV;v+=.65){const p=framePoint(f,1.17,v),y=terrainHeight(p.x,p.z);garden.box(p.x,y+.27,p.z,.4,.4,.45,'#6f8954',v);}}
    const tex=canvasTexture(1024,512,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#e4e4d7';ctx.textAlign='center';ctx.font='normal 155px Georgia';ctx.fillText('Ainsworth',w/2,235);ctx.font='52px sans-serif';ctx.fillText('BUILDING',w/2,330);});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(2.7,1.35),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false})),sp=framePoint(f,1.65,-6.5);sign.position.set(sp.x,37.8,sp.z);sign.rotation.y=Math.atan2(-f.u.x,-f.u.z);world.add(sign);
    const holes=canvasTexture(128,128,ctx=>{ctx.fillStyle='#d5dbcd';ctx.fillRect(0,0,128,128);ctx.globalCompositeOperation='destination-out';for(const [x,y]of [[42,42],[86,42],[42,86],[86,86]]){ctx.beginPath();ctx.moveTo(x,y-13);ctx.lineTo(x+11,y);ctx.lineTo(x,y+13);ctx.lineTo(x-11,y);ctx.closePath();ctx.fill();}});holes.wrapS=holes.wrapT=THREE.RepeatWrapping;
    const brickTex=clinkerTexture(),concreteTex=surfaceTexture('concrete');brickTex.wrapS=brickTex.wrapT=THREE.RepeatWrapping;brickTex.anisotropy=8;
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:brickTex,bumpMap:brickTex,bumpScale:.025})),concrete.mesh(style('#ffffff',{vertexColors:true,map:concreteTex,bumpMap:concreteTex,bumpScale:.02})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.25})),clay.mesh(style('#ffffff',{vertexColors:true})),officeGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.18,metalness:.45})),roof.mesh(style('#ffffff',{vertexColors:true})),cover.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),red.mesh(style('#ffffff',{vertexColors:true,roughness:.45})),garden.mesh(style('#ffffff',{vertexColors:true})),lattice.mesh(style('#ffffff',{vertexColors:true,map:holes,alphaTest:.5,side:THREE.DoubleSide})));
    const glazing=lowerGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide,roughness:.06,metalness:.28,envMapIntensity:.65}));world.add(glazing);medicalReflection(glazing,framePoint(f,-2,8),37.2);
    const northGlazing=northGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.055,metalness:.75,envMapIntensity:1.1}));world.add(northGlazing);medicalReflection(northGlazing,framePoint(f,4,-33),37.2);
  }

  function mathewsBuilding(b,concrete,glass,detail,roofs){
    const g=mathewsGeometry(b),f=g.frame,soffit=new Batch(),entryGlass=new Batch(),garden=new Batch(),fronds=new Batch(),floor=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    soffit.base=entryGlass.base=b.base;garden.base=fronds.base=floor.base=0;
    const ordered=(points,hole=false)=>(polygonArea(points)>0)!==hole?points:[...points].reverse();
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    // Only the photographed entrance recess opens the retained lower outline.
    for(const part of MATHEWS_LOWER){
      if(part.kind==='ground')for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++)wallPanel(concrete,ring[i],ring[(i+1)%ring.length],0,g.entry.ceiling,'#647775');}
      else{
        polygon(soffit,part.points,g.entry.ceiling,'#3d4940',part.holes,true);
        groundPatches.push({points:part.points,heightAt:(x,z)=>g.entryFloor({x,z})});
      }
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:part.bottom,top:g.entry.ceiling});
    }
    addCollider({points:b.points,holes:b.holes,base:b.base,bottom:g.entry.ceiling,top:g.podiumHeight});
    for(const part of MATHEWS_ENTRY_FLOOR)shapedRoof(floor,part.points,g.entryFloor,'#9ca08a',part.holes);
    groundPatches.push({points:g.entryApron,heightAt:(x,z)=>g.entryFloor({x,z})});
    for(const {a,c} of MATHEWS_PODIUM_FACES){
      const len=distance2(a,c);if(len<.2)continue;
      const la=g.local(a),lc=g.local(c),mid={u:(la.u+lc.u)/2,v:(la.v+lc.v)/2},n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
      const p=(d,y,off=0)=>[a.x+(c.x-a.x)*d/len+n.x*off,y,a.z+(c.z-a.z)*d/len+n.z*off];
      wallPanel(concrete,a,c,g.entry.ceiling,g.podiumHeight,'#a9b0a0');
      if(len<1.3)continue;
      // Fine horizontal courses and deep blue-grey structural piers follow
      // the public Library Walk photograph; they are not generic glazing bands.
      for(let y=g.entry.ceiling+.12;y<g.podiumHeight;y+=.16)wallPanel(detail,a,c,y,y+.012,'#919e90',.024);
      const bays=Math.max(1,Math.round(len/7.1)),pitch=len/bays;
      for(let k=0;k<bays;k++){
        const l=(k*pitch+.55)/len,r=((k+1)*pitch-.55)/len;
        for(const row of g.podiumRows){
          wallPanel(glass,a,c,row.low,row.high,'#4d6561',.075,l,r);
          wallPanel(detail,a,c,row.high,row.high+.18,'#6e7d72',.18,l,r);
          for(let j=0;j<=6;j++){const d=(k*pitch+.55)+(pitch-1.1)*j/6;batchBeam(detail,p(d,row.low,.12),p(d,row.high,.12),.065,'#758478');}
          wallPanel(detail,a,c,row.low+.8,row.low+.85,'#87998a',.14,l,r);
        }
        const d=k*pitch,foot=p(d,0,.33),low=inPolygon(foot[0],foot[2],g.entry.points)?g.entry.ceiling:.1;
        // A source vertex falls at the entrance centre. The upper structural
        // pier stops at its soffit instead of growing through the open recess.
        batchBeam(detail,p(d,low,.33),p(d,g.podiumHeight,.18),.52,'#718681');
        addCollider({x:foot[0],z:foot[2],radius:.27,base:b.base,bottom:low,top:g.podiumHeight});
        if(mid.v>23&&len>20){
          wallPanel(detail,a,c,1.8,5.1,k%3?'#5d6c60':'#3c524b',.045,Math.max(0,l+.015),Math.min(1,r-.015));
          if(k%3)for(let y=1.9;y<5.1;y+=.17)wallPanel(detail,a,c,y,y+.035,'#84917d',.08,Math.max(0,l+.015),Math.min(1,r-.015));
        }
      }
      wallPanel(detail,a,c,g.podiumHeight-.2,g.podiumHeight,'#c4cbb6',.18);
    }
    // A distinct, narrow, set-back tower replaces the former tall L-shaped slab.
    for(const part of MATHEWS_TOWER){
      const ring=ordered(part.points);
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.podiumHeight,top:g.tower.top});
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const la=g.local(a),lc=g.local(c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
        wallPanel(concrete,a,c,0,g.tower.top,'#c3b494',.035);
        for(let y=3.5;y<g.tower.top;y+=3.35)wallPanel(detail,a,c,y,y+.025,'#abac94',.075);
        if(Math.abs(lc.u-la.u)>4){
          const minU=Math.min(la.u,lc.u),maxU=Math.max(la.u,lc.u),tu=u=>(u-la.u)/(lc.u-la.u);
          for(const bay of g.towerBays){
            const left=Math.max(minU,bay.left),right=Math.min(maxU,bay.right);if(right-left<.1)continue;
            const l=Math.min(tu(left),tu(right)),r=Math.max(tu(left),tu(right));
            for(const [j,row] of g.towerRows.entries()){
              wallPanel(glass,a,c,row.low,row.high,j%3===0?'#4b5d50':'#3e5149',.105,l,r);
              wallPanel(detail,a,c,row.low-.12,row.low,'#9b9e83',.45,l,r);
              wallPanel(detail,a,c,row.high,row.high+.1,'#a9ad92',.45,l,r);
              for(let u=left+.8;u<right;u+=1.1)batchBeam(detail,p(tu(u),row.low,.14),p(tu(u),row.high,.14),.045,'#829181');
            }
            for(const u of [bay.left-.3,bay.right+.3])if(u>=minU-.01&&u<=maxU+.01)batchBeam(detail,p(tu(u),3.4,.35),p(tu(u),g.tower.top,.35),.48,'#d0c5a6');
          }
        }else if(len>8){
          for(const row of g.towerRows){wallPanel(glass,a,c,row.low,row.high,'#40564b',.105,.33,.67);wallPanel(detail,a,c,row.low-.1,row.low,'#a3a58c',.3,.33,.67);}
          for(const t of [.3,.7])batchBeam(detail,p(t,0,.15),p(t,g.tower.top,.15),.08,'#a6ac94');
        }
        wallPanel(detail,a,c,g.tower.top-.2,g.tower.top,'#c4bea1',.18);
      }
    }
    for(const part of MATHEWS_ROOFS){
      polygon(roofs,part.points,part.height,part.kind==='teaching-podium'?'#8c9688':'#8d9485',part.holes);
      if(part.kind==='plant'){
        const ring=ordered(part.points);for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(concrete,a,c,g.tower.top,part.height,'#b5b39b');
          for(let d=2;d<len;d+=3.2)wallPanel(detail,a,c,g.tower.top,part.height,'#9b9f89',.035,d/len,(d+.03)/len);
        }
        addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.tower.top,top:part.height});
      }
    }
    // Set-back glass, turquoise infill, dark soffit and lights at the western entry.
    const e0=framePoint(f,-36.5,.95),e1=framePoint(f,-36.5,-5.55),ground=g.entryFloor(framePoint(f,-37,-2.3))-b.base;
    wallPanel(entryGlass,e0,e1,ground,g.entry.ceiling-.12,'#466b62',.07);
    wallPanel(detail,e0,e1,ground+.12,g.entry.ceiling-.2,'#4d9290',.12,0,.45);
    for(const v of [-5.3,-3.7,-2.1,-.5,.8])box(detail,-36.67,v,(ground+g.entry.ceiling)/2,.075,g.entry.ceiling-ground,.065,'#566d5d');
    box(detail,-38.55,-2.3,g.entry.ceiling+.1,.3,.35,7.9,'#7d8b78');
    for(const post of g.entry.posts){const bottom=terrainHeight(post.x,post.z)-b.base,top=bottom+3.55;box(detail,post.u,post.v,(bottom+top)/2,.14,top-bottom,.2,'#91a58a');addCollider({x:post.x,z:post.z,radius:.1,base:b.base,top});}
    for(const v of [-4.8,-2.3,.2]){const p=framePoint(f,-37.7,v),ring=Array.from({length:16},(_,i)=>({x:p.x+Math.cos(i*TAU/16)*.15,z:p.z+Math.sin(i*TAU/16)*.15}));polygon(soffit,ring,g.entry.ceiling-.015,'#ebe8c9',[],true);}
    facadeCaption(b,framePoint(f,-38.9,-5.4),framePoint(f,-38.9,-6.2),'Mathews · F23',1.0,ground+2.3,'#e2ddbd');
    // Cordyline / palm forms and stone-edged planted beds from the south photo.
    for(const bed of g.planters){
      const ring=ordered(bed.points);shapedRoof(garden,ring,p=>terrainHeight(p.x,p.z)+bed.height,'#7d855e');
      for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length],ha=terrainHeight(a.x,a.z),hc=terrainHeight(c.x,c.z);garden.quad([a.x,ha,a.z],[a.x,ha+bed.height,a.z],[c.x,hc+bed.height,c.z],[c.x,hc,c.z],'#9e9c7d');}
      addCollider({points:bed.points,base:0,top:bed.height,terrainOffset:bed.height});
    }
    for(const tree of g.palms){
      const bottom=terrainHeight(tree.x,tree.z)+.58,top=bottom+tree.height;
      batchPipe(garden,[tree.x,bottom,tree.z],[tree.x+.08,top,tree.z],.15,'#918970');
      for(let j=0;j<20;j++){
        const a=j*TAU/20,reach=j%3===0?1.4:2.0,level=top+(j%3)*.18,co=Math.cos(a),si=Math.sin(a),cross={x:-si*.18,z:co*.18};
        const root=[tree.x,level,tree.z],mid=[tree.x+co*reach*.55,level+.38,tree.z+si*reach*.55],tip=[tree.x+co*reach,level-.8,tree.z+si*reach];
        fronds.quad(root,[mid[0]+cross.x,mid[1],mid[2]+cross.z],tip,[mid[0]-cross.x,mid[1],mid[2]-cross.z],j%2?'#65834d':'#8d9b60');
      }
      addCollider({x:tree.x,z:tree.z,radius:.2,base:0,bottom,top});
    }
    world.add(soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),garden.mesh(style('#ffffff',{vertexColors:true})),fronds.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    const glazing=entryGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.055,metalness:.7,envMapIntensity:1.25}));world.add(glazing);medicalReflection(glazing,framePoint(f,-41,-2.3),g.base+3.2);
  }

  function libraryBuilding(b,concrete,brick,glass,detail,roofs){
    const g=libraryGeometry(b),f=g.frame,metal=new Batch(),cover=new Batch(),entryGlass=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    metal.base=cover.base=entryGlass.base=b.base;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    const ordered=points=>polygonArea(points)>0?points:[...points].reverse();
    // Exact mapped outlines are used for roofs and collision. The former
    // single tall parent collider incorrectly extended above the low wings.
    polygon(roofs,b.points,5.6,'#96998c',b.holes||[]);
    const plinth=ordered(b.points);
    for(let i=0;i<plinth.length;i++)wallPanel(concrete,plinth[i],plinth[(i+1)%plinth.length],0,5.6,'#a4a99b');
    addCollider({points:b.points,holes:b.holes||[],base:b.base,top:5.6});
    for(const part of g.parts){
      const tower=part.id===g.tower.id,height=part.height,ring=ordered(libraryFacadeRing(part.points));
      polygon(roofs,part.points,height,tower?'#777c75':'#92998a');
      addCollider({points:part.points,base:b.base,top:height});
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const la=g.local(a),lc=g.local(c),mid={u:(la.u+lc.u)/2,v:(la.v+lc.v)/2},n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        const point=(d,y,offset=0)=>[a.x+(c.x-a.x)*d/len+n.x*offset,y,a.z+(c.z-a.z)*d/len+n.z*offset];
        const beam=(d,low,high,size,color,offset=.4)=>batchBeam(detail,point(d,low,offset),point(d,high,offset),size,color);
        wallPanel(tower?concrete:brick,a,c,0,height,tower?'#b8b7a9':'#85775f');
        if(tower){
          const west=mid.u<-12&&Math.abs(lc.v-la.v)>5;
          if(west){
            // The Scientia face is mostly blank concrete, with one deep slot.
            for(let y=3;y<g.fasciaBottom;y+=4.16)wallPanel(detail,a,c,y,y+.025,'#92988b',.025);
            for(let d=4;d<len;d+=5.8)beam(d,0,g.fasciaBottom,.035,'#979e90',.045);
            if(Math.min(la.v,lc.v)<-1&&Math.max(la.v,lc.v)>-1){
              const t=(-1-la.v)/(lc.v-la.v),start=Math.max(0,t-1.65/len),end=Math.min(1,t+1.65/len);
              for(const row of g.slotRows){
                wallPanel(glass,a,c,row.low,row.high,'#344946',.075,start,end);
                wallPanel(detail,a,c,row.low-.18,row.low,'#868e80',.5,start,end);
              }
              beam(t*len-1.95,.4,g.fasciaBottom,.35,'#c0c0b0');beam(t*len+1.95,.4,g.fasciaBottom,.35,'#c0c0b0');
            }
          }else if(len>25){
            const start=mid.v<-10?1.0:2.0,end=len-(mid.v<-10?7.0:1.0),count=4,pitch=(end-start)/count;
            for(let k=0;k<count;k++){
              const d0=start+k*pitch+.35,d1=start+(k+1)*pitch-.35;
              for(const [j,row] of g.northRows.entries()){
                wallPanel(glass,a,c,row.low,row.high,j%3===0?'#40564f':'#4e5f53',.065,d0/len,d1/len);
                wallPanel(detail,a,c,row.low-.25,row.low,'#929984',.5,d0/len,d1/len);
                wallPanel(detail,a,c,row.high,row.high+.24,'#a7ae98',.52,d0/len,d1/len);
                beam((d0+d1)/2,row.low,row.high,.055,'#9ba99a',.12);
              }
              beam(start+k*pitch,16,g.fasciaBottom,.65,'#c1c2ad',.48);
            }
            beam(end,16,g.fasciaBottom,.65,'#c1c2ad',.48);
          }
          wallPanel(metal,a,c,g.fasciaBottom,height,'#424b47',.14);
          for(let d=.12;d<len;d+=.26)beam(d,g.fasciaBottom,height,.055,'#7c8578',.25);
          wallPanel(detail,a,c,height-.13,height,'#a9ae9b',.24);
        }else{
          const rows=height>14?[[3.3,6.6],[8.2,11.3],[12.4,15.3]]:height>8?[[1.0,3.4],[5.0,7.4],[9.1,11.3]]:[[.5,3.25]];
          if(len>4)for(const [low,high] of rows){
            wallPanel(glass,a,c,low,high,'#3c5650',.06,.018,.982);
            wallPanel(detail,a,c,high,Math.min(height,high+.3),'#c9d0b7',.4);
            for(let d=.3;d<len;d+=1.7)beam(d,low,high,.07,'#a3b6a6',.13);
          }
          if(height>14)for(let d=0;d<len;d+=8.0)beam(d,.1,height,.46,'#b6c1a5',.31);
          wallPanel(detail,a,c,height-.26,height,'#c6ccb3',.48);
        }
      }
    }
    for(const annex of g.annexes){
      const base=buildingBase(annex.points),offset=base-b.base,ring=ordered(annex.points);
      polygon(roofs,annex.points,offset+annex.height,'#a0a797');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(brick,a,c,offset,offset+annex.height,'#8c8065');
        wallPanel(detail,a,c,offset+annex.height-.2,offset+annex.height,'#c1c8b1',.1);
        if(g.local(a).v<-51&&g.local(c).v<-51)wallPanel(metal,a,c,offset+.2,offset+2.8,'#46584c',.04,.32,.68);
      }
      addCollider({points:annex.points,base,top:annex.height});
    }
    // The main canopy flares in both plan and elevation. No photo is used
    // as a texture, and its dimensions are deliberately labelled estimates.
    shapedRoof(cover,g.canopy.points,p=>g.canopy.heightAt(p),'#d3d9c7');
    shapedRoof(cover,g.canopy.points,p=>g.canopy.heightAt(p)-g.canopy.thickness,'#e0e3d4');
    const cr=ordered(g.canopy.points);
    for(let i=0;i<cr.length;i++){
      const a=cr[i],c=cr[(i+1)%cr.length];cover.quad([a.x,g.canopy.heightAt(a)-.26,a.z],[a.x,g.canopy.heightAt(a),a.z],[c.x,g.canopy.heightAt(c),c.z],[c.x,g.canopy.heightAt(c)-.26,c.z],'#c8d0be');
    }
    for(const col of g.columns){
      const ground=terrainHeight(col.x,col.z)-b.base;
      box(brick,col.u,col.v,(ground+col.top)/2,1.05,col.top-ground,1.65,'#8c7e65');
      addCollider({points:col.points,base:b.base,top:col.top});
      for(const du of [-1.3,1.3])batchBeam(metal,at(col.u,col.v,col.top-.3),at(col.u+du,-55,g.canopy.heightAt(framePoint(f,col.u+du,-55))-.3),.12,'#45564e');
    }
    addCollider({points:g.canopy.points,base:b.base,bottom:9.94,top:14.5});
    // Low white Scientia portal follows the existing ground-floor wall.
    box(detail,g.portal.u,g.portal.v,g.portal.top,.6,.35,6.7,'#d9ddcf');
    const doorA=framePoint(f,-18.65,1.65),doorC=framePoint(f,-18.65,-4.15);
    wallPanel(entryGlass,doorA,doorC,.65,3.92,'#46655c',.12);
    for(const v of [-3.7,-1.8,.1,1.5])box(detail,-18.91,v,2.3,.12,3.1,.07,'#b7c4b4');
    for(const post of g.portal.posts){box(detail,post.u,post.v,2.3,.5,3.6,.35,'#d9ddcf');addCollider({points:post.points,base:b.base,top:4.1});}
    // A wide entrance fascia and door frames, behind the northern canopy.
    box(detail,5.5,-48.95,6.9,15.4,.7,.4,'#d8dccb');
    for(let u=-1;u<=12;u+=2.15)box(detail,u,-49,4.75,.11,3.45,.16,'#d1d9c9');
    facadeCaption(b,framePoint(f,-2,-49),framePoint(f,13,-49),'University Library',12.8,6.9,'#354840');
    const logo=(a,c)=>{
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      const tex=canvasTexture(1024,256,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#e6e9db';ctx.font='500 180px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('UNSW',w/2,h/2);});
      const sign=new THREE.Mesh(new THREE.PlaneGeometry(25,4.3),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));
      sign.position.set((a.x+c.x)/2+nx*.32,b.base+55.55,(a.z+c.z)/2+nz*.32);sign.rotation.y=Math.atan2(nx,nz);world.add(sign);
    };
    logo(framePoint(f,-16.1,-13.1),framePoint(f,20,-12.8));
    logo(framePoint(f,-17.35,20.4),framePoint(f,-16.5,-12.95));
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3})),cover.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    const glazing=entryGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.055,metalness:.7,envMapIntensity:1.25}));world.add(glazing);medicalReflection(glazing,framePoint(f,-25,3),b.base+3);
  }

  function tyreeBuilding(b,concrete,clay,glass,detail,roofs){
    glass=new Batch();clay=new Batch();glass.base=clay.base=b.base;
    const portal=new Batch();portal.base=0;
    const g=tyreeGeometry(b),f=g.frame,metal=new Batch(),roof=new Batch(),soffit=new Batch(),floor=new Batch(),stone=new Batch(),garden=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    for(const batch of [metal,roof,soffit,floor,stone,garden])batch.base=0;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    const ringOf=(raw,hole=false)=>(polygonArea(raw)>0)!==hole?raw:[...raw].reverse();
    // Lower ground is partitioned around the retained western footway and
    // reconstructed Anzac-side recess. The upper building remains occupied.
    for(const part of TYREE_PARTS){
      if(part.kind==='ground')for(const raw of [part.points,...part.holes]){const ring=ringOf(raw,raw!==part.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        wallPanel(glass,a,c,g.report.groundRL-b.base,g.report.level1RL-b.base,'#4e6964');
        wallPanel(concrete,a,c,0,g.report.groundRL-b.base,'#87978a');
        for(let d=.1;d<len;d+=1.5){const t=d/len;batchBeam(detail,[a.x+(c.x-a.x)*t+n.x*.04,g.report.groundRL-b.base,a.z+(c.z-a.z)*t+n.z*.04],[a.x+(c.x-a.x)*t+n.x*.04,g.report.level1RL-b.base,a.z+(c.z-a.z)*t+n.z*.04],.04,'#8fa897');}
      }}
      if(part.kind!=='ground'){
        polygon(soffit,part.points,g.passageCeilingRL,'#b0baaa',part.holes,true);
        shapedRoof(floor,part.points,p=>g.passageFloor(p)+.005,'#a3a594',part.holes);
        groundPatches.push({points:part.points,heightAt:(x,z)=>g.passageFloor({x,z})});
      }
      addCollider({points:part.points,holes:part.holes,base:0,bottom:part.minRL,top:g.report.level1RL});
    }
    addCollider({points:b.points,holes:b.holes,base:0,bottom:g.report.level1RL,top:g.report.pvRL});
    const ring=ringOf(b.points);
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),la=g.local(a),lc=g.local(c),mid={u:(la.u+lc.u)/2,v:(la.v+lc.v)/2},n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},north=n.x*f.v.x+n.z*f.v.z<-.8&&mid.v<-25,east=n.x*f.u.x+n.z*f.u.z>.7&&mid.u>35;
      const p=(t,rl,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,rl-b.base,a.z+(c.z-a.z)*t+n.z*off];
      const segs=Math.max(1,Math.ceil(len/.6));
      for(let j=0;j<segs;j++){
        const l=j/segs,r=(j+1)/segs,pa={x:a.x+(c.x-a.x)*l,z:a.z+(c.z-a.z)*l},pc={x:a.x+(c.x-a.x)*r,z:a.z+(c.z-a.z)*r},ha=g.roofRL(pa),hc=g.roofRL(pc);
        (north?glass:clay).quad(p(l,g.report.level1RL),p(l,ha),p(r,hc),p(r,g.report.level1RL),north?'#5f7f77':'#b1815e');
        soffit.quad([pa.x,ha-.23,pa.z],[pa.x,ha,pa.z],[pc.x,hc,pc.z],[pc.x,hc-.23,pc.z],'#dce0ce');
      }
      if(north){
        const minU=Math.min(la.u,lc.u),maxU=Math.max(la.u,lc.u),left=Math.max(-45,minU),right=Math.min(12,maxU);
        // Horizontal ceramic baguettes have real depth and separate supports.
        if(right>left)for(let y=32.9;y<44.2;y+=.53)for(let u=Math.floor(left/1.25)*1.25;u<right;u+=1.25){
          const u0=Math.max(left,u+.025),u1=Math.min(right,u+1.225);if(u1<=u0)continue;const ts=[(u0-la.u)/(lc.u-la.u),(u1-la.u)/(lc.u-la.u)].sort((a,b)=>a-b),l=ts[0],r=ts[1];
          clay.quad(p(l,y,.68),p(l,y+.15,.56),p(r,y+.15,.56),p(r,y,.68),'#b18a63');
          clay.quad(p(l,y+.15,.56),p(l,y+.20,.20),p(r,y+.20,.20),p(r,y+.15,.56),'#c09b74');
          clay.quad(p(l,y,.20),p(l,y,.68),p(r,y,.68),p(r,y,.20),'#8e6b47');
        }
        for(let u=Math.ceil(minU/1.5)*1.5;u<maxU;u+=1.5){const t=(u-la.u)/(lc.u-la.u),h=g.roofRL({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});batchBeam(detail,p(t,g.report.groundRL,.08),p(t,h-.1,.08),.045,'#91a89b');}
        for(const y of [28.2,32.7,37.2,41.7,46.2])if(y<Math.min(g.roofRL(a),g.roofRL(c)))wallPanel(detail,a,c,y-b.base,y-b.base+.045,'#8fa99b',.08);
      }else{
        const height=Math.min(g.roofRL(a),g.roofRL(c)),glazedSouth=east&&mid.v>5;
        if(east){
          const low=glazedSouth?32.7:41.7,high=Math.min(height,glazedSouth?47.3:50.7);
          if(high>low)wallPanel(glass,a,c,low-b.base,high-b.base,'#5d7c75',.035);
          for(let d=.2;d<len;d+=1.45){const t=d/len;batchBeam(detail,p(t,low,.09),p(t,high,.09),.045,'#9eafa1');}
          for(let y=low;y<high;y+=4.5)wallPanel(detail,a,c,y-b.base,y-b.base+.07,'#a9b7a6',.10);
        }
        // Panel courses, narrow inset glazing and deep ceramic blades retain
        // the mapped angular western / southern folds.
        for(let y=32.7;y<height;y+=4.5)wallPanel(detail,a,c,y-b.base,y-b.base+.03,'#8e735a',.04);
        for(let y=32.9;y<Math.min(height,41.7);y+=.24)wallPanel(detail,a,c,y-b.base,y-b.base+.008,'#aa8867',.041);
        for(let d=.75;d<len;d+=1.2){const t=d/len;batchBeam(detail,p(t,32.7,.05),p(t,Math.min(height,50.7),.05),.014,'#977b60');}
        if(len>7)for(const centre of [.28,.66]){
          const lo=Math.max(0,centre-1.5/len),hi=Math.min(1,centre+1.5/len),top=Math.min(height-.25,50.7);
          wallPanel(glass,a,c,32.7-b.base,top-b.base,'#354f4c',.065,lo,hi);
          for(let d=lo*len;d<hi*len;d+=.64){const t=d/len;batchBeam(detail,p(t,32.7,.09),p(t,top,.09),.04,'#b2bdae');
            clay.quad(p(t,32.7,.12),p(t,top,.12),p(t+.13/len,top,.95),p(t+.13/len,32.7,.95),'#b88b65');
            clay.quad(p(t+.13/len,32.7,.95),p(t+.13/len,top,.95),p(t+.20/len,top,.12),p(t+.20/len,32.7,.12),'#9e7957');
          }
        }
      }
    }
    for(const part of TYREE_ROOFS)shapedRoof(roof,part.points,p=>part.kind==='pv'?part.rl:g.roofRL(p),'#bbc3ad',part.holes);
    shapedRoof(roof,g.canopy.points,g.roofRL,'#d5dbc7');shapedRoof(soffit,g.canopy.points,p=>g.roofRL(p)-.23,'#e3e4d1');
    for(const part of TYREE_APRON)shapedRoof(floor,part.points,g.apron.heightAt,'#a5a594',part.holes);
    groundPatches.push({points:g.apron.points,heightAt:(x,z)=>g.apron.heightAt({x,z})});
    for(const part of TYREE_PLATFORM){polygon(stone,part.points,part.rl,'#9c9f91',part.holes);groundPatches.push({points:part.points,heightAt:()=>part.rl+.01});addCollider({points:part.points,holes:part.holes,base:0,top:part.rl,stepHeight:.27});}
    for(const step of TYREE_STEPS){polygon(stone,step.points,step.rl,'#a6aa9a',step.holes);const ring=ringOf(step.points);for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],step.rl-.23,step.rl,'#8d9688');groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,holes:step.holes,base:0,top:step.rl,stepHeight:.27});}
    // Pale tactile / paving strips continue across the raised terrace.
    for(let u=-32;u<42;u+=1.1)batchBeam(stone,at(u,-33.4,28.215),at(u,-27.8,28.215),.035,'#c6c7b5');
    for(const col of g.columns){batchPipe(metal,[col.x,28.2,col.z],[col.x,g.roofRL(col)-.2,col.z],col.radius,'#adb9ab');addCollider({x:col.x,z:col.z,radius:col.radius,base:0,bottom:28.2,top:g.roofRL(col)});}
    for(const col of g.westColumns){const bottom=g.passageFloor(col);batchPipe(metal,[col.x,bottom,col.z],[col.x,32.7,col.z],col.radius,'#a3afa0');addCollider({x:col.x,z:col.z,radius:col.radius,base:0,bottom,top:32.7});}
    for(const u of [-16,16])for(const s of [-.85,.85]){const start=framePoint(f,u+s,-36.1),end=framePoint(f,u+s,-33.4),low=terrainHeight(start.x,start.z)+1.1;batchPipe(metal,[start.x,low,start.z],[end.x,29.12,end.z],.027,'#c6d0bd');for(const [p,y]of [[start,low],[end,29.12]])batchPipe(metal,[p.x,y-.85,p.z],[p.x,y,p.z],.023,'#bdc8b5');}
    // A dark stone portal marks the glazed Mall entry; dimensions are estimated.
    for(const u of [15.8,20.2])box(portal,u,-28.15,30.55,.30,4.7,1.45,'#4e4840');box(portal,18,-28.15,32.75,4.7,.3,1.45,'#4e4840');
    portal.quad(at(15.95,-28.87,28.2),at(15.95,-28.87,32.6),at(16.8,-27.43,31.2),at(16.8,-27.43,28.2),'#4f4941');
    portal.quad(at(19.2,-27.43,28.2),at(19.2,-27.43,31.2),at(20.05,-28.87,32.6),at(20.05,-28.87,28.2),'#4f4941');
    portal.quad(at(15.95,-28.87,32.6),at(20.05,-28.87,32.6),at(19.2,-27.43,31.2),at(16.8,-27.43,31.2),'#5b554a');
    for(const plant of g.plants){
      const ring=ringOf(plant.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(metal,a,c,plant.bottom,plant.top,'#aab6a5');
        for(let y=plant.bottom+.15;y<plant.top;y+=.23)wallPanel(metal,a,c,y,y+.035,'#718577',.035);
        for(let d=.5;d<len;d+=1.0)wallPanel(metal,a,c,plant.bottom,plant.top,'#c0c9b6',.065,d/len,(d+.035)/len);
      }polygon(roof,plant.points,plant.top,'#b1bca7');
    }
    // Illustrative photovoltaic modules on the documented plant / PV level.
    for(let u=-14;u<=28;u+=3.4)for(const v of [11,15]){
      const points=frameRectangle(f,2.9,2.1,u,v);if(!points.every(p=>inPolygon(p.x,p.z,b.points))||g.plants.some(p=>points.some(q=>inPolygon(q.x,q.z,p.points))))continue;
      shapedRoof(roof,points,p=>50.95+(g.local(p).v-v+1.05)*.18,'#324d59');
      for(let k=0;k<4;k++)batchBeam(metal,at(u-1.42+k*.94,v-1,50.97),at(u-1.42+k*.94,v+1,51.33),.018,'#a5b8b2');
    }
    for(const u of [15.8,20.2])addCollider({points:frameRectangle(f,.3,1.45,u,-28.15),base:0,bottom:28.2,top:32.9});
    for(const table of g.tables){
      box(garden,table.u,table.v,28.94,1.15,.07,.65,'#cbd2c1');for(const u of [table.u-.45,table.u+.45])box(garden,u,table.v,28.55,.055,.7,.5,'#a2b4a7');
      for(const v of [table.v-.7,table.v+.7])for(const u of [table.u-.35,table.u+.35]){box(garden,u,v,28.67,.42,.06,.40,'#d3d8c7');box(garden,u,v+.18,28.94,.42,.5,.045,'#cbd2c0');for(const du of [-.15,.15])for(const dv of [-.13,.13])box(garden,u+du,v+dv,28.43,.035,.43,.035,'#a1b1a2');}
      addCollider({points:frameRectangle(f,1.7,2.3,table.u,table.v),base:0,bottom:28.2,top:29.2});
    }
    facadeCaption(b,framePoint(f,20.3,-27.7),framePoint(f,16.2,-27.7),'Tyree Energy Technologies',3.8,33.25-b.base,'#d5dbc9');
    const glazing=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.045,metalness:.75,envMapIntensity:1.25}));world.add(glazing,clay.mesh(style('#ffffff',{vertexColors:true,roughness:.85})),portal.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('aggregate'),bumpMap:surfaceTexture('aggregate'),bumpScale:.025})));medicalReflection(glazing,framePoint(f,18,-32),36.2);
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.35})),roof.mesh(style('#ffffff',{vertexColors:true})),soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),stone.mesh(style('#ffffff',{vertexColors:true})),garden.mesh(style('#ffffff',{vertexColors:true})));
  }

  function blockhouseBuilding(b,concrete,brick,glass,detail,roofs){
    const g=blockhouseGeometry(b),f=g.frame,metal=new Batch(),soffits=new Batch(),paving=new Batch(),garden=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    metal.base=soffits.base=b.base;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    const ordered=(raw,hole=false)=>(polygonArea(raw)>0)!==hole?raw:[...raw].reverse();
    for(const part of BLOCKHOUSE_PARTS){
      if(part.kind==='ground')for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),shop=len>4&&(mid.v>5.5||(mid.v<-4&&mid.u>3)),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        wallPanel(shop?glass:brick,a,c,0,3.8,shop?'#455e58':'#857054');
        if(shop){
          for(let d=.15;d<len;d+=1.3){const t=d/len;batchBeam(detail,[a.x+(c.x-a.x)*t+n.x*.06,.1,a.z+(c.z-a.z)*t+n.z*.06],[a.x+(c.x-a.x)*t+n.x*.06,3.4,a.z+(c.z-a.z)*t+n.z*.06],.055,'#bcc8b5');}
          for(const y of [.14,.8,2.85,3.4])wallPanel(detail,a,c,y,y+.045,'#bbc8b4',.065);
        }
      }}
      if(part.minHeight)polygon(soffits,part.points,part.minHeight,'#c6c9b7',part.holes,true);
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:part.minHeight,top:3.8});
    }
    addCollider({points:b.points,holes:b.holes,base:b.base,bottom:3.8,top:g.roof});
    const ring=ordered(b.points),faces=[],cb=g.core.bounds;
    // Split original façade edges at the reconstructed core. Its concrete
    // shell replaces these spans instead of competing with brick / fascia.
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],la=g.local(a),lc=g.local(c),cuts=[0,1];
      if(Math.max(la.u,lc.u)<cb.u0||Math.min(la.u,lc.u)>cb.u1||Math.max(la.v,lc.v)<cb.v0||Math.min(la.v,lc.v)>cb.v1){faces.push({a,c});continue;}
      for(const [key,value] of [['u',cb.u0],['u',cb.u1],['v',cb.v0],['v',cb.v1]])if(Math.abs(lc[key]-la[key])>1e-8){const t=(value-la[key])/(lc[key]-la[key]);if(t>0&&t<1)cuts.push(t);}
      cuts.sort((a,b)=>a-b);
      for(let j=0;j<cuts.length-1;j++){
        const l=cuts[j],r=cuts[j+1],t=(l+r)/2,u=la.u+(lc.u-la.u)*t,v=la.v+(lc.v-la.v)*t;
        if(r-l<1e-8||u>cb.u0-1e-7&&u<cb.u1+1e-7&&v>cb.v0-1e-7&&v<cb.v1+1e-7)continue;
        faces.push({a:{x:a.x+(c.x-a.x)*l,z:a.z+(c.z-a.z)*l},c:{x:a.x+(c.x-a.x)*r,z:a.z+(c.z-a.z)*r}});
      }
    }
    for(let i=0;i<faces.length;i++){
      const {a,c}=faces[i],len=distance2(a,c),la=g.local(a),lc=g.local(c),mid={u:(la.u+lc.u)/2,v:(la.v+lc.v)/2},n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},long=Math.abs(lc.u-la.u)>4;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      wallPanel(brick,a,c,3.8,g.roof,'#857054');
      if(long){
        const count=Math.max(1,Math.round(len/3.4));
        for(const row of g.rows)for(let j=0;j<count;j++){
          const t=(j+.5)/count,u=la.u+(lc.u-la.u)*t;if(Math.abs(u)>32.5||mid.v<-7)continue;
          const l=t-.32/len,r=t+.32/len;
          wallPanel(glass,a,c,row.low,row.high,'#435b57',.025,l,r);
          for(const q of [l,r])batchBeam(detail,p(q,row.low,.07),p(q,row.high,.07),.035,'#bec8b6');
          for(const y of [row.low,row.low+.67,row.high])batchBeam(detail,p(l,y,.08),p(r,y,.08),.04,'#bec8b6');
          if((i+j)%3===0)wallPanel(detail,a,c,row.low+.05,row.low+.61,'#8e9e94',.05,l+.025/len,r-.025/len);
          // Small pale reveals project beyond the glazing and brick face.
          batchBeam(metal,p(l,row.low-.04,.16),p(r,row.low-.04,.16),.08,'#a8b29d');
          brick.quad(p(l-.06/len,row.low,.22),p(l-.06/len,row.high,.22),p(l,row.high,0),p(l,row.low,0),'#74644d');
          brick.quad(p(r,row.low,0),p(r,row.high,0),p(r+.06/len,row.high,.22),p(r+.06/len,row.low,.22),'#74644d');
        }
        for(const y of [3.78,7.72,11.65])batchBeam(metal,p(0,y,.10),p(1,y,.10),y===3.78?.18:.10,'#d0d3bf');
        if(mid.v>6){
          wallPanel(concrete,a,c,3.0,3.68,'#d1d1bd',.06);
          // End rooms retain a high horizontal ground window above the hedge.
          for(const [u0,u1] of [[-37.5,-34.2],[30.2,37.5]]){const ts=[(u0-la.u)/(lc.u-la.u),(u1-la.u)/(lc.u-la.u)].sort((a,b)=>a-b),l=Math.max(0,ts[0]),r=Math.min(1,ts[1]);if(r>l){wallPanel(glass,a,c,2.1,2.65,'#465e57',.03,l,r);for(let d=l*len;d<r*len;d+=1.2)batchBeam(detail,p(d/len,2.1,.08),p(d/len,2.65,.08),.035,'#c2c9b5');}}
        }
      }
      batchBeam(metal,p(0,11.78,.14),p(1,11.78,.14),.15,'#c3c9b5');
    }
    for(const part of BLOCKHOUSE_ROOFS){
      polygon(roofs,part.points,part.height,'#a4ac98',part.holes);
      if(part.kind!=='core')continue;
      const ring=ordered(part.points);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        wallPanel(concrete,a,c,0,part.height,'#abb5a5',.04);
        for(const y of [3.9,7.75,11.8,14.8])wallPanel(detail,a,c,y,y+.025,'#839383',.055);
        for(let d=.85;d<len;d+=1.1)wallPanel(detail,a,c,3.8,part.height,'#8b9b8c',.055,d/len,(d+.018)/len);
        if(len>3){wallPanel(glass,a,c,4.2,13.9,'#526c65',.06,.12,.27);for(const y of [7.7,11.5])wallPanel(detail,a,c,y,y+.06,'#bbc7b5',.08,.12,.27);}
        if(n.x*f.v.x+n.z*f.v.z<-.7)wallPanel(glass,a,c,.2,3.2,'#455e58',.08,.36,.72);
        batchBeam(metal,[a.x+n.x*.07,part.height,a.z+n.z*.07],[c.x+n.x*.07,part.height,c.z+n.z*.07],.09,'#c1c9b3');
      }
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.roof,top:part.height});
    }
    // Pillars remain on the original south perimeter, outside the source
    // through-route buffer. Recessed glazing stays behind the covered walk.
    for(const u of [-33.5,-29,-23,-17,-11,-5,1,7,13,19,25,29.5]){
      box(brick,u,8.65,1.9,.46,3.8,.55,'#857054');addCollider({points:frameRectangle(f,.46,.55,u,8.65),base:b.base,top:3.8});
    }
    for(const part of BLOCKHOUSE_AWNING){
      polygon(metal,part.points,part.top,'#8d9b8e',part.holes);polygon(soffits,part.points,part.bottom,'#b9c1b1',part.holes,true);
      const ring=ordered(part.points);for(let i=0;i<ring.length;i++)wallPanel(metal,ring[i],ring[(i+1)%ring.length],part.bottom,part.top,'#58695d');
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:part.bottom,top:part.top});
    }
    for(let u=-36;u<37;u+=3.4){
      // Thin cantilever rafters and pale parallel soffit strips.
      batchBeam(metal,at(u,-12.7,3.65),at(u,-4.7,3.65),.12,'#4a5c51');
      for(let v=-12.6;v<-5;v+=.38)batchBeam(metal,at(u,v,3.705),at(Math.min(37,u+3.4),v,3.705),.016,'#8f9b8a');
    }
    for(const floor of BLOCKHOUSE_PAVING)polygon(paving,floor.points,.22,'#aca893',floor.holes);
    for(const hedge of g.hedges){
      for(let u=hedge.u-hedge.width/2+.3;u<hedge.u+hedge.width/2;u+=.65){box(garden,u,hedge.v,.32,.07,.64,.07,'#857356');box(garden,u,hedge.v,.85,.76,.55,.72,'#55784b');box(garden,u+.12,hedge.v-.05,1.12,.55,.15,.65,'#698957');}
    }
    // Discreet campus identity on the fascia; historical tenant names are not
    // presented as current businesses.
    facadeCaption(b,framePoint(f,17.5,9.05),framePoint(f,4.5,8.93),'G6 | Blockhouse',7.5,3.38,'#566655');
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.18})),soffits.mesh(style('#ffffff',{vertexColors:true})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),garden.mesh(style('#ffffff',{vertexColors:true})));
  }

  function morvenBrownBuilding(b,brick,glass,detail,roofs){
    const g=morvenGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),metal=new Batch(),paving=new Batch(),garden=new Batch(),shade=new Batch();
    for(const batch of [metal,shade])batch.base=b.base;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},box=(batch,u,v,y,w,h,d,col)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,col,angle);};
    const parts=MORVEN_PARTS,upper=6.8;
    for(const part of parts){
      for(const raw of [part.points,...part.holes]){const ring=(polygonArea(raw)<0)===(raw===part.points)?[...raw].reverse():raw;for(let i=0;i<ring.length;i++)wallPanel(brick,ring[i],ring[(i+1)%ring.length],part.minHeight,upper,'#8c8067');}
      if(part.minHeight)polygon(shade,part.points,part.minHeight,'#b0b3a2',part.holes,true);
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:part.minHeight,top:upper});
    }
    addCollider({points:b.points,holes:b.holes,base:b.base,bottom:upper,top:b.height});
    for(const floor of MORVEN_PAVING)polygon(paving,floor.points,.22,'#aaa695',floor.holes);
    for(let ri=0;ri<1+b.holes.length;ri++){
      const raw=ri?b.holes[ri-1]:b.points,ring=(polygonArea(raw)>0)===(ri===0)?raw:[...raw].reverse();
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},la=g.local(a),lc=g.local(c),cuts=[0,1];
        if(Math.abs(lc.u-la.u)>1)for(const u of [-10.8,-6.6]){const t=(u-la.u)/(lc.u-la.u);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
        const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
        wallPanel(brick,a,c,upper,g.roof,'#8c8067');
        // Deep projecting masonry strips frame narrow stacked windows. Lower
        // glazing disappears into the real slope rather than adding a floor.
        const count=Math.max(1,Math.round(len/2.45));
        for(let j=0;j<count;j++){
          const t=(j+.5)/count,u=la.u+(lc.u-la.u)*t,v=la.v+(lc.v-la.v)*t,opening=Math.abs(lc.u-la.u)>1&&u>-10.8&&u<-6.6;
          const bottom=opening?(v<0?4.6:6.8):0,l=t-.5/len,r=t+.5/len;
          for(const row of g.rows){if(row.low<bottom+.12)continue;
            wallPanel(glass,a,c,row.low,row.high,'#405b58',.025,Math.max(0,l),Math.min(1,r));
            for(const q of [l,r])batchBeam(detail,p(q,row.low,.10),p(q,row.high,.10),.045,'#c2c6b4');
            for(const y of [row.low,row.low+.65,row.high])batchBeam(detail,p(l,y,.11),p(r,y,.11),.045,'#c2c6b4');
            // Staggered pale blinds add variation without copied photographs.
            if((i+j+Math.round(row.low))%4===0)wallPanel(detail,a,c,row.high-.65,row.high-.07,'#a9afa0',.06,l+.04/len,r-.04/len);
            metal.quad(p(l,row.low-.05,.35),p(r,row.low-.05,.35),p(r,row.low+.05,.04),p(l,row.low+.05,.04),'#a0a895');
            batchBeam(metal,p(l,row.high+.06,.34),p(r,row.high+.06,.34),.12,'#8f9587');
          }
        }
        for(let k=0;k<cuts.length-1;k++){
          const l=cuts[k],r=cuts[k+1],u=la.u+(lc.u-la.u)*(l+r)/2,v=la.v+(lc.v-la.v)*(l+r)/2,bottom=Math.abs(lc.u-la.u)>1&&u>-10.8&&u<-6.6?(v<0?4.6:6.8):0;
          for(let j=0;j<=count;j++){const t=j/count,lo=Math.max(l,t-.3/len),hi=Math.min(r,t+.3/len);if(hi<=lo)continue;
            wallPanel(brick,a,c,bottom,g.roof,'#91866d',.36,lo,hi);
            brick.quad(p(lo,bottom,0),p(lo,g.roof,0),p(lo,g.roof,.36),p(lo,bottom,.36),'#82785f');
            brick.quad(p(hi,bottom,.36),p(hi,g.roof,.36),p(hi,g.roof,0),p(hi,bottom,0),'#82785f');
          }
        }
        batchBeam(metal,p(0,17.72,.48),p(1,17.72,.48),.42,'#545d52');
        shade.quad(p(0,17.5,0),p(0,17.5,.65),p(1,17.5,.65),p(1,17.5,0),'#a4ab97');
      }
    }
    polygon(roofs,b.points,g.roof,'#939d89',b.holes);
    // Shallow fan canopy: reconstructed from the July 2015 courtyard pano.
    const cv=g.canopy,centre=framePoint(f,cv.u,cv.v),level=terrainHeight(centre.x,centre.z)+cv.clearance-b.base;
    for(let i=0;i<16;i++){
      const a=Math.PI+i/16*Math.PI,c=Math.PI+(i+1)/16*Math.PI,va=[cv.u+Math.cos(a)*cv.rx,cv.v+Math.sin(a)*cv.rz],vc=[cv.u+Math.cos(c)*cv.rx,cv.v+Math.sin(c)*cv.rz];
      shade.triangle(at(cv.u,cv.v,level+.55),at(...vc,level),at(...va,level),'#e2dfc7');
      batchBeam(metal,at(cv.u,cv.v,level+.5),at(...va,level-.04),.09,'#4b5b53');
      batchBeam(metal,at(...va,level),at(...vc,level),.13,'#46554e');
      if(i%4===0){const p=framePoint(f,...va),bottom=terrainHeight(p.x,p.z)-b.base;batchPipe(metal,at(...va,bottom),at(...va,level),.065,'#4b5b53');addCollider({x:p.x,z:p.z,radius:.09,base:b.base,bottom,top:level});}
    }
    for(const bench of g.benches){
      for(let slat=0;slat<5;slat++)box(garden,bench.u,bench.v+(slat-2)*.11,.48,2.5,.08,.085,'#8e7252');
      for(let slat=0;slat<3;slat++)box(garden,bench.u,bench.v+.28,.72+slat*.14,2.5,.10,.07,'#8e7252');
      for(const u of [bench.u-.9,bench.u+.9])box(garden,u,bench.v,.24,.10,.48,.56,'#526052');
      addCollider({points:bench.points,top:.58});
    }
    // Low faceted representation of the pool and abstract vertical sculpture;
    // no artist attribution is inferred from a photograph alone.
    const pool=g.pool,pp=framePoint(f,pool.u,pool.v),poolRL=terrainHeight(pp.x,pp.z)+.32,water=new Batch();water.base=0;
    const ring=Array.from({length:28},(_,i)=>framePoint(f,pool.u+Math.cos(i/28*TAU)*pool.width/2,pool.v+Math.sin(i/28*TAU)*pool.length/2));
    polygon(water,ring,poolRL,'#577d70');
    for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];batchBeam(water,[a.x,poolRL,a.z],[c.x,poolRL,c.z],.18,'#7c887a');}
    for(const [u,v,h,w] of [[12.1,5.4,1.9,.5],[11.8,5,.65,1.4],[12.6,5.2,.45,1.0]]){
      const p=framePoint(f,u,v);batchPipe(water,[p.x,poolRL,p.z],[p.x+.25,poolRL+h,p.z-.16],w,'#6b776d');
    }
    addCollider({x:pp.x,z:pp.z,radius:.85,top:2.1});
    // Flowering borders sit along walls, outside the mapped circulation spine.
    for(const u of [-17,16.5])for(let v=-12;v<=12;v+=3){box(garden,u,v,.4,1.0,.6,1.8,'#5c794d');for(let j=0;j<4;j++)box(garden,u+(j%2)*.36-.2,v+Math.floor(j/2)*.5,.77,.2,.18,.2,j%2?'#c7acc7':'#ddc7cf');}
    facadeCaption(b,framePoint(f,28,27.45),framePoint(f,3,27.3),'C20 | Morven Brown',10.0,4.0,'#e4e1cb');
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.25})),shade.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),garden.mesh(style('#ffffff',{vertexColors:true})),water.mesh(style('#ffffff',{vertexColors:true,roughness:.35})));
  }

  function squarehouseBuilding(b,concrete,brick,glass,detail,roofs){
    const g=squarehouseGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const grey='#737d79',light='#adb7a7',cream='#c0b18b',deck=new Batch(),soffits=new Batch(),paving=new Batch(),stairMesh=new Batch(),plants=new Batch();
    deck.base=soffits.base=plants.base=b.base;paving.base=null;stairMesh.base=0;
    const rail=(a,c,bottom,top,cap=true)=>{
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,theta=Math.atan2(-(c.z-a.z),c.x-a.x);
      const x=(a.x+c.x)/2,z=(a.z+c.z)/2;
      concrete.box(x,bottom+.085,z,len,.17,.22,grey,theta);concrete.box(x,top-.115,z,len,.23,.22,grey,theta);
      for(let d=.12;d<len;d+=2.15){const t=d/len,x=a.x+(c.x-a.x)*t+nx*.05,z=a.z+(c.z-a.z)*t+nz*.05;concrete.box(x,(bottom+top)/2,z,.18,top-bottom,.22,light,theta);}
      if(cap)detail.box(x,top-.015,z,len,.03,.26,'#b6bfb0',theta);
    };
    for(const face of g.faces){
      const {a,c,len,n,kind}=face,p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      wallPanel(brick,a,c,0,g.roof,cream);
      // Ground workshop glazing sits behind the open outer colonnade.
      if(kind==='pier-windows'){
        wallPanel(glass,a,c,.5,3.18,'#405954',.025,.03,.97);
        const bays=Math.max(1,Math.round(len/3.5));
        for(let i=0;i<=bays;i++){const t=i/bays;batchBeam(detail,p(t,.4,.08),p(t,3.2,.08),.045,'#a2b2a0');}
        wallPanel(detail,a,c,2.68,2.76,light,.08);
      }else{
        wallPanel(glass,a,c,.35,3.2,'#415852',.025,.08,.92);
        for(let d=1;d<len;d+=2.1)batchBeam(detail,p(d/len,.35,.08),p(d/len,3.2,.08),.035,light);
      }
      if(kind==='pier-windows'){
        const bays=Math.max(1,Math.round(len/3.5)),width=Math.min(1.18,len*.5/bays);
        for(let i=0;i<bays;i++){
          const t=(i+.5)/bays,l=t-width/len/2,r=t+width/len/2;
          wallPanel(concrete,a,c,3.7,10.95,'#626e67',.04,l-.12/len,r+.12/len);
          for(const row of g.rows){
            wallPanel(glass,a,c,row.low,row.high,'#536c64',.08,l,r);
            for(const x of [l,r])batchBeam(detail,p(x,row.low,.12),p(x,row.high,.12),.025,'#8b9d8b');
            batchBeam(detail,p(l,row.high-.45,.13),p(r,row.high-.45,.13),.022,'#9bad98');
            // Projecting square concrete blocks interrupt the narrow strips.
            const q=p(t,row.low-.13,.24);concrete.box(q[0],q[1],q[2],width+.35,.34,.52,grey,Math.atan2(-(c.z-a.z),c.x-a.x));
            // A few tilted awning lights echo the photographed opening panes.
            if(i%3===1){const y=row.high-.5;glass.quad(p(l,y,.12),p(l,row.high,.32),p(r,row.high,.32),p(r,y,.12),'#637e72');}
          }
        }
      }
      for(const t of [0,1]){const q=p(t,7.25,.22);concrete.box(q[0],q[1],q[2],.24,7.7,.46,grey,Math.atan2(-(c.z-a.z),c.x-a.x));}
      wallPanel(concrete,a,c,g.roof-.23,g.roof,grey,.22);rail(a,c,g.roof,g.top);
    }
    polygon(roofs,b.points,g.roof,'#929f8c',b.holes);
    // An enclosed lower workshop occupies the stepped Anzac Parade edge.
    for(const part of SQUAREHOUSE_PARTS.annex){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(brick,a,c,0,g.underside,cream);
        if(len>2.0){wallPanel(glass,a,c,1.6,2.4,'#425852',.035,.03,.97);for(let d=.4;d<len;d+=1.1)wallPanel(detail,a,c,1.58,2.43,'#7d9181',.07,d/len,Math.min(1,(d+.05)/len));}
      }
      addCollider({points:part.points,holes:part.holes,base:b.base,top:g.underside});
    }
    for(const part of SQUAREHOUSE_PARTS.deck){
      polygon(deck,part.points,g.floor,'#a1aaa0',part.holes);polygon(soffits,part.points,g.underside,'#c1c9b6',part.holes,true);
      for(let i=0;i<part.points.length;i++)wallPanel(concrete,part.points[i],part.points[(i+1)%part.points.length],g.underside,g.floor,grey);
      // Existing vertical landing collision supports walking above a suspended
      // slab without raising the walking floor for people beneath it.
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.underside,top:g.floor,stepHeight:.27});
    }
    for(const floor of SQUAREHOUSE_PARTS.paving)polygon(paving,floor.points,.22,'#abae9a',floor.holes);
    const podium=polygonArea(g.podium)<0?[...g.podium].reverse():g.podium;
    for(let i=0;i<podium.length;i++){
      const a=podium[i],c=podium[(i+1)%podium.length],len=distance2(a,c),au=g.local(a),cu=g.local(c),cuts=[0,1];
      if(Math.abs(au.v+24)<.01&&Math.abs(cu.v+24)<.01)for(const u of [g.stairs.u-1.6,g.stairs.u+1.6]){const t=(u-au.u)/(cu.u-au.u);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
      for(let j=0;j<cuts.length-1;j++){
        const l=cuts[j],r=cuts[j+1],u=au.u+(cu.u-au.u)*(l+r)/2;if(Math.abs(au.v+24)<.01&&Math.abs(cu.v+24)<.01&&Math.abs(u-g.stairs.u)<1.6)continue;
        const p={x:a.x+(c.x-a.x)*l,z:a.z+(c.z-a.z)*l},q={x:a.x+(c.x-a.x)*r,z:a.z+(c.z-a.z)*r};
        wallPanel(concrete,p,q,3.05,3.6,grey,.04);rail(p,q,3.65,4.65);
        const dx=q.x-p.x,dz=q.z-p.z,length=Math.hypot(dx,dz),nx=-dz/length*.12,nz=dx/length*.12;
        addCollider({points:[{x:p.x+nx,z:p.z+nz},{x:p.x-nx,z:p.z-nz},{x:q.x-nx,z:q.z-nz},{x:q.x+nx,z:q.z+nz}],base:b.base,bottom:g.floor,top:4.65});
      }
      for(let d=.8;d<len;d+=2.15){const t=d/len,u=au.u+(cu.u-au.u)*t;if(Math.abs(au.v+24)<.01&&Math.abs(cu.v+24)<.01&&Math.abs(u-g.stairs.u)<1.6)continue;const p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};detail.box(p.x,3.25,p.z,.13,.11,.12,'#c5c9b3');}
    }
    for(const p of g.supports){
      const low=terrainHeight(p.x,p.z)-b.base;concrete.box(p.x,(low+g.underside)/2,p.z,p.width,g.underside-low,p.width,grey,angle);
      addCollider({points:frameRectangle(f,p.width,p.width,p.u,p.v),base:b.base,top:g.underside});
    }
    for(const canopy of SQUAREHOUSE_PARTS.canopies){
      polygon(deck,canopy.points,canopy.top,'#69766b',canopy.holes);polygon(soffits,canopy.points,canopy.bottom,'#aab6a0',canopy.holes,true);
      for(let i=0;i<canopy.points.length;i++){const a=canopy.points[i],c=canopy.points[(i+1)%canopy.points.length];wallPanel(detail,a,c,canopy.bottom,canopy.top,grey);}
      addCollider({points:canopy.points,holes:canopy.holes,base:b.base,bottom:canopy.bottom,top:canopy.top});
    }
    // Slender posts and roof battens distinguish the terrace shade awnings.
    for(const u of [-18,-12,-6,0,6,12]){const p=framePoint(f,u,-22.6);detail.box(p.x,5.2,p.z,.09,3.2,.09,'#4c5c52',angle);}
    for(const v of [-12,-6,0,6,12,18]){const p=framePoint(f,19.1,v);detail.box(p.x,5.2,p.z,.09,3.2,.09,'#4c5c52',angle);}
    for(let u=-19;u<15.5;u+=.42)batchBeam(detail,at(u,-23.0,7.02),at(u,-19.8,7.02),.02,'#8b9b86');
    for(let v=-13.8;v<20.5;v+=.42)batchBeam(detail,at(16,v,7.02),at(19.5,v,7.02),.02,'#8b9b86');
    // Bounded stair treads prevent a raised walking surface leaking into the
    // covered ground floor or out over neighbouring mapped paths.
    for(const step of g.stairs.steps){
      polygon(stairMesh,step.points,step.rl,'#939d8c');
      for(let i=0;i<step.points.length;i++){const a=step.points[i],c=step.points[(i+1)%step.points.length];wallPanel(stairMesh,a,c,Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.03,step.rl,'#818d7f');}
      groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,base:0,top:step.rl,stepHeight:.27});
    }
    const low=g.stairs.low-b.base,top=g.floor;
    for(const side of [-1,1]){
      const u=g.stairs.u+side*1.23,a=at(u,g.stairs.bottomV,low+.12),c=at(u,g.stairs.topV,top+.12),d=at(u,g.stairs.topV,top+1.08),e=at(u,g.stairs.bottomV,low+1.08);
      soffits.quad(a,c,d,e,grey);batchPipe(detail,at(u-side*.1,g.stairs.bottomV,low+.9),at(u-side*.1,g.stairs.topV,top+.9),.025,'#b5c4b0');
      addCollider({points:frameRectangle(f,.14,g.stairs.topV-g.stairs.bottomV,u,(g.stairs.bottomV+g.stairs.topV)/2),base:b.base,top:top+1.08});
    }
    // Small projecting service balcony on the broad southern brick end.
    const balcony=frameRectangle(f,4.4,1.3,5.3,17.1);polygon(concrete,balcony,7.45,grey);polygon(soffits,balcony,7.2,'#a7b19d',[],true);
    const r=polygonArea(balcony)<0?[...balcony].reverse():balcony;for(let i=0;i<r.length;i++)rail(r[i],r[(i+1)%r.length],7.5,8.45,false);
    for(const pot of g.planters){
      const p=framePoint(f,pot.u,pot.v);brick.box(p.x,g.floor+.25,p.z,pot.width,.5,pot.depth,'#a6a17e',angle);detail.box(p.x,g.floor+.51,p.z,pot.width-.1,.035,pot.depth-.1,'#5c6748',angle);
      addCollider({points:frameRectangle(f,pot.width,pot.depth,pot.u,pot.v),base:b.base,bottom:g.floor,top:g.floor+.6});
      for(let leaf=0;leaf<12;leaf++){
        const a=leaf/12*TAU,dx=Math.cos(a),dz=Math.sin(a),px=-dz,pz=dx,y=g.floor+.52;
        for(let j=0;j<7;j++){const t0=j/7,t1=(j+1)/7,width=.1*Math.sin((t0+.1)*Math.PI),q=t=>[p.x+dx*.75*t,y+.8*Math.sin(t*Math.PI*.75),p.z+dz*.75*t],s=q(t0),t=q(t1);plants.quad([s[0]+px*width,s[1],s[2]+pz*width],[t[0]+px*width,t[1],t[2]+pz*width],[t[0]-px*width,t[1],t[2]-pz*width],[s[0]-px*width,s[1],s[2]-pz*width],leaf%2?'#879a5f':'#6e8654');}
      }
    }
    facadeCaption(b,framePoint(f,18.8,22),framePoint(f,-6.8,22),'E4 | Squarehouse',9.8,4.43,'#dbe1cd');
    facadeCaption(b,b.points[1],b.points[2],'Design Futures Lab',10,2.85,'#d9dfc7');
    addCollider({points:b.points,holes:b.holes,base:b.base,top:g.roof});
    world.add(deck.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),soffits.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),stairMesh.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function redCentreBuilding(b,concrete,brick,glass,detail,roofs){
    const g=redCentreGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),ceramic=new Batch(),metal=new Batch(),soffits=new Batch(),paving=new Batch();
    for(const batch of [ceramic,metal,soffits])batch.base=b.base;paving.base=null;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},terracotta='#ba7e5e',silver='#c9d0bd',charcoal='#3c504f';
    const parts=RED_CENTRE_PARTS.filter(p=>p.building===b.id),upper=11.8;
    // Occupied lower regions stop around source footways. Ceiling regions
    // have matching suspended colliders, leaving outdoor links open below.
    for(const part of parts){
      const bottom=part.minHeight,top=upper;
      if(top>bottom+.01){
        const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
        for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(glass,a,c,bottom,top,charcoal,.015);
          for(let d=.5;d<len;d+=2.3)wallPanel(detail,a,c,bottom,top,'#b0bdac',.04,d/len,Math.min(1,(d+.055)/len));
          for(const y of [5.8,8.7])if(y>bottom&&y<top)wallPanel(metal,a,c,y-.12,y+.12,silver,.06);
        }
        if(bottom>0)polygon(soffits,part.points,bottom,'#c5cab6',part.holes,true);
        addCollider({points:part.points,holes:part.holes,base:b.base,bottom,top});
      }

    }
    for(const floor of RED_CENTRE_PAVING.filter(p=>p.building===b.id))polygon(paving,floor.points,.22,'#aaa994',floor.holes);
    polygon(soffits,b.points,upper,'#c0c6b3',b.holes,true);
    addCollider({points:b.points,holes:b.holes,base:b.base,bottom:upper,top:g.bodyRoof});
    const routeU=g.routes.map(p=>g.local(p.points[0]).u);
    for(const face of g.faces){
      const {a,c,len,n,mid,north}=face,au=g.local(a).u,cu=g.local(c).u;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      const panel=(batch,low,high,color,off=0,l=0,r=1)=>{if(high>low+.001&&r>l+.00001)wallPanel(batch,a,c,low,high,color,off,l,r);};
      const line=(l,r,y,off,width,color)=>batchBeam(detail,p(l,y,off),p(r,y,off),width,color);
      if(north){
        // The metal/glass occupied volume sits behind the independent screen.
        panel(glass,upper,g.bodyRoof,'#577570',-1.9);
        for(let y=upper+.2;y<g.bodyRoof;y+=4.8)panel(metal,y,y+.8,silver,-1.86);
        const cuts=[0,1],limits=[-65,67,g.recess.u0,g.recess.u1,...routeU.flatMap(u=>[u-1.9,u+1.9])];
        if(Math.abs(cu-au)>.1)for(const u of limits){const t=(u-au)/(cu-au);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
        for(let k=0;k<cuts.length-1;k++){
          const l=cuts[k],r=cuts[k+1],u=au+(cu-au)*(l+r)/2;
          if(u<-65||u>67){
            panel(glass,upper,g.bodyRoof,'#617c77',.03,l,r);
            for(let y=upper;y<g.bodyRoof;y+=4.6)panel(metal,y,y+.7,silver,.18,l,r);
            for(let d=l*len;d<r*len;d+=1.1)batchBeam(detail,p(d/len,upper,.25),p(d/len,g.bodyRoof,.25),.07,'#acbdad');
            continue;
          }
          const floor=u>g.recess.u0&&u<g.recess.u1?g.recess.ceiling:routeU.some(q=>Math.abs(q-u)<1.9)?g.passageCeiling:0;
          const slots=[2.2,6.15,7.7,10.1,...g.rows.map(r=>r.low)].map(low=>({low,high:low+1.02})).filter(row=>row.low>floor+.25&&row.high<g.screenTop-.5);
          let y0=floor;
          const band=(lo,hi)=>{
            panel(ceramic,lo,hi,terracotta,.08,l,r);
            for(let y=Math.ceil(lo/.45)*.45;y<hi;y+=.45)line(l,r,y,.091,.008,'#95684f');
            const start=Math.min(au+(cu-au)*l,au+(cu-au)*r),end=Math.max(au+(cu-au)*l,au+(cu-au)*r);
            for(let u=Math.ceil(start/1.05)*1.05;u<end;u+=1.05){const t=(u-au)/(cu-au);batchBeam(detail,p(t,lo,.091),p(t,hi,.091),.008,'#9e6d51');}
          };
          for(const row of slots){
            band(y0,row.low);panel(glass,row.low+.08,row.high-.06,'#344c4b',-.65,l,r);
            // Deep angled pale sills and dark upper reveals are real geometry.
            soffits.quad(p(l,row.low,.10),p(r,row.low,.10),p(r,row.low+.16,-.65),p(l,row.low+.16,-.65),'#c2c8b7');
            soffits.quad(p(l,row.high,.10),p(l,row.high,-.65),p(r,row.high,-.65),p(r,row.high,.10),'#777f72');
            line(l,r,row.low+.03,.12,.045,'#d0d2bc');
            for(let d=l*len+.4;d<r*len;d+=4.1){const t=d/len;panel(detail,row.low,row.high,silver,.06,Math.max(l,t-.14/len),Math.min(r,t+.14/len));}
            y0=row.high;
          }
          band(y0,g.screenTop);
          soffits.quad(p(l,g.screenTop,.1),p(l,g.screenTop,-1.95),p(r,g.screenTop,-1.95),p(r,g.screenTop,.1),'#c0c7b1');
        }
        // Exposed upper studio volume above the shorter terracotta plane.
        panel(metal,g.screenTop+.1,g.bodyRoof,silver,-1.85);
        panel(glass,g.screenTop+.3,g.screenTop+1.0,'#617b72',-1.8);
        panel(glass,g.bodyRoof-1.0,g.bodyRoof-.12,'#536e63',-1.8);
        for(let d=.5;d<len;d+=1.0)batchBeam(detail,p(d/len,g.bodyRoof-1.05,-1.73),p(d/len,g.bodyRoof-.1,-1.73),.025,'#bec9b4');
      }else{
        const end=g.west?mid.u<-64:mid.u>62,southGlass=g.west&&!end;
        // Rear court façades are fragmented glass / metal and retained brick.
        panel(end||southGlass?glass:brick,upper,g.bodyRoof,end||southGlass?'#607c76':'#a27b60');
        if(end||southGlass){
          for(let y=upper;y<g.bodyRoof;y+=4.8){
            panel(metal,y,y+.8,silver,.06);
            for(let d=.5;d<len;d+=2.0)batchBeam(detail,p(d/len,Math.max(upper,y),.10),p(d/len,Math.min(g.bodyRoof,y+4.7),.10),.032,'#bac9b5');
          }
          if(end)for(let d=.15;d<len;d+=.58){const t=d/len;batchBeam(metal,p(t,6.2,.32),p(t,g.bodyRoof,.32),.065,'#a8b9a8');}
        }else{
          const cuts=[0,1];if(Math.abs(cu-au)>.1)for(const u of routeU.flatMap(u=>[u-2.1,u+2.1])){const t=(u-au)/(cu-au);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
          for(let i=0;i<cuts.length-1;i++){const l=cuts[i],r=cuts[i+1],u=au+(cu-au)*(l+r)/2;panel(brick,routeU.some(q=>Math.abs(q-u)<2.1)?g.passageCeiling:0,upper,'#a27b60',.035,l,r);}
          // Six visible rows are a façade estimate, independent of the nine-
          // level map tag. Narrow service projections keep simpler masonry.
          const count=Math.max(1,Math.round(len/3.1));
          for(let y=2.1;y<30;y+=4.9)for(let j=0;j<count;j++){
            const t=(j+.5)/count,u=au+(cu-au)*t;if(y<g.passageCeiling&&routeU.some(q=>Math.abs(q-u)<2.9))continue;
            const w=Math.min(.9,len*.65/count),l=Math.max(0,t-w/len),r=Math.min(1,t+w/len);
            panel(brick,y-.2,y+2.8,'#a27b60',.02,l,r);panel(glass,y,y+2.5,'#647c70',.06,l,r);
            for(const x of [l,t,r])batchBeam(detail,p(x,y,.10),p(x,y+2.5,.10),.028,'#cbd0b6');line(l,r,y+1.8,.11,.028,'#cbd0b6');line(l,r,y-.06,.15,.055,'#c3c4aa');
          }
        }
      }
      line(0,1,g.bodyRoof,north?-1.8:.08,.065,'#c7d0bb');
    }
    for(const part of RED_CENTRE_ROOFS.filter(p=>p.building===b.id))polygon(roofs,part.points,part.height-.03,'#a5b29f',part.holes);
    if(g.gallery){
      const {points,floor,columns}=g.gallery;polygon(concrete,points,floor,'#c5cbb5');polygon(soffits,points,floor-.22,'#bec6af',[],true);
      addCollider({points,base:b.base,bottom:floor-.22,top:floor});
      for(const col of columns){
        const bottom=terrainHeight(col.x,col.z)-b.base;batchPipe(concrete,[col.x,bottom,col.z],[col.x,floor,col.z],.27,'#c2c8b1');addCollider({x:col.x,z:col.z,radius:.3,base:b.base,bottom,top:floor});
      }
      const l=-48,r=-4,v=-6.7;
      wallPanel(glass,framePoint(f,l,v),framePoint(f,r,v),floor+.1,floor+1.05,'#709393',.02);
      batchPipe(detail,at(l,v,floor+1.05),at(r,v,floor+1.05),.035,'#c6cebb');
      for(let u=l;u<=r;u+=2.2)batchBeam(detail,at(u,v,floor),at(u,v,floor+1.05),.024,'#c4cfb8');
      for(const u of [-43,-32,-22,-6]){
        concrete.quad(at(u-.3,-11.5,11.8),at(u-.3,-5.2,11.8),at(u-.3,-5.2,10.1),at(u-.3,-11.5,10.1),'#d1d1b8');
        concrete.quad(at(u+.3,-11.5,10.1),at(u+.3,-5.2,10.1),at(u+.3,-5.2,11.8),at(u+.3,-11.5,11.8),'#d1d1b8');
        soffits.quad(at(u-.3,-11.5,10.1),at(u+.3,-11.5,10.1),at(u+.3,-5.2,10.1),at(u-.3,-5.2,10.1),'#c0c6af');
      }
    }
    // Yellow portals follow the verified Mall view; their precise dimensions
    // and placement on reconstructed recess side walls remain estimates.
    for(const route of g.routes){const u=g.local(route.points[0]).u-2.0,v=-5.5;wallPanel(detail,framePoint(f,u,v),framePoint(f,u,v+3.5),.3,5.5,'#d7b93b',.06);}
    for(const plant of g.plants){
      const ring=plant.points;for(let i=0;i<4;i++){wallPanel(metal,ring[i],ring[(i+1)%4],plant.bottom,plant.top,silver);for(let y=plant.bottom+.4;y<plant.top;y+=.75)wallPanel(detail,ring[i],ring[(i+1)%4],y,y+.018,'#a6b4a0',.02);}
      polygon(roofs,ring,plant.top,'#bdc8b0');
    }
    for(const stack of g.stacks){
      for(let j=0;j<stack.count;j++){
        const u=stack.u+(j-(stack.count-1)/2)*.83,p=framePoint(f,u,stack.v);
        batchPipe(metal,[p.x,stack.bottom,p.z],[p.x,stack.top,p.z],.30,'#c7d1bd');
        for(const h of [34.0,36.7,39.3]){const q=framePoint(f,u,stack.v);detail.box(q.x,h,q.z,.66,.06,.66,'#8f9f8d',angle);}
        for(let h=39.35;h<39.9;h+=.14){const q=framePoint(f,u,stack.v);detail.box(q.x,h,q.z,.62,.025,.62,'#7e9180',angle);}
      }
    }
    for(const seat of g.benches){
      const y=terrainHeight(seat.x,seat.z)-b.base+.22;
      for(const v of [-.2,0,.2]){const p=framePoint(f,seat.u,seat.v+v);detail.box(p.x,y+.48,p.z,seat.width,.08,.15,'#9a8060',angle);}
      for(const u of [-.85,.85]){const p=framePoint(f,seat.u+u,seat.v);detail.box(p.x,y+.25,p.z,.12,.5,.5,'#52675a',angle);}
      addCollider({points:frameRectangle(f,seat.width,seat.depth,seat.u,seat.v),base:b.base,top:y+.55});
    }
    world.add(ceramic.mesh(style('#ffffff',{vertexColors:true,roughness:.8})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.35,roughness:.46})),soffits.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})));
  }

  function oldMainBuilding(b,concrete,brick,glass,detail,roofs){
    const g=oldMainGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),stone=new Batch(),stairs=new Batch(),relief=new Batch();stone.base=relief.base=b.base;stairs.base=0;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},ivory='#d4d3bb';
    for(const face of g.faces){
      const {a,c,len,normal:n}=face,au=g.local(a).u,cu=g.local(c).u,mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),south=mid.v>28&&n.x*f.v.x+n.z*f.v.z>.7;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      wallPanel(brick,a,c,0,b.height,'#a4765c');wallPanel(concrete,a,c,0,1.0,'#999586',.025);
      // Separate, pale timber/metal-looking multi-light frames, rather than
      // six repeated generic storeys. No source floor tags are overwritten.
      if(len>1.3)for(const [r,row]of g.rows.entries()){
        const count=Math.max(1,Math.round(len/3.5)),w=Math.min(1.9,len*.68/count);
        for(let j=0;j<count;j++){
          const t=(j+.5)/count,u=au+(cu-au)*t;if(south&&(u>66.7||(r<2&&u>57.3&&u<65.5)))continue;
          const l=t-w/len/2,h=t+w/len/2,low=row.low,high=row.high;
          wallPanel(detail,a,c,low-.13,high+.13,'#c5c0a5',.045,l-.09/len,h+.09/len);
          wallPanel(glass,a,c,low,high,(j+r)%4?'#627c79':'#8b9a8b',.075,l,h);
          for(const q of [l,t,h])batchBeam(detail,p(q,low,.10),p(q,high,.10),.032,ivory);
          for(const y of [low,low+(high-low)*.72,high])batchBeam(detail,p(l,y,.11),p(h,y,.11),.035,ivory);
          batchBeam(detail,p(l-.08/len,low-.14,.18),p(h+.08/len,low-.14,.18),.065,'#bdb9a0');
          if((j+r)%5===0)wallPanel(detail,a,c,high-.8,high-.12,'#b8bdac',.085,l+.05/len,h-.05/len);
        }
      }
      wallPanel(detail,a,c,b.height-.35,b.height,'#4c524b',.28);
      batchBeam(detail,p(0,b.height-.38,.30),p(1,b.height-.38,.30),.055,'#535c53');
    }
    polygon(roofs,b.points,b.height-.04,'#6d776b',b.holes);
    // Warm sandstone bay at the eastern end of the southern spine. The actual
    // source perimeter is retained behind this shallow exterior treatment.
    const panel=(u0,u1,v,low,high,color)=>wallPanel(stone,framePoint(f,u1,v),framePoint(f,u0,v),low,high,color);
    panel(66.8,72.2,31.94,0,b.height,'#c6a474');
    for(let y=1;y<b.height;y+=2)batchBeam(detail,at(66.8,31.98,y),at(72.2,31.98,y),.018,'#a58a66');
    for(const u of [68.6,70.4])batchBeam(detail,at(u,31.98,.2),at(u,31.98,b.height-.4),.018,'#aa916d');
    const floor=g.stairs.landing.rl-b.base;
    panel(57.7,65.3,32.00,floor-.05,floor+3.6,'#b6a181');
    wallPanel(glass,framePoint(f,64.8,32.05),framePoint(f,58.2,32.05),floor,floor+3.1,'#3f5b54');
    for(const u of [58.2,60.4,62.6,64.8])batchBeam(detail,at(u,32.14,floor),at(u,32.14,floor+3.1),.04,'#b9c1ad');
    batchBeam(detail,at(58.2,32.14,floor+2.45),at(64.8,32.14,floor+2.45),.04,'#b9c1ad');
    facadeCaption(b,framePoint(f,65.3,32),framePoint(f,57.7,32),'OLD MAIN  K15',5.4,floor+3.85,'#ded8bc');
    for(const part of g.stairs.parts){
      polygon(stairs,part.points,part.rl,'#aaa592');
      for(let i=0;i<part.points.length;i++){const a=part.points[i],c=part.points[(i+1)%part.points.length];wallPanel(stairs,a,c,Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.05,part.rl,'#8e8a78');}
      groundPatches.push({points:part.points,heightAt:()=>part.rl+.01});addCollider({points:part.points,base:0,top:part.rl,stepHeight:.27});
    }
    const railFlight=(width,from,to,low,high)=>{
      for(const side of [-1,1]){
        const u=g.stairs.u+side*(width/2-.12);batchPipe(detail,at(u,from,low+.92),at(u,to,high+.92),.025,'#c7cbbb');
        const count=Math.ceil((from-to)/1.2);for(let i=0;i<=count;i++){const t=i/count,v=from+(to-from)*t,y=low+(high-low)*t;batchPipe(detail,at(u,v,y),at(u,v,y+.92),.022,'#b4bfad');}
      }
    };
    const low=g.stairs.low-b.base+.05;railFlight(5.8,g.stairs.bottomV,g.stairs.lowerTop,low,low+.51);railFlight(2.8,g.stairs.middleTop,g.stairs.upperTop,low+.51,floor);
    for(const [l,r]of [[57.7,58.5],[61.5,68.5]]){
      batchPipe(detail,at(l,33.72,floor+.95),at(r,33.72,floor+.95),.028,'#c5cab8');
      for(let u=l;u<=r+.01;u+=.22)batchPipe(detail,at(u,33.72,floor),at(u,33.72,floor+.95),.016,'#bdc5b3');
    }
    // A deliberately simplified low-poly interpretation of Tom Bass's relief.
    // All points are procedural geometry; no reference photograph is embedded.
    const art=(x,y)=>at(69.45+x*.72,32.13,5.9+(y-5.9)*.5),bronze='#48524a';
    const outline=(points,width=.085)=>{for(let i=1;i<points.length;i++)batchBeam(relief,art(...points[i-1]),art(...points[i]),width,bronze);};
    const shape=points=>{const v=points.map(p=>new THREE.Vector2(...p)),tri=THREE.ShapeUtils.triangulateShape(v,[]);for(const t of tri)relief.triangle(...t.map(i=>art(...points[i])),bronze);};
    shape([[-1.7,7.9],[-1.1,9.1],[.7,9.0],[1.3,8.1],[.3,7.5]]); // horse body
    shape([[.6,8.6],[1.1,10.6],[1.9,11.4],[2.1,10.8],[1.6,8.1]]);
    shape([[1.2,10.7],[1.5,11.8],[1.8,11.4],[2.3,11.3],[2.0,10.9]]);
    for(const chain of [[[-1.4,8.1],[-1.1,6.3],[-.7,6.0]],[[-.8,8.1],[.1,6.4],[.6,6.2]],[[.4,8.1],[.6,6.1],[1.0,6.0]],[[1,8.2],[1.8,7.0],[1.3,6.7]],[[-1.4,8.8],[-2,8.3],[-2.1,7.2]]])outline(chain,.13);
    outline([[-2.1,5.9],[1.8,5.9]],.16);
    shape([[-.65,8.7],[-.8,10.9],[-.2,11.4],[.2,10.6],[.1,8.8]]);
    shape([[-.8,11.0],[-1,11.6],[-.5,12],[-.1,11.7],[-.25,11.1]]);
    outline([[0,10.7],[.8,11.5],[.7,13.4]],.12);outline([[-.6,10.7],[-1.7,11.6],[-1.75,13.0]],.12);
    shape([[-2,13],[-2,14.1],[-1.6,14.5],[-1.3,14.1],[-1.0,12.8],[-1.65,13.1]]); // falcon
    outline([[.7,13.1],[1,14.7],[1.2,15.8]],.15);
    for(const [x,y]of [[.4,16.5],[1,16.8],[1.65,16.5],[2,16.0]]){outline([[1,14.7],[x,y]],.10);shape([[x-.22,y-.1],[x,y+.45],[x+.23,y-.1]]);}
    for(const chain of [[[-1.7,10.1],[-2.4,17.7],[-1.6,20.8],[.1,21.0]],[[1.6,11.1],[2.3,19.2],[.1,21.0]],[[.1,21.0],[-.3,16.0],[-.5,8.95]]])for(let i=1;i<chain.length;i++){const point=([x,y])=>at(69.45+x*.72,32.13,y);batchBeam(relief,point(chain[i-1]),point(chain[i]),.022,bronze);}
    addCollider({points:b.points,holes:b.holes,base:b.base,top:b.height});
    world.add(stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),stairs.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),relief.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.5,roughness:.45})));
  }

  function businessSchool(b,concrete,brick,glass,detail,roofs){
    const g=businessGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),metal=new Batch(),awningGlass=new Batch(),undersides=new Batch();
    for(const batch of [metal,awningGlass,undersides])batch.base=b.base;
    const dark='#354a4b',pale='#d7ddd1',at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    for(const face of g.faces){
      const {a,c,len,normal:n,kind}=face,au=g.local(a).u,cu=g.local(c).u;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      const band=(batch,low,high,color,off=0,l=0,r=1)=>wallPanel(batch,a,c,low,high,color,off,l,r);
      const rail=(low,off=.15,radius=.025,color='#83958a',l=0,r=1)=>batchBeam(detail,p(l,low,off),p(r,low,off),radius,color);
      band(kind==='east-brick'?brick:concrete,0,b.height,kind==='east-brick'?'#92725b':'#c5cfc2');
      band(detail,0,.6,'#929c8b',.03);
      if(kind==='west-cladding'){
        band(metal,.6,b.height-.5,pale,.035);
        for(let h=1;h<b.height-.5;h+=1.9)rail(h,.055,.012,'#a3afa3');
        for(let d=1.4;d<len;d+=2.1)batchBeam(detail,p(d/len,.6,.055),p(d/len,b.height-.5,.055),.012,'#a6b1a4');
        if(len>12)for(const [i,text]of ['UNSW','Business','School'].entries())facadeCaption(b,a,c,text,2.6,4.5-i*.48,'#344a47');
      }else if(kind==='east-brick'){
        for(const row of g.rows){
          band(detail,row.low-.5,row.low-.32,'#c2c4ad',.06);
          const av=g.local(a).v,cv=g.local(c).v,den=cv-av,t=Math.abs(den)>.01?Math.max(.12,Math.min(.88,(10.2-av)/den)):.5,w=Math.min(.15,.56/len);
          band(glass,row.low+.3,row.high-.3,'#315456',.065,t-w,t+w);
          band(detail,row.low+.25,row.low+.35,'#9caea0',.085,t-w,t+w);
        }
      }else if(kind==='stair-core'){
        band(metal,.6,b.height-.5,'#ced8cb',.035);
        for(const row of g.rows){band(glass,row.low+.75,row.low+1.45,'#425d59',.06,.06,.94);band(detail,row.low+1.45,row.low+1.55,'#a7b9a8',.12,.05,.95);}
        for(let d=2;d<len;d+=2.3)batchBeam(detail,p(d/len,.7,.06),p(d/len,b.height-.5,.06),.012,'#a5b5a6');
      }else{
        // Recessed dark ground frontage, vent grilles and slim structural piers.
        band(glass,.72,4.72,'#3f615c',.055,.005,.995);
        band(detail,4.72,5.02,'#354d49',.07);
        for(let h=4.3;h<4.69;h+=.13)band(detail,h,h+.055,'#4a6059',.13);
        const groundBays=Math.max(1,Math.round(len/4.4));
        for(let i=0;i<=groundBays;i++){
          const t=i/groundBays,q=p(t,2.7,.24);detail.box(q[0],2.7,q[2],.27,4.25,.48,'#52675e',Math.atan2(-(c.z-a.z),c.x-a.x));
          if(i<groundBays){const m=(i+.5)/groundBays;batchBeam(detail,p(m,.72,.08),p(m,4.3,.08),.025,'#97a99a');}
        }
        for(const [rowIndex,row]of g.rows.entries()){
          const count=Math.max(1,Math.round(len/3.0));
          band(glass,row.low,row.high,kind==='south-grid'?'#5b8287':'#597d7a',.055,.005,.995);
          if(kind==='north-shades'){
            band(metal,row.low-.63,row.low-.03,pale,.1);
            // Five horizontal blades sit in front of each upper window band.
            for(let k=0;k<5;k++){
              const h=row.low+.35+k*(row.high-row.low-.5)/5;
              metal.quad(p(.005,h-.10,.18),p(.995,h-.10,.18),p(.995,h+.08,.94),p(.005,h+.08,.94),'#d0dbce');
              metal.quad(p(.005,h-.16,.18),p(.005,h+.02,.94),p(.995,h+.02,.94),p(.995,h-.16,.18),'#abbcae');
              metal.quad(p(.005,h+.02,.94),p(.005,h+.08,.94),p(.995,h+.08,.94),p(.995,h+.02,.94),'#d5e0d1');
            }
            for(let i=0;i<=count;i++){const t=i/count;batchBeam(detail,p(t,row.low-.05,1.0),p(t,row.high+.04,1.0),.045,'#bacfbd');}
            rail(row.high,.12,.025,'#a7bfae');
          }else{
            band(metal,row.low-.62,row.low-.07,pale,.56);
            undersides.quad(p(0,row.low-.62,.03),p(1,row.low-.62,.03),p(1,row.low-.62,.65),p(0,row.low-.62,.65),'#abbda9');
            for(let i=0;i<=count;i++){
              const t=i/count,q=p(t,(row.low+row.high)/2,.35),h=row.high-row.low+.2;
              concrete.box(q[0],q[1],q[2],.18,h,.70,'#d3dfcc',Math.atan2(-(c.z-a.z),c.x-a.x));
            }
            // A blue glazed zone interrupts the regular grid at the middle.
            const t0=(-2-au)/(cu-au),t1=(10-au)/(cu-au),l=Math.max(0,Math.min(t0,t1)),r=Math.min(1,Math.max(t0,t1));
            if(rowIndex>=3&&r>l){band(glass,row.low-.55,row.high+.05,'#668fa4',.74,l,r);for(let d=l*len;d<r*len;d+=2)batchBeam(detail,p(d/len,row.low-.55,.77),p(d/len,row.high+.05,.77),.026,'#b1c7c5');}
            for(const h of [row.low+.5,row.low+.9])rail(h,.13,.025,'#9db4a8');
            for(let i=0;i<count;i++){
              const l=(i+.08)/count,r=(i+.92)/count;
              band(detail,row.high-.72,row.high-.67,'#7e9d92',.14,l,r);
              if(rowIndex>=2)for(let h=row.low+.10;h<row.low+.5;h+=.12)band(detail,h,h+.035,'#9eb9aa',.16,l,r);
              batchBeam(detail,p((i+.5)/count,row.low,.12),p((i+.5)/count,row.high,.12),.025,'#a8bfb1');
            }
          }
        }
        if(kind==='south-grid'){
          const y=g.awningHeight,d=g.awningDepth;
          const cuts=[0,1];if(Math.abs(cu-au)>.01)for(const u of [g.canopy.u-g.canopy.width/2,g.canopy.u+g.canopy.width/2]){const t=(u-au)/(cu-au);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
          for(let i=0;i<cuts.length-1;i++){const l=cuts[i],r=cuts[i+1],u=au+(cu-au)*(l+r)/2;if(Math.abs(u-g.canopy.u)<g.canopy.width/2)continue;awningGlass.quad(p(l,y,.08),p(l,y,d),p(r,y,d),p(r,y,.08),'#a2c4bd');rail(y-.1,d,.055,'#b0c8b8',l,r);}
          for(let d0=.4;d0<len;d0+=2.2){const t=d0/len,u=au+(cu-au)*t;if(Math.abs(u-g.canopy.u)<g.canopy.width/2)continue;batchBeam(detail,p(t,y-.1,.04),p(t,y-.1,d),.055,'#c0d2c0');}
        }
      }
      band(metal,b.height-.55,b.height,'#d0dac8',.30);
      undersides.quad(p(0,b.height-.55,.01),p(1,b.height-.55,.01),p(1,b.height-.55,.52),p(0,b.height-.55,.52),'#adbda8');
    }
    polygon(roofs,b.points,b.height-.04,'#abb8aa',b.holes);
    // The entrance stair uses exact bounded tread patches, avoiding the round
    // end caps of the general mapped-stair walking helper on a broad flight.
    const stairMesh=new Batch();stairMesh.base=0;
    for(const [i,step]of g.stairs.steps.entries()){
      polygon(stairMesh,step.points,step.rl,'#aeb6a7');
      const previous=i?g.stairs.steps[i-1].rl:g.stairs.low-.08;
      for(let j=0;j<step.points.length;j++){
        const a=step.points[j],c=step.points[(j+1)%step.points.length],bottom=j===2?previous:Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.05;
        wallPanel(stairMesh,a,c,bottom,step.rl,'#929e90');
      }
      groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,base:0,top:step.rl,stepHeight:.27});
    }
    polygon(stairMesh,g.stairs.landing.points,g.stairs.landing.rl,'#b1b9aa');
    for(let i=0;i<g.stairs.landing.points.length;i++){const a=g.stairs.landing.points[i],c=g.stairs.landing.points[(i+1)%g.stairs.landing.points.length];wallPanel(stairMesh,a,c,Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.05,g.stairs.landing.rl,'#929f8f');}
    groundPatches.push({points:g.stairs.landing.points,heightAt:()=>g.stairs.landing.rl+.01});addCollider({points:g.stairs.landing.points,base:0,top:g.stairs.landing.rl,stepHeight:.27});
    const floor=g.stairs.landing.rl-b.base,doorLeft=g.stairs.u-3.7,doorRight=g.stairs.u+3.7;
    const doorA=framePoint(f,doorLeft,14.11),doorC=framePoint(f,doorRight,14.11);
    wallPanel(glass,doorC,doorA,floor,floor+3.0,'#3a6059',.09);
    for(const u of [doorLeft,g.stairs.u,doorRight])batchBeam(detail,at(u,14.24,floor),at(u,14.24,floor+3),.035,'#adc0aa');
    for(const side of [-1,1]){
      const u=g.stairs.u+side*(g.stairs.width/2-.2),a=at(u,g.stairs.bottomV,g.stairs.low-b.base+.85),c=at(u,g.stairs.topV,floor+.85);
      batchPipe(detail,a,c,.027,'#bac8b1');batchPipe(detail,c,at(u,g.stairs.wallV,floor+.85),.027,'#bac8b1');
      for(let i=0;i<4;i++){const t=i/3,v=g.stairs.bottomV+(g.stairs.topV-g.stairs.bottomV)*t,y=g.stairs.low+g.stairs.rise*t-b.base;batchPipe(detail,at(u,v,y),at(u,v,y+.85),.025,'#a6b6a1');}
    }
    const canopy=g.canopy,w=canopy.width/2,canopyPoint=(u,v,y)=>at(canopy.u+u,v,y);
    const canopyFaces=businessCanopyFaces(g);
    metal.quad(...canopyFaces.top,'#c0ccba');undersides.quad(...canopyFaces.bottom,'#d0d6c3');
    for(const face of canopyFaces.sides)metal.quad(...face,'#bac8b6');
    for(let u=-w+1.8;u<w;u+=1.8){batchBeam(detail,canopyPoint(u,canopy.backV,canopy.back+.015),canopyPoint(u,canopy.frontV-.35,canopy.front+.015),.014,'#667f71');batchBeam(detail,canopyPoint(u,canopy.frontV-.345,canopy.front),canopyPoint(u,canopy.frontV+.01,canopy.frontBottom),.014,'#6d8273');}
    addCollider({points:frameRectangle(f,canopy.width,canopy.frontV-canopy.backV,canopy.u,(canopy.frontV+canopy.backV)/2),base:b.base,bottom:canopy.frontBottom,top:canopy.back});
    facadeCaption(b,doorC,doorA,'UNSW Business School',6.8,floor+3.25,'#cbd5bf');
    // Two timber seats use photographed forecourt character and clear every
    // retained path envelope; their precise positions are estimates.
    const seats=new Batch(),seatPaving=new Batch();seatPaving.base=null;
    for(const seat of g.benches){
      const y=terrainHeight(seat.x,seat.z);seats.base=y;
      for(const v of [-.2,0,.2]){const p=framePoint(f,seat.u,seat.v+v);seats.box(p.x,.53,p.z,seat.width,.08,.15,'#897660',angle);}
      for(const u of [-.8,.8]){const p=framePoint(f,seat.u+u,seat.v);seats.box(p.x,.28,p.z,.12,.5,.48,'#52645a',angle);}
      const points=frameRectangle(f,2.7,1.6,seat.u,seat.v);polygon(seatPaving,points,.22,'#a7b3a0');addCollider({points:frameRectangle(f,seat.width,seat.depth,seat.u,seat.v),top:.57,base:y});
    }
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.32,roughness:.48})),awningGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide,roughness:.15})),undersides.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),stairMesh.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),seats.mesh(style('#ffffff',{vertexColors:true})),seatPaving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})));
  }

  function lawBuilding(b){
    const g=lawGeometry(b),metal=new Batch(),glass=new Batch(),joints=new Batch(),concrete=new Batch(),roof=new Batch();
    for(const batch of [metal,glass,joints,concrete,roof])batch.base=b.base;
    const charcoal='#303c41',seam='#697574',silver=['#bfc3b6','#c9cabb','#d1ccae'],gold=['#c2b77f','#cfc395','#b8af83'];
    for(const face of g.faces){
      const {a,c,len,normal:n,kind}=face,au=g.local(a).u,cu=g.local(c).u;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      const top=t=>g.roofAt({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
      const plane=(batch,l,r,low,high,color,off=0)=>{
        if(r-l<.00001)return;const lo=t=>typeof low==='function'?low(t):low,hi=t=>typeof high==='function'?high(t):high;
        if(Math.min(hi(l)-lo(l),hi(r)-lo(r))<=0)return;
        batch.quad(p(l,lo(l),off),p(l,hi(l),off),p(r,hi(r),off),p(r,lo(r),off),color,[[l*len/2,lo(l)/2],[l*len/2,hi(l)/2],[r*len/2,hi(r)/2],[r*len/2,lo(r)/2]]);
      };
      const line=(l,r,y,off=.1,width=.025,color=seam)=>batchBeam(joints,p(l,typeof y==='function'?y(l):y,off),p(r,typeof y==='function'?y(r):y,off),width,color);
      // Smooth metal shell and a low concrete plinth follow the retained ring.
      plane(metal,0,1,0,top,charcoal);
      plane(concrete,0,1,0,.82,'#93998b',.015);
      plane(glass,0,1,.82,t=>top(t)-.26,'#527472',.055);
      const cut=kind==='mall'?-3:2;
      const cuts=[0,1];if(Math.abs(cu-au)>.01){const t=(cut-au)/(cu-au);if(t>0&&t<1)cuts.splice(1,0,t);}
      if(kind==='mall'||kind==='union')for(let section=0;section<cuts.length-1;section++){
        const l=cuts[section],r=cuts[section+1],u=(au+(cu-au)*(l+r)/2),folded=u>cut;
        if(!folded){
          const bands=kind==='mall'?g.mallBands:g.unionBands;
          for(const [low,high] of bands){
            // Projecting dark spandrels have a pale underside and beveled return.
            metal.quad(p(l,low,1.02),p(l,high,.67),p(r,high,.67),p(r,low,1.02),charcoal);
            concrete.quad(p(l,low,.04),p(r,low,.04),p(r,low,1.02),p(l,low,1.02),'#c6cabb');
            for(const t of [l,r])metal.quad(p(t,low,.04),p(t,high,.04),p(t,high,.67),p(t,low,1.02),'#253439');
            line(l,r,low,1.04,.028,'#697774');line(l,r,high,.69,.025,'#7c8983');
            const count=Math.max(1,Math.ceil((r-l)*len/2.6));
            for(let i=1;i<count;i++){const t=l+(r-l)*i/count;batchBeam(joints,p(t,low+.05,1.02),p(t,high-.04,.69),.012,'#1f3033');}
          }
          plane(metal,l,r,t=>top(t)-.65,top,charcoal,.76);line(l,r,t=>top(t),.79,.045,'#8c9890');
          const rows=kind==='mall'?[[.86,5.6],[6.8,8.7],[10,11.9],[12.85,14.6]]:[[.86,3.35],[4.7,6.8],[8.05,10.15],[11.45,14.6]];
          for(const [low,high]of rows){
            const count=Math.max(1,Math.round((r-l)*len/1.55));
            for(let i=0;i<=count;i++){const t=l+(r-l)*i/count,h=Math.min(high,top(t)-.68);if(h>low)batchBeam(joints,p(t,low,.075),p(t,h,.075),.022,'#8f9f92');}
            if(low<5.5)line(l,r,(low+high)/2,.08,.021,'#819586');
          }
          for(const t of [l,r]){
            const h=top(t),w=Math.min(.42/len,(r-l)/6);
            plane(metal,Math.max(l,t-w),Math.min(r,t+w),.8,h,charcoal,.82);
          }
        }else{
          const south=kind==='mall',uAt=t=>au+(cu-au)*t;
          const slope=t=>south?Math.max(.95,Math.min(5.0,1.0+(uAt(t)+3)*.14)):3.25;
          const count=Math.max(1,Math.ceil((r-l)*len/3.2));
          for(let k=0;k<count;k++){
            const x=l+(r-l)*k/count,y=l+(r-l)*(k+1)/count,shift=Math.min((y-x)*.12,.32/len),off=k%3===0?.58:.32;
            // Large uninterrupted gold planes, separated by diagonal glazing slits.
            metal.quad(p(x+shift,slope(x)+1.04,off+.18),p(x,top(x)-.23,off),p(y-.025/len,top(y)-.23,off),p(y+shift-.04/len,slope(y)+1.04,off+.18),gold[k%3]);
            for(const h of [6.65,10.1])if(h>Math.max(slope(x),slope(y))+1.2)line(x+.035/len,y-.04/len,h,off+.2,.014,'#a39f7c');
            if(k>0)batchBeam(joints,p(x+shift,slope(x)+1.05,off+.2),p(x,top(x)-.23,off+.02),.019,'#9a9f84');
          }
          metal.quad(p(l,slope(l),.95),p(l,slope(l)+1.05,.76),p(r,slope(r)+1.05,.76),p(r,slope(r),.95),charcoal);
          concrete.quad(p(l,slope(l),.02),p(r,slope(r),.02),p(r,slope(r),.95),p(l,slope(l),.95),'#d0d2bc');
          line(l,r,slope,.96,.035,'#6b7a73');
          for(let d=l*len+.6;d<r*len;d+=1.6){const t=d/len;batchBeam(joints,p(t,.85,.08),p(t,Math.max(1.6,slope(t)),.08),.025,'#778e85');}
          plane(metal,l,r,t=>top(t)-.25,top,charcoal,.42);
        }
      }else{
        // The side elevation is a sequence of full-height folded silver piers,
        // not the small decorative triangles of the old generic facade.
        const count=Math.max(1,Math.round(len/3.8));
        for(let k=0;k<count;k++){
          const l=k/count,r=(k+1)/count,w=r-l,shift=w*.28;
          const lower=l+w*.08,upper=l+w*.05,right=r-w*.21;
          const off=k%3===1?.7:.42;
          metal.quad(p(lower+shift,.25,off+.15),p(upper,top(upper)-.2,off),p(right,top(right)-.2,off),p(right-shift,.25,off+.15),silver[k%3]);
          metal.quad(p(lower+shift,.25,.05),p(upper,top(upper)-.2,.05),p(upper,top(upper)-.2,off),p(lower+shift,.25,off+.15),'#4e5f61');
          for(const h of [4.3,8.25,11.55]){
            const leftMix=(h-.25)/(top(upper)-.45),rightMix=(h-.25)/(top(right)-.45),left=lower+shift+(upper-lower-shift)*leftMix,rightAt=right-shift+shift*rightMix;
            line(left+.02/len,rightAt-.02/len,h,off+.15*(1-leftMix)+.012,.012,'#8e9b91');
          }
        }
        for(const h of [4.3,8.25,11.55])line(0,1,h,.08,.022,'#84998f');
        plane(metal,0,1,t=>top(t)-.2,top,'#9ca99e',.24);
      }
      // A fine continuous folded perimeter edge replaces the flat parapet.
      line(0,1,top,.28,.035,'#88958e');
    }
    shapedRoof(roof,b.points,g.roofAt,'#9aa59d');
    // Closed entrance glazing is exterior detail; the occupied shell stays solid.
    for(const face of g.faces.filter(f=>(f.kind==='mall'||f.kind==='union')&&f.mid.u>0&&f.len>5)){
      const {a,c,len,normal:n}=face,t=.5,w=Math.min(.24,1.7/len),ground=Math.max(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-b.base;
      wallPanel(glass,a,c,ground+.05,ground+2.55,'#365652',.13,t-w,t+w);
      for(const x of [t-w,t,t+w])batchBeam(joints,[a.x+(c.x-a.x)*x+n.x*.16,ground+.05,a.z+(c.z-a.z)*x+n.z*.16],[a.x+(c.x-a.x)*x+n.x*.16,ground+2.55,a.z+(c.z-a.z)*x+n.z*.16],.025,'#a6b0a0');
      for(const x of [t-.08,t+.08]){const px=a.x+(c.x-a.x)*x+n.x*.19,pz=a.z+(c.z-a.z)*x+n.z*.19;batchPipe(joints,[px,ground+.85,pz],[px,ground+1.35,pz],.018,'#c2c9b7');}
    }
    const label=g.faces.find(f=>f.kind==='mall'&&f.mid.u>15&&f.len>8);
    if(label)facadeCaption(b,label.a,label.c,'Law & Justice Building',5.5,3.0,'#c6ccbb');
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    const glazing=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.12,metalness:.62,envMapIntensity:1.0}));
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,roughness:.39,metalness:.48})),joints.mesh(style('#ffffff',{vertexColors:true,roughness:.42,metalness:.35})),concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpScale:.02})),roof.mesh(style('#ffffff',{vertexColors:true,roughness:.7,metalness:.25})),glazing);
    medicalReflection(glazing,framePoint(g.frame,-13,29),b.base+7);
  }

  function quadrangleBuilding(b,concrete,brick,glass,detail,roofs){
    const g=quadrangleGeometry(b),f=g.frame,y=rl=>rl-b.base,angle=Math.atan2(-f.u.z,f.u.x);
    const original=(a,c)=>b.points.some((p,i)=>{const q=b.points[(i+1)%b.points.length],dx=q.x-p.x,dz=q.z-p.z,len=Math.hypot(dx,dz),t=r=>((r.x-p.x)*dx+(r.z-p.z)*dz)/(len*len);return Math.abs(dx*(a.z-p.z)-dz*(a.x-p.x))/len<.015&&Math.abs(dx*(c.z-p.z)-dz*(c.x-p.x))/len<.015&&Math.min(t(a),t(c))>-.001&&Math.max(t(a),t(c))<1.001;});
    const floor=new Batch();
    for(const part of QUADRANGLE_PARTS){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points,covered=part.kind!=='main',bottom=covered?y(part.kind==='east-link'?g.eastBottom:g.ceilingRL):0;
      shapedRoof(roofs,part.points,p=>y(g.roofAt(p)),'#a8b4a6',part.holes);
      if(covered&&bottom<y(g.ceilingRL)+.3)polygon(concrete,part.points,y(g.galleryTopRL),'#c4cbb9',part.holes,true);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),ext=original(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
        const court=ext&&(nv<-.7&&mid.v<10&&mid.v>0&&mid.u>-31&&mid.u<53||nu>.7&&mid.u>-35&&mid.u<-28&&mid.v<10||nu<-.7&&mid.u>51&&mid.u<57&&mid.v<10);
        const clock=ext&&mid.u>g.tower.u-3.7&&mid.u<g.tower.u+3.7&&mid.v<10;
        const top=Math.min(y(g.roofAt(a)),y(g.roofAt(c))),deck=y(g.ceilingRL)+.24,galleryTop=y(g.galleryTopRL),clerestory=y(g.clerestoryRL);
        const p=(t,h,off=0)=>[a.x+(c.x-a.x)*t+nx*off,h,a.z+(c.z-a.z)*t+nz*off];
        if(clock)continue;
        if(court&&covered&&bottom<deck+.1){
          wallPanel(brick,a,c,bottom,deck+.68,'#b8a274');
          // A real recess between the gallery parapet and soffit, with the
          // occupied wing wall behind, replaces the former opaque fake arcade.
          for(const h of [deck+.9,deck+1.15])batchBeam(detail,p(0,h,.11),p(1,h,.11),.035,'#55716d');
          for(let d=.2;d<len;d+=2.2)batchBeam(detail,p(d/len,deck+.6,.11),p(d/len,deck+1.15,.11),.03,'#627c75');
          for(let d=.3;d<len;d+=4.4)batchBeam(detail,p(d/len,deck,.12),p(d/len,galleryTop,.12),.055,'#607c78');
        }else wallPanel(brick,a,c,bottom,Math.max(bottom,galleryTop),'#b99c6e');
        if(ext){
          wallPanel(concrete,a,c,Math.max(bottom,galleryTop),clerestory,'#d4c08e',.025);
          wallPanel(glass,a,c,Math.max(bottom,clerestory),top-.14,'#456d72',.045);
          wallPanel(detail,a,c,clerestory-.16,clerestory+.02,'#546d69',.09);
          wallPanel(detail,a,c,top-.15,top+.05,'#c8cbb6',.38);
          if(len>3){
            const bays=Math.max(1,Math.round(len/3.1)),w=1/bays;
            for(let k=0;k<bays;k++){
              const l=k*w+w*.16,r=(k+1)*w-w*.16,low=Math.max(galleryTop+.55,bottom+.3),high=clerestory-.45;
              if(high>low){
                wallPanel(glass,a,c,low,high,'#35575b',.075,l,r);
                for(const h of [low-.07,high])wallPanel(detail,a,c,h,h+.08,'#b3b99e',.10,l-.08/len,r+.08/len);
                if(k%4!==2){for(let h=low+.12;h<high;h+=.18)wallPanel(detail,a,c,h,h+.035,'#7a8980',.11,l,r);}
                else wallPanel(detail,a,c,low,high,'#aab6a4',.12,(l+r)/2-.04/len,(l+r)/2+.04/len);
              }
              wallPanel(detail,a,c,Math.max(bottom,clerestory),top-.15,'#54716c',.10,k*w-.035/len,k*w+.035/len);
              if(!court&&bottom<galleryTop-2){
                const l0=l+.1*w,r0=r-.1*w;
                wallPanel(glass,a,c,Math.max(bottom+.7,y(g.courtRL)+.7),Math.max(bottom+1.3,y(g.courtRL)+2.7),'#48615c',.055,l0,r0);
              }
              if(court&&k%6===3&&len>12){
                const bl=Math.max(0,k*w-w*.7),br=Math.min(1,(k+1)*w+w*.7),level=galleryTop+.12,hood=clerestory-.05;
                detail.quad(p(bl,level,.03),p(br,level,.03),p(br,level,1.35),p(bl,level,1.35),'#b4bea9');
                detail.quad(p(bl,level-.17,1.35),p(br,level-.17,1.35),p(br,level,1.35),p(bl,level,1.35),'#aab59f');
                for(const h of [level+.45,level+.75,level+1.0])batchBeam(detail,p(bl,h,1.28),p(br,h,1.28),.027,'#4e6c69');
                for(const t of [bl,br]){batchBeam(detail,p(t,level,1.28),p(t,level+1.0,1.28),.04,'#506e6a');batchBeam(detail,p(t,hood+.35,.1),p(t,hood,1.45),.055,'#59736d');}
                detail.quad(p(bl,hood,.02),p(br,hood,.02),p(br,hood,1.5),p(bl,hood,1.5),'#6c8276');
                wallPanel(glass,a,c,level+.05,hood-.15,'#406b70',.13,bl+.12/len,br-.12/len);
                for(let i=1;i<4;i++){const t=bl+(br-bl)*i/4;wallPanel(detail,a,c,level+.05,hood-.15,'#97afa1',.145,t-.04/len,t+.04/len);}
              }
            }
          }
          // Angled blue-grey brackets support the high glazing and eave.
          if(court)for(let d=.5;d<len;d+=6.2)batchBeam(detail,p(d/len,clerestory+.1,.13),p(d/len,top-.1,.6),.07,'#426564');
        }else wallPanel(brick,a,c,Math.max(bottom,galleryTop),top,'#b99c6e');
        const galleryBack=!ext&&part.kind==='main'&&(Math.abs(mid.v-10.3)<.03&&nv<-.7||Math.abs(mid.u+34.7)<.03&&nu>.7||Math.abs(mid.u-56.5)<.03&&nu<-.7);
        if(galleryBack){
          for(const [lo,hi]of [[y(g.courtRL)+.45,y(g.ceilingRL)-.35],[deck+.45,galleryTop-.25]]){
            wallPanel(glass,a,c,lo,hi,'#2d4644',.05,.02,.98);
            for(let d=.4;d<len;d+=3.2)wallPanel(detail,a,c,lo,hi,'#81917e',.075,d/len,Math.min(.98,(d+.07)/len));
          }
        }
      }
      if(covered){
        polygon(concrete,part.points,bottom,'#c5cbb8',part.holes,true);polygon(concrete,part.points,bottom+.24,'#b8c1ac',part.holes);
        polygon(floor,part.points,.225,'#acaa91',part.holes);
        groundPatches.push({points:part.points,heightAt:(x,z)=>terrainHeight(x,z)+.225});
      }
      addCollider({points:part.points,holes:part.holes,bottom,top:Math.max(...part.points.map(p=>y(g.roofAt(p)))),base:b.base});
    }
    for(const column of g.columns){
      const bottom=terrainHeight(column.x,column.z)-b.base,top=y(g.ceilingRL),h=top-bottom;
      brick.box(column.x,bottom+h/2,column.z,.48,h,.65,'#b99a67',angle);
      detail.box(column.x+f.u.x*.25,bottom+h/2,column.z+f.u.z*.25,.10,h,.68,'#dbd6b8',angle);
      if(Math.abs(column.v-5.65)<.01)detail.box(column.x+f.v.x*.5,top+.10,column.z+f.v.z*.5,.56,.20,1.5,'#c4cbb9',angle);
      addCollider({x:column.x,z:column.z,radius:.32,base:b.base,top});
    }
    // Stepped brick tower at the mapped central projection. The open ground
    // portal, upper arch and open steel-tied crown are independent components.
    const t=g.tower,towerBase=t.ground-b.base,at=(u,v)=>framePoint(f,t.u+u,t.northV+v);
    const box=(u,v,w,d,lo,hi,color,batch=brick)=>{const p=at(u,v);batch.box(p.x,towerBase+(lo+hi)/2,p.z,w,hi-lo,d,color,angle);};
    for(const u of [-2.7,2.7])for(const v of [.5,6.7]){box(u,v,1.2,1.05,0,4.25,'#b49a6a');const p=at(u,v);addCollider({points:frameRectangle(f,1.2,1.05,t.u+u,t.northV+v),base:t.ground,top:4.25});}
    box(0,3.6,6.8,7.35,4.25,4.55,'#d6d4ba',detail);
    for(const u of [-2.7,2.7])box(u,3.6,1.2,7.2,4.55,8.3,'#b49a6a');
    const spring=6.0,apex=7.85;
    wallPanel(glass,at(-2.1,3.5),at(2.1,3.5),towerBase+4.55,towerBase+7.9,'#2b4240',.04);
    for(const h of [5.0,5.3,5.6]){const a=at(-2.1,-.12),c=at(2.1,-.12);batchBeam(detail,[a.x,towerBase+h,a.z],[c.x,towerBase+h,c.z],.025,'#526c61');}
    for(let k=0;k<20;k++){
      const u0=-2.1+4.2*k/20,u1=-2.1+4.2*(k+1)/20,a=at(u0,-.02),c=at(u1,-.02),h0=spring+(apex-spring)*Math.sqrt(Math.max(0,1-(u0/2.1)**2)),h1=spring+(apex-spring)*Math.sqrt(Math.max(0,1-(u1/2.1)**2));
      brick.quad([a.x,towerBase+h0,a.z],[a.x,towerBase+8.3,a.z],[c.x,towerBase+8.3,c.z],[c.x,towerBase+h1,c.z],'#b49a6a');
    }
    box(0,3.6,6.6,7.2,8.3,22.8,'#b49a6a');
    for(const level of [8.3,12,17.7,22.8])box(0,3.6,6.85,7.45,level,level+.14,'#d0c7a6',detail);
    const fa=at(-3.3,-.025),fc=at(3.3,-.025);
    for(const [lo,hi,width]of [[9.1,11.3,.9],[18.2,19.2,1.4],[19.9,22.45,3.3]]){
      const l=(6.6-width)/13.2,r=1-l;wallPanel(detail,fa,fc,towerBase+lo-.07,towerBase+hi+.07,'#c1c3a8',.03,l-.01,r+.01);wallPanel(detail,fa,fc,towerBase+lo,towerBase+hi,'#3e514e',.05,l,r);
      for(let h=lo+.13;h<hi;h+=.16)wallPanel(detail,fa,fc,towerBase+h,towerBase+h+.045,'#7f8f82',.08,l,r);
    }
    for(const u of [-2.85,2.85])for(const v of [.45,6.75])box(u,v,.9,.9,22.8,26.95,'#b49a6a');
    for(const h of [23,24.7,26.85])for(const v of [.4,6.8]){const a=at(-3.25,v),c=at(3.25,v);batchBeam(detail,[a.x,towerBase+h,a.z],[c.x,towerBase+h,c.z],.12,'#3c5c5d');}
    for(const h of [23,26.85])for(const u of [-2.85,2.85]){const a=at(u,.05),c=at(u,7.15);batchBeam(detail,[a.x,towerBase+h,a.z],[c.x,towerBase+h,c.z],.10,'#3c5c5d');}
    // Procedural Roman-hour motif follows the square sundial, rather than the
    // circular clock texture used by the old placeholder.
    const dial=canvasTexture(1024,1024,(ctx,w,h)=>{
      ctx.clearRect(0,0,w,h);ctx.fillStyle='#433e30';ctx.strokeStyle='rgba(75,65,45,.65)';ctx.lineWidth=2;ctx.font='64px serif';ctx.textAlign='center';ctx.textBaseline='middle';
      const hours=[['VI',.08,.12],['V',.09,.29],['IV',.09,.47],['III',.16,.65],['II',.28,.81],['I',.41,.91],['XII',.53,.94],['XI',.66,.89],['X',.79,.78],['IX',.89,.61],['VIII',.91,.43],['VII',.91,.27],['VI',.91,.12]];
      for(const [text,x,z]of hours){ctx.beginPath();ctx.moveTo(w*.5,h*.28);ctx.lineTo(w*x,h*z);ctx.stroke();ctx.fillText(text,w*x,h*z);}ctx.fillText('M M I',w*.5,h*.09);
    });
    const clock=new THREE.Mesh(new THREE.PlaneGeometry(4.7,4.7),new THREE.MeshStandardMaterial({map:dial,transparent:true,roughness:.85,depthWrite:false})),face=at(0,-.09);
    clock.position.set(face.x,t.ground+14.75,face.z);clock.rotation.y=Math.atan2(-f.v.x,-f.v.z);world.add(clock);
    const root=at(0,-.14),tip=at(0,-1.6);detail.triangle([root.x,towerBase+15.7,root.z],[root.x,towerBase+14.7,root.z],[tip.x,towerBase+13.7,tip.z],'#4b5144');
    facadeCaption(b,at(-2.1,-.02),at(2.1,-.02),'Quadrangle',4.5,towerBase+4.4,'#344b40');
    world.add(floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
    basserCanopies(g);
  }

  function basserCanopies(g){
    const f=g.frame,b=g.basser,roof=new Batch(),steel=new Batch();roof.base=steel.base=0;
    const at=(u,v)=>framePoint(f,u,v),point=(u,v)=>{const p=at(u,v);return [p.x,b.roofAt(p),p.z];};
    for(let leaf=0;leaf<b.leaves;leaf++){
      const u0=b.startU+(b.endU-b.startU)*leaf/b.leaves+.08,u1=b.startU+(b.endU-b.startU)*(leaf+1)/b.leaves-.08;
      for(let i=0;i<16;i++){
        const v0=b.centreV-b.width/2+b.width*i/16,v1=b.centreV-b.width/2+b.width*(i+1)/16;
        roof.quad(point(u0,v0),point(u0,v1),point(u1,v1),point(u1,v0),i%2?'#b8c3ae':'#a9b9a7');
      }
      for(const u of [u0,u1])for(let i=0;i<16;i++)batchBeam(steel,point(u,b.centreV-b.width/2+b.width*i/16),point(u,b.centreV-b.width/2+b.width*(i+1)/16),.065,'#3d6272');
      for(const v of [b.centreV-b.width/2,b.centreV+b.width/2])batchBeam(steel,point(u0,v),point(u1,v),.075,'#456b78');
      // Fine corrugations along the barrel-shaped sheet.
      for(let u=u0+.15;u<u1;u+=.25)for(let i=0;i<8;i++)batchBeam(roof,point(u,b.centreV-b.width/2+b.width*i/8),point(u,b.centreV-b.width/2+b.width*(i+1)/8),.013,'#c4ccba');
    }
    for(const p of b.supports){
      const {u,v}=p,top=point(u,v),base=terrainHeight(p.x,p.z)+.1;
      batchPipe(steel,[p.x,base,p.z],top,.10,'#416776');addCollider({x:p.x,z:p.z,radius:.15,top:top[1],base:0});
      const c=point(u,b.centreV+(v-b.centreV)*.5);batchBeam(steel,[p.x,top[1]-.8,p.z],c,.065,'#416776');
    }
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.18,roughness:.6})),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.2})));
  }

  function electricalBuilding(b,concrete,brick,glass,detail,roofs){
    const g=electricalGeometry(b),f=g.frame,top=ELECTRICAL_LEVELS.parapetRL-b.base,angle=Math.atan2(-f.u.z,f.u.x);
    const ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    // Original brick piers stay proud of the recessed glazed base. Five upper
    // window rows are independent of the retained eight-level map tag.
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      const south=mid.v>24,low=south?35.05-b.base:38.6-b.base;
      wallPanel(brick,a,c,0,top,'#aa775e');
      if(len>7&&!(south&&mid.u>-20&&mid.u<-10&&mid.v>46)){
        const bays=Math.max(1,Math.round(len/6)),step=len/bays;
        for(let k=0;k<bays;k++){
          const l=(k*step+.68)/len,r=((k+1)*step-.68)/len;
          if(r<=l)continue;
          // Glazing is recessed behind pale concrete undercroft columns.
          wallPanel(glass,a,c,Math.max(.3,low+.1),g.upperFloorRL-b.base-.2,'#425f61',.025,l,r);
          wallPanel(detail,a,c,g.upperFloorRL-b.base-.25,g.upperFloorRL-b.base,'#dddcc8',.12,l,r);
          for(let row=0;row<g.upperRows;row++){
            const bottom=g.upperFloorRL+row*g.storey-b.base,high=Math.min(top-.32,bottom+g.storey-.12);
            wallPanel(detail,a,c,bottom,high,'#465562',.035,l,r);
            // Small ceramic joints in the blue-grey spandrel panels.
            for(let y=bottom+.24;y<bottom+1.02;y+=.23)wallPanel(detail,a,c,y,y+.018,'#647079',.045,l,r);
            for(let t=l;t<r;t+=.52/len)wallPanel(detail,a,c,bottom+.08,bottom+1.04,'#606973',.05,t,Math.min(r,t+.016/len));
            const projected=south&&nz>.5&&mid.u>-10&&mid.u<21&&row<3,off=projected?.62:.10;
            wallPanel(glass,a,c,bottom+1.1,high,'#496c82',off,l,r);
            const edge=projected?'#252c30':'#d2cdbc';
            for(const t of [l,(l+r)/2,r])wallPanel(detail,a,c,bottom+1.02,high+.04,edge,off+.025,Math.max(l-.014,t-.045/len),Math.min(r+.014,t+.045/len));
            if(!projected)for(const t of [l+(r-l)/4,l+(r-l)*3/4])wallPanel(detail,a,c,bottom+1.15,high,'#b9c8c5',off+.02,t-.025/len,t+.025/len);
            for(const y of [bottom+1.04,high])wallPanel(detail,a,c,y,y+.065,edge,off+.045,l,r);
            if(projected){
              for(const t of [l,r])detail.quad(p(t,bottom+1.04,.07),p(t,high+.07,.07),p(t,high+.07,.66),p(t,bottom+1.04,.66),'#262f31');
              detail.quad(p(l,bottom+1.04,.07),p(r,bottom+1.04,.07),p(r,bottom+1.04,.66),p(l,bottom+1.04,.66),'#263033');
            }
          }
          // Retained concrete undercroft structure at each brick-pier line.
          if(south){const q=p(k/bays,(low+g.upperFloorRL-b.base)/2,.15);detail.box(q[0],q[1],q[2],.42,g.upperFloorRL-b.base-low,.42,'#d4d7c7');}
        }
      }
      wallPanel(detail,a,c,top-.2,top,'#d8d5bf',.34);
      detail.quad(p(0,top-.2,.04),p(1,top-.2,.04),p(1,top-.2,.42),p(0,top-.2,.42),'#c9cbb8');
      // Fine roof terrace guard, separate from the translucent plant screens.
      batchBeam(detail,p(0,top+.95,.04),p(1,top+.95,.04),.045,'#6f7b78');
      for(let d=.4;d<len;d+=.72)batchBeam(detail,p(d/len,top,.04),p(d/len,top+.95,.04),.026,'#7f8983');
    }
    polygon(roofs,b.points,top-.08,'#9eaba1',b.holes);
    const prism=(points,bottom,high,color,batch)=>{
      const r=polygonArea(points)<0?[...points].reverse():points;
      for(let i=0;i<r.length;i++)wallPanel(batch,r[i],r[(i+1)%r.length],bottom,high,color);
      polygon(roofs,r,high,'#b7c1b4');
    };
    for(const core of g.cores){
      const h=core.roofRL-b.base;prism(core.points,0,h,'#aa7b5e',brick);
      const q=framePoint(f,core.u,core.v);detail.box(q.x,h+.1,q.z,core.width+.5,.2,core.length+.5,'#d7d7c2',angle);
    }
    // White breeze-block stair screen on the south frontage, seen in the
    // completed contractor photograph. Perforations are actual open geometry.
    const screenV=46.13;
    const s0=framePoint(f,28.5,screenV),s1=framePoint(f,34.1,screenV);
    wallPanel(detail,s1,s0,6.1,top-.5,'#344342',-.03);
    for(let y=6.2;y<top-.6;y+=.38)for(let u=28.6;u<34;u+=.38){
      const q=framePoint(f,u,screenV+.16);detail.box(q.x,y,q.z,.38,.055,.18,'#d2d3bf',angle);
      const q2=framePoint(f,u,screenV+.16);detail.box(q2.x,y+.17,q2.z,.055,.34,.18,'#d2d3bf',angle);
      const a=framePoint(f,u+.04,screenV+.27),c=framePoint(f,u+.29,screenV+.27);
      batchBeam(detail,[a.x,y+.04,a.z],[c.x,y+.30,c.z],.044,'#d4d5c0');
    }
    // Folded translucent polycarbonate enclosures have labelled plant RL;
    // their dimensions, corrugation pitch and positions remain estimates.
    const plants=new Batch();plants.base=b.base;
    for(const enclosure of g.plants){
      const r=enclosure.points,roof=ELECTRICAL_LEVELS.plantRL-b.base;
      prism(r,top,top+.7,'#394745',detail);
      for(let j=0;j<r.length;j++){
        const a=r[j],c=r[(j+1)%r.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
        const n=Math.max(1,Math.round(len/5.2));
        for(let k=0;k<n*2;k++){
          const make=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
          const t0=k/(n*2),t1=(k+1)/(n*2),o0=k%2?.55:0,o1=k%2?0:.55;
          plants.quad(make(t0,top+.7,o0),make(t0,roof-(k%2?.35:0),o0),make(t1,roof-(k%2?0:.35),o1),make(t1,top+.7,o1),k%2?'#cad9d9':'#afc7cf');
          batchBeam(detail,make(t0,top+.7,o0+.025),make(t0,roof-(k%2?.35:0),o0+.025),.055,'#d1d9cd');
          batchBeam(detail,make(t0,roof-(k%2?.35:0),o0),make(t1,roof-(k%2?0:.35),o1),.075,'#ccd4c8');
          for(let t=t0+.32/len;t<t1;t+=.32/len){const off=o0+(o1-o0)*(t-t0)/(t1-t0);batchBeam(plants,make(t,top+.7,off+.015),make(t,roof-.4,off+.015),.018,'#d3dddb');}
        }
      }
      polygon(roofs,r,roof-.4,'#bdcbc5');
    }
    world.add(plants.mesh(style('#ffffff',{vertexColors:true,roughness:.5,metalness:.12})));
    // Stair enclosure and exhaust / lightning components use separate labels.
    const stair=frameRectangle(f,10.5,7,-35.5,35.2);prism(stair,top-.1,ELECTRICAL_LEVELS.stairRL-b.base,'#c5c9b9',detail);
    for(const mast of g.masts)batchPipe(detail,[mast.x,mast.from-b.base,mast.z],[mast.x,mast.rl-b.base,mast.z],.065,'#9aa9a0');
    for(const flue of g.flues){batchPipe(detail,[flue.x,ELECTRICAL_LEVELS.plantRL-b.base-.2,flue.z],[flue.x,flue.rl-b.base,flue.z],.23,'#aab5ac');detail.box(flue.x,flue.rl-b.base,flue.z,.58,.12,.58,'#c3cabe');}
    const labelA=framePoint(f,-18.6,49.57),labelB=framePoint(f,-12,49.57);
    facadeCaption(b,labelB,labelA,'Electrical Engineering Building',6.8,2.5,'#26392f');
    // Exterior model: original building perimeter remains solid. The separately
    // mapped Rex covered link is outside this collider and stays walkable.
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function electricalOutdoor(){
    const g=electricalGround,f=g.frame,angle=Math.atan2(-f.u.z,f.u.x);
    const concrete=new Batch(),paving=new Batch(),wood=new Batch(),rails=new Batch(),leaves=new Batch(),balustrade=new Batch();
    for(const batch of [concrete,paving,wood,rails,leaves,balustrade])batch.base=0;
    const solid=(points,top,color,batch=concrete)=>{
      const ring=polygonArea(points)<0?[...points].reverse():points;
      polygon(batch,ring,top,color);
      for(let i=0;i<ring.length;i++)wallPanel(batch,ring[i],ring[(i+1)%ring.length],g.lowGround-.3,top,color);
    };
    for(const points of g.lowParts)solid(points,g.lowGround+.22,'#b5b9a8',paving);
    for(const tier of g.tiers){
      const top=tier.ground+.22;solid(tier.points,top,'#bfc5b3');
      addCollider({points:tier.points,bottom:g.lowGround,top,base:0,stepHeight:.18});
      const us=tier.points.map(p=>g.local(p).u),front=Math.min(...us);
      for(let plank=0;plank<4;plank++){
        const strip=clipFrameStrip(tier.points,{...f,v:f.u},front+.1+plank*.13,front+.21+plank*.13);
        polygon(wood,strip,top+.035,plank%2?'#937653':'#80694a');
      }
    }
    for(const step of g.steps)solid(step.points,step.ground+.22,'#b7bda9');
    shapedRoof(paving,g.ramp,p=>courtGround(p.x,p.z)+.22,'#b5b9a8');
    // Retaining skirts close the refined link's cut in the coarser ground.
    const bridgeRing=polygonArea(g.bridge)<0?[...g.bridge].reverse():g.bridge;
    for(let i=0;i<bridgeRing.length;i++){
      const a=bridgeRing[i],b=bridgeRing[(i+1)%bridgeRing.length],n=Math.max(1,Math.ceil(distance2(a,b)/.5));
      for(let k=0;k<n;k++){const p={x:a.x+(b.x-a.x)*k/n,z:a.z+(b.z-a.z)*k/n},q={x:a.x+(b.x-a.x)*(k+1)/n,z:a.z+(b.z-a.z)*(k+1)/n};
        if(inElectricalCourt((p.x+q.x)/2,(p.z+q.z)/2))continue;
        const ph=Math.max(g.lowGround+.22,demHeight(p.x,p.z)+.22),qh=Math.max(g.lowGround+.22,demHeight(q.x,q.z)+.22);
        concrete.quad([p.x,g.lowGround+.21,p.z],[p.x,ph,p.z],[q.x,qh,q.z],[q.x,g.lowGround+.21,q.z],'#a1aa96');
      }
    }
    // The stair aisle has the same eighteen discrete levels in rendering and
    // movement. The handrail rises continuously along its northern side.
    const railPoint=(t,y)=>{const p=framePoint(f,g.startU+(g.endU-g.startU)*t,g.aisleV+.13);return [p.x,g.lowGround+g.rise*t+y,p.z];};
    batchPipe(rails,railPoint(0,1.16),railPoint(1,1.16),.035,'#8b9c91');
    for(let i=0;i<=6;i++)batchPipe(rails,railPoint(i/6,.22),railPoint(i/6,1.16),.028,'#87998d');
    const shrub=(u,v,y,scale=1)=>{
      const p=framePoint(f,u,v);
      for(let leaf=0;leaf<9;leaf++){
        const a=leaf/9*TAU,dx=Math.cos(a),dz=Math.sin(a),h=(.3+(leaf%3)*.08)*scale;
        leaves.triangle([p.x-dz*.06*scale,y,p.z+dx*.06*scale],[p.x+dx*.36*scale,y+h,p.z+dz*.36*scale],[p.x+dz*.06*scale,y,p.z-dx*.06*scale],leaf%2?'#617b4e':'#7e8d57');
      }
    };
    for(const index of [1,3,5]){
      const tier=g.tiers[index];if(!tier)continue;
      const p=tier.points.map(p=>g.local(p)),u=(Math.min(...p.map(p=>p.u))+Math.max(...p.map(p=>p.u)))/2;
      const bed=frameRectangle(f,.82,1.4,u,18.2),top=tier.ground+.67;
      solid(bed,top,'#89917a');addCollider({points:bed,bottom:tier.ground+.22,top,base:0});
      polygon(paving,frameRectangle(f,.68,1.25,u,18.2),top+.01,'#66674e');
      for(const v of [17.8,18.2,18.6])shrub(u,v,top+.02,.85);
    }
    // Southern forecourt planting follows the public plan's low planted edge;
    // the mapped stair corridor immediately south remains clear.
    for(const bed of g.beds){
      const top=p=>demHeight(p.x,p.z)+.67;shapedRoof(concrete,bed.points,top,'#a2a58a');
      for(let i=0;i<bed.points.length;i++){
        const a=bed.points[i],b=bed.points[(i+1)%bed.points.length],n=Math.max(1,Math.ceil(distance2(a,b)/.6));
        for(let k=0;k<n;k++){const p={x:a.x+(b.x-a.x)*k/n,z:a.z+(b.z-a.z)*k/n},q={x:a.x+(b.x-a.x)*(k+1)/n,z:a.z+(b.z-a.z)*(k+1)/n};concrete.quad([p.x,demHeight(p.x,p.z)+.22,p.z],[p.x,top(p),p.z],[q.x,top(q),q.z],[q.x,demHeight(q.x,q.z)+.22,q.z],'#acaf98');}
      }
      addCollider({points:bed.points,base:0,terrainBottom:.22,terrainOffset:.67});
      for(let u=bed.u0+.35;u<bed.u1;u+=.52){const p=framePoint(f,u,bed.v);shrub(u,bed.v,top(p)+.02,.9);}
    }
    // Glazed edge is interrupted before the retained eastern crossing steps.
    for(let u=-9.6;u<17.4;u+=1.7){
      const a=framePoint(f,u,53.05),b=framePoint(f,Math.min(17.4,u+1.7),53.05),h0=demHeight(a.x,a.z)+.22,h1=demHeight(b.x,b.z)+.22;
      balustrade.quad([a.x,h0+.12,a.z],[a.x,h0+.9,a.z],[b.x,h1+.9,b.z],[b.x,h1+.12,b.z],'#b2cec3');
      batchPipe(rails,[a.x,h0,a.z],[a.x,h0+1,a.z],.026,'#85988a');batchPipe(rails,[a.x,h0+1,a.z],[b.x,h1+1,b.z],.03,'#96a69a');
    }
    addCollider({points:g.rail,base:0,terrainBottom:.22,terrainOffset:1.22});
    // Seats stand back from the mapped through-path along the forecourt.
    for(const seat of g.seats){
      const {u,v}=seat,p=framePoint(f,u,v),h=demHeight(p.x,p.z)+.22;
      addCollider({points:seat.points,base:0,terrainBottom:.22,terrainOffset:.72,stepHeight:.1});
      for(let k=0;k<4;k++){const q=framePoint(f,u,v-.21+k*.12);wood.box(q.x,h+.43,q.z,2.5,.065,.105,'#887051',angle);}
      for(const du of [-.9,.9]){const q=framePoint(f,u+du,v);rails.box(q.x,h+.2,q.z,.08,.4,.45,'#6e7e71',angle);}
    }
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.025})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
    world.add(wood.mesh(style('#ffffff',{vertexColors:true})),rails.mesh(style('#ffffff',{vertexColors:true,metalness:.3})),leaves.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    world.add(balustrade.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.24,side:THREE.DoubleSide,roughness:.2,depthWrite:false})));
  }

  function rexTheatre(b,concrete,brick,glass,detail,roofs){
    const g=rexGeometry(b,buildings.find(q=>q.id===REX_LINK_ID)),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),ha=g.roofAt(a),hc=g.roofAt(c);
      brick.quad([a.x,0,a.z],[a.x,ha-.22,a.z],[c.x,hc-.22,c.z],[c.x,0,c.z],'#bca47a',[[0,0],[0,ha/2],[len/2,hc/2],[len/2,0]]);
      wallPanel(concrete,a,c,0,.7,'#d1d5c6',.025);
      const p=(t,y,off)=>{const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;return [a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];};
      // The auditorium has one high window band, rather than the former
      // generic three-storey academic window grid.
      if(len>4.2){
        const low=Math.max(.85,Math.min(ha,hc)-1.9),high=Math.min(ha,hc)-.4;
        wallPanel(detail,a,c,low-.08,high+.08,'#d5dbcf',.08,.035,.965);
        wallPanel(glass,a,c,low,high,'#557075',.105,.045,.955);
        for(let d=.3;d<len-.15;d+=.72)wallPanel(detail,a,c,low,high,'#cbd4c8',.13,d/len,Math.min(1,(d+.055)/len));
        wallPanel(detail,a,c,low+.65,low+.70,'#bccbc4',.135,.04,.96);
      }
      detail.quad(p(0,ha-.23,.03),p(0,ha+.025,.03),p(1,hc+.025,.03),p(1,hc-.23,.03),'#d4dcce');
      detail.quad(p(0,ha,.03),p(1,hc,.03),p(1,hc,.48),p(0,ha,.48),'#d6dfd2');
      detail.quad(p(0,ha-.15,.48),p(1,hc-.15,.48),p(1,hc-.15,.03),p(0,ha-.15,.03),'#bdcbbf');
    }
    shapedRoof(roofs,b.points,g.roofAt,'#c8d3c7');
    const vent=framePoint(g.frame,-2,-1),vy=g.roofAt(vent);detail.box(vent.x,vy+.08,vent.z,1.35,.16,1.1,'#aebeb2');
    for(let z=-.4;z<=.4;z+=.16)detail.box(vent.x,vy+.17,vent.z+z,1.15,.025,.025,'#788d85');
    addCollider({points:b.points,top:b.height,base:b.base});
    const cover=new Batch(),paving=new Batch();cover.base=0;
    const roof=g.bridge.roofRL;polygon(cover,g.bridge.points,roof,'#c7d2c5',g.bridge.holes);polygon(cover,g.bridge.points,roof-.24,'#b3c3b6',g.bridge.holes,true);
    const cr=polygonArea(g.bridge.points)<0?[...g.bridge.points].reverse():g.bridge.points;
    for(let i=0;i<cr.length;i++)wallPanel(cover,cr[i],cr[(i+1)%cr.length],roof-.24,roof,'#c6d2c3');
    // Portal beams on each end of the existing covered east/west link.
    for(const [a,c] of [[g.bridge.points[0],g.bridge.points[2]],[g.bridge.points[8],g.bridge.points[4]]]){
      batchBeam(cover,[a.x,roof-.25,a.z],[c.x,roof-.25,c.z],.16,'#d1dacb');
      for(const p of [a,c]){const ground=terrainHeight(p.x,p.z);batchBeam(cover,[p.x,ground,p.z],[p.x,roof-.25,p.z],.15,'#d2d9c9');addCollider({x:p.x,z:p.z,radius:.18,top:roof,base:0});}
    }
    polygon(paving,g.bridge.points,.225,'#a29883',g.bridge.holes);groundPatches.push({points:g.bridge.points,heightAt:(x,z)=>terrainHeight(x,z)+.225});
    world.add(cover.mesh(style('#ffffff',{vertexColors:true})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
    addCollider({points:g.bridge.points,holes:g.bridge.holes,bottom:roof-.24,top:roof,base:0});
  }

  function sdnCentre(b,concrete,brick,glass,detail,roofs){
    const g=sdnGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),roof=new Batch(),fences=new Batch(),garden=new Batch();roof.base=b.base;
    const external=(a,c)=>b.points.some((p,i)=>{const q=b.points[(i+1)%b.points.length],dx=q.x-p.x,dz=q.z-p.z,len=Math.hypot(dx,dz);return Math.abs(dx*(a.z-p.z)-dz*(a.x-p.x))/len<.02&&Math.abs(dx*(c.z-p.z)-dz*(c.x-p.x))/len<.02;});
    for(const r of g.regions){
      const ring=polygonArea(r.points)<0?[...r.points].reverse():r.points;
      shapedRoof(roofs,r.points,p=>g.roofAt(p,r.kind),r.kind==='veranda'?'#becbbd':'#9c9b89');
      if(r.kind==='veranda'){
        polygon(roof,r.points,Math.min(...r.points.map(p=>g.roofAt(p,r.kind)))-.12,'#c5d1be',[],true);polygon(detail,r.points,r.floor+.14,'#68897f');
        const front=Math.min(...r.points.map(p=>(p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z));
        for(let u=-15;u<7;u+=3.45){const p=framePoint(f,u,front+.15);const height=g.roofAt(p,r.kind)-r.floor-.1;detail.box(p.x,r.floor+height/2,p.z,.1,height,.1,'#b6c8b3',angle);}
        for(let u=-15.7;u<7;u+=1.1){const a=framePoint(f,u,front+.1),c=framePoint(f,u,5);batchBeam(detail,[a.x,g.roofAt(a,r.kind)-.13,a.z],[c.x,g.roofAt(c,r.kind)-.13,c.z],.045,'#d0d8c5');}
        const a=framePoint(f,-15.7,front+.1),c=framePoint(f,7,front+.1);batchBeam(detail,[a.x,g.roofAt(a,r.kind)-.12,a.z],[c.x,g.roofAt(c,r.kind)-.12,c.z],.075,'#bfcfb9');
      }
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z,ha=g.roofAt(a,r.kind),hc=g.roofAt(c,r.kind);
        wallPanel(detail,a,c,Math.min(ha,hc)-.12,Math.min(ha,hc)+.045,r.kind==='wing'?'#a17762':'#b8c5b3',.12);
        if(r.kind==='veranda'||(!external(a,c)&&nv>-.8))continue;
        if(r.kind==='hall'&&nv<-.8){
          wallPanel(concrete,a,c,0,r.floor+.3,'#c3c8b9');wallPanel(glass,a,c,r.floor+.3,r.floor+2.65,'#57736c',.055);
          for(let d=.15;d<len;d+=1.1)wallPanel(detail,a,c,r.floor+.25,r.floor+2.7,'#c4d1bf',.1,d/len,Math.min(1,(d+.055)/len));
          wallPanel(detail,a,c,r.floor+1.35,r.floor+1.41,'#b9cbb9',.12);
        }else{
          const count=Math.ceil(len/.4);
          for(let k=0;k<count;k++){const t=k/count,u=(k+1)/count,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},q={x:a.x+(c.x-a.x)*u,z:a.z+(c.z-a.z)*u},hp=g.roofAt(p,r.kind),hq=g.roofAt(q,r.kind);brick.quad([p.x,0,p.z],[p.x,hp-.12,p.z],[q.x,hq-.12,q.z],[q.x,0,q.z],'#d8c071',[[t*len/2,0],[t*len/2,hp/2],[u*len/2,hq/2],[u*len/2,0]]);}
          wallPanel(detail,a,c,.4,.46,'#a3b8a5',.04);
          if(len>3)for(let d=1.1;d<len-.8;d+=3.9){const mid=d/len,p={x:a.x+(c.x-a.x)*mid,z:a.z+(c.z-a.z)*mid},lo=Math.max(.95,terrainHeight(p.x,p.z)-b.base+.65),hi=Math.min(lo+1.45,g.roofAt(p,r.kind)-.3);wallPanel(detail,a,c,lo,hi,'#b9cbb7',.06,mid-.65/len,mid+.65/len);wallPanel(glass,a,c,lo+.07,hi-.08,'#4c6d69',.09,mid-.59/len,mid+.59/len);wallPanel(detail,a,c,lo+.07,hi-.08,'#c4d2be',.12,mid-.025/len,mid+.025/len);}
        }
      }
    }
    // The original roof outline is retained. The front strip represents the
    // observed open verandah, while the perimeter remains exterior-only here.
    addCollider({points:b.points,top:b.height,base:b.base});
    const tex=canvasTexture(128,128,ctx=>{ctx.clearRect(0,0,128,128);ctx.strokeStyle='#ffffff';ctx.lineWidth=1.6;for(let d=0;d<=128;d+=16){ctx.beginPath();ctx.moveTo(d,0);ctx.lineTo(d,128);ctx.stroke();ctx.beginPath();ctx.moveTo(0,d);ctx.lineTo(128,d);ctx.stroke();}});tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(3,3);tex.anisotropy=8;
    for(const {a,b:c} of g.fences){
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      wallPanel(fences,a,c,.08,1.55,'#94aaa0');
      for(let d=0;d<=len;d+=2.4){const t=d/len,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};garden.box(p.x,.8,p.z,.065,1.6,.065,'#627f70');}
      const points=[{x:a.x+nx*.05,z:a.z+nz*.05},{x:c.x+nx*.05,z:c.z+nz*.05},{x:c.x-nx*.05,z:c.z-nz*.05},{x:a.x-nx*.05,z:a.z-nz*.05}];addCollider({points,base:0,terrainOffset:1.55});
    }
    // Simple pots, garden edging and logs use the long-standing photo gallery;
    // the announced future playground refurbishment is not shown as completed.
    for(const [u,v] of [[-12,-8],[-4,-11],[3,-2]]){
      const p=framePoint(f,u,v);garden.box(p.x,.22,p.z,.65,.44,.65,'#ae8a6d',angle);garden.box(p.x,.46,p.z,.73,.06,.73,'#be9c7f',angle);garden.box(p.x,.5,p.z,.56,.04,.56,'#67705a',angle);
      for(const [dx,dz,h]of [[-.12,0,.9],[.16,.12,1.2],[0,-.18,.75]]){const q=framePoint(f,u+dx,v+dz);garden.box(q.x,.48+h/2,q.z,.028,h,.028,'#708568');garden.box(q.x,.5+h,q.z,.34,.2,.26,'#84956b',angle);}
    }
    const log=framePoint(f,-6,-4);garden.box(log.x,.22,log.z,3.2,.43,.38,'#85765e',angle);
    const [a,c]=g.signEdge;wallPanel(detail,a,c,2.6,3.04,'#c8be8b',.15);facadeCaption(b,a,c,'SDN KENSINGTON · UNSW SYDNEY',3.5,2.82,'#354c3c');
    world.add(roof.mesh(style('#ffffff',{vertexColors:true})),fences.mesh(style('#ffffff',{map:tex,vertexColors:true,transparent:true,alphaTest:.1,depthWrite:false,side:THREE.DoubleSide}),false),garden.mesh(style('#ffffff',{vertexColors:true})));
  }

  function barkerApartments(b,brick,glass,detail,roofs){
    const g=barkerApartmentsGeometry(b),f=g.frame;
    for(const part of BARKER_APARTMENTS_PARTS){
      const bottom=part.kind==='passage'?g.passageBottom(part.points):0;
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z;
        const subdivisions=Math.ceil(len/.45);
        for(let k=0;k<subdivisions;k++){
          const t=k/subdivisions,u=(k+1)/subdivisions,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},q={x:a.x+(c.x-a.x)*u,z:a.z+(c.z-a.z)*u},hp=g.roofAt(p),hq=g.roofAt(q);
          brick.quad([p.x,bottom,p.z],[p.x,hp,p.z],[q.x,hq,q.z],[q.x,bottom,q.z],'#c4ab77',[[t*len/2,bottom/2],[t*len/2,hp/2],[u*len/2,hq/2],[u*len/2,bottom/2]]);
        }
        if(bottom<2.45)wallPanel(brick,a,c,bottom,2.45,'#945e4a',.025);
        for(const y of [2.42,5.5,8.15])if(y>bottom)wallPanel(detail,a,c,y,y+.09,'#929b97',.045);
        if(len<2.8)continue;
        const bays=Math.max(1,Math.round(len/3.9)),p=(t,y,off=.055)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
        for(let k=0;k<bays;k++){
          const mid=(k+.5)/bays,w=Math.min(1.55,len/bays*.55),t0=mid-w/2/len,t1=mid+w/2/len;
          for(const y of [.7,3.05,5.85,8.6]){
            const roof=Math.min(g.roofAt({x:a.x+(c.x-a.x)*mid,z:a.z+(c.z-a.z)*mid})-.4,11.4),h=Math.min(1.7,roof-y);
            if(y<bottom+.08||h<.7)continue;
            wallPanel(detail,a,c,y-.06,y+h+.06,'#cbd0c4',.07,t0-.045/len,t1+.045/len);
            wallPanel(glass,a,c,y,y+h,'#4a6570',.085,t0,t1);
            wallPanel(detail,a,c,y,y+h,'#d1d7cf',.1,mid-.025/len,mid+.025/len);
            wallPanel(detail,a,c,y+.22,y+.26,'#c0cabe',.1,t0,t1);
            // Pale curtains are visible behind many of the apartment windows.
            wallPanel(detail,a,c,y+.05,y+h-.05,'#bfc8bd',.095,t0,t0+.24/len);
          }
        }
        if(nv>.75&&len>6.7&&len<16.5){
          const width=Math.min(6.5,len-1),lo=.5-width/2/len,hi=.5+width/2/len;
          for(const slab of [2.75,5.55]){
            if(slab<bottom)continue;
            detail.quad(p(lo,slab,.06),p(hi,slab,.06),p(hi,slab,1.25),p(lo,slab,1.25),'#79878a');
            detail.quad(p(lo,slab-.13,1.25),p(hi,slab-.13,1.25),p(hi,slab-.13,.06),p(lo,slab-.13,.06),'#58696d');
            wallPanel(detail,a,c,slab-.13,slab,'#56666d',1.25,lo,hi);
            for(const t of [lo,hi])batchPipe(detail,p(t,slab,1.2),p(t,slab+2.65,1.2),.026,'#3c4a50');
            batchPipe(detail,p(lo,slab+1.03,1.2),p(hi,slab+1.03,1.2),.028,'#3c4a50');
            for(let d=0;d<=width;d+=.16)batchPipe(detail,p(lo+d/len,slab+.1,1.2),p(lo+d/len,slab+1.03,1.2),.012,'#455256');
            for(const t of [lo,hi])batchPipe(detail,p(t,slab+1.03,.05),p(t,slab+1.03,1.2),.025,'#3c4a50');
          }
          const shade=8.3;detail.quad(p(lo,shade,.04),p(hi,shade,.04),p(hi,shade,1.35),p(lo,shade,1.35),'#50626c');
        }
      }
      shapedRoof(roofs,part.points,g.roofAt,'#7b8583');
      if(bottom){polygon(detail,ring,bottom,'#8c8877',part.holes,true);addCollider({points:part.points,holes:part.holes,bottom,top:b.height,base:b.base});}
      else addCollider({points:part.points,holes:part.holes,top:b.height,base:b.base});
    }
  }

  function vallentineAnnexe(b,concrete,brick,glass,detail,roofs){
    const g=vallentineGeometry(b),paving=new Batch(),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
      const east=nu>.8,north=nv<-.8,p=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      wallPanel(east?concrete:brick,a,c,0,b.height-.25,east?'#c6ccc3':'#b8a77e');
      wallPanel(concrete,a,c,0,1,'#c2c8bc',.03);
      if(east){
        for(let d=0;d<len;d+=3.25){
          wallPanel(detail,a,c,1,b.height-.25,'#a1ada8',.035,d/len,Math.min(1,(d+.035)/len));
          const t0=d/len,t1=Math.min(1,(d+3.25)/len);
          for(let y=2;y<9;y+=3.25){batchBeam(detail,p(t0,y,.06),p(t1,y+3.25,.06),.018,'#889c96');batchBeam(detail,p(t0,y+3.25,.06),p(t1,y,.06),.018,'#889c96');}
        }
        for(let d=2.1;d<len-1.2;d+=4.6){
          const t=d/len,l=.64/len;
          wallPanel(detail,a,c,7.2,8.95,'#d2d8ca',.2,t-l,t+l);wallPanel(glass,a,c,7.3,8.8,'#516d6d',.23,t-.5/len,t+.5/len);
          detail.quad(p(t-l,9.05,.05),p(t+l,9.05,.05),p(t+l,9.05,.95),p(t-l,9.05,.95),'#c7cec0');
          detail.triangle(p(t-l,8.1,.05),p(t-l,9.05,.05),p(t-l,9.05,.95),'#b4c2b8');
          detail.triangle(p(t+l,9.05,.95),p(t+l,9.05,.05),p(t+l,8.1,.05),'#b4c2b8');
        }
        // Large pale roller shutter beside the raised pedestrian entrance.
        const t=.33;wallPanel(detail,a,c,1.1,6.1,'#a8b4ac',.08,t-.04,t+.04);
        for(let y=1.2;y<6.1;y+=.12)wallPanel(detail,a,c,y,y+.017,'#81938b',.105,t-.04,t+.04);
      }else{
        wallPanel(glass,a,c,1.6,3.25,'#485f5d',.04,.015,.985);
        wallPanel(glass,a,c,9.8,10.7,'#496263',.04,.015,.985);
        for(let d=.2;d<len;d+=1.65){const t=d/len;wallPanel(detail,a,c,1.6,3.25,'#b8c4b6',.1,t-.035/len,t+.035/len);wallPanel(detail,a,c,9.7,10.8,'#c7d0bf',.1,t-.04/len,t+.04/len);}
        for(let d=3;d<len-1;d+=4.7){const t=d/len;wallPanel(detail,a,c,5.35,7.2,'#c9cbb7',.05,t-.4/len,t+.4/len);wallPanel(glass,a,c,5.45,7.1,'#405957',.07,t-.3/len,t+.3/len);}
        const hood=north?1.35:.75;
        detail.quad(p(0,4.05,.04),p(1,4.05,.04),p(1,4.05,hood),p(0,4.05,hood),'#c8cebf');
        detail.quad(p(0,3.85,hood),p(1,3.85,hood),p(1,3.85,.04),p(0,3.85,.04),'#a7b4aa');
        wallPanel(detail,a,c,3.85,4.05,'#afbab0',hood);
        wallPanel(concrete,a,c,10.9,11.65,'#bfc7b9',.12);
        detail.quad(p(0,11.85,.04),p(1,11.85,.04),p(1,11.85,1.15),p(0,11.85,1.15),'#c9d1c2');
        detail.quad(p(0,11.65,1.15),p(1,11.65,1.15),p(1,11.65,.04),p(0,11.65,.04),'#afc0b3');
        wallPanel(detail,a,c,11.65,12,'#becbbb',1.15);
        for(let d=.4;d<len;d+=1.15)batchBeam(detail,p(d/len,10.75,.12),p(d/len,11.67,.9),.045,'#b8c4b9');
      }
    }
    polygon(roofs,b.points,b.height,'#b4c1b5');addCollider({points:b.points,top:b.height,base:b.base});
    polygon(paving,g.apron,.025,'#ad8a72');world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
    const stairBatch=new Batch(),rails=new Batch();stairBatch.base=rails.base=0;
    const st=g.stair,fp=(u,v)=>framePoint(f,u,v),landingY=g.topRL;
    polygon(stairBatch,g.landing.points,landingY,'#b47c62');
    groundPatches.push({points:g.landing.points,heightAt:()=>landingY});addCollider({points:g.landing.points,bottom:landingY-.18,top:landingY,base:0,stepHeight:.27});
    stairSegments.push(st);
    for(let k=0;k<st.count;k++){
      const t=k/st.count,next=(k+1)/st.count,y=st.h0+(st.h1-st.h0)*t+.03;
      const a={x:st.a.x+(st.b.x-st.a.x)*t,z:st.a.z+(st.b.z-st.a.z)*t},c={x:st.a.x+(st.b.x-st.a.x)*next,z:st.a.z+(st.b.z-st.a.z)*next};
      const points=[{x:a.x-f.u.x*st.width/2,z:a.z-f.u.z*st.width/2},{x:c.x-f.u.x*st.width/2,z:c.z-f.u.z*st.width/2},{x:c.x+f.u.x*st.width/2,z:c.z+f.u.z*st.width/2},{x:a.x+f.u.x*st.width/2,z:a.z+f.u.z*st.width/2}];
      polygon(stairBatch,points,y,'#b8795e');wallPanel(stairBatch,points[3],points[0],y-.16,y,'#9f674f');
      const p=points[0],q=points[3];batchBeam(stairBatch,[p.x,y+.013,p.z],[q.x,y+.013,q.z],.018,'#c7d3c3');
    }
    const wallU=g.east+.72,a=fp(wallU,10-6.3-1.1),c=fp(wallU,11.1);
    stairBatch.quad([a.x,st.h0,a.z],[c.x,st.h0,c.z],[c.x,landingY+2.6,c.z],[a.x,st.h0+.6,a.z],'#3f817f');
    for(const side of [-1,1]){
      const off=st.width/2*side,point=(p,y)=>[p.x+f.u.x*off,y,p.z+f.u.z*off];
      batchPipe(rails,point(st.a,st.h0+1),point(st.b,st.h1+1),.032,'#d0d9cc');
      batchPipe(rails,point(st.a,st.h0+.5),point(st.b,st.h1+.5),.021,'#c0d0c5');
      for(let k=0;k<=4;k++){const t=k/4,p={x:st.a.x+(st.b.x-st.a.x)*t,z:st.a.z+(st.b.z-st.a.z)*t},y=st.h0+(st.h1-st.h0)*t;batchPipe(rails,point(p,y),point(p,y+1.05),.025,'#cad5c7');}
    }
    // The raised landing joins the east face; guard only its exposed front edge.
    const lp0=fp(g.east+.925,11.1),lp1=fp(g.east+3.275,11.1);
    for(const y of [.5,1])batchPipe(rails,[lp0.x,landingY+y,lp0.z],[lp1.x,landingY+y,lp1.z],.026,'#cad5c7');
    const top=new Batch();top.base=0;
    for(let k=0;k<32;k++){
      const v0=g.canopy.v0+(g.canopy.v1-g.canopy.v0)*k/32,v1=g.canopy.v0+(g.canopy.v1-g.canopy.v0)*(k+1)/32;
      const a=fp(g.canopy.u0,v0),c=fp(g.canopy.u0,v1),d=fp(g.canopyEdge(v1),v1),e=fp(g.canopyEdge(v0),v0),y=g.canopy.rl;
      top.quad([a.x,y,a.z],[c.x,y,c.z],[d.x,y,d.z],[e.x,y,e.z],'#ccd3c5');top.quad([a.x,y-.15,a.z],[e.x,y-.15,e.z],[d.x,y-.15,d.z],[c.x,y-.15,c.z],'#b4c4b8');
      batchBeam(top,[e.x,y-.08,e.z],[d.x,y-.08,d.z],.075,'#bdcbbd');
    }
    for(const v of [g.canopy.v0+.8,g.canopy.v1-.7]){const p=fp(g.canopyEdge(v)-.12,v),bottom=terrainHeight(p.x,p.z);batchPipe(rails,[p.x,bottom,p.z],[p.x,g.canopy.rl-.12,p.z],.048,'#b9cbbf');addCollider({x:p.x,z:p.z,radius:.075,top:g.canopy.rl-.12,base:0});}
    const doorA=fp(g.east,9.1),doorC=fp(g.east,10.9);wallPanel(glass,doorA,doorC,landingY-b.base,landingY-b.base+2.4,'#355b5c',.08);
    world.add(stairBatch.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),rails.mesh(style('#ffffff',{vertexColors:true,metalness:.3})),top.mesh(style('#ffffff',{vertexColors:true})));
  }

  function parkingStation(b,concrete,brick,glass,detail){
    const g=parkingGeometry(b),screen=new Batch(),paving=new Batch();screen.base=b.base;
    polygon(paving,b.points,.035,'#727c76');world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('asphalt')}),false));
    const texture=canvasTexture(128,128,ctx=>{
      ctx.clearRect(0,0,128,128);ctx.strokeStyle='#ffffff';ctx.lineWidth=g.barker?2.5:1.15;
      for(let k=-128;k<256;k+=16){ctx.beginPath();ctx.moveTo(k,0);ctx.lineTo(k+128,128);ctx.stroke();ctx.beginPath();ctx.moveTo(k,0);ctx.lineTo(k-128,128);ctx.stroke();}
    });texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(4,4);texture.anisotropy=8;
    for(const region of g.regions){
      for(const [level,rl] of region.decks.entries()){
        const y=rl-b.base;
        polygon(concrete,region.points,y,'#a9ada5');polygon(concrete,region.points,y-.19,'#7a817d',[],true);
        for(const {a,b:c} of region.faces){
          const len=distance2(a,c),top=level<region.decks.length-1?region.decks[level+1]-b.base-.2:region.screenRL-b.base;
          wallPanel(concrete,a,c,y-.19,y,'#b4bbb1',.02);
          wallPanel(screen,a,c,y+.06,top,g.barker?'#697773':'#818e8b',.09);
          for(const h of [y+.08,(y+top)/2,top])wallPanel(detail,a,c,h-.025,h+.025,g.barker?'#8f9b91':'#c0c8bf',.14);
          // A recessed structural plane gives the permeable screen visual depth.
          if(level<region.decks.length-1)wallPanel(concrete,a,c,y,top,'#424e4d',-5);
          for(let d=.1;d<len;d+=2.6)wallPanel(detail,a,c,y,top,g.barker?'#83928a':'#b0bab2',.15,Math.max(0,(d-.035)/len),Math.min(1,(d+.035)/len));
          if(level<region.decks.length-1)for(let d=1;d<len-.5;d+=8.3)wallPanel(concrete,a,c,y,top,'#b7bdb2',-.32,(d-.16)/len,(d+.16)/len);
        }
      }
    }
    for(const ramp of g.ramps){
      const ys=ramp.points.map(p=>{const u=(p.x-g.frame.x)*g.frame.u.x+(p.z-g.frame.z)*g.frame.u.z;return u;});
      const lo=Math.min(...ys),hi=Math.max(...ys),vertices=ramp.points.map((p,i)=>[p.x,ramp.lowRL-b.base+(ramp.highRL-ramp.lowRL)*(ys[i]-lo)/(hi-lo),p.z]);
      concrete.quad(...[...vertices].reverse(),'#9caaa1');concrete.quad(...vertices.map(p=>[p[0],p[1]-.18,p[2]]),'#7f8b82');
    }
    for(const core of g.cores){
      const ring=polygonArea(core.points)<0?[...core.points].reverse():core.points,top=core.topRL-b.base,material=g.barker?brick:concrete;
      polygon(concrete,ring,top,'#bfc3b6');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(material,a,c,0,top,g.barker?'#ad806b':'#c3c8bc',.19);
        if(len>2)for(let y=2;y<top-1;y+=2.65)wallPanel(glass,a,c,y,y+1.15,'#3c5354',.22,.43,.57);
      }
    }
    for(const car of parkingCars(b,g)){
      const y=car.rl-b.base,angle=car.angle,co=Math.cos(angle),si=Math.sin(angle),at=(x,z)=>({x:car.x+x*co+z*si,z:car.z-x*si+z*co});
      detail.box(car.x,y+.48,car.z,1.68,.53,3.65,car.color,angle);
      const cabin=at(0,-.15);glass.box(cabin.x,y+.98,cabin.z,1.4,.56,1.85,'#304a50',angle);
      for(const x of [-.85,.85])for(const z of [-1.15,1.15]){const p=at(x,z);detail.box(p.x,y+.27,p.z,.2,.43,.58,'#293332',angle);}
      const front=at(0,1.84);detail.box(front.x,y+.53,front.z,1.35,.12,.04,'#cbd8cb',angle);
      if(car.roof){const p=at(1.19,0);detail.box(p.x,y+.015,p.z,.07,.025,4.8,'#dde0d0',angle);}
    }
    const entry=parkingEntry(g),{a,c,region}=entry,len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
    // Historical fascia styling only; the card records Botany's relocated access.
    const bottom=Math.max(region.decks[0]-b.base,terrainHeight((a.x+c.x)/2,(a.z+c.z)/2)-b.base),top=bottom+2.65;
    wallPanel(detail,a,c,top-.45,top+.17,g.barker?'#306786':'#d1aa29',.35);
    facadeCaption(b,a,c,g.barker?'BARKER STREET CAR PARK':'BOTANY STREET CAR PARK',Math.min(10.5,len-.3),top-.13,g.barker?'#e2e8dd':'#273a38');
    const p=(q,y,off)=>[q.x+nx*off,y,q.z+nz*off];
    detail.quad(p(a,top+.17,.1),p(c,top+.17,.1),p(c,top+.17,1.2),p(a,top+.17,1.2),'#b9c4b8');
    wallPanel(detail,a,c,top-.72,top-.63,'#d4ad34',.8,.03,.97);
    world.add(screen.mesh(style('#ffffff',{map:texture,vertexColors:true,transparent:true,alphaTest:.1,depthWrite:false,side:THREE.DoubleSide,roughness:.65,metalness:.18}),false));
    // Outdoor map: transparent façades expose visual detail, not a navigable garage.
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function esmeTheatre(b,concrete,glass,detail){
    const g=esmeGeometry(b),f=g.frame,deck=new Batch();deck.base=0;
    for(let k=0;k<g.regions.length;k++){
      const r=g.regions[k],ring=polygonArea(r.points)<0?[...r.points].reverse():r.points;
      polygon(deck,ring,r.rl,k%2?'#c0c5b6':'#b8bfb0');
      if(k>=2)for(let j=0;j<ring.length;j++)wallPanel(deck,ring[j],ring[(j+1)%ring.length],r.rl-.13,r.rl,'#8e9e90');
      groundPatches.push({points:r.points,heightAt:()=>r.rl+.02});
      addCollider({points:r.points,bottom:0,top:r.rl,stepHeight:.27,base:0});
    }
    const ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,count=Math.ceil(len/.7);
      for(let k=0;k<count;k++){
        const p={x:a.x+(c.x-a.x)*k/count,z:a.z+(c.z-a.z)*k/count},q={x:a.x+(c.x-a.x)*(k+1)/count,z:a.z+(c.z-a.z)*(k+1)/count};
        const top=g.surfaceRL({x:(p.x+q.x)/2,z:(p.z+q.z)/2})-b.base,visible=Math.max(0,top-.42);
        wallPanel(concrete,p,q,0,top,'#a6b0a0');
        if(visible>1.8){wallPanel(glass,p,q,.1,visible,'#54766d',.06);wallPanel(detail,p,q,.1,visible,'#343f39',.12,0,.06);}
        // Sloping concrete edge and glass balustrade follow the terraced surface.
        wallPanel(concrete,p,q,top-.35,top,'#bbc3b3',.14);
        if(top>1.8){wallPanel(glass,p,q,top+.08,top+1.08,'#8aafa2',.04);batchBeam(detail,[p.x+nx*.08,top+1.1,p.z+nz*.08],[q.x+nx*.08,top+1.1,q.z+nz*.08],.018,'#b3c7b4');}
      }
      if(len>30){
        const t=.25,centre={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};
        if(g.surfaceRL(centre)-b.base>3)facadeCaption(b,a,c,'ESME TIMBERY · CREATIVE PRACTICE LAB',Math.min(16,len-1),1.7,'#883f40');
      }
    }
    const liftRing=polygonArea(g.lift.points)<0?[...g.lift.points].reverse():g.lift.points;
    polygon(deck,liftRing,g.lift.topRL,'#4a5450');
    for(let i=0;i<liftRing.length;i++){
      const a=liftRing[i],c=liftRing[(i+1)%liftRing.length],len=distance2(a,c);
      wallPanel(detail,a,c,g.lift.bottomRL-b.base,g.lift.topRL-b.base,'#303b39');
      for(let d=.12;d<len;d+=.18)wallPanel(detail,a,c,g.lift.bottomRL-b.base,g.lift.topRL-b.base,'#45514a',.035,d/len,Math.min(1,(d+.025)/len));
    }
    addCollider({points:g.lift.points,bottom:g.lift.bottomRL,top:g.lift.topRL,base:0});
    world.add(deck.mesh(style('#ffffff',{vertexColors:true})));
  }

  function scienceLaboratory(b,concrete,glass,detail,roofs){
    const g=scienceLabGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const tx=(c.x-a.x)/len,tz=(c.z-a.z)/len,nx=tz,nz=-tx,nv=nx*f.v.x+nz*f.v.z,nu=nx*f.u.x+nz*f.u.z,inner=g.seb?nu>.65:nu<-.65;
      wallPanel(glass,a,c,0,g.mainHeight,'#54767b');
      wallPanel(concrete,a,c,0,.35,'#a6b2a2',.06);
      for(let d=.2;d<len;d+=1.2)wallPanel(detail,a,c,.2,g.foyerTop-.2,'#3c514b',.1,d/len,Math.min(1,(d+.055)/len));
      for(let d=2;d<len;d+=7.2){const p={x:a.x+tx*d+nx*.3,z:a.z+tz*d+nz*.3};batchBeam(concrete,[p.x,.1,p.z],[p.x,g.foyerTop,p.z],.17,'#b9c2af');}
      wallPanel(concrete,a,c,g.foyerTop-.3,g.foyerTop,'#adb9a6',.3);
      const bays=Math.max(1,Math.floor(len/.95));
      for(let row=0;row<g.rows;row++){
        const low=g.bands[row].low,high=g.bands[row].high-.04;
        wallPanel(detail,a,c,low,low+.055,'#a8b9a9',.08);
        if(inner){
          const p=(q,offset,y)=>[q.x+nx*offset,y,q.z+nz*offset];
          concrete.quad(p(a,0,low),p(c,0,low),p(c,.7,low),p(a,.7,low),'#a7b6a3');
          wallPanel(concrete,a,c,low-.2,low,'#a1b09d',.7);
          wallPanel(glass,a,c,low+.05,low+1.1,'#6f9b91',.7);
          wallPanel(detail,a,c,low+1.1,low+1.14,'#b1c4b1',.72);
          for(let d=.6;d<len;d+=1.8)wallPanel(detail,a,c,low,low+1.14,'#647b6b',.74,d/len,Math.min(1,(d+.035)/len));
          continue;
        }
        for(let k=0;k<bays;k++){
          const t=(k+.5)/bays,d=t*len,x=a.x+tx*d+nx*.45,z=a.z+tz*d+nz*.45;
          // Coherent diagonal fields of open and closed blades, reconstructed from photographs.
          const field=Math.sin(t*Math.PI*2+(row-3)*.38+(nv>.5?.5:0)),angle=field>.2?1.12:.12;
          const orientation=-Math.atan2(tz,tx)+angle;
          detail.box(x,(low+high)/2,z,.82,high-low,.045,k%4?'#d2d9c8':'#c7d1c1',orientation);
        }
      }
      wallPanel(concrete,a,c,g.mainHeight-.22,g.mainHeight,'#a9b6a5',.18);
    }
    polygon(roofs,b.points,g.mainHeight,'#9caa9a');
    const plant=polygonArea(g.plant.points)<0?[...g.plant.points].reverse():g.plant.points;
    polygon(roofs,plant,g.plant.top,'#48514a');
    for(let i=0;i<plant.length;i++){
      const a=plant[i],c=plant[(i+1)%plant.length],len=distance2(a,c);
      wallPanel(detail,a,c,g.plant.bottom,g.plant.top,'#333d3b');
      for(let d=.2;d<len;d+=.42)wallPanel(detail,a,c,g.plant.bottom,g.plant.top,'#526058',.035,d/len,Math.min(1,(d+.035)/len));
    }
    for(const flue of g.flues){batchPipe(detail,[flue.x,flue.bottom,flue.z],[flue.x,flue.top-.12,flue.z],flue.radius,'#acb8aa');detail.box(flue.x,flue.top-.15,flue.z,.72,.3,.72,'#788b7d');}
    addCollider({points:b.points,holes:b.holes,top:g.mainHeight,base:b.base});
  }

  function scienceGlazedLinks(data){
    const seb=data.buildings.find(b=>b.id==='science-engineering'),hilmer=data.buildings.find(b=>b.id==='hilmer'),g=scienceLinks(seb,hilmer),links=new Batch(),glazing=new Batch();links.base=glazing.base=0;
    const ring=polygonArea(g.points)<0?[...g.points].reverse():g.points;
    for(const level of g.levels){
      const top=level.topRL,bottom=level.bottomRL;
      polygon(links,ring,top,'#b9c4b2');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);
        wallPanel(links,a,c,bottom,bottom+.3,'#acbba8');
        wallPanel(glazing,a,c,bottom+.3,top-.25,'#729e98');
        wallPanel(links,a,c,top-.25,top,'#b1c0ae');
        for(let d=.8;d<len;d+=1.4)wallPanel(links,a,c,bottom+.25,top-.25,'#405b51',.025,d/len,Math.min(1,(d+.04)/len));
      }
      addCollider({points:ring,bottom,top,base:0});
    }
    world.add(links.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    world.add(glazing.mesh(style('#ffffff',{vertexColors:true,roughness:.16,metalness:.45,side:THREE.DoubleSide})));
  }

  function aquaticPool(b,concrete,brick,glass,detail,roofs){
    const g=poolGeometry(b),ordered=r=>polygonArea(r)<0?[...r].reverse():r;
    shapedRoof(roofs,g.hall,g.roofHeight,'#a6b2a6');polygon(roofs,g.front,g.frontTop,'#7b8a82');
    for(const [points,front] of [[g.hall,false],[g.front,true]]){
      const ring=ordered(points);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,top=front?g.frontTop:g.eave;
        wallPanel(brick,a,c,0,top,front?'#a79d80':'#b3a17e');
        if(front&&nz>.45&&len>7){
          wallPanel(concrete,a,c,0,.55,'#b5baad',.12);
          wallPanel(glass,a,c,.55,3.35,'#487e8a',.08);
          wallPanel(detail,a,c,.55,2.18,'#237e9e',.1);
          for(let d=.8;d<len;d+=1.65)wallPanel(detail,a,c,.5,3.4,'#424f48',.14,d/len,Math.min(1,(d+.055)/len));
          wallPanel(detail,a,c,3.4,g.frontTop,'#303e3c',.12);
          if(len>20)facadeCaption(b,a,c,'UNSW FITNESS & AQUATIC CENTRE',Math.min(22,len-.8),4.1,'#e7c538');
          // A few coloured notices are procedural shapes, never copied photographs.
          for(const [t,color] of [[.65,'#d8c856'],[.69,'#a5c5a5'],[.73,'#cc925f']])wallPanel(detail,a,c,1.1,2.8,color,.17,t,t+.025);
        }else if(front){
          wallPanel(detail,a,c,3.45,g.frontTop,'#354640',.08);
          if(nx>.4&&len>5){wallPanel(glass,a,c,.2,3.3,'#46695f',.08,.25,.75);wallPanel(detail,a,c,.2,3.3,'#303c36',.13,.49,.51);}
        }else{
          const bays=Math.max(1,Math.round(len/5.8));
          for(let k=0;k<=bays;k++){const t=k/bays,p={x:a.x+(c.x-a.x)*t+nx*.11,z:a.z+(c.z-a.z)*t+nz*.11};batchBeam(detail,[p.x,0,p.z],[p.x,g.eave,p.z],.09,'#919d8c');}
          wallPanel(glass,a,c,6.8,g.eave-.25,'#495b54',.08);
          for(let d=.4;d<len;d+=1.4)wallPanel(detail,a,c,6.75,g.eave-.2,'#333f38',.15,d/len,Math.min(1,(d+.055)/len));
          wallPanel(detail,a,c,g.eave-.15,g.eave,'#a8b9ab',.2);
          const count=Math.max(1,Math.ceil(len));
          for(let k=0;k<count;k++){
            const p={x:a.x+(c.x-a.x)*k/count,z:a.z+(c.z-a.z)*k/count},q={x:a.x+(c.x-a.x)*(k+1)/count,z:a.z+(c.z-a.z)*(k+1)/count};
            roofs.quad([p.x,g.eave,p.z],[p.x,g.roofHeight(p),p.z],[q.x,g.roofHeight(q),q.z],[q.x,g.eave,q.z],'#9aab9c');
          }
        }
      }
      addCollider({points,top:front?g.frontTop:b.height,base:b.base});
    }
    // Thin standing seams follow the pitched hall roof, staying below its mapped maximum.
    for(let x=-240;x<-181;x+=3.2){
      const north={x,z:Math.min(...g.hall.map(p=>p.z))+.4},south={x,z:g.splitZ-.4},mid={x,z:g.ridgeZ};
      if([north,south,mid].every(p=>inPolygon(p.x,p.z,g.hall))){batchBeam(detail,[north.x,g.roofHeight(north)-.025,north.z],[mid.x,b.height-.025,mid.z],.025,'#b6c2b1');batchBeam(detail,[mid.x,b.height-.025,mid.z],[south.x,g.roofHeight(south)-.025,south.z],.025,'#b6c2b1');}
    }
  }

  function aquaticGym(b,concrete,brick,glass,detail,roofs){
    const g=gymGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    shapedRoof(roofs,b.points,g.roofHeight,'#aab8ac');
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
      wallPanel(brick,a,c,0,g.eave,'#ad9d78');
      wallPanel(concrete,a,c,0,2.85,nv<-.3?'#bba14f':'#5b6456');
      if(len>4){
        wallPanel(glass,a,c,nv<-.3?1.45:.15,2.85,'#3c514b',.07);
        wallPanel(detail,a,c,2.85,3.4,'#c2a34a',.15);
        wallPanel(detail,a,c,3.48,4.45,'#4c5950',.06);
        for(let y=3.5;y<4.45;y+=.14)wallPanel(concrete,a,c,y,y+.04,'#a5ad98',.15);
        const bays=Math.max(1,Math.round(len/5.2));
        for(let k=0;k<=bays;k++){
          const t=k/bays,dx=.11/len;
          wallPanel(brick,a,c,3.35,g.eave,'#998969',.15,Math.max(0,t-dx),Math.min(1,t+dx));
          wallPanel(detail,a,c,0,2.85,'#303e37',.17,Math.max(0,t-dx),Math.min(1,t+dx));
        }
        if(nu<-.65||nv>.65){
          wallPanel(glass,a,c,g.eave-1.1,g.eave-.15,'#798d83',.08);
          for(let d=.5;d<len;d+=1.6)wallPanel(detail,a,c,g.eave-1.1,g.eave-.1,'#bdc6b4',.13,d/len,Math.min(1,(d+.04)/len));
        }
        if(g.entryEdge.includes(a)&&g.entryEdge.includes(c)){
          wallPanel(glass,a,c,.05,2.7,'#426156',.13,.38,.68);
          wallPanel(concrete,a,c,.15,1.05,'#b8c7b2',.16,.38,.68);
          wallPanel(detail,a,c,.05,2.75,'#273830',.18,.51,.525);
          wallPanel(detail,a,c,1.15,1.3,'#bec9b7',.2,.48,.5);wallPanel(detail,a,c,1.15,1.3,'#bec9b7',.2,.54,.56);
          facadeCaption(b,a,c,'FITNESS & AQUATIC CENTRE · B5',Math.min(8,len-1),3.12,'#34463a');
        }
      }
      wallPanel(concrete,a,c,g.eave-.13,g.eave,'#c2caba',.4);
      const count=Math.max(1,Math.ceil(len));
      for(let k=0;k<count;k++){
        const p={x:a.x+(c.x-a.x)*k/count,z:a.z+(c.z-a.z)*k/count},q={x:a.x+(c.x-a.x)*(k+1)/count,z:a.z+(c.z-a.z)*(k+1)/count};
        roofs.quad([p.x,g.eave,p.z],[p.x,g.roofHeight(p),p.z],[q.x,g.roofHeight(q),q.z],[q.x,g.eave,q.z],'#a7b4a5');
      }
    }
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function newtonBuilding(b,concrete,brick,glass,detail,roofs){
    const g=newtonGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      wallPanel(brick,a,c,0,b.height,'#8c6550');
      if(Math.abs(nu)>.8&&len>15){
        const bays=Math.max(1,Math.round(len/6));
        for(let bay=0;bay<bays;bay++){
          const centre=(bay+.5)/bays,pitch=b.height/g.rows;
          for(let row=0;row<g.rows;row++){
            const y=row*pitch,blind=(bay+row*3)%5;
            wallPanel(concrete,a,c,y+.25,y+pitch-.2,'#baac86',.04,centre-.15/bays,centre+.15/bays);
            wallPanel(glass,a,c,y+.3,y+pitch*.61,'#82958a',.07,centre-.14/bays,centre+.14/bays);
            if(blind<2)wallPanel(detail,a,c,y+.85,y+pitch*.61,'#c7d0ba',.08,centre-.14/bays,centre+.14/bays);
            wallPanel(detail,a,c,y+.3,y+pitch*.61,'#b4c1aa',.1,centre-.01/bays,centre+.01/bays);
            for(const side of [-1,1]){
              const u=centre+side*.25/bays;
              wallPanel(concrete,a,c,y+pitch*.6,y+pitch-.2,'#b9aa80',.04,u-.055/bays,u+.055/bays);
              wallPanel(glass,a,c,y+.35,y+pitch*.61,'#768e82',.07,u-.05/bays,u+.05/bays);
              wallPanel(brick,a,c,0,b.height,'#765643',.12,Math.min(u+side*.07/bays,u+side*.09/bays),Math.max(u+side*.07/bays,u+side*.09/bays));
            }
          }
        }
        if(nu<-.8){
          const t=((g.entry.x-a.x)*(c.x-a.x)+(g.entry.z-a.z)*(c.z-a.z))/(len*len),left=t-2/len,right=t+2/len,low=g.stair.highRL-b.base;
          wallPanel(glass,a,c,low,low+2.8,'#5d7c70',.15,left,right);
          wallPanel(concrete,a,c,low+2.8,low+3.55,'#d3dbca',1.65,left-.03,right+.03);
          const p=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
          facadeCaption(b,p(left),p(right),'Newton · J12',5.6,low+3.1,'#526e67');
        }
      }else if(len>7){
        for(let row=0;row<4;row++){
          wallPanel(concrete,a,c,row*4+.1,row*4+3.8,'#b6a680',.035,.4,.6);
          wallPanel(glass,a,c,row*4+.4,row*4+2.3,'#7b9183',.07,.42,.58);
        }
      }
      wallPanel(concrete,a,c,b.height-.4,b.height,'#b8b8a0',.2);
      for(let d=.7;d<len;d+=6.2){const t=d/len,x=a.x+(c.x-a.x)*t+nx*.16,z=a.z+(c.z-a.z)*t+nz*.16;batchPipe(detail,[x,0,z],[x,b.height-.3,z],.032,'#6f7c69');}
    }
    polygon(roofs,b.points,b.height,'#a4af98');
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    const steps=new Batch();steps.base=0;
    const flight=(s,ramp=false)=>{
      const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len,p=(t,side,y)=>[s.a.x+dx*t+nx*side*s.width/2,y,s.a.z+dz*t+nz*side*s.width/2];
      stairSegments.push({a:s.a,b:s.b,width:s.width,count:s.count,h0:s.lowRL,h1:s.highRL,continuous:ramp});
      if(ramp){steps.quad(p(0,-1,s.lowRL),p(1,-1,s.highRL),p(1,1,s.highRL),p(0,1,s.lowRL),'#adb9a4');}
      else for(let k=0;k<s.count;k++){
        const low=k/s.count,high=(k+1)/s.count,y=s.lowRL+(s.highRL-s.lowRL)*low;
        steps.quad(p(low,-1,y),p(high,-1,y),p(high,1,y),p(low,1,y),'#b4bea8');steps.quad(p(low,-1,y-(s.highRL-s.lowRL)/s.count),p(low,-1,y),p(low,1,y),p(low,1,y-(s.highRL-s.lowRL)/s.count),'#939f8c');
      }
      for(const side of [-1,1]){
        batchBeam(steps,p(0,side,s.lowRL+.95),p(1,side,s.highRL+.95),.025,'#789383');
        for(let k=0;k<=6;k++){const t=k/6,y=s.lowRL+(s.highRL-s.lowRL)*t;batchBeam(steps,p(t,side,y),p(t,side,y+.95),.018,'#789383');}
      }
      if(ramp){
        const a=p(0,1,s.lowRL+.05),c=p(1,1,s.highRL+.05),d=p(1,1,s.highRL+.9),e=p(0,1,s.lowRL+1.4);
        steps.quad(a,c,d,e,'#258d91');steps.quad(e,d,c,a,'#258d91');
      }
    };
    flight(g.stair);flight(g.ramp,true);
    polygon(steps,g.landing,g.stair.highRL,'#b6c1aa');addCollider({points:g.landing,bottom:g.stair.highRL-.12,top:g.stair.highRL,stepHeight:.27,base:0});
    world.add(steps.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function keithBurrows(b,concrete,brick,glass,detail,roofs){
    const g=keithGeometry(b),upper=polygonArea(b.points)<0?[...b.points].reverse():b.points,lower=polygonArea(g.lower)<0?[...g.lower].reverse():g.lower;
    polygon(roofs,b.points,b.height,'#8d9d89');
    const soffit=new Batch();soffit.base=b.base;polygon(soffit,b.points,g.overhang,'#c0c7b2');
    for(let i=0;i<upper.length;i++){
      const a=upper[i],c=upper[(i+1)%upper.length],len=distance2(a,c);
      wallPanel(brick,a,c,g.overhang,b.height,'#966f53');wallPanel(detail,a,c,g.overhang-.14,g.overhang+.08,'#bdc6b0',.035);wallPanel(detail,a,c,b.height-.08,b.height,'#a4b4a1',.08);
      if(len>3)wallPanel(detail,a,c,g.overhang,b.height,'#b0b49b',.02,.5,.5+.018/len);
    }
    for(let i=0;i<lower.length;i++){
      const a=lower[i],c=lower[(i+1)%lower.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*g.frame.v.x+nz*g.frame.v.z;
      wallPanel(brick,a,c,0,g.overhang,'#88674e');
      if(nv<-.2){
        wallPanel(glass,a,c,1.5,g.overhang-.35,'#506a61',.04);
        wallPanel(concrete,a,c,1.35,1.5,'#9aaa96',.08);
        for(let d=.6;d<len;d+=1.1)wallPanel(detail,a,c,1.45,g.overhang-.3,'#798e7c',.09,d/len,Math.min(1,(d+.045)/len));
        if(i===4||i===5){wallPanel(glass,a,c,.1,g.overhang-.4,'#54786b',.06,.1,.9);wallPanel(concrete,a,c,g.overhang-.65,g.overhang-.5,'#aebba5',.65);}
      }
    }
    world.add(soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    addCollider({points:b.points,holes:b.holes,bottom:g.overhang-.14,top:b.height,base:b.base});
    addCollider({points:g.lower,top:g.overhang,base:b.base});
  }

  function physicsTheatre(b,concrete,brick,glass,detail,roofs){
    const g=physicsGeometry(b),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*g.frame.u.x+nz*g.frame.u.z;
      wallPanel(brick,a,c,0,g.bodyRoof,'#a17b58');wallPanel(concrete,a,c,0,2.6,'#8c7d71',.02);
      if(nu<-.3&&len>5){
        wallPanel(glass,a,c,g.bodyRoof-1.3,g.bodyRoof-.65,'#a5b6a1',.06,.1,.48);
        for(const t of [.1,.22,.35,.48])wallPanel(detail,a,c,g.bodyRoof-1.3,g.bodyRoof-.65,'#657b6c',.1,t,t+.04/len);
        wallPanel(detail,a,c,.1,2.35,'#8b8071',.055,.57,.73);
        wallPanel(detail,a,c,.1,2.35,'#b3b9a0',.09,.645,.65);
        for(const t of [.03,.94]){const x=a.x+(c.x-a.x)*t+nx*.17,z=a.z+(c.z-a.z)*t+nz*.17;batchPipe(detail,[x,0,z],[x,g.bodyRoof,z],.04,'#6b806e');}
      }
      wallPanel(detail,a,c,g.bodyRoof-.12,g.bodyRoof,'#9cae96',.3);
    }
    polygon(roofs,b.points,g.bodyRoof,'#aab7a1');polygon(roofs,g.plant.points,g.plant.top,'#b0bdab');
    for(let i=0;i<g.plant.points.length;i++){
      const a=g.plant.points[i],c=g.plant.points[(i+1)%g.plant.points.length],len=distance2(a,c);wallPanel(concrete,a,c,g.plant.bottom,g.plant.top,'#c5cec0');
      for(let d=.2;d<len;d+=.7)wallPanel(detail,a,c,g.plant.bottom,g.plant.top,'#99ac99',.03,d/len,Math.min(1,(d+.025)/len));
    }
    addCollider({points:b.points,holes:b.holes,top:g.bodyRoof,base:b.base});
  }

  function k17Building(b,concrete,glass,detail,roofs){
    const g=k17Geometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,board=new Batch(),foyer=new Batch(),shade=new Batch(),steel=new Batch(),orange=new Batch(),garden=new Batch();
    for(const batch of [board,foyer,shade,steel,orange])batch.base=b.base;garden.base=0;
    const front=g.front,p=(t,y,offset=0)=>{const q=front.along(t,offset);return [q.x,y,q.z];};
    const isFront=(a,c)=>a===b.points[7]&&c===b.points[0],isWest=(a,c)=>a===b.points[6]&&c===b.points[7];
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      if(isFront(a,c)){
        // Glazing and dark floor bands sit behind a separate perforated skin.
        wallPanel(board,a,c,g.foyerTop,b.height,'#9ea497',-.18);
        for(let row=0;row<g.screen.bands;row++){
          const h=(g.screen.top-g.screen.bottom)/g.screen.bands,low=g.screen.bottom+row*h;
          wallPanel(glass,a,c,low+.35,low+h-.3,'#526967',-.12,.01,.99);
          for(let col=1;col<g.screen.columns;col++)wallPanel(steel,a,c,low+.3,low+h-.25,'#a0aca3',-.09,col/g.screen.columns-.002,col/g.screen.columns+.002);
        }
        for(const [i,panel] of g.screenPanels.entries())wallPanel(shade,a,c,panel.bottom,panel.top,i%5===1?'#c6cac2':i%7===3?'#b9bfb7':'#c0c6bd',g.screen.offset,panel.start,panel.end);
        for(let col=0;col<=g.screen.columns;col++){
          const t=col/g.screen.columns*g.screen.end;
          batchBeam(steel,p(t,g.foyerTop+.55,.77),p(t,b.height,.77),.035,'#8e9b93');
          // Triangular outriggers support the lower edge of the screen.
          batchBeam(steel,p(t,g.foyerTop+.7,.02),p(t,g.screen.bottom+.2,.76),.032,'#87968e');
          batchBeam(steel,p(t,g.screen.bottom+.2,.76),p(Math.min(g.screen.end,t+g.screen.end/g.screen.columns),g.screen.bottom+.2,.76),.025,'#a9b4aa');
        }
        for(let row=0;row<=g.screen.bands;row++){const y=g.screen.bottom+row*(g.screen.top-g.screen.bottom)/g.screen.bands;batchBeam(steel,p(0,y,.76),p(g.screen.end,y,.76),.035,'#89978e');}
        wallPanel(concrete,a,c,g.floor,g.foyerTop,'#cbd0c2',-4.1);
        wallPanel(foyer,a,c,g.floor,g.foyerTop-.16,'#9db9b4',.08,0,g.screen.end);
        wallPanel(steel,a,c,g.foyerTop-.25,g.foyerTop+.55,'#283e3e',.78,0,g.screen.end);
        steel.quad(p(0,g.foyerTop-.22,.78),p(g.screen.end,g.foyerTop-.22,.78),p(g.screen.end,g.foyerTop-.22,-4.1),p(0,g.foyerTop-.22,-4.1),'#a8b4a8');
        for(let d=0;d<=len*g.screen.end+.01;d+=len*g.screen.end/12)batchBeam(steel,p(d/len,g.floor,.13),p(d/len,g.foyerTop-.22,.13),.025,'#9fb5b1');
        for(const t of [.14,.48,.83]){const q=front.along(t,-.65);batchPipe(detail,[q.x,g.floor,q.z],[q.x,g.foyerTop,q.z],.21,'#d6ddd0');}
        // Dark stone strip at the glazing base, with a narrow gravel margin.
        wallPanel(steel,a,c,g.floor-.2,g.floor+.05,'#5c6861',.16,0,g.screen.end);
      }else if(isWest(a,c)){
        const w=g.west,s=w.slotStart,e=w.slotEnd,r=w.returnStart;
        // The concrete wall is interrupted by a recessed stair stack and glass
        // corner. The source footprint and outdoor collision boundary remain.
        wallPanel(board,a,c,0,b.height,'#a6ab9f',0,0,s);
        wallPanel(board,a,c,0,b.height,'#a6ab9f',0,e,r);
        wallPanel(board,a,c,g.foyerTop,b.height,'#a6ab9f',0,r,1);
        wallPanel(board,a,c,0,g.floor,'#a6ab9f',0,r,1);
        wallPanel(foyer,a,c,g.floor,g.foyerTop,'#9db9b4',.06,r,1);
        wallPanel(steel,a,c,g.foyerTop-.25,g.foyerTop+.55,'#283e3e',.2,r,1);
        for(const t of [r,r+.04,r+.08,1])wallPanel(steel,a,c,g.floor,g.foyerTop,'#a0b4ac',.1,t,Math.min(1,t+.0018));
        wallPanel(board,a,c,0,b.height,'#626e66',-w.depth,s,e);
        const wp=(t,y,off)=>{const q=w.along(t,off);return [q.x,y,q.z];};
        for(const t of [s,e]){const face=[wp(t,0,0),wp(t,b.height,0),wp(t,b.height,-w.depth),wp(t,0,-w.depth)];board.quad(...face,'#a4ab9e');board.quad(...[...face].reverse(),'#a4ab9e');}
        for(let row=0;row<7;row++){
          const y=row*g.pitch;
          wallPanel(board,a,c,y,y+.22,'#b1b8a9',0,0,1);
          if(row>0){
            const center=w.along((s+e)/2,(w.projection-w.depth)/2),width=(e-s)*len;
            board.box(center.x,y+.03,center.z,width,.24,w.projection+w.depth,'#aeb4a6',Math.atan2(-(c.z-a.z),c.x-a.x));
            wallPanel(board,a,c,y+.12,y+1.05,'#aab0a2',w.projection,s-.012,e+.012);
            for(const t of [s-.012,e+.012]){const q=w.along(t,(w.projection-.12)/2);board.box(q.x,y+.57,q.z,.18,.94,w.projection+.12,'#aab0a2',Math.atan2(-(c.z-a.z),c.x-a.x));}
            const q=w.along(.61,.035);board.box(q.x,y+1.25,q.z,.8,.85,.035,'#687c73',Math.atan2(-(c.z-a.z),c.x-a.x));
            for(let d=0;d<.8;d+=.1)wallPanel(steel,a,c,y+.85+d,y+.88+d,'#a0aea1',.07,.61-.4/len,.61+.4/len);
          }
          for(let d=2;d<len;d+=3.0)wallPanel(steel,a,c,y+.23,Math.min(b.height,y+g.pitch),'#8b9688',.018,d/len,Math.min(1,(d+.012)/len));
        }
        // Closed lower stair door and a few visible treads are a visual glimpse.
        wallPanel(glass,a,c,.15,2.6,'#344b47',-w.depth+.02,s+.02,e-.02);
        for(let step=0;step<7;step++){const q=w.along((s+e)/2,-.22-step*.15);board.box(q.x,.12+step*.14,q.z,(e-s)*len-.2,.1,.19,'#a6afa0',Math.atan2(-(c.z-a.z),c.x-a.x));}
      }else{
        wallPanel(board,a,c,0,b.height,'#b7b9a7');
        const bays=Math.max(1,Math.round(len/5.8));
        for(let row=0;row<g.rows;row++){
          const y=row*g.pitch;
          wallPanel(detail,a,c,y+.24,y+g.pitch-.22,'#3b4845',.035,.01,.99);
          for(let bay=0;bay<bays;bay++){
            const s=(bay+.07)/bays,e=(bay+.93)/bays;
            wallPanel(glass,a,c,y+g.pitch*.43,y+g.pitch-.35,'#7a8a87',.06,s,e);
            for(const t of [.25,.5,.75])wallPanel(detail,a,c,y+g.pitch*.43,y+g.pitch-.32,'#3e504b',.1,s+(e-s)*t,s+(e-s)*t+.035/len);
            wallPanel(detail,a,c,y+g.pitch*.71,y+g.pitch*.71+.035,'#3e504b',.1,s,e);
            if((row*3+bay)%7===1)wallPanel(detail,a,c,y+g.pitch*.44,y+g.pitch-.37,'#b7bda9',.075,s+(e-s)*.26,s+(e-s)*.49);
            wallPanel(concrete,a,c,y,y+g.pitch,'#b9bead',.18,bay/bays,Math.min(1,(bay+.07)/bays));
          }
          wallPanel(concrete,a,c,y,y+.3,'#bec2af',.22);
        }
      }
      wallPanel(detail,a,c,b.height-.15,b.height,'#899586',.18);
    }
    // Orange folded stair stringers have actual circular cutouts, rather than
    // dark dots painted on a solid sheet. They remain behind closed glazing.
    const flights=[[.2,.65,g.floor+.15,g.floor+3,-1.3],[.65,.2,g.floor+3,g.foyerTop-.35,-2.8]];
    for(const [s,e,low,high,offset] of flights){
      const panel=[p(s,low-.25,offset),p(e,high-.25,offset),p(e,high+.8,offset),p(s,low+.8,offset)];
      orange.quad(...panel,'#df782f',[[0,0],[8,0],[8,1],[0,1]]);
      for(let i=0;i<17;i++){const t=i/17,q=front.along(s+(e-s)*t,offset-.65);detail.box(q.x,low+(high-low)*t,q.z,front.len*Math.abs(e-s)/17,.06,1.2,'#d38a47',Math.atan2(-(front.c.z-front.a.z),front.c.x-front.a.x));}
      batchBeam(steel,p(s,low+1.05,offset),p(e,high+1.05,offset),.026,'#9fada2');
    }
    for(const landing of g.west.landings)addCollider({points:landing.points,bottom:landing.bottom,top:landing.top,base:b.base});
    polygon(roofs,b.points,b.height,'#9ca795');polygon(detail,g.foyerFloor,g.floor-.02,'#c7d1bf');
    const ceiling=g.foyerFloor.map(q=>[q.x,g.foyerTop,q.z]);detail.quad(ceiling[0],ceiling[1],ceiling[2],ceiling[3],'#d2dbcb');
    for(const t of [.18,.42,.67,.87]){const q=front.along(t,-1.2);detail.box(q.x,g.foyerTop-.1,q.z,.65,.035,.18,'#eef0d7');}
    const formed=canvasTexture(256,256,ctx=>{ctx.fillStyle='#c7c9b9';ctx.fillRect(0,0,256,256);const random=rng(416);for(let i=0;i<5000;i++){const x=random()*256,y=random()*256;ctx.fillStyle=i%2?'#a8b09e':'#d3d6c7';ctx.globalAlpha=.25;ctx.fillRect(x,y,.5,2+random()*15);}ctx.globalAlpha=.15;ctx.fillStyle='#6b786a';for(let x=5;x<256;x+=9)ctx.fillRect(x,0,.8,256);ctx.globalAlpha=.6;ctx.fillStyle='#6e7b6c';for(let x=10;x<256;x+=64)for(let y=22;y<256;y+=64){ctx.beginPath();ctx.arc(x,y,2.1,0,TAU);ctx.fill();}});formed.wrapS=formed.wrapT=THREE.RepeatWrapping;
    const screenTexture=canvasTexture(64,64,ctx=>{ctx.fillStyle='#dde1d8';ctx.fillRect(0,0,64,64);ctx.globalCompositeOperation='destination-out';for(const [x,y]of [[16,16],[48,16],[16,48],[48,48]]){ctx.beginPath();ctx.moveTo(x,y-13);ctx.lineTo(x+13,y);ctx.lineTo(x,y+13);ctx.lineTo(x-13,y);ctx.closePath();ctx.fill();}});screenTexture.wrapS=screenTexture.wrapT=THREE.RepeatWrapping;screenTexture.repeat.set(12,12);screenTexture.anisotropy=8;
    const stairTexture=canvasTexture(128,128,ctx=>{ctx.fillStyle='#ffffff';ctx.fillRect(0,0,128,128);ctx.globalCompositeOperation='destination-out';for(const [x,y]of [[32,32],[96,32],[32,96],[96,96]]){ctx.beginPath();ctx.arc(x,y,13,0,TAU);ctx.fill();}});stairTexture.wrapS=stairTexture.wrapT=THREE.RepeatWrapping;
    world.add(board.mesh(style('#ffffff',{vertexColors:true,map:formed,bumpMap:formed,bumpScale:.018})),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.4,roughness:.35})),shade.mesh(style('#ffffff',{vertexColors:true,map:screenTexture,alphaTest:.5,side:THREE.DoubleSide,roughness:.48,metalness:.45})),orange.mesh(style('#ffffff',{vertexColors:true,map:stairTexture,alphaTest:.5,side:THREE.DoubleSide})));
    const glazing=foyer.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false,roughness:.055,metalness:.25,envMapIntensity:.6}));world.add(glazing);medicalReflection(glazing,front.along(.5,2),b.base+g.floor+3.5);
    const vertical=canvasTexture(512,2048,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.translate(w/2,h/2);ctx.rotate(Math.PI/2);ctx.fillStyle='rgba(236,244,238,.73)';ctx.textAlign='center';ctx.font='100px sans-serif';ctx.fillText('COMPUTER SCIENCE',0,-28,h-80);ctx.fillText('& ENGINEERING',0,85,h-80);});
    const label=new THREE.Mesh(new THREE.PlaneGeometry(1.5,5.9),new THREE.MeshBasicMaterial({map:vertical,transparent:true,depthWrite:false})),lp=front.along(.035,.16);label.position.set(lp.x,b.base+g.floor+3.15,lp.z);label.rotation.y=Math.atan2(front.nx,front.nz);world.add(label);
    const badgeTexture=canvasTexture(256,128,(ctx,w,h)=>{ctx.fillStyle='#21627e';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e4ebe3';ctx.font='74px sans-serif';ctx.textAlign='center';ctx.fillText('K17',w/2,91);}),badge=new THREE.Mesh(new THREE.PlaneGeometry(.85,.43),new THREE.MeshBasicMaterial({map:badgeTexture})),bp=front.along(.035,.8);badge.position.set(bp.x,b.base+g.foyerTop+.1,bp.z);badge.rotation.y=Math.atan2(front.nx,front.nz);world.add(badge);
    for(const bed of g.beds)shapedRoof(garden,bed.points,q=>terrainHeight(q.x,q.z)+.08,'#8e7d5e');
    for(const shrub of g.shrubs){const y=terrainHeight(shrub.x,shrub.z);for(let blade=0;blade<9;blade++){const t=blade*TAU/9,tip=[shrub.x+Math.cos(t)*.65,y+shrub.height,shrub.z+Math.sin(t)*.65],base=[shrub.x,y+.08,shrub.z],side=[shrub.x+Math.cos(t+.5)*.12,y+.1,shrub.z+Math.sin(t+.5)*.12];garden.triangle(base,tip,side,blade%2?'#71894d':'#8b9a5c');garden.triangle(side,tip,base,blade%2?'#71894d':'#8b9a5c');}}
    world.add(garden.mesh(style('#ffffff',{vertexColors:true,roughness:.9})));
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function willisAnnexe(b,concrete,brick,glass,detail,roofs){
    const g=willisGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z;
      wallPanel(brick,a,c,0,g.eave,'#ac8964');
      if(Math.abs(nv)<.7){
        const bays=Math.max(1,Math.round(len/5.8));
        for(let bay=0;bay<bays;bay++){
          const s=(bay+.1)/bays,e=(bay+.9)/bays;
          wallPanel(detail,a,c,.25,10.7,'#42504e',.025,s,e);
          for(const [low,high] of [[.4,5.1],[7.1,10.7]]){
            wallPanel(glass,a,c,low,high,'#70847a',.06,s,e);
            for(let col=1;col<4;col++)wallPanel(detail,a,c,low,high,'#b7c0ab',.1,s+(e-s)*col/4,s+(e-s)*col/4+.04/len);
            for(let y=low+.8;y<high;y+=1.1)wallPanel(detail,a,c,y,y+.045,'#acb8a3',.11,s,e);
          }
          wallPanel(detail,a,c,5.2,7.05,'#485655',.07,s,e);
          for(let y=5.2;y<7;y+=.25)wallPanel(detail,a,c,y,y+.015,'#718077',.08,s,e);
          wallPanel(concrete,a,c,5.05,5.24,'#c9cdbb',.5,s,e);
          wallPanel(brick,a,c,0,g.eave,'#b1906c',.22,bay/bays,Math.min(1,(bay+.1)/bays));
        }
      }else{
        const bays=Math.max(1,Math.round(len/5.6));
        for(let bay=0;bay<bays;bay++){
          const s=(bay+.24)/bays,e=(bay+.76)/bays;
          wallPanel(detail,a,c,1.3,10.7,'#4e5c58',.04,s,e);
          for(const [low,high] of [[1.5,4.4],[6.1,7],[9.3,10.7]])wallPanel(glass,a,c,low,high,'#789181',.07,s,e);
          for(const y of [1.5,4.4,6.1,7,9.3,10.7])wallPanel(detail,a,c,y,y+.05,'#b4c1aa',.12,s,e);
        }
        const entryT=((g.entry.x-a.x)*(c.x-a.x)+(g.entry.z-a.z)*(c.z-a.z))/(len*len);
        if(nv<-.7&&len>12&&entryT>.1&&entryT<.9){
          const ground=g.entryGround-b.base,centre=entryT,width=Math.min(.2,3.2/len);
          wallPanel(glass,a,c,ground,ground+3.3,'#8ea594',.14,centre-width/2,centre+width/2);
          wallPanel(concrete,a,c,ground+3.3,ground+3.48,'#d6d9c7',.9,centre-width*.65,centre+width*.65);
          // White breeze-block motif above the northern entrance.
          for(let x=centre-width*.6;x<centre+width*.6;x+=.32/len)for(let y=ground+3.6;y<10.7;y+=.32){
            const p={x:a.x+(c.x-a.x)*x+nx*.1,z:a.z+(c.z-a.z)*x+nz*.1};detail.box(p.x,y,p.z,.2,.2,.055,'#d5dac6',Math.atan2(-(c.z-a.z),c.x-a.x));
          }
          const l={x:a.x+(c.x-a.x)*(centre-width/2),z:a.z+(c.z-a.z)*(centre-width/2)},r={x:a.x+(c.x-a.x)*(centre+width/2),z:a.z+(c.z-a.z)*(centre+width/2)};
          facadeCaption(b,l,r,'Willis Annexe · J18',4,ground+2.8,'#dde5cf');
        }
      }
      wallPanel(concrete,a,c,g.eave-.18,g.eave,'#d2d7c2',.6);
    }
    // Low-pitched roof retained inside the original outline; ridge rise is a
    // photograph-led estimate within the mapped 12 m maximum.
    const ridgeU=0,p=(u,v,y)=>{const q=framePoint(f,u,v);return [q.x,y,q.z];};
    const roof=new Batch();roof.base=b.base;
    for(const side of [-1,1]){const u=side*(f.width/2+.4),v0=-f.length/2+.8,v1=f.length/2-.8;roof.quad(p(u,v0,g.eave),p(ridgeU,v0,b.height),p(ridgeU,v1,b.height),p(u,v1,g.eave),'#a9b4a1');}
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    const cover=new Batch(),coverGlass=new Batch();cover.base=coverGlass.base=0;
    const cp=(u,v)=>{const q=framePoint(f,u,v);return [q.x,terrainHeight(q.x,q.z)+g.cover.clearance,q.z];};
    for(let v=g.cover.v0;v<g.cover.v1;v+=1.3){
      const end=Math.min(g.cover.v1,v+1.3),a=cp(g.cover.u0,v),c=cp(g.cover.u1,v),d=cp(g.cover.u1,end),e=cp(g.cover.u0,end);
      coverGlass.quad(a,c,d,e,'#c4d5c2');batchBeam(cover,a,c,.045,'#475e53');
      batchBeam(cover,a,e,.06,'#475e53');batchBeam(cover,c,d,.06,'#475e53');
    }
    world.add(cover.mesh(style('#ffffff',{vertexColors:true})),coverGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.45,side:THREE.DoubleSide,depthWrite:false,roughness:.2})));
    addCollider({points:g.cover.points,terrainBottom:g.cover.clearance-.1,terrainOffset:g.cover.clearance,base:0});
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function rupertMyers(b,concrete,brick,detail,roofs){
    const g=rupertGeometry(b),f=g.frame,undersides=new Batch(),glass=new Batch();undersides.base=glass.base=b.base;
    const pointAt=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const gridFacade=(a,c,low,high,north=false)=>{
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
      if(north&&(nv<-.6||nu<-.6)){
        if(low<11.3)wallPanel(brick,a,c,low,Math.min(high,11.3),'#806e61');
        if(high>11.6){wallPanel(glass,a,c,11.6,high-.35,'#5b7174',.05);for(let d=.25;d<len;d+=1.5)wallPanel(detail,a,c,11.6,high-.3,'#bdc1b5',.22,d/len,Math.min(1,(d+.25)/len));}
      }else{
        wallPanel(concrete,a,c,low,high,'#bfc4b9');
        const rows=low===g.northUpper?[[low+.25,high-.25,low]]:Array.from({length:5},(_,row)=>[Math.max(low,row*4+.25),Math.min(high-.25,(row+1)*4-.2),row*4]);
        for(const [bottom,top,band] of rows){
          if(top-bottom<.3)continue;
          const count=Math.max(1,Math.round(len/3.1));
          wallPanel(glass,a,c,bottom,top,'#506a70',.04);
          for(let bay=0;bay<count;bay++){
            const l=(bay+.05)/count,r=(bay+.38)/count;
            wallPanel(detail,a,c,bottom,top,bay%4===0?'#b1b9af':'#d1d5c8',.15,l,r);
            wallPanel(detail,a,c,bottom,bottom+(top-bottom)*.32,'#81928b',.07,(bay+.4)/count,(bay+.98)/count);
            wallPanel(detail,a,c,bottom,top,'#b9c4b9',.1,(bay+.66)/count,(bay+.68)/count);
          }
          const bandLow=Math.max(low,band),bandHigh=Math.min(high,band+.25);
          if(bandHigh>bandLow)wallPanel(detail,a,c,bandLow,bandHigh,'#354c4b',.35);
        }
        for(let d=.1;d<len;d+=9.4)wallPanel(detail,a,c,low,high,'#324946',.39,d/len,Math.min(1,(d+.28)/len));
      }
      wallPanel(detail,a,c,high-.25,high,'#3e5150',.4);
    };
    const prism=(part,low,high,mode)=>{
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      polygon(roofs,ring,high,mode==='white'?'#c7cdc0':'#939f96',part.holes);
      // Double-sided undersides are explicit physical floors over the drive.
      if(low>0)polygon(undersides,ring,low,'#d4d8ca',part.holes);
      for(const loop of [ring,...part.holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<loop.length;i++){
        const a=loop[i],c=loop[(i+1)%loop.length],len=distance2(a,c);if(len<.1)continue;
        if(mode==='white'){
          const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,tilt=.65;
          const p=(t,y,offset)=>[a.x+(c.x-a.x)*t+nx*offset,y,a.z+(c.z-a.z)*t+nz*offset];
          const count=Math.max(1,Math.round(len/2.2));
          for(let k=0;k<count;k++){
            const l=(k+.006)/count,r=(k+.994)/count,y=low+(high-low)*(.47+(k%2)*.12);
            for(const [y0,y1] of [[low,y-.018],[y+.018,high]]){
              const off0=tilt*(y0-low)/(high-low),off1=tilt*(y1-low)/(high-low);
              concrete.quad(p(l,y0,off0),p(l,y1,off1),p(r,y1,off1),p(r,y0,off0),'#d4d8ce');
            }
            batchBeam(detail,p(r,low,0),p(r,high,tilt),.012,'#8d9e94');
          }
        }else gridFacade(a,c,low,high,mode==='north');
      }
      addCollider({points:ring,holes:part.holes,bottom:low,top:high,base:b.base});
    };
    for(const part of RUPERT_PARTS){
      if(part.kind==='north-portico'){
        prism(part,g.whiteBoxBottom,g.whiteBoxTop,'white');prism(part,g.northUpper,g.northTop,'north');
      }else if(part.kind==='west-bridge')prism(part,g.corridor.westBottom,g.northTop,'grid');
      else if(part.kind==='east-bridge')prism(part,g.corridor.eastBottom,b.height,'grid');
      else if(part.kind==='north')prism(part,0,g.northTop,'north');
      else prism(part,0,b.height,'grid');
    }
    // Black entrance frame and open middle terrace. Columns stay outside the
    // mapped drive / footway envelope; their precise positions are estimated.
    for(const p of g.columns){
      const ground=terrainHeight(p.x,p.z)-b.base;
      detail.box(p.x,(ground+g.northUpper)/2,p.z,.38,g.northUpper-ground,.38,'#2c4140',Math.atan2(-f.u.z,f.u.x));
      addCollider({x:p.x,z:p.z,radius:p.radius,base:b.base,bottom:ground,top:g.northUpper});
    }
    for(const v of [-8.8,4.8])for(const y of [g.whiteBoxTop-.1,g.northUpper,g.northTop-.1])batchBeam(detail,pointAt(-22.1,v,y),pointAt(-10,v,y),.18,'#304442');
    for(const u of [-22.1,-10])for(const y of [g.northUpper,g.northTop-.1])batchBeam(detail,pointAt(u,-16,y),pointAt(u,4.8,y),.18,'#304442');
    const cover=frameRectangle(f,12.1,1.9,-16.05,-7.6);polygon(roofs,cover,g.whiteBoxTop,'#a8b4a6');polygon(undersides,cover,g.whiteBoxTop-.22,'#d4d8ca');
    const labelA=framePoint(f,-10,-8.85),labelC=framePoint(f,-22.1,-8.85);
    facadeCaption(b,labelA,labelC,'Rupert Myers · North Wing',7.6,g.whiteBoxTop-.6,'#d3ddcc');
    // The southern lawn is already a source courtyard hole. Seats follow the
    // photographed black brick edges while leaving the longitudinal footway open.
    for(const u of [-7,8.5]){
      const a=framePoint(f,u,12),c=framePoint(f,u,25),y=Math.max(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-b.base+.35;
      batchBeam(brick,[a.x,y,a.z],[c.x,y,c.z],.2,'#3f4e45');
    }
    const glazing=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.08,metalness:.62,envMapIntensity:1.1}));
    world.add(glazing,undersides.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    medicalReflection(glazing,framePoint(f,1,8),b.base+9);
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
      if(profile.facade==='ainsworth'){ainsworthBuilding(b);continue;}
      if(profile.facade==='mathews'){mathewsBuilding(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='library'){libraryBuilding(b,masonry,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='tyree'){tyreeBuilding(b,masonry,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='blockhouse'){blockhouseBuilding(b,masonry,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='morven-brown'){morvenBrownBuilding(b,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='squarehouse'){squarehouseBuilding(b,masonry,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='red-centre'){redCentreBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='old-main'){oldMainBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='business-school'){businessSchool(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='law-pavilion'){lawBuilding(b);continue;}
      if(profile.facade==='quadrangle'){quadrangleBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='electrical'){electricalBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='rex-theatre'){rexTheatre(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='sdn-centre'){sdnCentre(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='barker-apartments'){barkerApartments(b,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='vallentine'){vallentineAnnexe(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='parking-station'){parkingStation(b,masonry,brickwork,glass,detail);continue;}
      if(profile.facade==='esme-terrace'){esmeTheatre(b,masonry,glass,detail);continue;}
      if(profile.facade==='science-laboratory'){scienceLaboratory(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='aquatic-pool'){aquaticPool(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='aquatic-gym'){aquaticGym(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='newton'){newtonBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='keith-burrows'){keithBurrows(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='physics-theatre'){physicsTheatre(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='k17'){k17Building(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='willis'){willisAnnexe(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='rupert'){rupertMyers(b,masonry,brickwork,detail,roofs);continue;}
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
      const pieces=[b];
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
                const pad=profile.windowFraction?(1-profile.windowFraction)/2:.13;
                const start=(k+pad)/count,end=(k+1-pad)/count;
                const tint=new THREE.Color(profile.glass).multiplyScalar(.86+random()*.28);
                wallPanel(glass,a,next,low,high,tint,.055,start,end);
                const frame=type==='brick'?'#c0c4bd':'#8c9694';
                const fw=Math.min(.06/length,(end-start)*.12);
                wallPanel(detail,a,next,low-.04,high+.04,frame,.082,start-fw,start);
                wallPanel(detail,a,next,low-.04,high+.04,frame,.082,end,end+fw);
                wallPanel(detail,a,next,low-.05,low,frame,.085,start,end);
                wallPanel(detail,a,next,high,high+.06,frame,.085,start,end);
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

      }
      if(b.id==='pavilion')pavilionBalcony(b,detail,glass);
      addCollider({points:pts,holes:b.holes||[],top:b.height,base:b.base});
    }
    scienceGlazedLinks(campus);
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
    const random=rng(239),candidates=(campus.trees||[]).map(t=>({...t,big:true,retained:true})),trees=[];
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
      if(!c.retained&&(inLawrenceForecourt(c.x,c.z)||inMorvenCourt(c.x,c.z)||inBlockhouseForecourt(c.x,c.z)||inTyreeForecourt(c.x,c.z)||inMathewsForecourt(c.x,c.z)||inAinsworthGarden(c.x,c.z)))continue;
      const fig=c.form==='heritage-fig',fixedTree=['samuels-gum','civil-poplar','rupert-courtyard'].includes(c.form);
      if(inElectricalCourt(c.x,c.z))continue;
      if(c.x<bounds.minX+3||c.x>bounds.maxX-3||c.z<bounds.minZ+3||c.z>bounds.maxZ-3)continue;
      if(blocked(c.x,c.z,null,fixedTree?.55:fig?1:3))continue;
      if(trees.some(t=>distance2(c,t)<(fixedTree?3:c.big?10:8)))continue;
      const n=nearestPath(c.x,c.z);if(n.distance<(n.path?.width||3)/2+(fixedTree?.5:fig?.35:1.4))continue;
      // Keep the actual playing surface clear.
      if(greens.some(g=>/village|pitch|sport|field/i.test(`${g.kind} ${g.name} ${g.id}`)&&inPolygon(c.x,c.z,validPoints(g))))continue;
      trees.push({...c,scale:c.height?c.height/9.5:(c.big?1.1:.8)+random()*.25,rotation:random()*TAU});
      addCollider({x:c.x,z:c.z,radius:fig?.75:c.big?.52:.32,top:c.height||9});
    }
    const morven=morvenGeometry(campus.buildings.find(b=>b.id==='osm-relation-2328645-0'));
    for(const [u,v,height] of [[8,-7,13],[14,3,14]]){const p=framePoint(morven.frame,u,v);trees.push({...p,height,scale:height/9.5,rotation:u,form:'rupert-courtyard'});addCollider({...p,radius:.4,top:height});}
    for(const tree of blockhouseGeometry(campus.buildings.find(b=>b.id==='blockhouse')).trees){trees.push({...tree,scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:.75,top:tree.height});}
    for(const tree of tyreeGeometry(campus.buildings.find(b=>b.id==='tyree')).trees){trees.push({...tree,scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:.75,top:tree.height});}
    for(const tree of ainsworthGeometry(campus.buildings.find(b=>b.id==='osm-way-616805099')).trees){trees.push({...tree,scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:.5,top:tree.height});}
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
        const a=path.points[i],b=path.points[i+1],width=path.renderWidth||path.width||3,road=path.renderSurface==='asphalt'||path.renderSurface!=='paving'&&/road|service|residential|street/i.test(path.kind||path.type||'');
        const item={a,b,width,road};
        for(let x=Math.floor((Math.min(a.x,b.x)-width)/20);x<=Math.floor((Math.max(a.x,b.x)+width)/20);x++)for(let z=Math.floor((Math.min(a.z,b.z)-width)/20);z<=Math.floor((Math.max(a.z,b.z)+width)/20);z++){
          const key=`${x},${z}`;if(!surfaceCells.has(key))surfaceCells.set(key,[]);surfaceCells.get(key).push(item);
        }
      }
      for(const path of paths.filter(p=>p.kind==='steps'&&!ELECTRICAL_REPLACED_STEPS.includes(p.id)&&!TYREE_REPLACED_STEPS.includes(p.id)))for(let i=0;i<path.points.length-1;i++){
        const a=path.points[i],b=path.points[i+1],h0=terrainHeight(a.x,a.z)+.17,h1=terrainHeight(b.x,b.z)+.17;
        if(distance2(a,b)>.2)stairSegments.push({a,b,h0,h1,pathId:path.id,width:path.width||3,count:Math.max(1,Math.ceil(Math.abs(h1-h0)/.17))});
      }
      const bb=data.bounds||{minX:-245,maxX:290,minZ:-240,maxZ:190};
      bounds={minX:bb.minX??bb.west??-245,maxX:bb.maxX??bb.east??290,minZ:bb.minZ??bb.north??-240,maxZ:bb.maxZ??bb.south??190};
      colliders=[];spatial=new Map();found=new Set();curiosities=[];ball=null;totalDistance=0;
      spawn={x:data.spawn?.x??-125,z:data.spawn?.z??-35,heading:data.spawn?.heading??Math.PI/2};
      groundAndPaths();buildingWorld();electricalOutdoor();courtyardLandscape();treesAndFurniture();sportsField();signsAndCuriosities();
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
    const labels={'roundhouse':'ROUNDHOUSE','squarehouse':'SQUAREHOUSE','law':'LAW','business-school':'BUSINESS','red-centre-west':'LAWRENCE CENTRE','village-green':'VILLAGE GREEN'};
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
