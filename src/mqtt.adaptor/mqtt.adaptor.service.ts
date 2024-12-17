import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MqttAdaptorService {
  constructor(
    @Inject('SENSOR_DATA_SERVICE') private sensorDataClient: ClientProxy,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
  ) {}

  async incomingSensorData(username: string, value: number, mqttTopic: string) {
    // Extract device id and device topic from mqtt topic
    const [deviceId, deviceTopic] = this.extractDeviceInfo(mqttTopic);

    // Get user details from user service
    const usersDetailsPattern = { cmd: 'users.details.by.name' };
    const usersDetailsPayload = { username };
    const userDetail = await firstValueFrom(
      this.userClient.send(usersDetailsPattern, usersDetailsPayload),
    );

    // Send sensor data event to sensor data service
    const sensorDataPattern = { event: 'sensor.data.update' };
    const sensorDataPayload = {
      userId: userDetail.id,
      deviceId,
      deviceTopic,
      dataPayload: { value },
    };
    this.sensorDataClient.emit(sensorDataPattern, sensorDataPayload);
  }

  private extractDeviceInfo(mqttTopic: string) {
    // mqttTopic structure = data/{deviceId}/{deviceTopic}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, id, topic] = mqttTopic.split('/');
    if (!id || !topic) {
      throw new Error('Invalid mqtt topic');
    }
    return [id, topic];
  }
}
