// Semantic civilian proportion measurements.
// Coordinates are authored in Granny's 100x140 source-space convention.
// It distinguishes source-derived candidate annotations from visually verified
// measurements and never guesses anatomy from alpha bounds.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST_PATH = path.join(ROOT, 'qa', 'civilian-anatomy-landmarks.json');
const DIRECTIONS = ['front', 'back', 'left', 'right'];
const REQUIRED_POINTS = ['headTop', 'chin', 'shoulderLeft', 'shoulderRight', 'shoulderY', 'pelvisY', 'footBaseline'];
const isPoint = p => p && Number.isFinite(p.x) && Number.isFinite(p.y) &&
  p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 140;
const inSourceBounds = p => isPoint(p) && p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 140;
const validPolygon = polygon => Array.isArray(polygon) && polygon.length >= 3 && polygon.every(inSourceBounds) && Math.abs(polygon.reduce((sum,p,i)=>{const q=polygon[(i+1)%polygon.length];return sum+p.x*q.y-q.x*p.y;},0)) > 0;
const distance = (a,b) => Math.hypot(b.x-a.x,b.y-a.y);
const ratio = (value, denominator) => denominator > 0 ? +(100*value/denominator).toFixed(2) : null;

export function validateLandmarkRecord(record, id) {
  const errors = [];
  if (!record || !['standing','dynamic'].includes(record.poseClass)) errors.push('poseClass must be standing or dynamic');
  if (!record || !['measured','source_annotated'].includes(record.status)) errors.push('status must be measured or source_annotated');
  if (!record || !record.directions || typeof record.directions !== 'object') return ['directions are missing'];
  for (const direction of DIRECTIONS) {
    const d = record.directions[direction];
    if (!d) { errors.push(direction + ' landmarks are missing'); continue; }
    if (!validPolygon(d.bodyPolygon)) errors.push(direction + ' bodyPolygon must be a non-zero-area polygon within 100x140 source bounds');
    for (const key of REQUIRED_POINTS) {
      if (key === 'shoulderLeft' || key === 'shoulderRight') {
        if (!isPoint(d[key])) errors.push(direction + ' ' + key + ' is missing');
      } else if (!Number.isFinite(d[key])) errors.push(direction + ' ' + key + ' is missing');
    }
    if (d.footBaseline < d.headTop) errors.push(direction + ' footBaseline must be below headTop');
    if (d.chin < d.headTop || d.chin > d.footBaseline) errors.push(direction + ' chin is outside body height');
    if (d.shoulderY < d.chin || d.shoulderY > d.footBaseline) errors.push(direction + ' shoulderY is outside body height');
    if (d.pelvisY < d.shoulderY || d.pelvisY > d.footBaseline) errors.push(direction + ' pelvisY is outside shoulder-to-foot interval');
    if (isPoint(d.shoulderLeft) && isPoint(d.shoulderRight) && d.shoulderLeft.y !== d.shoulderRight.y)
      errors.push(direction + ' shoulder points must share one measurement row');
    if (!Array.isArray(d.headwearPolygons) || !d.headwearPolygons.every(validPolygon) || !Array.isArray(d.propPolygons) || !d.propPolygons.every(validPolygon))
      errors.push(direction + ' must explicitly declare valid headwearPolygons and propPolygons (empty arrays are valid)');
    for (const key of ['headTop','chin','shoulderY','pelvisY','footBaseline']) if (Number.isFinite(d[key]) && (d[key] < 0 || d[key] > 140)) errors.push(direction + ' ' + key + ' is outside 100x140 source bounds');
    for (const key of ['shoulderLeft','shoulderRight']) if (isPoint(d[key]) && !inSourceBounds(d[key])) errors.push(direction + ' ' + key + ' is outside 100x140 source bounds');
    if (record.poseClass === 'dynamic') {
      for (const key of ['leftShoulder','rightShoulder','leftElbow','rightElbow','leftWrist','rightWrist','leftHip','rightHip','leftKnee','rightKnee','leftAnkle','rightAnkle']) {
        if (!inSourceBounds(d.joints?.[key])) errors.push(direction + ' dynamic pose joint ' + key + ' is missing or outside 100x140 source bounds');
      }
    }
  }
  return errors;
}

