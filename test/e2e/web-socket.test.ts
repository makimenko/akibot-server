import { assert } from 'chai';
import * as app from "../../src/app";
import * as common from "akibot-common/dist";
import * as WebSocket from 'ws';

describe('Web Socket Tests', () => {

  it("OrientationRequest", function () {

    // Increasing test timeout, because this E2E test is long-running
    this.timeout(5000);

    return new Promise(function (resolve, reject) {

      app.webSocketServerComponent.start()
        .then(() => {
          var ws: WebSocket = new WebSocket("ws://localhost:3000");
          ws.on("open", () => {
            var orientationRequest: common.OrientationRequest = new common.OrientationRequest(common.AngleUtils.createAngleFromDegrees(90), common.AngleUtils.createAngleFromDegrees(10), 500);
            var jsonString: string = common.SerializationUtils.jsonStringify(orientationRequest);
            ws.send(jsonString);
          });

          ws.on("message", (data: WebSocket.Data) => {
            var jsonString: any = common.SerializationUtils.jsonParse(data.toString());
            var orientationResponse: common.OrientationResponse = common.SerializationUtils.deserialize(jsonString, common);
            assert.isBoolean(orientationResponse.success);
            app.webSocketServerComponent.stop();
            resolve();
          });
        });

    });

  });



  it("WorldContentRequest", function () {

    return new Promise(function (resolve, reject) {

      app.webSocketServerComponent.start()
        .then(() => {
          var ws: WebSocket = new WebSocket("ws://localhost:3000");
          ws.on("open", () => {
            var worldContentRequest = new common.WorldContentRequest();
            var jsonString: string = common.SerializationUtils.jsonStringify(worldContentRequest);
            ws.send(jsonString);
          });

          ws.on("message", (data: WebSocket.Data) => {
            console.log("####");
            console.log(data);
            var jsonString: any = common.SerializationUtils.jsonParse(data.toString());
            var worldContentResponse: common.WorldContentResponse = common.SerializationUtils.deserialize(jsonString, common);
            if (worldContentResponse.worldNode == undefined)
              throw "undefined";

            assert.isDefined(worldContentResponse.worldNode);
            assert.isDefined(worldContentResponse.worldNode.gridNode);
            assert.isDefined(worldContentResponse.worldNode.gridNode.gridConfiguration);
            assert.equal(worldContentResponse.worldNode.gridNode.gridConfiguration.cellCount, 100);
            
            assert.isDefined(worldContentResponse.worldNode.robotNode);
            assert.isTrue(worldContentResponse.worldNode.robotNode.modelFileName.length > 5)

            app.webSocketServerComponent.stop();
            resolve();
          });
        });

    });


  });



});