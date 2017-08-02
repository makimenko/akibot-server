import { MessageHandler } from "../core/message-handler";
import { AbstractMessageHandler } from "../core/abstract-message-handler";
import { Message } from "../core/message.dom";
import * as WebSocket from 'ws';

export class HelloMessage implements Message {
    myName: string;
}

export class HelloMessageReply implements Message {
    message: string;
}

export class HelloMessageHandler extends AbstractMessageHandler<HelloMessage> {

    convert(jsonString: string): HelloMessage {
        return new HelloMessage();
    }

    handle(message: HelloMessage): void {
        var demoReply: HelloMessageReply = new HelloMessageReply();
        demoReply.message = "Server working with " + message.myName;
        this.clientEvents.broadcast(demoReply);
    }



}