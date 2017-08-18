import { Geometry, NodeTransformation3D, WorldElement } from "..";

export class BaseNode extends WorldElement {

    childs: BaseNode[] = Array<BaseNode>();

    public constructor(public name: string, private parentNode?: BaseNode, public geometry?: Geometry, public transformation?: NodeTransformation3D, public stickToParent?: boolean) {
        super();
        if (this.parentNode != undefined)
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
