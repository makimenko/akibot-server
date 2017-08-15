import { assert } from 'chai';
import { commandComponent } from "../src/app";
import { ORIENTATION_EVENT } from "../src/server/index";
import * as simon from 'sinon';

let defaultTimeout: number = 1000;

describe('Orientation', () => {

  it("Orientation status received", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      commandComponent.commandEvents.on(ORIENTATION_EVENT.OrientationResponse, (success: boolean, finalAngle: number) => {
        resolve();
      });
      commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationRequest, 100, defaultTimeout);
    });
  });

  it("Make sure that lock is called", function () {
    var spy = simon.spy(commandComponent, 'lock');
    commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationRequest, 100, 1000);
    assert.equal(spy.callCount, 1);
    spy.restore();
  });

});

