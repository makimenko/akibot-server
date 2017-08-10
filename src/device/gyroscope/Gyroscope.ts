import { Vector3D } from "../../common/element/Vector3D";
import { Device } from "../Device";

export interface Gyroscope extends Device {

    getGyroscopeValue(): Vector3D;

}
