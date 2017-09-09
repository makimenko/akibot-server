import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import { WheelSetCommand, WHEEL_SET_DIRECTION } from "akibot-common/dist";
import { DefaultWheel, Wheel, WHEEL_LOCATION } from "../device/index";


export class WheelSetComponent {

    private logger = logFactory.getLogger(this.constructor.name);
    private leftWheel: Wheel;
    private rightWheel: Wheel;
    private DEFAULT_SPEED: number = 0.5;

    constructor(private commandComponent: CommandComponent) {
        this.logger.debug("constructor");

        this.leftWheel = new DefaultWheel(WHEEL_LOCATION.left);
        this.rightWheel = new DefaultWheel(WHEEL_LOCATION.right);
        this.stop();

        // bind a class context to the event listener:
        this.onWheelSetCommand = this.onWheelSetCommand.bind(this);

        // Subscribe to command events
        this.commandComponent.commandEvents.addListener(WheelSetCommand.name, this.onWheelSetCommand);
    }

    public stop() {
        this.leftWheel.stop();
        this.rightWheel.stop();
    }

    private onWheelSetCommand(wheelSetCommand: WheelSetCommand) {
        this.logger.trace("onWheelSetCommand: " + WHEEL_SET_DIRECTION[wheelSetCommand.direction]);
        
        var speed = (wheelSetCommand.pctSpeed==undefined? this.DEFAULT_SPEED : wheelSetCommand.pctSpeed);

        if (wheelSetCommand.direction == WHEEL_SET_DIRECTION.Stop) {
            this.stop();
        } else if (wheelSetCommand.direction == WHEEL_SET_DIRECTION.Forward) {
            this.leftWheel.forward(speed);
            this.rightWheel.forward(speed);
        } else if (wheelSetCommand.direction == WHEEL_SET_DIRECTION.Backward) {
            this.leftWheel.backward(speed);
            this.rightWheel.backward(speed);
        } else if (wheelSetCommand.direction == WHEEL_SET_DIRECTION.Right) {
            this.leftWheel.forward(speed);
            this.rightWheel.backward(speed);
        } else if (wheelSetCommand.direction == WHEEL_SET_DIRECTION.Left) {
            this.leftWheel.backward(speed);
            this.rightWheel.forward(speed);
        } else {
            throw new Error("Unknown wheelCommand: " + JSON.stringify(wheelSetCommand));
        }

    }

}