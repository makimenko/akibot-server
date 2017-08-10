import { Dimension2D } from "./Dimension2D";

export class Dimension3D extends Dimension2D {

    public constructor(x: number, y: number, public z: number) {
        super(x, y);
    }

    public add(dimension3d: Dimension3D): void {
        if (dimension3d != null) {
            this.x += dimension3d.x;
            this.y += dimension3d.y;
            this.z += dimension3d.z;
        }
    }

    public subtract(dimension3d: Dimension3D): void {
        if (dimension3d != null) {
            this.x -= dimension3d.x;
            this.y -= dimension3d.y;
            this.z -= dimension3d.z;
        }
    }

    public toString(): string {
        return "(" + this.x + "," + this.y + "," + this.x + ")";
    }

    public equals(dimension3d: Dimension3D, tolerance: number): boolean {
        return dimension3d != null
            && Math.abs(dimension3d.x - this.x) < tolerance
            && Math.abs(dimension3d.y - this.y) < tolerance
            && Math.abs(dimension3d.z - this.z) < tolerance;
    }

}
