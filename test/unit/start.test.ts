import { start } from '../../lib/start';

jest.mock('../../lib/app/AppRunner');

describe('start', () => {
  it('starts', async () => {
    await start();
  });
});
