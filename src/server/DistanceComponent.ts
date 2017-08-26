import { EventEmitter } from "events";
import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import * as common from "akibot-common/dist";
import { Gyroscope } from "../device/gyroscope/Gyroscope";
import { CallableDistanceSensor } from "../device";


export class DistanceComponent {

    private intervalID: NodeJS.Timer;
    private logger = logFactory.getLogger(this.constructor.name);

    constructor(private commandComponent: CommandComponent, private distance: CallableDistanceSensor) {
        this.logger.debug("constructor");
        this.onDistanceAutoIntervalCommand = this.onDistanceAutoIntervalCommand.bind(this);
        this.commandComponent.commandEvents.addListener(common.DistanceAutoIntervalCommand.name, (distanceAutoIntervalCommand: common.DistanceAutoIntervalCommand) => {
            this.onDistanceAutoIntervalCommand(distanceAutoIntervalCommand);
        });
    }

    private onDistanceAutoIntervalCommand(distanceAutoIntervalCommand: common.DistanceAutoIntervalCommand) {
        if (distanceAutoIntervalCommand == undefined || distanceAutoIntervalCommand.interval == undefined) {
            throw "Mandatory attributes are undefined"
        }
        this.logger.debug("onDistanceAutoIntervalCommand: autoInterval=" + distanceAutoIntervalCommand.interval + "ms");
        if (distanceAutoIntervalCommand.interval > 0) {
            this.intervalID = setInterval(() => { this.emitDistanceValue() }, distanceAutoIntervalCommand.interval);
            this.emitDistanceValue();
        } else {
            this.logger.trace("Clear interval with ID = " + this.intervalID);
            clearInterval(this.intervalID);
        }
    }

    private emitDistanceValue() {
        this.logger.trace("emitDistanceValue");

        var distance = this.distance.getDistance();
        var response: common.DistanceValueResponse = new common.DistanceValueResponse(distance);
        this.commandComponent.emitMessage(response);
    }

}