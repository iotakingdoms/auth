import { Provider, Configuration } from 'oidc-provider';
import { Logger, HttpHandlerInput, Endpoint } from '@iotakingdoms/common';
import { IDatabase } from './Database';

export interface OidcEndpointArgs {
  logger: Logger;
  baseUrl: string;
  database: IDatabase;
}

export class OidcEndpoint extends Endpoint {
  private readonly baseUrl;

  private readonly database: IDatabase;

  private oidc: Provider | undefined;

  private callback: any;

  constructor(args: OidcEndpointArgs) {
    super(args);

    this.baseUrl = args.baseUrl;
    this.database = args.database;
  }

  async initialize(): Promise<void> {
    await super.initialize();

    const db = await this.database.getDb();
    const clientsFromDb = await db.collection('clients').find({}).toArray();
    const clients = clientsFromDb.map((client) => ({
      client_id: client.client_id,
      client_secret: client.client_secret,
      grant_types: client.grant_types,
      redirect_uris: client.redirect_uris,
      response_types: client.response_types,
    }));

    const configuration: Configuration = {
      clients,
      pkce: {
        methods: ['S256'],
        required: this.pkceRequired,
      },
    };

    this.oidc = new Provider(this.baseUrl, configuration);
    this.callback = this.oidc.callback();

    this.logger.info('Initialized OidcEndpoint');
  }

  async terminate(): Promise<void> {
    await super.terminate();
    this.logger.info('Terminated OidcEndpoint');
  }

  canHandle(input: HttpHandlerInput): boolean {
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<void> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2592000, // 30 days
    };

    const originalEnd = input.response.end;
    // eslint-disable-next-line no-param-reassign
    input.response.end = () => {
      input.response.writeHead(input.response.statusCode, corsHeaders);
      // eslint-disable-next-line no-param-reassign
      input.response.end = originalEnd;
      input.response.end();
    };

    if (this.callback) {
      this.callback(input.request, input.response);
    } else {
      this.logger.warn('Unhandled request because callback has not been initialized!');
    }
  }

  pkceRequired() {
    return false;
  }
}
