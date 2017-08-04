import { EventEmitter } from "events";
import { CommandComponent } from "./command.component";
import { factory } from "./log-config";

export const GYROSCOPE_EVENT = {
    GyroscopeAutoInterval: Symbol("GyroscopeAutoInterval"),
    GyroscopeValue: Symbol("GyroscopeValue")
};

export class GyroscopeComponent {

    public gyroscopeEvents: EventEmitter;
    private intervalID: any;
    private logger = factory.getLogger(this.constructor.name);

    constructor(private commandComponent: CommandComponent) {
        this.logger.info("GyroscopeComponent.constructor");
        this.gyroscopeEvents = new EventEmitter();
        this.commandComponent.commandEvents.addListener(GYROSCOPE_EVENT.GyroscopeAutoInterval, (autoInterval: number) => {
            this.onGyroscopeMode(autoInterval);
        });
    }

    private onGyroscopeMode(autoInterval: number) {
        this.logger.debug("GyroscopeComponent.onGyroscopeMode: " + autoInterval);
        if (autoInterval > 0) {
            this.getGyroscopeValue();
            this.intervalID = setInterval(() => { this.getGyroscopeValue() }, autoInterval);
        } else {
            clearInterval(this.intervalID);
        }
    }

    private getGyroscopeValue() {
        this.logger.trace("GyroscopeComponent.getGyroscopeValue");
        var actualAngle = this.getRandomArbitrary(0, 360);
        this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeValue, actualAngle);
    }

    private getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }


}