import { App } from '../../../lib/app/App';
import { Initializable } from '../../../lib/common/Initializable';
import { Logger } from '../../../lib/logger/Logger';

describe('App', () => {
  let logger: Logger;
  let httpServer: Initializable;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };

    httpServer = {
      initialize: jest.fn(),
      terminate: jest.fn(),
    };
  });

  it('can start and stop', async () => {
    const app = new App({ logger, httpServer });
    await app.initialize();
    await app.terminate();
  });
});
