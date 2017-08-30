# AkiBot Experimental Server on Node.js
Sub-project of https://github.com/makimenko/akibot.git

Set of projects:
1. Client part: [akibot-ui](https://github.com/makimenko/akibot-ui)
2. Common (server and client) components: [akibot-common](https://github.com/makimenko/akibot-common)
3. Devices (I2C-BUS, GPIO): [akibot-device](https://github.com/makimenko/akibot-device)
4. Simple logger: [akibot-log](https://github.com/makimenko/akibot-log)
5. Documents and images: [akibot-doc](https://github.com/makimenko/akibot-doc)


## Pre-Installation
1. Install [Git](https://git-scm.com)
2. Install [Node.js](https://nodejs.org/en/download)

## Installation
1. Clone repository
```
git clone https://github.com/makimenko/akibot-server.git
```

2. Install Global dependencies
```
npm install typescript ts-node nodemon mocha chai -g
```

3. Go to the project directory, install project dependencies and launch the server.
```
cd akibot-server
npm install
npm run serve
```

## Sample UI
https://github.com/makimenko/akibot-ui
![UI Example](https://raw.githubusercontent.com/makimenko/akibot-doc/master/img/UI_Sample1.png "UI Example")

## Concept
![World Nodes](https://raw.githubusercontent.com/makimenko/akibot-doc/master/img/Nodes.png "World Nodes")

## Use-Case: Orientation
![Orientation Workflow Example](https://raw.githubusercontent.com/makimenko/akibot-doc/master/img/Orientation.png "Orientation Workflow Example")

Sample logs:
```
[nodemon] starting `ts-node src/sandbox.ts`
 2017-8-15 09:59:52:  Info: sandbox                  : Initializing starting...
 2017-8-15 09:59:52: Debug: CommandComponent         : constructor
 2017-8-15 09:59:52: Debug: OrientationComponent     : constructor
 2017-8-15 09:59:52: Debug: GyroscopeComponent       : constructor
 2017-8-15 09:59:52: Debug: WheelComponent:Left      : constructor
 2017-8-15 09:59:52: Debug: WheelComponent:Right     : constructor
 2017-8-15 09:59:52:  Info: sandbox                  : Sandbox starting...
 2017-8-15 09:59:52: Debug: OrientationComponent     : onOrientationRequest: 100
 2017-8-15 09:59:52: Trace: OrientationComponent     : subscribeGyroscope
 2017-8-15 09:59:52: Debug: GyroscopeComponent       : onGyroscopeMode: autoInterval=1000ms
 2017-8-15 09:59:52: Trace: GyroscopeComponent       : getGyroscopeValue
 2017-8-15 09:59:52: Trace: OrientationComponent     : onGyroscopeValue: 137.9412548353855
 2017-8-15 09:59:52: Trace: WheelComponent:Left      : onRight
 2017-8-15 09:59:52: Trace: WheelComponent:Right     : onRight
 2017-8-15 09:59:53: Trace: GyroscopeComponent       : getGyroscopeValue
 2017-8-15 09:59:53: Trace: OrientationComponent     : onGyroscopeValue: 83.43736961338327
 2017-8-15 09:59:53: Debug: OrientationComponent     : Seems Orientation is finished
 2017-8-15 09:59:53: Debug: OrientationComponent     : endWork
 2017-8-15 09:59:53: Trace: OrientationComponent     : unsubscribeGyroscope
 2017-8-15 09:59:53: Debug: GyroscopeComponent       : onGyroscopeMode: autoInterval=0ms
 2017-8-15 09:59:53: Trace: WheelComponent:Left      : onStop
 2017-8-15 09:59:53: Trace: WheelComponent:Right     : onStop
 2017-8-15 09:59:53: Debug: OrientationComponent     : sendResponse: SUCCESS
 2017-8-15 09:59:53:  Info: sandbox                  : Orientation SUCEEDED! Final angle is: 83.43736961338327
 ```
