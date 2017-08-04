import { CommandComponent } from "./command.component";
import { factory } from "./log-config";
import { Logger } from "typescript-logging";

export const WHEEL_EVENT = {
    Stop: Symbol("Stop"),
    Left: Symbol("Left"),
    Right: Symbol("Right"),
    Forward: Symbol("Forward"),
    Backward: Symbol("Backward")
};

export enum WHEEL_LOCATION {
    Left,
    Right
};

export class WheelComponent {

    private logger :Logger;
    private wheelName: string;

    constructor(private commandComponent: CommandComponent, private wheelLocation: WHEEL_LOCATION) {
        this.wheelName = (wheelLocation == WHEEL_LOCATION.Left ? "Left" : "Right");
        this.logger = factory.getLogger(this.constructor.name+":"+this.wheelName);
        this.logger.info("constructor");

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
        this.logger.debug("onStop");
    }

    private onLeft() {
        this.logger.debug("onLeft");
    }

    private onRight() {
        this.logger.debug("onRight");
    }

    private onForward() {
        this.logger.debug("onForward");
    }

    private onBackward() {
        this.logger.debug("onBackward");
    }

}