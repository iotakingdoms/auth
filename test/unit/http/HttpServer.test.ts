import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { HttpServer } from '../../../lib/http/HttpServer';
import { Handler } from '../../../lib/common/handler/Handler';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';

describe('HttpServer', () => {
  let logger: Logger;
  let handler: Handler<HttpHandlerInput, void>;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };

    handler = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn(),
      handle: jest.fn(async () => {}),
    };
  });

  it('can initialize, start, invoke middleware and stop a server', async () => {
    const server = new HttpServer({ logger, port: 3000, handler });
    await server.initialize();
    await server.invokeHandler(createRequest(), createResponse());
    await server.terminate();
  });

  it('throws when trying to stop a non-started server', async () => {
    const server = new HttpServer({ logger, port: 3000, handler });
    await expect(server.terminate()).rejects.toThrow(Error);
  });

  it('throws when trying to stop an already stopped server', async () => {
    const server = new HttpServer({ logger, port: 3000, handler });
    await server.initialize();
    await server.terminate();
    await expect(server.terminate()).rejects.toThrow(Error);
  });
});
