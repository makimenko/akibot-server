import { CommandComponent, OrientationComponent, GyroscopeComponent, WheelSetComponent, WebSocketServerComponent, WorldComponent, DistanceComponent } from "./server";
import { Gyroscope, DefaultGyroscope, DefaultCallableDistanceSensor, Relay } from "./device";
import * as common from "akibot-common/dist";
import * as nconf from "nconf";

// Reads configuration from the JSON file
nconf.file("akibot-server-config.json");
// TODO: Dump config info to console


// Create Components:
export var commandComponent: CommandComponent = new CommandComponent();
export var webSocketServerComponent: WebSocketServerComponent = new WebSocketServerComponent(commandComponent);
export var worldComponent: WorldComponent = new WorldComponent(commandComponent, webSocketServerComponent);
export var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
export var wheelSetComponent: WheelSetComponent = new WheelSetComponent(commandComponent)
export var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent, new DefaultGyroscope());

var distanceCenterTriggerPin: number = Number(nconf.get("distance:center:triggerPin"));
var distanceCenterEchoPin: number = Number(nconf.get("distance:center:echoPin"));
var distanceCenter = new DefaultCallableDistanceSensor(distanceCenterTriggerPin, distanceCenterEchoPin);
export var distanceCenterComponent = new DistanceComponent(commandComponent, distanceCenter, new common.DistanceAutoIntervalCommand(0));
export var relay = new Relay();

