import { CommandComponent, WebSocketServerComponent, GridHandler } from ".";
import { Logger, logFactory } from "../log-config";
import * as common from "akibot-common/dist";
import * as nconf from "nconf";

export class WorldComponent {

    private logger: Logger = logFactory.getLogger(this.constructor.name);
    public worldNode: common.WorldNode;
    public robotNode: common.RobotNode;
    public gridHandler: GridHandler;

    constructor(private commandComponent: CommandComponent, private webSocketServerComponent: WebSocketServerComponent) {
        this.logger.debug("constructor");
        this.initWorldContent();

        this.onGyroscopeValueResponse = this.onGyroscopeValueResponse.bind(this);
        this.onWorldContentRequest = this.onWorldContentRequest.bind(this);
        this.onDistanceValueResponse = this.onDistanceValueResponse.bind(this);

        this.commandComponent.commandEvents.addListener(common.GyroscopeValueResponse.name, this.onGyroscopeValueResponse);
        this.commandComponent.commandEvents.addListener(common.DistanceValueResponse.name, this.onDistanceValueResponse);
        this.commandComponent.commandEvents.addListener(common.WorldContentRequest.name, this.onWorldContentRequest);
    }

    private initWorldContent() {
        this.logger.debug("initWorldContent");

        var gridCellCount = Number(nconf.get("grid:cellCount"));
        var gridCellSizeMm = Number(nconf.get("grid:cellSizeMm"));
        var gridMaxObstacleCount = Number(nconf.get("grid:maxObstacleCount"));
        var robotModelFile: string = nconf.get("robot:modelFile");

        this.logger.trace("gridCellCount=" + gridCellCount + ", gridCellSizeMm=" + gridCellSizeMm + ", gridMaxObstacleCount=" + gridMaxObstacleCount);

        var gridOffsetVector = new common.Vector3D(-gridCellCount * gridCellSizeMm / 2, -gridCellCount * gridCellSizeMm / 2, 0);
        var gridConfiguration = new common.GridConfiguration(gridCellCount, gridCellSizeMm, gridMaxObstacleCount, gridOffsetVector);
        var gridNode = new common.GridNode(gridConfiguration);

        this.robotNode = new common.RobotNode(robotModelFile, new common.NodeTransformation3D());
        this.worldNode = new common.WorldNode(gridNode, this.robotNode);
        this.gridHandler = new GridHandler(gridNode);

        // TODO: support multiplse distances (add device ID)
        var distanceCenterNode = new common.DeviceNode(new common.NodeTransformation3D());
        //distanceCenterNode.transformation.position.y = 10;
        this.attachDeviceToRobot(distanceCenterNode);
    }

    public attachDeviceToRobot(deviceNode: common.DeviceNode) {
        this.robotNode.devices.push(deviceNode);
    }

    private onGyroscopeValueResponse(gyroscopeValueResponse: common.GyroscopeValueResponse) {
        this.logger.trace("onGyroscopeValueResponse: " + gyroscopeValueResponse.angle);

        if (this.worldNode.robotNode.transformation == undefined) {
            this.worldNode.robotNode.transformation = new common.NodeTransformation3D();
        }

        if (gyroscopeValueResponse.angle != undefined && gyroscopeValueResponse.angle.radians != undefined) {
            if (this.worldNode.robotNode.transformation.rotation == undefined) {
                this.worldNode.robotNode.transformation.rotation = new common.Vector3D(0, 0, 0);
            }
            this.worldNode.robotNode.transformation.rotation.z = gyroscopeValueResponse.angle.radians;

            // Notify all
            var robotTransformationEvent = new common.RobotTransformationEvent(this.worldNode.robotNode.transformation);
            this.webSocketServerComponent.broadcast(robotTransformationEvent);
        }

    }

    private onWorldContentRequest(worldContentRequest: common.WorldContentRequest) {
        this.logger.trace("onWorldContentRequest");
        var worldContentResponse = new common.WorldContentResponse(this.worldNode);
        this.webSocketServerComponent.broadcast(worldContentResponse)
    }

    private onDistanceValueResponse(distanceValueResponse: common.DistanceValueResponse) {
        this.logger.trace("onDistanceValueResponse: " + JSON.stringify(distanceValueResponse.distance));
        // TODO: allow multiple distance meters
        var distanceNode = this.robotNode.devices[0];
        if (distanceNode != undefined) {
            this.logger.trace("updateGridDistance");
            this.gridHandler.updateGridDistance(this.robotNode, distanceNode, distanceValueResponse.distance);
            var gridUpdateEvent = new common.GridUpdateEvent(this.worldNode.gridNode.data);
            this.webSocketServerComponent.broadcast(gridUpdateEvent);
        }
    }

}