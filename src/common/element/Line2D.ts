import { Point2D } from "./Point2D";
import { Vector2D } from "./Vector2D";

export class Line2D {

    public constructor(public from: Point2D, public to: Point2D) {
    }

    public getVector(): Vector2D {
        var x = this.to.x - this.from.x;
        var y = this.to.y - this.from.y;
        return new Vector2D(x, y);
    }

    public toString(): string {
        return "Line(" + this.from + " - " + this.to + ")";
    }

}
