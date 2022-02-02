import {
  ConsoleLogger,
  HttpServer,
  Logger,
  HttpHandler,
  NotFoundEndpoint,
  Initializable,
} from '@iotakingdoms/common';
import { App } from '../../../lib/App';

describe('App', () => {
  let logger: Logger;
  let httpServer: Initializable;

  beforeAll(() => {
    logger = new ConsoleLogger({ logLevel: 'None' });
    httpServer = new HttpServer({
      logger,
      port: 8080,
      handler: new HttpHandler({
        logger,
        path: '/v1',
        handlers: [new NotFoundEndpoint({ logger })],
      }),
    });
  });

  it('can start and stop', async () => {
    const app = new App({ logger, httpServer });
    await app.initialize();
    await app.terminate();
  });
});
