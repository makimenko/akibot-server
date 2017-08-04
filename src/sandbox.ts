import { CommandComponent } from "./server/command.component";
import { OrientationComponent, ORIENTATION_EVENT } from "./server/orientation.component";
import { GyroscopeComponent } from "./server/gyroscope.component";

//====================================================================================================
console.log("Initializing starting...")
var commandComponent: CommandComponent = new CommandComponent();
var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent);

console.log("Initializing completed.")


//====================================================================================================
commandComponent.commandEvents.once(ORIENTATION_EVENT.OrientationResponse, (finalAngle: number) => {
    console.log("OrientationResponse received! Final angle is: " + finalAngle);
});
commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationRequest, 100);

