import { MessageHandler } from "../core/message-handler";
import { AbstractMessageHandler } from "../core/abstract-message-handler";
import { Message } from "../core/message.dom";
import * as WebSocket from 'ws';

export class HelloMessage extends Message {
    myName: string;
}

export class HelloMessageReply extends Message {
    message: string;
}

export class HelloMessageHandler extends AbstractMessageHandler<HelloMessage> {

    convert(jsonString: string): HelloMessage {
        return JSON.parse(jsonString);
    }

    handle(message: HelloMessage): void {
        var demoReply: HelloMessageReply = new HelloMessageReply();
        demoReply.message = "Server working with " + message.myName;
        this.serverEvents.broadcast(demoReply);
    }



}