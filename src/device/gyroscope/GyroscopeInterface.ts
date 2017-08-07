import { Vector3D } from "../../common/element/Vector3D";
import { DeviceInterface } from "../DeviceInterface";

export interface Gyroscope extends DeviceInterface {

    getGyroscopeValue(): Vector3D;

}
