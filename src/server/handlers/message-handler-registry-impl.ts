import { MessageHandler } from "../core/message-handler";
import { Message } from "../core/message.dom";
import { inject, injectable, named } from "inversify";
import { MessageHandlerRegistry } from "./message-handler-registry";
import SERVICE_IDENTIFIER from "../constants/identifiers";

@injectable()
export class MessageHandlerRegistryImpl implements MessageHandlerRegistry {

    private map: Map<string, MessageHandler>;

    constructor() {
        this.map = new Map<string, MessageHandler>();
    }

    public register(messageHandler: MessageHandler) {
        console.log("MessageHandlerRegistry.register: " + messageHandler.getMsgType());
        this.map.set(messageHandler.getMsgType(), messageHandler);
    }

    public find(msgType: string): MessageHandler {
        console.log("MessageHandlerRegistry.find: " + msgType);
        let messageHandler = this.map.get(msgType);
        if (messageHandler != undefined) {
            return messageHandler;
        } else {
            throw new Error("Unable to find " + msgType + " in registry");
        }
    }

}
