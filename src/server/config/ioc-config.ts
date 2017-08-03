import "reflect-metadata";

import SERVICE_IDENTIFIER from "../constants/identifiers";

import { Container, injectable } from "inversify";
import { MessageHandlerRegistryImpl } from "../handlers/message-handler-registry-impl";
import { MessageHandlerRegistry } from "../handlers/message-handler-registry";
import { HelloMessageHandler } from "../handlers/hello-message-handler";
import { MessageHandler } from "../core/message-handler";
import { AkiBotServerEventsImpl } from "../events/akibot-server-events.impl";
import { AkiBotServerEvents } from "../core/akibot-server-events";
import { AkiBotServer } from "../core/akibot-server";
import { AkiBotServerImpl } from "../core/akibot-server.impl";
import { AkiBotSocketEvents } from "../core/akibot-socket-events";
import { AkiBotSocketEventsImpl } from "../events/akibot-socket-events.impl";

console.log("Containers bind - START");

let container = new Container();
container.bind<MessageHandlerRegistry>(SERVICE_IDENTIFIER.MessageHandlerRegistry).to(MessageHandlerRegistryImpl);
container.bind<AkiBotServerEvents>(SERVICE_IDENTIFIER.AkiBotServerEvents).to(AkiBotServerEventsImpl);
container.bind<AkiBotSocketEvents>(SERVICE_IDENTIFIER.AkiBotSocketEvents).to(AkiBotSocketEventsImpl);
container.bind<AkiBotServer>(SERVICE_IDENTIFIER.AkiBotServer).to(AkiBotServerImpl);




console.log("Containers bind - END")
export default container;