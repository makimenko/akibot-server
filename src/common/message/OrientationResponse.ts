
import { Message } from "./Message";
import { Angle } from "../index";

export class OrientationResponse extends Message {
    constructor(public success?: boolean,  public finalAngle?: Angle) {
        super();
    }

}