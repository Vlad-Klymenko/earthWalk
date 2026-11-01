import * as THREE from './vendor/three.module.js';

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
  constructor() { this.positions = []; this.colors = []; this.uvs = []; }
  triangle(a, b, c, color, uv = null) {
    const col = color instanceof THREE.Color ? color : new THREE.Color(color);
    for (let i = 0; i < 3; i++) {
      const p = [a, b, c][i];
      this.positions.push(p[0], p[1], p[2]);
      this.colors.push(col.r, col.g, col.b);
      this.uvs.push(...(uv?.[i] || [p[0] / 2, p[2] / 2]));
    }
  }
  quad(a, b, c, d, color) { this.triangle(a, b, c, color); this.triangle(a, c, d, color); }
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
    batch.triangle([allPoints[a].x,y,allPoints[a].z], [allPoints[c].x,y,allPoints[c].z], [allPoints[b].x,y,allPoints[b].z], color);
  }
}

function ribbon(batch, points, width, y, color) {
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i], b = points[i+1], length = distance2(a,b);
    if (length < .02) continue;
    const nx = -(b.z-a.z) / length * width/2, nz = (b.x-a.x) / length * width/2;
    batch.quad([a.x+nx,y,a.z+nz],[b.x+nx,y,b.z+nz],[b.x-nx,y,b.z-nz],[a.x-nx,y,a.z-nz],color);
  }
  for (const p of points) {
    for (let s = 0; s < 12; s++) {
      const a = s/12*TAU, b = (s+1)/12*TAU;
      batch.triangle([p.x,y,p.z],[p.x+Math.cos(b)*width/2,y,p.z+Math.sin(b)*width/2],[p.x+Math.cos(a)*width/2,y,p.z+Math.sin(a)*width/2],color);
    }
  }
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

function textTexture(title, subtitle = '', dark = false) {
  return canvasTexture(1024, 320, (ctx,w,h) => {
    ctx.fillStyle = dark ? '#283b39' : '#f8f5e9'; ctx.fillRect(0,0,w,h);
    ctx.fillStyle = '#e9b450'; ctx.fillRect(0,0,12,h);
    ctx.fillStyle = dark ? '#f7f5e9' : '#263c38';
    ctx.font = '600 44px sans-serif'; ctx.fillText('UNSW  /  KENSINGTON',42,66);
    const font = title.length > 24 ? 53 : title.length > 17 ? 64 : 76;
    ctx.font = `600 ${font}px sans-serif`; ctx.fillText(title,40,166,940);
    ctx.fillStyle = dark ? '#c4d0c9' : '#5f7165'; ctx.font = '30px sans-serif'; ctx.fillText(subtitle,42,247,935);
  });
}

