import { Angle, Distance } from "akibot-common/dist";
import { CallableDevice } from "../CallableDevice";
import { CallableDistanceSensor } from "./CallableDistanceSensor";
import { logFactory } from "../../log-config";

export class FakeCallableDistanceSensor implements CallableDistanceSensor {

    private logger = logFactory.getLogger(this.constructor.name);

    public constructor(private multiplier: number, private offset: number, private endObstacle: boolean, private errorAngle: Angle) {
        this.logger.debug("constructor");
        this.logger.trace("multiplier=" + multiplier);
        this.logger.trace("offset=" + offset);
        this.logger.trace("endObstacle=" + endObstacle);
        this.logger.trace("errorAngle=" + errorAngle);
    }

    public getValue(): Distance {
        this.logger.trace("getValue");
        var distanceMm: number = Math.random();
        distanceMm *= this.multiplier;
        distanceMm += this.offset;

        var distance: Distance = new Distance(distanceMm, this.errorAngle, this.endObstacle);
        this.logger.trace("distanceMm=" + distance.distanceMm);
        return distance;
    }

}

