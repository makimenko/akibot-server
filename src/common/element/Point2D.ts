import { Dimension2D } from "..";

export class Point2D extends Dimension2D {

    public constructor(x: number, y: number) {
        super(x, y);
    }

    public toString(): string {
        return "Point2D" + super.toString();
    }

}

