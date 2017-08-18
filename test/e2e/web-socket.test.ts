import { assert } from 'chai';
import * as app from "../../src/app";
import * as common from "../../src/common";
import * as WebSocket from 'ws';

describe('Web Socket Tests', () => {

  it("Client-Server Test", function () {

    // Increasing test timeout, because this E2E test is long-running
    this.timeout(5000);

    return new Promise(function (resolve, reject) {

      app.webSocketServerComponent.start()
        .then(() => {
          // after server start-up, send request
          var ws: WebSocket = new WebSocket("ws://localhost:3000");
          ws.on("open", () => {
            var orientationRequest: common.OrientationRequest = new common.OrientationRequest(common.AngleUtils.createAngleFromDegrees(90), common.AngleUtils.createAngleFromDegrees(10), 500);
            var jsonString: string = JSON.stringify(orientationRequest);
            ws.send(jsonString);
          });

          ws.on("message", (data: WebSocket.Data) => {
            var jsonString: any = JSON.parse(data.toString());
            var orientationResponse: common.OrientationResponse = common.SerializationUtils.deserialize(jsonString, common);
            assert.isBoolean(orientationResponse.success);
            resolve();
          });
        });

    });


  });

});