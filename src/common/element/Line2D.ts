import { SimpleGeometryElement } from "./SimpleGeometryElement";
import { Point2D } from "./Point2D";
import { Vector2D } from "./Vector2D";

export class Line2D implements SimpleGeometryElement {

    public constructor(private from: Point2D, private to: Point2D) {
    }

    public getFrom(): Point2D {
        return this.from;
    }

    public setFrom(from: Point2D): void {
        this.from = from;
    }

    public getTo(): Point2D {
        return this.to;
    }

    public setTo(to: Point2D): void {
        this.to = to;
    }

    public getVector(): Vector2D {
        var x = this.getTo().getX() - this.getFrom().getX();
        var y = this.getTo().getY() - this.getFrom().getY();
        return new Vector2D(x, y);
    }

    public toString(): string {
        return "Line(" + this.from + " - " + this.to + ")";
    }

}
