import { Gyroscope } from "./Gyroscope";
import { Vector3D } from "akibot-common/dist";

export class FakeGyroscope implements Gyroscope {

    public constructor(private offset: Vector3D) {
    }

    public getGyroscopeValue(): Vector3D {
        var x: number = Math.random();
        var y: number = Math.random();
        var z: number = Math.random();
        var vector3D: Vector3D = new Vector3D(x, y, z);
        vector3D.add(this.offset);
        return vector3D;
    }

}
