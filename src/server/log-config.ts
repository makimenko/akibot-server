import { LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel, LogMessage, LogFormat, DateFormat, DateFormatEnum } from "typescript-logging";

const options = new LoggerFactoryOptions()
    .addLogGroupRule(new LogGroupRule(new RegExp("(Gyroscope)+"), LogLevel.Info))
    .addLogGroupRule(new LogGroupRule(new RegExp("(Wheel)+"), LogLevel.Trace))
    .addLogGroupRule(new LogGroupRule(new RegExp("(Orientation)+"), LogLevel.Debug))
    .addLogGroupRule(new LogGroupRule(new RegExp(".*"), LogLevel.Trace));


export const factory = LFService.createNamedLoggerFactory("LoggerFactory", options);
