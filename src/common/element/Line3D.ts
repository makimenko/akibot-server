import { Point3D } from "./Point3D";
import { Vector3D } from "./Vector3D";

export class Line3D {

    public constructor(public from: Point3D, public to: Point3D) {
        
    }

    public getVector(): Vector3D {
        var x: number = this.to.x - this.from.x;
        var y: number = this.to.y - this.from.y;
        var z: number = this.to.z - this.from.z;
        return new Vector3D(x, y, z);
    }

    public toString(): string {
        return "Line(" + this.from + ", " + this.to + ")";
    }

}
