import { Message } from "..";

export enum WHEEL_DIRECTION {
    Stop,
    Left,
    Right,
    Forward,
    Backward
};

export class WheelCommand extends Message {

    constructor(public direction?: WHEEL_DIRECTION) {
        super();
    }

}