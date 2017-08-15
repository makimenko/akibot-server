import { CommandComponent, OrientationComponent, ORIENTATION_EVENT, GyroscopeComponent, WheelComponent, WHEEL_LOCATION} from "./server";

export var commandComponent: CommandComponent = new CommandComponent();
var orientationComponent: OrientationComponent = new OrientationComponent(commandComponent);
var gyroscopeComponent: GyroscopeComponent = new GyroscopeComponent(commandComponent);
var leftWheelComponent: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
var rightWheelComponent: WheelComponent = new WheelComponent(commandComponent, WHEEL_LOCATION.Right);
