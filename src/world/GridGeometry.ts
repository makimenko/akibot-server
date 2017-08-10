import { Geometry } from "./Geometry";
import { GridConfiguration } from "./GridConfiguration";

export class GridGeometry implements Geometry {
    private grid: number[][];

    public constructor(public gridConfiguration: GridConfiguration) {
        /* how to init?
         this.grid = new int[gridConfiguration.getCellCountX()][gridConfiguration.getCellCountY()];

        final ArrayUtils arrayUtils = new ArrayUtils();
        arrayUtils.updateValue(grid, gridConfiguration.getUnknownValue());
        */
    }

}