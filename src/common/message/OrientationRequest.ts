import { Message } from "./Message";
import { Angle } from "../index";

export class OrientationRequest extends Message {


    constructor(public targetAngle?: Angle, public tolerance?: Angle, public timeout?: number) {
        super();
    }

    
}