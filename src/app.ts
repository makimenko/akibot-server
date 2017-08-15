import { CommandComponent, OrientationComponent, ORIENTATION_EVENT, GyroscopeComponent, WheelComponent, WHEEL_LOCATION} from "./server";

export var commandComponent: CommandComponent = new CommandComponent();
new OrientationComponent(commandComponent);
new GyroscopeComponent(commandComponent);
new WheelComponent(commandComponent, WHEEL_LOCATION.Left)
new WheelComponent(commandComponent, WHEEL_LOCATION.Right);
