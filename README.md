# AkiBot Experimental Server on Node.js
Sub-project of https://github.com/makimenko/akibot.git

Client part: [akibot-ui](https://github.com/makimenko/akibot-ui)
Common (server and client) components: [akibot-common](https://github.com/makimenko/akibot-common)


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

## World Nodes
![World Nodes](https://raw.githubusercontent.com/makimenko/akibot-doc/master/img/Nodes.png "World Nodes")

## Use-Case: Synchronization of World Content
![World Content Example](https://raw.githubusercontent.com/makimenko/akibot-doc/master/img/WorldContent.png "World Content Example")
