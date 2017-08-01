import { Message } from "./message.dom";
import * as WebSocket from 'ws';
import { MessageHandler } from "./message-handler";


export abstract class AbstractMessageHandler implements MessageHandler {

    constructor() {
    }

    abstract handle(message: Message): void;

    public getMsgType() {
        //TODO: fix later
        return this.constructor.name.replace("Handler", "");
    }

}