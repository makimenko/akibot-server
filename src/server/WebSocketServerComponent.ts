import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { logFactory, Logger } from "../log-config";
import { Message } from "../common/message/Message";
import { OrientationRequest } from "../common/message/OrientationRequest";
import { CommandComponent } from "./index";
import { OrientationResponse } from "../common/index";

export class WebSocketServerComponent {

    private logger: Logger = logFactory.getLogger(this.constructor.name);

    // TODO: parameter
    private port: number = 3000;

    private expressApplication: express.Application;
    private httpServer: http.Server;
    private wss: WebSocket.Server;
    private clients: WebSocket[] = [];

    constructor(private commandComponent: CommandComponent) {
        this.logger.debug("constructor");
        this.expressApplication = express();
    }

    private onMessage(client: WebSocket, data: WebSocket.Data) {
        this.logger.trace("onMessage: " + data.toString());

        var msg: Message = JSON.parse(data.toString());
        console.log("Message type received: " + msg.msgType);

        if (msg.msgType == "OrientationRequest") {
            var orientationRequest: OrientationRequest = JSON.parse(data.toString());
            console.log("OrientationRequest received: " + orientationRequest);
            console.log(orientationRequest.targetAngle);
            console.log(orientationRequest.tolerance);
            console.log(orientationRequest.timeout);
            this.commandComponent.commandEvents.once(OrientationResponse.name, (orientationResponse: OrientationResponse) => {
                this.broadcast((orientationResponse.success ? "SUCCESS" : "FAILED") + ": Final angle is: " + orientationResponse.finalAngle);
            });
            //TODO: message handler registry / handlers and parsers
            this.commandComponent.commandEvents.emit(orientationRequest.msgType, orientationRequest);
        }
    }


    public broadcast(msg: string) {
        this.logger.trace("Broadcasting: " + msg);
        var idx = 0;
        this.clients.forEach((i) => {
            idx++;
            this.logger.trace("Send to client " + idx + ": " + msg);
            try {
                i.send(msg);
            } catch (e) {
                this.logger.warn("Unable to send message: " + e);
                //this.clients = this.clients.filter(item => item !== i);
            }
        });
    }

    public start(): Promise<void> {
        this.logger.debug("Starting WSS..");
        return new Promise<void>((resolve, reject) => {
            this.httpServer = http.createServer(this.expressApplication);
            this.wss = new WebSocket.Server({ server: this.httpServer });

            this.wss.on("connection", (client: WebSocket, request: http.IncomingMessage) => {
                client.on("message", (data: WebSocket.Data) => this.onMessage(client, data));
                this.clients.push(client);
            });

            this.httpServer.listen(this.port, () => {
                this.logger.info(`Server is listening on port ${this.httpServer.address().port}`);
            });

            return resolve();
        });
    }

}

