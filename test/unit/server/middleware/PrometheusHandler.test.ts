import { createRequest, createResponse } from 'node-mocks-http';
import { ILogger } from '../../../../lib/logger/ILogger';
import { HttpHandlerInput } from '../../../../lib/server/HttpHandler';
import { PrometheusHandler } from '../../../../lib/server/middleware/PrometheusHandler';

describe('PrometheusHandler', () => {
  let logger: ILogger;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  });

  it('can only handle GET /metrics requests', async () => {
    const input1: HttpHandlerInput = { request: createRequest({ method: 'GET' }), response: createResponse() };
    const input2: HttpHandlerInput = { request: createRequest({ method: 'POST', url: '/metrics' }), response: createResponse() };
    const input3: HttpHandlerInput = { request: createRequest({ method: 'GET', url: '/metrics' }), response: createResponse() };
    const handler = new PrometheusHandler({ logger });
    await handler.initialize();
    expect(handler.canHandle(input1)).toBeFalsy();
    expect(handler.canHandle(input2)).toBeFalsy();
    expect(handler.canHandle(input3)).toBeTruthy();
    await handler.handle(input3);
    await handler.terminate();
  });

  it('can warn about unexpected requests', async () => {
    const handler = new PrometheusHandler({ logger });
    await handler.initialize();
    const input: HttpHandlerInput = { request: createRequest(), response: createResponse() };
    jest.spyOn(handler, 'canHandle').mockImplementation(() => false);
    await handler.handle(input);
    await handler.terminate();
    expect(logger.warn).toHaveBeenCalledWith('This middleware received an unsupported handle request!');
  });
});
