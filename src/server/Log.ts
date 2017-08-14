export enum LogLevel {
    Trace = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
}

export interface LogRule {
    pattern: RegExp,
    logLevel: LogLevel
}

export class LogFactory {

    constructor(private logRules: LogRule[]) {

    }

    public getLoglevel(name: string): LogLevel {
        var result: LogLevel = LogLevel.Error;
        this.logRules.forEach(i => {
            if (i.pattern.test(name)) {
                result = i.logLevel;
            }
        });
        return result;
    }

    public getLogger(name: string) {
        var level = this.getLoglevel(name);
        return new Logger(name, level);
    }

}


export class Logger {

    constructor(private name: string, private logLevel: LogLevel) {
        //console.log("Creating logger "+name+"with log level = "+logLevel);

    }

    private print(logLevel: LogLevel, msg: string) {
        if (logLevel >= this.logLevel) {
            var now = new Date();

            console.log(
                ("  " + now.toLocaleString()).slice(-19)
                + ": "
                + ("     " + LogLevel[logLevel]).slice(-5)
                + ": "
                + (this.name + "                                  ").substring(0, 25)
                + ": " + msg
            );
        }
    }

    public trace(msg: string) {
        this.print(LogLevel.Trace, msg);
    }

    public debug(msg: string) {
        this.print(LogLevel.Debug, msg);
    }

    public info(msg: string) {
        this.print(LogLevel.Info, msg);
    }

    public warn(msg: string) {
        this.print(LogLevel.Warn, msg);
    }

    public error(msg: string) {
        this.print(LogLevel.Error, msg);
    }

    public fatal(msg: string) {
        this.print(LogLevel.Fatal, msg);
    }

}

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
