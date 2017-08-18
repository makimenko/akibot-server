import { CommandComponent, WebSocketServerComponent } from ".";
import { Logger, logFactory } from "../log-config";
import * as common from "../common";

export class WorldComponent {

    private logger: Logger = logFactory.getLogger(this.constructor.name);
    public worldNode: common.BaseNode;

    constructor(private commandComponent: CommandComponent, private webSocketServerComponent: WebSocketServerComponent) {
        this.logger.debug("constructor");
        this.initWorldContent();

        this.onGyroscopeValueResponse = this.onGyroscopeValueResponse.bind(this);
        this.onWorldContentRequest = this.onWorldContentRequest.bind(this);

        this.commandComponent.commandEvents.addListener(common.GyroscopeValueResponse.name, this.onGyroscopeValueResponse);
        this.commandComponent.commandEvents.addListener(common.WorldContentRequest.name, this.onWorldContentRequest);
    }

    private initWorldContent() {
        this.worldNode = new common.BaseNode("worldNode");

        var gridNode = new common.BaseNode("gridNode", this.worldNode);
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

        var gyroscopeNode = new common.BaseNode("gyroscopeNode", robotNode);
        gyroscopeNode.stickToParent = true;
        var distanceCenterNode = new common.BaseNode("distanceCenterNode", robotNode);
    }

    private onGyroscopeValueResponse(gyroscopeValueResponse: common.GyroscopeValueResponse) {
        this.logger.trace("onGyroscopeValueResponse: " + gyroscopeValueResponse.angle);
        //TODO:
    }

    private onWorldContentRequest(worldContentRequest: common.WorldContentRequest) {
        this.logger.trace("onWorldContentRequest");
        var worldContentResponse = new common.WorldContentResponse(this.worldNode);
        this.webSocketServerComponent.broadcast(worldContentResponse)
    }

}