import { CAMPUS } from './campus-enhancements.js?v=fafc541ec63f';
import { createGame } from './game.js?v=fafc541ec63f';
import { terrainHeight, TERRAIN_SOURCE } from './terrain.js?v=fafc541ec63f';
import { VISUAL_REFERENCES, buildingAppearance } from './visual-data.js?v=fafc541ec63f';
import { heightDescription } from './building-heights.js?v=fafc541ec63f';

const $ = id => document.getElementById(id);
let game, state, started = false, toastTimer, restoreAfterModal = false, mapProjection, selected;
const places = CAMPUS.landmarks.filter((place, index, all) => all.findIndex(other => other.name === place.name) === index).sort((a, b) => a.name.localeCompare(b.name));
const buildings = CAMPUS.buildings;
const descriptions = {
  roundhouse: 'The campus’s circular live music and social venue. E6, near the Anzac Parade entrance.',
  law: 'The distinctive faceted Law Building, beside University Mall. F8.',
  'village-green': 'The open sports field and green heart of lower campus.',
  'university-mall': 'The main pedestrian spine from Anzac Parade into campus.',
  'red-centre-west': 'The Red Centre / Anita B. Lawrence Centre. Look for the long terracotta walls.',
  'business-school': 'The UNSW Business School. E12, beside Union Road.',
};

function notify(message, duration = 3500) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').hidden = false;
  toastTimer = setTimeout(() => $('toast').hidden = true, duration);
}

function update(next) {
  state = next;
  $('current-area').textContent = next.area || 'UNSW Kensington';
  $('walked').textContent = (next.distance < 1000 ? `${Math.floor(next.distance || 0)} m wandered` : `${(next.distance / 1000).toFixed(2)} km wandered`) + ` · ${Number(next.elevation||0).toFixed(1)} m elevation`;
  $('crosshair').hidden = !started || next.paused || $('map-dialog').open || $('help-dialog').open;
  $('paused').hidden = !started || !next.paused || $('map-dialog').open || $('help-dialog').open;
  $('pause').setAttribute('aria-label', next.paused ? 'Resume' : 'Pause');
  $('pause').querySelector('use').setAttribute('href', next.paused ? '#play-icon' : '#pause-icon');
  $('look-guide').textContent = next.locked ? 'ESC releases mouse' : 'click or drag to look';
  $('interaction').hidden = !started || !next.canInteract || next.paused;
  if (next.canInteract) $('interaction').querySelector('span').textContent = 'Kick the ball';
  if ($('map-dialog').open) drawMap();
}

function start({ lock = true } = {}) {
  started = true;
  $('welcome').hidden = true;
  game.setPaused(false);
  $('world').focus({ preventScroll: true });
  if (lock && $('world').requestPointerLock) {
    try { $('world').requestPointerLock()?.catch?.(() => {}); } catch { /* Drag to look works in embedded browsers. */ }
  }
}

function openDialog(dialog) {
  if (!game) return;
  restoreAfterModal = started && !state?.paused;
  if (document.pointerLockElement) document.exitPointerLock?.();
  game.setPaused(true);
  dialog.showModal();
  $('paused').hidden = true;
  if (dialog === $('map-dialog')) { renderList(); requestAnimationFrame(drawMap); }
}

for (const id of ['map-dialog', 'help-dialog']) {
  $(id).addEventListener('close', () => {
    if (restoreAfterModal) game.setPaused(false);
    $('world').focus({ preventScroll: true });
    update(game.getState());
  });
}

function choose(place) {
  selected = place;
  $('selected-name').textContent = place.name;
  const building=buildings.find(b=>b.id===place.id);
  const visual=building&&buildingAppearance(building);
  const dimensions=heightDescription(building,visual);
  const height=dimensions?` ${dimensions.quantity}: ${dimensions.metres.toFixed(1)} m (${dimensions.label}).${building.heightNote?` ${building.heightNote}`:''}`:'';
  $('selected-description').textContent = (descriptions[place.id] || (place.description ? `${place.description}. Explore the exterior and nearby paths.` : 'A place on campus. Jump nearby, then explore on foot.')) + ` Ground: ${terrainHeight(place.x,place.z).toFixed(1)} m.`+height;
  const sourceLink=$('selected-height-source');
  sourceLink.hidden=!dimensions?.reference;
  if(dimensions?.reference){sourceLink.href=dimensions.reference.url;sourceLink.textContent=dimensions.reference.printedPage?`Height source · report p. ${dimensions.reference.printedPage} ↗`:(dimensions.reference.linkLabel||'Height source · OpenStreetMap part')+' ↗';}
  document.querySelectorAll('#building-list button').forEach(button => button.classList.toggle('selected', button.dataset.id === place.id));
  drawMap();
}

