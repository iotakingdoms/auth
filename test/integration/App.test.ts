import { App } from '../../lib/app/App';
import { ConsoleLogger } from '../../lib/logger/ConsoleLogger';
import { ExpressServer } from '../../lib/server/ExpressServer';
import { ILogger } from '../../lib/logger/ILogger';
import { IServer } from '../../lib/server/IServer';
import { NotFoundHandler } from '../../lib/server/middleware/NotFoundHandler';

describe('App', () => {
  let logger: ILogger;
  let server: IServer;

  beforeAll(() => {
    logger = new ConsoleLogger({ logLevel: 'None' });
    server = new ExpressServer({
      logger,
      port: 8080,
      middlewares: [new NotFoundHandler({ logger })],
    });
  });

  it('can start and stop', async () => {
    const app = new App({ logger, server });
    await app.start();
    await app.stop();
  });
});
