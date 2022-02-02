import { HttpHandlerInput, Logger } from '@iotakingdoms/common';
import { createRequest, createResponse } from 'node-mocks-http';
import { OidcEndpoint } from '../../lib/OidcEndpoint';
import { mockLogger } from './mocks/logger/Logger';

describe('OidcEndpoint', () => {
  let logger: Logger;

  beforeAll(() => {
    logger = mockLogger();
  });

  it('can handle requests', async () => {
    const oidcEndpoint = new OidcEndpoint({ logger, baseUrl: 'http://localhost:8080' });
    await oidcEndpoint.initialize();
    expect(oidcEndpoint.pkceRequired()).toBeFalsy();
    const response = createResponse();
    response.end = jest.fn();
    const input: HttpHandlerInput = { request: createRequest(), response };
    expect(oidcEndpoint.canHandle(input)).toBeTruthy();
    await oidcEndpoint.handle(input);
    // expect(response.statusCode).toBe(404);
    // expect(response.end).toHaveBeenCalledWith('Not found');
    await oidcEndpoint.terminate();
  });
});
