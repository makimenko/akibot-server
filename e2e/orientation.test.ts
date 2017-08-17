import { assert } from 'chai';
import { commandComponent } from "../src/app";
import * as simon from 'sinon';
import { OrientationResponse, OrientationRequest, Angle, AngleUtils } from "../src/common";

let defaultTimeout: number = 1000;

describe('Orientation', () => {

  it("Orientation status received", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      commandComponent.commandEvents.on(OrientationResponse.name, (orientationResponse: OrientationResponse) => {
        resolve();
      });
      var orientationRequest: OrientationRequest = new OrientationRequest(AngleUtils.createAngleFromDegrees(100), AngleUtils.createAngleFromDegrees(10), 1000);
      console.log(JSON.stringify(orientationRequest));
      commandComponent.commandEvents.emit(OrientationRequest.name, orientationRequest);
    });
  });

  it("Make sure that lock is called", function () {
    var spy = simon.spy(commandComponent, 'lock');
    var orientationRequest: OrientationRequest = new OrientationRequest(new Angle(0), new Angle(0), 50);
    commandComponent.commandEvents.emit(OrientationRequest.name, orientationRequest);
    assert.equal(spy.callCount, 1);
    spy.restore();
  });

});

