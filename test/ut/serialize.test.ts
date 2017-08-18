import { assert, expect } from 'chai';
import * as common from "../../src/common";

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
    assert.equal(jsonText, '{"$name":"OrientationRequest","targetAngle":{"$name":"Angle","radians":1.23},"timeout":1234}');

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

  function testSerializeDeserialize(obj: any): void {
    var jsonText: string = JSON.stringify(obj);
    var resultMessage: common.Message = common.SerializationUtils.deserialize(JSON.parse(jsonText), common);
    var jsonTextAfter: string = JSON.stringify(resultMessage);
    assert.equal(jsonText, jsonTextAfter);
  }

  it("Make sure that all Elements are serializable", function () {
    testSerializeDeserialize(new common.Element());
    testSerializeDeserialize(new common.Dimension2D(1, 2));
    testSerializeDeserialize(new common.Dimension3D(1, 2, 3));
    testSerializeDeserialize(new common.Distance(100.22));
    testSerializeDeserialize(new common.Line2D(new common.Point2D(1, 2), new common.Point2D(3, 4)));
    testSerializeDeserialize(new common.Line3D(new common.Point3D(1, 2, 3), new common.Point3D(4, 5, 6)));
  });

  it("Make sure that all Message are serializable", function () {
    testSerializeDeserialize(new common.Message());
    testSerializeDeserialize(new common.GyroscopeAutoIntervalCommand(123));
    testSerializeDeserialize(new common.GyroscopeValueResponse(common.AngleUtils.createAngleFromDegrees(7)));
    testSerializeDeserialize(new common.OrientationRequest(common.AngleUtils.createAngleFromDegrees(55), common.AngleUtils.createAngleFromDegrees(10), 123));
    testSerializeDeserialize(new common.OrientationResponse(true, common.AngleUtils.createAngleFromDegrees(78)));
  });

  it("Make sure that all WorldElement are serializable", function () {
    testSerializeDeserialize(new common.WorldElement());
    testSerializeDeserialize(new common.Geometry());
    testSerializeDeserialize(new common.BaseNode("baseNode", new common.ColladaGeometry("filename.txt"), new common.NodeTransformation3D(), true));
    testSerializeDeserialize(new common.BoxGeometry(new common.Dimension3D(1, 2, 3), new common.Material()));

    testSerializeDeserialize(new common.ColladaGeometry("myfile.txt"));
    testSerializeDeserialize(new common.GridConfiguration(10, 12, 50, 2, new common.Vector3D(0, 1, -1)));
    testSerializeDeserialize(new common.GridGeometry(new common.GridConfiguration(10, 12, 50, 2, new common.Vector3D(0, 1, -1))));
    testSerializeDeserialize(new common.Material());
  });

  it("Test not serializable ($name is missing)", function () {
    class SampleOfBadClass { kuku: string; }
    assert.throws(function () { testSerializeDeserialize(new SampleOfBadClass()) }, Error);
  });

  it("Test not serializable (class is not included into common mudule)", function () {
    class SampleOfBadClass2 extends common.Message { kuku: string; };
    assert.throws(function () { testSerializeDeserialize(new SampleOfBadClass2()) }, Error);
  });

});