import { EventEmitter } from "events";
import { factory } from "./log-config";

export class CommandComponent {
    
    public commandEvents: EventEmitter;
    private logger = factory.getLogger(this.constructor.name);

    constructor() {
        this.logger.info("CommandComponent.constructor");
        this.commandEvents = new EventEmitter ();
    }
    
}