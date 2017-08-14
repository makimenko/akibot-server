
import { Vector3D } from "../common/index";

export class GridConfiguration {

    public unknownValue: number = -1;
    public emptyValue = 0;

    public constructor(
        public cellCountX: number,
        public cellCountY: number,
        public cellSizeMm: number,
        public maxObstacleCount: number,
        public offsetVector: Vector3D) { }

}