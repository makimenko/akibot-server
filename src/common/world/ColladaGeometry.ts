import { Geometry } from "..";

export class ColladaGeometry extends Geometry {

    public constructor(public fileName: string) {
        super();
    }

}
