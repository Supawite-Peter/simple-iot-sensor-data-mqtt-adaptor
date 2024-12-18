# Simple IoT Backend - Sensor Data MQTT Adaptor

## Description

A microservice for simple iot backend handling incoming sensors data from MQTT broker.

## Requirements

1. Node.js (version >= 16)
2. MQTT Broker


## Project setup

1. Clone this project and install node.js packages

    ```bash
    $ npm install
    ```

2. Update environment variables in `.env.development.local` (Dev) or `.env` (Prod)

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Docker

```bash
docker build -t simple-iot-sensor-data-mqtt-adaptor:{tag} .
```

## MQTT

This application allows sending sensor data to an MQTT broker using the topic format:   `data/{deviceId}/{topic}`  

### Access/Login to MQTT Broker
To access or log in to the MQTT broker:  
1. Use the same username and password as registered in the `[POST]/users` endpoint.  
2. If you want to use a separate MQTT password, send a `PATCH` request to the endpoint `/users/mqtt/password` with the new password in the request body.  

**Note**: Setting a separate MQTT password will disallow logging in to the MQTT broker with your base password.

### Payload Format
The payload must be a JSON object containing the following:  
- `username`: Your registered username (string).  
- `value`: The data value you want to send (number).  

### Example
To update the `temp` topic for a device with ID `4`, you can send:  
```json
{
  "username": "your_username",
  "value": 5
}
```
Using the topic: `data/4/temp`  
This will update the value `5` for the `temp` topic of device ID `4`.

### Important Note

1. You can only update the value of a device ID and topic that you own or have registered.
2. The `username` in the payload is required to verify ownership of the device and topic.

### Future Update
The requirement for including username in the payload will be removed in an upcoming update.