import { EventEmitter } from "events";
import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import { Angle, AngleUtils } from "../common";

export const GYROSCOPE_EVENT = {
    GyroscopeAutoInterval: "GyroscopeAutoInterval",
    GyroscopeValue: "GyroscopeValue"
};

export class GyroscopeComponent {

    public gyroscopeEvents: EventEmitter;
    private intervalID: NodeJS.Timer;
    private logger = logFactory.getLogger(this.constructor.name);

    constructor(private commandComponent: CommandComponent) {
        this.logger.debug("constructor");
        this.gyroscopeEvents = new EventEmitter();
        this.onGyroscopeMode = this.onGyroscopeMode.bind(this);
        this.commandComponent.commandEvents.addListener(GYROSCOPE_EVENT.GyroscopeAutoInterval, (autoInterval: number) => {
            this.onGyroscopeMode(autoInterval);
        });
    }

    private onGyroscopeMode(autoInterval: number) {
        this.logger.debug("onGyroscopeMode: autoInterval=" + autoInterval + "ms");
        if (autoInterval > 0) {
            this.intervalID = setInterval(() => { this.emitGyroscopeValue() }, autoInterval);
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
        this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeValue, newAngle);
    }

    private getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }


}