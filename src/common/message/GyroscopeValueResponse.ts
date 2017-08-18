import { Message, Angle } from "..";

export class GyroscopeValueResponse extends Message {

    constructor(public angle?: Angle) {
        super();
    }

}