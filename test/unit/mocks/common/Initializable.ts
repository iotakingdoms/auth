import { Initializable } from '../../../../lib/common/Initializable';

export const mockInitializable = (): jest.Mocked<Initializable> => ({
  initialize: jest.fn(),
  terminate: jest.fn(),
});
