import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import { WheelCommand, WHEEL_DIRECTION } from "akibot-common/dist";
import { DefaultWheel, Wheel, WHEEL_LOCATION } from "../device/index";


export class WheelSetComponent {

    private logger = logFactory.getLogger(this.constructor.name);
    //private leftWheel: Wheel;
    private rightWheel: Wheel;
    private DEFAULT_SPEED: number = 0.5;

    constructor(private commandComponent: CommandComponent) {
        this.logger.debug("constructor");

        //this.leftWheel = new DefaultWheel(WHEEL_LOCATION.left);
        this.rightWheel = new DefaultWheel(WHEEL_LOCATION.right);
        this.stop();

        // bind a class context to the event listener:
        this.onWheelCommand = this.onWheelCommand.bind(this);

        // Subscribe to command events
        this.commandComponent.commandEvents.addListener(WheelCommand.name, this.onWheelCommand);
    }

    public stop() {
        //this.leftWheel.stop();
        this.rightWheel.stop();
    }

    private onWheelCommand(wheelCommand: WheelCommand) {
        if (wheelCommand.direction != undefined)
            this.logger.trace("onWheelCommand: " + WHEEL_DIRECTION[wheelCommand.direction]);
        else {
            this.logger.trace("onWheelCommand: " + JSON.stringify(wheelCommand));
        }

        if (wheelCommand.direction == WHEEL_DIRECTION.Stop) {
            this.stop();
        } else if (wheelCommand.direction == WHEEL_DIRECTION.Forward) {
            //this.leftWheel.forward(this.DEFAULT_SPEED);
            this.rightWheel.forward(this.DEFAULT_SPEED);
        } else if (wheelCommand.direction == WHEEL_DIRECTION.Backward) {
            //this.leftWheel.backward(this.DEFAULT_SPEED);
            this.rightWheel.backward(this.DEFAULT_SPEED);
        } else if (wheelCommand.direction == WHEEL_DIRECTION.Right) {
            //this.leftWheel.forward(this.DEFAULT_SPEED);
            this.rightWheel.backward(this.DEFAULT_SPEED);
        } else if (wheelCommand.direction == WHEEL_DIRECTION.Left) {
            //this.leftWheel.backward(this.DEFAULT_SPEED);
            this.rightWheel.forward(this.DEFAULT_SPEED);
        } else {
            throw new Error("Unknown wheelCommand: " + JSON.stringify(wheelCommand));
        }

    }

}