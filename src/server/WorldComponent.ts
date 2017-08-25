import { CommandComponent, WebSocketServerComponent } from ".";
import { Logger, logFactory } from "../log-config";
import * as common from "akibot-common/dist";

export class WorldComponent {

    private logger: Logger = logFactory.getLogger(this.constructor.name);
    public worldNode: common.WorldNode;
    public robotNode: common.RobotNode;

    constructor(private commandComponent: CommandComponent, private webSocketServerComponent: WebSocketServerComponent) {
        this.logger.debug("constructor");
        this.initWorldContent();

        this.onGyroscopeValueResponse = this.onGyroscopeValueResponse.bind(this);
        this.onWorldContentRequest = this.onWorldContentRequest.bind(this);

        this.commandComponent.commandEvents.addListener(common.GyroscopeValueResponse.name, this.onGyroscopeValueResponse);
        this.commandComponent.commandEvents.addListener(common.WorldContentRequest.name, this.onWorldContentRequest);
    }

    private initWorldContent() {

        // TODO: make it configurable
        var gridCellCount = 100;
        var gridCellSizeMm = 100;
        var gridMaxObstacleCount = 10;
        var gridOffsetVector = new common.Vector3D(-gridCellCount * gridCellSizeMm / 2, -gridCellCount * gridCellSizeMm / 2, 0);
        var gridConfiguration = new common.GridConfiguration(gridCellCount, gridCellSizeMm, gridMaxObstacleCount, gridOffsetVector);
        var gridNode = new common.GridNode(gridConfiguration);

        gridNode.data = common.GridUtils.createGridData(gridConfiguration.cellCount, gridConfiguration.unknownValue);

        this.robotNode = new common.RobotNode("./assets/model/AkiBot.dae", new common.NodeTransformation3D());
        this.worldNode = new common.WorldNode(gridNode, this.robotNode);

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