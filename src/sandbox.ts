import { AkiBotServer, AkiBotServerConfiguration } from "./server/core/akibot-server";
import { AkiBotServerEventsImpl } from "./server/events/akibot-server-events.impl";
import * as WebSocket from 'ws';
import { HelloMessageHandler, HelloMessage } from "./server/handlers/hello-message-handler";

//var x:HelloMessageHandler = new HelloMessageHandler<>();


const config: AkiBotServerConfiguration = {
    port: Number(process.env.PORT || 3000),
    serverEvents: new AkiBotServerEventsImpl()
}
export const akiBotServer = new AkiBotServer(config);

akiBotServer.start().then(() => runSandbox());

function runSandbox() {
    console.log("Sandboxing...");
    akiBotServer.start().then(() => {
        var socket = new WebSocket('ws://localhost:3000');
        socket.on("open", () => onOpenConnection(socket));
        socket.on("message", (data: WebSocket.Data) => onMessage(data));
    });
}

function onOpenConnection(socket: WebSocket) {
    socket.send(JSON.stringify({ "msgType": "HelloMessage", "myName": "Michael" }));
}

function onMessage(data: WebSocket.Data) {
    console.log("Client Received message:");
    console.log(data);
}