export function measureLandmarkRecord(record) {
  const errors = validateLandmarkRecord(record, record.id || 'unknown');
  if (errors.length) return { id: record.id, status: 'pending_annotation', errors };
  const directions = Object.fromEntries(DIRECTIONS.map(direction => {
    const d = record.directions[direction];
    const bodyHeight = d.footBaseline - d.headTop + 1;
    const headHeight = d.chin - d.headTop + 1;
    const shoulderWidth = distance(d.shoulderLeft, d.shoulderRight);
    const torsoHeight = d.pelvisY - d.shoulderY;
    const neckHeight = d.shoulderY - d.chin;
    const common = {
      bodyHeight: +bodyHeight.toFixed(2),
      headHeight: +headHeight.toFixed(2),
      shoulderWidth: +shoulderWidth.toFixed(2),
      torsoHeight: +torsoHeight.toFixed(2),
      neckHeight: +neckHeight.toFixed(2),
      ratiosPercent: {
        headBody: ratio(headHeight, bodyHeight),
        shoulderBody: ratio(shoulderWidth, bodyHeight),
        torsoBody: ratio(torsoHeight, bodyHeight),
        neckBody: ratio(neckHeight, bodyHeight)
      },
      footBaseline: d.footBaseline,
      anatomicalBodyPolygon: d.bodyPolygon,
      excludedHeadwearPolygons: d.headwearPolygons,
      excludedPropPolygons: d.propPolygons
    };
    if (record.poseClass === 'dynamic') {
      common.poseAware = {
        joints: d.joints,
        leftLegPath: [d.joints.leftHip,d.joints.leftKnee,d.joints.leftAnkle],
        rightLegPath: [d.joints.rightHip,d.joints.rightKnee,d.joints.rightAnkle],
        standingLegRatio: null,
        note: 'Dynamic pose: use joint segments and polygon bounds; do not apply upright leg-height bands.'
      };
    } else {
      common.legRegionHeight = +(d.footBaseline - d.pelvisY).toFixed(2);
      common.ratiosPercent.legRegionBody = ratio(common.legRegionHeight, bodyHeight);
    }
    return [direction, common];
  }));
  return { id: record.id, poseClass: record.poseClass, status: record.status === 'source_annotated' ? 'source_annotated' : 'measured', coordinateSpace: '100x140 source units', directions };
}

export function buildMeasurementReport(manifest) {
  const records = Object.entries(manifest.characters || {}).map(([id, record]) => {
    if (record.status === 'reference_only') {
      return { id, status: 'reference_only', source: record.referenceSource,
        legacyMeasurements: record.legacyMeasurements,
        conventionNote: record.note };
    }
    const normalized = { id, ...record };
    return measureLandmarkRecord(normalized);
  });
  return {
    schemaVersion: 1,
    measurementMethod: 'human-annotated semantic landmarks in a shared 100x140 source-space coordinate system; anatomy, headwear and props are separately bounded',
    thresholdsEnforced: false,
    characterCount: records.length,
    measuredCount: records.filter(r => r.status === 'measured').length,
    sourceAnnotatedCandidateCount: records.filter(r => r.status === 'source_annotated').length,
    referenceOnlyCount: records.filter(r => r.status === 'reference_only' || r.status === 'reference_baseline').length,
    referenceBaselineCount: records.filter(r => r.status === 'reference_only' || r.status === 'reference_baseline').length,
    pendingCount: records.filter(r => r.status === 'pending_annotation').length,
    records
  };
}

export function loadManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = loadManifest();
  const report = buildMeasurementReport(manifest);
  const outPath = path.join(ROOT, 'qa-output', 'civilian-proportion-measurements.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
  if (process.argv.includes('--check')) {
    const expected = ['usher','cook','courier','runner','coach','referee'];
    const actual = Object.keys(manifest.characters || {}).filter(id => id !== 'granny').sort();
    if (report.characterCount !== 7 || report.referenceOnlyCount !== 1 ||
        !manifest.characters.granny || report.sourceAnnotatedCandidateCount !== 6 || report.pendingCount !== 0 ||
        actual.join(',') !== expected.sort().join(','))
      throw new Error('Semantic measurement manifest failed six-civilian scope validation');
    console.log(JSON.stringify({ pass: true, characterCount: report.characterCount, measuredCount: report.measuredCount, sourceAnnotatedCandidateCount: report.sourceAnnotatedCandidateCount, pendingCount: report.pendingCount, output: 'qa-output/civilian-proportion-measurements.json' }));
  } else {
    console.log('Wrote qa-output/civilian-proportion-measurements.json');
  }
}
