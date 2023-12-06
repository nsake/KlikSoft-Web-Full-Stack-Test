<p align="center"> 
    KlikSoft Web Full Stack Test Task
</p>

## Installation

We have 4 folders

1. cloud
2. cloud-frontend
3. devices
4. devices-frontend

#### Recomandations to start code

Split 4 terminals

#### Backend 　

Copy -> past in terminal -> run
commands below line by line

##### Terminal #1

```javascript
cd cloud

npm install

npm run start:dev
```

##### Terminal #2

```javascript
cd devices

npm install

npm run start:dev
```

#### Frontend 　

Copy -> past in terminal -> run
commands below line by line

##### Terminal #3

```javascript
cd cloud-frontend

npm install

npm run start
```

##### Terminal #4

```javascript
cd devices-frontend

npm install

npm run start
```

### Work Flow

- "devices-fronted" or localhost:3002, where we have 2 forms; We send frequency and devices quantity to generate;

- "devices" or localhost:30001, receives settings from "devices-frontend", save settings for alive time; Uses these settings
  to set interval with saved frequency and than generate random data for devices quantity; Sends generated data to "localhost:3000";

- "cloud" or localhost:3000, server receives devices data from "devices", saves it, processes and produces for graph data visualization; Sends data to "cloud-frontend" via websockets;

- "cloud-frontend" or localhost:3003, frontend with data visualization and websockets connected to receive real-time data;
