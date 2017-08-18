import { assert } from 'chai';
import * as app from "../src/app";
import * as simon from 'sinon';
import { OrientationResponse, OrientationRequest, Angle, AngleUtils } from "../src/common";

let defaultTimeout: number = 1000;

describe('Orientation', () => {

  it("Orientation status received", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      app.commandComponent.commandEvents.on(OrientationResponse.name, (orientationResponse: OrientationResponse) => {
        resolve();
      });
      var orientationRequest: OrientationRequest = new OrientationRequest(AngleUtils.createAngleFromDegrees(100), AngleUtils.createAngleFromDegrees(10), 1000);
      app.commandComponent.emitMessage(orientationRequest);
    });
  });

  it("Make sure that lock is called", function () {
    var spyLock = simon.spy(app.commandComponent, 'lock');
    var orientationRequest: OrientationRequest = new OrientationRequest(new Angle(0), new Angle(0), 500);
    app.commandComponent.emitMessage(orientationRequest);
    assert.equal(spyLock.callCount, 1);
    spyLock.restore();
  });

});

