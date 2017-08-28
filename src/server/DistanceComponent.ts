import { EventEmitter } from "events";
import { CommandComponent } from ".";
import { logFactory } from "../log-config";
import * as common from "akibot-common/dist";
import { Gyroscope } from "../device/gyroscope/Gyroscope";
import { AbstractIntervalComponent } from "./AbstractIntervalComponent";


export class DistanceComponent extends AbstractIntervalComponent<common.Distance, common.DistanceAutoIntervalCommand> {

    public createValueResponse(value: common.Distance): common.DistanceValueResponse {
        this.logger.trace("createValueResponse")
        var response: common.DistanceValueResponse = new common.DistanceValueResponse(value);
        return response;
    }

}
