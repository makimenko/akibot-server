import { Message } from "./message.dom";
import * as WebSocket from 'ws';
import { MessageHandler } from "./message-handler";
import { AkiBotSocketEvents } from "./akibot-socket-events";


export abstract class AbstractMessageHandler implements MessageHandler {

    constructor(protected clientEvents: AkiBotSocketEvents) {
    }

    abstract handle(message: Message): void;

    public getMsgType() {
        //TODO: fix later
        return this.constructor.name.replace("Handler", "");
    }

}