import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { HttpServer } from '../../../lib/http/HttpServer';
import { Handler } from '../../../lib/common/handler/Handler';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';
import { mockLogger } from '../mocks/logger/Logger';
import { mockHandler } from '../mocks/common/handler/Handler';

describe('HttpServer', () => {
  let logger: jest.Mocked<Logger>;
  let handler: jest.Mocked<Handler<HttpHandlerInput, void>>;

  beforeAll(() => {
    logger = mockLogger();
    handler = mockHandler();
  });

  it('can initialize, start, invoke middleware and stop a server', async () => {
    const httpServer = new HttpServer({ logger, port: 3000, handler });
    await httpServer.initialize();
    await httpServer.invokeHandler(createRequest(), createResponse());
    await httpServer.terminate();
  });

  it('throws when trying to stop a non-started server', async () => {
    const httpServer = new HttpServer({ logger, port: 3000, handler });
    await expect(httpServer.terminate()).rejects.toThrow(Error);
  });

  it('throws when trying to stop an already stopped server', async () => {
    const httpServer = new HttpServer({ logger, port: 3000, handler });
    await httpServer.initialize();
    await httpServer.terminate();
    await expect(httpServer.terminate()).rejects.toThrow(Error);
  });
});
