import { Point2D , Vector2D, Element } from "..";

export class Line2D extends Element {

    public constructor(public from: Point2D, public to: Point2D) {
        super();
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
