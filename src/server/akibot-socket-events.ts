import * as WebSocket from 'ws';


export class AkiBotSocketEvents {

    constructor() {
        console.log("AkiBotSocketEvents.constructor");
    }

    public onMessage(data: WebSocket.Data) {
        console.log("AkiBotSocketEvents.onMessage:");
        console.log(data);
    }

}