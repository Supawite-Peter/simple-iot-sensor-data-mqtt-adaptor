import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttAdaptorModule } from './mqtt.adaptor/mqtt.adaptor.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}.local`,
      isGlobal: true,
    }),
    MqttAdaptorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
