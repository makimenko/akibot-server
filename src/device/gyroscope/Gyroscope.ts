import { Angle } from "akibot-common/dist";
import { Device } from "../Device";

export interface Gyroscope extends Device {

    getNorthAngle(): Angle;

}
