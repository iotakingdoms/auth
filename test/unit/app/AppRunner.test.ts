import AppRunner from '../../../lib/app/AppRunner';
import { Initializable } from '../../../lib/common/Initializable';
import { mockApp } from '../mocks/app/App';

const app: Initializable = mockApp();

const mockComponentsManager = {
  configRegistry: {
    register: jest.fn(),
  },
  instantiate: jest.fn(async (): Promise<Initializable | undefined> => app),
};

jest.mock('componentsjs', () => ({
  ComponentsManager: {
    build: jest.fn(async () => mockComponentsManager),
  },
}));

jest.mock('yargs', () => () => ({
  usage: jest.fn(() => ({
    options: jest.fn(() => ({
      parse: jest.fn(async () => ({
        port: 8080,
        logLevel: 'Info',
        config: 'config/config.jsonld',
        entrypoint: 'urn:@iotakingdoms/auth:app',
      })),
    })),
  })),
}));

describe('AppRunner', () => {
  it('can initialize and terminate an app', async () => {
    const appRunner = new AppRunner();
    await appRunner.initialize();
    expect(mockComponentsManager.configRegistry.register).toHaveBeenCalled();
    expect(mockComponentsManager.instantiate).toHaveBeenCalledWith(
      'urn:@iotakingdoms/auth:app',
      {
        variables: {
          'urn:@iotakingdoms/auth:variable:logLevel': 'Info',
          'urn:@iotakingdoms/auth:variable:port': 8080,
        },
      },
    );
    expect(app.initialize).toHaveBeenCalled();
    await appRunner.terminate();
    expect(app.terminate).toHaveBeenCalled();
  });

  it('throws if the app fail to instantiate', async () => {
    mockComponentsManager.instantiate.mockImplementationOnce(async () => undefined);
    const appRunner = new AppRunner();
    await expect(appRunner.initialize).rejects.toThrowError('Failed to instantiate application');
  });
});
