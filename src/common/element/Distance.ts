import { Angle } from "./Angle";

export class Distance {
    
    private errorAngle: Angle;
    private endObstacle: boolean;

    public constructor(private distanceMm: number) {
        this.errorAngle = new Angle(0);
        this.endObstacle = false;
    }

    public getDistanceMm(): number {
        return this.distanceMm;
    }

    public setDistanceMm(distanceMm: number): void {
        this.distanceMm = distanceMm;
    }

    public getErrorAngle(): Angle {
        return this.errorAngle;
    }

    public setErrorAngle(errorAngle: Angle): void {
        this.errorAngle = errorAngle;
    }

    public isEndObstacle(): boolean {
        return this.endObstacle;
    }

    public setEndObstacle(endObstacle: boolean): void {
        this.endObstacle = endObstacle;
    }

}
