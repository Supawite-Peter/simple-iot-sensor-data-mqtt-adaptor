import { Transport, ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { MqttAdaptorService } from './mqtt.adaptor.service';
import { MqttAdaptorController } from './mqtt.adaptor.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SENSOR_DATA_SERVICE',
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.RMQ_SENSOR_DATA_QUEUE,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.RMQ_USER_QUEUE,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  providers: [MqttAdaptorService],
  controllers: [MqttAdaptorController],
})
export class MqttAdaptorModule {}
