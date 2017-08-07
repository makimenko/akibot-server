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
            var x1 = vector2D.getX();
            var y1 = vector2D.getY();
            var angleRadians = angle.getRadians();

            var x2 = x1 * Math.cos(angleRadians) - y1 * Math.sin(angleRadians);
            var y2 = y1 * Math.cos(angleRadians) + x1 * Math.sin(angleRadians);

            return new Vector2D(x2, y2);
        }
    }

    public rotateEndOfLine2D(line2D: Line2D, angle: Angle): Point2D {
        var vector: Vector2D = this.rotate2DVector(line2D.getVector(), angle);

        var resultPoint2D: Point2D = new Point2D(0, 0);
        resultPoint2D.setX(vector.getX() + line2D.getFrom().getX());
        resultPoint2D.setY(vector.getY() + line2D.getFrom().getY());

        return resultPoint2D;
    }

    public rotateLine2D(line2D: Line2D, angle: Angle): Line2D {
        return new Line2D(line2D.getFrom(), this.rotateEndOfLine2D(line2D, angle));
    }

    public getNorthAngle(vector3d: Vector3D): Angle {
        var radians: number = Math.atan2(vector3d.getY(), vector3d.getX());
        var angle = new Angle(radians);
        angle.add(this.offsetNorthAngle);
        return angle;
    }

}
