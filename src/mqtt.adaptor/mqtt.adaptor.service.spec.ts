import { Test, TestingModule } from '@nestjs/testing';
import { MqttAdaptorService } from './mqtt.adaptor.service';
import { ClientMock } from './mocks/client.mock';
import { ClientProxy, RpcException } from '@nestjs/microservices';

describe('MqttAdaptorService', () => {
  let service: MqttAdaptorService;
  let userClientMock: ClientMock;
  let sensorDataClientMock: ClientMock;
  let userClient: ClientProxy;
  let sensorDataClient: ClientProxy;

  beforeEach(async () => {
    userClientMock = new ClientMock();
    sensorDataClientMock = new ClientMock();

    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MqttAdaptorService,
        {
          provide: 'SENSOR_DATA_SERVICE',
          useValue: sensorDataClientMock.buildNoPipe(),
        },
        {
          provide: 'USER_SERVICE',
          useValue: userClientMock.buildNoPipe(),
        },
      ],
    }).compile();

    service = module.get<MqttAdaptorService>(MqttAdaptorService);
    userClient = module.get('USER_SERVICE');
    sensorDataClient = module.get('SENSOR_DATA_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('incomingSensorData', () => {
    it('should send sensor data event to sensor data service', async () => {
      // Arrange
      const username = 'username';
      const value = 1;
      const mqttTopic = 'data/+/+';

      // Act
      await service.incomingSensorData(username, value, mqttTopic);

      // Assert
      expect(userClient.send).toHaveBeenCalledTimes(1);
      expect(sensorDataClient.emit).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if user service throws an error', async () => {
      // Arrange
      const username = 'username';
      const value = 1;
      const mqttTopic = 'data/1/temp';
      const error = new RpcException('User service error');
      userClientMock.error = error;

      // Act & Assert
      await expect(
        service.incomingSensorData(username, value, mqttTopic),
      ).rejects.toThrow(error);
      expect(userClient.send).toHaveBeenCalledTimes(1);
      expect(sensorDataClient.emit).toHaveBeenCalledTimes(0);
    });

    it('should throw an error if mqtt topic is invalid', async () => {
      // Arrange
      const username = 'username';
      const value = 1;
      const mqttTopic = 'data/1';

      // Act & Assert
      await expect(
        service.incomingSensorData(username, value, mqttTopic),
      ).rejects.toThrow(new Error('Invalid mqtt topic'));
      expect(userClient.send).toHaveBeenCalledTimes(0);
      expect(sensorDataClient.emit).toHaveBeenCalledTimes(0);
    });
  });
});
