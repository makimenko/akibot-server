import * as WebSocket from 'ws';
import { AkiBotSocketEvents } from "../core/akibot-socket-events";
import { MessageRawData } from "../core/message.dom";
import { MessageHandler } from "../core/message-handler";
import { HelloMessageHandler } from "../handlers/hello-message-handler";
import { MessageHandlerRegistry } from "../handlers/message-handler-registry";

export class AkiBotSocketEventsImpl implements AkiBotSocketEvents {

    private registry: MessageHandlerRegistry;

    constructor(private webSocket: WebSocket) {
        console.log("AkiBotSocketEventsImpl.constructor");
        this.registry = new MessageHandlerRegistry();
        // TODO: auto class scan:
        this.registry.register(new HelloMessageHandler());
    }

    /* 
    SIMULATION:
    var socket = new WebSocket('ws://localhost:3000');
    socket.send(JSON.stringify({"msgType":"HelloMessage", "msgBody":{"myName":"Michael"} }));
    */
    public onMessage(data: WebSocket.Data) {
        console.log("AkiBotSocketEventsImpl.onMessage:");
        console.debug(data);
        var msg: MessageRawData = JSON.parse(data.toString());
        if (msg.msgType != undefined) {
            this.registry.find(msg.msgType)
                .handle(msg.msgBody);
        } else {
            console.error("AkiBotSocketEventsImpl.onMessage: Unknown message type");
        }
    }

    public reply(data: WebSocket.Data) {
        console.log("AkiBotSocketEventsImpl.reply")
        this.webSocket.send(data);
    }

}