import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { ELEVATION } from '../dist/elevation-data.js';
import { terrainHeight, buildingBase } from '../dist/terrain.js';
import { CAMPUS } from '../dist/campus-enhancements.js';
import { BUILDING_PARTS } from '../dist/building-parts.js';
import { CAMPUS as MAPPED_CAMPUS } from '../dist/campus-data.js';
import { heightDescription } from '../dist/building-heights.js';

test('elevation grid is traceable to the retained real NSW float raster',()=>{
  const bytes=fs.readFileSync(new URL('../dist/data/unsw-elevation.tif',import.meta.url));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),ELEVATION.sourceSha256);
  assert.equal(ELEVATION.values.length,ELEVATION.cols*ELEVATION.rows);
  assert.ok(ELEVATION.values.every(Number.isFinite));
  assert.equal(ELEVATION.nominalSourceResolutionMetres,5);
  assert.ok(ELEVATION.source.includes('NSW_5M_Elevation'));
  assert.ok(ELEVATION.minimum>15&&ELEVATION.maximum<75);
});

test('pixel-centre projection preserves actual source heights without axis reversal',()=>{
  const radians=Math.PI/180,r=6371008.8;
  for(const [row,col] of [[70,50],[70,130],[70,200],[30,180]]){
    const lon=ELEVATION.west+(col+.5)*ELEVATION.longitudeStep;
    const lat=ELEVATION.north-(row+.5)*ELEVATION.latitudeStep;
    const x=(lon-CAMPUS.center.lon)*radians*r*Math.cos(CAMPUS.center.lat*radians);
    const z=(CAMPUS.center.lat-lat)*radians*r;
    assert.ok(Math.abs(terrainHeight(x,z)-ELEVATION.values[row*ELEVATION.cols+col])<.001);
  }
});

test('upper-campus ground is substantially above the lower mall and the Green',()=>{
  const place=id=>CAMPUS.landmarks.find(p=>p.id===id),mall=place('university-mall'),library=place('library'),mathews=place('mathews');
  assert.ok(terrainHeight(mall.x,mall.z)>25&&terrainHeight(mall.x,mall.z)<30);
  assert.ok(terrainHeight(library.x,library.z)-terrainHeight(mall.x,mall.z)>23);
  assert.ok(terrainHeight(mathews.x,mathews.z)>53);
  for(const p of CAMPUS.landmarks)assert.ok(Number.isFinite(terrainHeight(p.x,p.z)));
});

test('level foundations and real library parts preserve meaningful height differences',()=>{
  const library=CAMPUS.buildings.find(b=>b.id==='library');
  assert.ok(buildingBase(library.points)>40&&buildingBase(library.points)<60);
  assert.equal(BUILDING_PARTS.length,5);
  const tower=BUILDING_PARTS.find(p=>p.levels===14),podium=BUILDING_PARTS.find(p=>p.levels===4);
  assert.ok(tower.height>podium.height+35);
  assert.ok(tower.points.length>4,'tower uses the real detailed footprint');
  assert.ok(CAMPUS.landmarks.some(p=>p.name==='John Niland Scientia'));
});

test('reported dimensions agree across model parts and map while preserving conflicting map tags',()=>{
  for(const [id,metres] of [['library',57.74],['mathews',54]]){
    const building=CAMPUS.buildings.find(b=>b.id===id);
    const raw=MAPPED_CAMPUS.buildings.find(b=>b.id===id);
    assert.equal(raw.height,60,'retained OSM data is unchanged');
    assert.equal(building.mappedHeight,raw.height);
    assert.equal(building.height,metres);
    assert.equal(building.heightSource,'reported');
    const description=heightDescription(building,{heightEstimate:12});
    assert.equal(description.metres,metres,'appearance estimates cannot override evidence');
    assert.equal(description.label,'NSW planning report');
    assert.equal(description.reference.printedPage,22);
    assert.match(description.reference.url,/planningportal\.nsw\.gov\.au/);
  }
  assert.equal(BUILDING_PARTS.find(p=>p.levels===14).height,CAMPUS.buildings.find(b=>b.id==='library').height);
  assert.equal(heightDescription({height:9.6,heightSource:'estimated'},{heightEstimate:24}).metres,24);
  assert.equal(heightDescription({height:18,heightSource:'mapped'},{heightEstimate:24}).metres,18);
});
