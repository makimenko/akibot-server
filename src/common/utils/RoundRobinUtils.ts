
export module RoundRobinUtils {

    var degrees: 360;

    export function add(a: number, b: number): number {
        var x: number = a + b;
        var rounds: number = Math.floor(x / degrees);
        if (rounds != 0) {
            x = x - (360 * rounds);
        }
        if (x < 0) {
            x = 360 - x;
        }
        return x;
    }

    export function leftDistance(from: number, to: number): number {
        return add(from, -to);
    }

    export function rightDistance(from: number, to: number): number {
        return add(to, -from);
    }

    export function modularDistance(from: number, to: number): number {
        return Math.min(leftDistance(from, to), rightDistance(from, to));
    }


}
