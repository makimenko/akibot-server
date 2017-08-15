import { assert } from 'chai';
import { commandComponent } from "../src/app";
import { GYROSCOPE_EVENT } from "../src/server/index";

let defaultTimeout: number = 1000;

describe('Gyroscope', () => {

  it("Auto Gyroscope", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      var count: number = 0;
      commandComponent.commandEvents.on(GYROSCOPE_EVENT.GyroscopeValue, (angle: number) => {
        assert.isNumber(angle);
        assert.isTrue(angle >= 0 && angle <= 360);
        count++;
      });
      commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeAutoInterval, 100);

      setTimeout(() => {
        assert.isTrue(count > 7);
        commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeAutoInterval, 0);
        resolve();
      }, defaultTimeout);
    });
  });

});