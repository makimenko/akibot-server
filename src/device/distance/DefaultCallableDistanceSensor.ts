import * as common from "akibot-common/dist";
import { CallableDistanceSensor } from "./CallableDistanceSensor";
import { logFactory } from "../../log-config";
import { SRF05 } from "akibot-device";


export class DefaultCallableDistanceSensor implements CallableDistanceSensor {

    private logger = logFactory.getLogger(this.constructor.name);
    private distanceDevice: SRF05;

    //TODO: Remove
    private multiplier: number = 2000;
    private offset: number = 500;
    private errorAngle: common.Angle = common.AngleUtils.createAngleFromDegrees(10);
    private endObstacle: boolean = true;

    public constructor(private triggerPin: number, private echoPin: number) {
        this.logger.debug("constructor");
        this.distanceDevice = new SRF05(triggerPin, echoPin);
    }

    public getValue(): common.Distance {
        this.logger.trace("getValue");
        var distanceMm: number = this.distanceDevice.getDistanceMm();
        
        //TODO: remove fake modifiers
        distanceMm *= this.multiplier;
        distanceMm += this.offset;

        var distance: common.Distance = new common.Distance(distanceMm, this.errorAngle, this.endObstacle);
        this.logger.trace("distanceMm=" + distance.distanceMm);
        return distance;
    }

}

