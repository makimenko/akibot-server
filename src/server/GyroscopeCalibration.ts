import { logFactory } from "../log-config";
import { Gyroscope, DefaultGyroscope } from "../device";
import { Vector3D } from "akibot-common/dist";

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

    constructor(private gyroscope: Gyroscope) {
        this.logger.debug("constructor");
        this.calibrateIteration = this.calibrateIteration.bind(this);
        this.clearTimers = this.clearTimers.bind(this);
    }

    public calibrate(maxTime: number, intervalMs: number): Promise<Vector3D> {
        this.logger.info("Running calibration...");
        this.resetStats();

        return new Promise<Vector3D>((resolve, reject) => {
            this.intervalID = setInterval(this.calibrateIteration, intervalMs);
            this.timeoutID = setTimeout(() => {
                this.clearTimers();
                this.logger.debug("Calculating gyroscope offset from: " + JSON.stringify(this.stats));
                var calibrationResult: Vector3D = new Vector3D(
                    (this.stats.maxX + this.stats.minX) / 2,
                    (this.stats.maxY + this.stats.minY) / 2,
                    (this.stats.maxZ + this.stats.minZ) / 2
                );

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
        var data: Vector3D = this.gyroscope.getRawValue();
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

    private updateStats(value: Vector3D): void {
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
