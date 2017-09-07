import { CommandComponent, OrientationComponent, GyroscopeComponent, WheelComponent, WHEEL_LOCATION, WebSocketServerComponent, WorldComponent, DistanceComponent } from "./server";
import { Gyroscope, DefaultGyroscope, DefaultCallableDistanceSensor } from "./device";
import * as common from "akibot-common/dist";
import * as nconf from "nconf";

// Reads configuration from the JSON file
nconf.file("akibot-server-config.json");

// TODO: Dump config info to console

export var commandComponent: CommandComponent = new CommandComponent();
export var webSocketServerComponent: WebSocketServerComponent = new WebSocketServerComponent(commandComponent);
export var worldComponent: WorldComponent = new WorldComponent(commandComponent, webSocketServerComponent);
export var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
export var wheelComponentLeft: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
export var wheelComponentRight: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Right);

var gyroscope: Gyroscope = new DefaultGyroscope();
export var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent, gyroscope);

var distanceCenterTriggerPin: number = Number(nconf.get("distance:center:triggerPin"));
var distanceCenterEchoPin: number = Number(nconf.get("distance:center:echoPin"));
var distanceCenter = new DefaultCallableDistanceSensor(distanceCenterTriggerPin, distanceCenterEchoPin);
export var distanceCenterComponent = new DistanceComponent(commandComponent, distanceCenter, new common.DistanceAutoIntervalCommand(0));
