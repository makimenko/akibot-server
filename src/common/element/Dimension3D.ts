import { Dimension2D } from "./Dimension2D";

export class Dimension3D extends Dimension2D {

    public constructor(x: number, y: number, private z: number) {
        super(x, y);
    }

    public getZ(): number {
        return this.z;
    }

    public setZ(z: number): void {
        this.z = z;
    }


    public add(dimension3d: Dimension3D): void {
        if (dimension3d != null) {
            this.setX(this.getX() + dimension3d.getX());
            this.setY(this.getY() + dimension3d.getY());
            this.setZ(this.getZ() + dimension3d.getZ());
        }
    }

    public subtract(dimension3d: Dimension3D): void {
        if (dimension3d != null) {
            this.setX(this.getX() - dimension3d.getX());
            this.setY(this.getY() - dimension3d.getY());
            this.setZ(this.getZ() - dimension3d.getZ());
        }
    }

    public toString(): string {
        return "(" + this.getX() + "," + this.getY() + "," + this.getZ() + ")";
    }

    public equals(dimension3d: Dimension3D, tolerance: number): boolean {
        return (dimension3d != null && Math.abs(dimension3d.getX() - this.getX()) < tolerance
            && Math.abs(dimension3d.getY() - this.getY()) < tolerance
            && Math.abs(dimension3d.getZ() - this.getZ()) < tolerance);
    }

}
