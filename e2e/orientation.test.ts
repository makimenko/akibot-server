import { expect, assert } from 'chai';
import { commandComponent } from "../src/app";
import { ORIENTATION_EVENT } from "../src/server/index";
import { logFactory } from "../src/log-config";

let defaultTimeout: number = 1000;
let orientationStatusReceived: any;

/***********************************************************
 * Do Some E2E Command Requests and catch responses
 */
commandComponent.commandEvents.on(ORIENTATION_EVENT.OrientationResponse, (success: boolean, finalAngle: number) => {
  orientationStatusReceived = true;
});
commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationRequest, 100, defaultTimeout);

/***********************************************************
 * Wait some time and then compare
 */
setTimeout(() => {
  describe('Orientation', () => {

    it("Orientation status received", () => {
      assert.isTrue(orientationStatusReceived);
    });

  });
  run();
}, defaultTimeout + 500);
