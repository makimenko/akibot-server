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
    private expectedAngle: number;
    private actualAngle?: number;
    private tolerance: number = 30;
    private timeout: number = 10000;
    private timeoutID: any;

    constructor(public commandComponent: CommandComponent) {
        console.log("OrientationComponent.constructor");
        this.state = ORIENTATION_STATE.Idle;
        this.commandComponent.commandEvents.addListener(ORIENTATION_EVENT.OrientationRequest, (angle: number) => {
            this.onOrientationRequest(angle);
        });
        // bind a class context to the event listener:
        this.onGyroscopeValue = this.onGyroscopeValue.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
    }

    private onOrientationRequest(angle: number) {
        console.log("OrientationComponent.onOrientationRequest: " + angle);
        if (this.state == ORIENTATION_STATE.Idle) {
            this.state = ORIENTATION_STATE.Busy;
            this.expectedAngle = angle;
            this.actualAngle = undefined;
            this.subscribeGyroscope();
            this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeAutoInterval, 1000);
            this.timeoutID = setTimeout(this.onTimeout, this.timeout);
        } else {
            console.log("Ignore Request");
        }
    }

    private onGyroscopeValue(angle: number) {
        console.log("OrientationComponent.onGyroscopeValue: " + angle);
        this.actualAngle = angle;

        if (angle >= this.expectedAngle - this.tolerance && angle <= this.expectedAngle + this.tolerance) {
            console.log("Seems Orientation is finished");
            this.endWork(true);
        } else {
            console.log("else...")
        }

        // TODO: direction

        // TODO: timeout

    }

    private onTimeout() {
        console.log("OrientationComponent.onTimeout");
        this.endWork(false);

    }

    private endWork(success: boolean) {
        console.log("OrientationComponent.endWork: " + (success ? "SUCCESS" : "FAILURE"));
        // Stop all
        this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeAutoInterval, 0);
        this.unsubscribeGyroscope();
        clearTimeout(this.timeoutID);
        //TODO: stop

        // Send response:
        this.commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationResponse, this.actualAngle);

        // Clear variables:
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

