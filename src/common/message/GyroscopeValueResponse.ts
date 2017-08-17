import { Message, Angle } from "../index";

export class GyroscopeValueResponse extends Message {

    constructor(public angle?: Angle) {
        super();
    }

}