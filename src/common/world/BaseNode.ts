import { Geometry, NodeTransformation3D, WorldElement } from "..";

export class BaseNode extends WorldElement {

    childs: BaseNode[];

    public constructor(public name: string, public geometry?: Geometry, public transformation?: NodeTransformation3D, public stickToParent?: boolean, public parentNode?: BaseNode) {
        super();
        if (parentNode != undefined)
            parentNode.attachChild(this);
    }

    public toString(): string {
        return "Node(" + this.name + ", stickToParent=" + this.stickToParent + ")";
    }

    public attachChild(childNode: BaseNode): void {
        this.childs.push(childNode);
        childNode.parentNode = this;
    }

}
