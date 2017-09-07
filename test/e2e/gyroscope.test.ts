import { assert } from 'chai';
import * as app from "../../src/app";
import { Angle, GyroscopeAutoIntervalCommand, GyroscopeValueResponse, GyroscopeCalibrationResponse, Vector3D, GyroscopeCalibrationRequest } from "akibot-common/dist";
import { isFake } from "akibot-device";

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
        if (gyroscopeValueResponse.angle != undefined && gyroscopeValueResponse.angle.radians != undefined && gyroscopeValueResponse.angle.radians > 0) {
          count++;
        }
      });
      app.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(100));

      setTimeout(() => {
        assert.isTrue(count > 7);
        app.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(0));
        resolve();
      }, defaultTimeout);
    });
  });


  it("Gyroscope Calibration", function () {
    if (isFake) {
      this.timeout(defaultTimeout + 1000);
      return new Promise(function (resolve, reject) {
        app.commandComponent.commandEvents.on(GyroscopeCalibrationResponse.name, (gyroscopeCalibrationResponse: GyroscopeCalibrationResponse) => {
          assert.isDefined(gyroscopeCalibrationResponse.offsetVector);
          assert.isTrue(gyroscopeCalibrationResponse.offsetVector instanceof Vector3D);

          const delta = 0.1;
          assert.closeTo(gyroscopeCalibrationResponse.offsetVector.x, 0, delta);
          assert.closeTo(gyroscopeCalibrationResponse.offsetVector.y, 0, delta);
          assert.closeTo(gyroscopeCalibrationResponse.offsetVector.z, 0, delta);

          resolve();
        });
        app.commandComponent.emitMessage(new GyroscopeCalibrationRequest(1000, 50));

      });
    }
  }
  );



});