import { createRequest, createResponse } from 'node-mocks-http';
import { ILogger } from '../../../lib/logger/ILogger';
import { HttpServer } from '../../../lib/server/HttpServer';
import { HttpHandler } from '../../../lib/server/HttpHandler';

describe('HttpServer', () => {
  let logger: ILogger;
  let middleware: HttpHandler;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    middleware = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn(),
      handle: jest.fn(async () => ({ swallowed: true })),
    };
  });

  it('can initialize, start, invoke middleware and stop a server', async () => {
    const server = new HttpServer({ logger, port: 3000, middlewares: [middleware] });
    await server.start();
    await server.invokeMiddlewares(createRequest(), createResponse());
    await server.stop();
  });

  it('throws when trying to stop a non-started server', async () => {
    const server = new HttpServer({ logger, port: 3000, middlewares: [] });
    await expect(server.stop()).rejects.toThrow(Error);
  });

  it('throws when trying to stop an already stopped server', async () => {
    const server = new HttpServer({ logger, port: 3000, middlewares: [] });
    await server.start();
    await server.stop();
    await expect(server.stop()).rejects.toThrow(Error);
  });
});
