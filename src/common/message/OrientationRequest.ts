import { Message, Angle } from "..";

export class OrientationRequest extends Message {

    constructor(public targetAngle?: Angle, public tolerance?: Angle, public timeout?: number) {
        super();
    }
    
}