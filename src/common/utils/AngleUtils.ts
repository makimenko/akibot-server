import { Angle } from "../index";

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

    export function createAngleFromDegrees(degrees: number): Angle {
        return new Angle(degreesToRadians(degrees));
    }

}
