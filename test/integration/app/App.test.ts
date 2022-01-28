import { App } from '../../../lib/app/App';
import { ConsoleLogger } from '../../../lib/logger/ConsoleLogger';
import { HttpServer } from '../../../lib/http/HttpServer';
import { Logger } from '../../../lib/logger/Logger';
import { HttpHandler } from '../../../lib/http/HttpHandler';
import { NotFoundEndpoint } from '../../../lib/endpoint/NotFoundEndpoint';
import { Initializable } from '../../../lib/common/Initializable';

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
