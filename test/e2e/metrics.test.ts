describe('Metrics', () => {
  it('serves a metrics with ', async () => {
    await page.goto('http://localhost:8080/metrics', { waitUntil: 'domcontentloaded' });
    const text = await page.$eval('body pre', (el) => el.innerHTML);
    expect(text).toMatch('process_cpu_user_seconds_total');
    expect(text).toMatch('process_cpu_system_seconds_total');
    expect(text).toMatch('process_cpu_seconds_total');
    expect(text).toMatch('process_start_time_seconds');
    expect(text).toMatch('process_resident_memory_bytes');
    expect(text).toMatch('process_virtual_memory_bytes');
    expect(text).toMatch('process_heap_bytes');
    expect(text).toMatch('process_open_fds');
    expect(text).toMatch('process_max_fds');
    expect(text).toMatch('nodejs_eventloop_lag_seconds');
    expect(text).toMatch('nodejs_eventloop_lag_min_seconds');
    expect(text).toMatch('nodejs_eventloop_lag_max_seconds');
    expect(text).toMatch('nodejs_eventloop_lag_mean_seconds');
    expect(text).toMatch('nodejs_eventloop_lag_stddev_seconds');
    expect(text).toMatch('nodejs_eventloop_lag_p50_seconds');
    expect(text).toMatch('nodejs_eventloop_lag_p90_seconds');
    expect(text).toMatch('nodejs_eventloop_lag_p99_seconds');
    expect(text).toMatch('nodejs_active_handles_total');
    expect(text).toMatch('nodejs_active_requests_total');
    expect(text).toMatch('nodejs_heap_size_total_bytes');
    expect(text).toMatch('nodejs_heap_size_used_bytes');
    expect(text).toMatch('nodejs_external_memory_bytes');
  }, 2000);
});
