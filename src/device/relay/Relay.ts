import * as common from "akibot-common/dist";
import { logFactory } from "../../log-config";
import { MCP23017 } from "akibot-device";
import * as nconf from "nconf";

export class Relay {
    private expander : MCP23017;

    constructor() {
        //TODO: configurable
        this.expander = new MCP23017(100, 0x20);
    }

    public enableGyroscope() {
        this.expander.pinMode(1, 1);
        this.expander.digitalWrite(1, 1);
    }
    
}