function renderList() {
  const query = $('building-search').value.trim().toLowerCase();
  const matches = places.filter(place => {
    const building = buildings.find(b => b.id === place.id);
    return `${place.name} ${place.code || ''} ${(building?.aliases || []).join(' ')}`.toLowerCase().includes(query);
  });
  $('result-count').textContent = `${matches.length} campus ${matches.length === 1 ? 'place' : 'places'}`;
  $('building-list').replaceChildren();
  if (!matches.length) {
    const empty = document.createElement('p'); empty.className = 'no-results'; empty.textContent = 'No match. Try a building name or map code.'; $('building-list').append(empty);
  }
  for (const place of matches) {
    const button = document.createElement('button'); button.dataset.id = place.id;
    button.classList.toggle('selected', selected?.id === place.id);
    const name = document.createElement('span'); name.textContent = place.name;
    const code = document.createElement('small'); code.textContent = place.code || '↗';
    button.append(name, code); button.addEventListener('click', () => choose(place));
    $('building-list').append(button);
  }
}

function pathShape(ctx, points, transform) {
  if (!points?.length) return;
  ctx.beginPath();
  points.forEach((point, i) => { const p = transform(point); i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
}

let elevationMapCache;
function drawElevationBase(ctx,width,height,project,scale){
  const key=`${width},${height}`;
  if(elevationMapCache?.key!==key){
    const canvas=document.createElement('canvas');canvas.width=Math.ceil(width);canvas.height=Math.ceil(height);const c=canvas.getContext('2d'),b=CAMPUS.bounds,step=10;
    for(let z=b.minZ;z<b.maxZ;z+=step)for(let x=b.minX;x<b.maxX;x+=step){
      const h=terrainHeight(x,z),p=project({x,z});const light=87-(h-25)*.16;c.fillStyle=`hsl(${83-(h-25)*.35} 24% ${light}%)`;c.fillRect(p.x,p.y,step*scale+1,step*scale+1);
    }
    c.lineWidth=.65;c.strokeStyle='#87987238';
    for(let level=25;level<70;level+=5)for(let z=b.minZ;z<b.maxZ;z+=step)for(let x=b.minX;x<b.maxX;x+=step){
      const points=[{x,z},{x:x+step,z},{x:x+step,z:z+step},{x,z:z+step}],heights=points.map(p=>terrainHeight(p.x,p.z)),cuts=[];
      for(let i=0;i<4;i++){const j=(i+1)%4;if((heights[i]<level)!==(heights[j]<level)){const t=(level-heights[i])/(heights[j]-heights[i]);cuts.push(project({x:points[i].x+(points[j].x-points[i].x)*t,z:points[i].z+(points[j].z-points[i].z)*t}));}}
      if(cuts.length===2){c.beginPath();c.moveTo(cuts[0].x,cuts[0].y);c.lineTo(cuts[1].x,cuts[1].y);c.stroke();}
    }
    elevationMapCache={key,canvas};
  }
  ctx.drawImage(elevationMapCache.canvas,0,0);
}

function drawMap() {
  const canvas = $('large-map');
  const box = canvas.getBoundingClientRect();
  if (!box.width || !box.height) return;
  const dpr = Math.min(devicePixelRatio || 1, 2), width = box.width, height = box.height;
  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); }
  const ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const b = CAMPUS.bounds, padding = Math.min(width, height) * .055;
  const scale = Math.min((width - padding * 2) / (b.maxX - b.minX), (height - padding * 2) / (b.maxZ - b.minZ));
  const ox = (width - (b.maxX - b.minX) * scale) / 2 - b.minX * scale;
  const oz = (height - (b.maxZ - b.minZ) * scale) / 2 - b.minZ * scale;
  mapProjection = { scale, ox, oz };
  const project = point => ({ x: ox + point.x * scale, y: oz + point.z * scale });
  ctx.fillStyle = '#e9efdf'; ctx.fillRect(0, 0, width, height);
  drawElevationBase(ctx,width,height,project,scale);
  for (const green of CAMPUS.greens || []) { pathShape(ctx, green.points, project); ctx.closePath(); ctx.fillStyle = '#b5cfa0'; ctx.fill(); }
  for (const plaza of CAMPUS.plazas || []) {
    pathShape(ctx, plaza.points, project); ctx.closePath();
    for(const hole of plaza.holes||[]){const p=project(hole[0]);ctx.moveTo(p.x,p.y);for(const point of hole.slice(1)){const h=project(point);ctx.lineTo(h.x,h.y);}ctx.closePath();}
    ctx.fillStyle = '#e0d8bc'; ctx.fill('evenodd');
  }
  for(const area of CAMPUS.sportsAreas||[])if(area.sport!=='soccer'&&area.kind!=='track'){
    pathShape(ctx,area.points,project);ctx.closePath();ctx.fillStyle=area.sport==='fitness'?'#92bad0':area.sport==='bouldering'?'#d6cdbb':'#c99caf';ctx.fill();
  }
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const path of CAMPUS.paths || []) { pathShape(ctx, path.points, project); ctx.strokeStyle = path.kind === 'track' ? '#69acc8' : path.kind === 'road' ? '#d0d2bc' : '#f8f9ed'; ctx.lineWidth = Math.max(1, (path.width || 3) * scale); ctx.stroke(); }
  for (const building of buildings) {
    pathShape(ctx, building.points, project); ctx.closePath();
    for (const hole of building.holes || []) { const p = project(hole[0]);ctx.moveTo(p.x,p.y);for(const point of hole.slice(1)){const h=project(point);ctx.lineTo(h.x,h.y);}ctx.closePath(); }
    ctx.fillStyle = building.id === selected?.id ? '#eb9b70' : building.campus ? '#a7b997' : '#d0d8c5'; ctx.fill('evenodd');
    ctx.lineWidth = .5; ctx.strokeStyle = building.id === selected?.id ? '#d97548' : '#8ca47d'; ctx.stroke();
  }
  const featured = ['roundhouse', 'law', 'village-green', 'business-school', 'red-centre-west', 'library', 'scientia', 'quadrangle'];
  ctx.font = '500 8px "Segoe UI",sans-serif'; ctx.textAlign = 'center';
  for (const place of places.filter(p => featured.includes(p.id))) {
    const p = project(place); const name = place.name.replace('UNSW ', '');
    ctx.lineWidth = 3; ctx.strokeStyle = '#eff4e7'; ctx.strokeText(name, p.x, p.y - 8); ctx.fillStyle = '#697e5e'; ctx.fillText(name, p.x, p.y - 8);
  }
  if (selected) {
    const p = project(selected); ctx.beginPath();ctx.arc(p.x,p.y,7,0,Math.PI*2);ctx.fillStyle='#f7faf0';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#e8885a';ctx.stroke();ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fillStyle='#e8885a';ctx.fill();
  }
  if (state?.position) {
    const p = project(state.position); ctx.save();ctx.translate(p.x,p.y);ctx.rotate(state.heading || 0);ctx.beginPath();ctx.moveTo(0,-8);ctx.lineTo(5,6);ctx.lineTo(0,3);ctx.lineTo(-5,6);ctx.closePath();ctx.lineWidth=3;ctx.strokeStyle='#fffaf1';ctx.stroke();ctx.fillStyle='#e46c45';ctx.fill();ctx.restore();
  }
}

