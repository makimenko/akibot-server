import { Angle } from "../element/Angle";
import { Vector2D } from "../element/Vector2D";
import { Point2D } from "../element/Point2D";
import { Line2D } from "../element/Line2D";
import { Vector3D } from "../element/Vector3D";

export class VectorUtils {
    private offsetNorthAngle: Angle;

    constructor() {
        var utils = new Angle(0);
        this.offsetNorthAngle = new Angle(utils.degreesToRadians(-90));
    }

    public rotate2DVector(vector2D: Vector2D, angle: Angle): Vector2D {
        if (angle == null) {
            return vector2D;
        } else {
            var x1 = vector2D.x;
            var y1 = vector2D.y;
            var angleRadians = angle.radians;

            var x2 = x1 * Math.cos(angleRadians) - y1 * Math.sin(angleRadians);
            var y2 = y1 * Math.cos(angleRadians) + x1 * Math.sin(angleRadians);

            return new Vector2D(x2, y2);
        }
    }

    public rotateEndOfLine2D(line2D: Line2D, angle: Angle): Point2D {
        var vector: Vector2D = this.rotate2DVector(line2D.getVector(), angle);

        var resultPoint2D: Point2D = new Point2D(0, 0);
        resultPoint2D.x = vector.x + line2D.from.x;
        resultPoint2D.y = vector.y + line2D.from.y;

        return resultPoint2D;
    }

    public rotateLine2D(line2D: Line2D, angle: Angle): Line2D {
        return new Line2D(line2D.from, this.rotateEndOfLine2D(line2D, angle));
    }

    public getNorthAngle(vector3d: Vector3D): Angle {
        var radians: number = Math.atan2(vector3d.y, vector3d.x);
        var angle = new Angle(radians);
        angle.add(this.offsetNorthAngle);
        return angle;
    }

}
