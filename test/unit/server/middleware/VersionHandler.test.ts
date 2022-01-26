import { createRequest, createResponse } from 'node-mocks-http';
import { ILogger } from '../../../../lib/logger/ILogger';
import { HttpHandlerInput } from '../../../../lib/server/HttpHandler';
import { VersionHandler } from '../../../../lib/server/middleware/VersionHandler';

describe('VersionHandler', () => {
  let logger: ILogger;

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
    const handler = new VersionHandler({ logger });
    await handler.initialize();
    const input: HttpHandlerInput = { request: createRequest(), response: createResponse() };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    await handler.terminate();
  });
});
