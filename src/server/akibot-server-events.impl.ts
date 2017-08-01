import * as http from 'http';
import { AkiBotServerEvents } from "./akibot-server-events";
import * as WebSocket from 'ws';

export class AkiBotServerEventsImpl implements AkiBotServerEvents {

    constructor() {
        console.log("AkiBotServerEventsImpl.init");
    }

    public onConnection(client: WebSocket, request: http.IncomingMessage): void {
        console.log("AkiBotServerEventsImpl.onConnection");
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