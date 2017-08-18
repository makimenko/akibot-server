import { assert } from 'chai';
import * as common from "../src/common";

describe('Vector Utils', () => {

  var ANGLE_PRECISSION = 0.0000000001;
  var ix0 = 3;
  var iy0 = 2;
  var ix1 = 7;
  var iy1 = 6;
  var line = new common.Line2D(new common.Point2D(ix0, iy0), new common.Point2D(ix1, iy1));

  var resultPoint2D: common.Point2D;
  var resultLine2D: common.Line2D;

  var angle0: common.Angle = common.AngleUtils.createAngleFromDegrees(0);
  var angleRight90: common.Angle = common.AngleUtils.createAngleFromDegrees(-90);
  var angleLeft90: common.Angle = common.AngleUtils.createAngleFromDegrees(90);

  it("rotateEndOfLine2D - angle 0", function () {
    resultPoint2D = common.VectorUtils.rotateEndOfLine2D(line, angle0);
    assert.closeTo(ix1, resultPoint2D.x, ANGLE_PRECISSION);
    assert.closeTo(iy1, resultPoint2D.y, ANGLE_PRECISSION);
  });

  it("rotateLine2D - angle 0", function () {
    resultLine2D = common.VectorUtils.rotateLine2D(line, angle0);
    assert.closeTo(ix0, resultLine2D.from.x, ANGLE_PRECISSION);
    assert.closeTo(iy0, resultLine2D.from.y, ANGLE_PRECISSION);
    assert.closeTo(ix1, resultLine2D.to.x, ANGLE_PRECISSION);
    assert.closeTo(iy1, resultLine2D.to.y, ANGLE_PRECISSION);
  });

  it("rotateEndOfLine2D - 90 degrees to the left", function () {
    resultPoint2D = common.VectorUtils.rotateEndOfLine2D(line, angleLeft90);
    assert.closeTo(iy1, resultPoint2D.y, ANGLE_PRECISSION);
    assert.isTrue(resultPoint2D.x < 0);
  });

  it("rotateEndOfLine2D - 90 degrees to the right", function () {
    resultPoint2D = common.VectorUtils.rotateEndOfLine2D(line, angleRight90);
    assert.closeTo(ix1, resultPoint2D.x, ANGLE_PRECISSION);
    assert.isTrue(resultPoint2D.y < 0);

    resultLine2D = common.VectorUtils.rotateLine2D(line, angleRight90);
    assert.closeTo(ix0, resultLine2D.from.x, ANGLE_PRECISSION);
    assert.closeTo(iy0, resultLine2D.from.y, ANGLE_PRECISSION);
    assert.closeTo(ix1, resultLine2D.to.x, ANGLE_PRECISSION);
    assert.isTrue(resultLine2D.to.y < 0);

  });

  it("rotateEndOfLine2D - 90 degrees to the right (via negative angle)", function () {
    resultPoint2D = common.VectorUtils.rotateEndOfLine2D(line, common.AngleUtils.createNegativeAngle(angleLeft90));
    assert.closeTo(ix1, resultPoint2D.x, ANGLE_PRECISSION);
    assert.isTrue(resultPoint2D.y < 0);
  });

});