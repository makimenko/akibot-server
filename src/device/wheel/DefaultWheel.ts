import * as common from "akibot-common/dist";
import { Logger, logFactory } from "../../log-config";
import { Wheel } from "..";
import { L239DPair } from "akibot-device";
import * as nconf from "nconf";

export enum WHEEL_LOCATION {
    left,
    right
};

export class DefaultWheel {

    private logger: Logger;

    private motorDevice: L239DPair;

    public constructor(private wheelLocation: WHEEL_LOCATION) {
        this.logger = logFactory.getLogger(this.constructor.name + ":" + WHEEL_LOCATION[wheelLocation]);
        this.logger.debug("constructor");

        // Configuring:
        var pinEN = nconf.get("wheel:" + WHEEL_LOCATION[wheelLocation] + ":pinEN");
        var pinFirstA = nconf.get("wheel:" + WHEEL_LOCATION[wheelLocation] + ":pinFirstA");
        var pinSecondA = nconf.get("wheel:" + WHEEL_LOCATION[wheelLocation] + ":pinSecondA");

        this.logger.debug("Initializing L239DPair motor controller with configuration (wheelLocation=" + WHEEL_LOCATION[wheelLocation] + ", pinEN=" + pinEN + ", pinFirstA=" + pinFirstA + ", pinSecondA=" + pinSecondA + ")");
        this.motorDevice = new L239DPair(pinEN, pinFirstA, pinSecondA);
        this.stop();
    }

    public stop() {
        this.logger.trace("stop");
        this.motorDevice.stop();
    }

    public forward(pctSpeed: number) {
        if (this.wheelLocation == WHEEL_LOCATION.right) {
            this.logger.trace("clockwise(" + pctSpeed + ")");
            this.motorDevice.clockwise(pctSpeed);
        } else {
            this.logger.trace("counterClockwise(" + pctSpeed + ")");
            this.motorDevice.counterClockwise(pctSpeed);
        }
    }

    public backward(pctSpeed: number) {
        if (this.wheelLocation == WHEEL_LOCATION.right) {
            this.logger.trace("counterClockwise(" + pctSpeed + ")");
            this.motorDevice.counterClockwise(pctSpeed);
        } else {
            this.logger.trace("clockwise(" + pctSpeed + ")");
            this.motorDevice.clockwise(pctSpeed);
        }
    }

}