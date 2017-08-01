import { MessageHandler } from "../core/message-handler";
import { AbstractMessageHandler } from "../core/abstract-message-handler";
import { Message } from "../core/message.dom";


export interface HelloMessage extends Message {
    myName: string;
}

export class HelloMessageHandler extends AbstractMessageHandler {

    public name: string = "HelloMessageHandler";

    handle(message: HelloMessage): void {
        console.log("Hey, Hello " + message.myName + "!");
    }

}