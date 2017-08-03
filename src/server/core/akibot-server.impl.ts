import "reflect-metadata";
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AkiBotServerEvents } from "./akibot-server-events";
import { AkiBotServer } from "./akibot-server";
import { inject, injectable, named } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";


@injectable()
export class AkiBotServerImpl implements AkiBotServer {

    // TODO: make as parameter
    private port: number = 3000;

    @inject(SERVICE_IDENTIFIER.AkiBotServerEvents)
    private serverEvents: AkiBotServerEvents;

    private expressApplication: express.Application;
    private httpServer: http.Server;
    private wss: WebSocket.Server;

    constructor() {
        console.log("AkiBotServerImpl.constructor");
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
        this.wss.on("connection", (client: WebSocket, request: http.IncomingMessage) => this.serverEvents.onConnection(client, request));
        this.wss.on("listening", () => this.serverEvents.onListening());
        this.wss.on("error", (err: Error) => this.serverEvents.onError(err));
        this.wss.on("headers", (headers: string[], request: http.IncomingMessage) => this.serverEvents.onHeaders(headers, request));
    }

    private startListen() {
        console.log("Start listening...")
        this.httpServer.listen(this.port, () => {
            console.log(`Server is listening on port ${this.httpServer.address().port}`);
        });
    }

    public start(): Promise<void> {
        console.log("AkiBotServerImpl.start");
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

    public getWss(): WebSocket.Server {
        return this.wss;
    }
}
