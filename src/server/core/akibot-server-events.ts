import * as http from 'http';
import * as WebSocket from 'ws';

export interface AkiBotServerEvents {

    onConnection(client: WebSocket, request: http.IncomingMessage): void;

    onError(err: Error): void;

    onHeaders(headers: string[], request: http.IncomingMessage): void;

    onListening(): void;

}