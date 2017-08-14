import {Logger, LogRule, LogLevel, LogFactory} from "../node_modules/akibot-log/src";

export {Logger};

var rules: LogRule[] = [
    {
        pattern: new RegExp(".*"),
        logLevel: LogLevel.Info
    }, {
        pattern: new RegExp("Gyroscope"),
        logLevel: LogLevel.Trace
    }

]
export const logFactory = new LogFactory(rules);
