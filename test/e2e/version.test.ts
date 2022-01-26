describe('Version', () => {
  it('serves a page with version', async () => {
    await page.goto('http://localhost:8080/version', {waitUntil: 'domcontentloaded'});
    expect(await page.$eval('body pre', el => el.innerHTML)).toBe(`Version: ${process.env.npm_package_version}`);
  }, 2000);
});
