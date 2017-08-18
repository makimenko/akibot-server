import { Element } from "..";

export class Dimension2D extends Element {

    public constructor(public x: number, public y: number) {
        super();
    }

    public add(dimension2d: Dimension2D): void {
        if (dimension2d != null) {
            this.x += dimension2d.x;
            this.y += dimension2d.y;
        }
    }

    public toString(): string {
        return "(" + this.x + "," + this.y + ")";
    }

}
