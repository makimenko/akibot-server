import { Angle } from "..";

export module AngleUtils {

    export function radiansToDegrees(radians: number) {
        return radians * 180 / Math.PI;
    }

    export function degreesToRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    export function normalizeRadian(radians: number): number {
        var circle: number = Math.PI * 2;
        var a: number = radians % circle;
        if (a < 0) {
            a += circle;
        }
        return a;
    }

    export function createNegativeAngle(angle: Angle): Angle {
        if (angle.radians == undefined)
            throw "Undefined radians";
        return new Angle(-angle.radians);;
    }

    export function createAngleFromDegrees(degrees: number): Angle {
        return new Angle(degreesToRadians(degrees));
    }

    export function addDegrees(a: number, b: number): number {
        var x: number = a + b;
        var rounds: number = Math.floor(x / 360);
        if (rounds != 0) {
            x = x - (360 * rounds);
        }
        if (x < 0) {
            x = 360 - x;
        }
        return x;
    }

    export function leftDistanceDegrees(from: number, to: number): number {
        return addDegrees(from, -to);
    }

    export function rightDistanceDegrees(from: number, to: number): number {
        return addDegrees(to, -from);
    }

    export function modularDistanceDegrees(from: number, to: number): number {
        return Math.min(leftDistanceDegrees(from, to), rightDistanceDegrees(from, to));
    }


}
