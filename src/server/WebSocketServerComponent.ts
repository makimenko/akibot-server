import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { logFactory, Logger } from "../log-config";
import { Message } from "../common/message/Message";
import { OrientationRequest } from "../common/message/OrientationRequest";
import { CommandComponent } from "./index";
import * as common from "../common";

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
        var jsonInput = JSON.parse(data.toString());
        var message: Message = common.SerializationUtils.deserialize(jsonInput, common);
        this.commandComponent.commandEvents.once(common.OrientationResponse.name, (orientationResponse: common.OrientationResponse) => {
            this.broadcast(JSON.stringify(orientationResponse));
        });
        this.commandComponent.emitMessage(message);
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

