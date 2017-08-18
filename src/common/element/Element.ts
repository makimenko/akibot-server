import { Serializable } from "..";

export class Element implements Serializable {

    $name: string = this.constructor.name;


}