import * as app from "./app";
import { GyroscopeAutoIntervalCommand, DistanceAutoIntervalCommand } from "akibot-common/dist";
import * as nconf from "nconf";

app.webSocketServerComponent.start();

var gyroscopeAutoInterval: number = Number(nconf.get("startup:gyroscopeAutoInterval"));
if (Number.isSafeInteger(gyroscopeAutoInterval)) {
    app.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(gyroscopeAutoInterval));
}

var distanceAutoInterval: number = Number(nconf.get("startup:distanceAutoInterval"));
if (Number.isSafeInteger(distanceAutoInterval)) {
    app.commandComponent.emitMessage(new DistanceAutoIntervalCommand(distanceAutoInterval));
}