/*
import { HMC5883L } from './HMC5883L.js';
import { logFactory } from "../../log-config";

export interface IGyroscopeValue {
    x: number,
    y: number,
    z: number
};


export interface IGyroscopeStats {
    minX: number,
    minY: number,
    minZ: number,
    maxX: number,
    maxY: number,
    maxZ: number
}


export class GyroscopeCalibration {

    private logger = logFactory.getLogger(this.constructor.name);
    private intervalID: NodeJS.Timer;
    private timeoutID: NodeJS.Timer;
    private stats: IGyroscopeStats;

    constructor(public gyroscope: HMC5883L) {
        this.logger.debug("constructor");
        this.calibrateIteration = this.calibrateIteration.bind(this);
        this.clearTimers = this.clearTimers.bind(this);
    }

    public calibrate(maxTime: number, intervalMs: number): Promise<IGyroscopeValue> {
        this.logger.info("Starting calibration...");
        this.resetStats();

        return new Promise<IGyroscopeValue>((resolve, reject) => {
            this.intervalID = setInterval(this.calibrateIteration, intervalMs);
            this.timeoutID = setTimeout(() => {
                this.clearTimers();
                this.logger.debug("Calculating gyroscope offset from: " + JSON.stringify(this.stats));
                var calibrationResult: IGyroscopeValue = {
                    x: (this.stats.maxX + this.stats.minX) / 2,
                    y: (this.stats.maxY + this.stats.minY) / 2,
                    z: (this.stats.maxZ + this.stats.minZ) / 2,
                }
                this.logger.debug("Calibration finished with result: " + JSON.stringify(calibrationResult));
                resolve(calibrationResult);
            }, maxTime);
        });
    }

    private clearTimers() {
        this.logger.trace("clearInterval: " + this.intervalID);
        clearInterval(this.intervalID);

        this.logger.trace("clearTimeout: " + this.timeoutID);
        clearTimeout(this.timeoutID);
    }

    private calibrateIteration() {
        this.logger.trace("calibrateIteration");
        var data: IGyroscopeValue = this.gyroscope.readMag();
        this.updateStats(data);
    }

    private resetStats(): void {
        this.logger.trace("resetStats");
        this.stats = {
            minX: 100000,
            minY: 100000,
            minZ: 100000,
            maxX: -100000,
            maxY: -100000,
            maxZ: -100000
        }
    }

    private updateStats(value: IGyroscopeValue): void {
        this.logger.trace("updateStats: " + JSON.stringify(value));
        if (value.x < this.stats.minX) {
            this.stats.minX = value.x;
        }
        if (value.y < this.stats.minY) {
            this.stats.minY = value.y;
        }
        if (value.z < this.stats.minZ) {
            this.stats.minZ = value.z;
        }
        if (value.x > this.stats.maxX) {
            this.stats.maxX = value.x;
        }
        if (value.y > this.stats.maxY) {
            this.stats.maxY = value.y;
        }
        if (value.z > this.stats.maxZ) {
            this.stats.maxZ = value.z;
        }
    }

}
*/