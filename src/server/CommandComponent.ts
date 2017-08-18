import { EventEmitter } from "events";
import { logFactory } from "../log-config";
import * as common from "../common";

export class CommandComponent {

    public commandEvents: EventEmitter;
    private logger = logFactory.getLogger(this.constructor.name);
    private exclusiveCommandLock: boolean = false;

    constructor() {
        this.logger.debug("constructor");
        this.commandEvents = new EventEmitter();
    }

    public emitMessage(message: common.Message) {
        this.logger.trace("emitMessage:" + common.SerializationUtils.jsonStringify(message));
        this.commandEvents.emit(message.$name, message);
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