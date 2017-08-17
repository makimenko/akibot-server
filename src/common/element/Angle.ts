import { RoundRobinUtils } from "../utils/RoundRobinUtils";
import { Serializable } from "../index";

export class Angle implements Serializable {

    $name: string = this.constructor.name;

    public radians: number;
    

    public getDegrees(): number {
        return this.radiansToDegrees(this.radians);
    }

    public radiansToDegrees(radians: number) {
        return radians * 180 / Math.PI;
    }

    public degreesToRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    public setDegrees(degrees: number): void {
        this.radians = this.degreesToRadians(degrees);
    }

    public calculateNegativeAngle(): Angle {
        var angle = new Angle();
        angle.radians = -this.radians;
        return angle;
    }

    public add(angle: Angle): void {
        var value = this.radians + angle.radians;
        value = this.normalizeRadian(value);
        this.radians = value;
    }

    public normalizeRadian(radians: number): number {
        var circle: number = Math.PI * 2;
        var a: number = radians % circle;
        if (a < 0) {
            a += circle;
        }
        return a;
    }

    public fuzzyEqual(b: Angle, toleranceDegrees: number): boolean {
        var res: number = RoundRobinUtils.modularDistance(this.getDegrees(), b.getDegrees());
        return res < toleranceDegrees;
    }

    public toString(): string {
        return "Angle(" + this.getDegrees() + " deg)";
    }

}