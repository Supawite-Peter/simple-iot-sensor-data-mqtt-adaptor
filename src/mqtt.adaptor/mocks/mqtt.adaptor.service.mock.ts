export class MqttAdaptorServiceMock {
  static build() {
    return {
      incomingSensorData: jest
        .fn()
        .mockResolvedValue('incomingSensorData Received'),
    };
  }
}
