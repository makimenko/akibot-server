import { CommandComponent, OrientationComponent, GyroscopeComponent, WheelComponent, WHEEL_LOCATION, WebSocketServerComponent, WorldComponent } from "./server";
import { Gyroscope, FakeGyroscope, FakeCallableDistanceSensor } from "./device";
import * as common from "akibot-common/dist";
import { DistanceComponent } from "./server/DistanceComponent";

export var commandComponent: CommandComponent = new CommandComponent();
export var webSocketServerComponent: WebSocketServerComponent = new WebSocketServerComponent(commandComponent);
export var worldComponent: WorldComponent = new WorldComponent(commandComponent, webSocketServerComponent);
export var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
export var wheelComponentLeft: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
export var wheelComponentRight: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Right);

var gyroOffset = new common.Vector3D(0, 0, 0);
var gyroscope: Gyroscope = new FakeGyroscope(gyroOffset);
export var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent, gyroscope, new common.GyroscopeAutoIntervalCommand(0));

var distanceCenter = new FakeCallableDistanceSensor(10000, 1000, true, common.AngleUtils.createAngleFromDegrees(10));
export var distanceCenterComponent = new DistanceComponent(commandComponent, distanceCenter, new common.DistanceAutoIntervalCommand(0));
//var distanceNode = new common.DeviceNode(new common.NodeTransformation3D());

