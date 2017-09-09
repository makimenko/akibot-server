import { CommandComponent } from ".";
import { logFactory, Logger } from "../log-config";
import * as common from "akibot-common/dist";

export enum ORIENTATION_STATE {
    Idle,
    Busy
};

export class OrientationComponent {

    private logger: Logger = logFactory.getLogger(this.constructor.name);

    private state: ORIENTATION_STATE;
    private targetAngle: common.Angle;
    private tolerance: common.Angle;
    private actualAngle?: common.Angle;

    private gyroscopeAutoInterval: number = 1000;
    private timeoutID: any;

    constructor(public commandComponent: CommandComponent) {
        this.logger.debug("constructor");
        this.state = ORIENTATION_STATE.Idle;

        // bind a class context to the event listener:
        this.onGyroscopeValueResponse = this.onGyroscopeValueResponse.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
        this.onOrientationRequest = this.onOrientationRequest.bind(this);

        this.commandComponent.commandEvents.addListener(common.OrientationRequest.name, this.onOrientationRequest);
    }

    private onOrientationRequest(orientationRequest: common.OrientationRequest) {
        this.logger.debug("onOrientationRequest: " + JSON.stringify(orientationRequest));
        if (orientationRequest == undefined || orientationRequest.targetAngle == undefined || orientationRequest.tolerance == undefined) {
            throw new Error("Undefined mandatory parameters of OrientationRequest");
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
            this.commandComponent.emitMessage(new common.GyroscopeAutoIntervalCommand(this.gyroscopeAutoInterval));
        }
    }

    private onGyroscopeValueResponse(gyroscopeValueResponse: common.GyroscopeValueResponse) {
        this.logger.trace("onGyroscopeValue: " + gyroscopeValueResponse.angle);
        this.actualAngle = gyroscopeValueResponse.angle;
        if (this.actualAngle == undefined) {
            throw new Error("Actual angle could not be undefined");
        } else if (this.isExpected(this.actualAngle)) {
            this.logger.debug("Seems Orientation is finished and angle is Ok");
            this.endWork();
            this.sendResponse(true);
        } else {
            // TODO: Calculate direction: Modular comparison, find shorter direction
            if (this.actualAngle.getDegrees() < this.targetAngle.getDegrees()) {
                this.commandComponent.emitMessage(new common.WheelSetCommand(common.WHEEL_SET_DIRECTION.Left));
            } else {
                this.commandComponent.emitMessage(new common.WheelSetCommand(common.WHEEL_SET_DIRECTION.Right));
            }
        }
    }

    private isExpected(angle: common.Angle) {
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
        this.commandComponent.emitMessage(new common.GyroscopeAutoIntervalCommand(0));
        this.commandComponent.emitMessage(new common.WheelSetCommand(common.WHEEL_SET_DIRECTION.Stop));

        // Clear variables:
        this.state = ORIENTATION_STATE.Idle;
        this.commandComponent.unlock();
    }

    private sendResponse(success: boolean) {
        this.logger.debug("sendResponse: " + (success ? "SUCCESS" : "FAILURE") + ", actualAngle=" + this.actualAngle);
        // Send response:
        var orientationResponse: common.OrientationResponse = new common.OrientationResponse(success, this.actualAngle);
        this.commandComponent.emitMessage(orientationResponse);
    }

    private subscribeGyroscope() {
        this.logger.trace("subscribeGyroscope");
        this.commandComponent.commandEvents.addListener(common.GyroscopeValueResponse.name, this.onGyroscopeValueResponse);
    }

    private unsubscribeGyroscope() {
        this.logger.trace("unsubscribeGyroscope");
        this.commandComponent.commandEvents.removeListener(common.GyroscopeValueResponse.name, this.onGyroscopeValueResponse);
    }

}

