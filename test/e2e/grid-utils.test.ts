import { assert } from 'chai';
import * as common from "akibot-common/dist";
import { GridHandler } from "../../src/server/GridHandler";

interface ITestWorld {
  worldNode: common.WorldNode;
  gridHandler: GridHandler;
}

describe('Grid Utils', () => {

  function createSimpliestGridHandler(config?: common.GridConfiguration): GridHandler {
    if (config == undefined) {
      var gridConfiguration = new common.GridConfiguration(2, 10, 1, new common.Vector3D(-10, -10, 0));
    } else {
      var gridConfiguration = config;
    }
    var gridNode = new common.GridNode(gridConfiguration);
    var gridHandler = new GridHandler(gridNode);
    return gridHandler;
  }

  it("createGridData: 1", function () {
    var gridHandler = createSimpliestGridHandler();
    var actual: number[][] = gridHandler.createGridData(1, 8);
    var expected: number[][] = [[8]]
    assert.deepEqual(expected, actual);
  });

  it("createGridData: 2", function () {
    var gridHandler = createSimpliestGridHandler();
    var actual: number[][] = gridHandler.createGridData(2, 9);
    var expected: number[][] = [[9, 9], [9, 9]];
    assert.deepEqual(expected, actual);
  });

  it("createGridData: 2 with update", function () {
    var gridHandler = createSimpliestGridHandler();
    var actual: number[][] = gridHandler.createGridData(2, 0);
    actual[0][0] = 1;
    actual[0][1] = 2;
    actual[1][0] = 3;
    actual[1][1] = 4;
    var expected: number[][] = [[1, 2], [3, 4]];
    assert.deepEqual(expected, actual);
  });

  it('getAddress with offset', function () {
    var gridHandler = createSimpliestGridHandler(new common.GridConfiguration(2, 10, 1, new common.Vector3D(-10, -10, 0)));
    assert.equal(1, gridHandler.getAddressX(new common.Point2D(5, 4)));
    assert.equal(1, gridHandler.getAddressY(new common.Point2D(5, 4)));
    assert.equal(0, gridHandler.getAddressX(new common.Point2D(-5, -4)));
    assert.equal(0, gridHandler.getAddressY(new common.Point2D(-5, -4)));
  });

  it('addPoint with offset', function () {
    var gridHandler = createSimpliestGridHandler(new common.GridConfiguration(2, 10, 1, new common.Vector3D(-10, -10, 0)));
    var point = new common.Point2D(5, 5);
    gridHandler.add(gridHandler.getAddressX(point), gridHandler.getAddressY(point));
    assert.equal(gridHandler.gridNode.data[1][1], 1);
  });



  function createTestWorld(): ITestWorld {
    var COORD_PRECISSION = 0.01;
    var ROTATION_PRECISSION = 0.0000001;

    var maxObstacle = 1;
    var gridConfiguration = new common.GridConfiguration(10, 1, maxObstacle, new common.Vector3D(-5, -5, 0));
    var gridNode = new common.GridNode(gridConfiguration);
    var robotTransformation = new common.NodeTransformation3D();
    robotTransformation.position = new common.Vector3D(3, 2, 0);
    robotTransformation.rotation = new common.Vector3D(0, 0, common.AngleUtils.degreesToRadians(45));
    var robotNode = new common.RobotNode("filename", robotTransformation);
    var worldNode = new common.WorldNode(gridNode, robotNode);

    var distanceTransformation = new common.NodeTransformation3D();
    distanceTransformation.position = new common.Vector3D(0, 2, 0);
    distanceTransformation.rotation = new common.Vector3D(0, 0, common.AngleUtils.degreesToRadians(5));
    var distanceNode = new common.DeviceNode(distanceTransformation);

    robotNode.devices.push(distanceNode);

    var gridHandler = new GridHandler(gridNode);

    return {
      worldNode,
      gridHandler
    };
  }

  it("Grid update: addLine", function () {
    var testWorld = createTestWorld();
    testWorld.gridHandler.addLine(new common.Line2D(new common.Point2D(0, 0), new common.Point2D(0, 0)), false);
    assert.equal(testWorld.worldNode.gridNode.data[5][5], 0);
  });


  it("Grid update: ", function () {

    var testWorld = createTestWorld();

    var gridNode = testWorld.worldNode.gridNode;
    var gridConfiguration = testWorld.worldNode.gridNode.gridConfiguration;
    var distanceNode = testWorld.worldNode.robotNode.devices[0];

    var distance = new common.Distance(2, common.AngleUtils.createAngleFromDegrees(0), true);

    testWorld.gridHandler.updateGridDistance(testWorld.worldNode.robotNode, distanceNode, distance);

    assert.equal(gridNode.data[4][9], gridConfiguration.unknownValue);
    assert.equal(gridNode.data[5][9], gridConfiguration.maxObstacleCount);
    assert.equal(gridNode.data[6][9], gridConfiguration.unknownValue);

    assert.equal(gridNode.data[5][8], gridConfiguration.unknownValue);
    assert.equal(gridNode.data[6][8], gridConfiguration.emptyValue);
    assert.equal(gridNode.data[7][8], gridConfiguration.unknownValue);

    assert.equal(gridNode.data[6][7], gridConfiguration.unknownValue);
    assert.equal(gridNode.data[7][7], gridConfiguration.unknownValue);
    assert.equal(gridNode.data[8][7], gridConfiguration.unknownValue);

  });


  it('Rasterize', function () {
    var gridHandler = createSimpliestGridHandler(new common.GridConfiguration(10, 1, 1, new common.Vector3D(0, 0, 0)));

    var res: number[][] = gridHandler.rasterize(new common.Line2D(new common.Point2D(3, 3), new common.Point2D(1, 1)), true);

    //console.log(res);

    assert.equal(res[0][0], 3);
    assert.equal(res[0][1], 3);

    assert.equal(res[1][0], 2);
    assert.equal(res[1][1], 2);

    assert.equal(res[2][0], 1);
    assert.equal(res[2][1], 1);

  });

});