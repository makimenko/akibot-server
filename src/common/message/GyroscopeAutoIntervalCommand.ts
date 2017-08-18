import { Message } from "..";

export class GyroscopeAutoIntervalCommand extends Message {

    constructor(public interval?: number) {
        super();
    }
    

}