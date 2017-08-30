import { EventEmitter } from "events";
import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import * as common from "akibot-common/dist";
import { AbstractIntervalComponent } from ".";
import { CallableDevice, Gyroscope } from "../device";


export class GyroscopeComponent extends AbstractIntervalComponent<common.Vector3D, common.GyroscopeAutoIntervalCommand> {

    public offsetVector: common.Vector3D = new common.Vector3D(0, 0, 0);
    public offsetNorthAngle: common.Angle = common.AngleUtils.createAngleFromDegrees(0);

    public createValueResponse(value: common.Vector3D) {
        this.logger.trace("createValueResponse for: " + value);
        var angle = this.getNorthAngle(value);
        var response: common.GyroscopeValueResponse = new common.GyroscopeValueResponse(angle);
        return response;
    }

    public getNorthAngle(vector: common.Vector3D): common.Angle {
        this.logger.trace("getNorthAngle");
        vector.add(this.offsetVector);
        var northAngle = common.VectorUtils.getNorthAngle(vector, this.offsetNorthAngle);
        this.logger.trace("northAngle=" + northAngle);
        return northAngle;
    }

}