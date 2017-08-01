import { AkiBotServer } from "./server/akibot-server";
import { AkiBotServerEventsImpl } from "./server/impl/akibot-server-events.impl";

const port: number = Number(process.env.PORT || 3000);
const akiBotServer = new AkiBotServer(port, new AkiBotServerEventsImpl());

akiBotServer.start();
