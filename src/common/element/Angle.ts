import { Serializable, AngleUtils, Element } from "../index";

export class Angle extends Element {

    constructor(public radians?: number) {
        super();
    }

    public getDegrees(): number {
        if (this.radians == undefined) 
            throw "Undefined radians";
        return AngleUtils.radiansToDegrees(this.radians);
    }  

    public setDegrees(degrees: number): void {
        this.radians = AngleUtils.degreesToRadians(degrees);
    }

    public add(angle: Angle): void {
        if (this.radians == undefined || angle.radians == undefined) 
            throw "Undefined radians";
        var value = this.radians + angle.radians;
        value = AngleUtils.normalizeRadian(value);
        this.radians = value;
    }

    public fuzzyEqual(b: Angle, toleranceDegrees: number): boolean {
        var res: number = AngleUtils.modularDistanceDegrees(this.getDegrees(), b.getDegrees());
        return res < toleranceDegrees;
    }

    public toString(): string {
        return "Angle(" + this.getDegrees() + " deg)";
    }

}