import * as common from "akibot-common/dist";
import { Logger, logFactory } from "../log-config";

export class GridHandler {

    private logger: Logger = logFactory.getLogger(this.constructor.name);

    public constructor(public gridNode: common.GridNode) {
        this.logger.debug("constructor");
        this.initGridDataIfNeeded();
    }

    public createGridData(cells: number, val: number): number[][] {
        this.logger.debug("Creating grid data");
        var res: number[][] = [];
        for (var i = 0; i < cells; i++) {
            var set = new Array(cells).fill(val);
            res.push(set);
        }
        return res;
    }

    public initGridDataIfNeeded() {
        if (this.gridNode.data == undefined) {
            this.gridNode.data = this.createGridData(this.gridNode.gridConfiguration.cellCount, this.gridNode.gridConfiguration.unknownValue);
        }
    }

    public add(addressX: number, addressY: number) {
        // ("add(" + addressX + ", " + addressY + ")");
        if (this.gridNode.data[addressX][addressY] == this.gridNode.gridConfiguration.unknownValue) {
            this.gridNode.data[addressX][addressY] = 1;
            //changeSequence++;
        } else if (this.gridNode.data[addressX][addressY] < this.gridNode.gridConfiguration.maxObstacleCount) {
            this.gridNode.data[addressX][addressY]++;
            //changeSequence++;
        }
    }

    public remove(addressX: number, addressY: number) {
        // ("remove(" + x + ", " + y + ")");
        var v = this.gridNode.data[addressX][addressY];
        if (v == this.gridNode.gridConfiguration.unknownValue) {
            this.gridNode.data[addressX][addressY] = this.gridNode.gridConfiguration.emptyValue;
            //changeSequence++;
        } else if (v > this.gridNode.gridConfiguration.emptyValue) {
            this.gridNode.data[addressX][addressY]--;
            //changeSequence++;
        }
    }

    public addLine(line: common.Line2D, endIsObstacle: boolean) {
        var raster: number[][] = this.rasterize(line, endIsObstacle); 
        for (var i = 0; i < raster.length; i++) {
            var x = raster[i][0];
            var y = raster[i][1];
            var status = raster[i][2];

            if (status == -1) {
                this.remove(x, y);
            } else if (status == 1) {
                this.add(x, y);
            }
        }
    }

    public iterateEndOfLine(line: common.Line2D, line2: common.Line2D, endIsObstacle: boolean) {
        var arrLeft: number[][] = this.rasterize(new common.Line2D(line2.to, line.to), endIsObstacle);
        if (arrLeft.length > 2) {
            for (var i = 1; i < arrLeft.length - 1; i++) {
                this.addLine(new common.Line2D(line.from
                    , new common.Point2D(
                        arrLeft[i][0] * this.gridNode.gridConfiguration.cellSizeMm + this.gridNode.gridConfiguration.offsetVector.x,
                        arrLeft[i][1] * this.gridNode.gridConfiguration.cellSizeMm + this.gridNode.gridConfiguration.offsetVector.y
                    )
                ), endIsObstacle);
            }
        }
    }

    public addLineWithAngle(line: common.Line2D, errorAngle: common.Angle, endIsObstacle: boolean) {
        var lineLeft = common.VectorUtils.rotateLine2D(line, errorAngle);
        var lineRight = common.VectorUtils.rotateLine2D(line, common.AngleUtils.createNegativeAngle(errorAngle));

        this.addLine(line, endIsObstacle);
        this.addLine(lineLeft, endIsObstacle);
        this.addLine(lineRight, endIsObstacle);

        this.iterateEndOfLine(line, lineLeft, endIsObstacle);
        this.iterateEndOfLine(line, lineRight, endIsObstacle);
    }

    public addDistance(positionOffset: common.Vector3D, northAngle: common.Angle, distance: common.Distance) {
        this.logger.trace("addDistance (positionOffset=" + positionOffset.toString() + ", northAngle=" + northAngle.toString() + ", distance=" + distance.distanceMm)
        var line: common.Line2D = this.calculateNorthLine(positionOffset, northAngle, distance.distanceMm);
        this.addLineWithAngle(line, distance.errorAngle, distance.endObstacle);
    }


