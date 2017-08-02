import * as WebSocket from 'ws';
import { Message } from "./message.dom";

export interface AkiBotSocketEvents {

    onMessage(data: WebSocket.Data): void;

}