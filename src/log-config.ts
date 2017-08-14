import {Logger, LogRule, LogLevel, LogFactory, ConsoleLogAppender} from "akibot-log/dist";

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
export const logFactory = new LogFactory(new ConsoleLogAppender(), rules);
