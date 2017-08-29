import { Vector3D, Angle, Distance } from "akibot-common/dist";
import * as common from "akibot-common/dist";
import { logFactory } from "../../log-config";
import { CallableDevice } from "../CallableDevice";
import { Gyroscope } from "./Gyroscope";


export class FakeGyroscope implements Gyroscope {

    private logger = logFactory.getLogger(this.constructor.name);
    private offsetNorthAngle: common.Angle = common.AngleUtils.createAngleFromDegrees(0);

    public constructor(private offset: Vector3D) {
        this.logger.debug("constructor");

    }

    public getValue(): Vector3D {
        this.logger.trace("getValue");
        var x: number = Math.random();
        var y: number = Math.random();
        var z: number = Math.random();
        var vector3D: Vector3D = new Vector3D(x, y, z);
        vector3D.add(this.offset);
        this.logger.trace("gyroVector=" + vector3D.toString());
        return vector3D;
    }

}
