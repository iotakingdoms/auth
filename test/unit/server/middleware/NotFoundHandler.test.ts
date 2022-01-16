import { createRequest, createResponse } from 'node-mocks-http';
import { ILogger } from '../../../../lib/logger/ILogger';
import { HttpHandlerInput } from '../../../../lib/server/HttpHandler';
import { NotFoundHandler } from '../../../../lib/server/middleware/NotFoundHandler';

describe('NotFoundHandler', () => {
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
    const handler = new NotFoundHandler({ logger });
    await handler.initialize();
    const input: HttpHandlerInput = { request: createRequest(), response: createResponse() };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    await handler.terminate();
  });

  it('can warn about unexpected requests', async () => {
    const handler = new NotFoundHandler({ logger });
    await handler.initialize();
    const input: HttpHandlerInput = { request: createRequest(), response: createResponse() };
    jest.spyOn(handler, 'canHandle').mockImplementation(() => false);
    await handler.handle(input);
    await handler.terminate();
    expect(logger.warn).toHaveBeenCalledWith('This middleware received an unsupported handle request!');
  });
});
