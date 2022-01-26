describe('Metrics', () => {
  it('serves a metrics with ', async () => {
    await page.goto('http://localhost:8080/metrics', {waitUntil: 'domcontentloaded'});
    const text = await page.$eval('body pre', el => el.innerHTML);
    expect(text.includes('process_cpu_user_seconds_total')).toBeTruthy();
    expect(text.includes('process_cpu_system_seconds_total')).toBeTruthy();
    expect(text.includes('process_cpu_seconds_total')).toBeTruthy();
    expect(text.includes('process_start_time_seconds')).toBeTruthy();
    expect(text.includes('process_resident_memory_bytes')).toBeTruthy();
    expect(text.includes('process_virtual_memory_bytes')).toBeTruthy();
    expect(text.includes('process_heap_bytes')).toBeTruthy();
    expect(text.includes('process_open_fds')).toBeTruthy();
    expect(text.includes('process_max_fds')).toBeTruthy();
    expect(text.includes('nodejs_eventloop_lag_seconds')).toBeTruthy();
    expect(text.includes('nodejs_eventloop_lag_min_seconds')).toBeTruthy();
    expect(text.includes('nodejs_eventloop_lag_max_seconds')).toBeTruthy();
    expect(text.includes('nodejs_eventloop_lag_mean_seconds')).toBeTruthy();
    expect(text.includes('nodejs_eventloop_lag_stddev_seconds')).toBeTruthy();
    expect(text.includes('nodejs_eventloop_lag_p50_seconds')).toBeTruthy();
    expect(text.includes('nodejs_eventloop_lag_p90_seconds')).toBeTruthy();
    expect(text.includes('nodejs_eventloop_lag_p99_seconds')).toBeTruthy();
    expect(text.includes('nodejs_active_handles_total')).toBeTruthy();
    expect(text.includes('nodejs_active_requests_total')).toBeTruthy();
    expect(text.includes('nodejs_heap_size_total_bytes')).toBeTruthy();
    expect(text.includes('nodejs_heap_size_used_bytes')).toBeTruthy();
    expect(text.includes('nodejs_external_memory_bytes')).toBeTruthy();
  }, 2000);
});