function inside(point, polygon) {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i], b = polygon[j];
    if ((a.z > point.z) !== (b.z > point.z) && point.x < (b.x - a.x) * (point.z - a.z) / (b.z - a.z) + a.x) result = !result;
  }
  return result;
}

$('large-map').addEventListener('click', event => {
  if (!mapProjection) return;
  const rect = $('large-map').getBoundingClientRect(), { scale, ox, oz } = mapProjection;
  const point = { x: (event.clientX - rect.left - ox) / scale, z: (event.clientY - rect.top - oz) / scale };
  const bounds = CAMPUS.bounds;
  if (point.x < bounds.minX || point.x > bounds.maxX || point.z < bounds.minZ || point.z > bounds.maxZ) return;
  const building = buildings.find(b => inside(point, b.points) && !(b.holes || []).some(h => inside(point, h)));
  const landmark = building && places.find(p => p.id === building.id);
  if (landmark) choose(landmark);
  else choose({ id: null, name: building?.name || 'A spot on campus', x: point.x, z: point.z, description: 'We’ll put you on the nearest open ground.' });
});
$('walk-here').addEventListener('click', () => {
  if (!selected || !game) return;
  if (selected.id) game.teleport(selected.id); else game.teleportTo(selected);
  restoreAfterModal = true;
  started = true; $('welcome').hidden = true;
  $('map-dialog').close();
  notify(`Now exploring ${selected.name}.`);
});
$('building-search').addEventListener('input', renderList);
$('open-map').addEventListener('click', () => openDialog($('map-dialog')));
$('mini-map-button').addEventListener('click', () => openDialog($('map-dialog')));
$('close-map').addEventListener('click', () => $('map-dialog').close());
$('help').addEventListener('click', () => openDialog($('help-dialog')));
$('close-help').addEventListener('click', () => $('help-dialog').close());
$('help-done').addEventListener('click', () => $('help-dialog').close());
$('start').addEventListener('click', () => { start(); notify('W A S D to walk. Open the campus map to find a building.', 5500); });
$('resume').addEventListener('click', () => start());
$('pause').addEventListener('click', () => { if (state.paused) start({ lock: false }); else { game.setPaused(true); if (document.pointerLockElement) document.exitPointerLock?.(); } $('pause').blur(); });
$('reset').addEventListener('click', () => { game.reset(); notify('Back on University Mall.'); $('reset').blur(); });
$('time').addEventListener('click', () => {
  const golden = state.time !== 'golden'; game.setTime(golden ? 'golden' : 'day');
  $('time').title = golden ? 'Switch to daytime' : 'Switch to golden hour';
  $('time').setAttribute('aria-label', $('time').title); notify(golden ? 'The long way home, at golden hour.' : 'A sunny day on campus.'); $('time').blur();
});
$('fullscreen').addEventListener('click', async () => {
  try { if (document.fullscreenElement) await document.exitFullscreen(); else await $('experience').requestFullscreen(); } catch { notify('Full screen is unavailable in this window.'); }
});
window.addEventListener('keydown', event => {
  if (/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
  if (event.code === 'KeyM' && !event.repeat && !$('help-dialog').open) {
    event.preventDefault(); $('map-dialog').open ? $('map-dialog').close() : openDialog($('map-dialog'));
  }
});
window.addEventListener('resize', () => { if ($('map-dialog').open) drawMap(); });
document.querySelectorAll('[data-input]').forEach(button => {
  const action = button.dataset.input === 'reverse' ? 'backward' : button.dataset.input;
  const stop = () => { game?.setInput(action, false); button.classList.remove('pressed'); };
  button.addEventListener('pointerdown', event => { event.preventDefault();button.setPointerCapture(event.pointerId);game?.setInput(action, true);button.classList.add('pressed'); });
  for (const name of ['pointerup','pointercancel','lostpointercapture']) button.addEventListener(name, stop);
});
$('touch-jump').addEventListener('pointerdown', event => { event.preventDefault();game?.jump(); });
let touchLook;
$('world').addEventListener('pointerdown', event => { if(event.pointerType === 'touch') touchLook = {id:event.pointerId,x:event.clientX,y:event.clientY}; });
$('world').addEventListener('pointermove', event => { if(touchLook?.id === event.pointerId){game?.look((event.clientX-touchLook.x)*1.7,(event.clientY-touchLook.y)*1.7);touchLook.x=event.clientX;touchLook.y=event.clientY;} });
window.addEventListener('pointerup', event => { if(touchLook?.id === event.pointerId)touchLook=null; });

try {
  game = createGame({ canvas: $('world'), minimap: $('minimap'), onUpdate: update, onError: message => notify(String(message), 7000) });
  game.loadCampus(CAMPUS); game.setPaused(true);
  $('loading').hidden = true;
  $('campus-stats').textContent = `${buildings.filter(b=>b.campus).length} campus building footprints · ${CAMPUS.paths.length} mapped path sections · ${places.length} searchable destinations · NSW 5 m measured terrain · ${VISUAL_REFERENCES.length} visual/data references.`;
  selected = places.find(p=>p.id==='university-mall') || places[0]; choose(selected);
  window.campusApp = { getState: () => game.getState(), getInfo: () => ({ buildings: buildings.length, destinations: places.length, bounds: CAMPUS.bounds }), teleport: id => game.teleport(id), setInput: (action,value) => game.setInput(action,value), start: () => start({lock:false}) };
} catch (error) {
  console.error(error); $('loading').hidden = true; $('welcome').hidden = true; $('fatal').hidden = false;
}
