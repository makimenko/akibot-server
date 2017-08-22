import { assert, expect } from 'chai';
import * as common from 'akibot-common/dist';

describe('Verify akibot-common module', () => {

  function testSerializeDeserialize(obj: any): void {
    var jsonText: string = common.SerializationUtils.jsonStringify(obj);
    var resultMessage: common.Message = common.SerializationUtils.deserialize(common.SerializationUtils.jsonParse(jsonText), common);
    var jsonTextAfter: string = common.SerializationUtils.jsonStringify(resultMessage);
    //console.log(jsonText);
    //console.log(jsonTextAfter);
    assert.equal(jsonText, jsonTextAfter);
  }

  it("Make sure that all Messages are serializable", function () {
    testSerializeDeserialize(new common.Message());
    testSerializeDeserialize(new common.GyroscopeAutoIntervalCommand(123));
    testSerializeDeserialize(new common.GyroscopeValueResponse(common.AngleUtils.createAngleFromDegrees(7)));
    testSerializeDeserialize(new common.OrientationRequest(common.AngleUtils.createAngleFromDegrees(55), common.AngleUtils.createAngleFromDegrees(10), 123));
    testSerializeDeserialize(new common.OrientationResponse(true, common.AngleUtils.createAngleFromDegrees(78)));
  });


});