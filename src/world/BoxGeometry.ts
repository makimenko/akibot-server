import { Vector3D } from "../common";
import { Geometry } from "./Geometry";
import { Material } from "./Material";

export class BoxGeometry implements Geometry {

    constructor(public dimension: Vector3D, public material: Material) {

    }


}
