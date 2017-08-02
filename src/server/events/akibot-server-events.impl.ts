import * as http from 'http';
import { AkiBotServerEvents } from "../core/akibot-server-events";
import * as WebSocket from 'ws';
import { AkiBotSocketEvents } from "../core/akibot-socket-events";
import { AkiBotSocketEventsImpl } from "./akibot-socket-events.impl";
import { Message } from "../core/message.dom";
import { AkiBotServer } from "../core/akibot-server";

export class AkiBotServerEventsImpl implements AkiBotServerEvents {
    private server: AkiBotServer;

    private clients: WebSocket[] = [];

    constructor() {
        console.log("AkiBotServerEventsImpl.constructor");
    }

    public init(server: AkiBotServer) {
        //replace to dependency injection
        this.server = server;
    }

    public onConnection(client: WebSocket, request: http.IncomingMessage): void {
        console.log("AkiBotServerEventsImpl.onConnection");
        // TODO: inject
        var events: AkiBotSocketEvents = new AkiBotSocketEventsImpl(this);
        client.on("message", (data: WebSocket.Data) => events.onMessage(data));
        this.clients.push(client);
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

    public broadcast(message: Message) {
        console.log("AkiBotServerEventsImpl.broadcast")
        //TODO: send to all
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            } 
        })
    }


}