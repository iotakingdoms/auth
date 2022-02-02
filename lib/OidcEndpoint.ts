import { Provider, Configuration, PKCEMethods } from 'oidc-provider';
import { Logger, HttpHandlerInput, Endpoint } from '@iotakingdoms/common';

export interface OidcEndpointArgs {
  logger: Logger;
  baseUrl: string;
}

export class OidcEndpoint extends Endpoint {
  private readonly baseUrl;

  private readonly oidc;

  private readonly callback;

  constructor(args: OidcEndpointArgs) {
    super(args);

    this.baseUrl = args.baseUrl;

    const configuration: Configuration = {
      clients: [{
        client_id: 'foo',
        client_secret: 'bar',
        grant_types: ['authorization_code'],
        redirect_uris: ['https://foo.bar:8080/cb'],
        response_types: ['code'],
      }],
      pkce: {
        methods: ['S256'],
        required: this.pkceRequired,
      },
    };

    this.oidc = new Provider(this.baseUrl, configuration);
    this.callback = this.oidc.callback();
  }

  async initialize(): Promise<void> {
    await super.initialize();
  }

  async terminate(): Promise<void> {
    await super.terminate();
  }

  canHandle(input: HttpHandlerInput): boolean {
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<void> {
    this.callback(input.request, input.response);
  }

  pkceRequired() {
    return false;
  }
}
