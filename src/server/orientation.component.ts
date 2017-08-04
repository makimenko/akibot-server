import { CommandComponent } from "./command.component";
import { GYROSCOPE_EVENT } from "./gyroscope.component";
import { WHEEL_EVENT } from "./wheel.component";

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

    private gyroscopeAutoInterval: number = 1000;
    private tolerance: number = 30;
    private timeout: number = 10000;
    private timeoutID: any;

    constructor(public commandComponent: CommandComponent) {
        console.log("OrientationComponent.constructor");
        this.state = ORIENTATION_STATE.Idle;

        // bind a class context to the event listener:
        this.onGyroscopeValue = this.onGyroscopeValue.bind(this);
        this.onTimeout = this.onTimeout.bind(this);

        this.commandComponent.commandEvents.addListener(ORIENTATION_EVENT.OrientationRequest, (angle: number) => {
            this.onOrientationRequest(angle);
        });

    }

    private onOrientationRequest(angle: number) {
        console.log("OrientationComponent.onOrientationRequest: " + angle);
        if (this.state == ORIENTATION_STATE.Idle) {
            this.state = ORIENTATION_STATE.Busy;
            this.expectedAngle = angle;
            this.actualAngle = undefined;
            this.subscribeGyroscope();
            this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeAutoInterval, this.gyroscopeAutoInterval);
            this.timeoutID = setTimeout(this.onTimeout, this.timeout);
        } else {
            console.log("Ignore Request");
        }
    }

    private onGyroscopeValue(angle: number) {
        console.log("OrientationComponent.onGyroscopeValue: " + angle);
        this.actualAngle = angle;

        if (this.isExpected(angle)) {
            console.log("Seems Orientation is finished");
            this.endWork(true);
        } else {
            // Calculate direction:
            if (angle < this.expectedAngle) {
                this.commandComponent.commandEvents.emit(WHEEL_EVENT.Left);
            } else {
                this.commandComponent.commandEvents.emit(WHEEL_EVENT.Right);
            }
        }

    }

    private isExpected(angle: number) {
        return angle >= this.expectedAngle - this.tolerance && angle <= this.expectedAngle + this.tolerance;
    }

    private onTimeout() {
        console.log("OrientationComponent.onTimeout");
        this.endWork(false);

    }

    private endWork(success: boolean) {
        console.log("OrientationComponent.endWork: " + (success ? "SUCCESS" : "FAILURE"));
        // Stop all
        clearTimeout(this.timeoutID);
        this.unsubscribeGyroscope();
        this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeAutoInterval, 0);
        this.commandComponent.commandEvents.emit(WHEEL_EVENT.Stop);
        
        // Send response:
        this.commandComponent.commandEvents.emit(ORIENTATION_EVENT.OrientationResponse, success, this.actualAngle);

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

