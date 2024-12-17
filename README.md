# Simple IoT Backend - Sensor Data MQTT Adaptor

## Description

A microservice for simple iot backend handling incoming sensors data from MQTT broker.

## Requirements

1. Node.js (version >= 16)
2. MQTT Broker

## Planning Features

- :black_square_button: MQTT Support

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