console.log("Starting...");

import { MessageRawData, HelloMessage, Message} from "./server/impl/message.dom";
import { HelloMessageHandler } from "./server/impl/hello-message-handler";

var msg: MessageRawData = JSON.parse('{"msgType":"xxx", "msgBody":{"myName":"Michael"} }');
console.log(msg);

if (msg.msgType != undefined) {
    console.log("It is Message");
    var h: HelloMessageHandler = new HelloMessageHandler();
    var message: Message = msg.msgBody;
    h.handle(message);
} else {
    console.log("It is not message");
}

