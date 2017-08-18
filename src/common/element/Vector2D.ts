import { Dimension2D } from "..";

export class Vector2D extends Dimension2D {

    public constructor(x: number, y: number) {
        super(x, y);
    }

    public toString(): string {
        return "Vector2D" + super.toString();
    }

}

