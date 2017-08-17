import { Message } from "./Message";
import { Angle } from "../index";

export class OrientationRequest extends Message {

    public targetAngle: Angle;
    public tolerance: Angle;
    public timeout: number;

    
}