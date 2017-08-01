console.log("Starting...");

import { MessageRawData, Message } from "./server/core/message.dom";
import { MessageHandler } from "./server/core/message-handler";
import { HelloMessageHandler } from "./server/handlers/hello-message-handler";
import { MessageHandlerRegistry } from "./server/handlers/message-handler-registry";

var registry: MessageHandlerRegistry = new MessageHandlerRegistry();
registry.register(new HelloMessageHandler());

var msg: MessageRawData = JSON.parse('{"msgType":"HelloMessage", "msgBody":{"myName":"Michael"} }');
console.log(msg);

if (msg.msgType != undefined) {
    console.log("It is Message");
    registry.find(msg.msgType).handle(msg.msgBody);
} else {
    console.log("It is not message");
}
