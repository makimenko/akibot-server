import { AkiBotServer } from "./server/core/akibot-server";
import { AkiBotServerEventsImpl } from "./server/events/akibot-server-events.impl";

const port: number = Number(process.env.PORT || 3000);
const akiBotServer = new AkiBotServer(port, new AkiBotServerEventsImpl());

akiBotServer.start();

