import { IDatabase } from '../../../../lib/Database';

export const mockDatabase = (): jest.Mocked<IDatabase> => ({
  ensureConnection: jest.fn(),
  getDb: jest.fn(),
});
