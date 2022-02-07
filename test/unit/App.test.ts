import { Initializable, Logger } from '@iotakingdoms/common';
import { App } from '../../lib/App';
import { mockHttpServer } from './mocks/http/HttpServer';
import { mockLogger } from './mocks/logger/Logger';

describe('App', () => {
  let logger: jest.Mocked<Logger>;
  let httpServer: jest.Mocked<Initializable>;

  beforeAll(() => {
    logger = mockLogger();
    httpServer = mockHttpServer();
  });

  it('can start and stop', async () => {
    const app = new App({ logger, httpServer });
    await app.initialize();
    await app.terminate();
  });
});
