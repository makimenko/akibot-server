import { Gyroscope } from "./Gyroscope";
import { Vector3D, Angle } from "akibot-common/dist";
import * as common from "akibot-common/dist";
import { logFactory } from "../../log-config";


export class FakeGyroscope implements Gyroscope {

    private logger = logFactory.getLogger(this.constructor.name);
    private offsetNorthAngle: common.Angle = common.AngleUtils.createAngleFromDegrees(0);

    public constructor(private offset: Vector3D) {

    }

    public getNorthAngle(): Angle {
        this.logger.trace("getNorthAngle");
        var vector = this.getVector();
        vector.add(this.offset);
        var northAngle = common.VectorUtils.getNorthAngle(vector, this.offsetNorthAngle);
        this.logger.trace("northAngle=" + northAngle);
        return northAngle;
    }

    private getVector() {
        var x: number = Math.random();
        var y: number = Math.random();
        var z: number = Math.random();
        var vector3D: Vector3D = new Vector3D(x, y, z);
        vector3D.add(this.offset);
        this.logger.trace("gyroVector=" + vector3D);
        return vector3D;
    }


}
