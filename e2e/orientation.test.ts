import { expect, assert } from 'chai';
import { commandComponent } from "../src/app";
import { ORIENTATION_EVENT } from "../src/server/index";
import { logFactory } from "../src/log-config";

let defaultTimeout: number = 1000;

describe('Orientation', () => {

  it("Orientation status received", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      commandComponent.commandEvents.on(ORIENTATION_EVENT.OrientationResponse, (success: boolean, finalAngle: number) => {
        resolve(true);
      });
      commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationRequest, 100, defaultTimeout);
    });
  });

  it("Orientation status received2", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      commandComponent.commandEvents.on(ORIENTATION_EVENT.OrientationResponse, (success: boolean, finalAngle: number) => {
        resolve(true);
      });
      commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationRequest, 100, defaultTimeout);
    });
  });


});

