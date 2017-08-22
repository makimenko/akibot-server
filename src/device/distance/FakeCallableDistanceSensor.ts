import { CallableDistanceSensor } from "./CallableDistanceSensor";
import { Angle, Distance } from "akibot-common/dist";

export class FakeCallableDistanceSensor implements CallableDistanceSensor {

    public constructor(private multiplier: number, private offset: number, private endObstacle: boolean, private errorAngle: Angle) {
    }

    public getDistance(): Distance {
        var distanceMm: number = Math.random();
        distanceMm *= this.multiplier;
        distanceMm += this.offset;

        var distance: Distance = new Distance(distanceMm);
        distance.setEndObstacle(this.endObstacle);
        distance.setErrorAngle(this.errorAngle);

        return distance;
    }

}

