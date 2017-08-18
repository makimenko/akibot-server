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
        var jsonInput = common.SerializationUtils.jsonParse(data.toString());
        var message: Message = common.SerializationUtils.deserialize(jsonInput, common);
        this.commandComponent.commandEvents.once(common.OrientationResponse.name, (orientationResponse: common.OrientationResponse) => {
            this.broadcast(orientationResponse);
        });
        this.commandComponent.emitMessage(message);
    }

    public broadcast(message: Message) {
        var msgText: string = common.SerializationUtils.jsonStringify(message);
        this.logger.trace("Broadcasting to " + this.clients.length + " clients: " + msgText);
        var idx = 0;
        this.clients.forEach((i) => {
            idx++;
            this.logger.trace("Send to client " + idx + ": " + msgText);
            try {
                i.send(msgText);
            } catch (e) {
                this.logger.warn("Unable to send message: " + e);
                // TODO: do something with such client
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


    public stop():void {
        this.logger.debug("Stopping WSS..");        
        this.wss.close();
        this.httpServer.close();
    }


}

