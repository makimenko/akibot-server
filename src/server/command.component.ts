import { EventEmitter } from "events";

export class CommandComponent {
    
    public commandEvents: EventEmitter;

    constructor() {
        console.log("CommandComponent.constructor");
        this.commandEvents = new EventEmitter ();
    }
    
}