import { Device } from "./Device";
import { Element } from "akibot-common/dist";

export interface CallableDevice<T extends Element> extends Device {

    getValue(): T;

}
