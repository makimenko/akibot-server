import * as WebSocket from 'ws';

export interface AkiBotSocketEvents {

    onMessage(data: WebSocket.Data): void;

}