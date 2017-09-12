import { EventEmitter } from "events";
import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import { Angle, AngleUtils, GyroscopeAutoIntervalCommand, GyroscopeValueResponse, Element, AutoIntervalCommand, ValueResponse } from "akibot-common/dist";
import { CallableDevice } from "../device";


export abstract class AbstractIntervalComponent<T extends Element, C extends AutoIntervalCommand> {

    private intervalID: NodeJS.Timer;
    protected logger = logFactory.getLogger(this.constructor.name);

    constructor(protected commandComponent: CommandComponent, protected device: CallableDevice<T>, protected template: C) {
        this.logger.debug("constructor");
        this.onAutoIntervalCommand = this.onAutoIntervalCommand.bind(this);
        this.commandComponent.commandEvents.addListener(template.$name, (autoIntervalCommand: C) => {
            this.onAutoIntervalCommand(autoIntervalCommand);
        });
    }

    private onAutoIntervalCommand(autoIntervalCommand: AutoIntervalCommand) {
        if (autoIntervalCommand == undefined || autoIntervalCommand.interval == undefined) {
            throw new Error("Mandatory attributes are undefined");
        }
        this.logger.debug("onAutoIntervalCommand: autoInterval=" + autoIntervalCommand.interval + "ms");
        if (autoIntervalCommand.interval > 0) {
            if (this.intervalID != undefined) {
                clearInterval(this.intervalID);
            }
            this.intervalID = setInterval(() => { this.retrieveAndEmitValue() }, autoIntervalCommand.interval);
            this.retrieveAndEmitValue();
        } else {
            this.logger.trace("Clear interval with ID = " + this.intervalID);
            clearInterval(this.intervalID);
        }
    }

    private retrieveAndEmitValue() {
        this.logger.trace("retrieveAndEmitValue");
        var value: T = this.device.getValue();
        var valueResponse: ValueResponse = this.createValueResponse(value);
        this.commandComponent.emitMessage(valueResponse);
    }

    abstract createValueResponse(value: T): ValueResponse;

}