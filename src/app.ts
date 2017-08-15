import { CommandComponent, OrientationComponent, ORIENTATION_EVENT, GyroscopeComponent, WheelComponent, WHEEL_LOCATION} from "./server";

export var commandComponent: CommandComponent = new CommandComponent();
export var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
export var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent);
export var wheelComponentLeft: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
export var wheelComponentRight: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Right);
