import { MessageHandler } from "./message-handler";
import { HelloMessage } from "./message.dom";

export class HelloMessageHandler extends MessageHandler<HelloMessage> {
    handle(message: HelloMessage): void {
        console.log("Hey, Hello message retrieved!");
    }

}