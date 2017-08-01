import * as WebSocket from 'ws';
import { AkiBotSocketEvents } from "../core/akibot-socket-events";

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