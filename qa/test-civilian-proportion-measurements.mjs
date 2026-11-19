import assert from 'node:assert/strict';
import { buildMeasurementReport, measureLandmarkRecord, validateLandmarkRecord } from './civilian-proportion-measurements.mjs';

const points = (y) => ({x:10,y});
const standing = {
  id:'fixture',status:'measured',poseClass:'standing',
  directions:Object.fromEntries(['front','back','left','right'].map(direction=>[direction,{
    bodyPolygon:[{x:10,y:10},{x:30,y:10},{x:30,y:130},{x:10,y:130}],
    headTop:10,chin:39,shoulderLeft:{x:12,y:45},shoulderRight:{x:28,y:45},
    shoulderY:45,pelvisY:88,footBaseline:130,headwearPolygons:[],propPolygons:[]
  }]))
};
const measured=measureLandmarkRecord(standing);
assert.equal(measured.status,'measured');
assert.equal(measured.directions.front.bodyHeight,121);
assert.equal(measured.directions.front.headHeight,30);
assert.equal(measured.directions.front.shoulderWidth,16);
assert.equal(measured.directions.front.ratiosPercent.headBody,24.79);
assert.equal(measured.directions.front.ratiosPercent.shoulderBody,13.22);
assert.equal(measured.directions.front.ratiosPercent.legRegionBody,34.71);

const dynamic=structuredClone(standing);
dynamic.id='runner-fixture';dynamic.poseClass='dynamic';
for(const d of Object.values(dynamic.directions)){
 d.joints={
  leftShoulder:points(45),rightShoulder:{x:28,y:45},leftElbow:points(60),rightElbow:{x:35,y:55},
  leftWrist:points(72),rightWrist:{x:40,y:60},leftHip:points(88),rightHip:{x:28,y:88},
  leftKnee:{x:20,y:105},rightKnee:{x:45,y:95},leftAnkle:{x:15,y:118},rightAnkle:{x:55,y:80}
 };
}
const dynamicResult=measureLandmarkRecord(dynamic);
assert.equal(dynamicResult.status,'measured');
assert.equal(dynamicResult.directions.front.legRegionHeight,undefined);
assert.equal(dynamicResult.directions.front.poseAware.standingLegRatio,null);
assert.equal(validateLandmarkRecord({...dynamic,directions:{front:dynamic.directions.front}},'runner').length>0,true);

const report=buildMeasurementReport({characters:{fixture:standing,runner:{status:'pending_annotation',poseClass:'dynamic'}}});
assert.equal(report.characterCount,2);
assert.equal(report.measuredCount,1);
assert.equal(report.pendingCount,1);
console.log(JSON.stringify({pass:true,checks:14,standingRatios:measured.directions.front.ratiosPercent,dynamicPose:'joint-only'}));
