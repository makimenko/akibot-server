import { Angle, Element } from "..";

export class Distance extends Element {
    
    private errorAngle: Angle;
    private endObstacle: boolean;

    public constructor(private distanceMm: number) {
        super();
        this.errorAngle = new Angle();
        this.errorAngle.radians = 0;
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
