import "reflect-metadata";

import SERVICE_IDENTIFIER from "../constants/identifiers";

import { Container } from "inversify";
import { MessageHandlerRegistryImpl } from "../handlers/message-handler-registry-impl";
import { MessageHandlerRegistry } from "../handlers/message-handler-registry";
import { HelloMessageHandler } from "../handlers/hello-message-handler";
import { MessageHandler } from "../core/message-handler";

console.log("Containers bind - START")

let container = new Container();
container.bind<MessageHandlerRegistry>(SERVICE_IDENTIFIER.MessageHandlerRegistry).to(MessageHandlerRegistryImpl);



console.log("Containers bind - END")
export default container;