    public getPointWithOffset(point: common.Point2D): common.Point2D {
        var offsetPoint: common.Point2D = new common.Point2D(0, 0);
        offsetPoint.x = point.x - this.gridNode.gridConfiguration.offsetVector.x;
        offsetPoint.y = point.y - this.gridNode.gridConfiguration.offsetVector.y;

        var maxSize = this.gridNode.gridConfiguration.cellCount * this.gridNode.gridConfiguration.cellSizeMm;

        if (offsetPoint.x >= maxSize
            || offsetPoint.x < 0
            || offsetPoint.y >= maxSize
            || offsetPoint.y < 0) {
            throw new RangeError("Outside World (point with offset " + offsetPoint.toString() + " out of range 0.." + maxSize + ")");
        }
        return offsetPoint;
    }

    public getAddressX(point: common.Point2D): number {
        return Math.floor(this.getPointWithOffset(point).x / this.gridNode.gridConfiguration.cellSizeMm);
    }

    public getAddressY(point: common.Point2D): number {
        return Math.floor(this.getPointWithOffset(point).y / this.gridNode.gridConfiguration.cellSizeMm);
    }

    public rasterize(line: common.Line2D, endIsObstacle: boolean): number[][] {

        var x = this.getAddressX(line.from);
        var y = this.getAddressY(line.from);

        var x2 = this.getAddressX(line.to);
        var y2 = this.getAddressY(line.to);

        //console.log("x=" + x + ", y=" + y);
        //console.log("x2=" + x2 + ", y2=" + y2);

        var distance: number = 1 + Math.floor(Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2)));

        //var res: number[][] = new [distance][3];
        //console.log("distance=" + distance);
        var res: number[][] = new Array();

        // Bresenham's line algorithm
        var w = x2 - x;
        var h = y2 - y;
        var dx1 = 0, dy1 = 0, dx2 = 0, dy2 = 0;

        if (w < 0)
            dx1 = -1;
        else if (w > 0)
            dx1 = 1;

        if (h < 0)
            dy1 = -1;
        else if (h > 0)
            dy1 = 1;

        if (w < 0)
            dx2 = -1;
        else if (w > 0)
            dx2 = 1;

        //console.log("w=" + w + ", h=" + h);

        var longest = Math.abs(w);
        var shortest = Math.abs(h);
        if (!(longest > shortest)) {
            longest = Math.abs(h);
            shortest = Math.abs(w);
            if (h < 0)
                dy2 = -1;
            else if (h > 0)
                dy2 = 1;
            dx2 = 0;
        }

        var numerator = longest >> 1;
        for (var i = 0; i <= longest; i++) {
            var set: number[] = [3];
            var val: number;
            //console.log("iterate " + x + ", " + y);
            set[0] = x;
            set[1] = y;
            if (endIsObstacle && x == x2 && y == y2) {
                set[2] = 1;
            } else if (!endIsObstacle || x != x2 || y != y2) {
                set[2] = -1;
            } else {
                set[2] = 0;
            }
            res.push(set);

            numerator += shortest;
            if (!(numerator < longest)) {
                numerator -= longest;
                x += dx1;
                y += dy1;
            } else {
                x += dx2;
                y += dy2;
            }
        }
        return res;
    }

    public calculateNorthLine(positionOffset: common.Vector3D, northAngle: common.Angle, distanceMm: number): common.Line2D {
        var a = distanceMm * Math.cos(northAngle.radians + common.AngleUtils.degreesToRadians(90));
        var b = distanceMm * Math.sin(northAngle.radians + common.AngleUtils.degreesToRadians(90));
        var pointTo = new common.Vector3D(positionOffset.x + a, positionOffset.y + b, 0);
        return new common.Line3D(positionOffset, pointTo);
    }

    public updateGridDistance(robotNode: common.RobotNode, distanceNode: common.DeviceNode, distance: common.Distance) {
        this.logger.trace("updateGridDistance: " + distance.distanceMm);
        var relativeTransformation: common.NodeTransformation3D = common.VectorUtils.calculateRelativeTransformation(robotNode.transformation, distanceNode.transformation);
        var northAngle: common.Angle = new common.Angle(relativeTransformation.rotation.z);
        this.addDistance(relativeTransformation.position, northAngle, distance);
    }

    public printGridData() {
        var arr = this.gridNode.data;
        var numX = arr.length;
        var numY = arr[0].length;
        for (var y = numY - 1; y >= 0; y--) {
            var line: string = "";
            for (var x = 0; x < numX; x++) {
                line += arr[x][y] + ", ";
            }
            console.log(line);
        }
    }

}