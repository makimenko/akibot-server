import { Message, BaseNode } from "..";

export class WorldContentResponse extends Message {

    constructor(public worldNode?: BaseNode) {
        super();
    }
    
}