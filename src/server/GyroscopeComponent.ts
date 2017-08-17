import { EventEmitter } from "events";
import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import { Angle, AngleUtils, GyroscopeAutoIntervalCommand, GyroscopeValueResponse } from "../common";


export class GyroscopeComponent {

    public gyroscopeEvents: EventEmitter;
    private intervalID: NodeJS.Timer;
    private logger = logFactory.getLogger(this.constructor.name);

    constructor(private commandComponent: CommandComponent) {
        this.logger.debug("constructor");
        this.gyroscopeEvents = new EventEmitter();
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
        this.logger.trace("getGyroscopeValue");
        var degrees = this.getRandomArbitrary(0, 360);
        var newAngle: Angle = AngleUtils.createAngleFromDegrees(degrees);
        var gyroscopeValueResponse: GyroscopeValueResponse = new GyroscopeValueResponse(newAngle);
        this.commandComponent.emitMessage(gyroscopeValueResponse);
    }

    private getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }


}