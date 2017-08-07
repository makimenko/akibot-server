
import { SimpleGeometryElement } from "./SimpleGeometryElement";
import { Point3D } from "./Point3D";
import { Vector3D } from "./Vector3D";

export class Line3D implements SimpleGeometryElement {

    public constructor(private from: Point3D, private to: Point3D) {
    }

    public getFrom(): Point3D {
        return this.from;
    }

    public setFrom(from: Point3D): void {
        this.from = from;
    }

    public getTo(): Point3D {
        return this.to;
    }

    public setTo(to: Point3D): void {
        this.to = to;
    }

    public getVector(): Vector3D {
        var x: number = this.getTo().getX() - this.getFrom().getX();
        var y: number = this.getTo().getY() - this.getFrom().getY();
        var z: number = this.getTo().getZ() - this.getFrom().getZ();
        return new Vector3D(x, y, z);
    }

    public toString(): string {
        return "Line(" + this.from + ", " + this.to + ")";
    }

}
