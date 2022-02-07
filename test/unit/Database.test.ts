import { MongoClient } from 'mongodb';
import { Initializable, Logger } from '@iotakingdoms/common';
import { Database } from '../../lib/Database';
import { mockLogger } from './mocks/logger/Logger';

const mockMongoClient = {
  connect: jest.fn(),
  db: jest.fn(() => ({})),
};

jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => mockMongoClient),
}));

describe('Database', () => {
  let logger: jest.Mocked<Logger>;

  beforeAll(() => {
    logger = mockLogger();
  });

  it('can get a database connection', async () => {
    const database = new Database({
      logger,
      host: 'example.host',
      protocol: 'mongodb+srv',
      name: 'example-db-name',
      user: 'example-db-user',
      pass: 'example-db-pass',
      params: '?retryWrites=true&w=majority',
    });

    const dbConnection = await database.getDb();
    expect(dbConnection).toBeDefined();
  });

  it('throws an error if it could not get a database connection', async () => {
    mockMongoClient.connect.mockImplementationOnce(() => {
      throw new Error('Connection failed');
    });

    const database = new Database({
      logger,
      host: 'example.host',
      protocol: 'mongodb+srv',
      name: 'example-db-name',
      user: 'example-db-user',
      pass: 'example-db-pass',
      params: '?retryWrites=true&w=majority',
    });

    await expect(database.getDb()).rejects.toThrowError();
  });

  it('throws an error if database connection could not be ensured', async () => {
    mockMongoClient.connect.mockImplementationOnce(() => {
      throw new Error('Connection failed');
    });

    const database = new Database({
      logger,
      host: 'example.host',
      protocol: 'mongodb+srv',
      name: 'example-db-name',
      user: 'example-db-user',
      pass: 'example-db-pass',
      params: '?retryWrites=true&w=majority',
    });

    await expect(database.ensureConnection()).rejects.toThrowError();
  });
});
