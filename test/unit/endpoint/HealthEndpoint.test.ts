import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { HealthEndpoint } from '../../../lib/endpoint/HealthEndpoint';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';

describe('HealthEndpoint', () => {
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
    const handler = new HealthEndpoint({ logger });
    await handler.initialize();
    const response = createResponse();
    response.end = jest.fn();
    const input: HttpHandlerInput = { request: createRequest(), response };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    expect(response.statusCode).toBe(200);
    expect(response.end).toHaveBeenCalledWith('OK');
    await handler.terminate();
  });
});
