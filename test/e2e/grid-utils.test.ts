import { assert } from 'chai';
import * as common from "..";

describe('Grid Utils', () => {

  it("createGridData: 1", function () {
    var actual: number[][] = common.GridUtils.createGridData(1, 8);
    var expected: number[][] = [[8]]
    assert.deepEqual(expected, actual);
  });

  it("createGridData: 2", function () {
    var actual: number[][] = common.GridUtils.createGridData(2, 9);
    var expected: number[][] = [[9, 9], [9, 9]];
    assert.deepEqual(expected, actual);
  });

  it("createGridData: 2 with update", function () {
    var actual: number[][] = common.GridUtils.createGridData(2, 0);
    actual[0][0] = 1;
    actual[0][1] = 2;
    actual[1][0] = 3;
    actual[1][1] = 4;
    var expected: number[][] = [[1, 2], [3, 4]];
    assert.deepEqual(expected, actual);
  });


  it('getAddress with offset', function () {
    var config = new common.GridConfiguration(2, 10, 1, new common.Vector3D(-10, -10, 0));
    assert.equal(1, common.GridUtils.getAddressX(new common.Point2D(5, 4), config));
    assert.equal(1, common.GridUtils.getAddressY(new common.Point2D(5, 4), config));
    assert.equal(0, common.GridUtils.getAddressX(new common.Point2D(-5, -4), config));
    assert.equal(0, common.GridUtils.getAddressY(new common.Point2D(-5, -4), config));
  });

  it('addPoint with offset', function () {
    var config = new common.GridConfiguration(2, 10, 1, new common.Vector3D(-10, -10, 0));
    var gridNode = new common.GridNode(config);
    var point = new common.Point2D(5, 5);
    gridNode.add(common.GridUtils.getAddressX(point, config), common.GridUtils.getAddressY(point, config));
    assert.equal(gridNode.data[1][1], 1);

  });


  function createTestWorld(): common.WorldNode {
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
    return worldNode;
  }

  it("Grid update: addLine", function () {
    var worldNode = createTestWorld();
    worldNode.gridNode.addLine(new common.Line2D(new common.Point2D(0, 0), new common.Point2D(0, 0)), false);
    assert.equal(worldNode.gridNode.data[5][5], 0);
  });


  it("Grid update: ", function () {

    var worldNode = createTestWorld();

    var gridNode = worldNode.gridNode;
    var gridConfiguration = worldNode.gridNode.gridConfiguration;
    var distanceNode = worldNode.robotNode.devices[0];

    var distance = new common.Distance(2, common.AngleUtils.createAngleFromDegrees(0), true);

    common.GridUtils.updateGridDistance(gridNode, worldNode.robotNode, distanceNode, distance);

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
    var config = new common.GridConfiguration(10, 1, 1, new common.Vector3D(0, 0, 0));
    var res: number[][] = common.GridUtils.rasterize(new common.Line2D(new common.Point2D(3, 3), new common.Point2D(1, 1)), true, config);

    //console.log(res);

    assert.equal(res[0][0], 3);
    assert.equal(res[0][1], 3);

    assert.equal(res[1][0], 2);
    assert.equal(res[1][1], 2);

    assert.equal(res[2][0], 1);
    assert.equal(res[2][1], 1);

  });

});