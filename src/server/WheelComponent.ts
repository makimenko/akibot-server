import { CommandComponent } from ".";
import { Logger, logFactory } from "../log-config";

export const WHEEL_EVENT = {
    Stop: "Stop",
    Left: "Left",
    Right: "Right",
    Forward: "Forward",
    Backward: "Backward"
};

export enum WHEEL_LOCATION {
    Left,
    Right
};

export class WheelComponent {

    private logger: Logger;
    private wheelName: string;

    constructor(private commandComponent: CommandComponent, private wheelLocation: WHEEL_LOCATION) {
        this.wheelName = (wheelLocation == WHEEL_LOCATION.Left ? "Left" : "Right");
        this.logger = logFactory.getLogger(this.constructor.name + ":" + this.wheelName);
        this.logger.debug("constructor");

        // bind a class context to the event listener:
        this.onStop = this.onStop.bind(this);
        this.onLeft = this.onLeft.bind(this);
        this.onRight = this.onRight.bind(this);
        this.onForward = this.onForward.bind(this);
        this.onBackward = this.onBackward.bind(this);

        // Subscribe to command events
        this.commandComponent.commandEvents.addListener(WHEEL_EVENT.Stop, this.onStop);
        this.commandComponent.commandEvents.addListener(WHEEL_EVENT.Left, this.onLeft);
        this.commandComponent.commandEvents.addListener(WHEEL_EVENT.Right, this.onRight);
        this.commandComponent.commandEvents.addListener(WHEEL_EVENT.Forward, this.onForward);
        this.commandComponent.commandEvents.addListener(WHEEL_EVENT.Backward, this.onBackward);
    }

    private onStop() {
        this.logger.trace("onStop");
    }

    private onLeft() {
        this.logger.trace("onLeft");
    }

    private onRight() {
        this.logger.trace("onRight");
    }

    private onForward() {
        this.logger.trace("onForward");
    }

    private onBackward() {
        this.logger.trace("onBackward");
    }

}