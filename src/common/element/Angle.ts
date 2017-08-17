import { RoundRobinUtils } from "../utils/RoundRobinUtils";
import { Serializable, AngleUtils } from "../index";

export class Angle implements Serializable {

    $name: string = this.constructor.name;
    
    constructor(public radians?: number) {

    }

    public getDegrees(): number {
        if (this.radians == undefined) 
            throw "Undefined radians";
        return AngleUtils.radiansToDegrees(this.radians);
    }  

    public setDegrees(degrees: number): void {
        this.radians = AngleUtils.degreesToRadians(degrees);
    }

    public createNegativeAngle(): Angle {
        if (this.radians == undefined) 
            throw "Undefined radians";
        return new Angle(-this.radians);;
    }

    public add(angle: Angle): void {
        if (this.radians == undefined || angle.radians == undefined) 
            throw "Undefined radians";
        var value = this.radians + angle.radians;
        value = AngleUtils.normalizeRadian(value);
        this.radians = value;
    }

    public fuzzyEqual(b: Angle, toleranceDegrees: number): boolean {
        var res: number = RoundRobinUtils.modularDistance(this.getDegrees(), b.getDegrees());
        return res < toleranceDegrees;
    }

    public toString(): string {
        return "Angle(" + this.getDegrees() + " deg)";
    }

}