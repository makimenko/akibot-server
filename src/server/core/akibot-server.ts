import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AkiBotServerEvents } from "./akibot-server-events";

export interface AkiBotServerConfiguration {
    port : number,
    serverEvents: AkiBotServerEvents
}

export class AkiBotServer {

    private expressApplication: express.Application;
    private httpServer: http.Server;
    private wss: WebSocket.Server;

    constructor(private config: AkiBotServerConfiguration) {
        this.expressApplication = express();
    }

    private startHttpServer() {
        console.log("Starting HTTP server...");
        this.httpServer = http.createServer(this.expressApplication);
    }

    private startWebSocketServer() {
        console.log("Starting WebSocket server...");
        this.wss = new WebSocket.Server({ server: this.httpServer });
    }

    private initWebSocketEvents() {
        console.log("Initialize WebSocket events...");
        this.wss.on("connection", (client: WebSocket, request: http.IncomingMessage) => this.config.serverEvents.onConnection(client, request));
        this.wss.on("listening", () => this.config.serverEvents.onListening());
        this.wss.on("error", (err: Error) => this.config.serverEvents.onError(err));
        this.wss.on("headers", (headers: string[], request: http.IncomingMessage) => this.config.serverEvents.onHeaders(headers, request));
    }

    private startListen() {
        console.log("Start listening...")
        this.httpServer.listen(this.config.port, () => {
            console.log(`Server is listening on port ${this.httpServer.address().port}`);
        });
    }

    public start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.startHttpServer();
            this.startWebSocketServer();
            this.initWebSocketEvents();
            this.startListen();
            return resolve();
        });
    }

    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            console.log("stop");
            return resolve(true);
        });
    }

}
