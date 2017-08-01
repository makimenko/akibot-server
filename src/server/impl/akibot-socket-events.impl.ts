import * as WebSocket from 'ws';
import { AkiBotSocketEvents } from "../akibot-socket-events";
import { Message, HelloMessage } from "./message.dom";

export class AkiBotSocketEventsImpl implements AkiBotSocketEvents {

    constructor(private webSocket: WebSocket) {
        console.log("AkiBotSocketEventsImpl.constructor");
    }

    public onMessage(data: WebSocket.Data) {
        console.log("AkiBotSocketEventsImpl.onMessage:");
        console.log(data);

        this.reply("hey, server got message: " + data);
    }

    public reply(data: WebSocket.Data) {
        console.log("AkiBotSocketEventsImpl.reply")
        this.webSocket.send(data);
    }

}