import { CommandComponent } from ".";
import { logFactory, Logger } from "../log-config";
import { OrientationRequest, Angle, OrientationResponse, AngleUtils, GyroscopeAutoIntervalCommand, GyroscopeValueResponse, WheelCommand, WHEEL_DIRECTION} from "../common";

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
        this.onGyroscopeValueResponse = this.onGyroscopeValueResponse.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
        this.onOrientationRequest = this.onOrientationRequest.bind(this);

        this.commandComponent.commandEvents.addListener(OrientationRequest.name, this.onOrientationRequest);
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
            this.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(this.gyroscopeAutoInterval));
        }
    }

    private onGyroscopeValueResponse(gyroscopeValueResponse: GyroscopeValueResponse) {
        this.logger.trace("onGyroscopeValue: " + gyroscopeValueResponse.angle);
        this.actualAngle = gyroscopeValueResponse.angle;
        if (this.actualAngle == undefined) {
            throw "Actual angle could not be undefined"
        } else if (this.isExpected(this.actualAngle)) {
            this.logger.debug("Seems Orientation is finished and angle is Ok");
            this.endWork();
            this.sendResponse(true);
        } else {
            // TODO: Calculate direction: Modular comparison, find shorter direction
            if (this.actualAngle.getDegrees() < this.targetAngle.getDegrees()) {
                this.commandComponent.emitMessage(new WheelCommand(WHEEL_DIRECTION.Left));
            } else {
                this.commandComponent.emitMessage(new WheelCommand(WHEEL_DIRECTION.Right));
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
        this.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(0));
        this.commandComponent.emitMessage(new WheelCommand(WHEEL_DIRECTION.Stop));

        // Clear variables:
        this.state = ORIENTATION_STATE.Idle;
        this.commandComponent.unlock();
    }

    private sendResponse(success: boolean) {
        this.logger.debug("sendResponse: " + (success ? "SUCCESS" : "FAILURE") + ", actualAngle=" + this.actualAngle);
        // Send response:
        var orientationResponse: OrientationResponse = new OrientationResponse(success, this.actualAngle);
        this.commandComponent.emitMessage(orientationResponse);
    }

    private subscribeGyroscope() {
        this.logger.trace("subscribeGyroscope");
        this.commandComponent.commandEvents.addListener(GyroscopeValueResponse.name, this.onGyroscopeValueResponse);
    }

    private unsubscribeGyroscope() {
        this.logger.trace("unsubscribeGyroscope");
        this.commandComponent.commandEvents.removeListener(GyroscopeValueResponse.name, this.onGyroscopeValueResponse);
    }

}

