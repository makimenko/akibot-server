import { Device } from "../Device";
import { Distance } from "../../common";

export interface CallableDistanceSensor extends Device {

    getDistance(): Distance;

}
