import { assert } from 'chai';
import * as common from "../../src/common";

describe('World Utils', () => {

  it("World content", function () {
    var worldNode = new common.BaseNode("worldNode");
    var gridNode = new common.BaseNode("gridNode", worldNode);
    var robotNode = new common.BaseNode("robotNode", gridNode);
    var gyroscopeNode = new common.BaseNode("gyroscopeNode", gridNode);
    gyroscopeNode.stickToParent = true;
    var distanceCenterNode = new common.BaseNode("distanceCenterNode", robotNode);
    //console.log(worldNode);
    //console.log(common.SerializationUtils.jsonStringify(worldNode));

  });


});