export function createGame({ canvas, minimap, onUpdate = () => {}, onError = () => {} }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.14;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#cbdde5'); scene.fog = new THREE.Fog('#cbdde5', 110, 520);
  const camera = new THREE.PerspectiveCamera(68, 1, .08, 950); camera.rotation.order = 'YXZ';
  const hemisphere = new THREE.HemisphereLight('#e3f0ff', '#8b916f', 2.5); scene.add(hemisphere);
  const sunlight = new THREE.DirectionalLight('#fff0cf', 3.2);
  sunlight.position.set(-100,150,65); sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(2048,2048);
  Object.assign(sunlight.shadow.camera, { left:-105,right:105,top:105,bottom:-105,near:1,far:420 });
  sunlight.shadow.bias = -.00025; sunlight.shadow.normalBias = .08; sunlight.shadow.radius = 3;
  scene.add(sunlight,sunlight.target);

  let world = new THREE.Group(); scene.add(world);
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
  const style = (color, extras={}) => new THREE.MeshStandardMaterial({color,roughness:.88,flatShading:true,...extras});
  const pointCache = new WeakMap();
  const validPoints = (item) => {
    if(pointCache.has(item))return pointCache.get(item);
    const points=(item.points || item.polygon || item.coordinates || []).map(point).filter(p => Number.isFinite(p.x) && Number.isFinite(p.z));
    pointCache.set(item,points);return points;
  };

  function addCollider(c) {
    const e = c.points ? extent(c.points) : {minX:c.x-c.radius,maxX:c.x+c.radius,minZ:c.z-c.radius,maxZ:c.z+c.radius};
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

  function blocked(x,z,y=player.y,radius=.34) {
    if (!bounds || x < bounds.minX+1 || x > bounds.maxX-1 || z < bounds.minZ+1 || z > bounds.maxZ-1) return true;
    for (const c of nearbyColliders(x,z,radius)) {
      if (y >= (c.top || 100)-.1 || y+1.65 <= (c.bottom || 0)+.03) continue;
      if (c.points ? circleTouchesPolygon(x,z,radius,c.points,c.holes) : Math.hypot(x-c.x,z-c.z) < radius+c.radius) return true;
    }
    return false;
  }

  function clearInputs() { for (const key in inputs) inputs[key]=false; dragging=false; }
  function safePoint(desired) {
    if (!blocked(desired.x,desired.z,0)) return desired;
    for (let radius=1;radius<90;radius+=radius<10?1:2) for (let i=0;i<24;i++) {
      const p={...desired,x:desired.x+Math.cos(i/24*TAU)*radius,z:desired.z+Math.sin(i/24*TAU)*radius};
      if (!blocked(p.x,p.z,0)) return p;
    }
    return {...spawn};
  }

  function groundAndPaths() {
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(2400,2400),style('#b7c19d'));
    ground.rotation.x=-Math.PI/2; ground.position.y=-.08; ground.receiveShadow=true; world.add(ground);
    const landscape = new Batch(), paving = new Batch(), asphalt = new Batch(), edges = new Batch();
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
      ribbon(edges,pts,width+.5,.018,road?'#d9d6c7':'#b0aea0');
      ribbon(road?asphalt:paving,pts,width,.035,road?'#747b7b':'#f2e7d5');
    }
    const texture=brickTexture(); texture.wrapS=texture.wrapT=THREE.RepeatWrapping; texture.repeat.set(1,1); texture.anisotropy=4;
    world.add(landscape.mesh(style('#ffffff',{vertexColors:true}),false));
    world.add(edges.mesh(style('#ffffff',{vertexColors:true}),false));
    world.add(paving.mesh(style('#ffffff',{map:texture,vertexColors:true}),false));
    world.add(asphalt.mesh(style('#ffffff',{vertexColors:true}),false));
  }

  function wallPanel(batch,a,b,bottom,top,color,offset=0,start=0,end=1) {
    const dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz)||1;
    const nx=dz/length, nz=-dx/length;
    const p=(t,y)=>[a.x+dx*t+nx*offset,y,a.z+dz*t+nz*offset];
    batch.quad(p(start,bottom),p(start,top),p(end,top),p(end,bottom),color);
  }

  function buildingWorld() {
    const masonry=new Batch(), glass=new Batch(), detail=new Batch(), roofs=new Batch();
    const random=rng(78);
    for (const b of buildings) {
      const pts=validPoints(b); if(pts.length<3) continue;
      b.points=pts; b.extent=extent(pts); b.height=Number(b.height)||12;
      const id=`${b.id||''} ${b.name||''} ${b.kind||''}`.toLowerCase();
      if(b.walkableUnder) {
        const height=Math.max(3,b.height),ordered=polygonArea(pts)<0?[...pts].reverse():pts;
        polygon(roofs,pts,height,'#d3d2bf');
        for(let i=0;i<ordered.length;i++)wallPanel(detail,ordered[i],ordered[(i+1)%ordered.length],height-.2,height,'#dddccc');
        for(let i=0;i<pts.length;i+=Math.max(1,Math.ceil(pts.length/6))) {
          const p=pts[i];detail.box(p.x,height/2,p.z,.18,height,.18,'#a5ada3');addCollider({x:p.x,z:p.z,radius:.13,top:height});
        }
        addCollider({points:pts,bottom:height-.2,top:height});continue;
      }
      if (/roundhouse/.test(id)) { roundhouse(b,masonry,glass,detail,roofs); addCollider({points:pts,top:b.height}); continue; }
      const isLaw=/\blaw\b/.test(id), red=/red.centre|anita|lawrence/.test(id), square=/squarehouse/.test(id), business=/business/.test(id);
      const height=b.height, floors=Math.max(1,Math.round(height/(square?3.6:3.9))), level=height/floors;
      let color=red?'#b96346':isLaw?'#c9aa65':square?'#bdbeb1':business?'#e6e3d6':['#c6c5b7','#dfd9c7','#b6b4a8','#c9c3b2'][Math.floor(random()*4)];
      const ordered=polygonArea(pts)<0?[...pts].reverse():pts;
      const holes=(b.holes||[]).map(hole=>hole.map(point));
      polygon(roofs,pts,height,'#b8b9ac',holes);
      const loops=[ordered,...holes.map(hole=>polygonArea(hole)>0?[...hole].reverse():hole)];
      for(const ordered of loops) for(let i=0;i<ordered.length;i++) {
        const a=ordered[i], next=ordered[(i+1)%ordered.length],length=distance2(a,next); if(length<.1) continue;
        const nx=(next.z-a.z)/length,nz=-(next.x-a.x)/length;
        wallPanel(masonry,a,next,0,height,color);
        wallPanel(detail,a,next,height-.35,height+.22,square?'#deded2':'#e4e0cf',.08);
        if (red) {
          // The Red Centre's long terracotta screen and narrow, recessed slots.
          for(let f=0;f<floors;f++) {
            const low=f*level+(f===0?.9:1.25), high=Math.min(height-.65,low+(f===0?1.65:.72));
            if(high>low) wallPanel(glass,a,next,low,high,'#314548',.032,.025,.975);
          }
          if(length>14) for(let p=1.8;p<length-1;p+=6.5) {
            const t=p/length;
            detail.box(a.x+(next.x-a.x)*t+nx*.12,height/2,a.z+(next.z-a.z)*t+nz*.12,.16,height-.35,.22,'#da8b6b',Math.atan2(-(next.z-a.z),next.x-a.x));
          }
        } else {
          for(let f=0;f<floors;f++) {
            const low=f*level+.82, high=Math.min(height-.65,(f+1)*level-.52);
            if(high<=low) continue;
            if(square || business || isLaw) {
              wallPanel(glass,a,next,low,high,isLaw?'#334247':square?'#414d4e':'#526566',.038,.015,.985);
              wallPanel(detail,a,next,high,high+.17,isLaw?'#e6dbb4':'#dddccc',.08);
            } else {
              const count=Math.max(1,Math.floor(length/3.5));
              for(let k=0;k<count;k++) wallPanel(glass,a,next,low,high,'#566a6a',.035,(k+.17)/count,(k+.8)/count);
            }
          }
          const spacing=isLaw?3.3:business?6:square?7:0;
          if(spacing && length>4) for(let d=.3;d<length;d+=spacing) {
            const t=d/length, x=a.x+(next.x-a.x)*t+nx*.28,z=a.z+(next.z-a.z)*t+nz*.28;
            detail.box(x,height/2,z,isLaw?.28:.32,height-.35,isLaw?.8:.4,isLaw?'#e0c584':'#e3e2d7',Math.atan2(-(next.z-a.z),next.x-a.x));
          }
        }
        if(length>12) {
          // Solid pale corners and a dark, human-sized entrance anchor the facade.
          const t=.5, doorHalf=Math.min(.06,1.2/length);
          wallPanel(glass,a,next,.08,2.7,'#24383a',.05,t-doorHalf,t+doorHalf);
          detail.box((a.x+next.x)/2+nx*.8,2.88,(a.z+next.z)/2+nz*.8,Math.min(5,length*.4),.16,1.65,red?'#cb714e':'#eee8d6',Math.atan2(-(next.z-a.z),next.x-a.x));
        }
      }
      if(red && b.extent.width>25) {
        // Pale service/stair cores break up the distinctive red screen wall.
        detail.box(b.extent.maxX-2,height/2,b.extent.z,3,height+1,Math.min(8,b.extent.depth*.65),'#e8e4d6');
      }
      addCollider({points:pts,holes,top:height});
    }
    world.add(masonry.mesh(style('#ffffff',{vertexColors:true})));
    world.add(glass.mesh(style('#ffffff',{vertexColors:true,roughness:.32,metalness:.18})));
    world.add(detail.mesh(style('#ffffff',{vertexColors:true})));
    world.add(roofs.mesh(style('#ffffff',{vertexColors:true})));
  }

  function roundhouse(b,masonry,glass,detail,roofs) {
    const e=b.extent,cx=e.x,cz=e.z,rx=e.width/2,rz=e.depth/2;
    const radius=Math.min(rx,rz),height=clamp(b.height,7.5,10.5),segments=64;
    const pts=[]; for(let i=0;i<segments;i++) pts.push({x:cx+Math.cos(i/segments*TAU)*radius,z:cz+Math.sin(i/segments*TAU)*radius});
    b.points=pts; b.height=height;
    for(let i=0;i<segments;i++) {
      const a=pts[i],next=pts[(i+1)%segments];
      wallPanel(masonry,a,next,0,height,'#c8c2a7');
      wallPanel(glass,a,next,.45,3.4,'#344448',.045,.04,.96);
      wallPanel(glass,a,next,4.65,height-.65,'#4b5a58',.045,.04,.96);
      wallPanel(detail,a,next,3.65,4.25,'#d8d4bd',.2);
      const angle=i/segments*TAU;
      detail.box(cx+Math.cos(angle)*(radius+.12),height/2,cz+Math.sin(angle)*(radius+.12),.18,height,.22,'#e5e0c9',-angle);
    }
    polygon(roofs,pts,height,'#c1c2b4');
    const rim=new THREE.Mesh(new THREE.CylinderGeometry(radius+1.5,radius+1.5,.38,64),style('#e2dfca'));
    rim.position.set(cx,height+.1,cz); rim.castShadow=true;rim.receiveShadow=true; world.add(rim);
    const canopy=new THREE.Mesh(new THREE.CylinderGeometry(radius+3.1,radius+2.9,.18,64),style('#dbd9c7'));
    canopy.position.set(cx,3.65,cz);canopy.castShadow=true;world.add(canopy);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(radius*.38,radius*.4,1.1,32),style('#d0d0bd'));
    cap.position.set(cx,height+.65,cz); cap.castShadow=true;world.add(cap);
    // The balcony has a light, open rhythm instead of a heavy solid wall.
    for(let i=0;i<48;i++) {
      const a=i/48*TAU,x=cx+Math.cos(a)*(radius+1.4),z=cz+Math.sin(a)*(radius+1.4);
      detail.box(x,4.43,z,.06,.75,.06,'#586660');
    }
    const rail=new THREE.Mesh(new THREE.TorusGeometry(radius+1.4,.055,5,64),style('#65706a'));
    rail.rotation.x=Math.PI/2;rail.position.set(cx,4.8,cz);world.add(rail);
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
    const random=rng(239),candidates=[],trees=[];
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
      if(blocked(c.x,c.z,0,3))continue;
      if(trees.some(t=>distance2(c,t)<(c.big?10:8)))continue;
      const n=nearestPath(c.x,c.z);if(n.distance<(n.path?.width||3)/2+1.4)continue;
      // Keep the actual playing surface clear.
      if(greens.some(g=>/village|pitch|sport|field/i.test(`${g.kind} ${g.name} ${g.id}`)&&inPolygon(c.x,c.z,validPoints(g))))continue;
      trees.push({...c,scale:(c.big?1.1:.8)+random()*.25,rotation:random()*TAU});
      addCollider({x:c.x,z:c.z,radius:c.big?.52:.32,top:9});
    }
    const trunk=new THREE.InstancedMesh(new THREE.CylinderGeometry(.36,.55,7.3,7),style('#81745c'),trees.length);
    const leafCount=trees.length*4,leaves=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),style('#ffffff',{vertexColors:false,emissive:'#718458',emissiveIntensity:.12}),leafCount);
    trunk.castShadow=true;leaves.castShadow=true;leaves.receiveShadow=true;
    const dummy=new THREE.Object3D();let index=0;
    for(let i=0;i<trees.length;i++) {
      const t=trees[i],s=t.scale;
      dummy.position.set(t.x,3.65*s,t.z);dummy.scale.set(s,s,s);dummy.rotation.set(0,t.rotation,0);dummy.updateMatrix();trunk.setMatrixAt(i,dummy.matrix);
      for(let j=0;j<4;j++) {
        const a=t.rotation+j/4*TAU,r=j===3?.3:2.7;
        dummy.position.set(t.x+Math.cos(a)*r*s,(9.5+(j===3?1.6:0))*s,t.z+Math.sin(a)*r*s);
        dummy.scale.set((j===3?4.2:4.7)*s,(j===3?3.5:3.3)*s,(j===3?4.2:4.7)*s);dummy.rotation.set(.1*j,a,.08*j);dummy.updateMatrix();
        leaves.setMatrixAt(index,dummy.matrix);leaves.setColorAt(index,new THREE.Color(['#78965d','#87a56c','#95af75','#a4bc82'][j]));index++;
      }
    }
    world.add(trunk,leaves);
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
          if(blocked(x,z,0,1.6))continue;
          const angle=Math.atan2(-dz,dx);benchSites.push({x,z,angle});
          furniture.box(x,.48,z,2.3,.15,.6,'#aa7f55',angle);
          const nx=Math.sin(angle),nz=Math.cos(angle);
          furniture.box(x+nx*.27,.9,z+nz*.27,2.3,.7,.12,'#a78057',angle);
          for(const s of [-.8,.8]) metal.box(x+dx*s,.24,z+dz*s,.1,.5,.48,'#52615a',angle);
          const co=Math.cos(angle),si=-Math.sin(angle),ptsBench=[[-1.2,-.36],[1.2,-.36],[1.2,.36],[-1.2,.36]].map(([xx,zz])=>({x:x+xx*co-zz*si,z:z+xx*si+zz*co}));
          addCollider({points:ptsBench,top:.58});
          const lx=x-dz*1.8,lz=z+dx*1.8;
          metal.box(lx,2.6,lz,.13,5.2,.13,'#55655c');metal.box(lx,5.25,lz,.75,.15,.75,'#e8e4cb');
        }
      }
    }
    world.add(furniture.mesh(style('#ffffff',{vertexColors:true})),metal.mesh(style('#ffffff',{vertexColors:true})));
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
    ballSpawn={x:cx-w*.2,y:.29,z:cz-d*.26};
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
    ball={mesh:group,x:ballSpawn.x,y:.3,z:ballSpawn.z,vx:0,vy:0,vz:0};group.position.set(ball.x,ball.y,ball.z);
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
      const board=new THREE.Mesh(new THREE.BoxGeometry(3.4,1.08,.14),style('#e8e4d5'));
      board.position.y=2.35;board.castShadow=true;sign.add(board);
      const face=new THREE.Mesh(new THREE.PlaneGeometry(3.36,1.05),new THREE.MeshBasicMaterial({map:textTexture(l.name||b?.name||l.id,l.id==='village-green'?'Play a little. Stay a while.':'KENSINGTON CAMPUS  •  EXPLORE ON FOOT'),side:THREE.DoubleSide}));
      face.position.set(0,2.35,.077);sign.add(face);
      for(const s of [-1.3,1.3]) {const post=new THREE.Mesh(new THREE.BoxGeometry(.11,2.5,.11),style('#4c6055'));post.position.set(s,1.25,0);post.castShadow=true;sign.add(post);}
      sign.position.set(safe.x+Math.cos(angle)*2.5,0,safe.z+Math.sin(angle)*2.5);sign.rotation.y=-angle;world.add(sign);
      if(['roundhouse','law','red-centre-west','business-school','squarehouse','library'].includes(l.id)) {
        const labelTexture=canvasTexture(1024,160,(ctx,w,h)=>{
          ctx.fillStyle='#f4f1e5';ctx.fillRect(0,0,w,h);ctx.fillStyle='#dda550';ctx.fillRect(0,0,9,h);
          ctx.fillStyle='#344b43';ctx.font='600 65px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(l.name,w/2,h/2,960);
        });
        const label=new THREE.Sprite(new THREE.SpriteMaterial({map:labelTexture,depthTest:true}));
        label.position.set(safe.x,5,safe.z);label.scale.set(8.5,1.33,1);world.add(label);
      }
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
      group.position.set(p.x,0,p.z);world.add(group);
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
      const bb=data.bounds||{minX:-245,maxX:290,minZ:-240,maxZ:190};
      bounds={minX:bb.minX??bb.west??-245,maxX:bb.maxX??bb.east??290,minZ:bb.minZ??bb.north??-240,maxZ:bb.maxZ??bb.south??190};
      colliders=[];spatial=new Map();found=new Set();curiosities=[];ball=null;totalDistance=0;
      spawn={x:data.spawn?.x??-125,z:data.spawn?.z??-35,heading:data.spawn?.heading??Math.PI/2};
      groundAndPaths();buildingWorld();treesAndFurniture();sportsField();signsAndCuriosities();environment();
      spawn=safePoint(spawn);reset();makeMinimap();report();
    }catch(error){onError(error);throw error;}
  }

  function reset() {
    clearInputs();player={x:spawn.x,y:0,z:spawn.z,vx:0,vz:0,vy:0,heading:spawn.heading??Math.PI/2,pitch:0,grounded:true};
    if(ball&&ballSpawn){Object.assign(ball,{x:ballSpawn.x,y:.3,z:ballSpawn.z,vx:0,vy:0,vz:0});ball.mesh.position.set(ball.x,ball.y,ball.z);}
    totalDistance=0;lastInteraction='';updateCamera(0);report();
  }

  function teleport(id) {
    let l=landmarks.find(l=>l.id===id)||curiosities.find(l=>l.id===id);
    const building=buildings.find(b=>b.id===id);
    if(!l&&building){const e=building.extent,q=nearestPath(e.x,e.z);l={x:q.x,z:q.z};}
    if(!l)return false;
    const p=safePoint(l.walkPoint||l.teleport||l);
    Object.assign(player,{x:p.x,y:0,z:p.z,vx:0,vz:0,vy:0,grounded:true,pitch:0});
    const b=buildings.find(b=>b.id===id);if(b)player.heading=Math.atan2(b.extent.x-p.x,-(b.extent.z-p.z));
    clearInputs();updateCamera(0);report();return true;
  }

  function teleportTo(position) {
    if(!campus||!Number.isFinite(position?.x)||!Number.isFinite(position?.z))return false;
    const p=safePoint({x:clamp(position.x,bounds.minX+2,bounds.maxX-2),z:clamp(position.z,bounds.minZ+2,bounds.maxZ-2)});
    Object.assign(player,{x:p.x,y:0,z:p.z,vx:0,vz:0,vy:0,grounded:true,pitch:0});
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
    sunlight.color.set(golden?'#ffd2a0':'#fff0cf');sunlight.intensity=golden?3.3:3.2;
    hemisphere.color.set(golden?'#e3e4ee':'#e3f0ff');hemisphere.intensity=golden?2.0:2.5;
    scene.background.set(golden?'#e3d9c8':'#cbdde5');scene.fog.color.copy(scene.background);
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
      if(!blocked(player.x+dx/steps,player.z))player.x+=dx/steps;else player.vx=0;
      if(!blocked(player.x,player.z+dz/steps))player.z+=dz/steps;else player.vz=0;
    }
    const previousY=player.y;player.vy-=18*dt;player.y+=player.vy*dt;
    let floor=0;
    for(const c of nearbyColliders(player.x,player.z,.32)) {
      if(c.top>2||previousY<c.top-.08||player.y>c.top)continue;
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
    if(ball.y<.28){ball.y=.28;ball.vy=Math.abs(ball.vy)>.8?-ball.vy*.48:0;const drag=Math.exp(-dt*1.05);ball.vx*=drag;ball.vz*=drag;}
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
    sunlight.target.position.set(shadowAnchor.x,0,shadowAnchor.z);sunlight.target.updateMatrixWorld();
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
    return {position:{x:player.x,y:player.y,z:player.z},speed:Math.hypot(player.vx,player.vz),distance:totalDistance,area:areaName(),found:[...found],discoveries:curiosities.filter(c=>found.has(c.id)).map(c=>({id:c.id,name:c.name})),totalDiscoveries:curiosities.length,locked,paused:paused||hidden,nearBall,canInteract:nearBall,interactionHint:nearBall?'Press E to kick the ball':'',heading:player.heading,pitch:player.pitch,grounded:player.grounded,time:timeOfDay,ball:ball?{x:ball.x,y:ball.y,z:ball.z}:null,interaction:lastInteraction};
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
    if(document.pointerLockElement===canvas)document.exitPointerLock?.();disposeWorld();renderer.dispose();
  }

  return{loadCampus,setPaused,reset,teleport,teleportTo,setTime,setInput,look,jump,interact,getState,destroy};
}
