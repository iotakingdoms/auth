import { ServerResponse } from 'http';
import { ILogger } from '../../logger/ILogger';
import { HttpHandler, HttpHandlerInput, HttpHandlerOutput } from '../HttpHandler';

export interface FooHandlerArgs {
  logger: ILogger;
}

export class FooHandler extends HttpHandler {
  private readonly logger: ILogger;

  constructor(args: FooHandlerArgs) {
    super();
    this.logger = args.logger;
  }

  async initialize(): Promise<void> {
    this.logger.info('Initialized FooHandler');
  }

  async terminate(): Promise<void> {
    this.logger.info('Terminated FooHandler');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canHandle(input: HttpHandlerInput): boolean {
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<HttpHandlerOutput> {
    const serverResponse: ServerResponse = input.response;
    serverResponse.setHeader('Content-Type', 'text/plain');
    serverResponse.statusCode = 200;
    serverResponse.end('Foo');

    return { swallowed: true };
  }
}
