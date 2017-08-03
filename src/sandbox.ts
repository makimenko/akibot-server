import "reflect-metadata";

import { AkiBotServer } from "./server/core/akibot-server";
import { AkiBotServerEventsImpl } from "./server/events/akibot-server-events.impl";
import * as WebSocket from 'ws';
import { HelloMessageHandler, HelloMessage } from "./server/handlers/hello-message-handler";

import SERVICE_IDENTIFIER from "./server/constants/identifiers";
import container from "./server/config/ioc-config";



let akiBotServer = container.get<AkiBotServer>(SERVICE_IDENTIFIER.AkiBotServer);


akiBotServer.start().then(() => runSandbox());

function runSandbox() {
    console.log("====================== ");
    console.log("runSandbox()");

    var socket = new WebSocket('ws://localhost:3000');
    socket.on("open", () => onOpenConnection(socket));
    socket.on("message", (data: WebSocket.Data) => onMessage(data));


}

function onOpenConnection(socket: WebSocket) {
    socket.send(JSON.stringify({ "msgType": "HelloMessage", "myName": "Michael" }));
}

function onMessage(data: WebSocket.Data) {
    console.log("Client Received message:");
    console.log(data);
}
