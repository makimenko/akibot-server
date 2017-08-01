import * as http from 'http';
import { AkiBotServerEvents } from "./akibot-server-events";
import * as WebSocket from 'ws';
import { AkiBotSocketEvents } from "./akibot-socket-events";

export class AkiBotServerEventsImpl implements AkiBotServerEvents {

    constructor() {
        console.log("AkiBotServerEventsImpl.constructor");
    }

    public onConnection(client: WebSocket, request: http.IncomingMessage): void {
        console.log("AkiBotServerEventsImpl.onConnection");
        // TODO: refactor
        var events: AkiBotSocketEvents = new AkiBotSocketEvents();
        client.on("message", (data: WebSocket.Data) => events.onMessage(data));
    }

    public onError(err: Error) {
        console.log("AkiBotServerEventsImpl.onError");
    }

    public onHeaders(headers: string[], request: http.IncomingMessage) {
        console.log("AkiBotServerEventsImpl.onHeader");
    }

    public onListening() {
        console.log("AkiBotServerEventsImpl.onListening");
    }

}