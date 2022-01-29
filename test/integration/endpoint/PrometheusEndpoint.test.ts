import { createRequest, createResponse } from 'node-mocks-http';
import { Logger } from '../../../lib/logger/Logger';
import { PrometheusEndpoint } from '../../../lib/endpoint/PrometheusEndpoint';
import { HttpHandlerInput } from '../../../lib/http/HttpHandler';

describe('PrometheusEndpoint', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('can handle requests', async () => {
    const handler = new PrometheusEndpoint({ logger });
    await handler.initialize();
    const response = createResponse();
    let body;
    response.end = jest.fn().mockImplementation((data) => { body = data; });
    const input: HttpHandlerInput = { request: createRequest(), response };
    expect(handler.canHandle(input)).toBeTruthy();
    await handler.handle(input);
    expect(response.statusCode).toBe(200);
    expect(response.header('Content-Type')).toBe('text/plain; version=0.0.4; charset=utf-8');
    expect(body).toMatch('process_cpu_user_seconds_total');
    expect(body).toMatch('process_cpu_system_seconds_total');
    expect(body).toMatch('process_cpu_seconds_total');
    expect(body).toMatch('process_start_time_seconds');
    expect(body).toMatch('process_resident_memory_bytes');
    expect(body).toMatch('process_virtual_memory_bytes');
    expect(body).toMatch('process_heap_bytes');
    expect(body).toMatch('process_open_fds');
    expect(body).toMatch('process_max_fds');
    expect(body).toMatch('nodejs_eventloop_lag_seconds');
    expect(body).toMatch('nodejs_eventloop_lag_min_seconds');
    expect(body).toMatch('nodejs_eventloop_lag_max_seconds');
    expect(body).toMatch('nodejs_eventloop_lag_mean_seconds');
    expect(body).toMatch('nodejs_eventloop_lag_stddev_seconds');
    expect(body).toMatch('nodejs_eventloop_lag_p50_seconds');
    expect(body).toMatch('nodejs_eventloop_lag_p90_seconds');
    expect(body).toMatch('nodejs_eventloop_lag_p99_seconds');
    expect(body).toMatch('nodejs_active_handles_total');
    expect(body).toMatch('nodejs_active_requests_total');
    expect(body).toMatch('nodejs_heap_size_total_bytes');
    expect(body).toMatch('nodejs_heap_size_used_bytes');
    expect(body).toMatch('nodejs_external_memory_bytes');
    await handler.terminate();
  });
});
