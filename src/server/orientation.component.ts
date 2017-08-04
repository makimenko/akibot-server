
import { CommandComponent } from "./command.component";

export class OrientationComponent {

    constructor(public commandComponent: CommandComponent) {
        console.log("OrientationComponent.constructor");
        this.commandComponent.commandEvents.addListener("OrientationRequest", () => { 
            this.onOrientationRequest();
        });
    }

    private onOrientationRequest() {
        console.log("OrientationComponent.onOrientationRequest");
        this.commandComponent.commandEvents.emit("OrientationResponse", "taaddaaaa");
    }

}