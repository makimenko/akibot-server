import "reflect-metadata";

import * as WebSocket from 'ws';
import { AkiBotSocketEvents } from "../core/akibot-socket-events";
import { Message } from "../core/message.dom";
import { MessageHandler } from "../core/message-handler";
import { HelloMessageHandler, HelloMessageReply } from "../handlers/hello-message-handler";
import { MessageHandlerRegistry } from "../handlers/message-handler-registry";
import { AkiBotServerEvents } from "../core/akibot-server-events";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";

@injectable()
export class AkiBotSocketEventsImpl implements AkiBotSocketEvents {

    @inject(SERVICE_IDENTIFIER.MessageHandlerRegistry)
    private registry: MessageHandlerRegistry;

    constructor(private serverEvents: AkiBotServerEvents) {
        console.log("AkiBotSocketEventsImpl.constructor");
    }

    public onMessage(data: WebSocket.Data) {
        console.log("AkiBotSocketEventsImpl.onMessage:");
        console.debug(data);
        var msg: Message = JSON.parse(data.toString());
        console.log(msg);
        if (msg.msgType != undefined) {
            var handler = this.registry.find(msg.msgType);
            var finalMessage: Message = handler.convert(data.toString());
            handler.handle(finalMessage);
        } else {
            console.error("AkiBotSocketEventsImpl.onMessage: Unknown message type");
        }
    }



}