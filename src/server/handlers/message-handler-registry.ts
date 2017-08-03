import { MessageHandler } from "../core/message-handler";

export interface MessageHandlerRegistry {

    register(messageHandler: MessageHandler): void;

    find(msgType: string): MessageHandler;

}
