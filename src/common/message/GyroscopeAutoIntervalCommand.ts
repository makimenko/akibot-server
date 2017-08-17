import { Message } from "../index";

export class GyroscopeAutoIntervalCommand extends Message {

    constructor(public interval?: number) {
        super();
    }
    

}