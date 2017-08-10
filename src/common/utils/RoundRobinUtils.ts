
export class RoundRobinUtils {

    public constructor(public degrees: number) {

    }

    public add(a: number, b: number): number {
        var x: number = a + b;
        var rounds: number = Math.floor(x / this.degrees);
        if (rounds != 0) {
            x = x - (360 * rounds);
        }
        if (x < 0) {
            x = 360 - x;
        }
        return x;
    }

    public leftDistance(from: number, to: number): number {
        return this.add(from, -to);
    }

    public rightDistance(from: number, to: number): number {
        return this.add(to, -from);
    }

    public modularDistance(from: number, to: number): number {
        return Math.min(this.leftDistance(from, to), this.rightDistance(from, to));
    }


}
