import "reflect-metadata";

import * as WebSocket from 'ws';
import { AkiBotSocketEvents } from "../core/akibot-socket-events";
import { Message } from "../core/message.dom";
import { MessageHandler } from "../core/message-handler";
import { HelloMessageHandler, HelloMessageReply } from "../handlers/hello-message-handler";
import { MessageHandlerRegistry } from "../handlers/message-handler-registry";
import { AkiBotServerEvents } from "../core/akibot-server-events";
import { inject, injectable, multiInject } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import container from "../config/ioc-config";

@injectable()
export class AkiBotSocketEventsImpl implements AkiBotSocketEvents {

    @inject(SERVICE_IDENTIFIER.MessageHandlerRegistry)
    private registry: MessageHandlerRegistry;

    constructor( ) {
        console.log("AkiBotSocketEventsImpl.constructor");
    }

    public onMessage(data: WebSocket.Data) {
        console.log("AkiBotSocketEventsImpl.onMessage:");
        console.debug(data);
        var msg: Message = JSON.parse(data.toString());
        console.log(msg);
        if (msg.msgType != undefined) {

            console.log("List of handlers: ");
            var handler : MessageHandler = this.registry.find(msg.msgType);
            console.log(handler);

            var finalMessage: Message = handler.convert(data.toString());
            handler.handle(finalMessage);
        } else {
            console.error("AkiBotSocketEventsImpl.onMessage: Unknown message type");
        }
    }



}