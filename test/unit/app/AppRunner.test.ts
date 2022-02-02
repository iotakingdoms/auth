import { Initializable } from '@iotakingdoms/common';
import AppRunner from '../../../lib/AppRunner';
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

const yargs = {
  env: jest.fn().mockReturnThis(),
  usage: jest.fn().mockReturnThis(),
  options: jest.fn().mockReturnThis(),
  parse: jest.fn(async () => ({
    port: 8080,
    logLevel: 'Info',
    config: 'config/config.jsonld',
    entrypoint: 'urn:@iotakingdoms/auth:app',
  })),
};

jest.mock('yargs', () => () => yargs);

describe('AppRunner', () => {
  it('can initialize and terminate an app', async () => {
    const appRunner = new AppRunner();
    await appRunner.initialize();
    expect(yargs.env).toHaveBeenCalledWith('APP');
    expect(yargs.usage).toHaveBeenCalledWith('node ./dist/start.js [args]');
    expect(yargs.options).toHaveBeenCalled();
    expect(yargs.parse).toHaveBeenCalled();
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
