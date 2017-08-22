import { Device } from "../Device";
import { Distance } from "akibot-common/dist";

export interface CallableDistanceSensor extends Device {

    getDistance(): Distance;

}
