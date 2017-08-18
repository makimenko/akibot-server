import { assert } from 'chai';
import * as common from "../../src/common";

describe('World Utils', () => {

  it("World content", function () {
    var worldNode = new common.BaseNode("worldNode");

    var gridNode = new common.BaseNode("gridNode", worldNode);
    var gridCellCountX = 100;
    var gridCellCountY = 100;
    var gridCellSizeMm = 100;
    var gridMaxObstacleCount = 10;
    var gridOffsetVector = new common.Vector3D(gridCellCountX * gridCellSizeMm / 2, gridCellCountY * gridCellSizeMm / 2, 0);
    var gridConfiguration = new common.GridConfiguration(gridCellCountX, gridCellCountY, gridCellSizeMm, gridMaxObstacleCount, gridOffsetVector);
    gridNode.geometry = new common.GridGeometry(gridConfiguration);

    var robotNode = new common.BaseNode("robotNode", gridNode);
    var robotModel = "model/AkiBot.dae";
    robotNode.geometry = new common.ColladaGeometry(robotModel);

    var gyroscopeNode = new common.BaseNode("gyroscopeNode", gridNode);
    gyroscopeNode.stickToParent = true;
    var distanceCenterNode = new common.BaseNode("distanceCenterNode", robotNode);
    //console.log(worldNode);
    //console.log(common.SerializationUtils.jsonStringify(worldNode));

  });


});