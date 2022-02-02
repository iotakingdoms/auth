import { start } from '../../start';

jest.mock('../../lib/AppRunner');

describe('start', () => {
  it('starts', async () => {
    await start();
  });
});
