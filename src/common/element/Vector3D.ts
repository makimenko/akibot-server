import { Dimension3D } from "..";

export class Vector3D extends Dimension3D {

    public constructor(x: number, y: number, z: number) {
        super(x, y, z);
    }

    public toString(): string {
        return "Vector3D" + super.toString();
    }

}
