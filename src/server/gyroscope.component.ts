import { EventEmitter } from "events";
import { CommandComponent } from "./command.component";

export const GYROSCOPE_EVENT = {
    GyroscopeAutoInterval: Symbol("GyroscopeAutoInterval"),
    GyroscopeValue: Symbol("GyroscopeValue")
};

export class GyroscopeComponent {

    public gyroscopeEvents: EventEmitter;

    private intervalID: any;

    constructor(private commandComponent: CommandComponent) {
        console.log("GyroscopeComponent.constructor");
        this.gyroscopeEvents = new EventEmitter();
        this.commandComponent.commandEvents.addListener(GYROSCOPE_EVENT.GyroscopeAutoInterval, (autoInterval: number) => {
            this.onGyroscopeMode(autoInterval);
        });
    }

    private onGyroscopeMode(autoInterval: number) {
        console.log("GyroscopeComponent.onGyroscopeMode: " + autoInterval);
        if (autoInterval > 0) {
            this.getGyroscopeValue();
            this.intervalID = setInterval(() => { this.getGyroscopeValue() }, autoInterval);
        } else {
            clearInterval(this.intervalID);
        }
    }

    private getGyroscopeValue() {
        console.log("GyroscopeComponent.getGyroscopeValue");
        var actualAngle = this.getRandomArbitrary(0, 360);
        this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeValue, actualAngle);
    }

    private getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }


}