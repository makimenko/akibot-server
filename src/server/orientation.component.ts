import { CommandComponent } from "./command.component";
import { GYROSCOPE_EVENT } from "./gyroscope.component";

export const ORIENTATION_EVENT = {
    OrientationRequest: Symbol("OrientationRequest"),
    OrientationResponse: Symbol("OrientationResponse")
};

export enum ORIENTATION_STATE {
    Idle,
    Busy
};

export class OrientationComponent {

    private state: ORIENTATION_STATE;

    constructor(public commandComponent: CommandComponent) {
        console.log("OrientationComponent.constructor");
        this.state = ORIENTATION_STATE.Idle;
        this.commandComponent.commandEvents.addListener(ORIENTATION_EVENT.OrientationRequest, (angle: number) => {
            this.onOrientationRequest(angle);
        });
    }

    private onOrientationRequest(angle: number) {
        console.log("OrientationComponent.onOrientationRequest: " + angle);
        if (this.state == ORIENTATION_STATE.Idle) {
            this.subscribeGyroscope();
            this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeMode, 100);
            this.commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationResponse, 111);
        } else {
            console.log("Ignore Request");
        }
    }

    private subscribeGyroscope() {
        console.log("OrientationComponent.subscribeGyroscope");

        this.commandComponent.commandEvents.on(GYROSCOPE_EVENT.GyroscopeValue, (angle: number) => {
            this.onGyroscopeValue(angle);
        })
        // TODO: 
    }

    private onGyroscopeValue(angle: number) {
        console.log("OrientationComponent.onGyroscopeValue: " + angle);
        // is expected?
        // timeout?
        // direction?

    }


}