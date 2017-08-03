import { Message } from "./message.dom";
import * as WebSocket from 'ws';
import { MessageHandler } from "./message-handler";
import { AkiBotSocketEvents } from "./akibot-socket-events";
import { AkiBotServerEvents } from "./akibot-server-events";
import { inject, injectable, named } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";


@injectable()
export abstract class AbstractMessageHandler<T extends Message> implements MessageHandler {
    
    @inject(SERVICE_IDENTIFIER.AkiBotServerEvents)
    protected serverEvents: AkiBotServerEvents;

    constructor() { }

    abstract handle(message: T): void;

    abstract convert(jsonString: string): T;

    public getMsgType() {
        //TODO: fix later
        return this.constructor.name.replace("Handler", "");
    }

}