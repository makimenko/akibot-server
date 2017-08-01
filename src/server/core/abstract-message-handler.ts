import { Message } from "./message.dom";
import * as WebSocket from 'ws';
import { MessageHandler } from "./message-handler";


export abstract class AbstractMessageHandler implements MessageHandler {

    constructor() {
        console.log("constructor: " + this.constructor.name);
    }

    abstract handle(message: Message): void;

}