import * as common from "akibot-common/dist";
import { logFactory } from "../../log-config";
import { CallableDevice, Gyroscope } from "..";
import { HMC5883L } from "akibot-device";

export class DefaultGyroscope implements Gyroscope {

    private logger = logFactory.getLogger(this.constructor.name);
    private offsetNorthAngle: common.Angle = common.AngleUtils.createAngleFromDegrees(0);
    private gyroscope: HMC5883L;
    private GYROSCOPE_DEFAULT_I2C_ADDRESS: number = 0x1e;

    public constructor(private offset: common.Vector3D) {
        this.logger.debug("constructor");
        this.gyroscope = new HMC5883L(this.GYROSCOPE_DEFAULT_I2C_ADDRESS);
    }

    public getValue(): common.Vector3D {
        this.logger.trace("getValue");
        var data = this.gyroscope.readMag();
        var vector3D = this.getRawValue();
        vector3D.add(this.offset);
        this.logger.trace("Final vector3D: " + vector3D.toString());
        return vector3D;
    }

    public getRawValue(): common.Vector3D {
        this.logger.trace("getRawValue");
        var data = this.gyroscope.readMag();
        var rawVector3D: common.Vector3D = new common.Vector3D(data.x, data.y, data.z);
        this.logger.trace("rawVector3D: " + rawVector3D.toString());
        return rawVector3D;
    }

}