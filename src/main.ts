import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: process.env.MQTT_URL,
        username: process.env.MQTT_USERNAME || '',
        password: process.env.MQTT_PASSWORD || '',
      },
    },
  );
  await app.listen();
}
bootstrap();
