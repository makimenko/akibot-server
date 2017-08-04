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
    private expectedAngle?: number;
    private actualAngle?: number;

    constructor(public commandComponent: CommandComponent) {
        console.log("OrientationComponent.constructor");
        this.state = ORIENTATION_STATE.Idle;
        this.commandComponent.commandEvents.addListener(ORIENTATION_EVENT.OrientationRequest, (angle: number) => {
            this.onOrientationRequest(angle);
        });
        // bind a class context to the event listener:
        this.onGyroscopeValue = this.onGyroscopeValue.bind(this);
    }

    private onOrientationRequest(angle: number) {
        console.log("OrientationComponent.onOrientationRequest: " + angle);
        if (this.state == ORIENTATION_STATE.Idle) {
            this.state = ORIENTATION_STATE.Busy;
            this.expectedAngle = angle;
            this.actualAngle = undefined;
            this.subscribeGyroscope();
            this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeMode, 1000);

        } else {
            console.log("Ignore Request");
        }
    }

    private onGyroscopeValue(angle: number) {
        console.log("OrientationComponent.onGyroscopeValue: " + angle);
        this.actualAngle = angle;

        if (this.expectedAngle == undefined || (angle >= this.expectedAngle - 10 && angle <= this.expectedAngle + 10)) {
            console.log("Seems Orientation is finished");
            this.endWork();
        } else {
            console.log("else...")
        }
        // TODO: timeout
        // TODO: direction
    }

    private endWork() {
        console.log("OrientationComponent.endWork");
        // Stop all
        this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeMode, 0);
        this.unsubscribeGyroscope();
        //TODO: stop

        // Send response:
        this.commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationResponse, this.actualAngle);

        // Clear variables:
        this.expectedAngle = undefined;
        this.actualAngle = undefined;
        this.state = ORIENTATION_STATE.Idle;
    }

    private subscribeGyroscope() {
        console.log("OrientationComponent.subscribeGyroscope");
        this.commandComponent.commandEvents.addListener(GYROSCOPE_EVENT.GyroscopeValue, this.onGyroscopeValue);
    }

    private unsubscribeGyroscope() {
        console.log("OrientationComponent.unsubscribeGyroscope");
        this.commandComponent.commandEvents.removeListener(GYROSCOPE_EVENT.GyroscopeValue, this.onGyroscopeValue);
    }


}

