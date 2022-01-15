import { App } from '../../lib/app/App';
import { ILogger } from '../../lib/logger/ILogger';

describe('App', () => {
  let logger: ILogger;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  });

  it('can start and stop', async () => {
    const app = new App({ logger });
    await app.start();
    await app.stop();
  });
});
