import { Message } from "./message.dom";

export abstract class MessageHandler<T extends Message> {

    abstract handle(messageBody: T): void;

}