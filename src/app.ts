import { CommandComponent, OrientationComponent, GyroscopeComponent, WheelComponent, WHEEL_LOCATION, WebSocketServerComponent, WorldComponent, DistanceComponent } from "./server";
import { Gyroscope, DefaultGyroscope, DefaultCallableDistanceSensor } from "./device";
import * as common from "akibot-common/dist";

export var commandComponent: CommandComponent = new CommandComponent();
export var webSocketServerComponent: WebSocketServerComponent = new WebSocketServerComponent(commandComponent);
export var worldComponent: WorldComponent = new WorldComponent(commandComponent, webSocketServerComponent);
export var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
export var wheelComponentLeft: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
export var wheelComponentRight: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Right);

var gyroOffset = new common.Vector3D(-0.5, -0.5, 0);
var gyroscope: Gyroscope = new DefaultGyroscope(gyroOffset);
export var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent, gyroscope, new common.GyroscopeAutoIntervalCommand(0));

//TODO: fixme
const DISTANCE_CENTER_TRIGGER_PIN = 2;
const DISTANCE_CENTER_ECHO_PIN = 3;
var distanceCenter = new DefaultCallableDistanceSensor(DISTANCE_CENTER_TRIGGER_PIN, DISTANCE_CENTER_ECHO_PIN);
export var distanceCenterComponent = new DistanceComponent(commandComponent, distanceCenter, new common.DistanceAutoIntervalCommand(0));

