import "reflect-metadata";

import { MessageHandler } from "../core/message-handler";
import { AbstractMessageHandler } from "../core/abstract-message-handler";
import { Message } from "../core/message.dom";
import * as WebSocket from 'ws';
import { inject, injectable, named } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { AkiBotServerEvents } from "../core/akibot-server-events";


export class HelloMessage extends Message {
    myName: string;
}

export class HelloMessageReply extends Message {
    message: string;
}

@injectable()
export class HelloMessageHandler extends AbstractMessageHandler<HelloMessage> {


    constructor() {
        super();
        console.log("HelloMessageHandler.constructor");
    }

    convert(jsonString: string): HelloMessage {
        return JSON.parse(jsonString);
    }

    handle(message: HelloMessage): void {
        console.log("HelloMessageHandler.handle");
        var demoReply: HelloMessageReply = new HelloMessageReply();
        demoReply.message = "Server working with " + message.myName;
        //TODO: Broadcast
    }

}