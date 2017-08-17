import { Serializable } from "../index";

export class Message implements Serializable {
    $name: string = this.constructor.name;


}