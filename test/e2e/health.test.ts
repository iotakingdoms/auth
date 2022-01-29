describe('Metrics', () => {
  it('serves a metrics with ', async () => {
    await page.goto('http://localhost:8080/health', { waitUntil: 'domcontentloaded' });
    const text = await page.$eval('body pre', (el) => el.innerHTML);
    expect(text).toMatch('OK');
  }, 2000);
});
