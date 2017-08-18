import { WorldElement } from "./WorldElement";

export enum ThreeMaterialConstants {
    THREE_NO_SHADING = 0,
    THREE_FLAT_SHADING = 1,
    THREE_SMOOTH_SHADING = 2
}

export class Material extends WorldElement {

    color: string = "#0F0F0F";
    shading: number = ThreeMaterialConstants.THREE_FLAT_SHADING;
    opacity: number = 1;
    transparent: boolean = false;
    wireframe: boolean = false;
    
}
