import { App } from '../../../lib/app/App';
import { ILogger } from '../../../lib/logger/ILogger';
import { IServer } from '../../../lib/server/IServer';

describe('App', () => {
  let logger: ILogger;
  let server: IServer;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    server = {
      start: jest.fn(),
      stop: jest.fn(),
    };
  });

  it('can start and stop', async () => {
    const app = new App({ logger, server });
    await app.start();
    await app.stop();
  });
});
