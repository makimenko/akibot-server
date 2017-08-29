import { assert } from 'chai';
import * as app from "../../src/app";
import { Angle, DistanceAutoIntervalCommand, DistanceValueResponse, Distance } from "akibot-common/dist";

let defaultTimeout: number = 1000;

describe('Grid', () => {

  it("Add Distance", function () {
    this.timeout(defaultTimeout + 1000);
    return new Promise(function (resolve, reject) {
      var count: number = 0;
      app.commandComponent.commandEvents.on(DistanceValueResponse.name, (distanceValueResponse: DistanceValueResponse) => {
        assert.isTrue(distanceValueResponse instanceof DistanceValueResponse);
        assert.isTrue(distanceValueResponse.distance instanceof Distance);
        assert.isDefined(distanceValueResponse.distance);
        assert.isAbove(distanceValueResponse.distance.distanceMm, 0);
        assert.isDefined(distanceValueResponse.distance.errorAngle);
        assert.isTrue(distanceValueResponse.distance.errorAngle.radians != undefined && distanceValueResponse.distance.errorAngle.radians >= 0);
        assert.isTrue(distanceValueResponse.distance.endObstacle);

        if (distanceValueResponse.distance != undefined
          && distanceValueResponse.distance.distanceMm >= 0
          && distanceValueResponse.distance.distanceMm <= 70000) {
          count++;
        } else {
          assert.fail();
        }
      });
      app.commandComponent.emitMessage(new DistanceAutoIntervalCommand(100));

      setTimeout(() => {
        assert.isTrue(count > 7);
        app.commandComponent.emitMessage(new DistanceAutoIntervalCommand(0));
        resolve();
      }, defaultTimeout);
    });
  });


});