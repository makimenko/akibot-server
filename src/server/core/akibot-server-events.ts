import * as http from 'http';
import * as WebSocket from 'ws';
import { Message } from "./message.dom";
import { AkiBotServer } from "./akibot-server";

export interface AkiBotServerEvents {

    init(server:AkiBotServer): void;

    onConnection(client: WebSocket, request: http.IncomingMessage): void;

    onError(err: Error): void;

    onHeaders(headers: string[], request: http.IncomingMessage): void;

    onListening(): void;

    broadcast(message: Message): void;

}