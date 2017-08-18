import { Message, Angle} from "..";

export class OrientationResponse extends Message {
    constructor(public success?: boolean,  public finalAngle?: Angle) {
        super();
    }

}