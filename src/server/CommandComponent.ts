import { EventEmitter } from "events";
import { logFactory } from "../log-config";

export class CommandComponent {

    public commandEvents: EventEmitter;
    private logger = logFactory.getLogger(this.constructor.name);
    private exclusiveCommandLock: boolean = false;

    constructor() {
        this.logger.debug("constructor");
        this.commandEvents = new EventEmitter();
    }

    public lock(): boolean {
        if (this.exclusiveCommandLock) {
            return false;
        } else {
            this.exclusiveCommandLock = true;
            return true;
        }
    }

    public unlock(): void {
        this.exclusiveCommandLock = false;
    }

}