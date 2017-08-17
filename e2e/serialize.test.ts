import { assert } from 'chai';
import { commandComponent } from "../src/app";
import * as simon from 'sinon';
import * as common from "../src/common";

describe('Serialization and Deserialization', () => {

  it("Deserialize simple Message", function () {
    var jsonString: string = '{"$name":"Message"  }';
    var json = JSON.parse(jsonString);

    var message: common.Message = common.SerializationUtils.deserialize(json, common);
    assert.equal(message.$name, common.Message.name);
  });

  it("Serialize-Deserialize OrientationRequest", function () {
    // Serialize:
    var orientationRequest: common.OrientationRequest = new common.OrientationRequest();
    orientationRequest.timeout = 1234;
    orientationRequest.targetAngle = new common.Angle();
    orientationRequest.targetAngle.radians = 1.23;

    var jsonText: string = JSON.stringify(orientationRequest);
    assert.equal(jsonText, '{"$name":"OrientationRequest","targetAngle":{"radians":1.23,"$name":"Angle"},"timeout":1234}');

    // Deserialize:
    var orientationRequest: common.OrientationRequest = common.SerializationUtils.deserialize(JSON.parse(jsonText), common);
    assert.equal(orientationRequest.$name, "OrientationRequest");
    assert.equal(orientationRequest.timeout, 1234);
    var expectedAngle: common.Angle = new common.Angle();
    expectedAngle.radians = 1.23;
    if (orientationRequest.targetAngle != undefined) {
      assert.equal(orientationRequest.targetAngle.toString(), expectedAngle.toString());
    } else {
      assert.fail();
    }
  });

});