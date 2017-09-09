import { Logger, LogRule, LogLevel, LogFactory, ConsoleLogAppender } from "akibot-log/dist";

var rules: LogRule[] = [
    { pattern: new RegExp(".*"), logLevel: LogLevel.Debug }
    //, { pattern: new RegExp("Gyroscope"), logLevel: LogLevel.Debug }
    //, { pattern: new RegExp("Distance"), logLevel: LogLevel.Debug }
    //, { pattern: new RegExp("WebSocketServerComponent"), logLevel: LogLevel.Debug }
]
export { Logger };
export const logFactory = new LogFactory(new ConsoleLogAppender(), rules);
