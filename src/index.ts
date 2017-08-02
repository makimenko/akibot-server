import { AkiBotServer, AkiBotServerConfiguration } from "./server/core/akibot-server";
import { AkiBotServerEventsImpl } from "./server/events/akibot-server-events.impl";


const config : AkiBotServerConfiguration = {
    port: Number(process.env.PORT || 3000),
    serverEvents: new AkiBotServerEventsImpl()
}
export const akiBotServer = new AkiBotServer(config);

akiBotServer.start();

 
 