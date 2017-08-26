import { EventEmitter } from "events";
import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import { Angle, AngleUtils, GyroscopeAutoIntervalCommand, GyroscopeValueResponse } from "akibot-common/dist";
import { Gyroscope } from "../device/gyroscope/Gyroscope";


export class GyroscopeComponent {

    private intervalID: NodeJS.Timer;
    private logger = logFactory.getLogger(this.constructor.name);

    constructor(private commandComponent: CommandComponent, private gyroscope: Gyroscope) {
        this.logger.debug("constructor");
        this.onGyroscopeAutoIntervalCommand = this.onGyroscopeAutoIntervalCommand.bind(this);
        this.commandComponent.commandEvents.addListener(GyroscopeAutoIntervalCommand.name, (gyroscopeAutoIntervalCommand: GyroscopeAutoIntervalCommand) => {
            this.onGyroscopeAutoIntervalCommand(gyroscopeAutoIntervalCommand);
        });
    }

    private onGyroscopeAutoIntervalCommand(gyroscopeAutoIntervalCommand: GyroscopeAutoIntervalCommand) {
        if (gyroscopeAutoIntervalCommand == undefined || gyroscopeAutoIntervalCommand.interval == undefined) {
            throw "Mandatory attributes are undefined"
        }
        this.logger.debug("onGyroscopeMode: autoInterval=" + gyroscopeAutoIntervalCommand.interval + "ms");
        if (gyroscopeAutoIntervalCommand.interval > 0) {
            this.intervalID = setInterval(() => { this.emitGyroscopeValue() }, gyroscopeAutoIntervalCommand.interval);
            this.emitGyroscopeValue();
        } else {
            this.logger.trace("Clear interval with ID = " + this.intervalID);
            clearInterval(this.intervalID);
        }
    }

    private emitGyroscopeValue() {
        this.logger.trace("emitGyroscopeValue");

        var northAngle = this.gyroscope.getNorthAngle();
        var response: GyroscopeValueResponse = new GyroscopeValueResponse(northAngle);
        this.commandComponent.emitMessage(response);
    }

}