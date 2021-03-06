import * as app from "./app";
import * as common from "akibot-common/dist";
import * as nconf from "nconf";

app.webSocketServerComponent.start();

app.relay.enableGyroscope();
var gyroscopeAutoInterval: number = Number(nconf.get("startup:gyroscopeAutoInterval"));
if (Number.isSafeInteger(gyroscopeAutoInterval)) {
    app.commandComponent.emitMessage(new common.GyroscopeAutoIntervalCommand(gyroscopeAutoInterval));
}

var distanceAutoInterval: number = Number(nconf.get("startup:distanceAutoInterval"));
if (Number.isSafeInteger(distanceAutoInterval)) {
    app.commandComponent.emitMessage(new common.DistanceAutoIntervalCommand(distanceAutoInterval));
}

/*
var forward = new common.WheelSetCommand(common.WHEEL_SET_DIRECTION.Forward);
var backward = new common.WheelSetCommand(common.WHEEL_SET_DIRECTION.Backward);
var stop = new common.WheelSetCommand(common.WHEEL_SET_DIRECTION.Stop);

setTimeout(() => {
    app.commandComponent.emitMessage(forward);
    setTimeout(()=> {
        app.commandComponent.emitMessage(backward);
        setTimeout(() => {
            app.commandComponent.emitMessage(stop);
        }, 2000)
    },2000)

}, 2000);
*/