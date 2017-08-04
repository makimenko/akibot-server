import { LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel, LogMessage, LogFormat, DateFormat, DateFormatEnum } from "typescript-logging";

const options = new LoggerFactoryOptions()
    .addLogGroupRule(new LogGroupRule(new RegExp(".*"), LogLevel.Info));


export const factory = LFService.createNamedLoggerFactory("LoggerFactory", options);
