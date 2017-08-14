import { CommandComponent, OrientationComponent, ORIENTATION_EVENT, GyroscopeComponent, WheelComponent, WHEEL_LOCATION} from "./server";
import {logFactory} from "./server/Log";

const log = logFactory.getLogger("sandbox");

//====================================================================================================
log.info("Initializing starting...");
var commandComponent: CommandComponent = new CommandComponent();
var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent);
var leftWheelComponent: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
var rightWheelComponent: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Right);

//====================================================================================================
log.info("Sandbox starting...");
commandComponent.commandEvents.on(ORIENTATION_EVENT.OrientationResponse, (success:boolean, finalAngle: number) => {
    log.info("Orientation "+(success?"SUCEEDED":"FAILED")+"! Final angle is: " + finalAngle);
});
commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationRequest, 100);
//commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationRequest, 120);
