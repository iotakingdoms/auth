import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { NotFoundEndpoint } from '../../../lib/endpoint/NotFoundEndpoint';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';
import { mockLogger } from '../mocks/logger/Logger';

describe('NotFoundEndpoint', () => {
  let logger: Logger;

  beforeAll(() => {
    logger = mockLogger();
  });

  it('can handle requests', async () => {
    const handler = new NotFoundEndpoint({ logger });
    await handler.initialize();
    const response = createResponse();
    response.end = jest.fn();
    const input: HttpHandlerInput = { request: createRequest(), response };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    expect(response.statusCode).toBe(404);
    expect(response.end).toHaveBeenCalledWith('Not found');
    await handler.terminate();
  });
});
