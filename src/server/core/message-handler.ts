
import * as WebSocket from 'ws';
import { Message } from "./message.dom";

export interface MessageHandler {

    convert(jsonString: string): Message;

    handle(message: Message): void;

    getMsgType(): string;

}