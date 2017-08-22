import { assert } from 'chai';
import * as app from "../../src/app";
import { Angle, GyroscopeAutoIntervalCommand, GyroscopeValueResponse } from "akibot-common/dist";

let defaultTimeout: number = 1000;

describe('Gyroscope', () => {

  it("Auto Gyroscope", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      var count: number = 0;
      app.commandComponent.commandEvents.on(GyroscopeValueResponse.name, (gyroscopeValueResponse: GyroscopeValueResponse) => {
        assert.isTrue(gyroscopeValueResponse instanceof GyroscopeValueResponse);
        assert.isTrue(gyroscopeValueResponse.angle instanceof Angle);
        assert.isTrue(gyroscopeValueResponse.angle != undefined && gyroscopeValueResponse.angle.getDegrees() >= 0 && gyroscopeValueResponse.angle.getDegrees() <= 360);
        count++;
      });
      app.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(100));

      setTimeout(() => {
        assert.isTrue(count > 7);
        app.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(0));
        resolve();
      }, defaultTimeout);
    });
  });

});