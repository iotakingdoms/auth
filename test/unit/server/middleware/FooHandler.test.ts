import { createRequest, createResponse } from 'node-mocks-http';
import { ILogger } from '../../../../lib/logger/ILogger';
import { HttpHandlerInput } from '../../../../lib/server/HttpHandler';
import { FooHandler } from '../../../../lib/server/middleware/FooHandler';

describe('FooHandler', () => {
  let logger: ILogger;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  });

  it('can handle requests', async () => {
    const handler = new FooHandler({ logger });
    await handler.initialize();
    const input: HttpHandlerInput = { request: createRequest(), response: createResponse() };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    await handler.terminate();
  });
});
