import { createRequest, createResponse } from 'node-mocks-http';
import { ILogger } from '../../../lib/logger/ILogger';
import { ExpressServer } from '../../../lib/server/ExpressServer';
import { HttpHandler } from '../../../lib/server/HttpHandler';

const listen = jest.fn();
const use = jest.fn();
const get = jest.fn();
const close = jest.fn();

jest.mock('express', () => () => ({
  listen,
  use,
  get,
}));

describe('ExpressServer', () => {
  let logger: ILogger;
  let middleware: HttpHandler;

  beforeAll(() => {
    listen.mockImplementation((port: any, cb: any) => {
      cb();
      return {
        close,
      };
    });

    close.mockImplementation((cb: any) => {
      cb();
    });

    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };

    middleware = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn(),
      handle: jest.fn(async () => ({ swallowed: true })),
    };
  });

  it('can initialize, start, invoke middleware and stop a server', async () => {
    const server = new ExpressServer({ logger, port: 3000, middlewares: [middleware] });
    await server.start();
    await server.invokeMiddlewares(createRequest(), createResponse());
    await server.stop();
  });

  it('throws when trying to stop a non-started server', async () => {
    const server = new ExpressServer({ logger, port: 3000, middlewares: [] });
    await expect(server.stop()).rejects.toThrow(Error);
  });

  it('throws when trying to stop an already stopped server', async () => {
    const server = new ExpressServer({ logger, port: 3000, middlewares: [] });
    await server.start();
    await server.stop();
    close.mockImplementationOnce((cb: any) => {
      cb(new Error());
      return undefined;
    });
    await expect(server.stop()).rejects.toThrow(Error);
  });
});
