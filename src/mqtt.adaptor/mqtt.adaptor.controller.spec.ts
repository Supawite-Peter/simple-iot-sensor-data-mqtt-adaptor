import { Test, TestingModule } from '@nestjs/testing';
import { MqttAdaptorController } from './mqtt.adaptor.controller';
import { MqttAdaptorService } from './mqtt.adaptor.service';
import { MqttAdaptorServiceMock } from './mocks/mqtt.adaptor.service.mock';
import { MqttContext } from '@nestjs/microservices';

describe('MqttAdaptorController', () => {
  let controller: MqttAdaptorController;
  let service: MqttAdaptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqttAdaptorController],
    })
      .useMocker((token) => {
        switch (token) {
          case MqttAdaptorService:
            return MqttAdaptorServiceMock.build();
        }
      })
      .compile();
    controller = module.get<MqttAdaptorController>(MqttAdaptorController);
    service = module.get<MqttAdaptorService>(MqttAdaptorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('data/+/+', () => {
    it('should pass details to MqttAdaptorService.incomingSensorData', async () => {
      // Arrange
      const context = {
        getTopic: () => 'data/+/+',
      } as MqttContext;

      // Act
      await controller.incomingSensorData(1, 'some_username', context);
      // Assert
      expect(service.incomingSensorData).toHaveBeenCalledTimes(1);
    });
  });
});
