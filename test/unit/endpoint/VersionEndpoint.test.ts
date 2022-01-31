import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { VersionEndpoint } from '../../../lib/endpoint/VersionEndpoint';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';
import { mockLogger } from '../mocks/logger/Logger';

describe('VersionEndpoint', () => {
  let logger: Logger;

  beforeAll(() => {
    logger = mockLogger();
  });

  it('can handle requests', async () => {
    const handler = new VersionEndpoint({ logger });
    await handler.initialize();
    const response = createResponse();
    response.end = jest.fn();
    const input: HttpHandlerInput = { request: createRequest(), response };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    expect(response.statusCode).toBe(200);
    expect(response.end).toHaveBeenCalledWith(`Version: ${process.env.npm_package_version}`);
    await handler.terminate();
  });
});
