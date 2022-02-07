import { HttpHandlerInput, Logger } from '@iotakingdoms/common';
import { createRequest, createResponse } from 'node-mocks-http';
import { OidcEndpoint } from '../../lib/OidcEndpoint';
import { mockLogger } from './mocks/logger/Logger';
import { mockDatabase } from './mocks/database/Database';
import { IDatabase } from '../../lib/Database';

describe('OidcEndpoint', () => {
  let logger: Logger;
  let database: jest.Mocked<IDatabase>;

  beforeAll(() => {
    logger = mockLogger();
    database = mockDatabase();
  });

  it('can handle requests', async () => {
    const toArray = jest.fn(() => []);
    const find = jest.fn(() => ({ toArray }));
    const collection = jest.fn(() => ({ find }));
    database.getDb.mockImplementationOnce((): any => ({ collection }));

    toArray.mockImplementationOnce((): any => [
      {
        client_id: 'foo',
        client_secret: 'bar',
        grant_types: ['authorization_code'],
        redirect_uris: ['https://foo.bar:8080/cb'],
        response_types: ['code'],
      },
    ]);

    const oidcEndpoint = new OidcEndpoint({ logger, baseUrl: 'http://localhost:8080', database });
    await oidcEndpoint.initialize();
    expect(oidcEndpoint.pkceRequired()).toBeFalsy();
    const response = createResponse();
    response.end = jest.fn();
    const input: HttpHandlerInput = { request: createRequest(), response };
    expect(oidcEndpoint.canHandle(input)).toBeTruthy();
    await oidcEndpoint.handle(input);
    // expect(response.statusCode).toBe(404);
    // expect(response.end).toHaveBeenCalledWith('Not found');
    await oidcEndpoint.terminate();
  });

  it('must warn if the oidc callback has not been initialized', async () => {
    const oidcEndpoint = new OidcEndpoint({ logger, baseUrl: 'http://localhost:8080', database });
    const input: HttpHandlerInput = { request: createRequest(), response: createResponse() };
    await oidcEndpoint.handle(input);
    expect(logger.warn).toBeCalledWith('Unhandled request because callback has not been initialized!');
  });
});
