import { ILogger } from '../../lib/logger/ILogger';
import { ExpressServer } from '../../lib/server/ExpressServer';

const get = jest.fn();
const listen = jest.fn();
const close = jest.fn();

jest.mock('express', () => () => ({
  get,
  listen,
}));

describe('ExpressServer', () => {
  let server: ExpressServer;
  let logger: ILogger;
  let res: any;

  beforeAll(() => {
    listen.mockImplementation((port: any, cb: any) => {
      cb();
      return {
        close,
      };
    });

    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    res = {
      send: jest.fn(),
      json: jest.fn(),
      setHeader: jest.fn(),
    };

    server = new ExpressServer({ logger, port: 3000 });
  });

  it('can handle express server not initialized error', async () => {
    await expect(server.stop()).rejects.toThrow(Error);
  });

  it('can start and stop', async () => {
    close.mockImplementationOnce((cb: any) => {
      cb();
    });
    const req = { method: 'get' };
    await server.start();
    await server.get(req, res);
    await server.getMetrics(req, res);
    await server.stop();
  });

  it('handles express close error', async () => {
    close.mockImplementationOnce((cb: any) => {
      cb(new Error());
      return undefined;
    });
    await server.start();
    await expect(server.stop()).rejects.toThrow(Error);
  });
});
