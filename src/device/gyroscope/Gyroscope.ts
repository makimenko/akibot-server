import { CallableDevice } from "../CallableDevice";
import { Vector3D } from "akibot-common/dist";

export interface Gyroscope extends CallableDevice<Vector3D> {

    getRawValue() : Vector3D;

}