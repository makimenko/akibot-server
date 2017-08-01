
import * as WebSocket from 'ws';
import { Message } from "./message.dom";

export interface MessageHandler {

    handle(message: Message): void;

}