import { Vector3D } from "akibot-common/dist";
import { Device } from "../Device";

export interface Gyroscope extends Device {

    getGyroscopeValue(): Vector3D;

}
