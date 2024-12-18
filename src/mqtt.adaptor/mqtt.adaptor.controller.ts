import { Controller } from '@nestjs/common';
import { Payload, Ctx, MqttContext, EventPattern } from '@nestjs/microservices';
import { MqttAdaptorService } from './mqtt.adaptor.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('mqttAdaptor')
export class MqttAdaptorController {
  constructor(private readonly mqttAdaptorService: MqttAdaptorService) {}

  @EventPattern('data/+/+')
  async incomingSensorData(
    @Payload('value', ParseIntPipe) value: number,
    @Payload('username') username: string,
    @Ctx() context: MqttContext,
  ) {
    await this.mqttAdaptorService.incomingSensorData(
      username,
      value,
      context.getTopic(),
    );
  }
}
