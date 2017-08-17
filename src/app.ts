import { CommandComponent, OrientationComponent, GyroscopeComponent, WheelComponent, WHEEL_LOCATION, WebSocketServerComponent } from "./server";

export var commandComponent: CommandComponent = new CommandComponent();
export var webSocketServerComponent: WebSocketServerComponent = new WebSocketServerComponent(commandComponent);
export var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
export var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent);
export var wheelComponentLeft: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
export var wheelComponentRight: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Right);



