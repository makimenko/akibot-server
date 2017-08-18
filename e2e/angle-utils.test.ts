import { assert } from 'chai';
import * as common from "../src/common";

describe('Angle Utils', () => {

  it("createAngleFromDegrees", function () {
    var angle = common.AngleUtils.createAngleFromDegrees(90);
    assert.equal(angle.getDegrees(), 90);
    if (angle.radians == undefined)
      throw "undefined"
    assert.closeTo(angle.radians, 1.5708, 0.0001);
  });

  it("degreesToRadians", function () {
    var radians = common.AngleUtils.degreesToRadians(90);
    assert.closeTo(radians, 1.5708, 0.0001);
  });

  it("radiansToDegrees", function () {
    var radians = common.AngleUtils.radiansToDegrees(1.5708);
    assert.closeTo(radians, 90, 0.001);
  });

  it("normalizeRadian", function () {
    assert.equal(common.AngleUtils.normalizeRadian(0), 0);
    assert.equal(common.AngleUtils.normalizeRadian(1), 1);
    assert.closeTo(common.AngleUtils.normalizeRadian(100), 5.75225615, 0.0001);
  });


  it("addDegrees", function () {
    assert.equal(common.AngleUtils.addDegrees(0, 0), 0);
    assert.equal(common.AngleUtils.addDegrees(0, 1), 1);
    assert.equal(common.AngleUtils.addDegrees(90, 90), 180);
    assert.equal(common.AngleUtils.addDegrees(180, 180), 0);
    assert.equal(common.AngleUtils.addDegrees(180, -180), 0);
    //TODO: normalize 1 = -359: assert.equal(common.AngleUtils.addDegrees(180, -181), 1);
    assert.equal(common.AngleUtils.addDegrees(-180, 181), 1);
    assert.equal(common.AngleUtils.addDegrees(1, 36000), 1);
  });


});