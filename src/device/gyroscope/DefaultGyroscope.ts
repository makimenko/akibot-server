import * as common from "akibot-common/dist";
import { logFactory } from "../../log-config";
import { CallableDevice, Gyroscope } from "..";
import { HMC5883L } from "akibot-device";
import * as nconf from "nconf";

export class DefaultGyroscope implements Gyroscope {

    private logger = logFactory.getLogger(this.constructor.name);
    private offsetNorthAngle: common.Angle = common.AngleUtils.createAngleFromDegrees(0);
    private gyroscope: HMC5883L;
    private address: number;
    private offset: common.Vector3D;

    public constructor() {
        this.logger.debug("constructor");

        // Configuring gyroscope offset:
        var offsetFromConfig = nconf.get("gyroscope:offset");
        this.offset = new common.Vector3D(offsetFromConfig.x, offsetFromConfig.y, offsetFromConfig.z);

        // Configuring physical I2C.1 Address:
        this.logger.trace("Gyroscope offset: " + this.offset);
        this.address = Number(nconf.get('gyroscope:address'));
        this.logger.trace("Gyroscope address: " + this.address);

        // Create instance
        this.gyroscope = new HMC5883L(this.address);
    }

    public getValue(): common.Vector3D {
        this.logger.trace("getValue");
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