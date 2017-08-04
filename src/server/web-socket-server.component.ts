import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

export class WebSocketServerComponent {

    // TODO: parameter
    private port: number = 3000;

    private expressApplication: express.Application;
    private httpServer: http.Server;
    private wss: WebSocket.Server;
    private clients: WebSocket[] = [];

    constructor() {
        console.log("constructor");
        this.expressApplication = express();
    }

    private onMessage(client: WebSocket, data: WebSocket.Data) {
        console.log("onMessage");
    }

    public start(): Promise<void> {
        console.log("start");
        return new Promise<void>((resolve, reject) => {
            this.httpServer = http.createServer(this.expressApplication);
            this.wss = new WebSocket.Server({ server: this.httpServer });

            this.wss.on("connection", (client: WebSocket, request: http.IncomingMessage) => {
                client.on("message", (data: WebSocket.Data) => this.onMessage(client, data));
                this.clients.push(client);
            });

            this.httpServer.listen(this.port, () => {
                console.log(`Server is listening on port ${this.httpServer.address().port}`);
            });

            return resolve();
        });
    }

}

