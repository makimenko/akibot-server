import { Dimension3D } from "..";

export class Point3D extends Dimension3D {

    public constructor(x: number, y: number, z: number) {
        super(x, y, z);
    }

    public toString(): string {
        return "Point3D" + super.toString();
    }

}
