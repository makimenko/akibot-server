import { Vector3D, WorldElement } from "..";

export class NodeTransformation3D extends WorldElement {

    position: Vector3D = new Vector3D(0, 0, 0);
    scale: Vector3D = new Vector3D(1, 1, 1);
    rotation: Vector3D = new Vector3D(0, 0, 0);

}
