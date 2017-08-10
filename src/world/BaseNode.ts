import { Geometry } from "./Geometry";
import { NodeTransformation3D } from "./NodeTransformation3D";

export class BaseNode {

    geometry: Geometry;
    transformation: NodeTransformation3D;
    stickToParent: boolean;
    childs: BaseNode[];

    public constructor(private name: string, private parentNode: BaseNode) {
        this.parentNode.attachChild(this);
    }

    public toString(): string {
        return "Node(" + this.name + ", stickToParent=" + this.stickToParent + ")";
    }

    public attachChild(childNode: BaseNode): void {
        this.childs.push(childNode);
        childNode.parentNode = this;
    }

}
