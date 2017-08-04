import { CommandComponent } from "./server/command.component";
import { OrientationComponent } from "./server/orientation.component";

console.log("Initializing starrting...")
var commandComponent: CommandComponent = new CommandComponent();
var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);

console.log("Initializing completed.")



commandComponent.commandEvents.emit("OrientationRequest");


