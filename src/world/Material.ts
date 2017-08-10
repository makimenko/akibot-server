export enum ThreeMaterialConstants {
    THREE_NO_SHADING = 0,
    THREE_FLAT_SHADING = 1,
    THREE_SMOOTH_SHADING = 2
}

export class Material {
    public color: string = "#0F0F0F";
    public shading: number = ThreeMaterialConstants.THREE_FLAT_SHADING;
    public opacity: number = 1;
    public transparent: boolean = false;
    public wireframe: boolean = false;
}
