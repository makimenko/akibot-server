import { Message } from "./message.dom";
import * as WebSocket from 'ws';
import { MessageHandler } from "./message-handler";
import { AkiBotSocketEvents } from "./akibot-socket-events";
import { AkiBotServerEvents } from "./akibot-server-events";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractMessageHandler<T extends Message> implements MessageHandler {
    

    abstract handle(message: T): void;

    abstract convert(jsonString: string): T;

    public getMsgType() {
        //TODO: fix later
        return this.constructor.name.replace("Handler", "");
    }

}