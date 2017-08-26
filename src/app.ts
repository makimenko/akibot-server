import { CommandComponent, OrientationComponent, GyroscopeComponent, WheelComponent, WHEEL_LOCATION, WebSocketServerComponent, WorldComponent } from "./server";
import { Gyroscope } from "./device/gyroscope/Gyroscope";
import { FakeGyroscope } from "./device/gyroscope/FakeGyroscope";
import * as common from "akibot-common/dist";

export var commandComponent: CommandComponent = new CommandComponent();
export var webSocketServerComponent: WebSocketServerComponent = new WebSocketServerComponent(commandComponent);
export var worldComponent: WorldComponent = new WorldComponent(commandComponent, webSocketServerComponent);
export var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);

var gyroOffset = new common.Vector3D(0, 0, 0);
export var gyroscope: Gyroscope = new FakeGyroscope(gyroOffset);
export var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent, gyroscope);
export var wheelComponentLeft: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
export var wheelComponentRight: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Right);
