import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CAMPUS} from '../dist/campus-enhancements.js';
import {VILLAGE_SPORTS} from '../dist/sports-data.js';
import {orientedFrame,framePoint,frameRectangle,roundedFrameRectangle,clipFrameStrip} from '../dist/geometry.js';

function inside(p,ring){let hit=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)hit=!hit;}return hit;}

test('sports polygons and running trace retain their public OSM source coordinates',()=>{
  const raw=JSON.parse(fs.readFileSync(new URL('../dist/data/unsw.json',import.meta.url)));
  const nodes=new Map(raw.elements.filter(e=>e.type==='node').map(e=>[e.id,e]));
  for(const area of VILLAGE_SPORTS){
    const way=raw.elements.find(e=>e.type==='way'&&e.id===area.osmId);
    const ids=area.closed?way.nodes.slice(0,-1):way.nodes;
    assert.equal(area.points.length,ids.length);
    ids.forEach((id,i)=>{
      const p=nodes.get(id),x=(p.lon-CAMPUS.center.lon)*Math.PI/180*6371008.8*Math.cos(CAMPUS.center.lat*Math.PI/180),z=(CAMPUS.center.lat-p.lat)*Math.PI/180*6371008.8;
      assert.ok(Math.abs(area.points[i].x-x)<.0006);
      assert.ok(Math.abs(area.points[i].z-z)<.0006);
    });
  }
  const track=VILLAGE_SPORTS.find(s=>s.kind==='track');
  assert.equal(track.closed,false,'retain the access spur; do not invent a closing segment');
  assert.ok(CAMPUS.paths.some(p=>p.id===track.id&&p.kind==='track'));
  assert.equal(VILLAGE_SPORTS.filter(s=>s.kind==='pitch'&&['basketball','multi'].includes(s.sport)).length,4);
});

test('field markings follow the actual rotated pitch and fit within its outline',()=>{
  const area=VILLAGE_SPORTS.find(s=>s.sport==='soccer'),frame=orientedFrame(area.points);
  const degrees=Math.atan2(frame.u.z,frame.u.x)*180/Math.PI;
  assert.ok(degrees>9&&degrees<10,'campus pitch is not aligned with world north');
  assert.ok(frame.width>79&&frame.width<81);
  assert.ok(frame.length>121&&frame.length<124);
  assert.ok(frameRectangle(frame,68,105).every(p=>inside(p,area.points)));
  const origin=framePoint(frame,0,0),x=framePoint(frame,10,0),z=framePoint(frame,0,10);
  assert.ok(Math.abs(Math.hypot(x.x-origin.x,x.z-origin.z)-10)<1e-8);
  assert.ok(Math.abs((x.x-origin.x)*(z.x-origin.x)+(x.z-origin.z)*(z.z-origin.z))<1e-8);
  const areaOf=ring=>Math.abs(ring.reduce((sum,a,i)=>{const b=ring[(i+1)%ring.length];return sum+a.x*b.z-b.x*a.z;},0)/2);
  let partitionArea=0;
  for(let row=0;row<12;row++){
    const low=-frame.length/2+row*frame.length/12,high=-frame.length/2+(row+1)*frame.length/12,strip=clipFrameStrip(area.points,frame,low,high);
    partitionArea+=areaOf(strip);
    for(const p of strip){const v=(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z;assert.ok(v>=low-1e-7&&v<=high+1e-7);}
  }
  assert.ok(Math.abs(partitionArea-areaOf(area.points))<1e-6,'single turf layer covers the source outline without overlapping a second base surface');
});

test('rounded canopy geometry has an ordered perimeter and grandstand arrival faces the open front',()=>{
  const pitch=orientedFrame(VILLAGE_SPORTS.find(s=>s.sport==='soccer').points);
  const stand=CAMPUS.buildings.find(b=>b.id==='osm-way-1178531040'),frame=orientedFrame(stand.points,pitch.v);
  const ring=roundedFrameRectangle(frame,frame.width,frame.length/3-.45,.9);
  const area=ring.reduce((sum,a,i)=>{const b=ring[(i+1)%ring.length];return sum+a.x*b.z-b.x*a.z;},0)/2;
  assert.ok(area>0,'roof underside fan has consistent winding');
  const arrival=CAMPUS.landmarks.find(p=>p.id===stand.id);
  assert.equal(inside(arrival,stand.points),false);
  const forward={x:Math.sin(arrival.heading),z:-Math.cos(arrival.heading)};
  assert.ok(forward.x*pitch.u.x+forward.z*pitch.u.z<-.99);
  assert.equal(arrival.showSign,false);
});

test('public café location resolves inside the preserved H11 footprint and H11 remains searchable',()=>{
  const b=CAMPUS.buildings.find(b=>b.id==='osm-way-1178531047');
  const radians=Math.PI/180,p={x:(151.2286064-CAMPUS.center.lon)*radians*6371008.8*Math.cos(CAMPUS.center.lat*radians),z:(CAMPUS.center.lat+33.9180069)*radians*6371008.8};
  assert.ok(inside(p,b.points),'public Home Ground Kiosk coordinate falls within H11');
  assert.equal(b.name,'Home Ground Café');
  assert.ok(b.aliases.includes('H11'));
  assert.ok(CAMPUS.landmarks.some(l=>l.id===b.id&&l.name===b.name));
  assert.equal(b.heightSource,'estimated','do not turn a photo-led height into a mapped measurement');
});
