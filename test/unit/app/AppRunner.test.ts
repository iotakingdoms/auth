import AppRunner from '../../../lib/app/AppRunner';
import { Initializable } from '../../../lib/common/Initializable';

const mockApp: Initializable = {
  initialize: jest.fn(),
  terminate: jest.fn(),
};

const mockComponentsManager = {
  configRegistry: {
    register: jest.fn(),
  },
  instantiate: jest.fn(async (): Promise<Initializable | undefined> => mockApp),
};

jest.mock('componentsjs', () => ({
  ComponentsManager: {
    build: jest.fn(async () => mockComponentsManager),
  },
}));

describe('AppRunner', () => {
  it('can initialize and terminate an app', async () => {
    const appRunner = new AppRunner();
    await appRunner.initialize();
    expect(mockComponentsManager.configRegistry.register).toHaveBeenCalled();
    expect(mockComponentsManager.instantiate).toHaveBeenCalled();
    expect(mockApp.initialize).toHaveBeenCalled();
    await appRunner.terminate();
    expect(mockApp.terminate).toHaveBeenCalled();
  });

  it('throws if the app fail to instantiate', async () => {
    mockComponentsManager.instantiate.mockImplementationOnce(async () => undefined);
    const appRunner = new AppRunner();
    await expect(appRunner.initialize).rejects.toThrowError('Failed to instantiate application');
  });
});
