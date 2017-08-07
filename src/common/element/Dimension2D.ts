import { SimpleGeometryElement } from "./SimpleGeometryElement";

export class Dimension2D implements SimpleGeometryElement {

    public constructor(private x: number, private y: number) {
    }

    public getX(): number {
        return this.x;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public getY(): number {
        return this.y;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public add(dimension2d: Dimension2D): void {
        if (dimension2d != null) {
            this.setX(this.getX() + dimension2d.getX());
            this.setY(this.getY() + dimension2d.getY());
        }
    }

    public toString(): string {
        return "(" + this.getX() + "," + this.getY() + ")";
    }

}
