import { App } from '../../lib/app/App';
import { ConsoleLogger } from '../../lib/logger/ConsoleLogger';
import { ILogger } from '../../lib/logger/ILogger';

describe('App', () => {
  let logger: ILogger;

  beforeAll(() => {
    logger = new ConsoleLogger({ level: 'NONE' });
  });

  it('can start and stop', async () => {
    const app = new App({ logger });
    await app.start();
    await app.stop();
  });
});
