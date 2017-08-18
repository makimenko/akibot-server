import { Serializable } from "..";

export class Message implements Serializable {
    $name: string = this.constructor.name;


}