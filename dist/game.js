import * as THREE from './vendor/three.module.js';
import { terrainHeight, buildingBase, TERRAIN_GRID } from './terrain.js';
import { buildingAppearance } from './visual-data.js';
import { BUILDING_PARTS } from './building-parts.js';
import { CAMPUS_DETAILS } from './campus-details.js';

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
  let stairSegments=[],surfaceCells=new Map();
  let campus = null, buildings = [], paths = [], greens = [], landmarks = [], bounds = null;
  let colliders = [], spatial = new Map(), spawn = {x:0,z:0,heading:Math.PI/2};
  let paused = true, hidden = false, destroyed = false, locked = false, dragging = false, timeOfDay = 'day', hasStarted = false;
  let player = {x:0,y:0,z:0,vx:0,vz:0,vy:0,heading:Math.PI/2,pitch:0,grounded:true};
  let totalDistance = 0, lastFrame = performance.now(), reportTime = 0, elapsed = 0, animation = 0;
  let curiosities = [], found = new Set(), ball = null, ballSpawn = null, lastInteraction = '';
  let minimapBase = null, minimapInfo = null, shadowAnchor = { x:1e6,z:1e6 };
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
      if (y >= (c.top || 100)-.1 || y+1.65 <= (c.bottom || 0)+.03) continue;
      if (c.points ? circleTouchesPolygon(x,z,radius,c.points,c.holes) : Math.hypot(x-c.x,z-c.z) < radius+c.radius) return true;
    }
    return false;
  }

  function clearInputs() { for (const key in inputs) inputs[key]=false; dragging=false; }
  function surfaceHeight(x,z){
    for(const s of stairSegments){
      const q=nearestOnSegment(x,z,s.a,s.b);
      if(Math.hypot(x-q.x,z-q.z)<=s.width/2+.04){
        return s.h0+(s.h1-s.h0)*Math.floor(q.t*s.count)/s.count+.06;
      }
    }
    let offset=0;
    for(const s of surfaceCells.get(`${Math.floor(x/20)},${Math.floor(z/20)}`)||[]){
      const q=nearestOnSegment(x,z,s.a,s.b);
      if(Math.hypot(x-q.x,z-q.z)<=s.width/2)offset=Math.max(offset,s.road?.055:.22);
    }
    return terrainHeight(x,z)+offset;
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
      polygon(landscape,pts,.005,sport?'#739a70':'#9daf89');
    }
    for(const plaza of campus.plazas||[])polygon(edges,validPoints(plaza),.022,'#d6d1bf');
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

  function buildingWorld() {
    const masonry=new Batch(),brickwork=new Batch(),glass=new Batch(),detail=new Batch(),roofs=new Batch();
    const allBatches=[masonry,brickwork,glass,detail,roofs],random=rng(78);
    for(const b of buildings){
      const pts=validPoints(b);if(pts.length<3)continue;
      b.points=pts;b.extent=extent(pts);b.height=Number(b.height)||12;b.base=buildingBase(pts);
      const profile=buildingAppearance(b);
      if(b.heightSource!=='mapped'&&profile.heightEstimate)b.height=profile.heightEstimate;
      for(const batch of allBatches)batch.base=b.base;
      if(b.id==='osm-way-1178531037'){scientiaCanopy(b,detail,glass);continue;}
      if(b.walkableUnder){
        const h=Math.max(3,b.height),ordered=polygonArea(pts)<0?[...pts].reverse():pts;
        polygon(roofs,pts,h,'#b6b8b4');
        for(let i=0;i<ordered.length;i++)wallPanel(detail,ordered[i],ordered[(i+1)%ordered.length],h-.25,h,'#c2c3bb');
        for(let i=0;i<pts.length;i+=Math.max(1,Math.ceil(pts.length/6))){const p=pts[i];detail.box(p.x,h/2,p.z,.2,h,.2,'#939b98');addCollider({x:p.x,z:p.z,radius:.15,top:h,base:b.base});}
        addCollider({points:pts,bottom:h-.25,top:h,base:b.base});continue;
      }
      if(b.id==='roundhouse'){roundhouse(b,masonry,glass,detail,roofs);addCollider({points:b.points,top:b.height,base:b.base});continue;}
      const pieces=b.id==='library'?[{...b,height:5.6,podium:true},...BUILDING_PARTS.filter(p=>p.parent==='library').map(p=>({...b,...p}))]:[b];
      for(const piece of pieces){
        const ring=piece.points,holes=piece.holes||[],height=piece.height;
        const floors=piece.podium?1:(piece.levels||profile.floors||Math.max(1,Math.round(height/3.7))),level=height/floors;
        const ordered=polygonArea(ring)<0?[...ring].reverse():ring;
        polygon(roofs,ring,height,'#858c8b',holes);
        const wallBatch=/brick|arcade/.test(profile.facade)?brickwork:masonry;
        for(const loop of [ordered,...holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<loop.length;i++){
          const a=loop[i],next=loop[(i+1)%loop.length],length=distance2(a,next);if(length<.2)continue;
          const nx=(next.z-a.z)/length,nz=-(next.x-a.x)/length,angle=Math.atan2(-(next.z-a.z),next.x-a.x);
          const along=(d,y=0,offset=0)=>({x:a.x+(next.x-a.x)*d/length+nx*offset,z:a.z+(next.z-a.z)*d/length+nz*offset,y});
          wallPanel(wallBatch,a,next,0,height,profile.color);
          // A weathered stone/concrete plinth and roof coping anchor every mass.
          wallPanel(detail,a,next,0,.48,'#8e9286',.03);
          wallPanel(detail,a,next,height-.25,height+.45,profile.trim,.12);
          wallPanel(detail,a,next,height+.43,height+.54,'#aaa99e',.19);
          const type=piece.podium?'bands':profile.facade;
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
                const start=(k+(type==='library'?.31:.13))/count,end=(k+(type==='library'?.69:.87))/count;
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
      if(b.id==='osm-way-45229649')quadrangleTower(b,masonry,detail);
      addCollider({points:pts,holes:b.holes||[],top:b.height,base:b.base});
    }
    const concrete=surfaceTexture('concrete'),brick=surfaceTexture('brick');
    world.add(masonry.mesh(style('#ffffff',{vertexColors:true,map:concrete,bumpMap:concrete,bumpScale:.035})));
    world.add(brickwork.mesh(style('#ffffff',{vertexColors:true,map:brick,bumpMap:brick,bumpScale:.075})));
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
      if(c.x<bounds.minX+3||c.x>bounds.maxX-3||c.z<bounds.minZ+3||c.z>bounds.maxZ-3)continue;
      if(blocked(c.x,c.z,null,3))continue;
      if(trees.some(t=>distance2(c,t)<(c.big?10:8)))continue;
      const n=nearestPath(c.x,c.z);if(n.distance<(n.path?.width||3)/2+1.4)continue;
      // Keep the actual playing surface clear.
      if(greens.some(g=>/village|pitch|sport|field/i.test(`${g.kind} ${g.name} ${g.id}`)&&inPolygon(c.x,c.z,validPoints(g))))continue;
      trees.push({...c,scale:c.height?c.height/9.5:(c.big?1.1:.8)+random()*.25,rotation:random()*TAU});
      addCollider({x:c.x,z:c.z,radius:c.big?.52:.32,top:9});
    }
    const branchCount=trees.length*9;
    const branches=new THREE.InstancedMesh(new THREE.CylinderGeometry(.72,1,1,9),style('#c2bfb0',{map:surfaceTexture('bark')}),branchCount);
    const leafCount=trees.length*64;
    const leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(1.9,1.9),style('#8b9d7b',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide,roughness:.93}),leafCount);
    branches.castShadow=true;branches.receiveShadow=true;leaves.castShadow=true;leaves.receiveShadow=true;
    const dummy=new THREE.Object3D();let branchIndex=0,leafIndex=0;
    const branch=(a,b,radius)=>{
      const direction=new THREE.Vector3(b.x-a.x,b.y-a.y,b.z-a.z);
      dummy.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);dummy.quaternion.setFromUnitVectors(UP,direction.clone().normalize());dummy.scale.set(radius,direction.length(),radius);dummy.updateMatrix();branches.setMatrixAt(branchIndex++,dummy.matrix);
    };
    for(const t of trees){
      const s=t.scale*.86,base=terrainHeight(t.x,t.z),fork=base+4.4*s;
      branch({x:t.x,y:base,z:t.z},{x:t.x+.12*s,y:fork,z:t.z},.34*s);
      for(let j=0;j<4;j++){
        const a=t.rotation+j/4*TAU,mid={x:t.x+Math.cos(a)*1.5*s,y:fork+2.6*s,z:t.z+Math.sin(a)*1.5*s};
        branch({x:t.x,y:fork-.5*s,z:t.z},mid,.18*s);
        branch(mid,{x:t.x+Math.cos(a)*3*s,y:base+(9.2+(j%2))*s,z:t.z+Math.sin(a)*3*s},.09*s);
      }
      for(let j=0;j<64;j++){
        const a=random()*TAU,r=Math.sqrt(random())*3.7*s,cy=base+(8.8+Math.sin(j)*1.2)*s;
        dummy.position.set(t.x+Math.cos(a)*r,cy+(random()-.5)*2.6*s,t.z+Math.sin(a)*r);
        dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);const size=(.75+random()*.5)*s;dummy.scale.set(size,size,size);dummy.updateMatrix();leaves.setMatrixAt(leafIndex,dummy.matrix);leaves.setColorAt(leafIndex,new THREE.Color(['#8e9d7b','#b4bd9d','#a1b48b','#b9c29f'][j%4]));leafIndex++;
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
    const green=greens.find(g=>/village|pitch|sport|field/i.test(`${g.kind} ${g.name} ${g.id}`));
    const landmark=landmarks.find(l=>l.id==='village-green');
    const e=green?extent(validPoints(green)):{x:landmark?.x||-57,z:landmark?.z||46,width:115,depth:150};
    const w=Math.min(e.width-12,102),d=Math.min(e.depth-12,134);
    if(w<20||d<20)return;
    const pitch=new Batch(),mark=new Batch(),metal=new Batch();
    const cx=e.x,cz=e.z;
    for(let i=0;i<12;i++) {
      const x=cx-w/2+i*w/12;
      pitch.quad([x,.026,cz-d/2],[x+w/12,.026,cz-d/2],[x+w/12,.026,cz+d/2],[x,.026,cz+d/2],i%2?'#739b75':'#7a9f79');
    }
    const line=(a,b,width=.12)=>ribbon(mark,[a,b],width,.056,'#e3e8d3');
    const rect=(x,z,width,depth)=>{const ps=[{x:x-width/2,z:z-depth/2},{x:x+width/2,z:z-depth/2},{x:x+width/2,z:z+depth/2},{x:x-width/2,z:z+depth/2}];for(let i=0;i<4;i++)line(ps[i],ps[(i+1)%4]);};
    rect(cx,cz,w,d);line({x:cx-w/2,z:cz},{x:cx+w/2,z:cz});
    const ring=[];for(let i=0;i<=64;i++)ring.push({x:cx+Math.cos(i/64*TAU)*9.15,z:cz+Math.sin(i/64*TAU)*9.15});ribbon(mark,ring,.12,.057,'#e3e8d3');
    for(const side of [-1,1]) {
      rect(cx,cz+side*(d/2-8.5),Math.min(40,w*.62),17);
      rect(cx,cz+side*(d/2-2.75),18.3,5.5);
      const gz=cz+side*d/2;
      metal.box(cx-3.66,1.22,gz,.12,2.44,.12,'#e8e7d4');metal.box(cx+3.66,1.22,gz,.12,2.44,.12,'#e8e7d4');metal.box(cx,2.44,gz,7.44,.12,.12,'#e8e7d4');
      for(let j=0;j<13;j++) {const x=cx-3.66+j*7.32/12;line({x,z:gz},{x,z:gz+side*1.8},.035);metal.box(x,1.1,gz+side*1.8,.018,2.2,.018,'#b8c3ac');}
      for(let j=0;j<7;j++)metal.box(cx,j*.35,gz+side*1.8,7.32,.018,.018,'#b8c3ac');
    }
    world.add(pitch.mesh(style('#ffffff',{vertexColors:true}),false),mark.mesh(style('#ffffff',{vertexColors:true}),false),metal.mesh(style('#ffffff',{vertexColors:true})));
    ballSpawn={x:cx-w*.2,y:terrainHeight(cx-w*.2,cz-d*.26)+.29,z:cz-d*.26};
    createBall();
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

  function environment() {
    const cloudMat=new THREE.MeshBasicMaterial({color:'#eaf0e9',fog:true});
    const cloudGeo=new THREE.IcosahedronGeometry(1,1);
    const random=rng(160);
    for(let i=0;i<12;i++) {
      const cloud=new THREE.Mesh(cloudGeo,cloudMat);cloud.position.set((random()-.5)*1400,150+random()*80,(random()-.5)*1400);cloud.scale.set(50+random()*70,8+random()*9,25+random()*30);cloud.rotation.y=random()*TAU;world.add(cloud);
    }
    // Low stone seats at the Green, facing the playing surface.
    const g=greens.find(g=>/village|pitch|sport|field/i.test(`${g.kind} ${g.id}`));
    if(g) {
      const e=extent(validPoints(g)),seats=new Batch();
      for(let i=0;i<3;i++)seats.box(e.maxX+1.8+i*1.2,.22+i*.22,e.z,1.1,.45+i*.44,Math.min(46,e.depth*.5),'#c3c1af');
      world.add(seats.mesh(style('#ffffff',{vertexColors:true})));
    }
  }

  function disposeWorld() {
    const geometries=new Set(),materials=new Set(),textures=new Set();
    world.traverse(object=>{if(object.geometry)geometries.add(object.geometry);for(const mat of Array.isArray(object.material)?object.material:object.material?[object.material]:[]){materials.add(mat);for(const value of Object.values(mat))if(value?.isTexture)textures.add(value);}});
    for(const geo of geometries)geo.dispose();for(const mat of materials)mat.dispose();for(const texture of textures)texture.dispose();
    scene.remove(world);world=new THREE.Group();scene.add(world);
  }

  function loadCampus(data) {
    try {
      clearInputs();disposeWorld();campus=data;
      buildings=(data.buildings||[]).map(b=>({...b,points:validPoints(b)})).filter(b=>b.points.length>=3);
      paths=data.paths||data.roads||[];greens=data.greens||data.parks||[];landmarks=(data.landmarks||[]).map(l=>({...l,...(l.position||{})}));
      stairSegments=[];surfaceCells=new Map();
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
      groundAndPaths();buildingWorld();treesAndFurniture();sportsField();signsAndCuriosities();environment();
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
    Object.assign(player,{x:p.x,y:surfaceHeight(p.x,p.z),z:p.z,vx:0,vz:0,vy:0,grounded:true,pitch:0});
    const b=buildings.find(b=>b.id===id);if(b)player.heading=Math.atan2(b.extent.x-p.x,-(b.extent.z-p.z));
    clearInputs();updateCamera(0);report();return true;
  }

  function teleportTo(position) {
    if(!campus||!Number.isFinite(position?.x)||!Number.isFinite(position?.z))return false;
    const p=safePoint({x:clamp(position.x,bounds.minX+2,bounds.maxX-2),z:clamp(position.z,bounds.minZ+2,bounds.maxZ-2)});
    Object.assign(player,{x:p.x,y:surfaceHeight(p.x,p.z),z:p.z,vx:0,vz:0,vy:0,grounded:true,pitch:0});
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
    shadowAnchor.x=1e6;updateSun();report();
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
      if(previousY<c.top-.08||player.y>c.top)continue;
      if(c.points?circleTouchesPolygon(player.x,player.z,.26,c.points):Math.hypot(player.x-c.x,player.z-c.z)<c.radius+.26)floor=Math.max(floor,c.top);
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
    const ballFloor=terrainHeight(ball.x,ball.z)+.28;
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
    for(const green of greens)if(inPolygon(player.x,player.z,validPoints(green)))return green.name||'Village Green';
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
    return {position:{x:player.x,y:player.y,z:player.z},speed:Math.hypot(player.vx,player.vz),elevation:terrainHeight(player.x,player.z),distance:totalDistance,area:areaName(),found:[...found],discoveries:curiosities.filter(c=>found.has(c.id)).map(c=>({id:c.id,name:c.name})),totalDiscoveries:curiosities.length,locked,paused:paused||hidden,nearBall,canInteract:nearBall,interactionHint:nearBall?'Press E to kick the ball':'',heading:player.heading,pitch:player.pitch,grounded:player.grounded,time:timeOfDay,ball:ball?{x:ball.x,y:ball.y,z:ball.z}:null,interaction:lastInteraction};
  }

  function report() { onUpdate(getState());drawMinimap(); }

  function makeMinimap() {
    if(!minimap||!bounds)return;
    const w=640,h=540,pad=22,scale=Math.min((w-pad*2)/(bounds.maxX-bounds.minX),(h-pad*2)/(bounds.maxZ-bounds.minZ));
    const ox=(w-(bounds.maxX-bounds.minX)*scale)/2-bounds.minX*scale,oz=(h-(bounds.maxZ-bounds.minZ)*scale)/2-bounds.minZ*scale;
    minimapBase=document.createElement('canvas');minimapBase.width=w;minimapBase.height=h;minimapInfo={w,h,scale,ox,oz};
    const ctx=minimapBase.getContext('2d');ctx.fillStyle='#e8ecdf';ctx.fillRect(0,0,w,h);
    const poly=(pts,fill)=>{if(!pts.length)return;ctx.beginPath();ctx.moveTo(ox+pts[0].x*scale,oz+pts[0].z*scale);for(const p of pts.slice(1))ctx.lineTo(ox+p.x*scale,oz+p.z*scale);ctx.closePath();ctx.fillStyle=fill;ctx.fill();};
    for(const g of greens)poly(validPoints(g),'#b2c8a2');
    ctx.lineCap='round';ctx.lineJoin='round';
    for(const p of paths){const pts=validPoints(p);if(!pts.length)continue;ctx.beginPath();ctx.moveTo(ox+pts[0].x*scale,oz+pts[0].z*scale);for(const q of pts.slice(1))ctx.lineTo(ox+q.x*scale,oz+q.z*scale);ctx.lineWidth=Math.max(1,(p.width||3)*scale);ctx.strokeStyle=/road|service/i.test(p.kind||'')?'#c0c5bd':'#f9f5e9';ctx.stroke();}
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
