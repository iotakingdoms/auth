import * as PromClient from 'prom-client';
import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { PrometheusEndpoint } from '../../../lib/endpoint/PrometheusEndpoint';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';
import { mockLogger } from '../mocks/logger/Logger';

jest.mock('prom-client');

describe('PrometheusEndpoint', () => {
  let logger: Logger;
  let mockRegistry: any;
  let spyRegistry: jest.SpyInstance<PromClient.Registry>;

  beforeAll(() => {
    logger = mockLogger();

    mockRegistry = {
      setDefaultLabels: jest.fn(),
      clear: jest.fn(),
      metrics: jest.fn(async () => 'Metrics'),
      contentType: 'text/plain; version=0.0.4; charset=utf-8',
    };

    spyRegistry = jest.spyOn(PromClient, 'Registry')
      .mockImplementation(jest.fn().mockImplementation(() => mockRegistry));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('can handle requests', async () => {
    const handler = new PrometheusEndpoint({ logger });
    await handler.initialize();
    const response = createResponse();
    response.end = jest.fn();
    const input: HttpHandlerInput = { request: createRequest(), response };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    expect(response.statusCode).toBe(200);
    expect(response.header('Content-Type')).toBe('text/plain; version=0.0.4; charset=utf-8');
    expect(response.end).toHaveBeenCalledWith('Metrics');
    expect(spyRegistry).toHaveBeenCalled();
    expect(mockRegistry.setDefaultLabels).toHaveBeenCalledWith({
      app: process.env.npm_package_name,
    });
    expect(mockRegistry.metrics).toHaveBeenCalled();
    await handler.terminate();
    expect(mockRegistry.clear).toHaveBeenCalled();
  });
});
