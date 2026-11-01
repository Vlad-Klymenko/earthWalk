import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { CAMPUS } from '../dist/campus-data.js';

const fixture = JSON.parse(await fs.readFile(new URL('../dist/data/unsw.json', import.meta.url), 'utf8'));
const nodes = new Map(fixture.elements.filter(item => item.type === 'node').map(item => [item.id, item]));
const ways = new Map(fixture.elements.filter(item => item.type === 'way').map(item => [item.id, item]));

function pointInside(point, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i], b = ring[j];
    if ((a.z > point.z) !== (b.z > point.z) && point.x < (b.x - a.x) * (point.z - a.z) / (b.z - a.z) + a.x) inside = !inside;
  }
  return inside;
}

function edgeDistance(p, a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const lengthSquared = dx * dx + dz * dz;
  const t = lengthSquared ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.z - a.z) * dz) / lengthSquared)) : 0;
  return Math.hypot(p.x - a.x - t * dx, p.z - a.z - t * dz);
}

test('full campus includes the western landmarks and eastern upper-campus buildings', () => {
  const names = CAMPUS.buildings.filter(building => building.campus && building.named).map(building => building.name).join('\n');
  for (const landmark of ['Roundhouse', 'Squarehouse', 'Law Building', 'UNSW Business School', 'Red Centre', 'UNSW Library', 'Mathews Building', 'Wallace Wurth', 'Lowy Cancer', 'Civil Engineering']) {
    assert.ok(names.includes(landmark), landmark);
  }
  assert.ok(CAMPUS.bounds.maxX - CAMPUS.bounds.minX > 1000);
  assert.ok(CAMPUS.bounds.maxZ - CAMPUS.bounds.minZ > 600);
  assert.equal(CAMPUS.campusBoundaries.length, 3);
  assert.equal(CAMPUS.buildings.find(building => building.id === 'squarehouse').campusRef, 'E4');
  assert.equal(CAMPUS.buildings.find(building => building.name === 'UNSW Village').campusRef, 'B10');
});

test('building footprints preserve the real source coordinates rather than substitute rectangles', () => {
  const radians = Math.PI / 180;
  for (const id of ['roundhouse', 'squarehouse', 'law', 'business-school', 'red-centre-west', 'red-centre-east', 'library', 'wallace-wurth']) {
    const building = CAMPUS.buildings.find(item => item.id === id);
    const source = ways.get(building.osmId);
    const geometry = source.nodes.slice(0, -1).map(nodeId => nodes.get(nodeId));
    assert.equal(building.points.length, geometry.length, id);
    for (let i = 0; i < geometry.length; i++) {
      const expected = {
        x: (geometry[i].lon - CAMPUS.center.lon) * radians * 6371008.8 * Math.cos(CAMPUS.center.lat * radians),
        z: (CAMPUS.center.lat - geometry[i].lat) * radians * 6371008.8,
      };
      assert.ok(Math.abs(building.points[i].x - expected.x) < 0.0006, `${id} east coordinate`);
      assert.ok(Math.abs(building.points[i].z - expected.z) < 0.0006, `${id} south coordinate`);
    }
    if (source.tags.height) {
      assert.equal(building.height, Number.parseFloat(source.tags.height));
      assert.equal(building.heightSource, 'mapped');
    }
  }
});

test('every teleport landmark is in bounds and clear of all building footprints', () => {
  assert.ok(CAMPUS.landmarks.length >= 60);
  assert.equal(new Set(CAMPUS.landmarks.map(item => item.id)).size, CAMPUS.landmarks.length);
  for (const point of [CAMPUS.spawn, ...CAMPUS.landmarks]) {
    assert.ok(Number.isFinite(point.x) && Number.isFinite(point.z));
    assert.ok(point.x >= CAMPUS.bounds.minX && point.x <= CAMPUS.bounds.maxX);
    assert.ok(point.z >= CAMPUS.bounds.minZ && point.z <= CAMPUS.bounds.maxZ);
    for (const building of CAMPUS.buildings) {
      assert.equal(pointInside(point, building.points), false, `${point.name || 'spawn'} inside ${building.name}`);
      const clearance = Math.min(...building.points.map((a, index) => edgeDistance(point, a, building.points[(index + 1) % building.points.length])));
      assert.ok(clearance >= 1.49, `${point.name || 'spawn'} too close to ${building.name}`);
    }
  }
  assert.ok(Math.sin(CAMPUS.spawn.heading) > 0.9, 'initial view follows the Mall east');
});

test('mapped paths are finite and clipped to the playable area', () => {
  assert.ok(CAMPUS.paths.length > 400);
  assert.ok(CAMPUS.paths.some(path => path.name === 'University Mall' && path.kind === 'mall'));
  assert.ok(CAMPUS.paths.some(path => path.kind === 'road'));
  for (const path of CAMPUS.paths) {
    assert.ok(path.width > 0 && Number.isFinite(path.width));
    assert.ok(path.points.length >= 2);
    for (const point of path.points) {
      assert.ok(Number.isFinite(point.x) && Number.isFinite(point.z));
      assert.ok(point.x >= CAMPUS.bounds.minX - 0.001 && point.x <= CAMPUS.bounds.maxX + 0.001);
      assert.ok(point.z >= CAMPUS.bounds.minZ - 0.001 && point.z <= CAMPUS.bounds.maxZ + 0.001);
    }
  }
});

test('Library and Roundhouse teleport viewpoints leave room to see their facades', () => {
  for (const id of ['library', 'roundhouse']) {
    const point = CAMPUS.landmarks.find(item => item.id === id);
    const building = CAMPUS.buildings.find(item => item.id === id);
    const distance = Math.min(...building.points.map((a, index) => edgeDistance(point, a, building.points[(index + 1) % building.points.length])));
    assert.ok(distance >= 8 && distance <= 14, `${id} viewpoint is ${distance} metres from its facade`);
  }
  assert.equal(CAMPUS.spawn.x, -120.69347795829982);
  assert.equal(CAMPUS.spawn.z, -49.528329329605164);
});

test('source provenance, aliases, and estimated height disclosure accompany the data', () => {
  assert.match(fixture.source_url, /^https:\/\/api\.openstreetmap\.org\//);
  assert.match(fixture.license, /opendatacommons.*odbl/);
  assert.ok(CAMPUS.sources.some(source => source.url.includes('unsw.edu.au')));
  assert.match(CAMPUS.notes, /approximate/);
  assert.ok(CAMPUS.buildings.some(building => building.heightSource === 'estimated'));
  assert.ok(CAMPUS.buildings.find(building => building.id === 'red-centre-west').aliases.some(name => name.includes('Anita')));
});
