import * as app from "./app";
import { GyroscopeAutoIntervalCommand } from "akibot-common/dist";

app.webSocketServerComponent.start();

app.commandComponent.emitMessage(new GyroscopeAutoIntervalCommand(3000));