console.log("Starting...");

import { MessageRawData, Message } from "./server/core/message.dom";
import { MessageHandler } from "./server/core/message-handler";
import { HelloMessageHandler } from "./server/handlers/hello-message-handler";

var msg: MessageRawData = JSON.parse('{"msgType":"xxx", "msgBody":{"myName":"Michael"} }');
console.log(msg);

if (msg.msgType != undefined) {
    console.log("It is Message");

    // TODO: Find handler in registry
    var h: MessageHandler = new HelloMessageHandler();
    h.handle(msg.msgBody);
} else {
    console.log("It is not message");
}
