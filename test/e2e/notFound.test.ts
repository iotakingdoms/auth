describe('NotFound', () => {
  it('serves not found response ', async () => {
    await page.goto('http://localhost:8080/notFound', { waitUntil: 'domcontentloaded' });
    const text = await page.$eval('body pre', (el) => el.innerHTML);
    expect(text).toBe('Not found');
  }, 2000);
});
