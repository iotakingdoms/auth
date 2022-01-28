import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { VersionEndpoint } from '../../../lib/endpoint/VersionEndpoint';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';

describe('VersionEndpoint', () => {
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
    const handler = new VersionEndpoint({ logger });
    await handler.initialize();
    const input: HttpHandlerInput = { request: createRequest(), response: createResponse() };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    await handler.terminate();
  });
});
