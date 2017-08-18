import { Geometry, GridConfiguration } from "..";

export class GridGeometry extends Geometry {
    
    //TODO: private grid: number[][];

    public constructor(public gridConfiguration: GridConfiguration) {
        super();
        /* how to init?
         this.grid = new int[gridConfiguration.getCellCountX()][gridConfiguration.getCellCountY()];

        final ArrayUtils arrayUtils = new ArrayUtils();
        arrayUtils.updateValue(grid, gridConfiguration.getUnknownValue());
        */
    }

}