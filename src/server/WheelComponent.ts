import { CommandComponent } from ".";
import { Logger, logFactory } from "../log-config";
import { WheelCommand, WHEEL_DIRECTION } from "akibot-common/dist";

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
        this.onWheelCommand = this.onWheelCommand.bind(this);

        // Subscribe to command events
        this.commandComponent.commandEvents.addListener(WheelCommand.name, this.onWheelCommand);
    }

    private onWheelCommand(wheelCommand: WheelCommand) {
        if (wheelCommand == undefined || wheelCommand.direction == undefined) {
            throw "Wheel command direction is undefined"
        }
        this.logger.trace(WHEEL_DIRECTION[wheelCommand.direction]);
    }

}