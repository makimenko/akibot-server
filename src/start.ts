import * as app from "./app";
import { GyroscopeAutoIntervalCommand, DistanceAutoIntervalCommand } from "akibot-common/dist";

app.webSocketServerComponent.start();

app.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(3000));
app.commandComponent.emitMessage(new DistanceAutoIntervalCommand(2000));
