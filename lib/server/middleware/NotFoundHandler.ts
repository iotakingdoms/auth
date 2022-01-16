import { ServerResponse } from 'http';
import { ILogger } from '../../logger/ILogger';
import { HttpHandler, HttpHandlerInput, HttpHandlerOutput } from '../HttpHandler';

export interface NotFoundHandlerArgs {
  logger: ILogger;
}

export class NotFoundHandler extends HttpHandler {
  private readonly logger: ILogger;

  constructor(args: NotFoundHandlerArgs) {
    super();
    this.logger = args.logger;
  }

  async initialize(): Promise<void> {
    this.logger.info('Initialized NotFoundHandler');
  }

  async terminate(): Promise<void> {
    this.logger.info('Terminated NotFoundHandler');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canHandle(input: HttpHandlerInput): boolean {
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<HttpHandlerOutput> {
    if (!this.canHandle(input)) {
      this.logger.warn('This middleware received an unsupported handle request!');
      return { swallowed: false };
    }

    const serverResponse: ServerResponse = input.response;
    serverResponse.setHeader('Content-Type', 'text/plain');
    serverResponse.statusCode = 404;
    serverResponse.end('Not found');

    return { swallowed: true };
  }
}
