import { CommandComponent, AbstractIntervalComponent, GyroscopeCalibration } from ".";
import { logFactory } from "../log-config";
import * as common from "akibot-common/dist";
import { CallableDevice } from "../device";


export class GyroscopeComponent extends AbstractIntervalComponent<common.Vector3D, common.GyroscopeAutoIntervalCommand> {

    public offsetVector: common.Vector3D = new common.Vector3D(0, 0, 0);
    public offsetNorthAngle: common.Angle = common.AngleUtils.createAngleFromDegrees(0);

    constructor(commandComponent: CommandComponent, device: CallableDevice<common.Vector3D>) {
        super(commandComponent, device, new common.GyroscopeAutoIntervalCommand(0));

        this.onGyroscopeCalibrationRequest = this.onGyroscopeCalibrationRequest.bind(this);
        this.commandComponent.commandEvents.addListener(common.GyroscopeCalibrationRequest.name, (gyroscopeCalibrationRequest: common.GyroscopeCalibrationRequest) => {
            this.onGyroscopeCalibrationRequest(gyroscopeCalibrationRequest);
        });
    }

    private onGyroscopeCalibrationRequest(gyroscopeCalibrationRequest: common.GyroscopeCalibrationRequest) {
        this.logger.debug("onGyroscopeCalibrationRequest: " + JSON.stringify(gyroscopeCalibrationRequest));
        var gyroscopeCalibration: GyroscopeCalibration = new GyroscopeCalibration(this.device);

        gyroscopeCalibration
            .calibrate(gyroscopeCalibrationRequest.maxTimeMs, gyroscopeCalibrationRequest.intervalMs)
            .then((result: common.Vector3D) => {
                this.logger.trace("Calibration finished, sending result");
                var response = new common.GyroscopeCalibrationResponse(result);
                this.commandComponent.emitMessage(response);
            })
            .catch((reason: any) => {
                this.logger.error(reason);
            })
    }

    public createValueResponse(value: common.Vector3D): common.GyroscopeValueResponse {
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