import { Initializable } from '@iotakingdoms/common';

export const mockInitializable = (): jest.Mocked<Initializable> => ({
  initialize: jest.fn(),
  terminate: jest.fn(),
});
