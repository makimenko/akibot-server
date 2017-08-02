import { MessageHandler } from "../core/message-handler";
import { AbstractMessageHandler } from "../core/abstract-message-handler";
import { Message } from "../core/message.dom";
import * as WebSocket from 'ws';

export interface HelloMessage extends Message {
    myName: string;
}

export class HelloMessageHandler extends AbstractMessageHandler {

    handle(message: HelloMessage): void {
        var demoReply: HelloMessage = {
            myName : "Server works with "+message.myName
        }
        this.clientEvents.broadcast(demoReply);
    }


}