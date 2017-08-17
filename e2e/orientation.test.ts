import { assert } from 'chai';
import { commandComponent } from "../src/app";
import * as simon from 'sinon';
import { OrientationResponse, OrientationRequest, Angle } from "../src/common";

let defaultTimeout: number = 1000;

describe('Orientation', () => {

  it("Orientation status received", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      commandComponent.commandEvents.on(OrientationResponse.name, (orientationResponse: OrientationResponse) => {
        resolve();
      });
      var orientationRequest: OrientationRequest = new OrientationRequest(new Angle(0), new Angle(0), 1000);
      orientationRequest.targetAngle.setDegrees(100);
      orientationRequest.tolerance.setDegrees(10);
      commandComponent.commandEvents.emit(OrientationRequest.name, orientationRequest);
      console.log(JSON.stringify(orientationRequest));
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

