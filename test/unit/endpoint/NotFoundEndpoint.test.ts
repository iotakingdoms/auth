import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { NotFoundEndpoint } from '../../../lib/endpoint/NotFoundEndpoint';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';

describe('NotFoundEndpoint', () => {
  let logger: Logger;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };
  });

  it('can handle requests', async () => {
    const handler = new NotFoundEndpoint({ logger });
    await handler.initialize();
    const input: HttpHandlerInput = { request: createRequest(), response: createResponse() };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    await handler.terminate();
  });
});
