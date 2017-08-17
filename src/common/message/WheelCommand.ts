import { Message } from "../index";

export class WheelCommand extends Message {

    // TODO: make enum, validate serialization
    constructor(public direction?: string) {
        super();

    }

}