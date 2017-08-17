import { CommandComponent, GYROSCOPE_EVENT, WHEEL_EVENT } from ".";
import { logFactory, Logger } from "../log-config";
import { OrientationRequest, Angle, OrientationResponse, AngleUtils } from "../common";

export enum ORIENTATION_STATE {
    Idle,
    Busy
};

export class OrientationComponent {

    private logger: Logger = logFactory.getLogger(this.constructor.name);

    private state: ORIENTATION_STATE;
    private targetAngle: Angle;
    private tolerance: Angle;
    private actualAngle?: Angle;

    private gyroscopeAutoInterval: number = 1000;
    private timeoutID: any;

    constructor(public commandComponent: CommandComponent) {
        this.logger.debug("constructor");
        this.state = ORIENTATION_STATE.Idle;

        // bind a class context to the event listener:
        this.onGyroscopeValue = this.onGyroscopeValue.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
        this.onOrientationRequest = this.onOrientationRequest.bind(this);

        console.log("*** OrientationRequest.name=" + OrientationRequest.name); // TODO: remove
        this.commandComponent.commandEvents.addListener(OrientationRequest.name, (orientationRequest: OrientationRequest) => {
            this.onOrientationRequest(orientationRequest);
        });
    }

    private onOrientationRequest(orientationRequest: OrientationRequest) {
        this.logger.debug("onOrientationRequest: " + orientationRequest);
        if (orientationRequest == undefined || orientationRequest.targetAngle == undefined || orientationRequest.tolerance == undefined) {
            throw "Undefined mandatory parameters of OrientationRequest";
        } if (!this.commandComponent.lock()) {
            this.logger.warn("Ignore: Another exclusive command is running!");
            this.sendResponse(false);
        } else if (this.state == ORIENTATION_STATE.Busy) {
            this.logger.warn("Ignore: Busy");
            this.sendResponse(false);
        } else {
            this.state = ORIENTATION_STATE.Busy;
            this.targetAngle = orientationRequest.targetAngle;
            this.tolerance = orientationRequest.tolerance;
            this.actualAngle = undefined;
            this.subscribeGyroscope();
            this.timeoutID = setTimeout(this.onTimeout, orientationRequest.timeout);
            this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeAutoInterval, this.gyroscopeAutoInterval);
        }
    }

    private onGyroscopeValue(angle: Angle) {
        this.logger.trace("onGyroscopeValue: " + angle);
        this.actualAngle = angle;
        if (this.isExpected(angle)) {
            this.logger.debug("Seems Orientation is finished and angle is Ok");
            this.endWork();
            this.sendResponse(true);
        } else {
            // TODO: Calculate direction: Modular comparison, find shorter direction
            if (angle.getDegrees() < this.targetAngle.getDegrees()) {
                this.commandComponent.commandEvents.emit(WHEEL_EVENT.Left);
            } else {
                this.commandComponent.commandEvents.emit(WHEEL_EVENT.Right);
            }
        }
    }

    private isExpected(angle: Angle) {
        return angle.getDegrees() >= this.targetAngle.getDegrees() - this.tolerance.getDegrees()
            && angle.getDegrees() <= this.targetAngle.getDegrees() + this.tolerance.getDegrees();
    }

    private onTimeout() {
        this.logger.warn("onTimeout");
        this.endWork();
        this.sendResponse(false);
    }

    private endWork() {
        this.logger.debug("endWork");
        // Stop all
        this.logger.trace("Clear timeout id = " + this.timeoutID);
        clearTimeout(this.timeoutID);
        this.unsubscribeGyroscope();
        this.commandComponent.commandEvents.emit(GYROSCOPE_EVENT.GyroscopeAutoInterval, 0);
        this.commandComponent.commandEvents.emit(WHEEL_EVENT.Stop);

        // Clear variables:
        this.state = ORIENTATION_STATE.Idle;
        this.commandComponent.unlock();
    }

    private sendResponse(success: boolean) {
        this.logger.debug("sendResponse: " + (success ? "SUCCESS" : "FAILURE") + ", actualAngle=" + this.actualAngle);
        // Send response:
        var orientationResponse: OrientationResponse = new OrientationResponse(success, this.actualAngle);
        this.commandComponent.commandEvents.emit(OrientationResponse.name, orientationResponse);
    }

    private subscribeGyroscope() {
        this.logger.trace("subscribeGyroscope");
        this.commandComponent.commandEvents.addListener(GYROSCOPE_EVENT.GyroscopeValue, this.onGyroscopeValue);
    }

    private unsubscribeGyroscope() {
        this.logger.trace("unsubscribeGyroscope");
        this.commandComponent.commandEvents.removeListener(GYROSCOPE_EVENT.GyroscopeValue, this.onGyroscopeValue);
    }

}

