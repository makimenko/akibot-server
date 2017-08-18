import { Vector3D, Geometry, Material, WorldElement} from "..";

export class BoxGeometry extends Geometry {

    constructor(public dimension: Vector3D, public material?: Material) {
        super();
    }

}
